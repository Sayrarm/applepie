import {ascendData3star, ascendData4star, ascendData5star, memoryStats} from "@data";

export const calculateDmgBoost = (hp, atk, def, talentKey) => {
    let dmgBoost = 0;

    if (talentKey === 'hp') {
        if (hp > 8000) {
            dmgBoost = ((hp - 8000) / 400) * 0.2;
        }
    } else if (talentKey === 'atk') {
        if (atk > 400) {
            dmgBoost = ((atk - 400) / 20) * 0.2;
        }
    } else if (talentKey === 'def') {
        if (def > 200) {
            dmgBoost = ((def - 200) / 10) * 0.2;
        }
    }

    return dmgBoost; // возвращаем в десятичном виде (например, 0.0725 для 7.25%)
};

// Функция для получения статов с учетом ранка и редкости
export const getStatsWithRank = (card, level, rank, isAscended = false) => {
    // Защита от undefined/null
    if (!card) return null;
    if (!level || level < 1) return null;
    if (rank === undefined || rank === null || rank < 0) rank = 0;

    const rarity = card.rarityName;
    const talent = card.talentName;

    // Определяем ключ для поиска в memoryStats
    let memoryKey = '';
    let talentKey = '';

    if (rarity === '5-star') {
        if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 5-star';
        else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 5-star';
        else if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 5-star';
        talentKey = talent;
    } else if (rarity === '4-star') {
        if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 4-star';
        else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 4-star';
        else if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 4-star';
        talentKey = talent;
    } else if (rarity === '3-star') {
        if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 3-star';
        else if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 3-star';
        else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 3-star';
        talentKey = talent;
    }

    if (!memoryKey || !talentKey) return null;

    const memoryData = memoryStats[memoryKey];
    if (!memoryData) return null;

    // Проверяем, нужно ли использовать статы Ascend/Awaken
    let baseStats;
    const isAscendableLevel = [10, 20, 30, 40, 50, 60, 70, 80].includes(level);

    if (isAscended && isAscendableLevel) {
        // Используем статы из ascendData
        let ascendStats = null;

        if (rarity === '5-star') {
            ascendStats = ascendData5star[talentKey]?.[level];
        } else if (rarity === '4-star') {
            ascendStats = ascendData4star[talentKey]?.[level];
        } else if (rarity === '3-star') {
            ascendStats = ascendData3star[talentKey]?.[level];
        }

        if (ascendStats) {
            baseStats = ascendStats;
        } else {
            baseStats = memoryData.baseStats[level];
        }
    } else {
        baseStats = memoryData.baseStats[level];
    }

    if (!baseStats) return null;

    // Коэффициенты для ранка в зависимости от редкости
    let statMultiplier, critRatePerRank, critDmgPerRank;

    if (rarity === '5-star') {
        statMultiplier = 1 + rank * 0.12;
        critRatePerRank = 1.5;
        critDmgPerRank = 3.0;
    } else if (rarity === '4-star') {
        statMultiplier = 1 + rank * 0.05;
        critRatePerRank = 0.5;
        critDmgPerRank = 1.0;
    } else { // 3-star
        statMultiplier = 1 + rank * 0.05;
        critRatePerRank = 0.3;
        critDmgPerRank = 0.6;
    }

    // Рассчитываем статы с учетом ранка
    const hp = baseStats.hp * statMultiplier;
    const atk = baseStats.atk * statMultiplier;
    const def = baseStats.def * statMultiplier;

    // Crit Rate и Crit DMG с учетом ранка
    let critRate = baseStats.critRate + (rank * critRatePerRank);
    let critDmg = baseStats.critDmg + (rank * critDmgPerRank);

    // Для solar показываем только Crit DMG, для lunar только Crit Rate
    const displayCritRate = card.placementName === 'lunar' ? critRate : 0;
    const displayCritDmg = card.placementName === 'solar' ? critDmg : 0;

    let dmgBoost = calculateDmgBoost(hp, atk, def, talentKey);

    return {
        hp,
        atk,
        def,
        critRate: displayCritRate,
        critDmg: displayCritDmg,
        dmgBoost: (dmgBoost * 10000) / 10000,
        isAscended,
        oathStrength: 0,
        oathRecoveryBoost: 0,
        expeditedEnergyBoost: 0,
    };
};