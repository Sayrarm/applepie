import FlexibleTimer from "../components/FlexibleTimer.jsx";
import styles from './Home.module.css'
import {useRecurringTimer} from "../hooks/resetTimer.js";
import DailyResetTimer from "../components/DailyResetTimer.jsx";
import MonthImage from "../components/MonthImage.jsx";
import WeeklyProtocore from "../components/WeeklyProtocore.jsx";
import WeeklyTrial from "../components/WeeklyTrial.jsx";
import ModalWindow from "../components/ModalWindow.jsx";
import {useRef} from "react";

function Home() {

    const timeLeftDay = useRecurringTimer('day');
    const timeLeftWeek = useRecurringTimer('week');
    const timeLeftMonth = useRecurringTimer('month');

    const dailyModalRef = useRef();
    const missionModalRef = useRef();
    const wishWellModalRef = useRef();
    const scheduleModalRef = useRef();


    const showDailyModal = () => {
        dailyModalRef.current.showModal();
    };

    const showMissionModal = () => {
        missionModalRef.current.showModal();
    };

    const showWishWellModal = () => {
        wishWellModalRef.current.showModal();
    };

    const showScheduleModal = () => {
        scheduleModalRef.current.showModal();
    };

    return (
        <section className={styles.containerMain}>
            <div className={styles.containerEvents}>

                <h2 className={styles.h2}>Banners</h2>

                <div className={styles.containerTitleTimer}>
                    <FlexibleTimer
                        startDateTime="2026-05-22T05:00:00+02:00"
                        endDateTime="2026-05-31T04:59:00+02:00"
                    />
                    <img className={styles.imgBanner} src="src/assets/main-page/new-banner.png"
                         alt="new-banner"/>
                </div>


                <h2 className={styles.h2}>Events</h2>

                <div className={styles.containerTitleTimer}>
                    <FlexibleTimer
                        startDateTime="2026-05-10T05:00:00+02:00"
                        endDateTime="2026-05-28T04:59:00+02:00"
                    />
                    <img className={styles.imgBanner} src="src/assets/main-page/event-1.png" alt="event"/>
                </div>


                <h2 className={styles.h2}>Battle Pass</h2>

                <div className={styles.containerTitleTimer}>
                    <FlexibleTimer
                        startDateTime="2026-04-30T05:00:00+02:00"
                        endDateTime="2026-06-27T04:59:00+02:00"
                    />
                    <img className={styles.imgBanner} src="src/assets/main-page/new-promise.png" alt="promise"/>
                </div>


            </div>


            <div className={styles.containerSchedule}>

                <h2 className={styles.h2}>Reset</h2>

                <button onClick={showDailyModal} className={styles.containerActivityButton}>
                    <div className={styles.containerResetActivity}>
                        <h3>Daily Mission</h3>
                        <DailyResetTimer timeLeft={timeLeftDay}/>
                    </div>

                    <div className={styles.containerResetActivity}>
                        <h3>Weekly Mission</h3>
                        <DailyResetTimer timeLeft={timeLeftWeek}/>
                    </div>
                </button>

                <ModalWindow
                    ref={dailyModalRef}
                    title={'Daily and Weekly Awards'}
                    tag={
                        <>
                            <div>Daily Awards</div>
                            <img className={styles.img}
                                 src={'src/assets/main-page/modal-window/daily-awards.png'}
                                 alt={'daily awards'}/>
                            <div>Weekly Awards</div>
                            <img className={styles.img}
                                 src={'src/assets/main-page/modal-window/weekly-awards.png'}
                                 alt={'weekly awards'}/>
                        </>
                    }/>

                <button onClick={showMissionModal} className={styles.containerActivityButton}>
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
                </button>

                <ModalWindow
                    ref={missionModalRef}
                    title={'Hunter Contest Buffs'}
                    tag={
                        <>
                            <div>
                                <h3>Team A: Oath Amplification</h3>
                                <p>After using the Ardent Oath, DMG dealt by you and Companion increases by 100%
                                    for 10s.</p>
                            </div>
                            <br/>
                            <div>
                                <h3>Team B: Press On Stacks</h3>
                                <p>After an Active Skill is used, Support Skill damage increases by 35% for 4s.
                                    This effect can stack up to 3 times.</p>
                            </div>
                            <br/>
                            <div>
                                <h3>Team C: Empowerment</h3>
                                <p>Increases ATK of all allied units.</p>
                            </div>
                        </>
                    }/>

                <button onClick={showWishWellModal} className={styles.containerActivityButton}>
                    <div className={styles.containerAwards}>
                        <h3>Monthly (Wishing Well Shop)</h3>
                        <MonthImage/>
                    </div>

                    <DailyResetTimer timeLeft={timeLeftMonth}/>
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


                <h2 className={styles.h2}>Schedule</h2>

                <button onClick={showScheduleModal} className={styles.scheduleContainerGeneralButton}>
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
                </button>

                <ModalWindow
                    ref={scheduleModalRef}
                    title={'Schedule of Protocores and Trials'}
                    tag={
                        <>
                            <img
                                className={styles.img}
                                src={'src/assets/main-page/modal-window/protocore-schedule.png'}
                                alt={'protocore schedule'}/>
                            <img
                                className={styles.img}
                                src={'src/assets/main-page/modal-window/trial-schedule.png'}
                                alt={'trial schedule'}/>
                        </>
                    }/>
            </div>

        </section>
    )
}

export default Home