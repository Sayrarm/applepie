import FlexibleTimer from "../components/FlexibleTimer.jsx";
import styles from './Home.module.css'
import {useRecurringTimer} from "../hooks/resetTimer.js";
import DailyResetTimer from "../components/DailyResetTimer.jsx";
import MonthImage from "../components/MonthImage.jsx";
import WeeklyProtocore from "../components/WeeklyProtocore.jsx";
import WeeklyTrial from "../components/WeeklyTrial.jsx";

function Home() {

    const timeLeftDay = useRecurringTimer('day');
    const timeLeftWeek = useRecurringTimer('week');
    const timeLeftMonth = useRecurringTimer('month');

    return (
        <div className={styles.containerMain}>
            <div className={styles.containerEvents}>
                <h2 className={styles.h2}>Banners</h2>
                <div>
                    {/*
                    <div className={styles.containerBanner}>
                        <img className={styles.img} src="src/assets/main-page/new-banner.png" alt="new-banner"/>
                        <div className={styles.containerTitleTimer}>
                            <h3>Lingering Lust</h3>
                            <FlexibleTimer
                                startDateTime="2026-04-30T05:00:00+02:00"
                                endDateTime="2026-05-15T04:59:00+02:00"
                            />
                        </div>
                    </div>
                    */}

                    {/*
                    <div className={styles.containerBanner}>
                        <img className={styles.img} src="src/assets/main-page/rerun-banner.png" alt="rerun-banner"/>
                        <div className={styles.containerTitleTimer}>
                            <h3>Double Kiss</h3>
                            <FlexibleTimer
                                startDateTime="2026-05-05T05:00:00+02:00"
                                endDateTime="2026-05-15T04:59:00+02:00"
                            />
                        </div>
                    </div
                    */}

                    <div className={styles.containerBanner}>
                        <img className={styles.img} src="src/assets/main-page/rerun-banner-2.png" alt="rerun-banner-2"/>
                        <div className={styles.containerTitleTimer}>
                            <h3>Fallen Crown</h3>
                            <FlexibleTimer
                                startDateTime="2026-05-15T05:00:00+02:00"
                                endDateTime="2026-05-22T04:59:00+02:00"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className={styles.h2}>Events</h2>
                    <div>
                        <div className={styles.containerBanner}>
                            <img className={styles.img} src="src/assets/main-page/event-1.png" alt="event"/>
                            <div className={styles.containerTitleTimer}>
                                <h3>10 Days With You</h3>
                                <FlexibleTimer
                                    startDateTime="2026-05-10T05:00:00+02:00"
                                    endDateTime="2026-05-28T04:59:00+02:00"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className={styles.h2}>Battle Pass</h2>
                    <div className={styles.containerBanner}>
                        <img className={styles.img} src="src/assets/main-page/new-promise.png" alt="event"/>
                        <div className={styles.containerTitleTimer}>
                            <h3>Promise</h3>
                            <FlexibleTimer
                                startDateTime="2026-04-30T05:00:00+02:00"
                                endDateTime="2026-06-27T04:59:00+02:00"
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.containerSchedule}>

                <div>
                    <h2 className={styles.h2}>Reset</h2>

                    <div>

                        <button className={styles.containerActivityButton}>
                            <div className={styles.containerResetActivity}>
                                <h3>Daily Mission</h3>
                                <DailyResetTimer timeLeft={timeLeftDay}/>
                            </div>

                            <div className={styles.containerResetActivity}>
                                <h3>Weekly Mission</h3>
                                <DailyResetTimer timeLeft={timeLeftWeek}/>
                            </div>
                        </button>

                        <div className={styles.containerActivity}>
                            <div className={styles.containerResetActivity}>
                                <h3>Hunter Contest</h3>
                                <FlexibleTimer
                                    startDateTime='2026-05-04T05:00:00+02:00'
                                    endDateTime='2026-05-17T23:59:59+02:00'
                                    autoRefresh={true}
                                />
                            </div>
                            <div className={styles.containerResetActivity}>
                                <h3>UNICORNS Operation</h3>
                                <FlexibleTimer
                                    startDateTime='2026-05-11T05:00:00+02:00'
                                    endDateTime='2026-05-25T04:59:59+02:00'
                                    autoRefresh={true}
                                />
                            </div>
                            <div className={styles.containerResetActivity}>
                                <h3>Abyssal Chaos</h3>
                                <FlexibleTimer
                                    startDateTime='2026-05-11T05:00:00+02:00'
                                    endDateTime='2026-05-25T04:59:59+02:00'
                                    autoRefresh={true}
                                />
                            </div>
                        </div>

                        <div className={styles.containerActivity}>
                            <div className={styles.containerAwards}>
                                <h3>Monthly (Wishing Well Shop)</h3>
                                <MonthImage/>
                            </div>

                            <DailyResetTimer timeLeft={timeLeftMonth}/>
                        </div>

                    </div>

                </div>

                <div>
                    <h2 className={styles.h2}>Schedule</h2>

                    <div className={styles.scheduleContainerGeneral}>
                        <div className={styles.scheduleContainer}>

                            <div className={styles.schedule}>
                                <h3>Protocores</h3>
                                <WeeklyProtocore/>
                            </div>

                            <div className={styles.schedule}>
                                <h3>Deepspace Trial</h3>
                                <WeeklyTrial/>
                            </div>


                        </div>
                        <DailyResetTimer timeLeft={timeLeftDay}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home