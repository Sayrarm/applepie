import { createContext, useContext, useState, useEffect } from 'react';
import { getTimezone, saveTimezone } from '@localstorage';

const TimezoneContext = createContext();

export const TimezoneProvider = ({ children }) => {
    const [timezone, setTimezone] = useState(getTimezone);

    useEffect(() => {
        saveTimezone(timezone);
    }, [timezone]);

    return (
        <TimezoneContext.Provider value={{ timezone, setTimezone }}>
            {children}
        </TimezoneContext.Provider>
    );
};

export const useTimezone = () => {
    const context = useContext(TimezoneContext);
    if (!context) {
        throw new Error('useTimezone must be used within a TimezoneProvider');
    }
    return context;
};