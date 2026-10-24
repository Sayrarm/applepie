import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { runOcrBatch } from '@data';
import styles from './OcrReader.module.css';
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

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
                    text: t('OcrReader.cancelled', { savedCount }),
                });
            } else if (errorCount > 0) {
                setMessage({
                    kind: 'warning',
                    text: t('OcrReader.errorCount', { savedCount, failedCount, errorCount }),
                });
            } else if (failedCount > 0) {
                setMessage({
                    kind: 'warning',
                    text: t('OcrReader.failedCount', { savedCount, failedCount }),
                });
            } else {
                setMessage({
                    kind: 'success',
                    text: t('OcrReader.success', { savedCount }),
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
        if (totalSeconds < 60) return t('OcrReader.sec', { totalSeconds });
        const minutes = Math.round(totalSeconds / 60);
        return t('OcrReader.min', { minutes });
    };

    const totalProgressPercent = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

    const messageClass =
        message?.kind === 'success'
            ? styles.messageSuccess
            : message?.kind === 'warning'
                ? styles.messageWarning
                : styles.messageError;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t('OcrReader.titleContainer')}</h2>

            <div>{t('OcrReader.warningText')}</div>

            <div className={styles.buttonsCnotainer}>
                <label className={styles.chooseButton}>
                    {t('OcrReader.chooseButton')}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFilesChange}
                        className={styles.hiddenInput}
                    />
                </label>

                {files.length > 0 && (
                    <>
                        <button
                            className={styles.primaryButton}
                            onClick={handleSaveAll}
                            disabled={loading}
                        >
                            {loading
                                ? t('OcrReader.processing', { current: currentIndex + 1, total: files.length })
                                : t('OcrReader.saveProtocores', { count: files.length })}
                        </button>

                        {loading && (
                            <button className={styles.cancelButton} onClick={handleCancel}>
                                {t('OcrReader.cancelButton')}
                            </button>
                        )}
                    </>
                )}
            </div>

            {files.length > 0 && !loading && (
                <div className={styles.selectedInfo}>
                    {t('OcrReader.titleSelectedFiles')} <b>{files.length}</b>{' '}
                    <span className={styles.estimate}>
                        ({t('OcrReader.textEstimaied')} {estimateTime(files.length)})
                    </span>
                </div>
            )}



            {loading && (
                <div className={styles.progressBlock}>
                    <div className={styles.progressLabel}>
                        {t('OcrReader.textCurrent')} <b>{currentFileName}</b> — {fileProgress}%
                    </div>
                    <div className={styles.progressBarTrack}>
                        <div
                            className={styles.progressBarFillFile}
                            style={{ width: `${fileProgress}%` }}
                        />
                    </div>

                    <div className={styles.progressLabel}>
                        {t('OcrReader.textOverall')} {totalDone} / {totalAll} ({totalProgressPercent}%)
                    </div>
                    <div className={styles.progressBarTrack}>
                        <div
                            className={styles.progressBarFillTotal}
                            style={{ width: `${totalProgressPercent}%` }}
                        />
                    </div>
                </div>
            )}

            {message && (
                <div className={`${styles.message} ${messageClass}`}>
                    {message.text}
                </div>
            )}

            {results.length > 0 && (
                <div className={styles.results}>
                    <h3 className={styles.resultsTitle}>
                        {t('OcrReader.textResults')}{' '}
                        <span className={styles.resultsCount}>({results.length})</span>
                    </h3>
                    <div className={styles.resultsScroll}>
                        <table className={styles.resultsTable}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('OcrReader.textFile')}</th>
                                <th>{t('OcrReader.textStatus')}</th>
                                <th>{t('OcrReader.textProtocore')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results.map((r, idx) => (
                                <tr key={idx} className={styles.resultsRow}>
                                    <td>{idx + 1}</td>
                                    <td className={styles.fileCell}>{r.fileName}</td>
                                    <td>
                                        {r.status === 'saved' && (
                                            <span className={styles.statusSaved}>
                                                    {t('OcrReader.statusSaved')}
                                                </span>
                                        )}
                                        {r.status === 'failed' && (
                                            <span className={styles.statusFailed}>
                                                    {t('OcrReader.statusFailed')}
                                                </span>
                                        )}
                                        {r.status === 'error' && (
                                            <span className={styles.statusError}>
                                                   {t('OcrReader.statusError')}
                                                </span>
                                        )}
                                    </td>
                                    <td>
                                        {r.status === 'saved' && r.protocore && (
                                            <>
                                                {r.protocore.type} /{' '}
                                                {r.protocore.stellactrum} / lvl{' '}
                                                {r.protocore.level} /{' '}
                                                {r.protocore.mainStat}
                                            </>
                                        )}
                                        {r.status === 'failed' && (
                                            <span className={styles.statusMuted}>
                                                {t('OcrReader.textErrorFailed')}
                                            </span>
                                        )}
                                        {r.status === 'error' && (
                                            <span className={styles.statusMuted}>
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

export default OcrReader;