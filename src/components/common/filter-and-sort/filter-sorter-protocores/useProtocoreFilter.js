import { useState, useEffect, useCallback } from "react";
import {
  getProtocoreFilters,
  saveProtocoreFilters,
  getDefaultProtocoreFilters,
  isProtocoreEquipped,
} from "@localstorage";

export const useProtocoreFilter = (prefix = "") => {
  const [filters, setFilters] = useState(() => getProtocoreFilters(prefix));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    saveProtocoreFilters(prefix, filters);
  }, [filters, prefix]);

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    const defaultFilters = getDefaultProtocoreFilters();
    setFilters(defaultFilters);
    saveProtocoreFilters(prefix, defaultFilters);
  }, [prefix]);

  const filterProtocores = useCallback(
    (protocores) => {
      return protocores.filter((protocore) => {
        // Фильтр по типу
        const matchesType =
          filters.types.length === 0 || filters.types.includes(protocore.type);

        // Фильтр по стеллакруму
        const matchesStellactrum =
          filters.stellactrum.length === 0 ||
          filters.stellactrum.includes(protocore.stellactrum);

        // Фильтр по уровню
        const matchesLevel =
          filters.levels.length === 0 ||
          filters.levels.includes(String(protocore.level));

        // Фильтр по мейн стату
        const matchesMainStat =
          filters.mainStats.length === 0 ||
          filters.mainStats.includes(protocore.mainStat);

        // Фильтр по сабстатам
        const matchesSubStat =
          filters.subStats.length === 0 ||
          (protocore.substats &&
            protocore.substats.some((sub) =>
              filters.subStats.includes(sub.stat),
            ));

        // Фильтр по статусу (Equipped/Free)
        let matchesStatus = true;
        if (filters.status && filters.status.length > 0) {
          const isEquipped = isProtocoreEquipped(protocore.id);
          const isEquippedFilter = filters.status.includes("equipped");
          const isFreeFilter = filters.status.includes("free");

          if (isEquippedFilter && isFreeFilter) {
            matchesStatus = true;
          } else if (isEquippedFilter) {
            matchesStatus = isEquipped === true;
          } else if (isFreeFilter) {
            matchesStatus = isEquipped === false;
          }
        }

        return (
          matchesType &&
          matchesStellactrum &&
          matchesLevel &&
          matchesMainStat &&
          matchesSubStat &&
          matchesStatus
        );
      });
    },
    [filters],
  );

  return {
    filters,
    applyFilters,
    clearFilters,
    filterProtocores,
    isModalOpen,
    setIsModalOpen,
  };
};
