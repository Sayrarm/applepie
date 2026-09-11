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

    const betaTargets = { subStat: targets.beta1, mainStat: targets.beta1 };
    const deltaTargets = { subStat: targets.delta, mainStat: targets.delta };
    const alphaTargets = { subStat: targets.subStat };
    const gammaTargets = { subStat: targets.subStat };

    const sortedBeta = sortByScore(beta, betaTargets);
    const sortedDelta = sortByScore(delta, deltaTargets);
    const sortedAlpha = sortByScore(alpha, alphaTargets);
    const sortedGamma = sortByScore(gamma, gammaTargets);

    const bestBeta1 = sortedBeta[0]?.protocore || null;
    const bestBeta2 = sortedBeta[1]?.protocore || null;

    const bestAlpha1 = sortedAlpha[0]?.protocore || null;
    const bestAlpha2 = sortedAlpha[1]?.protocore || null;

    const bestDelta = sortedDelta.slice(0, 4).map((s) => s.protocore);
    const bestGamma = sortedGamma.slice(0, 4).map((s) => s.protocore);

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