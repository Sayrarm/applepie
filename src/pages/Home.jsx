import styles from './Home.module.css'
import bannersData from "../data/banners-data-full.json";
import BannerForHome from "../components/BannerForHome.jsx";
import WishWellBlock from "../components/WishWellBlock.jsx";
import DailyWeeklyBlock from "../components/DailyWeeklyBlock.jsx";
import ScheduleBlock from "../components/ScheduleBlock.jsx";
import HunterContestBlock from "../components/HunterContestBlock.jsx";
import EventsBlock from "../components/EventsBlock.jsx";

function Home() {

    return (
        <section className={styles.containerMain}>
            <div className={styles.containerEvents}>

                <h2 className={styles.h2}>Banners</h2>

                <BannerForHome banner={bannersData.find(b => b.id === 76)}/>

                <BannerForHome banner={bannersData.find(b => b.id === 77)}/>

                <BannerForHome banner={bannersData.find(b => b.id === 78)}/>

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