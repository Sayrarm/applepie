import {useParams} from 'react-router-dom';
import styles from "./CompanionArticlePage.module.css";
import SkillBlock from "./SkillBlock.jsx";

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

                <section className={styles.companionContainer}>

                    {companion.img && (
                        <img
                            src={companion.img}
                            alt={companion.companionName}
                            className={styles.portraitComp}
                        />
                    )}

                    {(companion.resonanceSkill || companion.supportSkill || companion.passiveSkill || companion.ardentOath) && (
                    <section className={styles.skillSetContainer}>

                        <div className={styles.titleSection}>
                            <h1 className={styles.h1Title}>{companion.companionName}</h1>
                            <p className={styles.specialty}>{companion.speciality}</p>
                        </div>

                        <div className={styles.borderHorizontal}></div>

                        {/* Resonance Skill */}
                        <SkillBlock
                            skillImg={companion.resonanceSkillImg}
                            skillName={companion.resonanceSkill}
                            skillTitle="Resonance Skill"
                            cooldown={`Cooldown: ${companion.resonanceSkillCooldown}`}
                            cost={`Cost: ${companion.resonanceSkillCost}`}
                            skillText={companion.resonanceSkillText}
                        />

                        {/* Support Skill */}
                        <SkillBlock
                            skillImg={companion.supportSkillImg}
                            skillName={companion.supportSkill}
                            skillTitle="Support Skill"
                            cooldown={`Cooldown: ${companion.supportSkillCooldown}`}
                            cost={`Cost: ${companion.supportSkillCost}`}
                            skillText={companion.supportSkillText}
                        />

                        {/* Passive Skill */}
                        <SkillBlock
                            skillImg={companion.passiveSkillImg}
                            skillName={companion.passiveSkill}
                            skillTitle="Passive Skill"
                            cooldown="Cooldown: none"
                            cost="Cost: none"
                            skillText={companion.passiveSkillText}
                        />

                        {/* Ardent Oath */}
                        <SkillBlock
                            skillImg={companion.ardentOathImg}
                            skillName={companion.ardentOath}
                            skillTitle="Ardent Oath"
                            cooldown="Cooldown: none"
                            cost={`Cost: ${companion.ardentOathCost}`}
                            skillText={companion.ardentOathText}
                        />

                    </section>)}

                </section>

                <section className={styles.companionContainer}>

                    {companion.imgWeapon && (
                        <img
                            src={companion.imgWeapon}
                            alt={companion.companionName}
                            className={styles.portraitMC}
                        />
                    )}

                    {(companion.basicAttack || companion.activeSkill || companion.passiveMCSkill) && (
                    <section className={styles.skillSetContainer}>
                        <div className={styles.titleSection}>
                            <h1 className={styles.h1Title}>MC Weapon: {companion.weaponName}</h1>
                            <p className={styles.specialty}>{companion.specialityMC}</p>
                        </div>

                        <div className={styles.borderHorizontal}></div>

                        {/* Basic Attack */}
                        <SkillBlock
                            skillImg={companion.basicAttackImg}
                            skillName={companion.basicAttack}
                            skillTitle="Basic Attack"
                            cooldown="Cooldown: none"
                            cost="Cost: none"
                            skillText={companion.basicAttackText}
                        />

                        {/* Active Skill */}
                        <SkillBlock
                            skillImg={companion.activeSkillImg}
                            skillName={companion.activeSkill}
                            skillTitle="Active Skill"
                            cooldown={`Cooldown: ${companion.activeSkillCooldown}`}
                            cost={`Cost: ${companion.activeSkillCost}`}
                            skillText={companion.activeSkillText}
                        />

                        {/* Passive MC Skill */}
                        <SkillBlock
                            skillImg={companion.passiveMCSkillImg}
                            skillName={companion.passiveMCSkill}
                            skillTitle="Passive Skill"
                            cooldown="Cooldown: none"
                            cost="Cost: none"
                            skillText={companion.passiveMCText}
                        />

                    </section>)}

                </section>

            </section>

            {/* Eidolons */}
            {(companion.eidolon0 || companion.eidolon1 || companion.eidolon2 || companion.eidolon3) && (
                <section className={styles.eidolonsContainer}>
                    <h1 className={styles.h1Title}>Solar Slot Memories</h1>


                {/*R0*/}
                <SkillBlock
                    skillName="Starring Effect"
                    skillTitle="I"
                    cooldown="All Solar Memories are Rank 0"
                    stick=""
                    skillText={companion.eidolon0}
                />

                {/*R1*/}
                <SkillBlock
                    skillName="Duo Rank 1"
                    skillTitle="II"
                    cooldown="All Solar Memories are Rank 1"
                    stick=""
                    skillText={companion.eidolon1}
                />

                {/*R2*/}
                <SkillBlock
                    skillName="Duo Rank 2"
                    skillTitle="III"
                    cooldown="All Solar Memories are Rank 2"
                    stick=""
                    skillText={companion.eidolon2}
                />

                {/*R3*/}
                <SkillBlock
                    skillName="Duo Rank 3"
                    skillTitle="IV"
                    cooldown="All Solar Memories are Rank 3"
                    stick=""
                    skillText={companion.eidolon3}
                />

            </section>)}
        </article>
    );
}

export default CompanionArticlePage;