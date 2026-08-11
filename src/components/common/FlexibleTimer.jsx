import React, { useState, useEffect } from 'react';
import styles from './FlexibleTimer.module.css';
import { useTimezone } from '@components';

function FlexibleTimer({
                           startDateTime = '2026-01-01T00:00:00',  // Формат: YYYY-MM-DDTHH:MM:SS
                           endDateTime = '2026-12-31T23:59:59',
                           autoRefresh = false,
                       }) {
    const { timezone } = useTimezone();

    // Добавляем часовой пояс к датам
    const fullStart = startDateTime + timezone;
    const fullEnd = endDateTime + timezone;

    const [timeLeft, setTimeLeft] = useState({});
    const [status, setStatus] = useState('waiting'); // waiting, active, finished
    const [currentStart, setCurrentStart] = useState(fullStart);
    const [currentEnd, setCurrentEnd] = useState(fullEnd);

    // Обновляем даты при смене часового пояса
    useEffect(() => {
        setCurrentStart(startDateTime + timezone);
        setCurrentEnd(endDateTime + timezone);
    }, [timezone, startDateTime, endDateTime]);

    const calculateTimeLeft = (difference) => {
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (86400000)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (3600000)) / (1000 * 60)),
            seconds: Math.floor((difference % (60000)) / 1000)
        };
    };

    const shiftDates = () => {
        try {
            const start = new Date(currentStart);
            const end = new Date(currentEnd);

            // Проверка на валидность дат
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                console.warn('Invalid dates in shiftDates:', { currentStart, currentEnd });
                return;
            }

            // Сдвигаем на 14 дней
            const newStart = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);
            const newEnd = new Date(end.getTime() + 14 * 24 * 60 * 60 * 1000);

            // Проверка новых дат
            if (isNaN(newStart.getTime()) || isNaN(newEnd.getTime())) {
                console.warn('Invalid new dates in shiftDates');
                return;
            }

            setCurrentStart(newStart.toISOString());
            setCurrentEnd(newEnd.toISOString());
            setStatus('waiting'); // Сбрасываем статус
        } catch (error) {
            console.error('Error in shiftDates:', error);
        }
    };

    useEffect(() => {
        const startDate = new Date(currentStart);
        const endDate = new Date(currentEnd);

        // Проверка на валидность дат
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.warn('Invalid date in FlexibleTimer:', { currentStart, currentEnd });
            return;
        }

        const updateTimer = () => {
            const now = new Date();

            if (now < startDate) {
                setStatus(prev => prev !== 'waiting' ? 'waiting' : prev);
                const diff = startDate - now;
                setTimeLeft(calculateTimeLeft(diff));
            } else if (now >= startDate && now <= endDate) {
                setStatus(prev => prev !== 'active' ? 'active' : prev);
                const diff = endDate - now;
                setTimeLeft(calculateTimeLeft(diff));
            } else {
                if (autoRefresh) {
                    // Если таймер закончился и autoRefresh = true
                    shiftDates();
                } else {
                    setStatus(prev => prev !== 'finished' ? 'finished' : prev);
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            }
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(interval);
    }, [currentStart, currentEnd, autoRefresh]);

    const formatNumber = (num) => num.toString().padStart(2, '0');

    const getStatusConfig = () => {
        switch (status) {
            case 'waiting':
                return { text: `Upcoming:`, emoji: '⏰' };
            case 'active':
                return { text: `Time left:`, emoji: '⚡' };
            case 'finished':
                return { text: `Completed`, emoji: '🏁' };
            default:
                return { text: '', emoji: '' };
        }
    };

    const config = getStatusConfig();

    // Проверка на ошибку в датах
    if (isNaN(new Date(currentStart).getTime()) || isNaN(new Date(currentEnd).getTime())) {
        return <div className={styles.error}>permanently</div>;
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.h3}>{config.emoji} {config.text} {config.emoji}</h3>

            {status !== 'finished' ? (
                <div className={styles.timer}>
                    <div className={styles.time}>
                        <div>{formatNumber(timeLeft.days || 0)}</div>
                        <div className={styles.tips}>Days</div>
                    </div>
                    <div className={styles.time}>:</div>
                    <div className={styles.time}>
                        <div>{formatNumber(timeLeft.hours || 0)}</div>
                        <div className={styles.tips}>Hours</div>
                    </div>
                    <div className={styles.time}>:</div>
                    <div className={styles.time}>
                        <div>{formatNumber(timeLeft.minutes || 0)}</div>
                        <div className={styles.tips}>Minutes</div>
                    </div>
                    <div className={styles.time}>:</div>
                    <div className={styles.time}>
                        <div>{formatNumber(timeLeft.seconds || 0)}</div>
                        <div className={styles.tips}>Seconds</div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default FlexibleTimer;