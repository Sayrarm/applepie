import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
    FILTERS: 'protocore_filters'
};

export const useProtocoreFilter = () => {
    const getInitialFilters = () => {
        const saved = localStorage.getItem(STORAGE_KEYS.FILTERS);
        return saved ? JSON.parse(saved) : {
            types: [],
            stellactrum: [],
            levels: [],
            mainStats: [],
            subStats: []
        };
    };

    const [filters, setFilters] = useState(getInitialFilters);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
    }, [filters]);

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const clearFilters = () => {
        setFilters({
            types: [],
            stellactrum: [],
            levels: [],
            mainStats: [],
            subStats: []
        });
    };

    const filterProtocores = (protocores) => {
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
    };

    return {
        filters,
        applyFilters,
        clearFilters,
        filterProtocores,
        isModalOpen,
        setIsModalOpen
    };
};