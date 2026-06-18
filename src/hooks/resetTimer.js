import { useState, useEffect } from 'react';
import { useTimezone } from '../components/TimezoneContext';

// Вспомогательная функция для получения текущего времени с учётом часового пояса
const getCurrentTimeWithTimezone = (timezoneOffset) => {
    const now = new Date();
    // Получаем UTC время и добавляем смещение
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const offsetHours = parseInt(timezoneOffset);
    return new Date(utcTime + (offsetHours * 60 * 60 * 1000));
};

const getNextTriggerDate = (type, timezoneOffset) => {
    const now = getCurrentTimeWithTimezone(timezoneOffset);
    const target = new Date(now);
    target.setHours(5, 0, 0, 0);

    if (type === 'day') {
        if (now >= target) target.setDate(target.getDate() + 1);
        return target;
    }
    else if (type === 'week') {
        const currentDay = now.getDay();
        let daysUntilMonday;

        if (currentDay === 1) {
            if (now < target) {
                daysUntilMonday = 0;
            } else {
                daysUntilMonday = 7;
            }
        } else if (currentDay === 0) {
            daysUntilMonday = 1;
        } else {
            daysUntilMonday = 8 - currentDay;
        }

        target.setDate(target.getDate() + daysUntilMonday);
        return target;
    }
    else if (type === 'month') {
        target.setDate(1);
        if (now >= target) target.setMonth(target.getMonth() + 1);
        return target;
    }
    return target;
};

const calculateTimeLeft = (type, timezoneOffset) => {
    const nextDate = getNextTriggerDate(type, timezoneOffset);
    const now = getCurrentTimeWithTimezone(timezoneOffset);
    const difference = nextDate - now;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
};

export const useRecurringTimer = (type) => {
    const { timezone } = useTimezone();
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(type, timezone));

    useEffect(() => {
        setTimeLeft(calculateTimeLeft(type, timezone));
    }, [type, timezone]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(type, timezone));
        }, 0);

        return () => clearInterval(timer);
    }, [type, timezone]);

    return timeLeft;
};