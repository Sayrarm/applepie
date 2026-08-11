import {useRef} from "react";
import styles from "@pages/main/Home.module.css";
import {
    DailyResetTimer,
    ModalWindow,
    useRecurringTimer
} from '@components'
import {getImageUrl} from "@hooks";
import MonthImage from "./MonthImage.jsx";

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
