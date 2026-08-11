import { useState, useEffect, useCallback } from 'react';
import { memoriesData } from '@data';

// Функция для получения ключа с префиксом
const getStorageKey = (prefix = '') => {
    return prefix ? `${prefix}_protocore_sort_criteria` : 'protocore_sort_criteria';
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

// Функции сравнения для каждого типа сортировки
const compareFunctions = {
    type: (a, b) => a.type.localeCompare(b.type),
    stellactrum: (a, b) => a.stellactrum.localeCompare(b.stellactrum),
    level: (a, b) => b.level - a.level,
    mainStat: (a, b) => a.mainStat.localeCompare(b.mainStat),
    status: (a, b) => {
        const aEquipped = isProtocoreEquipped(a.id);
        const bEquipped = isProtocoreEquipped(b.id);
        // Equipped (true) идут первыми, Free (false) вторыми
        if (aEquipped && !bEquipped) return -1;
        if (!aEquipped && bEquipped) return 1;
        return 0;
    }
};

// Функция для многоуровневой сортировки
const multiSort = (protocores, criteria) => {
    if (!criteria || criteria.length === 0) return protocores;

    const sorted = [...protocores];

    return sorted.sort((a, b) => {
        for (const criterion of criteria) {
            const compare = compareFunctions[criterion];
            const result = compare(a, b);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    });
};

export const useProtocoreSort = (prefix = '') => {
    const storageKey = getStorageKey(prefix);

    const getInitialSort = () => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    };

    const [sortCriteria, setSortCriteria] = useState(getInitialSort);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(sortCriteria));
    }, [sortCriteria, storageKey]);

    const handleSortChange = useCallback((values) => {
        setSortCriteria(values || []);
    }, []);

    const clearSorting = useCallback(() => {
        setSortCriteria([]);
    }, []);

    const sortProtocores = useCallback((protocores) => {
        return multiSort(protocores, sortCriteria);
    }, [sortCriteria]);

    return {
        sortCriteria,
        handleSortChange,
        clearSorting,
        sortProtocores
    };
};