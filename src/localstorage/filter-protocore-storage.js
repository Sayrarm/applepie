import {getCardKeys, getProtocoreFilterKeys, get, set, remove} from '@localstorage';
import { memoriesData } from '@data';

// ===== ПОЛУЧЕНИЕ ВСЕХ КЛЮЧЕЙ ДЛЯ ПРЕФИКСА =====
export const getProtocoreFilterKeysByPrefix = (prefix = '') => {
    return getProtocoreFilterKeys(prefix);
};

// ===== FILTERS (объект со всеми фильтрами) =====
export const getProtocoreFilters = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.filters, {
        types: [],
        stellactrum: [],
        levels: [],
        mainStats: [],
        subStats: [],
        status: []
    });
};

export const saveProtocoreFilters = (prefix = '', filters) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.filters, filters);
};

// ===== ОТДЕЛЬНЫЕ ФИЛЬТРЫ =====
export const getTypesFilter = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.types, []);
};

export const saveTypesFilter = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.types, value);
};

export const getStellactrumFilter = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.stellactrum, []);
};

export const saveStellactrumFilter = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.stellactrum, value);
};

export const getLevelsFilter = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.levels, []);
};

export const saveLevelsFilter = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.levels, value);
};

export const getMainStatsFilter = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.mainStats, []);
};

export const saveMainStatsFilter = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.mainStats, value);
};

export const getSubStatsFilter = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.subStats, []);
};

export const saveSubStatsFilter = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.subStats, value);
};

export const getStatusFilter = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.status, []);
};

export const saveStatusFilter = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.status, value);
};

// ===== SEARCH =====
export const getProtocoreSearchQuery = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.search, '');
};

export const saveProtocoreSearchQuery = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.search, value);
};

// ===== SORT =====
export const getProtocoreSortCriteria = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    return get(keys.sort, []);
};

export const saveProtocoreSortCriteria = (prefix = '', value) => {
    const keys = getProtocoreFilterKeys(prefix);
    return set(keys.sort, value);
};

// ===== ОЧИСТКА ВСЕХ ФИЛЬТРОВ =====
export const clearAllProtocoreFilters = (prefix = '') => {
    const keys = getProtocoreFilterKeys(prefix);
    Object.values(keys).forEach(key => {
        remove(key);
    });
    return true;
};

// ===== ДЕФОЛТНЫЕ ФИЛЬТРЫ =====
export const getDefaultProtocoreFilters = () => ({
    types: [],
    stellactrum: [],
    levels: [],
    mainStats: [],
    subStats: [],
    status: []
});

// ===== ПРОВЕРКА, ОДЕТ ЛИ ПРОТОКОР =====
export const isProtocoreEquipped = (protocoreId) => {
    for (const card of memoriesData) {
        const keys = getCardKeys(card.id);
        const cardProtocores = get(keys.protocores, []);
        if (cardProtocores.some(p => p.id === protocoreId)) {
            return true;
        }
    }
    return false;
};

// ===== ОБНОВЛЕНИЕ ФИЛЬТРОВ =====
export const updateProtocoreFilters = (prefix = '', newFilters) => {
    const currentFilters = getProtocoreFilters(prefix);
    const updated = { ...currentFilters, ...newFilters };
    saveProtocoreFilters(prefix, updated);
    return updated;
};