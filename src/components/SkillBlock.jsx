import styles from "./SkillBlock.module.css";

function SkillBlock({
                        skillImg,
                        skillName,
                        skillTitle,
                        cooldown,
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
                    <div>{cooldown} | {cost}</div>
                </div>
            </div>
            <div
                className={styles.skillsText}
                dangerouslySetInnerHTML={{ __html: skillText }}
            />
        </section>
    );
}

export default SkillBlock;