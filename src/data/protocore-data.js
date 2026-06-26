// Данные прокачки по уровням (LVL, EXP, Credits)
export const levelUpData = [
    { level: 0, exp: 0, credits: 0 },
    { level: 1, exp: 300, credits: 1200 },
    { level: 2, exp: 600, credits: 2400 },
    { level: 3, exp: 900, credits: 3600 },
    { level: 4, exp: 1200, credits: 4800 },
    { level: 5, exp: 1500, credits: 6000 },
    { level: 6, exp: 2000, credits: 8000 },
    { level: 7, exp: 3000, credits: 12000 },
    { level: 8, exp: 4000, credits: 16000 },
    { level: 9, exp: 5000, credits: 20000 },
    { level: 10, exp: 6500, credits: 26000 },
    { level: 11, exp: 8000, credits: 32000 },
    { level: 12, exp: 10000, credits: 40000 },
    { level: 13, exp: 12000, credits: 48000 },
    { level: 14, exp: 14000, credits: 56000 },
    { level: 15, exp: 17000, credits: 68000 },
];

// Максимальный уровень
export const MAX_LEVEL = 15;

// Данжи (уровень данжа -> EXP за проход)
export const dungeonData = [
    { level: 1, exp: 600 },
    { level: 2, exp: 600 },
    { level: 3, exp: 700 },
    { level: 4, exp: 700 },
    { level: 5, exp: 800 },
    { level: 6, exp: 800 },
    { level: 7, exp: 1000 },
    { level: 8, exp: 1000 },
    { level: 9, exp: 1100 },
    { level: 10, exp: 1300 },
];

// Стоимость входа в данж
export const DUNGEON_COST = 20; // 20 топлива за вход

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

// Данные для данжа за кредиты
export const CREDIT_DUNGEON_COST = 8; // 8 топлива за вход

// Уровни, на которых добавляется/усиливается саб-стат
export const SUBSTAT_LEVELS = [3, 6, 9, 12, 15];

// Типы протокоров и их мейн статы
export const protocoreTypes = {
    alpha: {
        name: "Alpha (α)",
        image: "../assets/icons/alpha.png",
        mainStats: [
            { name: "HP", values: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000] }
        ]
    },
    beta: {
        name: "Beta (β)",
        image: "../assets/icons/beta.png",
        mainStats: [
            { name: "Oath Recovery Boost", values: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
            { name: "Oath Strength", values: [3.5, 4.2, 4.9, 5.6, 6.3, 7, 7.7, 8.4, 9.1, 9.8, 10.5, 11.2, 11.9, 12.6, 13.3, 14] },
            { name: "Expedited Energy Boost", values: [6, 7.2, 8.4, 9.6, 10.8, 12, 13.2, 14.4, 15.6, 16.8, 18, 19.2, 20.4, 21.6, 22.8, 24] },
            { name: "ATK Bonus", values: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5] },
            { name: "HP Bonus", values: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5] },
            { name: "DEF Bonus", values: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5] }
        ]
    },
    gamma: {
        name: "Gamma (γ)",
        image: "../assets/icons/gamma.png",
        mainStats: [
            { name: "ATK", values: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200] }
        ]
    },
    delta: {
        name: "Delta (δ)",
        image: "../assets/icons/delta.png",
        mainStats: [
            { name: "CRIT Rate", values: [3.7, 4.2, 4.7, 5.2, 5.7, 6.2, 6.7, 7.2, 7.7, 8.2, 8.7, 9.2, 9.7, 10.2, 10.7, 11.2] },
            { name: "CRIT DMG", values: [7.4, 8.4, 9.4, 10.4, 11.4, 12.4, 13.4, 14.4, 15.4, 16.4, 17.4, 18.4, 19.4, 20.4, 21.4, 22.4] },
            { name: "DMG Boost to Weakened", values: [4.7, 5.6, 6.5, 7.4, 8.3, 9.2, 10.1, 11, 11.9, 12.8, 13.7, 14.6, 15.5, 16.4, 17.3, 18.2] },
            { name: "ATK Bonus", values: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5] },
            { name: "HP Bonus", values: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5] },
            { name: "DEF Bonus", values: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5] }
        ]
    }
};

export const protocoreColor = [
    {
        id: 1,
        img: "../assets/icons/amber-alpha.png"
    },
    {
        id: 2,
        img: "../assets/icons/amber-beta.png"
    },
    {
        id: 3,
        img: "../assets/icons/amber-delta.png"
    },
    {
        id: 4,
        img: "../assets/icons/amber-gamma.png"
    },
    {
        id: 5,
        img: "../assets/icons/emerald-alpha.png"
    },
    {
        id: 6,
        img: "../assets/icons/emerald-beta.png"
    },
    {
        id: 7,
        img: "../assets/icons/emerald-delta.png"
    },
    {
        id: 8,
        img: "../assets/icons/emerald-gamma.png"
    },
    {
        id: 9,
        img: "../assets/icons/pearl-alpha.png"
    },
    {
        id: 10,
        img: "../assets/icons/pearl-beta.png"
    },
    {
        id: 11,
        img: "../assets/icons/pearl-delta.png"
    },
    {
        id: 12,
        img: "../assets/icons/pearl-gamma.png"
    },
    {
        id: 13,
        img: "../assets/icons/ruby-alpha.png"
    },
    {
        id: 14,
        img: "../assets/icons/ruby-beta.png"
    },
    {
        id: 15,
        img: "../assets/icons/ruby-delta.png"
    },
    {
        id: 16,
        img: "../assets/icons/ruby-gamma.png"
    },
    {
        id: 17,
        img: "../assets/icons/sapphire-alpha.png"
    },
    {
        id: 18,
        img: "../assets/icons/sapphire-beta.png"
    },
    {
        id: 19,
        img: "../assets/icons/sapphire-delta.png"
    },
    {
        id: 20,
        img: "../assets/icons/sapphire-gamma.png"
    },
    {
        id: 21,
        img: "../assets/icons/violet-alpha.png"
    },
    {
        id: 22,
        img: "../assets/icons/violet-beta.png"
    },
    {
        id: 23,
        img: "../assets/icons/violet-delta.png"
    },
    {
        id: 24,
        img: "../assets/icons/violet-gamma.png"
    },
]

// Получить значение мейн стата для указанного уровня
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
    return runs * DUNGEON_COST;
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