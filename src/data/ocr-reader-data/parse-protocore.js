import { protocoreTypes } from '@data';

const TYPE_MAP = {
    'α': 'alpha', 'a': 'alpha', 'alpha': 'alpha',
    'β': 'beta',  'b': 'beta',  'beta': 'beta',
    'γ': 'gamma', 'y': 'gamma', 'gamma': 'gamma',
    'δ': 'delta', 'd': 'delta', 'delta': 'delta',
};

const STELLACTRUM_COLORS = [
    'violet', 'amber', 'emerald', 'sapphire', 'ruby', 'pearl', 'obsidian',
];

// Известные сабстаты.
// ВАЖНО: порядок — от длинных названий к коротким.
// Это нужно, чтобы "HP Bonus" проверялся раньше, чем "HP".
const KNOWN_SUBSTATS = [
    'DMG Boost to Weakened',
    'Oath Recovery Boost',
    'Expedited Energy Boost',
    'Oath Strength',
    'CRIT Rate', 'CRIT DMG',
    'HP Bonus', 'ATK Bonus', 'DEF Bonus',
    'HP', 'ATK', 'DEF',
];

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function parseProtocore(rawText) {
    if (!rawText) return null;

    // ─── 1. Нормализация ──────────────────────────────────────────────
    const fullText = rawText
        .replace(/[€@&~\\|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

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
    let type = null;
    const typeMatch = fullText.match(/Protocore\s*[-–—]\s*([a-zA-Zαβγδ])/i);
    if (typeMatch) {
        type = TYPE_MAP[typeMatch[1].toLowerCase()] || null;
    }

    // ─── 4. Level ─────────────────────────────────────────────────────
    const levelMatch = fullText.match(/\+(\d{1,2})\b/);
    let level = levelMatch ? parseInt(levelMatch[1], 10) : null;
    if (level != null && (level < 0 || level > 15)) {
        console.warn('[parseProtocore] OCR ошибся с уровнем:', level);
        level = null;
    }

    // ─── 5. Main stat (только из статов ЭТОГО типа) ───────────────────
    let mainStat = null;
    let mainStatValue = null;

    if (type && protocoreTypes[type]) {
        const possibleMainStats = protocoreTypes[type].mainStats.map(s => s.name);

        for (const stat of possibleMainStats) {
            const re = new RegExp(`\\b${escapeRegex(stat)}\\b`, 'i');
            if (re.test(fullText)) {
                mainStat = stat;
                break;
            }
        }

        // Значение из таблицы: values[level] (массив начинается с 0-го уровня)
        if (mainStat && level != null) {
            const statDef = protocoreTypes[type].mainStats.find(
                s => s.name === mainStat
            );
            if (statDef && statDef.values[level] != null) {
                mainStatValue = statDef.values[level];
            }
        }
    }

    // ─── 6. Substats ──────────────────────────────────────────────────
    const substats = [];

    for (const statName of KNOWN_SUBSTATS) {
        const escaped = escapeRegex(statName);

        // Negative lookahead в конце названия:
        // запрещаем совпадение, если сразу за названием идёт пробел + ещё одна буква
        // (например, "HP" не должен матчить "HP Bonus").
        // Исключение — сам стат с пробелом внутри (CRIT Rate, Oath Strength и т.д.),
        // у них escaped уже содержит пробел, и lookahead сработает корректно.
        const nameEnd = `\\b(?!\\s+(?:Bonus|Boost|Rate|DMG|Strength|Recovery|Energy)\\b)`;

        // 6a. Процентный сабстат: "HP Bonus +20.4%"
        const rePercent = new RegExp(
            `${escaped}${nameEnd}[^+\\d%]{0,15}\\+?(\\d+(?:\\.\\d+)?)\\s*%`,
            'i'
        );
        const mPercent = fullText.match(rePercent);

        if (mPercent) {
            substats.push({
                stat: statName,
                value: parseFloat(mPercent[1]),
                type: 'percent',
                _pos: fullText.indexOf(mPercent[0]),
            });
            continue;
        }

        // 6b. Flat сабстат: "HP +856"
        const reFlat = new RegExp(
            `${escaped}${nameEnd}[^+\\d%]{0,15}\\+?(\\d+)\\b(?!\\s*%)`,
            'i'
        );
        const mFlat = fullText.match(reFlat);

        if (mFlat) {
            substats.push({
                stat: statName,
                value: parseInt(mFlat[1], 10),
                type: 'flat',
                _pos: fullText.indexOf(mFlat[0]),
            });
        }
    }

    // ─── 7. Сортировка по позиции в тексте ────────────────────────────
    substats.sort((a, b) => a._pos - b._pos);

    const cleanedSubstats = substats.map(({ _pos, ...rest }) => rest);

    // ─── 8. Финальный объект (без id / createdAt / updatedAt) ────────
    return {
        type,
        stellactrum,
        level,
        mainStat,
        mainStatValue,
        substats: cleanedSubstats,
    };
}