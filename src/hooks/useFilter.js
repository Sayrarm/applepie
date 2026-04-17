import { useState } from 'react';

export const useFilter = () => {

    const [selectedChar, setSelectedChar] = useState('ALL');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        rarity: [],
        placement: [],
        talent: [],
        stella: []
    })

    const applyFilters = (newFilters) => {
        setFilters(newFilters)
    }

    const clearFilters = () => {
        setFilters({
            rarity: [],
            placement: [],
            talent: [],
            stella: []
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

            // Фильтр по стилле (цвету)
            const matchesStella = filters.stella.length === 0 ||
                filters.stella.includes(memory.stellaName);

            return matchesChar && matchesRarity &&
                matchesPlacement && matchesTalent && matchesStella;
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
