import ModalWindow from "./ModalWindow.jsx";
import styles from "../pages/Home.module.css";
import DailyResetTimer from "./DailyResetTimer.jsx";
import WeeklyProtocore from "./WeeklyProtocore.jsx";
import WeeklyTrial from "./WeeklyTrial.jsx";
import {useRecurringTimer} from "../hooks/resetTimer.js";
import {useRef} from "react";

function Schedule() {

    const timeLeftDay = useRecurringTimer('day');
    const scheduleModalRef = useRef();

    const showScheduleModal = () => {
        scheduleModalRef.current.showModal();
    };

    return (
        <>
            <button onClick={showScheduleModal} className={styles.scheduleContainerGeneralButton}>
                <div className={styles.scheduleContainer}>

                    <div className={styles.schedule}>
                        <h3>Protocores</h3>
                        <WeeklyProtocore/>
                    </div>

                    <div className={styles.schedule}>
                        <h3>Deepspace Trial</h3>
                        <WeeklyTrial/>
                    </div>


                </div>
                <DailyResetTimer timeLeft={timeLeftDay}/>
            </button>

            <ModalWindow
                ref={scheduleModalRef}
                title={'Schedule of Protocores and Trials'}
                tag={
                    <>
                        <img
                            className={styles.img}
                            src={'src/assets/main-page/modal-window/protocore-schedule.png'}
                            alt={'protocore schedule'}/>
                        <img
                            className={styles.img}
                            src={'src/assets/main-page/modal-window/trial-schedule.png'}
                            alt={'trial schedule'}/>
                    </>
                }/>
        </>
    )

}

export default Schedule