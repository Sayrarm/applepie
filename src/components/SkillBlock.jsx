import styles from "./SkillBlock.module.css";
import TipText from "./TipText.jsx";
import {getImageUrl} from "./imageUtils.js";

function SkillBlock({
                        skillImg,
                        skillName,
                        skillTitle,
                        cooldown = "Cooldown: none",
                        stick = "|",
                        cost = "Cost: none",
                        skillText = ""
                    }) {
    return (
        <section className={styles.skillsSection}>
            <div className={styles.sectionTitle}>
                {skillImg && (
                    <img
                        src={getImageUrl(skillImg)}
                        alt={skillName}
                        className={styles.skillImg}
                    />
                )}
                <div className={styles.skillTitle}>{skillTitle}</div>
                <div className={styles.borderVertical}></div>
                <div className={styles.skillNameContainer}>
                    <div className={styles.skillName}>{skillName}</div>
                    <div className={styles.borderHorizontalWhite}></div>
                    <div className={styles.costText}>{cooldown} {stick} {cost}</div>
                </div>
            </div>
            <div
                className={styles.skillsText}
            >
                <TipText text={skillText} />
            </div>
        </section>
    );
}

export default SkillBlock;