import { useState, useEffect } from 'react';
import { CardContext } from './CardContext';

export const CardProvider = ({ children }) => {
    // Загружаем состояние из localStorage
    const getInitialImageSize = () => {
        const saved = localStorage.getItem('card_image_size');
        return saved === 'small'; // true = small, false = big
    };

    const [isImageSmall, setIsImageSmall] = useState(getInitialImageSize);

    // Сохраняем в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('card_image_size', isImageSmall ? 'small' : 'big');
    }, [isImageSmall]);

    const toggleImageSize = () => {
        setIsImageSmall(prev => !prev);
    };

    // Функция для сброса размера карточек
    const resetImageSize = () => {
        setIsImageSmall(false); // сбрасываем на большой размер
        localStorage.setItem('card_image_size', 'big');
    };

    return (
        <CardContext.Provider value={{ isImageSmall, toggleImageSize, resetImageSize }}>
            {children}
        </CardContext.Provider>
    );
};