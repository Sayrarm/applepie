import styles from "../../../pages/main/Home.module.css";
import DailyResetTimer from "../../common/DailyResetTimer.jsx";
import ModalWindow from "../../ui/ModalWindow.jsx";
import MonthImage from "./MonthImage.jsx";
import {useRef} from "react";
import {useRecurringTimer} from "../../common/resetTimer.js";
import {getImageUrl} from "../../../hooks/imageUtils.js";


function WishWellBlock() {
    const timeLeftMonth = useRecurringTimer('month');
    const wishWellModalRef = useRef();

    const showWishWellModal = () => {
        wishWellModalRef.current.showModal();
    };

    return (
        <>
            <button onClick={showWishWellModal}
                    className={styles.containerShopCardsButton}>
                <DailyResetTimer timeLeft={timeLeftMonth}/>
                <MonthImage/>
            </button>

            <ModalWindow
                ref={wishWellModalRef}
                title={'Wishing Well ScheduleBlock'}
                tag={
                    <>
                        <img
                            className={styles.img}
                            src={getImageUrl('../assets/main-page/modal-window/shop-schedule.png')}
                            alt={'Battle page'}/>
                    </>
                }/>
        </>

    )
}

export default WishWellBlock
