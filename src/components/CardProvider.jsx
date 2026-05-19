import { useState } from 'react';
import { CardContext } from './CardContext';

export const CardProvider = ({ children }) => {
    const [isImageSmall, setIsImageSmall] = useState(false);

    const toggleImageSize = () => {
        setIsImageSmall(prev => !prev);
    };

    return (
        <CardContext.Provider value={{ isImageSmall, toggleImageSize }}>
            {children}
        </CardContext.Provider>
    );
};