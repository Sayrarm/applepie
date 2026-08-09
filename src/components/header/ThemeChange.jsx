import React, {createContext, useContext, useEffect, useState} from 'react';

const ThemeChange = createContext();

export const useTheme = () => {
    const context = useContext(ThemeChange);
    if (!context) throw new Error('useTheme should be used inside ThemeProvider');
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Состояние: 'light', 'dark' или 'system'
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        // Приоритет: сохраненные настройки > системные > 'light'
        return saved ? saved : 'system';
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

        handleChange(); // Установить при монтировании
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Эффект для применения класса и сохранения в localStorage
    useEffect(() => {
        const root = document.documentElement; // Работаем с <html>
        const newTheme = theme === 'system' ? resolvedTheme : theme;

        // Удаляем старый класс и добавляем новый
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);

        // Сохраняем выбор пользователя, НО не сохраняем 'system' как строку, мы сохраняем сам выбор
        localStorage.setItem('theme', theme);
    }, [theme, resolvedTheme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            return prev === 'light' ? 'dark' : 'light';
        });
    };

    // Полезная функция, чтобы узнать, какая тема сейчас активна для отображения иконки
    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    return (
        <ThemeChange.Provider value={{ theme: currentTheme, toggleTheme, rawTheme: theme }}>
            {children}
        </ThemeChange.Provider>
    );
};