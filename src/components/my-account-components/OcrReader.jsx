import React, { useState } from 'react';
import {
    runOcr,
    canSaveOcrProtocore,
    saveOcrProtocore,
} from '@data';

const OcrReader = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); // { kind: 'success'|'error', text }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setProgress(0);
            setMessage(null);
        }
    };

    const handleSave = async () => {
        if (!image) return;

        setLoading(true);
        setProgress(0);
        setMessage(null);

        try {
            const { rawText, protocore } = await runOcr(image, setProgress);

            console.log('=== OCR ===');
            console.log('Сырой текст:', rawText);
            console.log('Распознанный протокор:', protocore);

            if (!canSaveOcrProtocore(protocore)) {
                console.warn('Не все поля распознаны, сохранение отменено.');
                setMessage({
                    kind: 'error',
                    text: 'Не удалось распознать протокор. Проверь скриншот (качество, обрезка). Подробности — в консоли.',
                });
                return;
            }

            const saved = saveOcrProtocore(protocore);
            console.log('Сохранённый протокор:', saved);

            setMessage({
                kind: 'success',
                text: `Протокор сохранён: ${saved.type} / ${saved.stellactrum} / ур. ${saved.level}`,
            });

            // Очищаем image, чтобы сразу можно было загрузить следующий скрин
            setImage(null);
        } catch (err) {
            console.error('Ошибка OCR:', err);
            setMessage({
                kind: 'error',
                text: 'Ошибка распознавания. Подробности — в консоли.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Добавить протокор по скриншоту</h2>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {image && (
                <div style={{ marginTop: 20 }}>
                    <img
                        src={image}
                        alt="preview"
                        style={{ maxWidth: 300, border: '1px solid #ccc' }}
                    />
                </div>
            )}

            {image && (
                <div style={{ marginTop: 10 }}>
                    <button
                        onClick={handleSave}
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
                            ? `Распознавание... ${progress}%`
                            : 'Сохранить протокор'}
                    </button>
                </div>
            )}

            {message && (
                <div
                    style={{
                        marginTop: 15,
                        padding: 10,
                        borderRadius: 4,
                        background: message.kind === 'success' ? '#e6ffe6' : '#ffe6e6',
                        border: `1px solid ${message.kind === 'success' ? '#b5d6b5' : '#e0a0a0'}`,
                        color: message.kind === 'success' ? '#0a5' : '#a00',
                    }}
                >
                    {message.kind === 'success' ? '✓ ' : '⚠️ '}
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default OcrReader;