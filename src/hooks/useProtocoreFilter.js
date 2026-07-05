import { useState, useEffect, useCallback } from 'react';

// Функция для получения ключей с префиксом
const getStorageKeys = (prefix = '') => ({
    FILTERS: prefix ? `${prefix}_protocore_filters` : 'protocore_filters'
});

// Функция для загрузки из localStorage с обработкой ошибок
const loadFromStorage = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved === null) return defaultValue;
        try {
            return JSON.parse(saved);
        } catch {
            return saved;
        }
    } catch (e) {
        console.error('Error loading from storage:', e);
        return defaultValue;
    }
};

export const useProtocoreFilter = (prefix = '') => {
    const storageKeys = getStorageKeys(prefix);

    const getInitialFilters = () => {
        return loadFromStorage(storageKeys.FILTERS, {
            types: [],
            stellactrum: [],
            levels: [],
            mainStats: [],
            subStats: []
        });
    };

    const [filters, setFilters] = useState(getInitialFilters);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(storageKeys.FILTERS, JSON.stringify(filters));
    }, [filters, storageKeys.FILTERS]);

    const applyFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            types: [],
            stellactrum: [],
            levels: [],
            mainStats: [],
            subStats: []
        });
    }, []);

    const filterProtocores = useCallback((protocores) => {
        return protocores.filter(protocore => {
            // Фильтр по типу
            const matchesType = filters.types.length === 0 ||
                filters.types.includes(protocore.type);

            // Фильтр по стеллакруму
            const matchesStellactrum = filters.stellactrum.length === 0 ||
                filters.stellactrum.includes(protocore.stellactrum);

            // Фильтр по уровню
            const matchesLevel = filters.levels.length === 0 ||
                filters.levels.includes(String(protocore.level));

            // Фильтр по мейн стату
            const matchesMainStat = filters.mainStats.length === 0 ||
                filters.mainStats.includes(protocore.mainStat);

            // Фильтр по сабстатам (ищем, есть ли хотя бы один совпадающий)
            const matchesSubStat = filters.subStats.length === 0 ||
                (protocore.substats && protocore.substats.some(sub =>
                    filters.subStats.includes(sub.stat)
                ));

            return matchesType && matchesStellactrum &&
                matchesLevel && matchesMainStat && matchesSubStat;
        });
    }, [filters]);

    return {
        filters,
        applyFilters,
        clearFilters,
        filterProtocores,
        isModalOpen,
        setIsModalOpen
    };
};