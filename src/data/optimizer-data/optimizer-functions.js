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

    // Проверка стеллактума
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

    // Проверка main stat
    if (targets.mainStat && protocore.mainStat) {
        const protocoreMain = normalizeStat(protocore.mainStat);
        const targetMain = normalizeStat(targets.mainStat);
        if (protocoreMain.includes(targetMain) || targetMain.includes(protocoreMain)) {
            score += 10;
        }
    }

    // Проверка substats
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
 * Удаляет дубликаты протокоров по id
 */
const dedupeById = (protocores) => {
    const seen = new Set();
    return protocores.filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
    });
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
 * Главная функция оптимизации
 */
export const optimizeTeam = ({
                                 cards,           // { solar1, solar2, lunar1, lunar2, lunar3, lunar4 }
                                 allProtocores,   // все протокоры пользователя
                                 targets,         // { beta1, beta2, delta, mainStat, subStat }
                             }) => {
    const { alpha, beta, gamma, delta } = splitProtocoresByType(allProtocores);

    // Целевые статы для разных типов
    const betaTargets = { subStat: targets.beta1, mainStat: targets.beta1 };
    const deltaTargets = { subStat: targets.delta, mainStat: targets.delta };
    const alphaTargets = { subStat: targets.subStat };
    const gammaTargets = { subStat: targets.subStat };

    // Сортируем по score
    const sortedBeta = sortByScore(beta, betaTargets);
    const sortedDelta = sortByScore(delta, deltaTargets);
    const sortedAlpha = sortByScore(alpha, alphaTargets);
    const sortedGamma = sortByScore(gamma, gammaTargets);

    // Выбираем лучшие протокоры
    const bestBeta1 = sortedBeta[0]?.protocore || null;
    const bestBeta2 = sortedBeta[1]?.protocore || null;

    const bestAlpha1 = sortedAlpha[0]?.protocore || null;
    const bestAlpha2 = sortedAlpha[1]?.protocore || null;

    const bestDelta = sortedDelta.slice(0, 4).map((s) => s.protocore);
    const bestGamma = sortedGamma.slice(0, 4).map((s) => s.protocore);

    // Собираем результат
    const results = {
        solar1: {
            alpha: bestAlpha1,
            beta: bestBeta1,
        },
        solar2: {
            alpha: bestAlpha2,
            beta: bestBeta2,
        },
        lunar1: {
            gamma: bestGamma[0] || null,
            delta: bestDelta[0] || null,
        },
        lunar2: {
            gamma: bestGamma[1] || null,
            delta: bestDelta[1] || null,
        },
        lunar3: {
            gamma: bestGamma[2] || null,
            delta: bestDelta[2] || null,
        },
        lunar4: {
            gamma: bestGamma[3] || null,
            delta: bestDelta[3] || null,
        },
    };

    return {
        results,
        scores: {
            beta: sortedBeta.slice(0, 2),
            alpha: sortedAlpha.slice(0, 2),
            delta: sortedDelta.slice(0, 4),
            gamma: sortedGamma.slice(0, 4),
        },
    };
};

/**
 * Собирает суммарные статы от всех протокоров команды
 */
export const calculateTotalProtocoreStats = (results) => {
    const total = {
        hp: 0,
        atk: 0,
        def: 0,
        critRate: 0,
        critDmg: 0,
        dmgBoost: 0,
        oathStrength: 0,
        oathRecoveryBoost: 0,
        expeditedEnergyBoost: 0,
    };

    const addProtocore = (protocore) => {
        if (!protocore) return;

        // Main stat
        const mainStat = protocore.mainStat;
        const mainValue = protocore.mainStatValue || 0;

        switch (mainStat) {
            case "HP":
                total.hp += mainValue;
                break;
            case "ATK":
                total.atk += mainValue;
                break;
            case "DEF":
                total.def += mainValue;
                break;
            case "HP Bonus":
                total.hp += mainValue; // условно, проценты отдельно
                break;
            case "ATK Bonus":
                total.atk += mainValue;
                break;
            case "DEF Bonus":
                total.def += mainValue;
                break;
            case "CRIT Rate":
                total.critRate += mainValue;
                break;
            case "CRIT DMG":
                total.critDmg += mainValue;
                break;
            case "DMG Boost to Weakened":
                total.dmgBoost += mainValue;
                break;
            case "Oath Strength":
                total.oathStrength += mainValue;
                break;
            case "Oath Recovery Boost":
                total.oathRecoveryBoost += mainValue;
                break;
            case "Expedited Energy Boost":
                total.expeditedEnergyBoost += mainValue;
                break;
            default:
                break;
        }

        // Substats
        if (protocore.substats) {
            protocore.substats.forEach((sub) => {
                const value = sub.value || 0;
                switch (sub.stat) {
                    case "HP":
                    case "HP Bonus":
                        total.hp += value;
                        break;
                    case "ATK":
                    case "ATK Bonus":
                        total.atk += value;
                        break;
                    case "DEF":
                    case "DEF Bonus":
                        total.def += value;
                        break;
                    case "CRIT Rate":
                        total.critRate += value;
                        break;
                    case "CRIT DMG":
                        total.critDmg += value;
                        break;
                    case "DMG Boost to Weakened":
                        total.dmgBoost += value;
                        break;
                    case "Oath Strength":
                        total.oathStrength += value;
                        break;
                    default:
                        break;
                }
            });
        }
    };

    Object.values(results).forEach((slot) => {
        Object.values(slot).forEach((protocore) => {
            addProtocore(protocore);
        });
    });

    return total;
};