import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { parseProtocore } from '@data';

const OcrReader = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [protocore, setProtocore] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    // Обработка выбора файла
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setText('');
            setProtocore(null);
            setProgress(0);
        }
    };

    // Запуск распознавания
    const handleRecognize = async () => {
        if (!image) return;

        setLoading(true);
        setProgress(0);

        try {
            const result = await Tesseract.recognize(
                image,       // путь к картинке (blob, url, file)
                'eng',       // язык: 'eng' - английский, 'rus' - русский
                {
                    // Логгер для отслеживания прогресса
                    logger: (m) => {
                        console.log(m);
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100));
                        }
                    },
                }
            );

            const rawText = result.data.text;
            setText(rawText);

            // Парсим текст в объект протокора
            const parsed = parseProtocore(rawText);
            console.log('Распознанный протокор:', parsed);
            setProtocore(parsed);

        } catch (err) {
            console.error('Ошибка OCR:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Распознавание текста (Tesseract.js)</h2>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {image && (
                <div style={{ marginTop: 20 }}>
                    <img
                        src={image}
                        alt="preview"
                        style={{ maxWidth: 300, border: '1px solid #ccc' }}
                    />
                    <br />
                    <button
                        onClick={handleRecognize}
                        disabled={loading}
                        style={{ marginTop: 10, padding: '8px 16px' }}
                    >
                        {loading ? `Распознавание... ${progress}%` : 'Распознать текст'}
                    </button>
                </div>
            )}

            {text && (
                <div style={{ marginTop: 20 }}>
                    <h3>Сырой текст OCR:</h3>
                    <pre style={{
                        background: '#000000',
                        padding: 10,
                        whiteSpace: 'pre-wrap',
                        borderRadius: 8
                    }}>
                        {text}
                    </pre>
                </div>
            )}

            {protocore && (
                <div style={{ marginTop: 20 }}>
                    <h3>Распознанный протокор:</h3>
                    <pre style={{
                        background: '#000000',
                        padding: 10,
                        whiteSpace: 'pre-wrap',
                        borderRadius: 8,
                        border: '1px solid #b5d6b5'
                    }}>
                        {JSON.stringify(protocore, null, 2)}
                    </pre>
                </div>
            )}

            {!protocore && text && (
                <div style={{ marginTop: 20, color: '#a00' }}>
                    ⚠️ Не удалось распознать протокор. Проверь сырой текст выше.
                </div>
            )}
        </div>
    );
};

export default OcrReader;