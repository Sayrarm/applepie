import { KEYS, get, set } from "@localstorage";

// ===== ДЕФОЛТНЫЕ ДАННЫЕ TEAM OPTIMIZER =====
const getDefaultTeamOptimizerData = () => ({
    selectedCompanion: null,
    selectedWeapon: null,
    betaProtocore_1: null,
    betaProtocore_2: null,
    deltaProtocore_1: null,
    deltaProtocore_2: null,
    mainStat: null,
    subStat: null,
    excludedCards: [],
    cards: {
        solar1: null,
        solar2: null,
        lunar1: null,
        lunar2: null,
        lunar3: null,
        lunar4: null,
    },
});

// ===== ДЕФОЛТНЫЕ ДАННЫЕ MEMORY OPTIMIZER =====
const getDefaultMemoryOptimizerData = () => ({
    selectedCard: null,
    mainStat: null,
    subStat: null,
    betaProtocore: null,
    deltaProtocore: null,
    excludedCards: [],
});

// =========================================================
// TEAM OPTIMIZER
// =========================================================

export const getOptimizerData = () => {
    const defaults = getDefaultTeamOptimizerData();
    const stored = get(KEYS.OPTIMIZER, null);

    if (!stored || typeof stored !== "object") {
        return defaults;
    }


    const migrated = { ...stored };

    // Миграция: старое поле deltaProtocore → deltaProtocore_1
    if (migrated.deltaProtocore !== undefined) {
        if (migrated.deltaProtocore_1 === undefined) {
            migrated.deltaProtocore_1 = migrated.deltaProtocore;
        }
        delete migrated.deltaProtocore;
    }

    // Мержим с дефолтами — чтобы новые поля всегда были
    return {
        ...defaults,
        ...migrated,
        cards: {
            ...defaults.cards,
            ...(migrated.cards || {}),
        },
        excludedCards: Array.isArray(migrated.excludedCards)
            ? migrated.excludedCards
            : [],
    };
};

export const saveOptimizerData = (data) => {
    return set(KEYS.OPTIMIZER, data);
};

// ===== ОЧИСТКА ДАННЫХ ОПТИМИЗАТОРА =====
export const clearOptimizerData = () => {
    return set(KEYS.OPTIMIZER, getDefaultTeamOptimizerData());
};

// =========================================================
// MEMORY OPTIMIZER
// =========================================================

export const getMemoryOptimizerData = () => {
    const defaults = getDefaultMemoryOptimizerData();
    const stored = get(KEYS.MEMORY_OPTIMIZER, null);

    if (!stored || typeof stored !== "object") {
        return defaults;
    }

    return {
        ...defaults,
        ...stored,
        excludedCards: Array.isArray(stored.excludedCards)
            ? stored.excludedCards
            : [],
    };
};

export const saveMemoryOptimizerData = (data) => {
    return set(KEYS.MEMORY_OPTIMIZER, data);
};

export const clearMemoryOptimizerData = () => {
    return set(KEYS.MEMORY_OPTIMIZER, getDefaultMemoryOptimizerData());
};