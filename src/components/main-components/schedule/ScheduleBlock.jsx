import { useRef } from "react";
import styles from "@pages/main/Home.module.css";
import { ModalWindow, DailyResetTimer, useRecurringTimer } from "@components";
import { getImageUrl } from "@hooks";
import WeeklyProtocore from "./WeeklyProtocore.jsx";
import WeeklyTrial from "./WeeklyTrial.jsx";

function ScheduleBlock() {
  const timeLeftDay = useRecurringTimer("day");
  const scheduleModalRef = useRef();

  const showScheduleModal = () => {
    scheduleModalRef.current.showModal();
  };

  return (
    <>
      <button
        onClick={showScheduleModal}
        className={styles.scheduleContainerGeneralButton}
      >
        <div className={styles.scheduleContainer}>
          <div className={styles.schedule}>
            <h3>Protocores</h3>
            <WeeklyProtocore />
          </div>

          <div className={styles.schedule}>
            <h3>Deepspace Trial</h3>
            <WeeklyTrial />
          </div>
        </div>
        <DailyResetTimer timeLeft={timeLeftDay} />
      </button>

      <ModalWindow
        ref={scheduleModalRef}
        title={"ScheduleBlock of MyProtocores and Trials"}
        tag={
          <>
            <img
              className={styles.img}
              src={getImageUrl(
                "../assets/main-page/modal-window/protocore-schedule.png",
              )}
              alt={"protocore schedule"}
            />
            <img
              className={styles.img}
              src={getImageUrl(
                "../assets/main-page/modal-window/trial-schedule.png",
              )}
              alt={"trial schedule"}
            />
          </>
        }
      />
    </>
  );
}

export default ScheduleBlock;
