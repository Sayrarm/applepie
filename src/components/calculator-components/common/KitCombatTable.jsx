import {useMemo} from "react";
import styles from "./KitCombatTable.module.css";
import {
    findCompanionData,
    findWeaponData,
    computeKitDamage
} from "@data";

function KitCombatTable({
                            stats,
                            selectedCompanion,
                            selectedMCWeapon,
                            teamDmgBonus = 0,
                            additionalBonus,
                        }) {
    const {attributeBonus, perfectMatchBonus} = additionalBonus || {
        attributeBonus: 0,
        perfectMatchBonus: 0,
    };

    // Находим данные компаньона и оружия (для отображения формул)
    const companionData = useMemo(
        () => findCompanionData(selectedCompanion),
        [selectedCompanion],
    );

    const weaponData = useMemo(
        () => findWeaponData(selectedMCWeapon),
        [selectedMCWeapon],
    );

    // Весь расчёт урона — одной функцией
    const {baseDamage, weakenedDamage, critDamage} = useMemo(
        () =>
            computeKitDamage(stats, {
                selectedCompanion,
                selectedMCWeapon,
                teamDmgBonus,
                attributeBonus,
                perfectMatchBonus,
            }),
        [
            stats,
            selectedCompanion,
            selectedMCWeapon,
            teamDmgBonus,
            attributeBonus,
            perfectMatchBonus,
        ],
    );

    const roundDisplay = (value) => Math.round(value);

    return (
        <section className={styles.kitCombatTableContainer}>
            <table className={styles.statsTable}>
                <thead>
                <tr>
                    <th className={styles.titleSkill}></th>
                    <th className={styles.titleSkill}>Base</th>
                    <th className={styles.titleSkill}>Weakened DMG</th>
                    <th className={styles.titleSkill}>Crit DMG</th>
                    <th className={styles.titleSkill}>Formula</th>
                </tr>
                </thead>
                <tbody>
                {/* Support Skill */}
                {(baseDamage.support > 0 || companionData.supportSkillFormula) && (
                    <tr>
                        <th>Support Skill</th>
                        <td>{roundDisplay(baseDamage.support)}</td>
                        <td>{roundDisplay(weakenedDamage.support)}</td>
                        <td>{roundDisplay(critDamage.support)}</td>
                        <td>{companionData.supportSkillFormula || "—"}</td>
                    </tr>
                )}

                {/* Empowered Support Skill */}
                {(baseDamage.empoweredSupport > 0 ||
                    companionData.empoweredSupportSkillFormula) && (
                    <tr>
                        <th>Empowered Support Skill</th>
                        <td>{roundDisplay(baseDamage.empoweredSupport)}</td>
                        <td>{roundDisplay(weakenedDamage.empoweredSupport)}</td>
                        <td>{roundDisplay(critDamage.empoweredSupport)}</td>
                        <td>{companionData.empoweredSupportSkillFormula || "—"}</td>
                    </tr>
                )}

                {/* Empowered Support Skill Additional */}
                {(baseDamage.empoweredSupport2 > 0 ||
                    companionData.empoweredSupportSkillFormula2) && (
                    <tr>
                        <th>Empowered Support Skill Additional</th>
                        <td>{roundDisplay(baseDamage.empoweredSupport2)}</td>
                        <td>{roundDisplay(weakenedDamage.empoweredSupport2)}</td>
                        <td>{roundDisplay(critDamage.empoweredSupport2)}</td>
                        <td>{companionData.empoweredSupportSkillFormula2 || "—"}</td>
                    </tr>
                )}

                {/* Support Skill Additional */}
                {(baseDamage.support2 > 0 || companionData.supportSkillFormula2) && (
                    <tr>
                        <th>Support Skill Additional</th>
                        <td>{roundDisplay(baseDamage.support2)}</td>
                        <td>{roundDisplay(weakenedDamage.support2)}</td>
                        <td>{roundDisplay(critDamage.support2)}</td>
                        <td>{companionData.supportSkillFormula2 || "—"}</td>
                    </tr>
                )}

                {/* Support Skill Additional 3 */}
                {(baseDamage.support3 > 0 || companionData.supportSkillFormula3) && (
                    <tr>
                        <th>Support Skill Additional</th>
                        <td>{roundDisplay(baseDamage.support3)}</td>
                        <td>{roundDisplay(weakenedDamage.support3)}</td>
                        <td>{roundDisplay(critDamage.support3)}</td>
                        <td>{companionData.supportSkillFormula3 || "—"}</td>
                    </tr>
                )}

                {/* Resonance Skill */}
                {(baseDamage.resonance > 0 ||
                    companionData.resonanceSkillFormula) && (
                    <tr>
                        <th>Resonance Skill</th>
                        <td>{roundDisplay(baseDamage.resonance)}</td>
                        <td>{roundDisplay(weakenedDamage.resonance)}</td>
                        <td>{roundDisplay(critDamage.resonance)}</td>
                        <td>{companionData.resonanceSkillFormula || "—"}</td>
                    </tr>
                )}

                {/* Resonance Skill Additional */}
                {(baseDamage.resonance2 > 0 ||
                    companionData.resonanceSkillFormula2) && (
                    <tr>
                        <th>Resonance Skill Additional</th>
                        <td>{roundDisplay(baseDamage.resonance2)}</td>
                        <td>{roundDisplay(weakenedDamage.resonance2)}</td>
                        <td>{roundDisplay(critDamage.resonance2)}</td>
                        <td>{companionData.resonanceSkillFormula2 || "—"}</td>
                    </tr>
                )}

                {/* Ardent Oath */}
                {(baseDamage.ardentOath > 0 || companionData.ardentOathFormula) && (
                    <tr>
                        <th>Ardent Oath</th>
                        <td>{roundDisplay(baseDamage.ardentOath)}</td>
                        <td>{roundDisplay(weakenedDamage.ardentOath)}</td>
                        <td>{roundDisplay(critDamage.ardentOath)}</td>
                        <td>{companionData.ardentOathFormula || "—"}</td>
                    </tr>
                )}

                {/* Passive Skills */}
                {(baseDamage.passive1 > 0 || companionData.passiveSkillFormula1) && (
                    <tr>
                        <th>Passive Skill (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive1)}</td>
                        <td>{roundDisplay(weakenedDamage.passive1)}</td>
                        <td>{roundDisplay(critDamage.passive1)}</td>
                        <td>{companionData.passiveSkillFormula1 || "—"}</td>
                    </tr>
                )}

                {(baseDamage.passive2 > 0 || companionData.passiveSkillFormula2) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive2)}</td>
                        <td>{roundDisplay(weakenedDamage.passive2)}</td>
                        <td>{roundDisplay(critDamage.passive2)}</td>
                        <td>{companionData.passiveSkillFormula2 || "—"}</td>
                    </tr>
                )}

                {(baseDamage.passive3 > 0 || companionData.passiveSkillFormula3) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive3)}</td>
                        <td>{roundDisplay(weakenedDamage.passive3)}</td>
                        <td>{roundDisplay(critDamage.passive3)}</td>
                        <td>{companionData.passiveSkillFormula3 || "—"}</td>
                    </tr>
                )}

                {(baseDamage.passive4 > 0 || companionData.passiveSkillFormula4) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive4)}</td>
                        <td>{roundDisplay(weakenedDamage.passive4)}</td>
                        <td>{roundDisplay(critDamage.passive4)}</td>
                        <td>{companionData.passiveSkillFormula4 || "—"}</td>
                    </tr>
                )}

                {(baseDamage.passive5 > 0 || companionData.passiveSkillFormula5) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive5)}</td>
                        <td>{roundDisplay(weakenedDamage.passive5)}</td>
                        <td>{roundDisplay(critDamage.passive5)}</td>
                        <td>{companionData.passiveSkillFormula5 || "—"}</td>
                    </tr>
                )}

                {/* Sync Skill */}
                {companionData.syncSkill && (
                    <>
                        <tr>
                            <th className={styles.titleSkill}>Sync Skill:</th>
                        </tr>

                        {(baseDamage.basicSync1 > 0 ||
                            companionData.basicSyncFirstStrike) && (
                            <tr>
                                <th>First Strike</th>
                                <td>{roundDisplay(baseDamage.basicSync1)}</td>
                                <td>{roundDisplay(weakenedDamage.basicSync1)}</td>
                                <td>{roundDisplay(critDamage.basicSync1)}</td>
                                <td>{companionData.basicSyncFirstStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basicSync2 > 0 ||
                            companionData.basicSyncSecondStrike) && (
                            <tr>
                                <th>Second Strike</th>
                                <td>{roundDisplay(baseDamage.basicSync2)}</td>
                                <td>{roundDisplay(weakenedDamage.basicSync2)}</td>
                                <td>{roundDisplay(critDamage.basicSync2)}</td>
                                <td>{companionData.basicSyncSecondStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basicSync3 > 0 ||
                            companionData.basicSyncThirdStrike) && (
                            <tr>
                                <th>Third Strike</th>
                                <td>{roundDisplay(baseDamage.basicSync3)}</td>
                                <td>{roundDisplay(weakenedDamage.basicSync3)}</td>
                                <td>{roundDisplay(critDamage.basicSync3)}</td>
                                <td>{companionData.basicSyncThirdStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basicSync4 > 0 ||
                            companionData.basicSyncFourthStrike) && (
                            <tr>
                                <th>Fourth Strike</th>
                                <td>{roundDisplay(baseDamage.basicSync4)}</td>
                                <td>{roundDisplay(weakenedDamage.basicSync4)}</td>
                                <td>{roundDisplay(critDamage.basicSync4)}</td>
                                <td>{companionData.basicSyncFourthStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basicSyncCharged > 0 ||
                            companionData.basicSyncChargedAttack) && (
                            <tr>
                                <th>Charged Attack</th>
                                <td>{roundDisplay(baseDamage.basicSyncCharged)}</td>
                                <td>{roundDisplay(weakenedDamage.basicSyncCharged)}</td>
                                <td>{roundDisplay(critDamage.basicSyncCharged)}</td>
                                <td>{companionData.basicSyncChargedAttack || "—"}</td>
                            </tr>
                        )}

                        <tr>
                            <th className={styles.titleSkill}>Sync Active Skill:</th>
                        </tr>

                        {(baseDamage.activeI > 0 ||
                            companionData.activeSkill_IFormula) && (
                            <tr>
                                <th>Active Skill I</th>
                                <td>{roundDisplay(baseDamage.activeI)}</td>
                                <td>{roundDisplay(weakenedDamage.activeI)}</td>
                                <td>{roundDisplay(critDamage.activeI)}</td>
                                <td>{companionData.activeSkill_IFormula || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.activeII > 0 ||
                            companionData.activeSkill_IIFormula) && (
                            <tr>
                                <th>Active Skill II</th>
                                <td>{roundDisplay(baseDamage.activeII)}</td>
                                <td>{roundDisplay(weakenedDamage.activeII)}</td>
                                <td>{roundDisplay(critDamage.activeII)}</td>
                                <td>{companionData.activeSkill_IIFormula || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.activeII2 > 0 ||
                            companionData.activeSkill_IIFormula2) && (
                            <tr>
                                <th>Active Skill II Additional</th>
                                <td>{roundDisplay(baseDamage.activeII2)}</td>
                                <td>{roundDisplay(weakenedDamage.activeII2)}</td>
                                <td>{roundDisplay(critDamage.activeII2)}</td>
                                <td>{companionData.activeSkill_IIFormula2 || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.activeIII > 0 ||
                            companionData.activeSkill_IIIFormula) && (
                            <tr>
                                <th>Active Skill III</th>
                                <td>{roundDisplay(baseDamage.activeIII)}</td>
                                <td>{roundDisplay(weakenedDamage.activeIII)}</td>
                                <td>{roundDisplay(critDamage.activeIII)}</td>
                                <td>{companionData.activeSkill_IIIFormula || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.activeIII2 > 0 ||
                            companionData.activeSkill_IIIFormula2) && (
                            <tr>
                                <th>Active Skill III Additional</th>
                                <td>{roundDisplay(baseDamage.activeIII2)}</td>
                                <td>{roundDisplay(weakenedDamage.activeIII2)}</td>
                                <td>{roundDisplay(critDamage.activeIII2)}</td>
                                <td>{companionData.activeSkill_IIIFormula2 || "—"}</td>
                            </tr>
                        )}
                    </>
                )}

                {/* Basic Attack - всегда показываем заголовок, если есть оружие */}
                {selectedMCWeapon && (
                    <>
                        <tr>
                            <th className={styles.titleSkill}>Basic Attack:</th>
                        </tr>

                        {(baseDamage.basic1 > 0 || weaponData.basicFirstStrike) && (
                            <tr>
                                <th>First Strike</th>
                                <td>{roundDisplay(baseDamage.basic1)}</td>
                                <td>{roundDisplay(weakenedDamage.basic1)}</td>
                                <td>{roundDisplay(critDamage.basic1)}</td>
                                <td>{weaponData.basicFirstStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basic2 > 0 || weaponData.basicSecondStrike) && (
                            <tr>
                                <th>Second Strike</th>
                                <td>{roundDisplay(baseDamage.basic2)}</td>
                                <td>{roundDisplay(weakenedDamage.basic2)}</td>
                                <td>{roundDisplay(critDamage.basic2)}</td>
                                <td>{weaponData.basicSecondStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basic3 > 0 || weaponData.basicThirdStrike) && (
                            <tr>
                                <th>Third Strike</th>
                                <td>{roundDisplay(baseDamage.basic3)}</td>
                                <td>{roundDisplay(weakenedDamage.basic3)}</td>
                                <td>{roundDisplay(critDamage.basic3)}</td>
                                <td>{weaponData.basicThirdStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basic4 > 0 || weaponData.basicFourthStrike) && (
                            <tr>
                                <th>Fourth Strike</th>
                                <td>{roundDisplay(baseDamage.basic4)}</td>
                                <td>{roundDisplay(weakenedDamage.basic4)}</td>
                                <td>{roundDisplay(critDamage.basic4)}</td>
                                <td>{weaponData.basicFourthStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basic5 > 0 || weaponData.basicFifthStrike) && (
                            <tr>
                                <th>Fifth Strike</th>
                                <td>{roundDisplay(baseDamage.basic5)}</td>
                                <td>{roundDisplay(weakenedDamage.basic5)}</td>
                                <td>{roundDisplay(critDamage.basic5)}</td>
                                <td>{weaponData.basicFifthStrike || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basicTotal > 0 || weaponData.basicAttackFormula) && (
                            <tr>
                                <th>Basic Attack (Total DMG)</th>
                                <td>{roundDisplay(baseDamage.basicTotal)}</td>
                                <td>{roundDisplay(weakenedDamage.basicTotal)}</td>
                                <td>{roundDisplay(critDamage.basicTotal)}</td>
                                <td>{weaponData.basicAttackFormula || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basicCharged > 0 ||
                            weaponData.basicChargedAttack) && (
                            <tr>
                                <th>Charged Attack</th>
                                <td>{roundDisplay(baseDamage.basicCharged)}</td>
                                <td>{roundDisplay(weakenedDamage.basicCharged)}</td>
                                <td>{roundDisplay(critDamage.basicCharged)}</td>
                                <td>{weaponData.basicChargedAttack || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.basicCharged2 > 0 ||
                            weaponData.basicChargedAttack2) && (
                            <tr>
                                <th>Charged Attack Additional</th>
                                <td>{roundDisplay(baseDamage.basicCharged2)}</td>
                                <td>{roundDisplay(weakenedDamage.basicCharged2)}</td>
                                <td>{roundDisplay(critDamage.basicCharged2)}</td>
                                <td>{weaponData.basicChargedAttack2 || "—"}</td>
                            </tr>
                        )}

                        <tr>
                            <th className={styles.titleSkill}>Active Skill:</th>
                        </tr>

                        {(baseDamage.active1 > 0 || weaponData.activeSkillFormula) && (
                            <tr>
                                <th>Active Skill</th>
                                <td>{roundDisplay(baseDamage.active1)}</td>
                                <td>{roundDisplay(weakenedDamage.active1)}</td>
                                <td>{roundDisplay(critDamage.active1)}</td>
                                <td>{weaponData.activeSkillFormula || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.active2 > 0 ||
                            weaponData.activeSkillSecondFormula) && (
                            <tr>
                                <th>Active Skill Additional</th>
                                <td>{roundDisplay(baseDamage.active2)}</td>
                                <td>{roundDisplay(weakenedDamage.active2)}</td>
                                <td>{roundDisplay(critDamage.active2)}</td>
                                <td>{weaponData.activeSkillSecondFormula || "—"}</td>
                            </tr>
                        )}

                        {(baseDamage.passiveMC > 0 ||
                            weaponData.passiveSkillMCFormula) && (
                            <tr>
                                <th>Passive Skill (MC)</th>
                                <td>{roundDisplay(baseDamage.passiveMC)}</td>
                                <td>{roundDisplay(weakenedDamage.passiveMC)}</td>
                                <td>{roundDisplay(critDamage.passiveMC)}</td>
                                <td>{weaponData.passiveSkillMCFormula || "—"}</td>
                            </tr>
                        )}
                    </>
                )}
                </tbody>
            </table>
        </section>
    );
}

export default KitCombatTable;