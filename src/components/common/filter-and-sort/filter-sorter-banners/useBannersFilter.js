import { useEffect, useState, useCallback } from "react";
import {
    getBannerSelectedChar,
    saveBannerSelectedChar,
    getBannerFilters,
    saveBannerFilters,
    getDefaultBannerFilters,
    clearAllBannerFilters,
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

export const useBannersFilter = (prefix = "") => {
    // Загружаем начальные значения из localStorage
    const [selectedChar, setSelectedChar] = useState(() =>
        getBannerSelectedChar(prefix),
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState(() => getBannerFilters(prefix));

    // Сохраняем selectedChar в localStorage
    useEffect(() => {
        saveBannerSelectedChar(prefix, selectedChar);
    }, [selectedChar, prefix]);

    // Сохраняем filters в localStorage
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
                // --- Фильтр по персонажу (кнопки) ---
                const bannerChars = getBannerCharacters(banner);
                const matchesChar =
                    selectedChar === "ALL" ||
                    bannerChars.some(
                        (c) => c.toLowerCase() === selectedChar.toLowerCase(),
                    );

                // --- Фильтр по типу баннера (standart/multi/myth/solo/birthday) ---
                // Если type не задан в данных баннера — не отфильтровываем
                const typeFilter = filters.type || [];
                const matchesType =
                    typeFilter.length === 0 ||
                    (banner.type != null && typeFilter.includes(banner.type));

                // --- Фильтр New/Rerun ---
                // Массив может содержать "new" и/или "rerun"
                // Фильтр применяется только если массив не пуст
                const newRerunFilter = filters.newRerun || [];
                const matchesNewRerun =
                    newRerunFilter.length === 0 ||
                    (newRerunFilter.includes("new") && banner.rerun === false) ||
                    (newRerunFilter.includes("rerun") && banner.rerun === true);

                // --- Фильтр Active/Inactive ---
                const availabilityFilter = filters.availability || [];
                const matchesAvailability =
                    availabilityFilter.length === 0 ||
                    (availabilityFilter.includes("active") && banner.active === true) ||
                    (availabilityFilter.includes("inactive") && banner.active === false);

                return (
                    matchesChar &&
                    matchesType &&
                    matchesNewRerun &&
                    matchesAvailability
                );
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