import React, {useState, useEffect} from 'react';
import styles from './FlexibleTimer.module.css'

function FlexibleTimer({
                           startDateTime = '2026-01-01T00:00:00',  // Формат: YYYY-MM-DDTHH:MM:SS
                           endDateTime = '2026-12-31T23:59:59',
                       }) {
    const [timeLeft, setTimeLeft] = useState({});
    const [status, setStatus] = useState('waiting'); // waiting, active, finished

    const calculateTimeLeft = (difference) => {
        if (difference <= 0) {
            return {days: 0, hours: 0, minutes: 0, seconds: 0};
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (86400000)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (3600000)) / (1000 * 60)),
            seconds: Math.floor((difference % (60000)) / 1000)
        };
    };

    useEffect(() => {
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);

        const updateTimer = () => {
            const now = new Date();

            if (now < startDate) {
                setStatus(prev => prev !== 'waiting' ? 'waiting' : prev);
                const diff = startDate - now;
                setTimeLeft(calculateTimeLeft(diff));
            } else if (now >= startDate && now <= endDate) {
                setStatus(prev => prev !== 'active' ? 'active' : prev)

                const diff = endDate - now;
                setTimeLeft(calculateTimeLeft(diff));
            } else {
                setStatus(prev => prev !== 'finished' ? 'finished' : prev);
                setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
            }
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(interval);
    }, [startDateTime, endDateTime]);

    const formatNumber = (num) => num.toString().padStart(2, '0');

    const getStatusConfig = () => {
        switch (status) {
            case 'waiting':
                return {text: 'Upcoming (EU server):', emoji: '⏰'};
            case 'active':
                return {text: 'Time left (EU server):', emoji: '⚡'};
            case 'finished':
                return {text: 'Completed (EU server)', emoji: '🏁'};
            default:
                return {text: '', emoji: ''};
        }
    };

    const config = getStatusConfig();

    return (
        <div className={styles.container}>
            <h3>{config.emoji} {config.text} {config.emoji}</h3>

            {status !== 'finished' ? (
                <div className={styles.timer}>
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit}
                             className={styles.time}>
                            <div>
                                {formatNumber(value || 0)}
                            </div>
                            <div>
                                {unit === 'days' ? 'Days' : unit === 'hours' ? 'Hours' : unit === 'minutes' ? 'Minutes' : 'Seconds'}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    Time's up
                </div>
            )}
        </div>
    );
}

export default FlexibleTimer;