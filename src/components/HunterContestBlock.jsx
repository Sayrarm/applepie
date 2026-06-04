import styles from "../pages/Home.module.css";
import FlexibleTimer from "./FlexibleTimer.jsx";
import ModalWindow from "./ModalWindow.jsx";
import HunterBuffCard from "./HunterContestDescription.jsx";
import {useRef} from "react";


function HunterContestBlock() {

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
                            iconSrc="/src/assets/icons/sapphire.png"
                            extraIconSrc="/src/assets/icons/ruby.png"
                            title="Team A: Silverbay Division"
                            description="Charged Attack Penetration: When Wanderer is hit by a Charged Attack, it receives increased DMG in a short period of time."
                        />
                        <br/>
                        <HunterBuffCard
                            iconCount={4}
                            iconSrc="/src/assets/icons/sapphire.png"
                            extraIconSrc="/src/assets/icons/emerald.png"
                            title="Team B: Goldbird Division"
                            description="Collaborative Fusion: Enemies hit by Support Skills take 80% more Basic Attack DMG for 5s."
                        />
                        <br/>
                        <HunterBuffCard
                            iconCount={3}
                            iconSrc="/src/assets/icons/pearl.png"
                            extraIconSrc="/src/assets/icons/violet.png"
                            title="Team C: Soaria Division"
                            description="Overload: Increases CRIT rate of all allied units."
                        />
                    </>
                }/>
        </>
    )

}

export default HunterContestBlock