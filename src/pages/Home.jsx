import FlexibleTimer from "../components/FlexibleTimer.jsx";
import styles from './Home.module.css'

function Home() {


    return (
        <div className={styles.containerMain}>
            <div className={styles.containerEvents}>
                <h2>Banners</h2>
                <div>
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

                    <div className={styles.containerBanner}>
                        <img className={styles.img} src="src/assets/main-page/rerun-banner.png" alt="rerun-banner"/>
                        <div className={styles.containerTitleTimer}>
                            <h3>Double Kiss</h3>
                            <FlexibleTimer
                                startDateTime="2026-05-05T05:00:00+02:00"
                                endDateTime="2026-05-15T04:59:00+02:00"
                            />
                        </div>
                    </div>

                    <div className={styles.containerBanner}>
                        <img className={styles.img} src="src/assets/main-page/rerun-banner-2.jpg" alt="rerun-banner-2"/>
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
                    <h2>Events</h2>
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
                    <h2>Battle Pass</h2>
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


            <div className={styles.containerDaily}>
                <div>
                    <h2>Reset</h2>

                    <div>

                        <div>
                            <h3>Daily</h3>
                            <div>Awards</div>
                            <div>Timer</div>
                        </div>

                        <div>
                            <h3>Weekly</h3>
                            <div>Awards</div>
                            <div>Timer</div>
                        </div>

                        <div>
                            <h3>Monthly</h3>
                            <div>
                                <img src="" alt=""/>
                                Memories
                            </div>
                            <div>Timer</div>
                        </div>

                    </div>

                </div>

                <div>
                    <h2>Schedule</h2>

                    <div>

                        <div>
                            <h3>Protocores</h3>
                            <div>protocore list</div>
                        </div>

                        <div>
                            <h3>Deepspace Trial</h3>
                            <div>trial list</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home