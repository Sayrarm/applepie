import { useState, useEffect, useCallback } from 'react';
import { memoriesData } from '@data/card-article-data/memories-data.js';

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

// Функция для проверки, одет ли протокор на карточку
const isProtocoreEquipped = (protocoreId) => {
    for (const card of memoriesData) {
        const cardProtocores = JSON.parse(localStorage.getItem(`card_protocores_${card.id}`) || '[]');
        if (cardProtocores.some(p => p.id === protocoreId)) {
            return true;
        }
    }
    return false;
};

export const useProtocoreFilter = (prefix = '') => {
    const storageKeys = getStorageKeys(prefix);

    const getInitialFilters = () => {
        return loadFromStorage(storageKeys.FILTERS, {
            types: [],
            stellactrum: [],
            levels: [],
            mainStats: [],
            subStats: [],
            status: []
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
            subStats: [],
            status: []
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

            // Фильтр по сабстатам
            const matchesSubStat = filters.subStats.length === 0 ||
                (protocore.substats && protocore.substats.some(sub =>
                    filters.subStats.includes(sub.stat)
                ));

            // Фильтр по статусу (Equipped/Free)
            let matchesStatus = true;
            if (filters.status && filters.status.length > 0) {
                const isEquipped = isProtocoreEquipped(protocore.id);
                const isEquippedFilter = filters.status.includes('equipped');
                const isFreeFilter = filters.status.includes('free');

                if (isEquippedFilter && isFreeFilter) {
                    matchesStatus = true;
                } else if (isEquippedFilter) {
                    matchesStatus = isEquipped === true;
                } else if (isFreeFilter) {
                    matchesStatus = isEquipped === false;
                }
            }

            return matchesType && matchesStellactrum &&
                matchesLevel && matchesMainStat && matchesSubStat &&
                matchesStatus;
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