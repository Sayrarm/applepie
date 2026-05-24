import styles from "./SkillBlock.module.css";
import TipText from "./TipText.jsx";

function SkillBlock({
                        skillImg,
                        skillName,
                        skillTitle,
                        cooldown,
                        stick = '|',
                        cost,
                        skillText
                    }) {
    return (
        <section className={styles.skillsSection}>
            <div className={styles.sectionTitle}>
                {skillImg && (
                    <img
                        src={skillImg}
                        alt={skillName}
                        className={styles.skillImg}
                    />
                )}
                <div className={styles.skillTitle}>{skillTitle}</div>
                <div className={styles.borderVertical}></div>
                <div className={styles.skillNameContainer}>
                    <div className={styles.skillName}>{skillName}</div>
                    <div className={styles.borderHorizontalWhite}></div>
                    <div>{cooldown} {stick} {cost}</div>
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