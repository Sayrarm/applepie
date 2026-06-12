import styles from "../pages/Home.module.css";
import FlexibleTimer from "./FlexibleTimer.jsx";
import ModalWindow from "./ModalWindow.jsx";
import HunterContestDescription from "./HunterContestDescription.jsx";
import { useRef } from "react";
import { getImageUrl } from "./imageUtils.js";
import { hunterContestBuffs } from "../data/hunter-contest-buffs.js";

function HunterContestBlock() {
    const missionModalRef = useRef();

    // Находим активные баффы сразу, без useEffect
    const buffsData = hunterContestBuffs.find(item => item.active === true);


    const showMissionModal = () => {
        missionModalRef.current.showModal();
    };

    if (!buffsData) {
        return <div className={styles.loading}>Loading...</div>;
    }

    // Формируем данные для каждой команды
    const teams = [
        {
            name: "Team A: Silverbay Division",
            mainIconSrc: buffsData.teamAStella1,
            mainIconCount: buffsData.teamAStella1Count,
            extraIcons: [],
            description: buffsData.teamA
        },
        {
            name: "Team B: Goldbird Division",
            mainIconSrc: buffsData.teamBStella1,
            mainIconCount: buffsData.teamBStella1Count,
            extraIcons: [],
            description: buffsData.teamB
        },
        {
            name: "Team C: Soaria Division",
            mainIconSrc: buffsData.teamCStella1,
            mainIconCount: buffsData.teamCStella1Count,
            extraIcons: [],
            description: buffsData.teamC
        }
    ];

    // Добавляем вторые иконки, если они есть
    if (buffsData.teamAStella2 && buffsData.teamAStella2Count) {
        teams[0].extraIcons.push({
            src: buffsData.teamAStella2,
            count: buffsData.teamAStella2Count
        });
    }
    if (buffsData.teamBStella2 && buffsData.teamBStella2Count) {
        teams[1].extraIcons.push({
            src: buffsData.teamBStella2,
            count: buffsData.teamBStella2Count
        });
    }
    if (buffsData.teamCStella2 && buffsData.teamCStella2Count) {
        teams[2].extraIcons.push({
            src: buffsData.teamCStella2,
            count: buffsData.teamCStella2Count
        });
    }

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
                        {teams.map((team, index) => (
                            <div key={index}>
                                <HunterContestDescription
                                    mainIconSrc={getImageUrl(team.mainIconSrc)}
                                    mainIconCount={team.mainIconCount}
                                    extraIcons={team.extraIcons.map(icon => ({
                                        ...icon,
                                        src: getImageUrl(icon.src)
                                    }))}
                                    title={team.name}
                                    description={team.description}
                                />
                                {index < teams.length - 1 && <br />}
                            </div>
                        ))}
                    </>
                }
            />
        </>
    );
}

export default HunterContestBlock;