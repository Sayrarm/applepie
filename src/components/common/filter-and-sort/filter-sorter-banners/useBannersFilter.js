import { useEffect, useState, useCallback } from "react";
import {
    getBannerSelectedChar,
    saveBannerSelectedChar,
    getDefaultBannerFilters,
    clearAllBannerFilters,
    saveBannerFilters,
    getBannerFilters
} from "@localstorage";
import { memoriesData } from "@data";

// Вспомогательная функция: получить уникальных персонажей баннера
const getBannerCharacters = (banner) => {
    const chars = new Set();
    banner.cardIds?.forEach((cardId) => {
        const memory = memoriesData.find((m) => m.id === cardId);
        if (memory) {
            chars.add(memory.char);
        }
    });
    return Array.from(chars);
};

// Определяем тип баннера: solo (один персонаж) или multi (несколько)
const getBannerType = (banner) => {
    const chars = getBannerCharacters(banner);
    return chars.length <= 1 ? "solo" : "multi";
};

export const useBannersFilter = (prefix = "") => {
    // Загружаем начальные значения из localStorage
    const [selectedChar, setSelectedChar] = useState(() =>
        getBannerSelectedChar(prefix),
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState(() => getBannerFilters(prefix));

    // Сохраняем selectedChar в localStorage при изменении
    useEffect(() => {
        saveBannerSelectedChar(prefix, selectedChar);
    }, [selectedChar, prefix]);

    // Сохраняем filters в localStorage при изменении
    useEffect(() => {
        saveBannerFilters(prefix, filters);
    }, [filters, prefix]);

    const applyFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    const clearFilters = useCallback(() => {
        const defaultFilters = getDefaultBannerFilters();
        setFilters(defaultFilters);
        saveBannerFilters(prefix, defaultFilters);
    }, [prefix]);

    // Полная очистка всех фильтров (включая localStorage)
    const clearAll = useCallback(() => {
        clearAllBannerFilters(prefix);
        setSelectedChar("ALL");
        setFilters(getDefaultBannerFilters());
    }, [prefix]);

    // Фильтруем баннеры
    const filterBanners = useCallback(
        (banners) => {
            return banners.filter((banner) => {
                const bannerChars = getBannerCharacters(banner);
                const bannerType = getBannerType(banner);

                // Фильтр по персонажу (кнопки)
                // Если баннер содержит карточки выбранного персонажа
                const matchesChar =
                    selectedChar === "ALL" ||
                    bannerChars.some(
                        (c) => c.toLowerCase() === selectedChar.toLowerCase(),
                    );

                // Фильтр по типу (solo / multi)
                const matchesType =
                    !filters.type ||
                    filters.type.length === 0 ||
                    filters.type.includes(bannerType);

                return matchesChar && matchesType;
            });
        },
        [selectedChar, filters],
    );

    return {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        filters,
        applyFilters,
        clearFilters,
        clearAll,
        filterBanners,
    };
};