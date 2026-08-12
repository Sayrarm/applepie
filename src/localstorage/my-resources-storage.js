import { KEYS } from './localStorageKeys';

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
// Безопасное получение данных из localStorage
const get = (key) => {
    try {
        const value = localStorage.getItem(key);
        if (value === null) return null;
        return JSON.parse(value);
    } catch {
        return localStorage.getItem(key);
    }
};

// Безопасное сохранение в localStorage
const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Ошибка сохранения ${key}:`, error);
        return false;
    }
};

// ===== BOTTLES =====
export const getBottles = () => get(KEYS.INVENTORY_BOTTLES) || {};
export const saveBottles = (data) => set(KEYS.INVENTORY_BOTTLES, data);
export const updateBottleCount = (id, count) => {
    const current = getBottles();
    current[id] = Math.max(0, Number(count) || 0);
    saveBottles(current);
    return current;
};

// ===== HEARTSAND =====
export const getHeartsand = () => get(KEYS.INVENTORY_HEARTSAND) || {};
export const saveHeartsand = (data) => set(KEYS.INVENTORY_HEARTSAND, data);
export const updateHeartsandCount = (id, count) => {
    const current = getHeartsand();
    current[id] = Math.max(0, Number(count) || 0);
    saveHeartsand(current);
    return current;
};

// ===== CRYSTALS =====
export const getCrystals = () => get(KEYS.INVENTORY_CRYSTALS) || {};
export const saveCrystals = (data) => set(KEYS.INVENTORY_CRYSTALS, data);
export const updateCrystalCount = (key, count) => {
    const current = getCrystals();
    current[key] = Math.max(0, Number(count) || 0);
    saveCrystals(current);
    return current;
};

// ===== CRYSTAL BOXES =====
export const getCrystalBoxes = () => get(KEYS.INVENTORY_CRYSTAL_BOXES) || {};
export const saveCrystalBoxes = (data) => set(KEYS.INVENTORY_CRYSTAL_BOXES, data);
export const updateCrystalBoxCount = (id, count) => {
    const current = getCrystalBoxes();
    current[id] = Math.max(0, Number(count) || 0);
    saveCrystalBoxes(current);
    return current;
};

// ===== HEARTS =====
export const getHearts = () => get(KEYS.INVENTORY_HEARTS) || {};
export const saveHearts = (data) => set(KEYS.INVENTORY_HEARTS, data);
export const updateHeartCount = (id, count) => {
    const current = getHearts();
    current[id] = Math.max(0, Number(count) || 0);
    saveHearts(current);
    return current;
};

// ===== CORE ENERGY =====
export const getCoreEnergy = () => get(KEYS.INVENTORY_CORE_ENERGY) || {};
export const saveCoreEnergy = (data) => set(KEYS.INVENTORY_CORE_ENERGY, data);
export const updateCoreEnergyCount = (id, count) => {
    const current = getCoreEnergy();
    current[id] = Math.max(0, Number(count) || 0);
    saveCoreEnergy(current);
    return current;
};

// ===== CREDITS =====
export const getCredits = () => Number(get(KEYS.INVENTORY_CREDITS)) || 0;
export const saveCredits = (value) => set(KEYS.INVENTORY_CREDITS, String(value));

// ===== SELECTED CRYSTAL COLOR =====
export const getSelectedCrystalColor = () => get(KEYS.INVENTORY_SELECTED_CRYSTAL_COLOR) || 'violet';
export const saveSelectedCrystalColor = (color) => set(KEYS.INVENTORY_SELECTED_CRYSTAL_COLOR, color);

// ===== DIAMONDS =====
export const getDiamonds = () => Number(get(KEYS.INVENTORY_DIAMONDS)) || 0;
export const saveDiamonds = (value) => set(KEYS.INVENTORY_DIAMONDS, String(value));

// ===== WISH =====
export const getWish = () => get(KEYS.INVENTORY_WISH) || {};
export const saveWish = (data) => set(KEYS.INVENTORY_WISH, data);
export const updateWishCount = (id, count) => {
    const current = getWish();
    current[id] = Math.max(0, Number(count) || 0);
    saveWish(current);
    return current;
};

// ===== УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ВСЕХ РЕСУРСОВ =====
// Можно использовать одну функцию для всех типов ресурсов, чтобы не дублировать код в компоненте
export const getResource = (key) => {
    switch (key) {
        case KEYS.INVENTORY_BOTTLES: return getBottles();
        case KEYS.INVENTORY_HEARTSAND: return getHeartsand();
        case KEYS.INVENTORY_CRYSTALS: return getCrystals();
        case KEYS.INVENTORY_CRYSTAL_BOXES: return getCrystalBoxes();
        case KEYS.INVENTORY_HEARTS: return getHearts();
        case KEYS.INVENTORY_CORE_ENERGY: return getCoreEnergy();
        case KEYS.INVENTORY_CREDITS: return getCredits();
        case KEYS.INVENTORY_DIAMONDS: return getDiamonds();
        case KEYS.INVENTORY_WISH: return getWish();
        default: return null;
    }
};

export const saveResource = (key, data) => {
    switch (key) {
        case KEYS.INVENTORY_BOTTLES: return saveBottles(data);
        case KEYS.INVENTORY_HEARTSAND: return saveHeartsand(data);
        case KEYS.INVENTORY_CRYSTALS: return saveCrystals(data);
        case KEYS.INVENTORY_CRYSTAL_BOXES: return saveCrystalBoxes(data);
        case KEYS.INVENTORY_HEARTS: return saveHearts(data);
        case KEYS.INVENTORY_CORE_ENERGY: return saveCoreEnergy(data);
        case KEYS.INVENTORY_CREDITS: return saveCredits(data);
        case KEYS.INVENTORY_DIAMONDS: return saveDiamonds(data);
        case KEYS.INVENTORY_WISH: return saveWish(data);
        default: return false;
    }
};