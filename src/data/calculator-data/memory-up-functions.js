// Получить тип данжа по цвету кристалла
import {crystalDungeonData, crystalTypesDungeons, DUNGEON_COST, expDungeonData, rarityLevels} from "@data";

export const getCrystalDungeonByColor = (color) => {
    const dungeon = crystalTypesDungeons.find(d => d.colors.includes(color));
    return dungeon ? dungeon.id : 'lemonette';
};

// Получить EXP для прокачки между уровнями (только числовые уровни)
export const getExpNeeded = (rarity, fromLevel, toLevel) => {
    const rarityData = rarityLevels[rarity];
    if (!rarityData) return 0;

    let totalExp = 0;
    for (let level = fromLevel + 1; level <= toLevel; level++) {
        const exp = rarityData.expRanges[String(level)];
        if (exp) totalExp += exp;
    }
    return totalExp;
};

// Получить ресурсы для Ascend и Awaken
export const getUpgradeResources = (rarity, allLevels, startIndex, endIndex) => {
    const rarityData = rarityLevels[rarity];
    if (!rarityData) return { crystals: { N: 0, R: 0, SR: 0 }, credits: 0, heart: null };

    let totalCrystals = { N: 0, R: 0, SR: 0 };
    let totalCredits = 0;
    let heart = null;

    // Проходим по всем уровням от startIndex до endIndex
    for (let i = startIndex + 1; i <= endIndex; i++) {
        const level = allLevels[i];

        // Проверяем, является ли уровень Ascend
        if (rarityData.ascend[level]) {
            const ascend = rarityData.ascend[level];
            totalCrystals.N += ascend.crystals.N || 0;
            totalCrystals.R += ascend.crystals.R || 0;
            totalCrystals.SR += ascend.crystals.SR || 0;
            totalCredits += ascend.credits || 0;
        }

        // Проверяем, является ли уровень Awaken
        if (rarityData.awaken[level]) {
            const awaken = rarityData.awaken[level];
            totalCrystals.N += awaken.crystals.N || 0;
            totalCrystals.R += awaken.crystals.R || 0;
            totalCrystals.SR += awaken.crystals.SR || 0;
            totalCredits += awaken.credits || 0;
            heart = awaken.heart || null;
        }
    }

    return { crystals: totalCrystals, credits: totalCredits, heart };
};

// Получить количество проходов данжа для EXP
export const getExpDungeonRuns = (expNeeded, dungeonLevel) => {
    const dungeon = expDungeonData.find(d => d.level === dungeonLevel);
    if (!dungeon) return 0;
    return Math.ceil(expNeeded / dungeon.exp);
};

// Получить количество проходов данжа для кристаллов
export const getCrystalDungeonRuns = (crystalsNeeded, dungeonLevel) => {
    const dungeon = crystalDungeonData.find(d => d.level === dungeonLevel);
    if (!dungeon) return 0;

    let runsNeeded = 0;
    const dungeonCrystals = dungeon.crystals;

    if (crystalsNeeded.N > 0 && dungeonCrystals.N > 0) {
        runsNeeded = Math.max(runsNeeded, Math.ceil(crystalsNeeded.N / dungeonCrystals.N));
    }
    if (crystalsNeeded.R > 0 && dungeonCrystals.R > 0) {
        runsNeeded = Math.max(runsNeeded, Math.ceil(crystalsNeeded.R / dungeonCrystals.R));
    }
    if (crystalsNeeded.SR > 0 && dungeonCrystals.SR > 0) {
        runsNeeded = Math.max(runsNeeded, Math.ceil(crystalsNeeded.SR / dungeonCrystals.SR));
    }

    return runsNeeded;
};

// Получить топливо
export const getStaminaCost = (runs) => runs * DUNGEON_COST;