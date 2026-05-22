import { useParams } from 'react-router-dom';
import styles from "./CompanionArticlePage.module.css";

function CompanionArticlePage({ data, linkField = "link" }) {
    const { articleLink } = useParams();

    // Находим нужного компаньона
    const companion = data.find(item => item[linkField] === articleLink);

    if (!companion) {
        return <div className={styles.notFound}>No companions found ¯\_(ツ)_/¯</div>;
    }

    return (
        <div className={styles.container}>
            {/* Заголовок */}
            <div className={styles.header}>
                {companion.img && (
                    <img
                        src={companion.img}
                        alt={companion.companionName}
                        className={styles.portrait}
                    />
                )}
                <div className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>{companion.companionName}</h1>
                    <p className={styles.weapon}>Weapon: {companion.weaponName}</p>
                    <p className={styles.specialty}>Specialty: {companion.specialty}</p>
                </div>
            </div>

            {/* Support Skill */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Support Skill: {companion.supportSkill}
                    <span className={styles.cooldown}> (Cooldown: {companion.supportSkillCooldown} | Cost: {companion.supportSkillCost})</span>
                </h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.supportSkillText }} />
            </section>

            {/* Resonance Skill */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Resonance Skill: {companion.resonanceSkill}
                    <span className={styles.cooldown}> (Cooldown: {companion.resonanceSkillCooldown} | Cost: {companion.resonanceSkillCost})</span>
                </h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.resonanceSkillText }} />
            </section>

            {/* Ardent Oath */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Ardent Oath: {companion.ardentOath}</h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.ardentOathText }} />
            </section>

            {/* Active Skill */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Active Skill: {companion.activeSkill}
                    <span className={styles.cooldown}> (Cooldown: {companion.activeSkillCooldown} | Cost: {companion.activeSkillCooldownCost})</span>
                </h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.activeSkillText }} />
            </section>

            {/* Basic Attack */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Basic Attack: {companion.basicAttack}</h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.basicAttackText }} />
            </section>

            {/* Passive Skill */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Passive: {companion.passiveSkill}</h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.passiveSkillText }} />
            </section>

            {/* Passive MC Skill */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Paired Knot: {companion.passiveMCSkill}</h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.passiveMCText }} />
            </section>

            {/* Eidolons */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Eidolons</h2>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 0</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.eidolon0 }} />
                </div>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 1</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.eidolon1 }} />
                </div>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 2</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.eidolon2 }} />
                </div>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 3</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: companion.eidolon3 }} />
                </div>
            </section>
        </div>
    );
}

export default CompanionArticlePage;