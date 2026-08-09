import styles from './Home.module.css'
import {bannersDataFull} from "../../data/banners-data-full.js";
import BannerForHome from "@components/main-components/BannerForHome.jsx";
import WishWellBlock from "@components/main-components/wishwellshop/WishWellBlock.jsx";
import DailyWeeklyBlock from "@components/main-components/DailyWeeklyBlock.jsx";
import ScheduleBlock from "@components/main-components/schedule/ScheduleBlock.jsx";
import HunterContestBlock from "@components/main-components/hunter-contest/HunterContestBlock.jsx";
import EventsBlock from "@components/main-components/EventsBlock.jsx";
import {eventsData} from "../../data/main-page-data/events-data.js";
import {battlePassData} from "../../data/main-page-data/battle-pass-data.js";
import BattlePassBlock from "@components/main-components/BattlePassBlock.jsx";
import FarmGoalTracker from "@components/farm-goal-tracker/FarmGoalTracker.jsx";

function Home() {

    // Баннеры с рераном (rerun: true) и активные
    const rerunBanners = bannersDataFull.filter(
        banner => banner.active === true && banner.rerun === true
    );

    // Новые баннеры (rerun: false) и активные
    const newBanners = bannersDataFull.filter(
        banner => banner.active === true && banner.rerun === false
    );

    // Активные эвенты
    const newEvents = eventsData.filter(event => event.active === true);

    // Активный баттлпас
    const activeBattlePass = battlePassData.filter(bp => bp.active === true);

    return (
        <section className={styles.containerMain}>
            <div className={styles.containerEvents}>

                <h2 className={styles.h2}>Banners</h2>

                {(newBanners.length === 0 && rerunBanners.length === 0) && (
                    <div className={styles.h3}>No banners available</div>
                )}

                {newBanners.length > 0 && (
                    <section className={styles.section}>
                        {/* <h3 className={styles.h3}></h3>*/}
                        <div className={styles.bannersGrid}>
                            {newBanners.map(banner => (
                                <BannerForHome key={banner.id} banner={banner} />
                            ))}
                        </div>
                    </section>
                )}

                {rerunBanners.length > 0 && (
                    <section className={styles.section}>
                        {/* <h3 className={styles.h3}></h3>*/}
                        <div className={styles.bannersGrid}>
                            {rerunBanners.map(banner => (
                                <BannerForHome key={banner.id} banner={banner} />
                            ))}
                        </div>
                    </section>
                )}

                <h2 className={styles.h2}>Events</h2>

                <EventsBlock events={newEvents} />

                <h2 className={styles.h2}>Battle Pass</h2>

                <BattlePassBlock battlePass={activeBattlePass} />

                <h2 className={styles.h2}>Wishing Well Shop</h2>

                <WishWellBlock/>

            </div>


            <div className={styles.containerSchedule}>

                <h2 className={styles.h2}>Farm Goal Tracker</h2>

                <FarmGoalTracker />

                <h2 className={styles.h2}>Schedule</h2>

                <ScheduleBlock/>

                <h2 className={styles.h2}>Reset</h2>

                <DailyWeeklyBlock/>

                <HunterContestBlock/>

            </div>

        </section>
    )
}

export default Home