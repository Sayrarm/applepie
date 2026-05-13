import styles from "./DailyResetTimer.module.css";
import React from "react";


function DailyResetTimer( {timeLeft} ) {

    const formatNumber = (num) => num.toString().padStart(2, '0');

    if (!timeLeft) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h3>Time left (EU server):</h3>

            <div className={styles.timer}>
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className={styles.time}>
                        <div>
                            {formatNumber(value || 0)}
                        </div>
                        <div>
                            {unit === 'days' ? 'Days' : unit === 'hours' ? 'Hours' : unit === 'minutes' ? 'Minutes' : 'Seconds'}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

}

export default DailyResetTimer;