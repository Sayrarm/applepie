import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, saveTheme } from '@localstorage';

const ThemeChange = createContext();

export const useTheme = () => {
    const context = useContext(ThemeChange);
    if (!context) throw new Error('useTheme should be used inside ThemeProvider');
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Состояние: 'light', 'dark' или 'system'
    const [theme, setTheme] = useState(() => {
        return getTheme();
    });

    const [resolvedTheme, setResolvedTheme] = useState('light');

    // Эффект для отслеживания системной темы
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Эффект для применения класса и сохранения в localStorage
    useEffect(() => {
        const root = document.documentElement;
        const newTheme = theme === 'system' ? resolvedTheme : theme;

        // Удаляем старый класс и добавляем новый
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);

        saveTheme(theme);
    }, [theme, resolvedTheme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            return prev === 'light' ? 'dark' : 'light';
        });
    };

    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    return (
        <ThemeChange.Provider value={{ theme: currentTheme, toggleTheme, rawTheme: theme }}>
            {children}
        </ThemeChange.Provider>
    );
};