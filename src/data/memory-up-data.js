// Данные по уровням для разных редкостей
export const rarityLevels = {
    '3-star': {
        name: '3★',
        ascend: [
            { level: 10, crystals: { N: 24, R: 0, SR: 0 }, credits: 9000 },
            { level: 20, crystals: { N: 48, R: 0, SR: 0 }, credits: 15000 },
            { level: 30, crystals: { N: 96, R: 0, SR: 0 }, credits: 30000 },
            { level: 40, crystals: { N: 192, R: 90, SR: 0 }, credits: 48000 },
            { level: 50, crystals: { N: 384, R: 180, SR: 0 }, credits: 90000 },
            { level: 60, crystals: { N: 720, R: 306, SR: 144 }, credits: 150000 },
            { level: 70, crystals: { N: 1440, R: 600, SR: 299 }, credits: 240000 }
        ],
        awaken: { level: 80, crystals: { N: 720, R: 288, SR: 108 }, credits: 150000, heart: null },

        expRanges: [
            { level: "1-10", exp: 1030 },
            { level: "10-20", exp: 1710 },
            { level: "20-30", exp: 2820 },
            { level: "30-40", exp: 5640 },
            { level: "40-50", exp: 11250 },
            { level: "50-60", exp: 22500 },
            { level: "60-70", exp: 45000 },
            { level: "70-80", exp: 90050 }
        ]
    },
    '4-star': {
        name: '4★',
        ascend: [
            { level: 10, crystals: { N: 32, R: 0, SR: 0 }, credits: 12000 },
            { level: 20, crystals: { N: 64, R: 0, SR: 0 }, credits: 20000 },
            { level: 30, crystals: { N: 128, R: 0, SR: 0 }, credits: 40000 },
            { level: 40, crystals: { N: 256, R: 120, SR: 0 }, credits: 64000 },
            { level: 50, crystals: { N: 512, R: 240, SR: 0 }, credits: 120000 },
            { level: 60, crystals: { N: 960, R: 408, SR: 192 }, credits: 200000 },
            { level: 70, crystals: { N: 1920, R: 800, SR: 398 }, credits: 320000 },
        ],
        awaken: { level: 80, crystals: { N: 960, R: 384, SR: 144 }, credits: 200000, heart: 'Heart SR' },

        expRanges: [
            { level: "1-10", exp: 1370 },
            { level: "10-20", exp: 2280 },
            { level: "20-30", exp: 3740 },
            { level: "30-40", exp: 7520 },
            { level: "40-50", exp: 15010 },
            { level: "50-60", exp: 30000 },
            { level: "60-70", exp: 60000 },
            { level: "70-80", exp: 119900 }
        ]
    },
    '5-star': {
        name: '5★',
        ascend: [
            { level: 10, crystals: { N: 40, R: 0, SR: 0 }, credits: 15000 },
            { level: 20, crystals: { N: 80, R: 0, SR: 0 }, credits: 25000 },
            { level: 30, crystals: { N: 160, R: 0, SR: 0 }, credits: 50000 },
            { level: 40, crystals: { N: 320, R: 150, SR: 0 }, credits: 80000 },
            { level: 50, crystals: { N: 640, R: 300, SR: 0 }, credits: 150000 },
            { level: 60, crystals: { N: 1200, R: 510, SR: 240 }, credits: 250000 },
            { level: 70, crystals: { N: 2400, R: 1000, SR: 498 }, credits: 400000 },
        ],
        awaken: { level: 80, crystals: { N: 1200, R: 480, SR: 180 },  credits: 250000, heart: 'Heart SSR' },

        expRanges: [
            { level: "1-10", exp: 1710 },
            { level: "10-20", exp: 2850 },
            { level: "20-30", exp: 4680 },
            { level: "30-40", exp: 9380 },
            { level: "40-50", exp: 18760 },
            { level: "50-60", exp: 37500 },
            { level: "60-70", exp: 75000 },
            { level: "70-80", exp: 150050 }
        ]
    }
};

// Данжи для EXP (Bottle of Wishes)
export const expDungeonData = [
    { level: 1, exp: 200 },
    { level: 2, exp: 230 },
    { level: 3, exp: 260 },
    { level: 4, exp: 280 },
    { level: 5, exp: 300 },
    { level: 6, exp: 320 },
    { level: 7, exp: 340 },
    { level: 8, exp: 360 },
    { level: 9, exp: 380 }
];

// Данжи для кристаллов
export const crystalDungeonData = [
    { level: 1, crystals: { N: 5, R: null, SR: null } },
    { level: 2, crystals: { N: 6, R: null, SR: null } },
    { level: 3, crystals: { N: 7, R: null, SR: null } },
    { level: 4, crystals: { N: 7, R: 2, SR: null } },
    { level: 5, crystals: { N: 8, R: 2, SR: null } },
    { level: 6, crystals: { N: 8, R: 3, SR: null } },
    { level: 7, crystals: { N: 8, R: 3, SR: 1 } },
    { level: 8, crystals: { N: 9, R: 3, SR: 1 } },
    { level: 9, crystals: { N: 10, R: 4, SR: 1 } }
];

// Данжи для кредитов
export const creditDungeonData = [
    { level: 1, credits: 4000 },
    { level: 2, credits: 4600 },
    { level: 3, credits: 5200 },
    { level: 4, credits: 5600 },
    { level: 5, credits: 6000 },
    { level: 6, credits: 6400 },
    { level: 7, credits: 6800 },
    { level: 8, credits: 7200 },
    { level: 9, credits: 7600 }
];

// Стоимость входа в данж
export const DUNGEON_COST = 8;

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

// Получить EXP для прокачки между уровнями
export const getExpNeeded = (rarity, currentLevel, targetLevel) => {
    const rarityData = rarityLevels[rarity];
    if (!rarityData) return 0;

    let totalExp = 0;

    // 1-10
    if (currentLevel < 10 && targetLevel > 1) {
        const expData = rarityData.expRanges.find(e => e.level === "1-10");
        if (expData) totalExp += expData.exp;
    }
    // 10-20
    if (currentLevel < 20 && targetLevel > 10) {
        const expData = rarityData.expRanges.find(e => e.level === "10-20");
        if (expData) totalExp += expData.exp;
    }
    // 20-30
    if (currentLevel < 30 && targetLevel > 20) {
        const expData = rarityData.expRanges.find(e => e.level === "20-30");
        if (expData) totalExp += expData.exp;
    }
    // 30-40
    if (currentLevel < 40 && targetLevel > 30) {
        const expData = rarityData.expRanges.find(e => e.level === "30-40");
        if (expData) totalExp += expData.exp;
    }
    // 40-50
    if (currentLevel < 50 && targetLevel > 40) {
        const expData = rarityData.expRanges.find(e => e.level === "40-50");
        if (expData) totalExp += expData.exp;
    }
    // 50-60
    if (currentLevel < 60 && targetLevel > 50) {
        const expData = rarityData.expRanges.find(e => e.level === "50-60");
        if (expData) totalExp += expData.exp;
    }
    // 60-70
    if (currentLevel < 70 && targetLevel > 60) {
        const expData = rarityData.expRanges.find(e => e.level === "60-70");
        if (expData) totalExp += expData.exp;
    }
    // 70-80
    if (currentLevel < 80 && targetLevel > 70) {
        const expData = rarityData.expRanges.find(e => e.level === "70-80");
        if (expData) totalExp += expData.exp;
    }

    return totalExp;
};

// Получить ресурсы для Ascend
export const getAscendResources = (rarity, currentLevel, targetLevel) => {
    const rarityData = rarityLevels[rarity];
    if (!rarityData) return { crystals: { N: 0, R: 0, SR: 0 }, credits: 0 };

    let totalCrystals = { N: 0, R: 0, SR: 0 };
    let totalCredits = 0;

    for (const ascend of rarityData.ascend) {
        if (ascend.level > currentLevel && ascend.level <= targetLevel) {
            totalCrystals.N += ascend.crystals.N || 0;
            totalCrystals.R += ascend.crystals.R || 0;
            totalCrystals.SR += ascend.crystals.SR || 0;
            totalCredits += ascend.credits || 0;
        }
    }

    return { crystals: totalCrystals, credits: totalCredits };
};

// Получить ресурсы для Awaken
export const getAwakenResources = (rarity, currentLevel, targetLevel) => {
    const rarityData = rarityLevels[rarity];
    if (!rarityData || !rarityData.awaken) return null;

    if (targetLevel >= 80 && currentLevel < 80) {
        return {
            crystals: { ...rarityData.awaken.crystals },
            credits: rarityData.awaken.credits,
            heart: rarityData.awaken.heart
        };
    }
    return null;
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

// Получить количество проходов данжа для кредитов
export const getCreditDungeonRuns = (creditsNeeded, dungeonLevel) => {
    const dungeon = creditDungeonData.find(d => d.level === dungeonLevel);
    if (!dungeon) return 0;
    return Math.ceil(creditsNeeded / dungeon.credits);
};

// Получить топливо
export const getStaminaCost = (runs) => runs * DUNGEON_COST;

// Основная функция расчёта
export const calculateMemoryUpgrade = (options) => {
    const {
        rarity,
        currentLevel,
        targetLevel,
        expDungeonLevel,
        crystalDungeonLevel,
        creditDungeonLevel
    } = options;

    if (currentLevel >= targetLevel) return null;

    const expNeeded = getExpNeeded(rarity, currentLevel, targetLevel);
    const ascendResources = getAscendResources(rarity, currentLevel, targetLevel);
    const awakenResources = getAwakenResources(rarity, currentLevel, targetLevel);

    let totalCrystals = { ...ascendResources.crystals };
    let totalCredits = ascendResources.credits;
    let heart = null;

    if (awakenResources) {
        totalCrystals.N += awakenResources.crystals.N;
        totalCrystals.R += awakenResources.crystals.R;
        totalCrystals.SR += awakenResources.crystals.SR;
        totalCredits += awakenResources.credits;
        heart = awakenResources.heart;
    }

    const expRuns = getExpDungeonRuns(expNeeded, expDungeonLevel);
    const crystalRuns = getCrystalDungeonRuns(totalCrystals, crystalDungeonLevel);
    const creditRuns = getCreditDungeonRuns(totalCredits, creditDungeonLevel);

    const staminaForExp = getStaminaCost(expRuns);
    const staminaForCrystals = getStaminaCost(crystalRuns);
    const staminaForCredits = getStaminaCost(creditRuns);

    return {
        expNeeded,
        crystals: totalCrystals,
        credits: totalCredits,
        heart,
        expRuns,
        crystalRuns,
        creditRuns,
        staminaForExp,
        staminaForCrystals,
        staminaForCredits,
        totalStamina: staminaForExp + staminaForCrystals + staminaForCredits
    };
};