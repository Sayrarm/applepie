import { protocoreTypes } from '@data';

// Соответствие греческих букв и OCR-ошибок → ключи в protocoreTypes
const TYPE_MAP = {
    'α': 'alpha', 'a': 'alpha', 'alpha': 'alpha',
    'β': 'beta',  'b': 'beta',  'beta': 'beta',
    'γ': 'gamma', 'y': 'gamma', 'gamma': 'gamma', // OCR часто читает γ как y
    'δ': 'delta', 'd': 'delta', 'delta': 'delta',
};

// Возможные цвета сталактитов
const STELLACTRUM_COLORS = [
    'violet', 'amber', 'emerald', 'sapphire', 'ruby', 'pearl', 'obsidian',
];

// Известные сабстаты (используются для поиска в тексте)
// ВАЖНО: порядок не важен — сортировка идёт по позиции в fullText
const KNOWN_SUBSTATS = [
    'DMG Boost to Weakened',
    'Oath Recovery Boost',
    'Expedited Energy Boost',
    'Oath Strength',
    'CRIT Rate', 'CRIT DMG',
    'HP Bonus', 'ATK Bonus', 'DEF Bonus',
    'HP', 'ATK', 'DEF',
];

/**
 * Экранирование спецсимволов для использования в RegExp
 */
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Основная функция парсинга OCR-текста в объект протокора
 * @param {string} rawText - сырой текст из Tesseract
 * @returns {object|null} - объект протокора в формате localStorage, или null
 */
export function parseProtocore(rawText) {
    if (!rawText) return null;

    // ─── 1. Нормализация ──────────────────────────────────────────────
    // Убираем мусорные символы, схлопываем пробелы.
    // НЕ разбиваем на строки — некоторые сабстаты переносятся ("DMG Boost to\nWeakened").
    const fullText = rawText
        .replace(/[€@&~\\|]/g, ' ')   // мусор от OCR
        .replace(/\s+/g, ' ')          // множественные пробелы/переносы → один пробел
        .trim();

    // ─── 2. Stellactrum (цвет) ────────────────────────────────────────
    let stellactrum = null;
    for (const color of STELLACTRUM_COLORS) {
        if (new RegExp(`\\b${color}\\b`, 'i').test(fullText)) {
            stellactrum = color;
            break;
        }
    }
    if (!stellactrum) return null; // без цвета — не наш случай

    // ─── 3. Type (alpha/beta/gamma/delta) ─────────────────────────────
    // Ищем "Protocore - X" где X — греческая буква или её OCR-замена
    let type = null;
    const typeMatch = fullText.match(/Protocore\s*[-–—]\s*([a-zA-Zαβγδ])/i);
    if (typeMatch) {
        type = TYPE_MAP[typeMatch[1].toLowerCase()] || null;
    }

    // ─── 4. Level (0..15) ─────────────────────────────────────────────
    const levelMatch = fullText.match(/\+(\d{1,2})\b/);
    let level = levelMatch ? parseInt(levelMatch[1], 10) : null;
    if (level != null && (level < 0 || level > 15)) {
        console.warn('[parseProtocore] OCR ошибся с уровнем:', level);
        level = null;
    }

    // ─── 5. Main stat (название) ──────────────────────────────────────
    // Собираем все возможные мейн-статы из таблицы
    const allMainStats = [
        ...new Set(
            Object.values(protocoreTypes).flatMap(t =>
                t.mainStats.map(s => s.name)
            )
        ),
    ];

    let mainStat = null;
    for (const stat of allMainStats) {
        const re = new RegExp(`\\b${escapeRegex(stat)}\\b`, 'i');
        if (re.test(fullText)) {
            mainStat = stat;
            break;
        }
    }

    // ─── 6. Main stat value (из таблицы, индекс = уровень) ────────────
    // В protocoreTypes массив values начинается с 0-го уровня,
    // поэтому values[level] даёт правильное значение.
    let mainStatValue = null;
    if (type && mainStat && level != null) {
        const statDef = protocoreTypes[type]?.mainStats.find(
            s => s.name === mainStat
        );
        if (statDef && statDef.values[level] != null) {
            mainStatValue = statDef.values[level];
        }
    }

    // ─── 7. Substats ──────────────────────────────────────────────────
    const substats = [];

    for (const statName of KNOWN_SUBSTATS) {
        const escaped = escapeRegex(statName);

        // 7a. Процентный сабстат: "HP Bonus +20.4%"
        // Между названием и числом допускаем мусор (до 15 символов), но не ещё одну цифру.
        const rePercent = new RegExp(
            `${escaped}[^+\\d%]{0,15}\\+?(\\d+(?:\\.\\d+)?)\\s*%`,
            'i'
        );
        const mPercent = fullText.match(rePercent);

        if (mPercent) {
            substats.push({
                stat: statName,
                value: parseFloat(mPercent[1]),
                type: 'percent',
                _pos: fullText.indexOf(mPercent[0]), // для сортировки
            });
            continue; // нашли percent — flat для этого стата не ищем
        }

        // 7b. Flat сабстат: "HP +856"
        // ВАЖНО: (?!\s*%) — число НЕ должно сопровождаться знаком процента.
        // Также negative lookahead на цифры в начале, чтобы не поймать хвост числа.
        const reFlat = new RegExp(
            `${escaped}[^+\\d%]{0,15}\\+?(\\d+)\\b(?!\\s*%)`,
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

    // ─── 8. Сортировка по позиции в тексте (порядок как на скрине) ────
    substats.sort((a, b) => a._pos - b._pos);

    // Убираем служебное поле _pos
    const cleanedSubstats = substats.map(({ _pos, ...rest }) => rest);

    // ─── 9. Финальный объект ──────────────────────────────────────────
    const now = new Date().toISOString();

    return {
        id: Date.now(),
        type,
        stellactrum,
        level,
        mainStat,
        mainStatValue,
        substats: cleanedSubstats,
        createdAt: now,
        updatedAt: now,
    };
}