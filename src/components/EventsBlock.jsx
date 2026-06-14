import styles from "../pages/Home.module.css";
import FlexibleTimer from "./FlexibleTimer.jsx";
import {getImageUrl} from "./imageUtils.js";


function EventsBlock( {events} ) {

    if (!events || events.length === 0) {
        return <div className={styles.noEvents}>No events available</div>;
    }

    return (
        <>
                    {events.map(event => (
                        <div
                            key={event.id}
                            className={styles.containerTitleTimer}
                        >
                            <div className={styles.bannerTitle}>{event.name}</div>
                            <FlexibleTimer
                                startDateTime={event.startDate}
                                endDateTime={event.endDate}
                            />
                            <img
                                className={styles.imgBanner}
                                src={getImageUrl(event.image)}
                                alt={event.name}
                            />
                        </div>
                    ))}

        </>
    )
}

export default EventsBlock