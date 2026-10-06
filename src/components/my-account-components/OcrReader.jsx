import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { parseProtocore } from '@data';
import { addProtocore } from '@localstorage';

// Тип сабстата по названию.
// Совпадает с логикой в ModalWindowProtocore.jsx.
const FLAT_SUBSTATS = new Set(['HP', 'ATK', 'DEF']);

const getSubstatType = (statName) => {
    const normalized = statName.replace(/'/g, '').toLowerCase();
    if (FLAT_SUBSTATS.has(statName)) return 'flat';
    return 'percent';
};

const OcrReader = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [protocore, setProtocore] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // Обработка выбора файла
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setText('');
            setProtocore(null);
            setProgress(0);
            setSaved(false);
        }
    };

    // Запуск распознавания
    const handleRecognize = async () => {
        if (!image) return;

        setLoading(true);
        setProgress(0);
        setSaved(false);

        try {
            const result = await Tesseract.recognize(
                image,
                'eng',
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

    // Проверка: можно ли сохранять протокор
    const canSave = (p) => {
        if (!p) return false;
        return (
            p.type &&
            p.stellactrum &&
            p.level !== null && p.level !== undefined &&
            p.mainStat &&
            p.mainStatValue !== null && p.mainStatValue !== undefined
        );
    };

    // Сохранение в localStorage
    const handleSave = () => {
        if (!canSave(protocore)) return;

        // Подготавливаем объект в формате localStorage.
        // type и stellactrum уже есть.
        // substats нужно дополнить полем type (flat/percent).
        // id, createdAt, updatedAt добавит addProtocore.
        const dataToSave = {
            type: protocore.type,
            stellactrum: protocore.stellactrum,
            level: protocore.level,
            mainStat: protocore.mainStat,
            mainStatValue: protocore.mainStatValue,
            substats: protocore.substats.map((s) => ({
                stat: s.stat,
                value: s.value,
                type: getSubstatType(s.stat),
            })),
        };

        try {
            const saved = addProtocore(dataToSave);
            console.log('Сохранённый протокор:', saved);
            setSaved(true);

            // Уведомляем другие компоненты
            window.dispatchEvent(new CustomEvent('protocoresUpdated'));
        } catch (err) {
            console.error('Ошибка сохранения:', err);
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

                    <button
                        onClick={handleSave}
                        disabled={!canSave(protocore) || saved}
                        style={{
                            marginTop: 10,
                            padding: '8px 16px',
                            background: saved ? '#b5d6b5' : '#1677ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: canSave(protocore) && !saved ? 'pointer' : 'not-allowed',
                            opacity: canSave(protocore) ? 1 : 0.5,
                        }}
                    >
                        {saved ? '✓ Сохранено' : 'Сохранить в localStorage'}
                    </button>

                    {!canSave(protocore) && (
                        <div style={{ marginTop: 8, color: '#a00', fontSize: 14 }}>
                            ⚠️ Не все поля распознаны — сохранение недоступно.
                            Проверь type, stellactrum, level, mainStat, mainStatValue.
                        </div>
                    )}
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