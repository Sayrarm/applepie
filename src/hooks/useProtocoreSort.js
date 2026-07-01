import {useState, useEffect, useCallback} from 'react';

const STORAGE_KEY = 'protocore_sort_criteria';

// Функции сравнения для каждого типа сортировки
const compareFunctions = {
    type: (a, b) => a.type.localeCompare(b.type),
    stellactrum: (a, b) => a.stellactrum.localeCompare(b.stellactrum),
    level: (a, b) => b.level - a.level,
    mainStat: (a, b) => a.mainStat.localeCompare(b.mainStat)
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

export const useProtocoreSort = () => {
    const getInitialSort = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    };

    const [sortCriteria, setSortCriteria] = useState(getInitialSort);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sortCriteria));
    }, [sortCriteria]);

    const handleSortChange = (values) => {
        setSortCriteria(values || []);
    };

    const clearSorting = () => {
        setSortCriteria([]);
    };

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