import styles from "../pages/Home.module.css";
import FlexibleTimer from "./FlexibleTimer.jsx";
import ModalWindow from "./ModalWindow.jsx";
import HunterBuffCard from "./HunterContestDescription.jsx";
import {useRef} from "react";


function HunterContest() {

    const missionModalRef = useRef();

    const showMissionModal = () => {
        missionModalRef.current.showModal();
    };

    return (

        <>
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
                        <HunterBuffCard
                            iconCount={5}
                            iconSrc="/src/assets/icons/violet.png"
                            extraIconSrc="/src/assets/icons/ruby.png"
                            title="Team A: Oath Amplification"
                            description="After using the Ardent Oath, DMG dealt by you and Companion increases by 100% for 10s."
                        />
                        <br/>
                        <HunterBuffCard
                            iconCount={4}
                            iconSrc="/src/assets/icons/ruby.png"
                            extraIconSrc="/src/assets/icons/amber.png"
                            title="Team B: Press On Stacks"
                            description="After an Active Skill is used, Support Skill damage increases by 35% for 4s.
                                    This effect can stack up to 3 times."
                        />
                        <br/>
                        <HunterBuffCard
                            iconCount={3}
                            iconSrc="/src/assets/icons/emerald.png"
                            extraIconSrc="/src/assets/icons/pearl.png"
                            title="Team C: Empowerment"
                            description="Increases ATK of all allied units."
                        />
                    </>
                }/>
        </>
    )

}

export default HunterContest