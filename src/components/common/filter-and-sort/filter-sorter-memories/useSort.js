import { useEffect, useState, useCallback } from 'react';
import {
    getSortCriteria,
    saveSortCriteria,
} from '@localstorage';

// Функции сравнения для каждого типа сортировки
const compareFunctions = {
    char: (a, b) => {
        const order = ['Caleb', 'Rafayel', 'Sylus', 'Xavier', 'Zayne'];
        return order.indexOf(a.char) - order.indexOf(b.char);
    },
    name: (a, b) => a.name.localeCompare(b.name),
    rarity: (a, b) => {
        const order = { '3-star': 3, '4-star': 2, '5-star': 1 };
        return (order[a.rarityName] || 0) - (order[b.rarityName] || 0);
    },
    stella: (a, b) => {
        const order = ['emerald', 'sapphire', 'violet', 'amber', 'ruby', 'pearl'];
        return order.indexOf(a.stellaName) - order.indexOf(b.stellaName);
    },
    placement: (a, b) => {
        const order = ['solar', 'lunar'];
        return order.indexOf(a.placementName) - order.indexOf(b.placementName);
    },
    talent: (a, b) => {
        const order = ['atk', 'def', 'hp'];
        return order.indexOf(a.talentName) - order.indexOf(b.talentName);
    }
};

// Функция для многоуровневой сортировки
const multiSort = (memories, criteria) => {
    if (criteria.length === 0) return memories;

    const sorted = [...memories];

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

export const useSort = (prefix = '') => {
    const [sortCriteria, setSortCriteria] = useState(() => getSortCriteria(prefix));

    // Сохраняем sortCriteria в localStorage при изменении
    useEffect(() => {
        saveSortCriteria(prefix, sortCriteria);
    }, [sortCriteria, prefix]);

    // Обработчик изменения сортировки
    const handleSortChange = useCallback((values) => {
        setSortCriteria(values);
    }, []);

    // Очистка всех сортировок
    const clearSorting = useCallback(() => {
        setSortCriteria([]);
        saveSortCriteria(prefix, []);
    }, [prefix]);

    // Сортируем отфильтрованные данные
    const sortMemories = useCallback((memories) => {
        return multiSort(memories, sortCriteria);
    }, [sortCriteria]);

    return {
        sortCriteria,
        handleSortChange,
        clearSorting,
        sortMemories
    };
};

// Для обратной совместимости
export const useDefaultSort = () => useSort('');