import { getBannerFilterKeys, get, set, remove } from "@localstorage";

// ===== ПОЛУЧЕНИЕ ВСЕХ КЛЮЧЕЙ ДЛЯ ПРЕФИКСА =====
export const getBannerFilterKeysForPrefix = (prefix = "") => {
    return getBannerFilterKeys(prefix);
};

// ===== SELECTED CHAR =====
export const getBannerSelectedChar = (prefix = "") => {
    const keys = getBannerFilterKeys(prefix);
    return get(keys.selectedChar, "ALL");
};

export const saveBannerSelectedChar = (prefix = "", value) => {
    const keys = getBannerFilterKeys(prefix);
    return set(keys.selectedChar, value);
};

// ===== FILTERS (объект со всеми фильтрами баннеров) =====
export const getBannerFilters = (prefix = "") => {
    const keys = getBannerFilterKeys(prefix);
    return get(keys.filters, {
        type: [],
    });
};

export const saveBannerFilters = (prefix = "", filters) => {
    const keys = getBannerFilterKeys(prefix);
    return set(keys.filters, filters);
};

// ===== ОТДЕЛЬНЫЕ ФИЛЬТРЫ =====
export const getBannerTypeFilter = (prefix = "") => {
    const filters = getBannerFilters(prefix);
    return filters.type || [];
};

export const saveBannerTypeFilter = (prefix = "", value) => {
    const filters = getBannerFilters(prefix);
    saveBannerFilters(prefix, { ...filters, type: value });
};

// ===== SEARCH =====
export const getBannerSearchQuery = (prefix = "") => {
    const keys = getBannerFilterKeys(prefix);
    return get(keys.search, "");
};

export const saveBannerSearchQuery = (prefix = "", value) => {
    const keys = getBannerFilterKeys(prefix);
    return set(keys.search, value);
};

// ===== SORT =====
export const getBannerSortCriteria = (prefix = "") => {
    const keys = getBannerFilterKeys(prefix);
    return get(keys.sort, []);
};

export const saveBannerSortCriteria = (prefix = "", value) => {
    const keys = getBannerFilterKeys(prefix);
    return set(keys.sort, value);
};

// ===== ОЧИСТКА ВСЕХ ФИЛЬТРОВ =====
export const clearAllBannerFilters = (prefix = "") => {
    const keys = getBannerFilterKeys(prefix);
    Object.values(keys).forEach((key) => {
        remove(key);
    });
    return true;
};

// ===== ДЕФОЛТНЫЕ ФИЛЬТРЫ =====
export const getDefaultBannerFilters = () => ({
    type: [],
});