import styles from "./DailyResetTimer.module.css";
import React from "react";
import { useTranslation } from "react-i18next";

function DailyResetTimer({ timeLeft, status = "active" }) {
  const formatNumber = (num) => num.toString().padStart(2, "0");
  const { t } = useTranslation();

  if (!timeLeft) {
    return <div className={styles.container}>Loading...</div>;
  }

  const getStatusConfig = () => {
    switch (status) {
      case "waiting":
        return { text: t('timer.waiting'), emoji: "⏰" };
      case "active":
        return { text: t('timer.active'), emoji: "⚡" };
      case "finished":
        return { text: t('timer.finished'), emoji: "🏁" };
      default:
        return { text: t('timer.active'), emoji: "⚡" };
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
          <div className={styles.tips}>{t('timer.days')}</div>
        </div>
        <div className={styles.time}>:</div>
        <div className={styles.time}>
          <div>{formatNumber(timeLeft.hours || 0)}</div>
          <div className={styles.tips}>{t('timer.hours')}</div>
        </div>
        <div className={styles.time}>:</div>
        <div className={styles.time}>
          <div>{formatNumber(timeLeft.minutes || 0)}</div>
          <div className={styles.tips}>{t('timer.minutes')}</div>
        </div>
        <div className={styles.time}>:</div>
        <div className={styles.time}>
          <div>{formatNumber(timeLeft.seconds || 0)}</div>
          <div className={styles.tips}>{t('timer.seconds')}</div>
        </div>
      </div>
    </div>
  );
}

export default DailyResetTimer;
