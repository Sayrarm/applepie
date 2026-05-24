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



                <section className={styles.companionContainer}>

                    {companion.img && (
                        <img
                            src={companion.img}
                            alt={companion.companionName}
                            className={styles.portrait}
                        />
                    )}

                    <section className={styles.skillSetContainer}>

                        <div className={styles.titleSection}>
                            <h1 className={styles.h1Title}>{companion.companionName}</h1>
                            <p className={styles.specialty}>{companion.speciality}</p>
                        </div>

                        <div className={styles.borderHorizontal}></div>

                        {/* Resonance Skill */}
                        <section className={styles.skillsSection}>
                            <div className={styles.sectionTitle}>
                                {companion.img && (
                                    <img
                                        src={companion.resonanceSkillImg}
                                        alt={companion.resonanceSkill}
                                        className={styles.skillImg}
                                    />
                                )}
                                <div className={styles.skillTitle}>Resonance Skill</div>
                                <div className={styles.borderVertical}></div>
                                <div className={styles.skillNameContainer}>
                                    <div className={styles.skillName}>{companion.resonanceSkill}</div>
                                    <div className={styles.borderHorizontalWhite}></div>
                                    <div>Cooldown: {companion.resonanceSkillCooldown} | Cost: {companion.resonanceSkillCost}</div>
                                </div>
                            </div>
                            <div className={styles.skillsText}
                                 dangerouslySetInnerHTML={{__html: companion.resonanceSkillText}}/>
                        </section>

                        {/* Support Skill */}

                        <section className={styles.skillsSection}>
                            <div className={styles.sectionTitle}>
                                {companion.img && (
                                    <img
                                        src={companion.supportSkillImg}
                                        alt={companion.supportSkill}
                                        className={styles.skillImg}
                                    />
                                )}
                                <div className={styles.skillTitle}>Support Skill</div>
                                <div className={styles.borderVertical}></div>
                                <div className={styles.skillNameContainer}>
                                    <div className={styles.skillName}>{companion.supportSkill}</div>
                                    <div className={styles.borderHorizontalWhite}></div>
                                    <div>Cooldown: {companion.supportSkillCooldown} | Cost: {companion.supportSkillCost}</div>
                                </div>
                            </div>
                            <div className={styles.skillsText}
                                 dangerouslySetInnerHTML={{__html: companion.supportSkillText}}/>
                        </section>

                        {/* Passive Skill */}
                        <section className={styles.skillsSection}>
                            <div className={styles.sectionTitle}>
                                {companion.img && (
                                    <img
                                        src={companion.passiveSkillImg}
                                        alt={companion.passiveSkill}
                                        className={styles.skillImg}
                                    />
                                )}
                                <div className={styles.skillTitle}>Passive Skill</div>
                                <div className={styles.borderVertical}></div>
                                <div className={styles.skillNameContainer}>
                                    <div className={styles.skillName}>{companion.passiveSkill}</div>
                                    <div className={styles.borderHorizontalWhite}></div>
                                    <div>Cooldown: none | Cost: none</div>
                                </div>
                            </div>
                            <div className={styles.skillsText}
                                 dangerouslySetInnerHTML={{__html: companion.passiveSkillText}}/>
                        </section>

                        {/* Ardent Oath */}
                        <section className={styles.skillsSection}>
                            <div className={styles.sectionTitle}>
                                {companion.img && (
                                    <img
                                        src={companion.ardentOathImg}
                                        alt={companion.ardentOath}
                                        className={styles.skillImg}
                                    />
                                )}
                                <div className={styles.skillTitle}>Ardent Oath</div>
                                <div className={styles.borderVertical}></div>
                                <div className={styles.skillNameContainer}>
                                    <div className={styles.skillName}>{companion.ardentOath}</div>
                                    <div className={styles.borderHorizontalWhite}></div>
                                    <div>Cooldown: none | Cost: {companion.ardentOathCost}</div>
                                </div>
                            </div>
                            <div className={styles.skillsText}
                                 dangerouslySetInnerHTML={{__html: companion.ardentOathText}}/>
                        </section>

                    </section>



                </section>



                <section className={styles.companionContainer}>

                    {companion.img && (
                        <img
                            src={companion.imgWeapon}
                            alt={companion.companionName}
                            className={styles.portrait}
                        />
                    )}

                    <section className={styles.skillSetContainer}>
                        <div className={styles.titleSection}>
                            <h1 className={styles.h1Title}>MC Weapon: {companion.weaponName}</h1>
                            <p className={styles.specialty}>{companion.specialityMC}</p>
                        </div>

                        <div className={styles.borderHorizontal}></div>

                        {/* Basic Attack */}
                        <section className={styles.skillsSection}>
                            <div className={styles.sectionTitle}>
                                {companion.img && (
                                    <img
                                        src={companion.basicAttackImg}
                                        alt={companion.basicAttack}
                                        className={styles.skillImg}
                                    />
                                )}
                                <div className={styles.skillTitle}>Basic Attack</div>
                                <div className={styles.borderVertical}></div>
                                <div className={styles.skillNameContainer}>
                                    <div className={styles.skillName}>{companion.basicAttack}</div>
                                    <div className={styles.borderHorizontalWhite}></div>
                                    <div>Cooldown: none | Cost: none</div>
                                </div>
                            </div>
                            <div className={styles.skillsText}
                                 dangerouslySetInnerHTML={{__html: companion.basicAttackText}}/>
                        </section>

                        {/* Active Skill */}
                        <section className={styles.skillsSection}>
                            <div className={styles.sectionTitle}>
                                {companion.img && (
                                    <img
                                        src={companion.activeSkillImg}
                                        alt={companion.activeSkill}
                                        className={styles.skillImg}
                                    />
                                )}
                                <div className={styles.skillTitle}>Active Skill</div>
                                <div className={styles.borderVertical}></div>
                                <div className={styles.skillNameContainer}>
                                    <div className={styles.skillName}>{companion.activeSkill}</div>
                                    <div className={styles.borderHorizontalWhite}></div>
                                    <div>Cooldown: {companion.activeSkillCooldown} | Cost: {companion.activeSkillCost}</div>
                                </div>
                            </div>
                            <div className={styles.skillsText}
                                 dangerouslySetInnerHTML={{__html: companion.basicAttackText}}/>
                        </section>

                        {/* Passive MC Skill */}
                        <section className={styles.skillsSection}>
                            <div className={styles.sectionTitle}>
                                {companion.img && (
                                    <img
                                        src={companion.passiveMCSkillImg}
                                        alt={companion.passiveMCSkill}
                                        className={styles.skillImg}
                                    />
                                )}
                                <div className={styles.skillTitle}>Passive Skill</div>
                                <div className={styles.borderVertical}></div>
                                <div className={styles.skillNameContainer}>
                                    <div className={styles.skillName}>{companion.passiveMCSkill}</div>
                                    <div className={styles.borderHorizontalWhite}></div>
                                    <div>Cooldown: none | Cost: none</div>
                                </div>
                            </div>
                            <div className={styles.skillsText}
                                 dangerouslySetInnerHTML={{__html: companion.passiveMCText}}/>
                        </section>

                    </section>



                </section>

            </section>

            {/* Eidolons */}
            <section className={styles.eidolonsContainer}>
                <h1 className={styles.h1Title}>Solar Slot Memories</h1>

                <section className={styles.skillsSection}>
                    <div className={styles.sectionTitle}>
                        <div className={styles.skillTitle}>I</div>
                        <div className={styles.borderVertical}></div>
                        <div className={styles.skillNameContainer}>
                            <div className={styles.skillName}>Starring Effect</div>
                            <div className={styles.borderHorizontalWhite}></div>
                            <div>All Solar Memories are Rank 0</div>
                        </div>
                    </div>
                    <div className={styles.skillsText}
                         dangerouslySetInnerHTML={{__html: companion.eidolon0}}/>
                </section>

                <section className={styles.skillsSection}>
                    <div className={styles.sectionTitle}>
                        <div className={styles.skillTitle}>II</div>
                        <div className={styles.borderVertical}></div>
                        <div className={styles.skillNameContainer}>
                            <div className={styles.skillName}>Duo Rank 1</div>
                            <div className={styles.borderHorizontalWhite}></div>
                            <div>All Solar Memories are Rank 1</div>
                        </div>
                    </div>
                    <div className={styles.skillsText}
                         dangerouslySetInnerHTML={{__html: companion.eidolon1}}/>
                </section>

                <section className={styles.skillsSection}>
                    <div className={styles.sectionTitle}>
                        <div className={styles.skillTitle}>III</div>
                        <div className={styles.borderVertical}></div>
                        <div className={styles.skillNameContainer}>
                            <div className={styles.skillName}>Duo Rank 2</div>
                            <div className={styles.borderHorizontalWhite}></div>
                            <div>All Solar Memories are Rank 2</div>
                        </div>
                    </div>
                    <div className={styles.skillsText}
                         dangerouslySetInnerHTML={{__html: companion.eidolon2}}/>
                </section>

                <section className={styles.skillsSection}>
                    <div className={styles.sectionTitle}>
                        <div className={styles.skillTitle}>IV</div>
                        <div className={styles.borderVertical}></div>
                        <div className={styles.skillNameContainer}>
                            <div className={styles.skillName}>Duo Rank 3</div>
                            <div className={styles.borderHorizontalWhite}></div>
                            <div>All Solar Memories are Rank 3</div>
                        </div>
                    </div>
                    <div className={styles.skillsText}
                         dangerouslySetInnerHTML={{__html: companion.eidolon3}}/>
                </section>

            </section>
        </article>
    );
}

export default CompanionArticlePage;