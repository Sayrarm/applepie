import {useEffect, useState} from 'react';

// Ключи для localStorage
const STORAGE_KEYS = {
    SELECTED_CHAR: 'memories_selected_char',
    FILTERS: 'memories_filters'
};

export const useFilter = () => {

    // Загружаем начальные значения из localStorage
    const getInitialSelectedChar = () => {
        const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_CHAR);
        return saved || 'ALL';
    };

    const getInitialFilters = () => {
        const saved = localStorage.getItem(STORAGE_KEYS.FILTERS);
        return saved ? JSON.parse(saved) : {
            rarity: [],
            placement: [],
            talent: [],
            stella: [],
            availability: []
        };
    };

    const [selectedChar, setSelectedChar] = useState(getInitialSelectedChar);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState(getInitialFilters);

    // Сохраняем selectedChar в localStorage при изменении
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SELECTED_CHAR, selectedChar);
    }, [selectedChar]);

    // Сохраняем filters в localStorage при изменении
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
    }, [filters]);

    const applyFilters = (newFilters) => {
        setFilters(newFilters)
    }

    const clearFilters = () => {
        setFilters({
            rarity: [],
            placement: [],
            talent: [],
            stella: [],
            availability: []
        })
    }

    // Фильтруем данные
    const filterMemories = (memories) => {
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
    };


    return { selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        filters,
        applyFilters,
        clearFilters,
        filterMemories }

}
