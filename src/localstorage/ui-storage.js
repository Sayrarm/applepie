import { KEYS } from '@localstorage';

// ===== РАЗМЕР КАРТОЧЕК =====
export const getCardSize = () => {
    try {
        const saved = localStorage.getItem(KEYS.CARD_SIZE);
        return saved || 'big';
    } catch {
        return 'big';
    }
};

export const saveCardSize = (size) => {
    try {
        localStorage.setItem(KEYS.CARD_SIZE, size);
        return true;
    } catch (error) {
        console.error('Ошибка сохранения размера карточек:', error);
        return false;
    }
};
