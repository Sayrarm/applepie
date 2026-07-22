import {
    compDataShowcaseDefault5star,
    compDataShowcaseDefault4star,
    compDataShowcaseSpecific,
    weaponDataShowcaseSpecific
} from "../data/comp-data-showcase.js";
import {Range} from 'react-range';
import styles from "./CombatCalculations.module.css";
import React, {useState, useMemo} from "react";
import {calculateCritDamage, calculateWeakenedDamage, createDamageCalculator} from "../data/damageCalculator.js";

function CombatCalculations({ stats, selectedCompanion, selectedMCWeapon, solarCards }) {
    // Находим данные для выбранного компаньона по companionName
    const companionData = useMemo(() => {
        if (!selectedCompanion?.companionName) return {};
        return compDataShowcaseSpecific.find(
            item => item.companionName === selectedCompanion.companionName
        ) || {};
    }, [selectedCompanion]);

    // Находим данные для выбранного оружия по weaponName
    const weaponData = useMemo(() => {
        if (!selectedMCWeapon?.weaponName) return {};
        return weaponDataShowcaseSpecific.find(
            item => item.weaponName === selectedMCWeapon.weaponName
        ) || {};
    }, [selectedMCWeapon]);

    // Проверяем, есть ли у нас полный набор Solar карточек (2 карточки с нужными cardIds)
    const hasSolarPair = useMemo(() => {
        if (!companionData.cardIds || solarCards.length < 2) return false;

        const requiredCardIds = companionData.cardIds || [];
        if (requiredCardIds.length === 0) return false;

        const solarCardIds = solarCards
            .filter(card => card !== null)
            .map(card => card.id);

        const sortedRequired = [...requiredCardIds].sort();
        const sortedSolar = [...solarCardIds].sort();

        return sortedRequired.length === sortedSolar.length &&
            sortedRequired.every((id, index) => id === sortedSolar[index]);
    }, [companionData.cardIds, solarCards]);

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

    // Базовый урон для всех способностей
    const baseDamage = {
        // Companion skills (из companionData)
        support: companionData.supportSkillStats
            ? createDamageCalculator(companionData.supportSkillStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        empoweredSupport: companionData.empoweredSupportSkillStats
            ? createDamageCalculator(companionData.empoweredSupportSkillStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        resonance: companionData.resonanceSkillStats
            ? createDamageCalculator(companionData.resonanceSkillStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        ardentOath: companionData.ardentOathStats
            ? createDamageCalculator(companionData.ardentOathStats)(companionStats) * (1 + oathStrength / 100) * (1 + attributeBonus / 100)
            : 0,
        passive1: companionData.passiveSkillStats1
            ? createDamageCalculator(companionData.passiveSkillStats1)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        passive2: companionData.passiveSkillStats2
            ? createDamageCalculator(companionData.passiveSkillStats2)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        passive3: companionData.passiveSkillStats3
            ? createDamageCalculator(companionData.passiveSkillStats3)(companionStats) * (1 + attributeBonus / 100)
            : 0,

        // MC Weapon skills (из weaponData)
        basicTotal: weaponData.basicAttackFormula
            ? createDamageCalculator(weaponData.basicAttackStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        basic1: weaponData.basicFirstStrikeStats
            ? createDamageCalculator(weaponData.basicFirstStrikeStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        basic2: weaponData.basicSecondStrikeStats
            ? createDamageCalculator(weaponData.basicSecondStrikeStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        basic3: weaponData.basicThirdStrikeStats
            ? createDamageCalculator(weaponData.basicThirdStrikeStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        basic4: weaponData.basicFourthStrikeStats
            ? createDamageCalculator(weaponData.basicFourthStrikeStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        basic5: weaponData.basicFifthStrikeStats
            ? createDamageCalculator(weaponData.basicFifthStrikeStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        basicCharged: weaponData.basicChargedAttackStats
            ? createDamageCalculator(weaponData.basicChargedAttackStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        active1: weaponData.activeSkillStats
            ? createDamageCalculator(weaponData.activeSkillStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        active2: weaponData.activeSkillSecondStats
            ? createDamageCalculator(weaponData.activeSkillSecondStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        passiveMC: weaponData.passiveSkillMCStats
            ? createDamageCalculator(weaponData.passiveSkillMCStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
    };

    // Рассчитываем Weakened DMG для каждой способности
    const weakenedDamage = {
        support: calculateWeakenedDamage(baseDamage.support, totalDmgBoostToWeakened),
        empoweredSupport: calculateWeakenedDamage(baseDamage.empoweredSupport, totalDmgBoostToWeakened),
        resonance: calculateWeakenedDamage(baseDamage.resonance, totalDmgBoostToWeakened),
        ardentOath: calculateWeakenedDamage(baseDamage.ardentOath, totalDmgBoostToWeakened),
        passive1: calculateWeakenedDamage(baseDamage.passive1, totalDmgBoostToWeakened),
        passive2: calculateWeakenedDamage(baseDamage.passive2, totalDmgBoostToWeakened),
        passive3: calculateWeakenedDamage(baseDamage.passive3, totalDmgBoostToWeakened),
        basicTotal: calculateWeakenedDamage(baseDamage.basicTotal, totalDmgBoostToWeakened),
        basic1: calculateWeakenedDamage(baseDamage.basic1, totalDmgBoostToWeakened),
        basic2: calculateWeakenedDamage(baseDamage.basic2, totalDmgBoostToWeakened),
        basic3: calculateWeakenedDamage(baseDamage.basic3, totalDmgBoostToWeakened),
        basic4: calculateWeakenedDamage(baseDamage.basic4, totalDmgBoostToWeakened),
        basic5: calculateWeakenedDamage(baseDamage.basic5, totalDmgBoostToWeakened),
        basicCharged: calculateWeakenedDamage(baseDamage.basicCharged, totalDmgBoostToWeakened),
        active1: calculateWeakenedDamage(baseDamage.active1, totalDmgBoostToWeakened),
        active2: calculateWeakenedDamage(baseDamage.active2, totalDmgBoostToWeakened),
        passiveMC: calculateWeakenedDamage(baseDamage.passiveMC, totalDmgBoostToWeakened),
    };

    const critDamage = {
        support: calculateCritDamage(baseDamage.support, critDmg),
        empoweredSupport: calculateCritDamage(baseDamage.empoweredSupport, critDmg),
        resonance: calculateCritDamage(baseDamage.resonance, critDmg),
        ardentOath: calculateCritDamage(baseDamage.ardentOath, critDmg),
        passive1: calculateCritDamage(baseDamage.passive1, critDmg),
        passive2: calculateCritDamage(baseDamage.passive2, critDmg),
        passive3: calculateCritDamage(baseDamage.passive3, critDmg),
        basicTotal: calculateCritDamage(baseDamage.basicTotal, critDmg),
        basic1: calculateCritDamage(baseDamage.basic1, critDmg),
        basic2: calculateCritDamage(baseDamage.basic2, critDmg),
        basic3: calculateCritDamage(baseDamage.basic3, critDmg),
        basic4: calculateCritDamage(baseDamage.basic4, critDmg),
        basic5: calculateCritDamage(baseDamage.basic5, critDmg),
        basicCharged: calculateCritDamage(baseDamage.basicCharged, critDmg),
        active1: calculateCritDamage(baseDamage.active1, critDmg),
        active2: calculateCritDamage(baseDamage.active2, critDmg),
        passiveMC: calculateWeakenedDamage(baseDamage.passiveMC, critDmg),
    };

    // Вспомогательная функция для округления при отображении
    const roundDisplay = (value) => Math.round(value);

    // Определяем, какие default бонусы показывать (5-star или 4-star)
    const defaultBuffs = hasSolarPair ? compDataShowcaseDefault5star : compDataShowcaseDefault4star;

    // BuffPassiveSkillFormula берем из weaponData (если есть), иначе из companionData
    const buffPassiveSkillFormula = weaponData.buffPassiveSkillFormula || companionData.buffPassiveSkillFormula || '—';

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
                    <td>{defaultBuffs.eidolon0}</td>
                    <td>{hasSolarPair ? companionData.buffEidolon0Formula : '—'}</td>
                </tr>
                <tr>
                    <th>Duo Rank 1</th>
                    <td>{defaultBuffs.eidolon1}</td>
                    <td>{hasSolarPair ? companionData.buffEidolon1Formula : '—'}</td>
                </tr>
                <tr>
                    <th>Duo Rank 2</th>
                    <td>{defaultBuffs.eidolon2}</td>
                    <td>{hasSolarPair ? companionData.buffEidolon2Formula : '—'}</td>
                </tr>
                <tr>
                    <th>Duo Rank 3</th>
                    <td>{defaultBuffs.eidolon3}</td>
                    <td>{hasSolarPair ? companionData.buffEidolon3Formula : '—'}</td>
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
                    <td>{companionData.supportSkillFormula || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Empowered Support Skill</th>
                    <td>{roundDisplay(baseDamage.empoweredSupport)}</td>
                    <td>{roundDisplay(weakenedDamage.empoweredSupport)}</td>
                    <td>{roundDisplay(critDamage.empoweredSupport)}</td>
                    <td>{companionData.empoweredSupportSkillFormula || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Resonance Skill</th>
                    <td>{roundDisplay(baseDamage.resonance)}</td>
                    <td>{roundDisplay(weakenedDamage.resonance)}</td>
                    <td>{roundDisplay(critDamage.resonance)}</td>
                    <td>{companionData.resonanceSkillFormula || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Ardent Oath</th>
                    <td>{roundDisplay(baseDamage.ardentOath)}</td>
                    <td>{roundDisplay(weakenedDamage.ardentOath)}</td>
                    <td>{roundDisplay(critDamage.ardentOath)}</td>
                    <td>{companionData.ardentOathFormula || '—'}</td>
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
                    <td>{companionData.passiveSkillFormula1 || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>MC Passive Skill</th>
                    <td>{roundDisplay(baseDamage.passive2)}</td>
                    <td>{roundDisplay(weakenedDamage.passive2)}</td>
                    <td>{roundDisplay(critDamage.passive2)}</td>
                    <td>{companionData.passiveSkillFormula2 || '—'}</td>
                    <td>{buffPassiveSkillFormula}</td>
                </tr>
                <tr>
                    <th>MC Passive Skill</th>
                    <td>{roundDisplay(baseDamage.passive3)}</td>
                    <td>{roundDisplay(weakenedDamage.passive3)}</td>
                    <td>{roundDisplay(critDamage.passive3)}</td>
                    <td>{companionData.passiveSkillFormula3 || '—'}</td>
                    <td>{buffPassiveSkillFormula}</td>
                </tr>
                <tr>
                    <th className={styles.titleSkill}>Active Skill:</th>
                </tr>
                <tr>
                    <th>Active Skill First Attack</th>
                    <td>{roundDisplay(baseDamage.active1)}</td>
                    <td>{roundDisplay(weakenedDamage.active1)}</td>
                    <td>{roundDisplay(critDamage.active1)}</td>
                    <td>{weaponData.activeSkillFormula || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Active Skill Second Attack</th>
                    <td>{roundDisplay(baseDamage.active2)}</td>
                    <td>{roundDisplay(weakenedDamage.active2)}</td>
                    <td>{roundDisplay(critDamage.active2)}</td>
                    <td>{weaponData.activeSkillSecondFormula || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Basic Attack (Total DMG)</th>
                    <td>{roundDisplay(baseDamage.basicTotal)}</td>
                    <td>{roundDisplay(weakenedDamage.basicTotal)}</td>
                    <td>{roundDisplay(critDamage.basicTotal)}</td>
                    <td>{weaponData.basicAttackFormula || '—'}</td>
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
                    <td>{weaponData.basicFirstStrike || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Second Strike</th>
                    <td>{roundDisplay(baseDamage.basic2)}</td>
                    <td>{roundDisplay(weakenedDamage.basic2)}</td>
                    <td>{roundDisplay(critDamage.basic2)}</td>
                    <td>{weaponData.basicSecondStrike || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Third Strike</th>
                    <td>{roundDisplay(baseDamage.basic3)}</td>
                    <td>{roundDisplay(weakenedDamage.basic3)}</td>
                    <td>{roundDisplay(critDamage.basic3)}</td>
                    <td>{weaponData.basicThirdStrike || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Fourth Strike</th>
                    <td>{roundDisplay(baseDamage.basic4)}</td>
                    <td>{roundDisplay(weakenedDamage.basic4)}</td>
                    <td>{roundDisplay(critDamage.basic4)}</td>
                    <td>{weaponData.basicFourthStrike || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Fifth Strike</th>
                    <td>{roundDisplay(baseDamage.basic5)}</td>
                    <td>{roundDisplay(weakenedDamage.basic5)}</td>
                    <td>{roundDisplay(critDamage.basic5)}</td>
                    <td>{weaponData.basicFifthStrike || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Charged Attack</th>
                    <td>{roundDisplay(baseDamage.basicCharged)}</td>
                    <td>{roundDisplay(weakenedDamage.basicCharged)}</td>
                    <td>{roundDisplay(critDamage.basicCharged)}</td>
                    <td>{weaponData.buffBasicChargedAttackFormula || '—'}</td>
                    <td></td>
                </tr>
                <tr>
                    <th className={styles.titleSkill}>Passive Skill (MC):</th>
                </tr>
                <tr>
                    <th>Passive Skill</th>
                    <td>{roundDisplay(baseDamage.passiveMC)}</td>
                    <td>{roundDisplay(weakenedDamage.passiveMC)}</td>
                    <td>{roundDisplay(critDamage.passiveMC)}</td>
                    <td>{weaponData.passiveSkillMCFormula || '—'}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default CombatCalculations;