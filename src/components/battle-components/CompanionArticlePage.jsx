import { useParams } from "react-router-dom";
import styles from "./CompanionArticlePage.module.css";
import SkillBlock from "./SkillBlock.jsx";
import { getImageUrl } from "@hooks";

function CompanionArticlePage({ data, linkField = "link" }) {
  const { articleLink } = useParams();

  // Находим нужного компаньона
  const companion = data.find((item) => item[linkField] === articleLink);

  if (!companion) {
    return (
      <div className={styles.notFound}>No companions found ¯\_(ツ)_/¯</div>
    );
  }

  return (
    <article className={styles.generalContainer}>
      <section className={styles.skillsContainer}>
        <section className={styles.companionContainer}>
          {companion.img && (
            <img
              src={getImageUrl(companion.img)}
              alt={companion.companionName}
              className={styles.portraitComp}
            />
          )}

          {(companion.resonanceSkill ||
            companion.supportSkill ||
            companion.passiveSkill ||
            companion.ardentOath) && (
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
                skillText={companion.supportSkillText}
              />

              {/* Passive Skill */}
              <SkillBlock
                skillImg={companion.passiveSkillImg}
                skillName={companion.passiveSkill}
                skillTitle="Passive Skill"
                skillText={companion.passiveSkillText}
              />

              {/* Ardent Oath */}
              <SkillBlock
                skillImg={companion.ardentOathImg}
                skillName={companion.ardentOath}
                skillTitle="Ardent Oath"
                cost={`Cost: ${companion.ardentOathCost}`}
                skillText={companion.ardentOathText}
              />
            </section>
          )}
        </section>

        <section className={styles.companionContainer}>
          {companion.imgSync && (
              <img
                  src={getImageUrl(companion.imgSync)}
                  alt="sync skills"
                  className={styles.portraitMC}
              />
          )}

          {(companion.basicAttackSync ||
              companion.activeSkillSync_I ||
              companion.activeSkillSync_II ||
              companion.activeSkillSync_III ||
              companion.passiveSkillSync) && (
              <section className={styles.skillSetContainer}>
                <div className={styles.titleSection}>
                  <h1 className={styles.h1Title}>
                    Sync Skills
                  </h1>
                </div>

                <div className={styles.borderHorizontal}></div>

                {/* Basic Attack */}
                <SkillBlock
                    skillImg={companion.basicAttackSyncImg}
                    skillName={companion.basicAttackSync}
                    skillTitle="Basic Attack"
                    skillText={companion.basicAttackSyncText}
                />

                {/* Active Skill */}
                <SkillBlock
                    skillImg={companion.activeSkillSyncImg_I}
                    skillName={companion.activeSkillSync_I}
                    skillTitle="Active Skill I"
                    cooldown={`Cooldown: ${companion.activeSkillSyncCooldown_I}`}
                    skillText={companion.activeSkillSyncText_I}
                />
                <SkillBlock
                    skillImg={companion.activeSkillSyncImg_II}
                    skillName={companion.activeSkillSync_II}
                    skillTitle="Active Skill II"
                    cooldown={`Cooldown: ${companion.activeSkillSyncCooldown_II}`}
                    cost={`Cost: ${companion.activeSkillSyncCost_II}`}
                    skillText={companion.activeSkillSyncText_II}
                />
                <SkillBlock
                    skillImg={companion.activeSkillSyncImg_III}
                    skillName={companion.activeSkillSync_III}
                    skillTitle="Active Skill III"
                    cooldown={`Cooldown: ${companion.activeSkillSyncCooldown_III}`}
                    skillText={companion.activeSkillSyncText_III}
                />

                {/* Passive MC Skill */}
                <SkillBlock
                    skillImg={companion.passiveSkillSyncImg}
                    skillName={companion.passiveSkillSync}
                    skillTitle="Passive Skill"
                    skillText={companion.passiveSkillSyncText}
                />
              </section>
          )}
        </section>

        <section className={styles.companionContainer}>
          {companion.imgWeapon && (
            <img
              src={getImageUrl(companion.imgWeapon)}
              alt={companion.companionName}
              className={styles.portraitMC}
            />
          )}

          {(companion.basicAttack ||
            companion.activeSkill ||
            companion.passiveMCSkill) && (
            <section className={styles.skillSetContainer}>
              <div className={styles.titleSection}>
                <h1 className={styles.h1Title}>
                  MC Weapon: {companion.weaponName}
                </h1>
                <p className={styles.specialty}>{companion.specialityMC}</p>
              </div>

              <div className={styles.borderHorizontal}></div>

              {/* Basic Attack */}
              <SkillBlock
                skillImg={companion.basicAttackImg}
                skillName={companion.basicAttack}
                skillTitle="Basic Attack"
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
                skillText={companion.passiveMCText}
              />
            </section>
          )}
        </section>
      </section>

      {/* Eidolons */}
      {(companion.eidolon0 ||
        companion.eidolon1 ||
        companion.eidolon2 ||
        companion.eidolon3) && (
        <section className={styles.eidolonsContainer}>
          <h1 className={styles.h1Title}>Solar Slot Memories</h1>

          {/*R0*/}
          <SkillBlock
            skillName="Starring Effect"
            skillTitle="I"
            cooldown="All Solar Memories are Rank 0"
            cost={
              <img
                src={getImageUrl("../assets/icons/rank-0.png")}
                alt="Rank 0"
                className={styles.costImage}
              />
            }
            stick=""
            skillText={companion.eidolon0}
          />

          {/*R1*/}
          <SkillBlock
            skillName="Duo Rank 1"
            skillTitle="II"
            cooldown="All Solar Memories are Rank 1"
            cost={
              <img
                src={getImageUrl("../assets/icons/rank-1.png")}
                alt="Rank 1"
                className={styles.costImage}
              />
            }
            stick=""
            skillText={companion.eidolon1}
          />

          {/*R2*/}
          <SkillBlock
            skillName="Duo Rank 2"
            skillTitle="III"
            cooldown="All Solar Memories are Rank 2"
            cost={
              <img
                src={getImageUrl("../assets/icons/rank-2.png")}
                alt="Rank 2"
                className={styles.costImage}
              />
            }
            stick=""
            skillText={companion.eidolon2}
          />

          {/*R3*/}
          <SkillBlock
            skillName="Duo Rank 3"
            skillTitle="IV"
            cooldown="All Solar Memories are Rank 3"
            cost={
              <img
                src={getImageUrl("../assets/icons/rank-3.png")}
                alt="Rank 3"
                className={styles.costImage}
              />
            }
            stick=""
            skillText={companion.eidolon3}
          />
        </section>
      )}
    </article>
  );
}

export default CompanionArticlePage;
