import { createContext, useContext, useState, useEffect } from 'react';

const TimezoneContext = createContext();

export const TimezoneProvider = ({ children }) => {
    const getInitialTimezone = () => {
        const saved = localStorage.getItem('app_timezone');
        return saved || '+02:00';
    };

    const [timezone, setTimezone] = useState(getInitialTimezone);

    useEffect(() => {
        localStorage.setItem('app_timezone', timezone);
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