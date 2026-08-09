import styles from "../../pages/main/Home.module.css";
import FlexibleTimer from "../common/FlexibleTimer.jsx";
import {getImageUrl} from "../../hooks/imageUtils.js";


function BattlePassBlock( {battlePass} ) {

    if (!battlePass || battlePass.length === 0) {
        return <div className={styles.noEvents}>No Promise available</div>;
    }

    return (
        <>
            {battlePass.map(bp => (
                <div
                    key={bp.id}
                    className={styles.containerTitleTimer}
                >
                    <div className={styles.bannerTitle}>{bp.name}</div>
                    <FlexibleTimer
                        startDateTime={bp.startDate}
                        endDateTime={bp.endDate}
                    />
                    <img
                        className={styles.imgBanner}
                        src={getImageUrl(bp.image)}
                        alt={bp.name}
                    />
                </div>
            ))}

        </>
    )
}

export default BattlePassBlock