import styles from "./Home.module.css";
import {
    BannerForHome,
    WishWellBlock,
    DailyWeeklyBlock,
    ScheduleBlock,
    HunterContestBlock,
    EventsBlock,
    BattlePassBlock,
    FarmGoalTracker,
} from "@components";
import {bannersDataFull, eventsData, battlePassData} from "@data";
import {useTranslation} from "react-i18next";

function Home() {
    // Баннеры с рераном (rerun: true) и активные
    const rerunBanners = bannersDataFull.filter(
        (banner) => banner.active === true && banner.rerun === true,
    );

    // Новые баннеры (rerun: false) и активные
    const newBanners = bannersDataFull.filter(
        (banner) => banner.active === true && banner.rerun === false,
    );

    // Активные эвенты
    const newEvents = eventsData.filter((event) => event.active === true);

    // Активный баттлпас
    const activeBattlePass = battlePassData.filter((bp) => bp.active === true);

    const {t} = useTranslation();

    return (
        <section className={styles.containerMain}>
            <div className={styles.containerEvents}>
                <h2 className={styles.h2}>{t('main.titleBanners')}</h2>

                {newBanners.length === 0 && rerunBanners.length === 0 && (
                    <div className={styles.h3}>{t('main.noBannersText')}</div>
                )}

                {newBanners.length > 0 && (
                    <section className={styles.section}>
                        {/* <h3 className={styles.h3}></h3>*/}
                        <div className={styles.bannersGrid}>
                            {newBanners.map((banner) => (
                                <BannerForHome key={banner.id} banner={banner}/>
                            ))}
                        </div>
                    </section>
                )}

                {rerunBanners.length > 0 && (
                    <section className={styles.section}>
                        {/* <h3 className={styles.h3}></h3>*/}
                        <div className={styles.bannersGrid}>
                            {rerunBanners.map((banner) => (
                                <BannerForHome key={banner.id} banner={banner}/>
                            ))}
                        </div>
                    </section>
                )}

                <h2 className={styles.h2}>{t('main.titleEvents')}</h2>

                <EventsBlock events={newEvents}/>

                <h2 className={styles.h2}>{t('main.titleBP')}</h2>


                {activeBattlePass.map((bp) => (
                    <BannerForHome key={bp.id} banner={bp}/>
                ))}


                <h2 className={styles.h2}>{t('main.titleShop')}</h2>

                <WishWellBlock/>
            </div>

            <div className={styles.containerSchedule}>
                <h2 className={styles.h2}>{t('main.titleGoal')}</h2>

                <FarmGoalTracker/>

                <h2 className={styles.h2}>{t('main.titleSchedule')}</h2>

                <ScheduleBlock/>

                <h2 className={styles.h2}>{t('main.titleDaily')}</h2>

                <DailyWeeklyBlock/>

                <HunterContestBlock/>
            </div>
        </section>
    );
}

export default Home;
