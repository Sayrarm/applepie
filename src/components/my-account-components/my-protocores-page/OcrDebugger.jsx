import React, { useState } from 'react';
import {
    runOcr,
    canSaveOcrProtocore,
    saveOcrProtocore,
} from '@data';

const OcrDebugger = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [protocore, setProtocore] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setText('');
            setProtocore(null);
            setProgress(0);
            setSaved(false);
        }
    };

    const handleRecognize = async () => {
        if (!image) return;
        setLoading(true);
        setProgress(0);
        setSaved(false);

        try {
            const { rawText, protocore: parsed } = await runOcr(image, setProgress);
            setText(rawText);
            setProtocore(parsed);
            console.log('Распознанный протокор:', parsed);
        } catch (err) {
            console.error('Ошибка OCR:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!canSaveOcrProtocore(protocore)) return;
        try {
            const saved = saveOcrProtocore(protocore);
            console.log('Сохранённый протокор:', saved);
            setSaved(true);
        } catch (err) {
            console.error('Ошибка сохранения:', err);
        }
    };

    const canSave = canSaveOcrProtocore(protocore);

    return (
        <div style={{ padding: 20 }}>
            <h2>OCR Debugger</h2>

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
                        background: '#000',
                        color: '#ddd',
                        padding: 10,
                        whiteSpace: 'pre-wrap',
                        borderRadius: 8,
                    }}>
                        {text}
                    </pre>
                </div>
            )}

            {protocore && (
                <div style={{ marginTop: 20 }}>
                    <h3>Распознанный протокор:</h3>
                    <pre style={{
                        background: '#000',
                        color: '#ddd',
                        padding: 10,
                        whiteSpace: 'pre-wrap',
                        borderRadius: 8,
                        border: '1px solid #b5d6b5',
                    }}>
                        {JSON.stringify(protocore, null, 2)}
                    </pre>

                    <button
                        onClick={handleSave}
                        disabled={!canSave || saved}
                        style={{
                            marginTop: 10,
                            padding: '8px 16px',
                            background: saved ? '#b5d6b5' : '#1677ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: canSave && !saved ? 'pointer' : 'not-allowed',
                            opacity: canSave ? 1 : 0.5,
                        }}
                    >
                        {saved ? '✓ Сохранено' : 'Сохранить в localStorage'}
                    </button>

                    {!canSave && (
                        <div style={{ marginTop: 8, color: '#a00', fontSize: 14 }}>
                            ⚠️ Не все поля распознаны — сохранение недоступно.
                        </div>
                    )}
                </div>
            )}

            {!protocore && text && (
                <div style={{ marginTop: 20, color: '#a00' }}>
                    ⚠️ Не удалось распознать протокор.
                </div>
            )}
        </div>
    );
};

export default OcrDebugger;