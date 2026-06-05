import styles from "../pages/CardArticle.module.css";
import {getImageUrl} from "./imageUtils.js";

function ParametersBlock ({card}) {

    if (!card) return null;

return (
    <>
        <div className={styles.generalContainer}>
            <span>Rarity:</span>
            {[...Array(card.rarityStars)].map((_, i) => (
                <img
                    className={styles.rarity}
                    key={i}
                    src={getImageUrl(card.rarity)}
                    alt={card.rarityName}
                    width={24}
                    height={24}
                />
            ))}
        </div>

        <div className={styles.borderVertical}></div>

        <div className={styles.generalContainer}>
            <span>Stellactrum:</span>
            <img
                className={styles.stella}
                src={getImageUrl(card.stella)}
                alt={card.stellaName}
                width={24}
                height={24}
            />
        </div>

        <div className={styles.borderVertical}></div>

        <div className={styles.generalContainer}>
            <span>Placement:</span>
            <img
                className={styles.placement}
                src={getImageUrl(card.placement)}
                alt={card.placementName}
                width={24}
                height={24}
            />
        </div>

        <div className={styles.borderVertical}></div>

        <div className={styles.generalContainer}>
            <span>Talent:</span>
            <img
                className={styles.talent}
                src={getImageUrl(card.talent)}
                alt={card.talentName}
                width={24}
                height={24}
            />
        </div>
    </>
)

}

export default ParametersBlock