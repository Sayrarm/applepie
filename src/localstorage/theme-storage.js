import { KEYS } from '@localstorage';

export const getTheme = () => {
    try {
        const saved = localStorage.getItem(KEYS.THEME);
        return saved || 'system';
    } catch {
        return 'system';
    }
};

export const saveTheme = (theme) => {
    try {
        localStorage.setItem(KEYS.THEME, theme);
        return true;
    } catch (error) {
        console.error('Ошибка сохранения темы:', error);
        return false;
    }
};