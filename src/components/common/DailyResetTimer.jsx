import styles from "./DailyResetTimer.module.css";
import React from "react";

function DailyResetTimer({ timeLeft, status = "active" }) {
  const formatNumber = (num) => num.toString().padStart(2, "0");

  if (!timeLeft) {
    return <div className={styles.container}>Loading...</div>;
  }

  const getStatusConfig = () => {
    switch (status) {
      case "waiting":
        return { text: `Upcoming:`, emoji: "⏰" };
      case "active":
        return { text: `Time left:`, emoji: "⚡" };
      case "finished":
        return { text: `Completed`, emoji: "🏁" };
      default:
        return { text: `Time left:`, emoji: "⚡" };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>
        {config.emoji} {config.text} {config.emoji}
      </h3>

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
    </div>
  );
}

export default DailyResetTimer;
