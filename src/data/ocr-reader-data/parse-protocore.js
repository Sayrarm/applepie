import { protocoreTypes } from '@data';

const TYPE_MAP = {
    'α': 'alpha', 'a': 'alpha', 'alpha': 'alpha', '4': 'alpha',
    'β': 'beta',  'b': 'beta',  'beta': 'beta',  '6': 'beta', '3': 'beta',
    'γ': 'gamma', 'y': 'gamma', 'gamma': 'gamma', 'v': 'gamma',
    'δ': 'delta', 'd': 'delta', 'delta': 'delta',
    '§': 'delta', '&': 'delta', '$': 'delta',
    'i': 'delta', '1': 'delta', '0': 'delta',
};

const STELLACTRUM_COLORS = [
    'violet', 'amber', 'emerald', 'sapphire', 'ruby', 'pearl', 'obsidian',
];

const ALL_KNOWN_STATS = [
    'Expedited Energy Boost',
    'Oath Recovery Boost',
    "Oath's Strength",
    'Oath Strength',
    'DMG Boost to Weakened',
    'CRIT Rate', 'CRIT DMG',
    'HP Bonus', 'ATK Bonus', 'DEF Bonus',
    'HP', 'ATK', 'DEF',
];

const MAIN_STAT_TO_TYPES = (() => {
    const map = {};
    for (const [typeKey, typeData] of Object.entries(protocoreTypes)) {
        for (const stat of typeData.mainStats) {
            if (!map[stat.name]) map[stat.name] = [];
            map[stat.name].push(typeKey);
        }
    }
    return map;
})();

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeCamelCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

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
 * Ищет все вхождения стата в тексте.
 * Fuzzy: слова должны идти подряд с малым зазором (до 5 символов),
 * и зазор НЕ должен содержать цифры (иначе это уже другой стат).
 * Требуется совпадение хотя бы (N-1) слов для N>=3, все слова для N<=2.
 */
function findAllStatMatches(fullText, statName) {
    const words = statName.split(/\s+/);
    const results = [];

    if (words.length === 1) {
        const re = new RegExp(`\\b${escapeRegex(words[0])}\\b`, 'gi');
        for (const m of fullText.matchAll(re)) {
            results.push({ pos: m.index, endPos: m.index + m[0].length });
        }
        return results;
    }

    const minMatches = words.length <= 2 ? words.length : words.length - 1;

    // Якорь — первое слово
    const firstRe = new RegExp(`\\b${escapeRegex(words[0])}\\b`, 'gi');
    const firstMatches = [...fullText.matchAll(firstRe)];

    for (const anchor of firstMatches) {
        const startPos = anchor.index;
        let lastEnd = startPos + anchor[0].length;
        let matched = 1;
        let ok = true;

        for (let i = 1; i < words.length; i++) {
            const wordRe = new RegExp(`\\b${escapeRegex(words[i])}\\b`, 'i');
            // Окно от lastEnd до lastEnd + 10 символов (только пробелы/мусор без цифр)
            const window = fullText.slice(lastEnd, lastEnd + 10);

            // Проверяем, что в окне НЕТ цифр (иначе мы ушли к другому стату)
            const beforeMatch = window.match(wordRe);
            if (!beforeMatch) continue;

            const gap = window.slice(0, beforeMatch.index);
            if (/\d/.test(gap)) {
                // Между словами есть цифра — это уже другой стат, не наш
                ok = false;
                break;
            }

            lastEnd = lastEnd + beforeMatch.index + beforeMatch[0].length;
            matched++;
        }

        if (ok && matched >= minMatches) {
            results.push({ pos: startPos, endPos: lastEnd });
        }
    }

    return results;
}

/**
 * Извлекает значение стата, начиная с позиции ПОСЛЕ названия.
 * Устойчив к мусору между названием и числом (но НЕ пропускает цифры).
 * Возвращает {value, type} или null.
 */
function extractStatValue(fullText, statEndPos) {
    // Окно 35 символов — достаточно, чтобы поймать "+ im +13.2%"
    const tail = fullText.slice(statEndPos, statEndPos + 35);

    // Мусор между названием и числом: любые символы, кроме цифр.
    // Не ограничиваем "+" и "%" — они часто попадают в мусор.
    // Главное — чтобы первая цифра, которую встретим, была значением.
    const mPercent = tail.match(/^[^\d]{0,25}?(\d+(?:\.\d+)?)\s*%/);
    if (mPercent) {
        return { value: parseFloat(mPercent[1]), type: 'percent' };
    }

    const mFlat = tail.match(/^[^\d]{0,25}?(\d+)\b(?!\s*%)/);
    if (mFlat) {
        return { value: parseInt(mFlat[1], 10), type: 'flat' };
    }

    return null;
}

/**
 * Ищет каноничное имя стата по значению.
 */
function matchStatByValue(partialName, value) {
    const partial = partialName.toLowerCase().split(/\s+/)[0];

    for (const [typeKey, typeData] of Object.entries(protocoreTypes)) {
        for (const stat of typeData.mainStats) {
            const statFirstWord = stat.name.toLowerCase().split(/\s+/)[0];
            if (!statFirstWord.startsWith(partial) && !partial.startsWith(statFirstWord)) {
                continue;
            }

            for (let lvl = 0; lvl < stat.values.length; lvl++) {
                if (Math.abs(stat.values[lvl] - value) < 0.05) {
                    return { name: stat.name, type: typeKey, level: lvl };
                }
            }
        }
    }
    return null;
}

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

    // ─── 3. Type (символ) ─────────────────────────────────────────────
    const symbolType = extractType(fullText);

    // ─── 4. Стоп-слова ────────────────────────────────────────────────
    const stopWords = ['Max Level', 'Enhance', 'Unequip'];
    let searchZone = fullText;
    for (const stop of stopWords) {
        const idx = searchZone.search(new RegExp(stop, 'i'));
        if (idx > 0) searchZone = searchZone.slice(0, idx);
    }

    // ─── 5. Все вхождения статов ──────────────────────────────────────
    const allOccurrences = [];

    for (const statName of ALL_KNOWN_STATS) {
        const matches = findAllStatMatches(searchZone, statName);
        for (const m of matches) {
            const value = extractStatValue(searchZone, m.endPos);
            allOccurrences.push({
                stat: statName,
                pos: m.pos,
                endPos: m.endPos,
                value: value ? value.value : null,
                valueType: value ? value.type : null,
            });
        }
    }

    allOccurrences.sort((a, b) => a.pos - b.pos);

    // Дедупликация: если два матча начинаются в одной позиции —
    // оставляем более длинное имя стата.
    // Также удаляем "вложенные" матчи: если короткий стат начинается
    // внутри длинного — убираем короткий.
    const deduped = [];
    for (const item of allOccurrences) {
        let skip = false;
        for (let i = deduped.length - 1; i >= 0; i--) {
            const last = deduped[i];
            // Если item начинается внутри last — item вложенный, пропускаем
            if (item.pos >= last.pos && item.pos < last.pos + last.stat.length) {
                // Если у item имя длиннее — заменяем last
                if (item.stat.length > last.stat.length) {
                    deduped.splice(i, 1);
                } else {
                    skip = true;
                }
                break;
            }
            // Если last начинается внутри item — удаляем last
            if (last.pos >= item.pos && last.pos < item.pos + item.stat.length) {
                if (item.stat.length > last.stat.length) {
                    deduped.splice(i, 1);
                } else {
                    skip = true;
                    break;
                }
            }
        }
        if (!skip) deduped.push(item);
    }
    deduped.sort((a, b) => a.pos - b.pos);

    if (deduped.length === 0) return null;

    // ─── 6. Первый стат = main stat ───────────────────────────────────
    const mainEntry = deduped[0];
    let mainStat = mainEntry.stat;
    let mainStatValueFromOcr = mainEntry.value;
    let canonicalLevel = null;
    let canonicalType = null;

    // Восстанавливаем каноничное имя + уровень по значению
    if (mainStatValueFromOcr != null) {
        const canonical = matchStatByValue(mainStat, mainStatValueFromOcr);
        if (canonical) {
            mainStat = canonical.name;
            canonicalLevel = canonical.level;
            canonicalType = canonical.type;
        }
    }

    // ─── 7. Type ──────────────────────────────────────────────────────
    let type = symbolType;
    if (!type) {
        if (MAIN_STAT_TO_TYPES[mainStat] && MAIN_STAT_TO_TYPES[mainStat].length === 1) {
            type = MAIN_STAT_TO_TYPES[mainStat][0];
        } else if (canonicalType) {
            type = canonicalType;
        }
    }

    // Если тип известен, но main не входит в его мейны — попробуем canonicalType
    if (type && protocoreTypes[type]) {
        const possibleMains = protocoreTypes[type].mainStats.map(s => s.name);
        if (!possibleMains.includes(mainStat) && canonicalType) {
            type = canonicalType;
        }
    }

    // ─── 8. Level ─────────────────────────────────────────────────────
    let level = null;

    // 8a. Max Level
    if (/\bMax\s*Level\b/i.test(fullText)) {
        level = 15;
    }

    // 8b. По значению main stat из OCR
    if (level == null && type && mainStatValueFromOcr != null && protocoreTypes[type]) {
        const statDef = protocoreTypes[type].mainStats.find(s => s.name === mainStat);
        if (statDef) {
            for (let lvl = statDef.values.length - 1; lvl >= 0; lvl--) {
                if (Math.abs(statDef.values[lvl] - mainStatValueFromOcr) < 0.05) {
                    level = lvl;
                    break;
                }
            }
        }
    }

    // 8c. Из canonical
    if (level == null && canonicalLevel != null) {
        level = canonicalLevel;
    }

    // 8d. Fallback
    if (level == null) {
        const typeMatch = fullText.match(/Protocore\s*[-–—]/i);
        const nameEnd = typeMatch ? typeMatch.index + typeMatch[0].length : 0;
        const tailText = fullText.slice(nameEnd);
        const candidates = [...tailText.matchAll(/[+#]?(\d{1,2})\b/g)]
            .map(m => parseInt(m[1], 10))
            .filter(n => n >= 0 && n <= 15);
        if (candidates.length > 0) level = candidates[0];
    }

    // ─── 9. mainStatValue ─────────────────────────────────────────────
    // Приоритет: значение из OCR (если найдено matchStatByValue,
    // значит оно точно совпадает с таблицей). Иначе — из таблицы по уровню.
    let mainStatValue = mainStatValueFromOcr;
    if (mainStatValue == null && type && level != null && protocoreTypes[type]) {
        const statDef = protocoreTypes[type].mainStats.find(s => s.name === mainStat);
        if (statDef && statDef.values[level] != null) {
            mainStatValue = statDef.values[level];
        }
    }

    // ─── 10. Сабстаты ─────────────────────────────────────────────────
    const substats = deduped
        .slice(1)
        .filter(o => o.value != null)
        .map(({ stat, value, valueType }) => ({
            stat,
            value,
            type: valueType,
        }));

    return {
        type,
        stellactrum,
        level,
        mainStat,
        mainStatValue,
        substats,
    };
}