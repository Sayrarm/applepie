import {
    compDataShowcaseDefault5star,
    compDataShowcaseSpecific
} from "../data/comp-data-showcase.js";
import {Range} from 'react-range';
import styles from "./CombatCalculations.module.css";
import React, {useState} from "react";
import {calculateCritDamage, calculateWeakenedDamage, createDamageCalculator} from "../data/damageCalculator.js";

function CombatCalculations({ stats }) {
    const specificData = compDataShowcaseSpecific[0] || {};

    // Состояния для Additional Bonus
    const [isAttributeBonus, setIsAttributeBonus] = useState(false);
    const [stellactrumCount, setStellactrumCount] = useState(0);
    const [isPerfectMatch, setIsPerfectMatch] = useState(false);

    // Используем переданные статы из Showcase
    const companionStats = {
        hp: stats?.hp || 1,
        atk: stats?.atk || 1,
        def: stats?.def || 1
    };

    // Используем переданные статы из Showcase для расчетов
    const dmgBoostToWeakened = Number((stats?.dmgBoost || 0).toFixed(2));
    const critDmg = stats?.critDmg || 0;
    const oathStrength = stats?.oathStrength || 0;

    // Additional Bonus: Attribute Bonus
    const attributeBonus = isAttributeBonus ? stellactrumCount * 5 : 0;

    // Additional Bonus: Perfect Match
    const perfectMatchBonus = isPerfectMatch ? 100 : 0;

    // Добавляем бонусы к DMG Boost to Weakened
    const totalDmgBoostToWeakened = dmgBoostToWeakened + perfectMatchBonus;

    //для теста
    console.log('ATK:', companionStats.atk);
    console.log('HP:', companionStats.hp);
    console.log('Ardent Oath base:', createDamageCalculator(specificData.ardentOathStats)(companionStats));
    console.log('DMG Boost to Weakened:', dmgBoostToWeakened);
    console.log('Oath Strength:', oathStrength);

    const baseDamage = {
        support: createDamageCalculator(specificData.supportSkillStats)(companionStats) * (1 + attributeBonus / 100),
        empoweredSupport: createDamageCalculator(specificData.empoweredSupportSkillStats)(companionStats) * (1 + attributeBonus / 100),
        resonance: createDamageCalculator(specificData.resonanceSkillStats)(companionStats) * (1 + attributeBonus / 100),
        ardentOath: createDamageCalculator(specificData.ardentOathStats)(companionStats) * (1 + oathStrength / 100) * (1 + attributeBonus / 100),
        passive1: createDamageCalculator(specificData.passiveSkillStats1)(companionStats) * (1 + attributeBonus / 100),
        passive2: createDamageCalculator(specificData.passiveSkillStats2)(companionStats) * (1 + attributeBonus / 100),
        basic1: createDamageCalculator(specificData.basicFirstStrikeStats)(companionStats) * (1 + attributeBonus / 100),
        basic2: createDamageCalculator(specificData.basicSecondStrikeStats)(companionStats) * (1 + attributeBonus / 100),
        basic3: createDamageCalculator(specificData.basicThirdStrikeStats)(companionStats) * (1 + attributeBonus / 100),
        basic4: createDamageCalculator(specificData.basicFourthStrikeStats)(companionStats) * (1 + attributeBonus / 100),
        basicCharged: createDamageCalculator(specificData.basicChargedAttackStats)(companionStats) * (1 + attributeBonus / 100),
        active1: createDamageCalculator(specificData.activeSkillStats)(companionStats) * (1 + attributeBonus / 100),
        active2: createDamageCalculator(specificData.activeSkillSecondStats)(companionStats) * (1 + attributeBonus / 100),
    };

    // Рассчитываем Weakened DMG для каждой способности
    const weakenedDamage = {
        support: calculateWeakenedDamage(baseDamage.support, totalDmgBoostToWeakened),
        empoweredSupport: calculateWeakenedDamage(baseDamage.empoweredSupport, totalDmgBoostToWeakened),
        resonance: calculateWeakenedDamage(baseDamage.resonance, totalDmgBoostToWeakened),
        ardentOath: calculateWeakenedDamage(baseDamage.ardentOath, totalDmgBoostToWeakened),
        passive1: calculateWeakenedDamage(baseDamage.passive1, totalDmgBoostToWeakened),
        passive2: calculateWeakenedDamage(baseDamage.passive2, totalDmgBoostToWeakened),
        basic1: calculateWeakenedDamage(baseDamage.basic1, totalDmgBoostToWeakened),
        basic2: calculateWeakenedDamage(baseDamage.basic2, totalDmgBoostToWeakened),
        basic3: calculateWeakenedDamage(baseDamage.basic3, totalDmgBoostToWeakened),
        basic4: calculateWeakenedDamage(baseDamage.basic4, totalDmgBoostToWeakened),
        basicCharged: calculateWeakenedDamage(baseDamage.basicCharged, totalDmgBoostToWeakened),
        active1: calculateWeakenedDamage(baseDamage.active1, totalDmgBoostToWeakened),
        active2: calculateWeakenedDamage(baseDamage.active2, totalDmgBoostToWeakened),
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
        <section className={styles.container}>
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
                    <td>{compDataShowcaseDefault5star.eidolon0}</td>
                    <td>{specificData.buffEidolon0Formula}</td>
                </tr>
                <tr>
                    <th>Duo Rank 1</th>
                    <td>{compDataShowcaseDefault5star.eidolon1}</td>
                    <td>{specificData.buffEidolon1Formula}</td>
                </tr>
                <tr>
                    <th>Duo Rank 2</th>
                    <td>{compDataShowcaseDefault5star.eidolon2}</td>
                    <td>{specificData.buffEidolon2Formula}</td>
                </tr>
                <tr>
                    <th>Duo Rank 3</th>
                    <td>{compDataShowcaseDefault5star.eidolon3}</td>
                    <td>{specificData.buffEidolon3Formula}</td>
                </tr>
                </tbody>
            </table>

            {/* Additional Bonus Section */}
            <div className={styles.additionalBonus}>
                <h3>Additional Bonus:</h3>

                <div className={styles.bonusRow}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={isAttributeBonus}
                            onChange={(e) => setIsAttributeBonus(e.target.checked)}
                        />
                        Attribute Bonus: (For each matched Stellactrum, increases DMG Boost 5.0% and DMG Reduction 5.0%)
                    </label>
                    {isAttributeBonus && (
                        <div className={styles.rangeContainer}>
                            <span className={styles.rangeLabel}>Stellactrum count: {stellactrumCount}</span>
                            <Range
                                step={1}
                                min={0}
                                max={6}
                                values={[stellactrumCount]}
                                onChange={(values) => setStellactrumCount(values[0])}
                                renderTrack={({props, children}) => (
                                    <div
                                        {...props}
                                        className={styles.track}
                                    >
                                        <div
                                            className={styles.trackFilled}
                                            style={{
                                                width: `${((stellactrumCount - 1) / 5) * 100}%`
                                            }}
                                        />
                                        {children}
                                    </div>
                                )}
                                renderThumb={({props}) => {
                                    const {key, ...rest} = props;
                                    return (
                                        <div
                                            key={key}
                                            {...rest}
                                            className={styles.point}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.bonusRow}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={isPerfectMatch}
                            onChange={(e) => setIsPerfectMatch(e.target.checked)}
                        />
                        Perfect Match: (Double the number of Protocore Shield stacks destroyed. DMG Boost to Weakened enemies increased by 100%)
                    </label>
                </div>
            </div>

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
                    <td></td>
                </tr>
                <tr>
                    <th className={styles.titleSkill}>Passive Skill (Companion):</th>
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
                    <th className={styles.titleSkill}>Active Skill:</th>
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
                    <th className={styles.titleSkill}>Basic Attack:</th>
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