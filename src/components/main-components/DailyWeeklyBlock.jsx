import styles from "../../pages/main/Home.module.css";
import ModalWindow from "../ui/ModalWindow.jsx";
import DailyResetTimer from "../common/DailyResetTimer.jsx";
import {useRecurringTimer} from "../common/resetTimer.js";
import {useRef} from "react";
import {getImageUrl} from "../../hooks/imageUtils.js";


function DailyWeeklyBlock() {

    const timeLeftWeek = useRecurringTimer('week');
    const timeLeftDay = useRecurringTimer('day');
    const dailyModalRef = useRef();

    const showDailyModal = () => {
        dailyModalRef.current.showModal();
    };


    return (

        <>
            <button onClick={showDailyModal} className={styles.containerActivityButton}>
                <div className={styles.containerResetActivity}>
                    <h3>Daily Mission</h3>
                    <DailyResetTimer timeLeft={timeLeftDay}/>
                </div>

                <div className={styles.containerResetActivity}>
                    <h3>Weekly Mission</h3>
                    <DailyResetTimer timeLeft={timeLeftWeek}/>
                </div>
            </button>

            <ModalWindow
                ref={dailyModalRef}
                title={'Daily and Weekly Awards'}
                tag={
                    <>
                        <div>Daily Awards</div>
                        <img className={styles.img}
                             src={getImageUrl('../assets/main-page/modal-window/daily-awards.png')}
                             alt={'daily awards'}/>
                        <div>Weekly Awards</div>
                        <img className={styles.img}
                             src={getImageUrl('../assets/main-page/modal-window/weekly-awards.png')}
                             alt={'weekly awards'}/>
                    </>
                }
            />
        </>
    )

}

export default DailyWeeklyBlock