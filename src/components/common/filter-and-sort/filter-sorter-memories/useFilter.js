import { useEffect, useState, useCallback } from "react";
import {
  getSelectedChar,
  saveSelectedChar,
  getFilters,
  saveFilters,
  getDefaultFilters,
  clearAllFilters,
} from "@localstorage";
import {obtainData} from "@data";

export const useFilter = (prefix = "") => {
  // Загружаем начальные значения из localStorage
  const [selectedChar, setSelectedChar] = useState(() =>
    getSelectedChar(prefix),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState(() => getFilters(prefix));

  // Сохраняем selectedChar в localStorage при изменении
  useEffect(() => {
    saveSelectedChar(prefix, selectedChar);
  }, [selectedChar, prefix]);

  // Сохраняем filters в localStorage при изменении
  useEffect(() => {
    saveFilters(prefix, filters);
  }, [filters, prefix]);

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    const defaultFilters = getDefaultFilters();
    setFilters(defaultFilters);
    saveFilters(prefix, defaultFilters);
  }, [prefix]);

  // Полная очистка всех фильтров (включая localStorage)
  const clearAll = useCallback(() => {
    clearAllFilters(prefix);
    setSelectedChar("ALL");
    setFilters(getDefaultFilters());
  }, [prefix]);

  // Фильтруем данные
    const filterMemories = useCallback(
        (memories) => {
            // Хелпер: возвращает Set id карт для выбранных bannerType'ов
            // или null, если фильтр не активен (ничего не выбрано)
            const getMatchedIds = (bannerTypes) => {
                if (!bannerTypes || bannerTypes.length === 0) return null;
                return new Set(
                    obtainData
                        .filter((o) => bannerTypes.includes(o.bannerType))
                        .flatMap((o) => o.memories)
                );
            };

            // Предвычисляем допустимые id для каждой группы фильтров
            const obtainIds = getMatchedIds(filters.obtain);
            const eventStandardIds = getMatchedIds(filters.eventStandard);

            return memories.filter((memory) => {
                const id = Number(memory.id);

                // Фильтр по персонажу (кнопки)
                const matchesChar =
                    selectedChar === "ALL" ||
                    memory.char.toLowerCase() === selectedChar.toLowerCase();

                // Фильтр по редкости (из модалки)
                const matchesRarity =
                    filters.rarity.length === 0 ||
                    filters.rarity.includes(memory.rarityName);

                // Фильтр по размещению (solar/lunar)
                const matchesPlacement =
                    filters.placement.length === 0 ||
                    filters.placement.includes(memory.placementName);

                // Фильтр по таланту
                const matchesTalent =
                    filters.talent.length === 0 ||
                    filters.talent.includes(memory.talentName);

                // Фильтр по стелле (цвету)
                const matchesStella =
                    filters.stella.length === 0 ||
                    filters.stella.includes(memory.stellaName);

                // Фильтр по наличию
                const matchesAvailability =
                    filters.availability.length === 0 ||
                    filters.availability.includes(
                        memory.isAvailable ? "available" : "notAvailable"
                    );

                // Фильтр по способу получения (obtain)
                const matchesObtain = !obtainIds || obtainIds.has(id);

                // Фильтр по категории памяти (Event / Standard)
                const matchesEventStandard =
                    !eventStandardIds || eventStandardIds.has(id);

                return (
                    matchesChar &&
                    matchesRarity &&
                    matchesPlacement &&
                    matchesTalent &&
                    matchesStella &&
                    matchesAvailability &&
                    matchesObtain &&
                    matchesEventStandard
                );
            });
        },
        [selectedChar, filters]
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
    filterMemories,
  };
};
