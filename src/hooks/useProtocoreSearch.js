import { useState, useEffect, useCallback } from 'react';

// Функция для получения ключа с префиксом
const getStorageKey = (prefix = '') => {
    return prefix ? `${prefix}_protocore_search_query` : 'protocore_search_query';
};

// Функция для загрузки из localStorage
const loadFromStorage = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved === null) return defaultValue;
        return saved;
    } catch (e) {
        console.error('Error loading from storage:', e);
        return defaultValue;
    }
};

export const useProtocoreSearch = (prefix = '') => {
    const storageKey = getStorageKey(prefix);

    const getInitialSearchQuery = () => {
        return loadFromStorage(storageKey, '');
    };

    const [searchQuery, setSearchQuery] = useState(getInitialSearchQuery);

    useEffect(() => {
        localStorage.setItem(storageKey, searchQuery);
    }, [searchQuery, storageKey]);

    const onSearch = useCallback((value) => {
        setSearchQuery(value.toLowerCase());
    }, []);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    return { searchQuery, onSearch, clearSearch };
};