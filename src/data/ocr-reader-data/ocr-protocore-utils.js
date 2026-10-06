import Tesseract from 'tesseract.js';
import { parseProtocore } from './parse-protocore';
import { addProtocore } from '@localstorage';

// Тип сабстата по названию.
// Совпадает с логикой в ModalWindowProtocore.jsx.
const FLAT_SUBSTATS = new Set(['HP', 'ATK', 'DEF']);

export const getSubstatType = (statName) => {
    if (FLAT_SUBSTATS.has(statName)) return 'flat';
    return 'percent';
};

/**
 * Запускает OCR и парсинг для одного изображения.
 */
export async function runOcr(image, onProgress = () => {}) {
    const result = await Tesseract.recognize(image, 'eng', {
        logger: (m) => {
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
    return saved;
}

/**
 * Пакетная обработка нескольких изображений.
 *
 * Последовательно, одно за другим (чтобы не грузить CPU).
 * После каждого успешного распознавания и валидации — сразу сохраняет.
 *
 * @param {File[]} files
 * @param {object} callbacks
 *   - onFileStart(index, fileName)
 *   - onFileProgress(index, percent) — прогресс распознавания текущего файла
 *   - onFileDone(index, result) — { fileName, status: 'saved'|'failed'|'error', protocore?, error? }
 *   - onTotalProgress(done, total)
 *
 * @returns {Promise<Array>} массив результатов по каждому файлу
 */
export async function runOcrBatch(files, callbacks = {}) {
    const {
        onFileStart = () => {},
        onFileProgress = () => {},
        onFileDone = () => {},
        onTotalProgress = () => {},
    } = callbacks;

    const results = [];
    const total = files.length;

    for (let i = 0; i < total; i++) {
        const file = files[i];
        const fileName = file.name || `file-${i + 1}`;

        onFileStart(i, fileName);

        try {
            const imageUrl = URL.createObjectURL(file);

            const { rawText, protocore } = await runOcr(imageUrl, (p) =>
                onFileProgress(i, p)
            );

            URL.revokeObjectURL(imageUrl);

            console.log(`[${i + 1}/${total}] ${fileName}`);
            console.log('  Сырой текст:', rawText);
            console.log('  Распознанный протокор:', protocore);

            if (!canSaveOcrProtocore(protocore)) {
                const result = { fileName, status: 'failed', protocore, rawText };
                results.push(result);
                onFileDone(i, result);
                onTotalProgress(i + 1, total);
                continue;
            }

            const saved = saveOcrProtocore(protocore);
            console.log('  Сохранён:', saved);

            const result = { fileName, status: 'saved', protocore: saved };
            results.push(result);
            onFileDone(i, result);
            onTotalProgress(i + 1, total);

        } catch (err) {
            console.error(`[${i + 1}/${total}] Ошибка на ${fileName}:`, err);
            const result = { fileName, status: 'error', error: err };
            results.push(result);
            onFileDone(i, result);
            onTotalProgress(i + 1, total);
        }
    }

    // Один раз уведомляем после всей пачки
    window.dispatchEvent(new CustomEvent('protocoresUpdated'));

    return results;
}