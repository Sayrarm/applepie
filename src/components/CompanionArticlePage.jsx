import {useParams} from 'react-router-dom';
import styles from "./CompanionArticlePage.module.css";

function CompanionArticlePage({data, linkField = "link"}) {
    const {articleLink} = useParams();

    // Находим нужного компаньона
    const companion = data.find(item => item[linkField] === articleLink);

    if (!companion) {
        return <div className={styles.notFound}>No companions found ¯\_(ツ)_/¯</div>;
    }

    return (
        <article className={styles.generalContainer}>

            <section className={styles.skillsContainer}>


                {/* Заголовок и картинка */}
                {companion.img && (
                    <img
                        src={companion.img}
                        alt={companion.companionName}
                        className={styles.portrait}
                    />
                )}

                <section className={styles.companionSkills}>

                    <div className={styles.titleSection}>
                        <h1 className={styles.mainTitle}>{companion.companionName}</h1>
                        <p className={styles.specialty}>{companion.speciality}</p>
                    </div>

                    {/* Resonance Skill */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Resonance Skill: {companion.resonanceSkill}
                            <div className={styles.cooldown}>
                                (Cooldown: {companion.resonanceSkillCooldown} | Cost: {companion.resonanceSkillCost})
                            </div>
                        </h2>
                        <div className={styles.content}
                             dangerouslySetInnerHTML={{__html: companion.resonanceSkillText}}/>
                    </section>

                    {/* Support Skill */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Support Skill: {companion.supportSkill}
                            <div className={styles.cooldown}>
                                (Cooldown: {companion.supportSkillCooldown} | Cost: {companion.supportSkillCost})
                            </div>
                        </h2>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.supportSkillText}}/>
                    </section>

                    {/* Passive Skill */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Passive Skill: {companion.passiveSkill}</h2>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.passiveSkillText}}/>
                    </section>

                    {/* Ardent Oath */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Ardent Oath: {companion.ardentOath}</h2>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.ardentOathText}}/>
                    </section>

                </section>


                <section className={styles.mcSkills}>

                    <div className={styles.titleSection}>
                        <h1 className={styles.weapon}>Weapon: {companion.weaponName}</h1>
                        <p className={styles.specialty}>{companion.specialityMC}</p>
                    </div>

                    {/* Basic Attack */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Basic Attack: {companion.basicAttack}</h2>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.basicAttackText}}/>
                    </div>

                    {/* Active Skill */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Active Skill: {companion.activeSkill}
                            <div className={styles.cooldown}>
                                (Cooldown: {companion.activeSkillCooldown} | Cost: {companion.activeSkillCooldownCost})
                            </div>
                        </h2>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.activeSkillText}}/>
                    </div>

                    {/* Passive MC Skill */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Passive Skill: {companion.passiveMCSkill}</h2>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.passiveMCText}}/>
                    </div>

                </section>

            </section>

            {/* Eidolons */}
            <section className={styles.eidolonsContainer}>
                <h2 className={styles.sectionTitle}>Eidolons</h2>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 0</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.eidolon0}}/>
                </div>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 1</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.eidolon1}}/>
                </div>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 2</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.eidolon2}}/>
                </div>

                <div className={styles.eidolon}>
                    <h3 className={styles.eidolonTitle}>Rank 3</h3>
                    <div className={styles.content} dangerouslySetInnerHTML={{__html: companion.eidolon3}}/>
                </div>
            </section>
        </article>
    );
}

export default CompanionArticlePage;