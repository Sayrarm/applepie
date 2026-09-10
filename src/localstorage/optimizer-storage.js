import { KEYS, get, set } from "@localstorage";

// ===== ДАННЫЕ ОПТИМИЗАТОРА =====
export const getOptimizerData = () => {
    return get(KEYS.OPTIMIZER, {
        selectedCompanion: null,
        selectedWeapon: null,
        betaProtocore: null,
        deltaProtocore: null,
        mainStat: null,
        subStat: null,
        cards: {
            solar1: null,
            solar2: null,
            lunar1: null,
            lunar2: null,
            lunar3: null,
            lunar4: null,
        },
    });
};

export const saveOptimizerData = (data) => {
    return set(KEYS.OPTIMIZER, data);
};

export const clearOptimizerData = () => {
    return set(KEYS.OPTIMIZER, {
        selectedCompanion: null,
        selectedWeapon: null,
        betaProtocore: null,
        deltaProtocore: null,
        mainStat: null,
        subStat: null,
        cards: {
            solar1: null,
            solar2: null,
            lunar1: null,
            lunar2: null,
            lunar3: null,
            lunar4: null,
        },
    });
};