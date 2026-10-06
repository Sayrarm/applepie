import React, { useState } from 'react';
import { runOcrBatch } from '@data';

const OcrReader = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentFileName, setCurrentFileName] = useState('');
    const [fileProgress, setFileProgress] = useState(0);
    const [totalDone, setTotalDone] = useState(0);
    const [totalAll, setTotalAll] = useState(0);
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState(null);

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
                    text: `Обработка завершена: сохранено ${savedCount}, не распознано ${failedCount}, ошибок ${errorCount}. Подробности в консоли.`,
                });
            } else if (failedCount > 0) {
                setMessage({
                    kind: 'warning',
                    text: `Обработка завершена: сохранено ${savedCount}, не распознано ${failedCount}.`,
                });
            } else {
                setMessage({
                    kind: 'success',
                    text: `Обработка завершена: сохранено ${savedCount}.`,
                });
            }
        } catch (err) {
            console.error('Ошибка пакетной обработки:', err);
            setMessage({
                kind: 'error',
                text: 'Ошибка во время обработки. Подробности — в консоли.',
            });
        } finally {
            setLoading(false);
            setCurrentIndex(-1);
            setCurrentFileName('');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Добавить протокоры по скриншотам</h2>

            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
            />

            {files.length > 0 && (
                <div style={{ marginTop: 10 }}>
                    Выбрано файлов: {files.length}
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
                            ? `Обработка ${currentIndex + 1}/${files.length}: ${currentFileName} (${fileProgress}%)`
                            : `Сохранить протокоры (${files.length})`}
                    </button>
                </div>
            )}

            {loading && (
                <div style={{ marginTop: 10, fontSize: 14 }}>
                    Общий прогресс: {totalDone} / {totalAll}
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
                    <h3>Результаты</h3>
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
                            <th style={th}>Файл</th>
                            <th style={th}>Статус</th>
                            <th style={th}>Протокор</th>
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
                                        <span style={{ color: '#0a5' }}>✓ Сохранён</span>
                                    )}
                                    {r.status === 'failed' && (
                                        <span style={{ color: '#c80' }}>⚠ Не распознан</span>
                                    )}
                                    {r.status === 'error' && (
                                        <span style={{ color: '#a00' }}>✗ Ошибка</span>
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
                                                частично распознан — подробности в консоли
                                            </span>
                                    )}
                                    {r.status === 'error' && (
                                        <span style={{ color: '#888' }}>
                                                {r.error?.message || 'см. консоль'}
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
};

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