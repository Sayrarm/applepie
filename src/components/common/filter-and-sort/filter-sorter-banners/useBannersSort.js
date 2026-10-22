import { useEffect, useState, useCallback } from "react";
import {
    getBannerSortCriteria,
    saveBannerSortCriteria
} from "@localstorage";

// Функции сравнения для каждого типа сортировки баннеров
const compareFunctions = {
    new: (a, b) => {
        // Сначала новые (rerun: false), потом rerun
        return (a.rerun === b.rerun) ? 0 : a.rerun ? 1 : -1;
    },
    rerun: (a, b) => {
        // Сначала rerun (rerun: true), потом новые
        return (a.rerun === b.rerun) ? 0 : a.rerun ? -1 : 1;
    },
    active: (a, b) => {
        // Сначала активные (active: true), потом неактивные
        return (a.active === b.active) ? 0 : a.active ? -1 : 1;
    },
    inactive: (a, b) => {
        // Сначала неактивные (active: false), потом активные
        return (a.active === b.active) ? 0 : a.active ? 1 : -1;
    },
    name: (a, b) => a.name.localeCompare(b.name),
    startDate: (a, b) => new Date(a.startDate) - new Date(b.startDate),
};

// Функция для многоуровневой сортировки
const multiSort = (banners, criteria) => {
    if (criteria.length === 0) return banners;

    const sorted = [...banners];

    return sorted.sort((a, b) => {
        for (const criterion of criteria) {
            const compare = compareFunctions[criterion];
            if (!compare) continue;
            const result = compare(a, b);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    });
};

export const useBannersSort = (prefix = "") => {
    const [sortCriteria, setSortCriteria] = useState(() =>
        getBannerSortCriteria(prefix),
    );

    // Сохраняем sortCriteria в localStorage при изменении
    useEffect(() => {
        saveBannerSortCriteria(prefix, sortCriteria);
    }, [sortCriteria, prefix]);

    // Обработчик изменения сортировки
    const handleSortChange = useCallback((values) => {
        setSortCriteria(values);
    }, []);

    // Очистка всех сортировок
    const clearSorting = useCallback(() => {
        setSortCriteria([]);
        saveBannerSortCriteria(prefix, []);
    }, [prefix]);

    // Сортируем баннеры
    const sortBanners = useCallback(
        (banners) => {
            return multiSort(banners, sortCriteria);
        },
        [sortCriteria],
    );

    return {
        sortCriteria,
        handleSortChange,
        clearSorting,
        sortBanners,
    };
};
