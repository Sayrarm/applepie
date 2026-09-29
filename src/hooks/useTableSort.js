import { useState, useCallback } from "react";
import { sortTableData } from "./tableSort.js";

export const useTableSort = (defaultSort = { key: null, direction: "desc" }) => {
    const [sortConfig, setSortConfig] = useState(defaultSort);

    const handleSort = useCallback((key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "desc" };
        });
    }, []);

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

    return { sortConfig, handleSort, getSortIcon, sortData };
};