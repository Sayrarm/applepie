import {
    getCardLevel,
    getCardRank,
    getCardAscend,
} from "@localstorage";
import {
    getStatsWithRank,
    createEmptyStats,
    applyBaseCritDmgBonus,
    calculateFinalStats,
    mergeStats,
} from "@data";

/**
 * Парсит стат в нормализованный вид
 */
const normalizeStat = (stat) => {
    return stat.toLowerCase().replace(/\s+/g, "_").replace(/_+/g, "_");
};

/**
 * Проверяет, матчится ли имя стата протокора с целевым.
 * "ATK" матчится и с "ATK", и с "ATK Bonus".
 */
const statMatches = (protocoreStatName, targetStatName) => {
    if (!protocoreStatName || !targetStatName) return false;
    const a = normalizeStat(protocoreStatName);
    const b = normalizeStat(targetStatName);
    if (!a || !b) return false;
    return a === b || a.includes(b) || b.includes(a);
};

/**
 * Считает score протокора по целевым статам.
 *
 * targets:
 *   mainStatFilter — точное имя main stat протокора (Expedited Energy Boost / DMG Boost to Weakened)
 *   subStat1 — HP / ATK / DEF (приоритетный сабстат, ×3)
 *   subStat2 — остальные сабстаты (×2)
 */
export const scoreProtocore = (protocore, targets = {}) => {
    let score = 0;

    // === 1. Main stat протокора (например, Expedited Energy Boost) ===
    if (targets.mainStatFilter && protocore.mainStat) {
        if (statMatches(protocore.mainStat, targets.mainStatFilter)) {
            score += 10;
        }
    }

    // === 2. Sub Stat 1 (HP / ATK / DEF) — приоритетный сабстат ===
    if (targets.subStat1 && protocore.substats) {
        protocore.substats.forEach((sub) => {
            if (statMatches(sub.stat, targets.subStat1)) {
                score += (sub.value || 0) * 3;
            }
        });
    }

    // === 3. Sub Stat 2 (остальные сабстаты) ===
    if (targets.subStat2 && protocore.substats) {
        protocore.substats.forEach((sub) => {
            if (statMatches(sub.stat, targets.subStat2)) {
                score += (sub.value || 0) * 2;
            }
        });
    }

    return score;
};

/**
 * Разделяет все протокоры по типам
 */
export const splitProtocoresByType = (allProtocores) => {
    return {
        alpha: allProtocores.filter((p) => p.type === "alpha"),
        beta: allProtocores.filter((p) => p.type === "beta"),
        gamma: allProtocores.filter((p) => p.type === "gamma"),
        delta: allProtocores.filter((p) => p.type === "delta"),
    };
};

/**
 * Сортирует протокоры по score
 */
export const sortByScore = (protocores, targets) => {
    return [...protocores]
        .map((p) => ({ protocore: p, score: scoreProtocore(p, targets) }))
        .sort((a, b) => b.score - a.score);
};

/**
 * Получает базовые статы карточки из localStorage (без протокоров)
 */
export const getCardBaseStats = (card) => {
    if (!card) return null;

    const cardId = String(card.id);
    const level = getCardLevel(cardId);
    const rank = getCardRank(cardId);
    const isAscended = getCardAscend(cardId);

    return getStatsWithRank(card, level, rank, isAscended);
};

/**
 * Фильтрует пул протокоров по цвету (стеллактруму) карточки.
 * Если карточки нет или у неё нет stellaName — возвращает пул как есть.
 */
const filterByStella = (protocores, card) => {
    if (!card || !card.stellaName) return protocores;
    return protocores.filter((p) => p.stellactrum === card.stellaName);
};

/**
 * Проверяет, подходит ли протокор под основную цель (main stat протокора).
 * Sub Stat 1 / Sub Stat 2 здесь НЕ участвуют — они только повышают score.
 */
const matchesTarget = (protocore, targets) => {
    if (!targets.mainStatFilter) return true; // нет строгой цели — все подходят
    if (!protocore.mainStat) return false;
    return statMatches(protocore.mainStat, targets.mainStatFilter);
};

/**
 * Как pickTopN, но исключает уже использованные id и возвращает N штук,
 * помечая выбранные как использованные.
 */
const pickTopNExcluding = (protocores, targets, usedIds, n) => {
    const pool = protocores.filter((p) => !usedIds.has(p.id));

    // 1. Сначала — подходящие под mainStatFilter
    const matching = pool.filter((p) => matchesTarget(p, targets));
    const sortedMatching = sortByScore(matching, targets).map((s) => s.protocore);

    let picked;
    if (sortedMatching.length >= n) {
        picked = sortedMatching.slice(0, n);
    } else {
        // 2. Фолбэк — дополняем лучшими из оставшихся
        const matchingIds = new Set(sortedMatching.map((p) => p.id));
        const others = pool.filter((p) => !matchingIds.has(p.id));
        const sortedOthers = sortByScore(others, targets).map((s) => s.protocore);
        picked = [...sortedMatching, ...sortedOthers].slice(0, n);
    }

    picked.forEach((p) => usedIds.add(p.id));
    return picked;
};

/**
 * Выбирает лучший протокор по цели (с учётом score).
 * Помечает выбранный как использованный.
 */
export const pickBest = (protocores, targets, usedIds = new Set()) => {
    const pool = protocores.filter((p) => !usedIds.has(p.id));

    // 1. Сначала — те, что подходят под mainStatFilter
    const matching = pool.filter((p) => matchesTarget(p, targets));
    const sortedMatching = sortByScore(matching, targets);

    if (sortedMatching.length > 0) {
        const picked = sortedMatching[0].protocore;
        usedIds.add(picked.id);
        return picked;
    }

    // 2. Фолбэк — лучший из оставшихся
    const sortedAll = sortByScore(pool, targets);
    const picked = sortedAll[0]?.protocore || null;
    if (picked) usedIds.add(picked.id);
    return picked;
};

/**
 * Главная функция оптимизации
 */
export const optimizeTeam = ({ cards, allProtocores, targets }) => {
    const { alpha, beta, gamma, delta } = splitProtocoresByType(allProtocores);

    // Карточки по слотам
    const solar1Card = cards?.solar1 || null;
    const solar2Card = cards?.solar2 || null;
    const lunar1Card = cards?.lunar1 || null;
    const lunar2Card = cards?.lunar2 || null;
    const lunar3Card = cards?.lunar3 || null;
    const lunar4Card = cards?.lunar4 || null;

    // Пулы по цвету для каждой карточки
    const betaForSolar1 = filterByStella(beta, solar1Card);
    const betaForSolar2 = filterByStella(beta, solar2Card);
    const alphaForSolar1 = filterByStella(alpha, solar1Card);
    const alphaForSolar2 = filterByStella(alpha, solar2Card);

    const deltaForLunar = [
        filterByStella(delta, lunar1Card),
        filterByStella(delta, lunar2Card),
        filterByStella(delta, lunar3Card),
        filterByStella(delta, lunar4Card),
    ];

    const gammaForLunar = [
        filterByStella(gamma, lunar1Card),
        filterByStella(gamma, lunar2Card),
        filterByStella(gamma, lunar3Card),
        filterByStella(gamma, lunar4Card),
    ];

    // Базовые цели (subStat1, subStat2) — для всех слотов
    const baseTargets = {
        subStat1: targets.subStat1,
        subStat2: targets.subStat2,
    };

    // ===== Единый набор использованных протокоров =====
    const usedIds = new Set();

    // ===== SOLAR 1 =====
    const bestBeta1 = pickBest(
        betaForSolar1,
        { ...baseTargets, mainStatFilter: targets.beta1 },
        usedIds,
    );

    const bestAlpha1 = pickBest(alphaForSolar1, baseTargets, usedIds);

    // ===== SOLAR 2 =====
    const bestBeta2 = pickBest(
        betaForSolar2,
        { ...baseTargets, mainStatFilter: targets.beta2 },
        usedIds,
    );

    const bestAlpha2 = pickBest(alphaForSolar2, baseTargets, usedIds);

    // ===== LUNAR: Delta =====
    const deltaTargets = { ...baseTargets, mainStatFilter: targets.delta };
    const bestDeltaForLunar = deltaForLunar.map(
        (pool) => pickTopNExcluding(pool, deltaTargets, usedIds, 1)[0] || null
    );

    // ===== LUNAR: Gamma =====
    const bestGammaForLunar = gammaForLunar.map(
        (pool) => pickTopNExcluding(pool, baseTargets, usedIds, 1)[0] || null
    );

    const results = {
        solar1: { alpha: bestAlpha1, beta: bestBeta1 },
        solar2: { alpha: bestAlpha2, beta: bestBeta2 },
        lunar1: { gamma: bestGammaForLunar[0], delta: bestDeltaForLunar[0] },
        lunar2: { gamma: bestGammaForLunar[1], delta: bestDeltaForLunar[1] },
        lunar3: { gamma: bestGammaForLunar[2], delta: bestDeltaForLunar[2] },
        lunar4: { gamma: bestGammaForLunar[3], delta: bestDeltaForLunar[3] },
    };

    return { results };
};

/**
 * Собирает суммарные статы команды (для StatsTable):
 * для каждой карточки считает финальные статы через calculateFinalStats
 * (как в Showcase) и складывает их. В конце — +150 CRIT DMG.
 */
export const calculateTeamStats = (cards, results) => {
    const total = createEmptyStats();

    Object.entries(cards).forEach(([slotId, card]) => {
        if (!card) return;

        const baseStats = getCardBaseStats(card);
        if (!baseStats) return;

        // Протокоры, подобранные оптимизатором для этого слота
        const slotResults = results[slotId] || {};
        const protocores = Object.values(slotResults).filter(Boolean);

        // Считаем финальные статы карточки — ТАК ЖЕ, как в Showcase
        const cardFinalStats = calculateFinalStats(card, baseStats, protocores);
        if (cardFinalStats) {
            mergeStats(total, cardFinalStats);
        }
    });

    // +150 CRIT DMG (базовый бонус)
    return applyBaseCritDmgBonus(total);
};

/**
 * Считает статы для конкретной карточки с её протокорами - пока не применяется нигде
 */
export const calculateCardStats = (card, cardResults) => {
    if (!card) return null;

    const baseStats = getCardBaseStats(card);
    if (!baseStats) return null;

    const protocores = Object.values(cardResults || {}).filter(Boolean);
    const cardStats = calculateFinalStats(card, baseStats, protocores);
    if (!cardStats) return null;

    return applyBaseCritDmgBonus(cardStats);
};