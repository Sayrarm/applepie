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

function normalizeCamelCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
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
 * Находит все вхождения известных статов в тексте.
 * Для каждого пытается извлечь значение (percent или flat),
 * но возвращает запись даже если значение не найдено.
 *
 * @returns {Array<{stat, value|null, type|null, pos}>}
 */
function findStatOccurrences(fullText) {
    const found = [];

    for (const statName of ALL_KNOWN_STATS) {
        const escaped = escapeRegex(statName);
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
                continue;
            }

            // Значение не найдено — всё равно записываем (важно для main stat)
            found.push({
                stat: statName,
                value: null,
                type: null,
                pos,
            });
        }
    }

    // Сортируем по позиции
    found.sort((a, b) => a.pos - b.pos);

    // Дедупликация перекрытий: "HP" vs "HP Bonus" в одной позиции
    const deduped = [];
    for (const item of found) {
        const last = deduped[deduped.length - 1];
        if (last && item.pos < last.pos + last.stat.length) {
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
 * Определяет уровень протокора.
 * Приоритеты:
 *   1. "Max Level" → 15
 *   2. Совпадение значения main stat с таблицей
 *   3. Fallback: короткое число 0..15
 */
function extractLevel(fullText, type, mainStat, mainStatValueFromOcr) {
    if (/\bMax\s*Level\b/i.test(fullText)) {
        return 15;
    }

    if (
        type && mainStat && mainStatValueFromOcr != null &&
        protocoreTypes[type]
    ) {
        const statDef = protocoreTypes[type].mainStats.find(
            s => s.name === mainStat
        );
        if (statDef) {
            for (let lvl = statDef.values.length - 1; lvl >= 0; lvl--) {
                if (Math.abs(statDef.values[lvl] - mainStatValueFromOcr) < 0.05) {
                    return lvl;
                }
            }
        }
    }

    const candidates = [...fullText.matchAll(/\b(\d{1,2})\b/g)]
        .map(m => parseInt(m[1], 10))
        .filter(n => n >= 0 && n <= 15);
    return candidates.length > 0 ? candidates[0] : null;
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
    // Важно: сохраняем "Max Level" в fullText для extractLevel,
    // но обрезаем для поиска статов.
    const stopWords = ['Max Level', 'Enhance', 'Unequip'];
    let searchZone = fullText;
    for (const stop of stopWords) {
        const idx = searchZone.search(new RegExp(stop, 'i'));
        if (idx > 0) searchZone = searchZone.slice(0, idx);
    }

    // ─── 5. Все вхождения статов ──────────────────────────────────────
    const occurrences = findStatOccurrences(searchZone);
    if (occurrences.length === 0) return null;

    // ─── 6. Первый стат = main stat (даже если без значения) ──────────
    const mainStatEntry = occurrences[0];
    const mainStat = mainStatEntry.stat;
    const mainStatValueFromOcr = mainStatEntry.value;

    // ─── 7. Level ─────────────────────────────────────────────────────
    const level = extractLevel(
        fullText,
        type,
        mainStat,
        mainStatValueFromOcr
    );

    // ─── 8. mainStatValue — из таблицы ────────────────────────────────
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

    // ─── 9. Сабстаты — только те, у кого есть значение ────────────────
    const substats = occurrences
        .slice(1)
        .filter(o => o.value != null)
        .map(({ stat, value, type: t }) => ({
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