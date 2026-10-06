import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { runOcrBatch } from '@data';

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

    // ← сбрасываем всё состояние
    useImperativeHandle(ref, () => ({
        reset: () => {
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

        setLoading(true);
        setResults([]);
        setMessage(null);
        setFileProgress(0);
        setTotalDone(0);
        setTotalAll(files.length);

        try {
            const batchResults = await runOcrBatch(files, {
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
            });

            const savedCount = batchResults.filter((r) => r.status === 'saved').length;
            const failedCount = batchResults.filter((r) => r.status === 'failed').length;
            const errorCount = batchResults.filter((r) => r.status === 'error').length;

            if (errorCount > 0) {
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
        }
    };

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

            {files.length > 0 && (
                <div style={{ marginTop: 10 }}>
                    Selected files: {files.length}
                </div>
            )}

            {files.length > 0 && (
                <div style={{ marginTop: 10 }}>
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
                            ? `Processing ${currentIndex + 1}/${files.length}: ${currentFileName} (${fileProgress}%)`
                            : `Save Protocore(s) (${files.length})`}
                    </button>
                </div>
            )}

            {loading && (
                <div style={{ marginTop: 10, fontSize: 14 }}>
                    Progress: {totalDone} / {totalAll}
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
                    <h3>Results</h3>
                    <table
                        style={{
                            borderCollapse: 'collapse',
                            width: '100%',
                            maxWidth: 800,
                            fontSize: 14,
                        }}
                    >
                        <thead>
                        <tr style={{ background: '#f4f4f4' }}>
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
                                <td style={{ ...td, maxWidth: 200, wordBreak: 'break-all' }}>
                                    {r.fileName}
                                </td>
                                <td style={td}>
                                    {r.status === 'saved' && (
                                        <span style={{ color: '#0a5' }}>✓ Saved</span>
                                    )}
                                    {r.status === 'failed' && (
                                        <span style={{ color: '#c80' }}>⚠ Not recognized</span>
                                    )}
                                    {r.status === 'error' && (
                                        <span style={{ color: '#a00' }}>✗ Error</span>
                                    )}
                                </td>
                                <td style={td}>
                                    {r.status === 'saved' && r.protocore && (
                                        <>
                                            {r.protocore.type} /{' '}
                                            {r.protocore.stellactrum} /{' '}
                                            lvl {r.protocore.level} /{' '}
                                            {r.protocore.mainStat}
                                        </>
                                    )}
                                    {r.status === 'failed' && (
                                        <span style={{ color: '#888' }}>
                                            partially recognized — details in the console
                                        </span>
                                    )}
                                    {r.status === 'error' && (
                                        <span style={{ color: '#888' }}>
                                            {r.error?.message || 'look Console'}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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