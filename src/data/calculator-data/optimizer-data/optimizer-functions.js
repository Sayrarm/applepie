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

// ===== Клонирование results =====
const cloneResults = (results) => ({
    solar1: results.solar1 ? { ...results.solar1 } : null,
    solar2: results.solar2 ? { ...results.solar2 } : null,
    lunar1: results.lunar1 ? { ...results.lunar1 } : null,
    lunar2: results.lunar2 ? { ...results.lunar2 } : null,
    lunar3: results.lunar3 ? { ...results.lunar3 } : null,
    lunar4: results.lunar4 ? { ...results.lunar4 } : null,
});

// ===== Сбор использованных id из results =====
const collectUsedIds = (results) => {
    const ids = new Set();
    Object.values(results).forEach((slot) => {
        if (!slot) return;
        Object.values(slot).forEach((p) => {
            if (p) ids.add(p.id);
        });
    });
    return ids;
};

// ===== Сортировка слотов по потенциалу карточки =====
const sortSlotsByPotential = (slotIds, cards, getBaseStatsFn) => {
    return [...slotIds].sort((a, b) => {
        const cardA = cards[a];
        const cardB = cards[b];

        const baseA = cardA ? getBaseStatsFn(cardA) : null;
        const baseB = cardB ? getBaseStatsFn(cardB) : null;

        const potA = (baseA?.hp || 0) + (baseA?.atk || 0) + (baseA?.def || 0);
        const potB = (baseB?.hp || 0) + (baseB?.atk || 0) + (baseB?.def || 0);

        if (potB !== potA) return potB - potA;

        return (cardA?.id || 0) - (cardB?.id || 0);
    });
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

// ===== Главная функция оптимизации =====
export const optimizeTeam = ({ cards, allProtocores, targets, context }) => {
    const damageType = detectDamageType(targets.delta);
    const getBaseStatsFn = createBaseStatsCache();

    const { alpha, beta, gamma, delta } = splitProtocoresByType(allProtocores);

    const emptyResults = {
        solar1: null,
        solar2: null,
        lunar1: null,
        lunar2: null,
        lunar3: null,
        lunar4: null,
    };

    // =========================================================
    // ФАЗА 1: GREEDY
    // =========================================================

    // ---------- SOLAR ----------
    const solarSlots = ["solar1", "solar2"];
    const solarSlotOrder = sortSlotsByPotential(solarSlots, cards, getBaseStatsFn);

    const betaAssignments = [
        { solar1: targets.beta1, solar2: targets.beta2 },
        { solar1: targets.beta2, solar2: targets.beta1 },
    ];

    let bestSolarResult = null;
    let bestSolarDamage = -Infinity;
    let bestSolarAssignment = null;

    for (const assignment of betaAssignments) {
        const usedIds = new Set();
        const solarResults = { ...emptyResults };

        for (const slotId of solarSlotOrder) {
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
            bestSolarAssignment = assignment;
        }
    }

    // ---------- LUNAR ----------
    const lunarSlots = ["lunar1", "lunar2", "lunar3", "lunar4"];
    const lunarSlotOrder = sortSlotsByPotential(lunarSlots, cards, getBaseStatsFn);

    const usedIdsLunar = new Set();
    const lunarResults = { ...emptyResults };

    for (const slotId of lunarSlotOrder) {
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

    // Объединяем
    let bestResults = {
        solar1: bestSolarResult?.solar1 || null,
        solar2: bestSolarResult?.solar2 || null,
        lunar1: lunarResults.lunar1,
        lunar2: lunarResults.lunar2,
        lunar3: lunarResults.lunar3,
        lunar4: lunarResults.lunar4,
    };

    let bestDamage = evaluateTeamDamage(
        cards,
        bestResults,
        context,
        damageType,
        getBaseStatsFn,
    );

    // =========================================================
    // ФАЗА 2: LOCAL SEARCH
    // =========================================================

    // Фильтры по main stat для каждого слота
    const mainStatFilterBySlot = {
        solar1: { alpha: null, beta: bestSolarAssignment?.solar1 || null },
        solar2: { alpha: null, beta: bestSolarAssignment?.solar2 || null },
        lunar1: { gamma: null, delta: targets.delta },
        lunar2: { gamma: null, delta: targets.delta },
        lunar3: { gamma: null, delta: targets.delta },
        lunar4: { gamma: null, delta: targets.delta },
    };

    // Пулы по цвету + фильтр по main stat (для replace и swap)
    const solarPoolsBySlot = {};
    for (const slotId of solarSlots) {
        const card = cards[slotId];
        if (!card) continue;

        const betaFilter = mainStatFilterBySlot[slotId]?.beta;
        solarPoolsBySlot[slotId] = {
            alpha: filterByStella(alpha, card),
            beta: filterByMainStatWithFallback(
                filterByStella(beta, card),
                betaFilter,
            ),
        };
    }

    const lunarPoolsBySlot = {};
    for (const slotId of lunarSlots) {
        const card = cards[slotId];
        if (!card) continue;

        const deltaFilter = mainStatFilterBySlot[slotId]?.delta;
        lunarPoolsBySlot[slotId] = {
            gamma: filterByStella(gamma, card),
            delta: filterByMainStatWithFallback(
                filterByStella(delta, card),
                deltaFilter,
            ),
        };
    }

    // ---------- SWAP внутри типа ----------
    const trySwapWithinType = (type) => {
        const slots =
            type === "alpha" || type === "beta" ? solarSlots : lunarSlots;

        for (let i = 0; i < slots.length; i++) {
            for (let j = i + 1; j < slots.length; j++) {
                const slotA = slots[i];
                const slotB = slots[j];

                const cardA = cards[slotA];
                const cardB = cards[slotB];
                if (!cardA || !cardB) continue;

                const protoA = bestResults[slotA]?.[type];
                const protoB = bestResults[slotB]?.[type];

                if (!protoA || !protoB) continue;
                if (protoA.id === protoB.id) continue;

                // Проверка цвета
                if (cardA.stellaName && protoB.stellactrum !== cardA.stellaName) continue;
                if (cardB.stellaName && protoA.stellactrum !== cardB.stellaName) continue;

                // Проверка main stat filter
                const filterA = mainStatFilterBySlot[slotA]?.[type];
                const filterB = mainStatFilterBySlot[slotB]?.[type];

                if (filterA && !statMatches(protoB.mainStat, filterA)) continue;
                if (filterB && !statMatches(protoA.mainStat, filterB)) continue;

                const trial = cloneResults(bestResults);
                trial[slotA][type] = protoB;
                trial[slotB][type] = protoA;

                const trialDamage = evaluateTeamDamage(
                    cards,
                    trial,
                    context,
                    damageType,
                    getBaseStatsFn,
                );

                if (trialDamage > bestDamage) {
                    bestDamage = trialDamage;
                    bestResults = trial;
                }
            }
        }
    };

    // ---------- REPLACE: заменить протокор на свободный ----------
    const tryReplace = (type) => {
        const isSolarType = type === "alpha" || type === "beta";
        const slots = isSolarType ? solarSlots : lunarSlots;
        const poolsBySlot = isSolarType ? solarPoolsBySlot : lunarPoolsBySlot;

        for (const slotId of slots) {
            const card = cards[slotId];
            if (!card) continue;

            const pool = poolsBySlot[slotId]?.[type] || [];
            const currentProto = bestResults[slotId]?.[type];

            // Пересчитываем usedIds перед каждым слотом
            const usedIds = collectUsedIds(bestResults);

            const freeProtos = pool.filter(
                (p) => !usedIds.has(p.id) || p.id === currentProto?.id,
            );

            for (const candidate of freeProtos) {
                if (currentProto && candidate.id === currentProto.id) continue;

                const trial = cloneResults(bestResults);
                trial[slotId][type] = candidate;

                const trialDamage = evaluateTeamDamage(
                    cards,
                    trial,
                    context,
                    damageType,
                    getBaseStatsFn,
                );

                if (trialDamage > bestDamage) {
                    bestDamage = trialDamage;
                    bestResults = trial;
                    break;
                }
            }
        }
    };

    // ---------- Итерации ----------
    let improved = true;
    let iterations = 0;
    const MAX_ITERATIONS = 20;

    while (improved && iterations < MAX_ITERATIONS) {
        improved = false;
        iterations++;

        const before = bestDamage;

        trySwapWithinType("alpha");
        trySwapWithinType("beta");
        trySwapWithinType("gamma");
        trySwapWithinType("delta");

        tryReplace("alpha");
        tryReplace("beta");
        tryReplace("gamma");
        tryReplace("delta");

        if (bestDamage > before) {
            improved = true;
        }
    }

    return { results: bestResults };
};