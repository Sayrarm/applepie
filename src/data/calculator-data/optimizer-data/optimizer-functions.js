import {
    getCardLevel,
    getCardRank,
    getCardAscend,
} from "@localstorage";
import {
    getStatsWithRank,
    createEmptyStats,
    addProtocoreStats,
    addBaseStats,
    applyBaseCritDmgBonus,
} from "@data";

/**
 * Парсит стат в нормализованный вид
 */
const normalizeStat = (stat) => {
    return stat.toLowerCase().replace(/\s+/g, "_").replace(/_+/g, "_");
};

/**
 * Считает score протокора по целевым статам
 */
export const scoreProtocore = (protocore, targets = {}) => {
    let score = 0;

    if (targets.mainStat && protocore.mainStat) {
        const protocoreMain = normalizeStat(protocore.mainStat);
        const targetMain = normalizeStat(targets.mainStat);
        if (protocoreMain.includes(targetMain) || targetMain.includes(protocoreMain)) {
            score += 10;
        }
    }

    if (targets.subStat && protocore.substats) {
        protocore.substats.forEach((sub) => {
            const subKey = normalizeStat(sub.stat);
            const targetSub = normalizeStat(targets.subStat);

            if (subKey === targetSub || subKey.includes(targetSub) || targetSub.includes(subKey)) {
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
 * Как pickTopN, но исключает уже использованные id и возвращает N штук,
 * помечая выбранные как использованные.
 */
const pickTopNExcluding = (protocores, targets, usedIds, n) => {
    const pool = protocores.filter((p) => !usedIds.has(p.id));

    const matching = pool.filter((p) => matchesTarget(p, targets));
    const sortedMatching = sortByScore(matching, targets).map((s) => s.protocore);

    let picked;
    if (sortedMatching.length >= n) {
        picked = sortedMatching.slice(0, n);
    } else {
        const matchingIds = new Set(sortedMatching.map((p) => p.id));
        const others = pool.filter((p) => !matchingIds.has(p.id));
        const sortedOthers = sortByScore(others, targets).map((s) => s.protocore);
        picked = [...sortedMatching, ...sortedOthers].slice(0, n);
    }

    picked.forEach((p) => usedIds.add(p.id));
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

    // ===== Единый набор использованных протокоров =====
    const usedIds = new Set();

    // ===== SOLAR 1 =====
    const solar1BetaTargets = { subStat: targets.beta1, mainStat: targets.beta1 };
    const bestBeta1 = pickBest(betaForSolar1, solar1BetaTargets, usedIds);

    const alphaTargets = { subStat: targets.subStat };
    const bestAlpha1 = pickBest(alphaForSolar1, alphaTargets, usedIds);

    // ===== SOLAR 2 =====
    const solar2BetaTargets = { subStat: targets.beta2, mainStat: targets.beta2 };
    const bestBeta2 = pickBest(betaForSolar2, solar2BetaTargets, usedIds);

    const bestAlpha2 = pickBest(alphaForSolar2, alphaTargets, usedIds);

    // ===== LUNAR: Delta =====
    const deltaTargets = { subStat: targets.delta, mainStat: targets.delta };
    const bestDeltaForLunar = deltaForLunar.map(
        (pool) => pickTopNExcluding(pool, deltaTargets, usedIds, 1)[0] || null
    );

    // ===== LUNAR: Gamma =====
    const gammaTargets = { subStat: targets.subStat };
    const bestGammaForLunar = gammaForLunar.map(
        (pool) => pickTopNExcluding(pool, gammaTargets, usedIds, 1)[0] || null
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
 * Проверяет, подходит ли протокор под цель (mainStat или subStat)
 */
const matchesTarget = (protocore, targets) => {
    const matchesMain = targets.mainStat && protocore.mainStat
        ? normalizeStat(protocore.mainStat).includes(normalizeStat(targets.mainStat))
        : false;

    const matchesSub = targets.subStat && protocore.substats
        ? protocore.substats.some((sub) =>
            normalizeStat(sub.stat).includes(normalizeStat(targets.subStat))
        )
        : false;

    return matchesMain || matchesSub;
};

/**
 * Выбирает лучший протокор по цели (с учётом score)
 * @param {Array} protocores — пул протокоров
 * @param {Object} targets — цели
 * @param usedIds
 */
export const pickBest = (protocores, targets, usedIds = new Set()) => {
    const pool = protocores.filter((p) => !usedIds.has(p.id));

    // Сначала — те, что подходят под цель
    const matching = pool.filter((p) => matchesTarget(p, targets));
    const sortedMatching = sortByScore(matching, targets);

    if (sortedMatching.length > 0) {
        const picked = sortedMatching[0].protocore;
        usedIds.add(picked.id);
        return picked;
    }

    // Фолбэк — лучший из оставшихся
    const sortedAll = sortByScore(pool, targets);
    const picked = sortedAll[0]?.protocore || null;
    if (picked) usedIds.add(picked.id);
    return picked;
};

/**
 * Собирает суммарные статы команды (для StatsTable):
 * базовые статы карточек + статы протокоров оптимизатора + базовый бонус CRIT DMG
 */
export const calculateTeamStats = (cards, results) => {
    const total = createEmptyStats();

    // 1. Базовые статы карточек
    Object.values(cards).forEach((card) => {
        if (!card) return;
        addBaseStats(total, getCardBaseStats(card));
    });

    // 2. Статы протокоров, подобранных оптимизатором
    Object.values(results).forEach((slot) => {
        Object.values(slot).forEach((protocore) => {
            addProtocoreStats(total, protocore);
        });
    });

    // 3. Базовый бонус CRIT DMG (+150%)
    return applyBaseCritDmgBonus(total);
};

/**
 * Считает статы для конкретной карточки с её протокорами - пока не применяется нигде
 */
export const calculateCardStats = (card, cardResults) => {
    if (!card) return null;

    const baseStats = getCardBaseStats(card);
    if (!baseStats) return null;

    const total = createEmptyStats();
    addBaseStats(total, baseStats);

    Object.values(cardResults || {}).forEach((protocore) => {
        addProtocoreStats(total, protocore);
    });

    return applyBaseCritDmgBonus(total);
};