import styles from './Home.module.css'
import bannersData from "../data/banners-data-full.json";
import BannerForHome from "../components/BannerForHome.jsx";
import WishWellBlock from "../components/WishWellBlock.jsx";
import DailyWeeklyBlock from "../components/DailyWeeklyBlock.jsx";
import ScheduleBlock from "../components/ScheduleBlock.jsx";
import HunterContestBlock from "../components/HunterContestBlock.jsx";
import EventsBlock from "../components/EventsBlock.jsx";

function Home() {

    // Баннеры с рераном (rerun: true) и активные
    const rerunBanners = bannersData.filter(
        banner => banner.active === true && banner.rerun === true
    );

    // Новые баннеры (rerun: false) и активные
    const newBanners = bannersData.filter(
        banner => banner.active === true && banner.rerun === false
    );

    return (
        <section className={styles.containerMain}>
            <div className={styles.containerEvents}>

                <h2 className={styles.h2}>Banners</h2>

                {newBanners.length > 0 && (
                    <section className={styles.section}>
                        <h3 className={styles.h3}>New</h3>
                        <div className={styles.bannersGrid}>
                            {newBanners.map(banner => (
                                <BannerForHome key={banner.id} banner={banner} />
                            ))}
                        </div>
                    </section>
                )}

                {rerunBanners.length > 0 && (
                    <section className={styles.section}>
                        <h3 className={styles.h3}>Rerun</h3>
                        <div className={styles.bannersGrid}>
                            {rerunBanners.map(banner => (
                                <BannerForHome key={banner.id} banner={banner} />
                            ))}
                        </div>
                    </section>
                )}

                <h2 className={styles.h2}>Events</h2>

                <EventsBlock />

                <h2 className={styles.h2}>Wishing Well Shop</h2>

                <WishWellBlock/>

            </div>


            <div className={styles.containerSchedule}>

                <h2 className={styles.h2}>Reset</h2>

                <DailyWeeklyBlock/>

                <HunterContestBlock/>

                <h2 className={styles.h2}>Schedule</h2>

                <ScheduleBlock/>

            </div>

        </section>
    )
}

export default Home