// Данные по уровням для разных редкостей
export const rarityLevels = {
    '3-star': {
        name: '3★',
        ascend: {
            'Ascend 10+': { crystals: { N: 24, R: 0, SR: 0 }, credits: 9000 },
            'Ascend 20+': { crystals: { N: 48, R: 0, SR: 0 }, credits: 15000 },
            'Ascend 30+': { crystals: { N: 96, R: 0, SR: 0 }, credits: 30000 },
            'Ascend 40+': { crystals: { N: 192, R: 90, SR: 0 }, credits: 48000 },
            'Ascend 50+': { crystals: { N: 384, R: 180, SR: 0 }, credits: 90000 },
            'Ascend 60+': { crystals: { N: 720, R: 306, SR: 144 }, credits: 150000 },
            'Ascend 70+': { crystals: { N: 1440, R: 600, SR: 299 }, credits: 240000 }
        },
        awaken: { 'Awaken 80': { crystals: { N: 720, R: 288, SR: 108 }, credits: 150000, heart: null } },
        expRanges: {
            '1': 0, '2': 90, '3': 100, '4': 100, '5': 110,
            '6': 110, '7': 120, '8': 130, '9': 130, '10': 140,
            '11': 140, '12': 150, '13': 160, '14': 160, '15': 170,
            '16': 170, '17': 180, '18': 190, '19': 190, '20': 200,
            '21': 220, '22': 230, '23': 250, '24': 260, '25': 280,
            '26': 290, '27': 300, '28': 320, '29': 330, '30': 340,
            '31': 440, '32': 460, '33': 490, '34': 520, '35': 550,
            '36': 580, '37': 610, '38': 640, '39': 660, '40': 690,
            '41': 870, '42': 930, '43': 980, '44': 1040, '45': 1100,
            '46': 1150, '47': 1210, '48': 1270, '49': 1320, '50': 1380,
            '51': 1750, '52': 1850, '53': 1970, '54': 2080, '55': 2200,
            '56': 2300, '57': 2420, '58': 2530, '59': 2650, '60': 2750,
            '61': 3490, '62': 3710, '63': 3940, '64': 4160, '65': 4390,
            '66': 4610, '67': 4840, '68': 5060, '69': 5290, '70': 5510,
            '71': 6170, '72': 6800, '73': 7430, '74': 8060, '75': 8690,
            '76': 9320, '77': 9950, '78': 10580, '79': 11210, '80': 11840
        }
    },
    '4-star': {
        name: '4★',
        ascend: {
            'Ascend 10+': { crystals: { N: 32, R: 0, SR: 0 }, credits: 12000 },
            'Ascend 20+': { crystals: { N: 64, R: 0, SR: 0 }, credits: 20000 },
            'Ascend 30+': { crystals: { N: 128, R: 0, SR: 0 }, credits: 40000 },
            'Ascend 40+': { crystals: { N: 256, R: 120, SR: 0 }, credits: 64000 },
            'Ascend 50+': { crystals: { N: 512, R: 240, SR: 0 }, credits: 120000 },
            'Ascend 60+': { crystals: { N: 960, R: 408, SR: 192 }, credits: 200000 },
            'Ascend 70+': { crystals: { N: 1920, R: 800, SR: 398 }, credits: 320000 }
        },
        awaken: { 'Awaken 80': { crystals: { N: 960, R: 384, SR: 144 }, credits: 200000, heart: 'Heart SR' } },
        expRanges: {
            '1': 0, '2': 20, '3': 30, '4': 40, '5': 40,
            '6': 50, '7': 60, '8': 70, '9': 80, '10': 180,
            '11': 190, '12': 200, '13': 210, '14': 220, '15': 220,
            '16': 230, '17': 240, '18': 250, '19': 260, '20': 260,
            '21': 290, '22': 310, '23': 330, '24': 340, '25': 370,
            '26': 380, '27': 400, '28': 420, '29': 440, '30': 460,
            '31': 580, '32': 620, '33': 660, '34': 700, '35': 730,
            '36': 770, '37': 810, '38': 850, '39': 880, '40': 920,
            '41': 1160, '42': 1240, '43': 1310, '44': 1390, '45': 1460,
            '46': 1540, '47': 1620, '48': 1690, '49': 1760, '50': 1840,
            '51': 2330, '52': 2470, '53': 2620, '54': 2780, '55': 2930,
            '56': 3070, '57': 3220, '58': 3380, '59': 3530, '60': 3670,
            '61': 4650, '62': 4950, '63': 5250, '64': 5550, '65': 5850,
            '66': 6150, '67': 6450, '68': 6750, '69': 7050, '70': 7350,
            '71': 8220, '72': 9060, '73': 9900, '74': 10740, '75': 11580,
            '76': 12420, '77': 13260, '78': 14100, '79': 14940, '80': 15780
        }
    },
    '5-star': {
        name: '5★',
        ascend: {
            'Ascend 10+': { crystals: { N: 40, R: 0, SR: 0 }, credits: 15000 },
            'Ascend 20+': { crystals: { N: 80, R: 0, SR: 0 }, credits: 25000 },
            'Ascend 30+': { crystals: { N: 160, R: 0, SR: 0 }, credits: 50000 },
            'Ascend 40+': { crystals: { N: 320, R: 150, SR: 0 }, credits: 80000 },
            'Ascend 50+': { crystals: { N: 640, R: 300, SR: 0 }, credits: 150000 },
            'Ascend 60+': { crystals: { N: 1200, R: 510, SR: 240 }, credits: 250000 },
            'Ascend 70+': { crystals: { N: 2400, R: 1000, SR: 498 }, credits: 400000 }
        },
        awaken: { 'Awaken 80': { crystals: { N: 1200, R: 480, SR: 180 }, credits: 250000, heart: 'Heart SSR' } },
        expRanges: {
            '1': 0, '2': 150, '3': 160, '4': 170, '5': 180,
            '6': 190, '7': 200, '8': 210, '9': 220, '10': 230,
            '11': 240, '12': 250, '13': 260, '14': 270, '15': 280,
            '16': 290, '17': 300, '18': 310, '19': 320, '20': 330,
            '21': 360, '22': 390, '23': 410, '24': 430, '25': 460,
            '26': 480, '27': 500, '28': 530, '29': 550, '30': 570,
            '31': 730, '32': 770, '33': 820, '34': 870, '35': 910,
            '36': 960, '37': 1010, '38': 1060, '39': 1100, '40': 1150,
            '41': 1450, '42': 1550, '43': 1640, '44': 1740, '45': 1830,
            '46': 1920, '47': 2020, '48': 2110, '49': 2200, '50': 2300,
            '51': 2910, '52': 3090, '53': 3280, '54': 3470, '55': 3660,
            '56': 3840, '57': 4030, '58': 4220, '59': 4410, '60': 4590,
            '61': 5810, '62': 6190, '63': 6560, '64': 6940, '65': 7310,
            '66': 7690, '67': 8060, '68': 8440, '69': 8810, '70': 9190,
            '71': 10280, '72': 11330, '73': 12380, '74': 13430, '75': 14480,
            '76': 15530, '77': 16580, '78': 17630, '79': 18680, '80': 19730
        }
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

// Типы данжей кристаллов и соответствующие цвета
export const crystalTypesDungeons = [
    { id: 'lemonette', name: "Lemonette", colors: ['Emerald', 'Amber'] },
    { id: 'snoozer', name: "Snoozer", colors: ['Violet', 'Pearl'] },
    { id: 'pumpkin', name: "Pumpkin Magus", colors: ['Sapphire', 'Ruby'] }
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

// Получить тип данжа по цвету кристалла
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

// Получить количество проходов данжа для кредитов
export const getCreditDungeonRuns = (creditsNeeded, dungeonLevel) => {
    const dungeon = creditDungeonData.find(d => d.level === dungeonLevel);
    if (!dungeon) return 0;
    return Math.ceil(creditsNeeded / dungeon.credits);
};

// Получить топливо
export const getStaminaCost = (runs) => runs * DUNGEON_COST;