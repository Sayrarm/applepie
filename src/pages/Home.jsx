import FlexibleTimer from "../components/FlexibleTimer.jsx";
import styles from './Home.module.css'
import bannersData from "../data/banners-data-full.json";
import BannerForHome from "../components/BannerForHome.jsx";
import WishWellBlock from "../components/WishWellBlock.jsx";
import DailyWeeklyBlock from "../components/DailyWeeklyBlock.jsx";
import Schedule from "../components/Schedule.jsx";
import HunterContest from "../components/HunterContest.jsx";

function Home() {

    return (
        <section className={styles.containerMain}>
            <div className={styles.containerEvents}>

                <h2 className={styles.h2}>Banners</h2>

                <BannerForHome banner={bannersData.find(b => b.id === 76)}/>

                <BannerForHome banner={bannersData.find(b => b.id === 77)}/>

                <BannerForHome banner={bannersData.find(b => b.id === 78)}/>

                <h2 className={styles.h2}>Events</h2>

                <div className={styles.containerTitleTimer}>
                    <FlexibleTimer
                        startDateTime="2026-05-31T05:00:00+02:00"
                        endDateTime="2026-06-18T04:59:00+02:00"
                    />
                    <img className={styles.imgBanner} src="src/assets/main-page/event-1.png" alt="event"/>
                </div>

                <div className={styles.containerTitleTimer}>
                    <FlexibleTimer
                        startDateTime="2026-05-25T05:00:00+02:00"
                        endDateTime="2026-06-14T04:59:00+02:00"
                    />
                    <img className={styles.imgBanner} src="src/assets/main-page/event-2.png" alt="event"/>
                </div>

                <div className={styles.containerTitleTimer}>
                    <FlexibleTimer
                        startDateTime="2026-05-25T05:00:00+02:00"
                        endDateTime="2026-06-01T04:59:00+02:00"
                    />
                    <img className={styles.imgBanner} src="src/assets/main-page/event-3.png" alt="event"/>
                </div>

                <h2 className={styles.h2}>Battle Pass</h2>

                <div className={styles.containerTitleTimer}>
                    <FlexibleTimer
                        startDateTime="2026-04-30T05:00:00+02:00"
                        endDateTime="2026-06-27T04:59:00+02:00"
                    />
                    <img className={styles.imgBanner} src="src/assets/main-page/new-promise.png" alt="promise"/>
                </div>

                <h2 className={styles.h2}>Wishing Well Shop</h2>

                <WishWellBlock/>

            </div>


            <div className={styles.containerSchedule}>

                <h2 className={styles.h2}>Reset</h2>

                <DailyWeeklyBlock/>

                <HunterContest/>

                <h2 className={styles.h2}>Schedule</h2>

                <Schedule/>

            </div>

        </section>
    )
}

export default Home