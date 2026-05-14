import { useState, useEffect } from 'react';

// Вспомогательная функция для получения текущего времени в UTC+2
const getCurrentTimeInUTC2 = () => {
    const now = new Date();
    // Получаем UTC время и добавляем 2 часа
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utcTime + (2 * 60 * 60 * 1000));
};

const getNextTriggerDate = (type) => {
    const now = getCurrentTimeInUTC2();
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

const calculateTimeLeft = (type) => {
    const nextDate = getNextTriggerDate(type);
    const now = getCurrentTimeInUTC2();
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
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(type));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(type));
        }, 1000);

        return () => clearInterval(timer);
    }, [type]);

    return timeLeft;
};