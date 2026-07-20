import {compDataShowcaseDefault, compDataShowcaseSpecific} from "../data/comp-data-showcase.js";
import {createDamageCalculator} from "../data/damageCalculator.js";
import styles from "./CombatCalculations.module.css";
import React from "react";

function CombatCalculations() {
    const specificData = compDataShowcaseSpecific[0] || {};

    // Пример статов (можно взять из вашего приложения)
    const exampleStats = {
        hp: 1,
        atk: 1,
        def: 1
    };

    const damage = {
        support: createDamageCalculator(specificData.supportSkillStats)(exampleStats),
        empoweredSupport: createDamageCalculator(specificData.empoweredSupportSkillStats)(exampleStats),
        resonance: createDamageCalculator(specificData.resonanceSkillStats)(exampleStats),
        ardentOath: createDamageCalculator(specificData.ardentOathStats)(exampleStats),
        passive1: createDamageCalculator(specificData.passiveSkillStats1)(exampleStats),
        passive2: createDamageCalculator(specificData.passiveSkillStats2)(exampleStats),
        basic1: createDamageCalculator(specificData.basicFirstStrikeStats)(exampleStats),
        basic2: createDamageCalculator(specificData.basicSecondStrikeStats)(exampleStats),
        basic3: createDamageCalculator(specificData.basicThirdStrikeStats)(exampleStats),
        basic4: createDamageCalculator(specificData.basicFourthStrikeStats)(exampleStats),
        basicCharged: createDamageCalculator(specificData.basicChargedAttackStats)(exampleStats),
        active1: createDamageCalculator(specificData.activeSkillStats)(exampleStats),
        active2: createDamageCalculator(specificData.activeSkillSecondStats)(exampleStats),
    };

    return (
        <section>
            <h2>Combat Calculations:</h2>

            <table className={styles.statsTable}>
                <thead>
                <tr>
                    <th>Pair Bonus: </th>
                    <th>Default Buffs</th>
                    <th>Companion Buffs</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Starring Effect</th>
                    <td>{compDataShowcaseDefault.eidolon0}</td>
                    <td>{specificData.buffEidolon0Formula}</td>
                </tr>
                <tr>
                    <th>Duo Rank 1</th>
                    <td>{compDataShowcaseDefault.eidolon1}</td>
                    <td>{specificData.buffEidolon1Formula}</td>
                </tr>
                <tr>
                    <th>Duo Rank 2</th>
                    <td>{compDataShowcaseDefault.eidolon2}</td>
                    <td>{specificData.buffEidolon2Formula}</td>
                </tr>
                <tr>
                    <th>Duo Rank 3</th>
                    <td>{compDataShowcaseDefault.eidolon3}</td>
                    <td>{specificData.buffEidolon3Formula}</td>
                </tr>

                </tbody>
            </table>

            <table className={styles.statsTable}>
                <thead>
                <tr>
                    <th> </th>
                    <th>Base</th>
                    <th>Weakened DMG</th>
                    <th>Crit DMG</th>
                    <th>Formula</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Support Skill</th>
                    <td>{damage.support}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.supportSkillFormula}</td>
                </tr>
                <tr>
                    <th>Empowered Support Skill</th>
                    <td>{damage.empoweredSupport}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.empoweredSupportSkillFormula}</td>
                </tr>
                <tr>
                    <th>Resonance Skill</th>
                    <td>{damage.resonance}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.resonanceSkillFormula}</td>
                </tr>
                <tr>
                    <th>Ardent Oath</th>
                    <td>{damage.ardentOath}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.ardentOathFormula}</td>
                </tr>
                <tr>
                    <th>Passive Skill (Companion):</th>
                </tr>
                <tr>
                    <th>Companion Passive Skill</th>
                    <td>{damage.passive1}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.passiveSkillFormula1}</td>
                </tr>
                <tr>
                    <th>MC Passive Skill</th>
                    <td>{damage.passive2}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.passiveSkillFormula2}</td>
                </tr>
                <tr>
                    <th>Active Skill:</th>
                </tr>
                <tr>
                    <th>Active Skill First Attack</th>
                    <td>{damage.active1}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.activeSkillFormula}</td>
                </tr>
                <tr>
                    <th>Active Skill Second Attack</th>
                    <td>{damage.active2}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.activeSkillSecondFormula}</td>
                </tr>
                <tr>
                    <th>Basic Attack:</th>
                </tr>
                <tr>
                    <th>First Strike</th>
                    <td>{damage.basic1}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.basicFirstStrike}</td>
                </tr>
                <tr>
                    <th>Second Strike</th>
                    <td>{damage.basic2}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.basicSecondStrike}</td>
                </tr>
                <tr>
                    <th>Third Strike</th>
                    <td>{damage.basic3}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.basicThirdStrike}</td>
                </tr>
                <tr>
                    <th>Fourth Strike</th>
                    <td>{damage.basic4}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.basicFourthStrike}</td>
                </tr>
                <tr>
                    <th>Charged Attack</th>
                    <td>{damage.basicCharged}</td>
                    <td></td>
                    <td></td>
                    <td>{specificData.basicChargedAttack}</td>
                </tr>
                </tbody>
            </table>

        </section>
    )
}

export default CombatCalculations;