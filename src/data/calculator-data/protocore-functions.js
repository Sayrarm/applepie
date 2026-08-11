// Получить значение мейн стата для указанного уровня
import {
    CREDIT_DUNGEON_COST,
    creditDungeonData,
    DUNGEON_COST_PROTOCORE,
    dungeonData,
    levelUpData,
    protocoreTypes,
    SUBSTAT_LEVELS
} from "@data";

export const getMainStatValue = (protocoreType, statName, level) => {
    const typeData = protocoreTypes[protocoreType];
    if (!typeData) return null;

    const statData = typeData.mainStats.find(stat => stat.name === statName);
    if (!statData) return null;

    return statData.values[level];
};

// Получить информацию о прокачке саб-статов
export const getSubstatUpgradeInfo = (currentLevel, targetLevel) => {
    const upgrades = [];

    for (let level = currentLevel + 1; level <= targetLevel; level++) {
        if (SUBSTAT_LEVELS.includes(level)) {
            // Проверяем, добавляется новый саб-стат или усиливается существующий
            const existingCount = SUBSTAT_LEVELS.filter(l => l <= currentLevel).length;
            const newCount = SUBSTAT_LEVELS.filter(l => l <= level).length;

            if (newCount > existingCount) {
                // Добавляется новый саб-стат
                upgrades.push({
                    level: level,
                    type: 'new',
                    message: `+1 secondary stat (at level ${level})`
                });
            } else {
                // Усиливается существующий саб-стат
                upgrades.push({
                    level: level,
                    type: 'enhance',
                    message: `Secondary stat enhanced (at level ${level})`
                });
            }
        }
    }

    return upgrades;
};

// Получить EXP для прокачки с текущего уровня на целевой
export const getRequiredExp = (currentLevel, targetLevel) => {
    let totalExp = 0;
    for (let i = currentLevel + 1; i <= targetLevel; i++) {
        const levelData = levelUpData.find(l => l.level === i);
        if (levelData) {
            totalExp += levelData.exp;
        }
    }
    return totalExp;
};

// Получить Credits для прокачки с текущего уровня на целевой
export const getRequiredCredits = (currentLevel, targetLevel) => {
    let totalCredits = 0;
    for (let i = currentLevel + 1; i <= targetLevel; i++) {
        const levelData = levelUpData.find(l => l.level === i);
        if (levelData) {
            totalCredits += levelData.credits;
        }
    }
    return totalCredits;
};

// Получить количество проходов данжа для получения EXP
export const getRequiredDungeonRuns = (requiredExp, dungeonLevel) => {
    const dungeon = dungeonData.find(d => d.level === dungeonLevel);
    if (!dungeon) return null;
    return Math.ceil(requiredExp / dungeon.exp);
};

// Получить количество топлива для прокачки
export const getRequiredStamina = (requiredExp, dungeonLevel) => {
    const runs = getRequiredDungeonRuns(requiredExp, dungeonLevel);
    if (!runs) return null;
    return runs * DUNGEON_COST_PROTOCORE;
};

// Получить количество проходов данжа для кредитов
export const getCreditDungeonRuns = (creditsNeeded, dungeonLevel) => {
    const dungeon = creditDungeonData.find(d => d.level === dungeonLevel);
    if (!dungeon) return 0;
    return Math.ceil(creditsNeeded / dungeon.credits);
};

// Получить топливо для кредитов
export const getStaminaForCredits = (creditsNeeded, dungeonLevel) => {
    const runs = getCreditDungeonRuns(creditsNeeded, dungeonLevel);
    return runs * CREDIT_DUNGEON_COST;
};