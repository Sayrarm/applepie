import styles from "../pages/Home.module.css";
import FlexibleTimer from "./FlexibleTimer.jsx";
import {getImageUrl} from "./imageUtils.js";


function EventsBlock() {

    return (
        <>
            <div className={styles.containerTitleTimer}>
                <FlexibleTimer
                    startDateTime="2026-05-31T05:00:00+02:00"
                    endDateTime="2026-06-18T04:59:00+02:00"
                />
                <img className={styles.imgBanner} src={getImageUrl("../assets/main-page/event-1.png")} alt="event"/>
            </div>

            <div className={styles.containerTitleTimer}>
                <FlexibleTimer
                    startDateTime="2026-05-25T05:00:00+02:00"
                    endDateTime="2026-06-14T04:59:00+02:00"
                />
                <img className={styles.imgBanner} src={getImageUrl("../assets/main-page/event-2.png")}alt="event"/>
            </div>

            <div className={styles.containerTitleTimer}>
                <FlexibleTimer
                    startDateTime="2026-06-08T05:00:00+02:00"
                    endDateTime="2026-06-21T04:59:00+02:00"
                />
                <img className={styles.imgBanner} src={getImageUrl("../assets/main-page/event-3.png")} alt="event"/>
            </div>

            <h2 className={styles.h2}>Battle Pass</h2>

            <div className={styles.containerTitleTimer}>
                <FlexibleTimer
                    startDateTime="2026-04-30T05:00:00+02:00"
                    endDateTime="2026-06-27T04:59:00+02:00"
                />
                <img className={styles.imgBanner} src={getImageUrl("../assets/main-page/new-promise.png")} alt="promise"/>
            </div>
        </>
    )
}

export default EventsBlock