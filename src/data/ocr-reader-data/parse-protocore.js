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
 * Ищет main stat по значению с проверкой контекста.
 * Используется ТОЛЬКО в fallback (шаг 6b), когда имя main stat разорвано OCR.
 */
function findMainStatByValueWithContext(value, searchZone, pos) {
    if (value == null) return null;

    // Узкое окно контекста: только непосредственное окружение позиции.
    // Это критично, чтобы не захватить соседние статы.
    const ctxStart = Math.max(0, pos - 8);
    const ctxEnd = Math.min(searchZone.length, pos + 12);
    const ctx = searchZone.slice(ctxStart, ctxEnd).toLowerCase();

    const candidates = [];
    for (const [typeKey, typeData] of Object.entries(protocoreTypes)) {
        for (const stat of typeData.mainStats) {
            for (let lvl = 0; lvl < stat.values.length; lvl++) {
                if (Math.abs(stat.values[lvl] - value) < 0.05) {
                    candidates.push({ type: typeKey, name: stat.name, level: lvl });
                }
            }
        }
    }

    if (candidates.length === 0) return null;

    const uniqueNames = [...new Set(candidates.map(c => c.name))];

    // Случай 1: значение уникально для одного стата
    if (uniqueNames.length === 1) {
        const name = uniqueNames[0];
        const words = name.toLowerCase().split(/\s+/);
        const hasAny = words.some(w => w.length >= 3 && ctx.includes(w));
        if (hasAny) {
            return candidates[0];
        }
    }

    // Случай 2: значение у нескольких статов — требуем точного первого слова
    for (const c of candidates) {
        const firstWord = c.name.toLowerCase().split(/\s+/)[0];
        if (firstWord.length < 3) continue;
        const re = new RegExp(`\\b${firstWord}\\b`, 'i');
        if (re.test(ctx)) {
            return c;
        }
    }

    return null;
}

function findLevelForStat(type, statName, value) {
    if (value == null || !type || !protocoreTypes[type]) return null;
    const statDef = protocoreTypes[type].mainStats.find(s => s.name === statName);
    if (!statDef) return null;
    for (let lvl = statDef.values.length - 1; lvl >= 0; lvl--) {
        if (Math.abs(statDef.values[lvl] - value) < 0.05) return lvl;
    }
    return null;
}

function canonicalMainName(partialName, fullText, pos, endPos) {
    const partial = partialName.toLowerCase();
    if (MAIN_STAT_TO_TYPES[partialName]) return partialName;

    const left = fullText.slice(Math.max(0, pos - 15), pos).toLowerCase();
    const right = fullText.slice(endPos, endPos + 15).toLowerCase();
    const context = left + ' ' + partial + ' ' + right;

    let best = null;
    let bestScore = 0;
    for (const name of Object.keys(MAIN_STAT_TO_TYPES)) {
        const words = name.toLowerCase().split(/\s+/);
        let score = 0;
        for (const w of words) {
            if (context.includes(w)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            best = name;
        }
    }
    return best || partialName;
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

    // Дедупликация перекрытий: длинное имя вытесняет короткое
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

    // ─── 6. Выбор main stat ───────────────────────────────────────────
    let mainEntry = null;

    // 6a. Первый кандидат из deduped, чьё значение совпадает
    //     со значением ЭТОГО ЖЕ стата в protocoreTypes.
    //     Это самая надёжная проверка: не важно, где стоит число и что
    //     рядом в контексте — главное, что (имя, значение) совпадают.
    for (const candidate of deduped) {
        if (candidate.value == null) continue;

        const typesToCheck = symbolType
            ? [symbolType]
            : Object.keys(protocoreTypes);

        let matchedLevel = null;
        let matchedType = null;

        for (const t of typesToCheck) {
            if (!protocoreTypes[t]) continue;
            const statDef = protocoreTypes[t].mainStats.find(
                s => s.name === candidate.stat
            );
            if (!statDef) continue;
            for (let lvl = 0; lvl < statDef.values.length; lvl++) {
                if (Math.abs(statDef.values[lvl] - candidate.value) < 0.05) {
                    matchedLevel = lvl;
                    matchedType = t;
                    break;
                }
            }
            if (matchedLevel != null) break;
        }

        if (matchedLevel != null) {
            mainEntry = {
                ...candidate,
                canonicalName: candidate.stat,
                canonicalType: matchedType,
                canonicalLevel: matchedLevel,
            };
            break;
        }
    }

    // 6b. Fallback: сканируем числа в тексте (для случая, когда
    //     имя main stat разорвано OCR и не совпадает с таблицей напрямую).
    if (!mainEntry) {
        const valueMatches = [...searchZone.matchAll(/(?<!#)\b(\d+(?:\.\d+)?)\s*(%)?/g)];

        // Сначала проценты, потом остальное
        const sorted = [...valueMatches].sort((a, b) => {
            const aPct = a[2] === '%' ? 0 : 1;
            const bPct = b[2] === '%' ? 0 : 1;
            if (aPct !== bPct) return aPct - bPct;
            return a.index - b.index;
        });

        for (const vm of sorted) {
            const value = parseFloat(vm[1]);
            if (isNaN(value)) continue;

            const hasPercent = vm[2] === '%';

            // Пропускаем числа-уровни: без %, < 100, рядом # или +
            if (!hasPercent && value < 100) {
                const before = searchZone.slice(Math.max(0, vm.index - 5), vm.index);
                if (/[#+]/.test(before)) continue;
            }

            const match = findMainStatByValueWithContext(value, searchZone, vm.index);
            if (match && (!symbolType || match.type === symbolType)) {
                mainEntry = {
                    stat: match.name,
                    pos: vm.index,
                    endPos: vm.index + vm[0].length,
                    value,
                    valueType: hasPercent ? 'percent' : 'flat',
                    canonicalName: match.name,
                    canonicalType: match.type,
                    canonicalLevel: match.level,
                };
                break;
            }
        }
    }

    // 6c. Fallback: первый кандидат
    if (!mainEntry) {
        mainEntry = deduped[0];
    }

    // ─── 7. Имя main stat ─────────────────────────────────────────────
    let mainStat = mainEntry.canonicalName || mainEntry.stat;

    if (!mainEntry.canonicalName && mainEntry.value != null) {
        const again = findMainStatByValueWithContext(
            mainEntry.value,
            searchZone,
            mainEntry.pos
        );
        if (again && (!symbolType || again.type === symbolType)) {
            mainStat = again.name;
            mainEntry.canonicalName = again.name;
            mainEntry.canonicalType = again.type;
            mainEntry.canonicalLevel = again.level;
        } else {
            mainStat = canonicalMainName(
                mainEntry.stat,
                searchZone,
                mainEntry.pos,
                mainEntry.endPos
            );
        }
    }

    const mainStatValueFromOcr = mainEntry.value;

    // ─── 8. Type ──────────────────────────────────────────────────────
    let type = symbolType;

    if (!type) {
        if (mainEntry.canonicalType) {
            type = mainEntry.canonicalType;
        } else if (MAIN_STAT_TO_TYPES[mainStat]?.length === 1) {
            type = MAIN_STAT_TO_TYPES[mainStat][0];
        }
    }

    // Если тип известен, но main не входит в его мейны — попробуем canonicalType
    if (type && protocoreTypes[type]) {
        const possibleMains = protocoreTypes[type].mainStats.map(s => s.name);
        if (!possibleMains.includes(mainStat) && mainEntry.canonicalType) {
            type = mainEntry.canonicalType;
        }
    }

    // ─── 9. Level ─────────────────────────────────────────────────────
    let level = null;

    // 8a. Max Level
    if (/\bMax\s*Level\b/i.test(fullText)) {
        level = 15;
    }

    if (level == null && type && mainStatValueFromOcr != null) {
        level = findLevelForStat(type, mainStat, mainStatValueFromOcr);
    }

    if (level == null && mainEntry.canonicalLevel != null) {
        level = mainEntry.canonicalLevel;
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

    // ─── 10. mainStatValue ────────────────────────────────────────────
    let mainStatValue = mainStatValueFromOcr;
    if (mainStatValue == null && type && level != null && protocoreTypes[type]) {
        const statDef = protocoreTypes[type].mainStats.find(s => s.name === mainStat);
        if (statDef && statDef.values[level] != null) {
            mainStatValue = statDef.values[level];
        }
    }

    // ─── 11. Сабстаты ─────────────────────────────────────────────────
    const mainEntryPos = mainEntry.pos;

    // Собираем "сырые" сабстаты: всё, кроме main stat ПО ПОЗИЦИИ.
    // Это позволяет сохранить, например, "HP" как flat-сабстат,
    // когда main stat тоже "HP" (но в другой позиции).
    const rawSubstats = deduped.filter(o => {
        if (o.pos === mainEntryPos) return false;
        return o.value != null;
    });

    // Дедупликация по имени стата: одинаковых сабстатов быть не может.
    // Если два HP Bonus — берём первый (верхний на скрине).
    const seenStats = new Set();
    const uniqueSubstats = [];
    for (const o of rawSubstats) {
        const normalized = o.stat.replace(/'/g, '').toLowerCase();
        if (seenStats.has(normalized)) continue;
        seenStats.add(normalized);
        uniqueSubstats.push(o);
    }

    // Максимум 4 сабстата
    const finalSubstats = uniqueSubstats.slice(0, 4);

    const substats = finalSubstats.map(({ stat, value, valueType }) => ({
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