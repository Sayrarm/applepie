import styles from "../pages/Home.module.css";
import DailyResetTimer from "./DailyResetTimer.jsx";
import ModalWindow from "./ModalWindow.jsx";
import MonthImage from "./MonthImage.jsx";
import {useRef} from "react";
import {useRecurringTimer} from "../hooks/resetTimer.js";


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
                title={'Wishing Well Schedule'}
                tag={
                    <>
                        <img
                            className={styles.img}
                            src={'src/assets/main-page/modal-window/shop-schedule.png'}
                            alt={'Battle page'}/>
                    </>
                }/>
        </>

    )
}

export default WishWellBlock
