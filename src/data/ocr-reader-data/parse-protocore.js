import { protocoreTypes } from '@data';

// Карта символов → ключи в protocoreTypes.
// Включает как корректные греческие буквы, так и частые OCR-ошибки.
const TYPE_MAP = {
    // alpha
    'α': 'alpha', 'a': 'alpha', 'alpha': 'alpha', '4': 'alpha',
    // beta
    'β': 'beta', 'b': 'beta', 'beta': 'beta', '6': 'beta',
    // gamma
    'γ': 'gamma', 'y': 'gamma', 'gamma': 'gamma', 'v': 'gamma',
    // delta
    'δ': 'delta', 'd': 'delta', 'delta': 'delta',
    '§': 'delta', '&': 'delta', '$': 'delta',
    'i': 'delta', '1': 'delta', '0': 'delta',
};

const STELLACTRUM_COLORS = [
    'violet', 'amber', 'emerald', 'sapphire', 'ruby', 'pearl', 'obsidian',
];

const KNOWN_SUBSTATS = [
    "Oath's Strength", // ← вариант с апострофом, как на 4.png
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

/**
 * Извлекает уровень протокора.
 * Ищет первую короткую цифровую последовательность (1-2 цифры) в диапазоне 0..15,
 * которая не является частью другого числа.
 */
function extractLevel(fullText) {
    // Ищем "+N" или просто "N" как отдельное число
    // \b вокруг + опционально, чтобы поймать "515" или "8:5"
    // Основной вариант — с плюсом:
    let match = fullText.match(/(?:^|\s|\+)(\d{1,2})(?:\s|$|\))/);

    // Fallback: ищем любую короткую последовательность 0..15 в начале текста
    if (!match) {
        match = fullText.match(/\b(\d{1,2})\b/);
    }

    if (!match) return null;

    // Может быть несколько совпадений — перебираем все и берём первое подходящее
    const candidates = [...fullText.matchAll(/\b(\d{1,2})\b/g)]
        .map(m => parseInt(m[1], 10))
        .filter(n => n >= 0 && n <= 15);

    return candidates.length > 0 ? candidates[0] : null;
}

/**
 * Извлекает символ типа (α/β/γ/δ) из строки "Protocore - X".
 * Берёт символ сразу после дефиса, а не из всего текста.
 */
function extractType(fullText) {
    // Регексп: "Protocore" + дефис/тире + (пробелы/мусор) + символ(ы)
    // Захватываем до 3 символов, чтобы поймать "i B", "§&" и т.д.
    const m = fullText.match(/Protocore\s*[-–—]\s*([^\s]{1,3})/i);
    if (!m) return null;

    const raw = m[1].toLowerCase();

    // Ищем первый символ, который есть в TYPE_MAP
    for (const ch of raw) {
        if (TYPE_MAP[ch]) return TYPE_MAP[ch];
    }
    return null;
}

/**
 * Основная функция парсинга OCR-текста в объект протокора
 */
export function parseProtocore(rawText) {
    if (!rawText) return null;

    // ─── 1. Нормализация ──────────────────────────────────────────────
    const fullText = rawText
        .replace(/[€~\\|]/g, ' ')           // мусор (НЕ трогаем § & $ — они нужны)
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
    const type = extractType(fullText);

    // ─── 4. Level ─────────────────────────────────────────────────────
    const level = extractLevel(fullText);

    // ─── 5. Main stat (только из статов ЭТОГО типа) ───────────────────
    let mainStat = null;
    let mainStatValue = null;
    let mainStatPos = -1; // позиция main stat в fullText — чтобы исключить из сабстатов

    if (type && protocoreTypes[type]) {
        const possibleMainStats = protocoreTypes[type].mainStats.map(s => s.name);

        for (const stat of possibleMainStats) {
            const re = new RegExp(`\\b${escapeRegex(stat)}\\b`, 'i');
            const m = fullText.match(re);
            if (m) {
                mainStat = stat;
                mainStatPos = m.index;
                break;
            }
        }

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
        // Пропускаем сам main stat — не хотим дублировать его в сабстатах
        // (но осторожно: "HP" может быть и main "HP", и сабстат "HP" одновременно —
        //  в 1.png main = "HP" +4000, а сабстат "HP" +970. Это два разных вхождения.)
        // Решение: находим ВСЕ вхождения и берём то, что НЕ пересекается с main stat.

        const escaped = escapeRegex(statName);
        // Negative lookahead после названия: запрещает "HP" матчиться в "HP Bonus"
        const nameEnd = `\\b(?!\\s+(?:Bonus|Boost|Rate|DMG|Strength|Recovery|Energy)\\b)`;

        // Ищем все вхождения названия в тексте
        const nameRe = new RegExp(`${escaped}${nameEnd}`, 'gi');
        const allMatches = [...fullText.matchAll(nameRe)];

        for (const nameMatch of allMatches) {
            const startPos = nameMatch.index;

            // Пропускаем вхождение, если оно совпадает с позицией main stat
            if (startPos === mainStatPos) continue;

            // Отрезаем кусок текста начиная с этого названия (до 30 символов вперёд)
            const tail = fullText.slice(startPos, startPos + 30);

            // 6a. Процентный вариант
            const rePercent = new RegExp(
                `^${escaped}${nameEnd}[^+\\d%]{0,15}\\+?(\\d+(?:\\.\\d+)?)\\s*%`,
                'i'
            );
            const mPercent = tail.match(rePercent);

            if (mPercent) {
                substats.push({
                    stat: statName,
                    value: parseFloat(mPercent[1]),
                    type: 'percent',
                    _pos: startPos,
                });
                break; // нашли — переходим к следующему сабстату
            }

            // 6b. Flat вариант
            const reFlat = new RegExp(
                `^${escaped}${nameEnd}[^+\\d%]{0,15}\\+?(\\d+)\\b(?!\\s*%)`,
                'i'
            );
            const mFlat = tail.match(reFlat);

            if (mFlat) {
                substats.push({
                    stat: statName,
                    value: parseInt(mFlat[1], 10),
                    type: 'flat',
                    _pos: startPos,
                });
                break;
            }
        }
    }

    // ─── 7. Сортировка по позиции ─────────────────────────────────────
    substats.sort((a, b) => a._pos - b._pos);
    const cleanedSubstats = substats.map(({ _pos, ...rest }) => rest);

    // ─── 8. Результат ─────────────────────────────────────────────────
    return {
        type,
        stellactrum,
        level,
        mainStat,
        mainStatValue,
        substats: cleanedSubstats,
    };
}