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
    computeKitDamage,
    detectDamageType,
} from "@data";

// ===== Утилиты =====
const normalizeStat = (stat) =>
    String(stat).toLowerCase().replace(/\s+/g, "_").replace(/_+/g, "_");

const statMatches = (a, b) => {
    if (!a || !b) return false;
    const na = normalizeStat(a);
    const nb = normalizeStat(b);
    return na === nb || na.includes(nb) || nb.includes(na);
};

// ===== Базовые статы карточки =====
export const getCardBaseStats = (card) => {
    if (!card) return null;
    const cardId = String(card.id);
    const level = getCardLevel(cardId);
    const rank = getCardRank(cardId);
    const isAscended = getCardAscend(cardId);
    return getStatsWithRank(card, level, rank, isAscended);
};

// ===== Разделение протокоров по типам =====
export const splitProtocoresByType = (allProtocores) => ({
    alpha: allProtocores.filter((p) => p.type === "alpha"),
    beta: allProtocores.filter((p) => p.type === "beta"),
    gamma: allProtocores.filter((p) => p.type === "gamma"),
    delta: allProtocores.filter((p) => p.type === "delta"),
});

// ===== Фильтр по цвету =====
const filterByStella = (protocores, card) => {
    if (!card || !card.stellaName) return protocores;
    return protocores.filter((p) => p.stellactrum === card.stellaName);
};

// ===== Фильтр по main stat с фолбэком =====
/**
 * Если есть протокоры с mainStatFilter — возвращаем только их.
 * Если нет — возвращаем весь пул (фолбэк).
 */
const filterByMainStatWithFallback = (pool, mainStatFilter) => {
    if (!mainStatFilter) return pool;
    const matching = pool.filter((p) => statMatches(p.mainStat, mainStatFilter));
    return matching.length > 0 ? matching : pool;
};

// ===== Кэш базовых статов =====
const createBaseStatsCache = () => {
    const cache = new Map();
    return (card) => {
        if (!card) return null;
        const key = String(card.id);
        if (cache.has(key)) return cache.get(key);
        const s = getCardBaseStats(card);
        cache.set(key, s);
        return s;
    };
};

// ===== Расчёт статов команды =====
export const calculateTeamStats = (cards, results, getBaseStatsFn = getCardBaseStats) => {
    const total = createEmptyStats();

    Object.entries(cards).forEach(([slotId, card]) => {
        if (!card) return;

        const baseStats = getBaseStatsFn(card);
        if (!baseStats) return;

        const slotResults = results[slotId] || {};
        const protocores = Object.values(slotResults).filter(Boolean);

        const cardFinalStats = calculateFinalStats(card, baseStats, protocores);
        if (cardFinalStats) {
            mergeStats(total, cardFinalStats);
        }
    });

    return applyBaseCritDmgBonus(total);
};

// ===== Оценка урона команды =====
/**
 * Оценивает урон команды.
 * Слоты, которых нет в results — считаются пустыми.
 */
const evaluateTeamDamage = (cards, results, context, damageType, getBaseStatsFn) => {
    const teamStats = calculateTeamStats(cards, results, getBaseStatsFn);
    const { baseSum, weakenedSum, critSum } = computeKitDamage(teamStats, context);

    switch (damageType) {
        case "weakened":
            return weakenedSum;
        case "crit":
            return critSum;
        case "base":
        default:
            return baseSum;
    }
};

// ===== Greedy: подбор лучшей пары для слота =====
/**
 * Перебирает все пары (a, b) для слота, возвращает лучшую по урону.
 * @param slotId — id слота ("solar1" / "lunar2" / ...)
 * @param poolA — пул alpha (или gamma)
 * @param poolB — пул beta (или delta)
 * @param currentResults — текущие results (для контекста оценки)
 * @param isSolar — true → alpha/beta, false → gamma/delta
 */
const pickBestPairForSlot = ({
                                 slotId,
                                 poolA,
                                 poolB,
                                 currentResults,
                                 isSolar,
                                 cards,
                                 context,
                                 damageType,
                                 getBaseStatsFn,
                                 usedIds,
                             }) => {
    const candidatesA = poolA.filter((p) => !usedIds.has(p.id));
    const candidatesB = poolB.filter((p) => !usedIds.has(p.id));

    if (candidatesA.length === 0 && candidatesB.length === 0) {
        return null;
    }

    const listA = candidatesA.length > 0 ? candidatesA : [null];
    const listB = candidatesB.length > 0 ? candidatesB : [null];

    let bestPair = null;
    let bestDamage = -Infinity;

    for (const a of listA) {
        for (const b of listB) {
            const trialResults = {
                ...currentResults,
                [slotId]: isSolar
                    ? { alpha: a, beta: b }
                    : { gamma: a, delta: b },
            };

            const damage = evaluateTeamDamage(
                cards,
                trialResults,
                context,
                damageType,
                getBaseStatsFn,
            );

            if (damage > bestDamage) {
                bestDamage = damage;
                bestPair = isSolar
                    ? { alpha: a, beta: b }
                    : { gamma: a, delta: b };
            }
        }
    }

    return bestPair;
};

// ===== Greedy-оптимизация =====
export const optimizeTeam = ({ cards, allProtocores, targets, context }) => {
    const damageType = detectDamageType(targets.delta);
    const getBaseStatsFn = createBaseStatsCache();

    const { alpha, beta, gamma, delta } = splitProtocoresByType(allProtocores);

    // Пустые results (все слоты пустые)
    const emptyResults = {
        solar1: null,
        solar2: null,
        lunar1: null,
        lunar2: null,
        lunar3: null,
        lunar4: null,
    };

    // ==========================================================
    // SOLAR: 2 варианта распределения целей beta1 / beta2
    // ==========================================================
    const betaAssignments = [
        { solar1: targets.beta1, solar2: targets.beta2 },
        { solar1: targets.beta2, solar2: targets.beta1 },
    ];

    let bestSolarResult = null;
    let bestSolarDamage = -Infinity;

    for (const assignment of betaAssignments) {
        const usedIds = new Set();
        const solarResults = { ...emptyResults };

        for (const slotId of ["solar1", "solar2"]) {
            const card = cards[slotId];
            if (!card) continue;

            const alphaPool = filterByStella(alpha, card);
            const betaPool = filterByMainStatWithFallback(
                filterByStella(beta, card),
                assignment[slotId],
            );

            const bestPair = pickBestPairForSlot({
                slotId,
                poolA: alphaPool,
                poolB: betaPool,
                currentResults: solarResults,
                isSolar: true,
                cards,
                context,
                damageType,
                getBaseStatsFn,
                usedIds,
            });

            if (bestPair) {
                solarResults[slotId] = bestPair;
                if (bestPair.alpha) usedIds.add(bestPair.alpha.id);
                if (bestPair.beta) usedIds.add(bestPair.beta.id);
            }
        }

        // Оцениваем полный solar-результат
        const solarDamage = evaluateTeamDamage(
            cards,
            solarResults,
            context,
            damageType,
            getBaseStatsFn,
        );

        if (solarDamage > bestSolarDamage) {
            bestSolarDamage = solarDamage;
            bestSolarResult = solarResults;
        }
    }

    // ==========================================================
    // LUNAR: одна цель delta для всех 4 слотов
    // ==========================================================
    const usedIdsLunar = new Set();
    const lunarResults = { ...emptyResults };

    for (const slotId of ["lunar1", "lunar2", "lunar3", "lunar4"]) {
        const card = cards[slotId];
        if (!card) continue;

        const gammaPool = filterByStella(gamma, card);
        const deltaPool = filterByMainStatWithFallback(
            filterByStella(delta, card),
            targets.delta,
        );

        const bestPair = pickBestPairForSlot({
            slotId,
            poolA: gammaPool,
            poolB: deltaPool,
            currentResults: lunarResults,
            isSolar: false,
            cards,
            context,
            damageType,
            getBaseStatsFn,
            usedIds: usedIdsLunar,
        });

        if (bestPair) {
            lunarResults[slotId] = bestPair;
            if (bestPair.gamma) usedIdsLunar.add(bestPair.gamma.id);
            if (bestPair.delta) usedIdsLunar.add(bestPair.delta.id);
        }
    }

    // ==========================================================
    // Объединяем: solar — лучший вариант, lunar — greedy
    // ==========================================================
    const finalResults = {
        solar1: bestSolarResult?.solar1 || null,
        solar2: bestSolarResult?.solar2 || null,
        lunar1: lunarResults.lunar1,
        lunar2: lunarResults.lunar2,
        lunar3: lunarResults.lunar3,
        lunar4: lunarResults.lunar4,
    };

    return { results: finalResults };
};