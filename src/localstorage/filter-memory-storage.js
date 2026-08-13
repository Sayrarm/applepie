import { KEYS, getMemoryFilterKeys } from '@localstorage';

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
const get = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved === null) return defaultValue;
        try {
            return JSON.parse(saved);
        } catch {
            return saved;
        }
    } catch (e) {
        console.error(`Error loading from storage ${key}:`, e);
        return defaultValue;
    }
};

const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Ошибка сохранения ${key}:`, error);
        return false;
    }
};

const remove = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Ошибка удаления ${key}:`, error);
        return false;
    }
};

// ===== ПОЛУЧЕНИЕ ВСЕХ КЛЮЧЕЙ ДЛЯ ПРЕФИКСА =====
export const getFilterKeys = (prefix = '') => {
    return getMemoryFilterKeys(prefix);
};

// ===== SELECTED CHAR =====
export const getSelectedChar = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.selectedChar, 'ALL');
};

export const saveSelectedChar = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.selectedChar, value);
};

// ===== FILTERS (объект со всеми фильтрами) =====
export const getFilters = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.filters, {
        rarity: [],
        placement: [],
        talent: [],
        stella: [],
        availability: []
    });
};

export const saveFilters = (prefix = '', filters) => {
    const keys = getFilterKeys(prefix);
    return set(keys.filters, filters);
};

// ===== ОТДЕЛЬНЫЕ ФИЛЬТРЫ =====
export const getRarityFilter = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.rarity, []);
};

export const saveRarityFilter = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.rarity, value);
};

export const getPlacementFilter = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.placement, []);
};

export const savePlacementFilter = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.placement, value);
};

export const getTalentFilter = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.talent, []);
};

export const saveTalentFilter = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.talent, value);
};

export const getStellaFilter = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.stella, []);
};

export const saveStellaFilter = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.stella, value);
};

export const getAvailabilityFilter = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.availability, []);
};

export const saveAvailabilityFilter = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.availability, value);
};

// ===== SEARCH =====
export const getSearchQuery = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.search, '');
};

export const saveSearchQuery = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.search, value);
};

// ===== SORT =====
export const getSortCriteria = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    return get(keys.sort, []);
};

export const saveSortCriteria = (prefix = '', value) => {
    const keys = getFilterKeys(prefix);
    return set(keys.sort, value);
};

// ===== ОЧИСТКА ВСЕХ ФИЛЬТРОВ =====
export const clearAllFilters = (prefix = '') => {
    const keys = getFilterKeys(prefix);
    Object.values(keys).forEach(key => {
        remove(key);
    });
    return true;
};

// ===== СОЗДАНИЕ ДЕФОЛТНЫХ ФИЛЬТРОВ =====
export const getDefaultFilters = () => ({
    rarity: [],
    placement: [],
    talent: [],
    stella: [],
    availability: []
});

// ===== ОБНОВЛЕНИЕ ФИЛЬТРОВ =====
export const updateFilters = (prefix = '', newFilters) => {
    const currentFilters = getFilters(prefix);
    const updated = { ...currentFilters, ...newFilters };
    saveFilters(prefix, updated);
    return updated;
};

// ===== СОРТИРОВКА ТАБЛИЦЫ (MyMemories) =====
export const getTableSort = () => {
    try {
        const saved = localStorage.getItem(KEYS.TABLE_SORT_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading table sort from localStorage:', e);
    }
    return { key: null, direction: 'desc' };
};

export const saveTableSort = (sortConfig) => {
    try {
        localStorage.setItem(KEYS.TABLE_SORT_KEY, JSON.stringify(sortConfig));
        return true;
    } catch (e) {
        console.error('Error saving table sort to localStorage:', e);
        return false;
    }
};

export const clearTableSort = () => {
    try {
        localStorage.removeItem(KEYS.TABLE_SORT_KEY);
        return true;
    } catch (e) {
        console.error('Error clearing table sort from localStorage:', e);
        return false;
    }
};