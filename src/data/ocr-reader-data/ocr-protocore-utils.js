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
 * Поддерживает signal для отмены.
 */
export async function runOcr(image, onProgress = () => {}, signal = null) {
    const result = await Tesseract.recognize(image, 'eng', {
        logger: (m) => {
            if (signal?.aborted) return;
            if (m.status === 'recognizing text') {
                onProgress(Math.round(m.progress * 100));
            }
        },
    });

    // После распознавания проверяем, не отменили ли обработку
    if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
    }

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
 * @param {File[]} files
 * @param {object} callbacks
 * @param {AbortSignal} signal — для отмены обработки
 */
export async function runOcrBatch(files, callbacks = {}, signal = null) {
    const {
        onFileStart = () => {},
        onFileProgress = () => {},
        onFileDone = () => {},
        onTotalProgress = () => {},
    } = callbacks;

    const results = [];
    const total = files.length;

    for (let i = 0; i < total; i++) {
        // Проверка на отмену
        if (signal?.aborted) {
            console.log('[runOcrBatch] Обработка отменена пользователем.');
            break;
        }

        const file = files[i];
        const fileName = file.name || `file-${i + 1}`;

        onFileStart(i, fileName);

        try {
            const imageUrl = URL.createObjectURL(file);

            const { rawText, protocore } = await runOcr(
                imageUrl,
                (p) => onFileProgress(i, p),
                signal,
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
            if (err.name === 'AbortError') {
                console.log(`[${i + 1}/${total}] Прервано на ${fileName}`);
                break;
            }
            console.error(`[${i + 1}/${total}] Ошибка на ${fileName}:`, err);
            const result = { fileName, status: 'error', error: err };
            results.push(result);
            onFileDone(i, result);
            onTotalProgress(i + 1, total);
        }
    }

    // Уведомляем один раз после всей пачки
    window.dispatchEvent(new CustomEvent('protocoresUpdated'));

    return results;
}