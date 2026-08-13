import { useState, useEffect, useCallback } from "react";
import {
  getProtocoreSortCriteria,
  saveProtocoreSortCriteria,
  isProtocoreEquipped,
} from "@localstorage";

// Функции сравнения для каждого типа сортировки
const compareFunctions = {
  type: (a, b) => a.type.localeCompare(b.type),
  stellactrum: (a, b) => a.stellactrum.localeCompare(b.stellactrum),
  level: (a, b) => b.level - a.level,
  mainStat: (a, b) => a.mainStat.localeCompare(b.mainStat),
  status: (a, b) => {
    const aEquipped = isProtocoreEquipped(a.id);
    const bEquipped = isProtocoreEquipped(b.id);
    // Equipped (true) идут первыми, Free (false) вторыми
    if (aEquipped && !bEquipped) return -1;
    if (!aEquipped && bEquipped) return 1;
    return 0;
  },
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

export const useProtocoreSort = (prefix = "") => {
  const [sortCriteria, setSortCriteria] = useState(() =>
    getProtocoreSortCriteria(prefix),
  );

  useEffect(() => {
    saveProtocoreSortCriteria(prefix, sortCriteria);
  }, [sortCriteria, prefix]);

  const handleSortChange = useCallback((values) => {
    setSortCriteria(values || []);
  }, []);

  const clearSorting = useCallback(() => {
    setSortCriteria([]);
    saveProtocoreSortCriteria(prefix, []);
  }, [prefix]);

  const sortProtocores = useCallback(
    (protocores) => {
      return multiSort(protocores, sortCriteria);
    },
    [sortCriteria],
  );

  return {
    sortCriteria,
    handleSortChange,
    clearSorting,
    sortProtocores,
  };
};
