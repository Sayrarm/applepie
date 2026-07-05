import { useEffect, useState, useCallback } from 'react';

// Функция для получения ключей с префиксом
const getStorageKeys = (prefix = '') => ({
    SELECTED_CHAR: prefix ? `${prefix}_selected_char` : 'memories_selected_char',
    FILTERS: prefix ? `${prefix}_filters` : 'memories_filters'
});

// Функция для загрузки из localStorage с обработкой ошибок
const loadFromStorage = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved === null) return defaultValue;
        // Пытаемся парсить как JSON
        try {
            return JSON.parse(saved);
        } catch {
            // Если не парсится, возвращаем как есть (для строк)
            return saved;
        }
    } catch (e) {
        console.error('Error loading from storage:', e);
        return defaultValue;
    }
};

// Основной хук с параметром prefix
export const useFilter = (prefix = '') => {
    const storageKeys = getStorageKeys(prefix);

    // Загружаем начальные значения из localStorage
    const getInitialSelectedChar = () => {
        return loadFromStorage(storageKeys.SELECTED_CHAR, 'ALL');
    };

    const getInitialFilters = () => {
        return loadFromStorage(storageKeys.FILTERS, {
            rarity: [],
            placement: [],
            talent: [],
            stella: [],
            availability: []
        });
    };

    const [selectedChar, setSelectedChar] = useState(getInitialSelectedChar);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState(getInitialFilters);

    // Сохраняем selectedChar в localStorage при изменении
    useEffect(() => {
        localStorage.setItem(storageKeys.SELECTED_CHAR, JSON.stringify(selectedChar));
    }, [selectedChar, storageKeys.SELECTED_CHAR]);

    // Сохраняем filters в localStorage при изменении
    useEffect(() => {
        localStorage.setItem(storageKeys.FILTERS, JSON.stringify(filters));
    }, [filters, storageKeys.FILTERS]);

    const applyFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            rarity: [],
            placement: [],
            talent: [],
            stella: [],
            availability: []
        });
    }, []);

    // Фильтруем данные
    const filterMemories = useCallback((memories) => {
        return memories.filter(memory => {
            // Фильтр по персонажу (кнопки)
            const matchesChar = selectedChar === 'ALL' ||
                memory.char.toLowerCase() === selectedChar.toLowerCase();

            // Фильтр по редкости (из модалки)
            const matchesRarity = filters.rarity.length === 0 ||
                filters.rarity.includes(memory.rarityName);

            // Фильтр по размещению (solar/lunar)
            const matchesPlacement = filters.placement.length === 0 ||
                filters.placement.includes(memory.placementName);

            // Фильтр по таланту
            const matchesTalent = filters.talent.length === 0 ||
                filters.talent.includes(memory.talentName);

            // Фильтр по стелле (цвету)
            const matchesStella = filters.stella.length === 0 ||
                filters.stella.includes(memory.stellaName);

            //фильтр по наличию
            const matchesAvailability = filters.availability.length === 0 ||
                filters.availability.includes(memory.isAvailable ? 'available' : 'notAvailable');

            return matchesChar && matchesRarity && matchesPlacement &&
                matchesTalent && matchesStella && matchesAvailability;
        });
    }, [selectedChar, filters]);

    return {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        filters,
        applyFilters,
        clearFilters,
        filterMemories
    };
};