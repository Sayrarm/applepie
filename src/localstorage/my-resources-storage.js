import { KEYS, get, set } from '@localstorage';

// ===== BOTTLES =====
export const getBottles = () => get(KEYS.INVENTORY_BOTTLES, {});
export const saveBottles = (data) => set(KEYS.INVENTORY_BOTTLES, data);

// ===== HEARTSAND =====
export const getHeartsand = () => get(KEYS.INVENTORY_HEARTSAND, {});
export const saveHeartsand = (data) => set(KEYS.INVENTORY_HEARTSAND, data);

// ===== CRYSTALS =====
export const getCrystals = () => get(KEYS.INVENTORY_CRYSTALS, {});
export const saveCrystals = (data) => set(KEYS.INVENTORY_CRYSTALS, data);

// ===== CRYSTAL BOXES =====
export const getCrystalBoxes = () => get(KEYS.INVENTORY_CRYSTAL_BOXES, {});
export const saveCrystalBoxes = (data) => set(KEYS.INVENTORY_CRYSTAL_BOXES, data);

// ===== HEARTS =====
export const getHearts = () => get(KEYS.INVENTORY_HEARTS, {});
export const saveHearts = (data) => set(KEYS.INVENTORY_HEARTS, data);

// ===== CORE ENERGY =====
export const getCoreEnergy = () => get(KEYS.INVENTORY_CORE_ENERGY, {});
export const saveCoreEnergy = (data) => set(KEYS.INVENTORY_CORE_ENERGY, data);

// ===== CREDITS =====
export const getCredits = () => Number(get(KEYS.INVENTORY_CREDITS, 0)) || 0;
export const saveCredits = (value) => set(KEYS.INVENTORY_CREDITS, String(value));

// ===== SELECTED CRYSTAL COLOR =====
export const getSelectedCrystalColor = () => get(KEYS.INVENTORY_SELECTED_CRYSTAL_COLOR, 'violet');
export const saveSelectedCrystalColor = (color) => set(KEYS.INVENTORY_SELECTED_CRYSTAL_COLOR, color);

// ===== DIAMONDS =====
export const getDiamonds = () => Number(get(KEYS.INVENTORY_DIAMONDS, 0)) || 0;
export const saveDiamonds = (value) => set(KEYS.INVENTORY_DIAMONDS, String(value));

// ===== WISH =====
export const getWish = () => get(KEYS.INVENTORY_WISH, {});
export const saveWish = (data) => set(KEYS.INVENTORY_WISH, data);
