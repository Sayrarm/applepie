import { protocoreTypes } from '@data';

const TYPE_MAP = {
    'α': 'alpha', 'a': 'alpha', 'alpha': 'alpha', '4': 'alpha',
    'β': 'beta',  'b': 'beta',  'beta': 'beta',  '6': 'beta',
    'γ': 'gamma', 'y': 'gamma', 'gamma': 'gamma', 'v': 'gamma',
    'δ': 'delta', 'd': 'delta', 'delta': 'delta',
    '§': 'delta', '&': 'delta', '$': 'delta',
    'i': 'delta', '1': 'delta', '0': 'delta',
};

const STELLACTRUM_COLORS = [
    'violet', 'amber', 'emerald', 'sapphire', 'ruby', 'pearl', 'obsidian',
];

// Полный список известных статов (мейны + сабстаты).
// Порядок не важен — сортировка по позиции в тексте.
const ALL_KNOWN_STATS = [
    "Oath's Strength",
    'Oath Recovery Boost',
    'Oath Strength',
    'Expedited Energy Boost',
    'DMG Boost to Weakened',
    'CRIT Rate', 'CRIT DMG',
    'HP Bonus', 'ATK Bonus', 'DEF Bonus',
    'HP', 'ATK', 'DEF',
];

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Вставляет пробелы в CamelCase: "oathRecoveryBoost" → "oath Recovery Boost"
 * Это нужно, т.к. OCR часто склеивает слова без пробелов.
 */
function normalizeCamelCase(str) {
    return str
        // граница: строчная → заглавная ("thR" → "th R")
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // граница: заглавная → заглавная+строчная ("ATKBonus" → "ATK Bonus")
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

/**
 * Определяет уровень протокора.
 * Приоритеты:
 *   1. "Max Level" в тексте → 15
 *   2. Значение main stat из OCR совпадает со значением из protocoreTypes
 *      на каком-то уровне → этот уровень
 *   3. Fallback: короткое число 0..15 из текста
 *
 * @param {string} fullText
 * @param {string|null} type
 * @param {string|null} mainStat
 * @param {number|null} mainStatValueFromOcr
 * @returns {number|null}
 */
function extractLevel(fullText, type, mainStat, mainStatValueFromOcr) {
    // 1. Max Level
    if (/\bMax\s*Level\b/i.test(fullText)) {
        return 15;
    }

    // 2. По значению main stat из OCR
    if (
        type && mainStat && mainStatValueFromOcr != null &&
        protocoreTypes[type]
    ) {
        const statDef = protocoreTypes[type].mainStats.find(
            s => s.name === mainStat
        );
        if (statDef) {
            // Ищем уровень, на котором значение из таблицы совпадает с OCR
            // Используем небольшой допуск для float (например, CRIT Rate 1.7%)
            for (let lvl = statDef.values.length - 1; lvl >= 0; lvl--) {
                if (Math.abs(statDef.values[lvl] - mainStatValueFromOcr) < 0.05) {
                    return lvl;
                }
            }
        }
    }

    // 3. Fallback: короткое число 0..15
    const candidates = [...fullText.matchAll(/\b(\d{1,2})\b/g)]
        .map(m => parseInt(m[1], 10))
        .filter(n => n >= 0 && n <= 15);
    return candidates.length > 0 ? candidates[0] : null;
}

/**
 * Извлекает тип (alpha/beta/gamma/delta) из "Protocore - X".
 */
function extractType(fullText) {
    const m = fullText.match(/Protocore\s*[-–—]\s*([^\s]{1,3})/i);
    if (!m) return null;
    const raw = m[1].toLowerCase();
    for (const ch of raw) {
        if (TYPE_MAP[ch]) return TYPE_MAP[ch];
    }
    return null;
}

/**
 * Находит ВСЕ вхождения статов в тексте с их позициями и значениями.
 * Возвращает отсортированный массив:
 *   [{ stat, value, type: 'flat'|'percent', pos }]
 */
function findAllStats(fullText) {
    const found = [];

    for (const statName of ALL_KNOWN_STATS) {
        const escaped = escapeRegex(statName);

        // Ищем название стата как отдельные слова.
        // \s+ между словами допускает любые пробелы в тексте (нормализованные).
        const namePattern = escaped.replace(/\\?\s+/g, '\\s+');
        const nameRe = new RegExp(`\\b${namePattern}\\b`, 'gi');
        const nameMatches = [...fullText.matchAll(nameRe)];

        for (const m of nameMatches) {
            const pos = m.index;
            const tail = fullText.slice(pos, pos + 40);

            // Пробуем percent
            const rePercent = new RegExp(
                `^${namePattern}[^+\\d%]{0,15}\\+?(\\d+(?:\\.\\d+)?)\\s*%`,
                'i'
            );
            const mp = tail.match(rePercent);
            if (mp) {
                found.push({
                    stat: statName,
                    value: parseFloat(mp[1]),
                    type: 'percent',
                    pos,
                });
                continue;
            }

            // Пробуем flat
            const reFlat = new RegExp(
                `^${namePattern}[^+\\d%]{0,15}\\+?(\\d+)\\b(?!\\s*%)`,
                'i'
            );
            const mf = tail.match(reFlat);
            if (mf) {
                found.push({
                    stat: statName,
                    value: parseInt(mf[1], 10),
                    type: 'flat',
                    pos,
                });
            }
        }
    }

    // Сортируем по позиции в тексте
    found.sort((a, b) => a.pos - b.pos);

    // Убираем перекрывающиеся совпадения:
    // например, "HP" и "HP Bonus" могут матчиться в одной позиции.
    // Оставляем более длинный стат.
    const deduped = [];
    for (const item of found) {
        const last = deduped[deduped.length - 1];
        if (last && item.pos < last.pos + last.stat.length) {
            // Пересечение — оставляем того, у кого длиннее название
            if (item.stat.length > last.stat.length) {
                deduped[deduped.length - 1] = item;
            }
            continue;
        }
        deduped.push(item);
    }

    return deduped;
}

/**
 * Основная функция парсинга OCR-текста в объект протокора
 */
export function parseProtocore(rawText) {
    if (!rawText) return null;

    // ─── 1. Нормализация ──────────────────────────────────────────────
    let fullText = rawText
        .replace(/[€~\\|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    fullText = normalizeCamelCase(fullText);

    // ─── 2. Stellactrum ───────────────────────────────────────────────
    let stellactrum = null;
    for (const color of STELLACTRUM_COLORS) {
        if (new RegExp(`\\b${color}\\b`, 'i').test(fullText)) {
            stellactrum = color;
            break;
        }
    }
    if (!stellactrum) return null;

    // ─── 3. Type ──────────────────────────────────────────────────────
    const type = extractType(fullText);

    // ─── 4. Обрезаем хвост по стоп-словам ─────────────────────────────
    const stopWords = ['Max Level', 'Enhance', 'Unequip'];
    let searchZone = fullText;
    for (const stop of stopWords) {
        const idx = searchZone.search(new RegExp(stop, 'i'));
        if (idx > 0) searchZone = searchZone.slice(0, idx);
    }

    // ─── 5. Находим все статы ─────────────────────────────────────────
    const allStats = findAllStats(searchZone);
    if (allStats.length === 0) return null;

    // ─── 6. Первый стат = main stat ───────────────────────────────────
    const mainStatEntry = allStats[0];
    const mainStat = mainStatEntry.stat;
    const mainStatValueFromOcr = mainStatEntry.value;

    // ─── 7. Level (по Max Level / main stat / OCR) ────────────────────
    const level = extractLevel(
        fullText,
        type,
        mainStat,
        mainStatValueFromOcr
    );

    // ─── 8. mainStatValue — из таблицы по найденному уровню ───────────
    let mainStatValue = null;
    if (type && protocoreTypes[type] && level != null) {
        const statDef = protocoreTypes[type].mainStats.find(
            s => s.name === mainStat
        );
        if (statDef && statDef.values[level] != null) {
            mainStatValue = statDef.values[level];
        }
    }
    // Fallback: значение из OCR
    if (mainStatValue == null) {
        mainStatValue = mainStatValueFromOcr;
    }

    // ─── 9. Сабстаты ──────────────────────────────────────────────────
    const substats = allStats.slice(1).map(({ stat, value, type: t }) => ({
        stat,
        value,
        type: t,
    }));

    // ─── 10. Результат ────────────────────────────────────────────────
    return {
        type,
        stellactrum,
        level,
        mainStat,
        mainStatValue,
        substats,
    };
}