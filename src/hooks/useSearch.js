import {useEffect, useState} from 'react';

const STORAGE_KEY_SEARCH = 'memories_search_query';

export const useSearch = () => {
    const getInitialSearchQuery = () => {
        const saved = localStorage.getItem(STORAGE_KEY_SEARCH);
        return saved || '';
    };

    const [searchQuery, setSearchQuery] = useState(getInitialSearchQuery);

    // Сохраняем поисковый запрос
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_SEARCH, searchQuery);
    }, [searchQuery]);

    const onSearch = (value) => {
        setSearchQuery(value.toLowerCase());
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return { searchQuery, onSearch, clearSearch };
};
