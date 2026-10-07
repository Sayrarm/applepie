import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { runOcrBatch } from '@data';

// Сколько секунд в среднем уходит на 1 файл (для оценки времени).
const SECONDS_PER_FILE = 3;

const OcrReader = forwardRef((props, ref) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentFileName, setCurrentFileName] = useState('');
    const [fileProgress, setFileProgress] = useState(0);
    const [totalDone, setTotalDone] = useState(0);
    const [totalAll, setTotalAll] = useState(0);
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState(null);

    // AbortController для отмены
    const abortControllerRef = useRef(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            // Прерываем обработку, если идёт
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
            setFiles([]);
            setResults([]);
            setMessage(null);
            setCurrentIndex(-1);
            setCurrentFileName('');
            setFileProgress(0);
            setTotalDone(0);
            setTotalAll(0);
            setLoading(false);
        },
    }));

    const handleFilesChange = (e) => {
        const list = Array.from(e.target.files || []);
        if (list.length > 0) {
            setFiles(list);
            setResults([]);
            setMessage(null);
            setCurrentIndex(-1);
            setCurrentFileName('');
            setFileProgress(0);
            setTotalDone(0);
            setTotalAll(0);
        }
        // очищаем нативное значение input, чтобы можно было выбрать тот же файл повторно
        e.target.value = '';
    };

    const handleSaveAll = async () => {
        if (files.length === 0) return;

        // Создаём контроллер для отмены
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setResults([]);
        setMessage(null);
        setFileProgress(0);
        setTotalDone(0);
        setTotalAll(files.length);

        try {
            const batchResults = await runOcrBatch(
                files,
                {
                    onFileStart: (index, fileName) => {
                        setCurrentIndex(index);
                        setCurrentFileName(fileName);
                        setFileProgress(0);
                    },
                    onFileProgress: (index, percent) => {
                        setFileProgress(percent);
                    },
                    onFileDone: (index, result) => {
                        setResults((prev) => [...prev, result]);
                    },
                    onTotalProgress: (done, total) => {
                        setTotalDone(done);
                    },
                },
                controller.signal,
            );

            const cancelled = controller.signal.aborted;
            const savedCount = batchResults.filter((r) => r.status === 'saved').length;
            const failedCount = batchResults.filter((r) => r.status === 'failed').length;
            const errorCount = batchResults.filter((r) => r.status === 'error').length;

            if (cancelled) {
                setMessage({
                    kind: 'warning',
                    text: `Cancelled. Saved before cancelling: ${savedCount}.`,
                });
            } else if (errorCount > 0) {
                setMessage({
                    kind: 'warning',
                    text: `Processing completed: saved ${savedCount}, not recognized ${failedCount}, error ${errorCount}. Details in the console.`,
                });
            } else if (failedCount > 0) {
                setMessage({
                    kind: 'warning',
                    text: `Processing completed: saved ${savedCount}, not recognized ${failedCount}.`,
                });
            } else {
                setMessage({
                    kind: 'success',
                    text: `Processing completed: saved ${savedCount}.`,
                });
            }
        } catch (err) {
            console.error('Batch processing error:', err);
            setMessage({
                kind: 'error',
                text: 'Error during processing. Details are available in the console.',
            });
        } finally {
            setLoading(false);
            setCurrentIndex(-1);
            setCurrentFileName('');
            abortControllerRef.current = null;
        }
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    // Примерная оценка времени обработки
    const estimateTime = (count) => {
        const totalSeconds = count * SECONDS_PER_FILE;
        if (totalSeconds < 60) return `~${totalSeconds} sec`;
        const minutes = Math.round(totalSeconds / 60);
        return `~${minutes} min`;
    };

    const totalProgressPercent = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

    return (
        <div style={{ padding: 20 }}>
            <h2>Add screenshots with Protocores</h2>

            {/* Кастомная кнопка выбора файлов */}
            <label
                style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: '#1677ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 14,
                }}
            >
                Choose files
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesChange}
                    style={{ display: 'none' }}
                />
            </label>

            {files.length > 0 && !loading && (
                <div style={{ marginTop: 10 }}>
                    Selected files: <b>{files.length}</b>{' '}
                    <span style={{ color: '#888' }}>
                        (estimated processing time: {estimateTime(files.length)})
                    </span>
                </div>
            )}

            {files.length > 0 && (
                <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                    <button
                        onClick={handleSaveAll}
                        disabled={loading}
                        style={{
                            padding: '8px 16px',
                            background: '#1677ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        {loading
                            ? `Processing ${currentIndex + 1}/${files.length}...`
                            : `Save Protocore(s) (${files.length})`}
                    </button>

                    {loading && (
                        <button
                            onClick={handleCancel}
                            style={{
                                padding: '8px 16px',
                                background: '#fff',
                                color: '#a00',
                                border: '1px solid #a00',
                                borderRadius: 4,
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            )}

            {loading && (
                <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 14, marginBottom: 4 }}>
                        Current: <b>{currentFileName}</b> — {fileProgress}%
                    </div>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: 500,
                            height: 8,
                            background: '#eee',
                            borderRadius: 4,
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                width: `${fileProgress}%`,
                                height: '100%',
                                background: '#1677ff',
                                transition: 'width 0.2s',
                            }}
                        />
                    </div>
                    <div style={{ marginTop: 8, fontSize: 14 }}>
                        Overall: {totalDone} / {totalAll} ({totalProgressPercent}%)
                    </div>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: 500,
                            height: 8,
                            background: '#eee',
                            borderRadius: 4,
                            overflow: 'hidden',
                            marginTop: 4,
                        }}
                    >
                        <div
                            style={{
                                width: `${totalProgressPercent}%`,
                                height: '100%',
                                background: '#0a5',
                                transition: 'width 0.2s',
                            }}
                        />
                    </div>
                </div>
            )}

            {message && (
                <div
                    style={{
                        marginTop: 15,
                        padding: 10,
                        borderRadius: 4,
                        background:
                            message.kind === 'success'
                                ? '#e6ffe6'
                                : message.kind === 'warning'
                                    ? '#fff6e0'
                                    : '#ffe6e6',
                        border: `1px solid ${
                            message.kind === 'success'
                                ? '#b5d6b5'
                                : message.kind === 'warning'
                                    ? '#e6c98a'
                                    : '#e0a0a0'
                        }`,
                        color:
                            message.kind === 'success'
                                ? '#0a5'
                                : message.kind === 'warning'
                                    ? '#8a6d00'
                                    : '#a00',
                    }}
                >
                    {message.text}
                </div>
            )}

            {results.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <h3>
                        Results{' '}
                        <span style={{ color: '#888', fontWeight: 'normal' }}>
                            ({results.length})
                        </span>
                    </h3>
                    <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                        <table
                            style={{
                                borderCollapse: 'collapse',
                                width: '100%',
                                maxWidth: 900,
                                fontSize: 14,
                            }}
                        >
                            <thead
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    background: '#f4f4f4',
                                    zIndex: 1,
                                }}
                            >
                            <tr>
                                <th style={th}>#</th>
                                <th style={th}>File</th>
                                <th style={th}>Status</th>
                                <th style={th}>Protocore</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results.map((r, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={td}>{idx + 1}</td>
                                    <td
                                        style={{
                                            ...td,
                                            maxWidth: 200,
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {r.fileName}
                                    </td>
                                    <td style={td}>
                                        {r.status === 'saved' && (
                                            <span style={{ color: '#0a5' }}>✓ Saved</span>
                                        )}
                                        {r.status === 'failed' && (
                                            <span style={{ color: '#c80' }}>
                                                    ⚠ Not recognized
                                                </span>
                                        )}
                                        {r.status === 'error' && (
                                            <span style={{ color: '#a00' }}>✗ Error</span>
                                        )}
                                    </td>
                                    <td style={td}>
                                        {r.status === 'saved' && r.protocore && (
                                            <>
                                                {r.protocore.type} /{' '}
                                                {r.protocore.stellactrum} / lvl{' '}
                                                {r.protocore.level} /{' '}
                                                {r.protocore.mainStat}
                                            </>
                                        )}
                                        {r.status === 'failed' && (
                                            <span style={{ color: '#888' }}>
                                                    partially recognized — details in the
                                                    console
                                                </span>
                                        )}
                                        {r.status === 'error' && (
                                            <span style={{ color: '#888' }}>
                                                    {r.error?.message || 'see console'}
                                                </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
});

const th = {
    textAlign: 'left',
    padding: '6px 8px',
    borderBottom: '1px solid #ddd',
    fontWeight: 600,
};

const td = {
    padding: '6px 8px',
    verticalAlign: 'top',
};

export default OcrReader;