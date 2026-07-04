import { useState, useEffect } from 'react';

const STORAGE_KEY = 'protocore_search_query';

export const useProtocoreSearch = () => {
    const getInitialSearchQuery = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved || '';
    };

    const [searchQuery, setSearchQuery] = useState(getInitialSearchQuery);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, searchQuery);
    }, [searchQuery]);

    const onSearch = (value) => {
        setSearchQuery(value.toLowerCase());
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return { searchQuery, onSearch, clearSearch };
};