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
 * Проверяет совместимость протокора с карточкой по стеллактуму и типу
 */
export const isProtocoreCompatible = (protocore, card) => {
    if (!protocore || !card) return false;

    if (card.stellaName && protocore.stellactrum !== card.stellaName) {
        return false;
    }

    const isSolar = card.placementName === "solar";
    const isLunar = card.placementName === "lunar";

    if (isSolar) {
        return protocore.type === "alpha" || protocore.type === "beta";
    }
    if (isLunar) {
        return protocore.type === "gamma" || protocore.type === "delta";
    }

    return false;
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
 * Главная функция оптимизации
 */
export const optimizeTeam = ({ allProtocores, targets }) => {
    const { alpha, beta, gamma, delta } = splitProtocoresByType(allProtocores);

    // ===== SOLAR 1: цель Beta 1 =====
    const solar1BetaTargets = { subStat: targets.beta1, mainStat: targets.beta1 };
    const bestBeta1 = pickBest(beta, solar1BetaTargets);

    // ===== SOLAR 2: цель Beta 2 =====
    const solar2BetaTargets = { subStat: targets.beta2, mainStat: targets.beta2 };
    const bestBeta2 = pickBest(beta, solar2BetaTargets);

    // ===== Alpha (по subStat) =====
    const alphaTargets = { subStat: targets.subStat };
    const bestAlpha1 = pickBest(alpha, alphaTargets);
    const bestAlpha2 = pickBest(alpha, alphaTargets, [bestAlpha1]); // исключаем уже выбранный

    // ===== LUNAR: Delta (по цели delta) =====
    const deltaTargets = { subStat: targets.delta, mainStat: targets.delta };
    const bestDelta = pickTopN(delta, deltaTargets, 4);

    // ===== LUNAR: Gamma (по subStat) =====
    const gammaTargets = { subStat: targets.subStat };
    const bestGamma = pickTopN(gamma, gammaTargets, 4);

    const results = {
        solar1: { alpha: bestAlpha1, beta: bestBeta1 },
        solar2: { alpha: bestAlpha2, beta: bestBeta2 },
        lunar1: { gamma: bestGamma[0] || null, delta: bestDelta[0] || null },
        lunar2: { gamma: bestGamma[1] || null, delta: bestDelta[1] || null },
        lunar3: { gamma: bestGamma[2] || null, delta: bestDelta[2] || null },
        lunar4: { gamma: bestGamma[3] || null, delta: bestDelta[3] || null },
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
 * @param {Array} exclude — протокоры, которые нужно исключить
 */
export const pickBest = (protocores, targets, exclude = []) => {
    const excludeIds = new Set(exclude.filter(Boolean).map((p) => p.id));
    const pool = protocores.filter((p) => !excludeIds.has(p.id));

    // Сначала — те, что подходят под цель
    const matching = pool.filter((p) => matchesTarget(p, targets));
    const sortedMatching = sortByScore(matching, targets);

    if (sortedMatching.length > 0) {
        return sortedMatching[0].protocore;
    }

    // Фолбэк — лучший из оставшихся
    const sortedAll = sortByScore(pool, targets);
    return sortedAll[0]?.protocore || null;
};

/**
 * Выбирает топ-N протокоров по цели.
 * Сначала берёт подходящие под цель (в порядке score),
 * затем дополняет оставшимися, если подходящих меньше N.
 */
export const pickTopN = (protocores, targets, n) => {
    // 1. Подходящие под цель
    const matching = protocores.filter((p) => matchesTarget(p, targets));
    const sortedMatching = sortByScore(matching, targets).map((s) => s.protocore);

    // 2. Если набралось N — возвращаем
    if (sortedMatching.length >= n) {
        return sortedMatching.slice(0, n);
    }

    // 3. Иначе — дополняем оставшимися (не подходящими под цель)
    const matchingIds = new Set(sortedMatching.map((p) => p.id));
    const others = protocores.filter((p) => !matchingIds.has(p.id));
    const sortedOthers = sortByScore(others, targets).map((s) => s.protocore);

    return [...sortedMatching, ...sortedOthers].slice(0, n);
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