import { useEffect, useState, useCallback } from "react";
import {
    getBannerSearchQuery,
    saveBannerSearchQuery,
} from "@localstorage";

export const useBannersSearch = (prefix = "") => {
    const [searchQuery, setSearchQuery] = useState(() =>
        getBannerSearchQuery(prefix),
    );

    // Сохраняем поисковый запрос
    useEffect(() => {
        saveBannerSearchQuery(prefix, searchQuery);
    }, [searchQuery, prefix]);

    const onSearch = useCallback((value) => {
        setSearchQuery(value.toLowerCase());
    }, []);

    const clearSearch = useCallback(() => {
        setSearchQuery("");
        saveBannerSearchQuery(prefix, "");
    }, [prefix]);

    return { searchQuery, onSearch, clearSearch };
};