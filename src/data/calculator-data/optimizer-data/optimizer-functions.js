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

// ===== Утилиты для статов =====
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

// ===== Подбор пула с фолбэком =====
/**
 * Если есть протокоры с mainStatFilter — возвращаем только их.
 * Если нет — возвращаем весь пул (фолбэк).
 */
const filterByMainStatWithFallback = (pool, mainStatFilter) => {
    if (!mainStatFilter) return pool;
    const matching = pool.filter((p) => statMatches(p.mainStat, mainStatFilter));
    return matching.length > 0 ? matching : pool;
};

// ===== Расчёт статов команды с кэшем =====
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

// ===== Greedy-оптимизация =====
export const optimizeTeam = ({ cards, allProtocores, targets, context }) => {
    const damageType = detectDamageType(targets.delta);

    // Кэш базовых статов
    const baseStatsCache = new Map();
    const getCachedBaseStats = (card) => {
        if (!card) return null;
        const key = String(card.id);
        if (baseStatsCache.has(key)) return baseStatsCache.get(key);
        const s = getCardBaseStats(card);
        baseStatsCache.set(key, s);
        return s;
    };

    // Разбиваем протокоры по типам
    const { alpha, beta, gamma, delta } = splitProtocoresByType(allProtocores);

    // Пулы по цвету для каждого слота + фильтр по main stat с фолбэком
    const poolsBySlot = {
        solar1: {
            alpha: filterByStella(alpha, cards.solar1),
            beta: filterByMainStatWithFallback(
                filterByStella(beta, cards.solar1),
                targets.beta1,
            ),
        },
        solar2: {
            alpha: filterByStella(alpha, cards.solar2),
            beta: filterByMainStatWithFallback(
                filterByStella(beta, cards.solar2),
                targets.beta2,
            ),
        },
        lunar1: {
            gamma: filterByStella(gamma, cards.lunar1),
            delta: filterByMainStatWithFallback(
                filterByStella(delta, cards.lunar1),
                targets.delta,
            ),
        },
        lunar2: {
            gamma: filterByStella(gamma, cards.lunar2),
            delta: filterByMainStatWithFallback(
                filterByStella(delta, cards.lunar2),
                targets.delta,
            ),
        },
        lunar3: {
            gamma: filterByStella(gamma, cards.lunar3),
            delta: filterByMainStatWithFallback(
                filterByStella(delta, cards.lunar3),
                targets.delta,
            ),
        },
        lunar4: {
            gamma: filterByStella(gamma, cards.lunar4),
            delta: filterByMainStatWithFallback(
                filterByStella(delta, cards.lunar4),
                targets.delta,
            ),
        },
    };

    // Пустой результат
    const results = {
        solar1: { alpha: null, beta: null },
        solar2: { alpha: null, beta: null },
        lunar1: { gamma: null, delta: null },
        lunar2: { gamma: null, delta: null },
        lunar3: { gamma: null, delta: null },
        lunar4: { gamma: null, delta: null },
    };

    const usedIds = new Set();
    const slotOrder = ["solar1", "solar2", "lunar1", "lunar2", "lunar3", "lunar4"];

    for (const slotId of slotOrder) {
        const isSolar = slotId.startsWith("solar");
        const poolA = poolsBySlot[slotId][isSolar ? "alpha" : "gamma"];
        const poolB = poolsBySlot[slotId][isSolar ? "beta" : "delta"];

        // Доступные кандидаты (не использованные)
        const candidatesA = poolA.filter((p) => !usedIds.has(p.id));
        const candidatesB = poolB.filter((p) => !usedIds.has(p.id));

        // Если нет кандидатов — пропускаем слот
        if (candidatesA.length === 0 && candidatesB.length === 0) {
            continue;
        }

        let bestCand = null;
        let bestDamage = -Infinity;

        // Перебираем все пары
        const listA = candidatesA.length > 0 ? candidatesA : [null];
        const listB = candidatesB.length > 0 ? candidatesB : [null];

        for (const a of listA) {
            for (const b of listB) {
                const trialResults = {
                    ...results,
                    [slotId]: isSolar
                        ? { alpha: a, beta: b }
                        : { gamma: a, delta: b },
                };

                const damage = evaluateTeamDamage(
                    cards,
                    trialResults,
                    context,
                    damageType,
                    getCachedBaseStats,
                );

                if (damage > bestDamage) {
                    bestDamage = damage;
                    bestCand = isSolar
                        ? { alpha: a, beta: b }
                        : { gamma: a, delta: b };
                }
            }
        }

        // Фиксируем лучший
        if (bestCand) {
            results[slotId] = bestCand;
            if (bestCand.alpha) usedIds.add(bestCand.alpha.id);
            if (bestCand.beta) usedIds.add(bestCand.beta.id);
            if (bestCand.gamma) usedIds.add(bestCand.gamma.id);
            if (bestCand.delta) usedIds.add(bestCand.delta.id);
        }
    }

    return { results };
};