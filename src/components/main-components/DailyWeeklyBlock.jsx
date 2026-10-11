import { useRef } from "react";
import styles from "@pages/main/Home.module.css";
import { ModalWindow, DailyResetTimer, useRecurringTimer } from "@components";
import { getImageUrl } from "@hooks";
import { useTranslation } from "react-i18next";

function DailyWeeklyBlock() {
  const timeLeftWeek = useRecurringTimer("week");
  const timeLeftDay = useRecurringTimer("day");
  const dailyModalRef = useRef();
    const { t } = useTranslation();

  const showDailyModal = () => {
    dailyModalRef.current.showModal();
  };

  return (
    <>
      <button
        onClick={showDailyModal}
        className={styles.containerActivityButton}
      >
        <div className={styles.containerResetActivity}>
          <h3>{t('DailyWeeklyBlock.titleDaily')}</h3>
          <DailyResetTimer timeLeft={timeLeftDay} />
        </div>

        <div className={styles.containerResetActivity}>
          <h3>{t('DailyWeeklyBlock.titleWeekly')}</h3>
          <DailyResetTimer timeLeft={timeLeftWeek} />
        </div>
      </button>

      <ModalWindow
        ref={dailyModalRef}
        title={t('DailyWeeklyBlock.titleModal')}
        tag={
          <>
            <div>{t('DailyWeeklyBlock.titleDailyAwards')}</div>
            <img
              className={styles.img}
              src={getImageUrl(
                "../assets/main-page/modal-window/daily-awards.png",
              )}
              alt={"daily awards"}
            />
            <div>{t('DailyWeeklyBlock.titleWeeklyAwards')}</div>
            <img
              className={styles.img}
              src={getImageUrl(
                "../assets/main-page/modal-window/weekly-awards.png",
              )}
              alt={"weekly awards"}
            />
          </>
        }
      />
    </>
  );
}

export default DailyWeeklyBlock;
