import {compDataShowcaseDefault, compDataShowcaseSpecific} from "../data/comp-data-showcase.js";

import styles from "./CombatCalculations.module.css";
import React from "react";
import {calculateCritDamage, calculateWeakenedDamage, createDamageCalculator} from "../data/damageCalculator.js";

function CombatCalculations({ stats }) {
    const specificData = compDataShowcaseSpecific[0] || {};

    // Используем переданные статы из Showcase
    const companionStats = {
        hp: stats?.hp || 1,
        atk: stats?.atk || 1,
        def: stats?.def || 1
    };

    // Используем переданные статы из Showcase для расчетов
    const dmgBoostToWeakened = stats?.dmgBoost || 0;
    const critDmg = stats?.critDmg || 0;
    const oathStrength = stats?.oathStrength || 0;

    const baseDamage = {
        support: createDamageCalculator(specificData.supportSkillStats)(companionStats),
        empoweredSupport: createDamageCalculator(specificData.empoweredSupportSkillStats)(companionStats),
        resonance: createDamageCalculator(specificData.resonanceSkillStats)(companionStats),
        ardentOath: createDamageCalculator(specificData.ardentOathStats)(companionStats) * (1 + oathStrength / 100),
        passive1: createDamageCalculator(specificData.passiveSkillStats1)(companionStats),
        passive2: createDamageCalculator(specificData.passiveSkillStats2)(companionStats),
        basic1: createDamageCalculator(specificData.basicFirstStrikeStats)(companionStats),
        basic2: createDamageCalculator(specificData.basicSecondStrikeStats)(companionStats),
        basic3: createDamageCalculator(specificData.basicThirdStrikeStats)(companionStats),
        basic4: createDamageCalculator(specificData.basicFourthStrikeStats)(companionStats),
        basicCharged: createDamageCalculator(specificData.basicChargedAttackStats)(companionStats),
        active1: createDamageCalculator(specificData.activeSkillStats)(companionStats),
        active2: createDamageCalculator(specificData.activeSkillSecondStats)(companionStats),
    };

    // Рассчитываем Weakened DMG для каждой способности
    const weakenedDamage = {
        support: calculateWeakenedDamage(baseDamage.support, dmgBoostToWeakened),
        empoweredSupport: calculateWeakenedDamage(baseDamage.empoweredSupport, dmgBoostToWeakened),
        resonance: calculateWeakenedDamage(baseDamage.resonance, dmgBoostToWeakened),
        ardentOath: calculateWeakenedDamage(baseDamage.ardentOath, dmgBoostToWeakened),
        passive1: calculateWeakenedDamage(baseDamage.passive1, dmgBoostToWeakened),
        passive2: calculateWeakenedDamage(baseDamage.passive2, dmgBoostToWeakened),
        basic1: calculateWeakenedDamage(baseDamage.basic1, dmgBoostToWeakened),
        basic2: calculateWeakenedDamage(baseDamage.basic2, dmgBoostToWeakened),
        basic3: calculateWeakenedDamage(baseDamage.basic3, dmgBoostToWeakened),
        basic4: calculateWeakenedDamage(baseDamage.basic4, dmgBoostToWeakened),
        basicCharged: calculateWeakenedDamage(baseDamage.basicCharged, dmgBoostToWeakened),
        active1: calculateWeakenedDamage(baseDamage.active1, dmgBoostToWeakened),
        active2: calculateWeakenedDamage(baseDamage.active2, dmgBoostToWeakened),
    };

    const critDamage = {
        support: calculateCritDamage(baseDamage.support, critDmg),
        empoweredSupport: calculateCritDamage(baseDamage.empoweredSupport, critDmg),
        resonance: calculateCritDamage(baseDamage.resonance, critDmg),
        ardentOath: calculateCritDamage(baseDamage.ardentOath, critDmg),
        passive1: calculateCritDamage(baseDamage.passive1, critDmg),
        passive2: calculateCritDamage(baseDamage.passive2, critDmg),
        basic1: calculateCritDamage(baseDamage.basic1, critDmg),
        basic2: calculateCritDamage(baseDamage.basic2, critDmg),
        basic3: calculateCritDamage(baseDamage.basic3, critDmg),
        basic4: calculateCritDamage(baseDamage.basic4, critDmg),
        basicCharged: calculateCritDamage(baseDamage.basicCharged, critDmg),
        active1: calculateCritDamage(baseDamage.active1, critDmg),
        active2: calculateCritDamage(baseDamage.active2, critDmg),
    };

    // Вспомогательная функция для округления при отображении
    const roundDisplay = (value) => Math.round(value);

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
                    <td>{roundDisplay(baseDamage.support)}</td>
                    <td>{roundDisplay(weakenedDamage.support)}</td>
                    <td>{roundDisplay(critDamage.support)}</td>
                    <td>{specificData.supportSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Empowered Support Skill</th>
                    <td>{roundDisplay(baseDamage.empoweredSupport)}</td>
                    <td>{roundDisplay(weakenedDamage.empoweredSupport)}</td>
                    <td>{roundDisplay(critDamage.empoweredSupport)}</td>
                    <td>{specificData.empoweredSupportSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Resonance Skill</th>
                    <td>{roundDisplay(baseDamage.resonance)}</td>
                    <td>{roundDisplay(weakenedDamage.resonance)}</td>
                    <td>{roundDisplay(critDamage.resonance)}</td>
                    <td>{specificData.resonanceSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Ardent Oath</th>
                    <td>{roundDisplay(baseDamage.ardentOath)}</td>
                    <td>{roundDisplay(weakenedDamage.ardentOath)}</td>
                    <td>{roundDisplay(critDamage.ardentOath)}</td>
                    <td>{specificData.ardentOathFormula}</td>
                    <td>+{oathStrength}% Oath Strength</td>
                </tr>
                <tr>
                    <th>Passive Skill (Companion):</th>
                </tr>
                <tr>
                    <th>Companion Passive Skill</th>
                    <td>{roundDisplay(baseDamage.passive1)}</td>
                    <td>{roundDisplay(weakenedDamage.passive1)}</td>
                    <td>{roundDisplay(critDamage.passive1)}</td>
                    <td>{specificData.passiveSkillFormula1}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>MC Passive Skill</th>
                    <td>{roundDisplay(baseDamage.passive2)}</td>
                    <td>{roundDisplay(weakenedDamage.passive2)}</td>
                    <td>{roundDisplay(critDamage.passive2)}</td>
                    <td>{specificData.passiveSkillFormula2}</td>
                    <td>{specificData.buffPassiveSkillFormula}</td>
                </tr>
                <tr>
                    <th>Active Skill:</th>
                </tr>
                <tr>
                    <th>Active Skill First Attack</th>
                    <td>{roundDisplay(baseDamage.active1)}</td>
                    <td>{roundDisplay(weakenedDamage.active1)}</td>
                    <td>{roundDisplay(critDamage.active1)}</td>
                    <td>{specificData.activeSkillFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Active Skill Second Attack</th>
                    <td>{roundDisplay(baseDamage.active2)}</td>
                    <td>{roundDisplay(weakenedDamage.active2)}</td>
                    <td>{roundDisplay(critDamage.active2)}</td>
                    <td>{specificData.activeSkillSecondFormula}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Basic Attack:</th>
                </tr>
                <tr>
                    <th>First Strike</th>
                    <td>{roundDisplay(baseDamage.basic1)}</td>
                    <td>{roundDisplay(weakenedDamage.basic1)}</td>
                    <td>{roundDisplay(critDamage.basic1)}</td>
                    <td>{specificData.basicFirstStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Second Strike</th>
                    <td>{roundDisplay(baseDamage.basic2)}</td>
                    <td>{roundDisplay(weakenedDamage.basic2)}</td>
                    <td>{roundDisplay(critDamage.basic2)}</td>
                    <td>{specificData.basicSecondStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Third Strike</th>
                    <td>{roundDisplay(baseDamage.basic3)}</td>
                    <td>{roundDisplay(weakenedDamage.basic3)}</td>
                    <td>{roundDisplay(critDamage.basic3)}</td>
                    <td>{specificData.basicThirdStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Fourth Strike</th>
                    <td>{roundDisplay(baseDamage.basic4)}</td>
                    <td>{roundDisplay(weakenedDamage.basic4)}</td>
                    <td>{roundDisplay(critDamage.basic4)}</td>
                    <td>{specificData.basicFourthStrike}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Charged Attack</th>
                    <td>{roundDisplay(baseDamage.basicCharged)}</td>
                    <td>{roundDisplay(weakenedDamage.basicCharged)}</td>
                    <td>{roundDisplay(critDamage.basicCharged)}</td>
                    <td>{specificData.basicChargedAttack}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>

        </section>
    )
}

export default CombatCalculations;