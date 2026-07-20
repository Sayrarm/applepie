import {compDataShowcaseDefault, compDataShowcaseSpecific} from "../data/comp-data-showcase.js";
import {calculateCritDamage, calculateWeakenedDamage, createDamageCalculator} from "../data/damageCalculator.js";
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

    // Параметры для расчетов
    const dmgBoostToWeakened = 50; // 50% DMG Boost to Weakened
    const critDmg = 150; // 150% критический урон

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
    // Рассчитываем Weakened DMG для каждой способности
    const weakenedDamage = {
        support: calculateWeakenedDamage(damage.support, dmgBoostToWeakened),
        empoweredSupport: calculateWeakenedDamage(damage.empoweredSupport, dmgBoostToWeakened),
        resonance: calculateWeakenedDamage(damage.resonance, dmgBoostToWeakened),
        ardentOath: calculateWeakenedDamage(damage.ardentOath, dmgBoostToWeakened),
        passive1: calculateWeakenedDamage(damage.passive1, dmgBoostToWeakened),
        passive2: calculateWeakenedDamage(damage.passive2, dmgBoostToWeakened),
        basic1: calculateWeakenedDamage(damage.basic1, dmgBoostToWeakened),
        basic2: calculateWeakenedDamage(damage.basic2, dmgBoostToWeakened),
        basic3: calculateWeakenedDamage(damage.basic3, dmgBoostToWeakened),
        basic4: calculateWeakenedDamage(damage.basic4, dmgBoostToWeakened),
        basicCharged: calculateWeakenedDamage(damage.basicCharged, dmgBoostToWeakened),
        active1: calculateWeakenedDamage(damage.active1, dmgBoostToWeakened),
        active2: calculateWeakenedDamage(damage.active2, dmgBoostToWeakened),
    };

    const critDamage = {
        support: calculateCritDamage(damage.support, critDmg),
        empoweredSupport: calculateCritDamage(damage.empoweredSupport, critDmg),
        resonance: calculateCritDamage(damage.resonance, critDmg),
        ardentOath: calculateCritDamage(damage.ardentOath, critDmg),
        passive1: calculateCritDamage(damage.passive1, critDmg),
        passive2: calculateCritDamage(damage.passive2, critDmg),
        basic1: calculateCritDamage(damage.basic1, critDmg),
        basic2: calculateCritDamage(damage.basic2, critDmg),
        basic3: calculateCritDamage(damage.basic3, critDmg),
        basic4: calculateCritDamage(damage.basic4, critDmg),
        basicCharged: calculateCritDamage(damage.basicCharged, critDmg),
        active1: calculateCritDamage(damage.active1, critDmg),
        active2: calculateCritDamage(damage.active2, critDmg),
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
                    <th>Buffs</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Support Skill</th>
                    <td>{damage.support}</td>
                    <td>{weakenedDamage.support}</td>
                    <td>{critDamage.support}</td>
                    <td>{specificData.supportSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Empowered Support Skill</th>
                    <td>{damage.empoweredSupport}</td>
                    <td>{weakenedDamage.empoweredSupport}</td>
                    <td>{critDamage.empoweredSupport}</td>
                    <td>{specificData.empoweredSupportSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Resonance Skill</th>
                    <td>{damage.resonance}</td>
                    <td>{weakenedDamage.resonance}</td>
                    <td>{critDamage.resonance}</td>
                    <td>{specificData.resonanceSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Ardent Oath</th>
                    <td>{damage.ardentOath}</td>
                    <td>{weakenedDamage.ardentOath}</td>
                    <td>{critDamage.ardentOath}</td>
                    <td>{specificData.ardentOathFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Passive Skill (Companion):</th>
                </tr>
                <tr>
                    <th>Companion Passive Skill</th>
                    <td>{damage.passive1}</td>
                    <td>{weakenedDamage.passive1}</td>
                    <td>{critDamage.passive1}</td>
                    <td>{specificData.passiveSkillFormula1}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>MC Passive Skill</th>
                    <td>{damage.passive2}</td>
                    <td>{weakenedDamage.passive2}</td>
                    <td>{critDamage.passive2}</td>
                    <td>{specificData.passiveSkillFormula2}</td>
                    <td>{specificData.buffPassiveSkillFormula}</td>
                </tr>
                <tr>
                    <th>Active Skill:</th>
                </tr>
                <tr>
                    <th>Active Skill First Attack</th>
                    <td>{damage.active1}</td>
                    <td>{weakenedDamage.active1}</td>
                    <td>{critDamage.active1}</td>
                    <td>{specificData.activeSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Active Skill Second Attack</th>
                    <td>{damage.active2}</td>
                    <td>{weakenedDamage.active2}</td>
                    <td>{critDamage.active2}</td>
                    <td>{specificData.activeSkillSecondFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Basic Attack:</th>
                </tr>
                <tr>
                    <th>First Strike</th>
                    <td>{damage.basic1}</td>
                    <td>{weakenedDamage.basic1}</td>
                    <td>{critDamage.basic1}</td>
                    <td>{specificData.basicFirstStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Second Strike</th>
                    <td>{damage.basic2}</td>
                    <td>{weakenedDamage.basic2}</td>
                    <td>{critDamage.basic2}</td>
                    <td>{specificData.basicSecondStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Third Strike</th>
                    <td>{damage.basic3}</td>
                    <td>{weakenedDamage.basic3}</td>
                    <td>{critDamage.basic3}</td>
                    <td>{specificData.basicThirdStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Fourth Strike</th>
                    <td>{damage.basic4}</td>
                    <td>{weakenedDamage.basic4}</td>
                    <td>{critDamage.basic4}</td>
                    <td>{specificData.basicFourthStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Charged Attack</th>
                    <td>{damage.basicCharged}</td>
                    <td>{weakenedDamage.basicCharged}</td>
                    <td>{critDamage.basicCharged}</td>
                    <td>{specificData.basicChargedAttack}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>

        </section>
    )
}

export default CombatCalculations;