import { useState, useCallback, useEffect } from "react";
import { sortTableData } from "./tableSort.js";
import { getTableSort, saveTableSort } from "@localstorage";

export const useTableSort = (defaultSort = { key: null, direction: "desc" }, storageKey) => {
    const [sortConfig, setSortConfig] = useState(() => {
        if (!storageKey) return defaultSort;
        const saved = getTableSort(storageKey);
        return saved && saved.key ? saved : defaultSort;
    });

    useEffect(() => {
        if (!storageKey) return;
        saveTableSort(sortConfig, storageKey);
    }, [sortConfig, storageKey]);

    const handleSort = useCallback((key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "desc" };
        });
    }, []);

    // Стабильный resetSort — не зависит от ссылки на defaultSort
    const resetSort = useCallback(() => {
        const def = { key: null, direction: "desc" };
        setSortConfig(def);
        if (storageKey) {
            saveTableSort(def, storageKey);
        }
    }, [storageKey]);

    const getSortIcon = useCallback(
        (key) => {
            if (sortConfig.key !== key) return "↕";
            return sortConfig.direction === "asc" ? "▲" : "▼";
        },
        [sortConfig],
    );

    const sortData = useCallback(
        (data, valueGetter) => sortTableData(data, sortConfig, valueGetter),
        [sortConfig],
    );

    return { sortConfig, handleSort, getSortIcon, sortData, resetSort };
};