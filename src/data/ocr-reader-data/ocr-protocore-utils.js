import Tesseract from 'tesseract.js';
import { parseProtocore } from '@data';
import { addProtocore } from '@localstorage';

// Тип сабстата по названию.
// Совпадает с логикой в ModalWindowProtocore.jsx.
const FLAT_SUBSTATS = new Set(['HP', 'ATK', 'DEF']);

export const getSubstatType = (statName) => {
    if (FLAT_SUBSTATS.has(statName)) return 'flat';
    return 'percent';
};

/**
 * Запускает OCR и парсинг.
 * Возвращает { rawText, protocore }.
 *
 * @param {string|File|Blob} image — image URL / File / Blob
 * @param {(progress: number) => void} onProgress — колбэк прогресса (0-100)
 */
export async function runOcr(image, onProgress = () => {}) {
    const result = await Tesseract.recognize(image, 'eng', {
        logger: (m) => {
            console.log(m);
            if (m.status === 'recognizing text') {
                onProgress(Math.round(m.progress * 100));
            }
        },
    });

    const rawText = result.data.text;
    const protocore = parseProtocore(rawText);

    return { rawText, protocore };
}

/**
 * Проверяет, можно ли сохранять распознанный протокор.
 */
export function canSaveOcrProtocore(p) {
    if (!p) return false;
    return (
        p.type &&
        p.stellactrum &&
        p.level !== null && p.level !== undefined &&
        p.mainStat &&
        p.mainStatValue !== null && p.mainStatValue !== undefined
    );
}

/**
 * Сохраняет распознанный протокор в localStorage.
 * Дополняет substats полем type (flat/percent).
 * id, createdAt, updatedAt добавит addProtocore.
 * Возвращает сохранённый объект.
 */
export function saveOcrProtocore(protocore) {
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

    const saved = addProtocore(dataToSave);
    window.dispatchEvent(new CustomEvent('protocoresUpdated'));
    return saved;
}