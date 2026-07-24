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
import {solar4Stars} from "../data/solar-4-star-info.js";

function CombatCalculations({stats, selectedCompanion, selectedMCWeapon, solarCards}) {
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

    // Получаем ID выбранных solar карточек
    const solarCardIds = useMemo(() => {
        return solarCards
            .filter(card => card !== null)
            .map(card => card.id)
            .sort((a, b) => a - b); // Сортировка чисел
    }, [solarCards]);

    // Находим компаньона с совпадающими cardIds (если есть)
    const matchingCompanion = useMemo(() => {
        if (solarCardIds.length < 2) return null;

        return compDataShowcaseSpecific.find(item => {
            if (!item.cardIds || item.cardIds.length === 0) return false;
            const sortedItemIds = [...item.cardIds].sort((a, b) => a - b);
            return sortedItemIds.length === solarCardIds.length &&
                sortedItemIds.every((id, index) => id === solarCardIds[index]);
        }) || null;
    }, [solarCardIds]);

    /// Проверяем, есть ли 5-star пара
    const hasSolarPair5Star = useMemo(() => {
        return matchingCompanion !== null;
    }, [matchingCompanion]);

    // Проверяем, есть ли 4-star пара
    const hasSolarPair4Star = useMemo(() => {
        if (solarCardIds.length < 2) return false;

        return solar4Stars.some(pair => {
            const sortedPairIds = [...pair.cardIds].sort((a, b) => a - b);
            return sortedPairIds.length === solarCardIds.length &&
                sortedPairIds.every((id, index) => id === solarCardIds[index]);
        });
    }, [solarCardIds]);

    // Определяем, есть ли вообще какая-либо пара
    const hasAnySolarPair = hasSolarPair5Star || hasSolarPair4Star;

    // Определяем, какие default бонусы показывать
    const defaultBuffs = hasSolarPair5Star
        ? compDataShowcaseDefault5star
        : hasSolarPair4Star
            ? compDataShowcaseDefault4star
            : null;

    // Проверяем, совпадает ли выбранный компаньон с найденной парой
    const isCompanionMatching = useMemo(() => {
        if (!selectedCompanion?.companionName || !matchingCompanion) return false;
        return matchingCompanion.companionName === selectedCompanion.companionName;
    }, [selectedCompanion, matchingCompanion]);

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
        support2: companionData.supportSkillStats2
            ? createDamageCalculator(companionData.supportSkillStats2)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        support3: companionData.supportSkillStats3
            ? createDamageCalculator(companionData.supportSkillStats3)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        empoweredSupport: companionData.empoweredSupportSkillStats
            ? createDamageCalculator(companionData.empoweredSupportSkillStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        empoweredSupport2: companionData.empoweredSupportSkillStats2
            ? createDamageCalculator(companionData.empoweredSupportSkillStats2)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        resonance: companionData.resonanceSkillStats
            ? createDamageCalculator(companionData.resonanceSkillStats)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        resonance2: companionData.resonanceSkillStats2
            ? createDamageCalculator(companionData.resonanceSkillStats2)(companionStats) * (1 + attributeBonus / 100)
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
        passive4: companionData.passiveSkillStats4
            ? createDamageCalculator(companionData.passiveSkillStats4)(companionStats) * (1 + attributeBonus / 100)
            : 0,
        passive5: companionData.passiveSkillStats5
            ? createDamageCalculator(companionData.passiveSkillStats5)(companionStats) * (1 + attributeBonus / 100)
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
        basicCharged2: weaponData.basicChargedAttackStats2
            ? createDamageCalculator(weaponData.basicChargedAttackStats2)(companionStats) * (1 + attributeBonus / 100)
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
        support2: calculateWeakenedDamage(baseDamage.support2, totalDmgBoostToWeakened),
        support3: calculateWeakenedDamage(baseDamage.support3, totalDmgBoostToWeakened),
        empoweredSupport: calculateWeakenedDamage(baseDamage.empoweredSupport, totalDmgBoostToWeakened),
        empoweredSupport2: calculateWeakenedDamage(baseDamage.empoweredSupport2, totalDmgBoostToWeakened),
        resonance: calculateWeakenedDamage(baseDamage.resonance, totalDmgBoostToWeakened),
        resonance2: calculateWeakenedDamage(baseDamage.resonance2, totalDmgBoostToWeakened),
        ardentOath: calculateWeakenedDamage(baseDamage.ardentOath, totalDmgBoostToWeakened),
        passive1: calculateWeakenedDamage(baseDamage.passive1, totalDmgBoostToWeakened),
        passive2: calculateWeakenedDamage(baseDamage.passive2, totalDmgBoostToWeakened),
        passive3: calculateWeakenedDamage(baseDamage.passive3, totalDmgBoostToWeakened),
        passive4: calculateWeakenedDamage(baseDamage.passive4, totalDmgBoostToWeakened),
        passive5: calculateWeakenedDamage(baseDamage.passive5, totalDmgBoostToWeakened),
        basicTotal: calculateWeakenedDamage(baseDamage.basicTotal, totalDmgBoostToWeakened),
        basic1: calculateWeakenedDamage(baseDamage.basic1, totalDmgBoostToWeakened),
        basic2: calculateWeakenedDamage(baseDamage.basic2, totalDmgBoostToWeakened),
        basic3: calculateWeakenedDamage(baseDamage.basic3, totalDmgBoostToWeakened),
        basic4: calculateWeakenedDamage(baseDamage.basic4, totalDmgBoostToWeakened),
        basic5: calculateWeakenedDamage(baseDamage.basic5, totalDmgBoostToWeakened),
        basicCharged: calculateWeakenedDamage(baseDamage.basicCharged, totalDmgBoostToWeakened),
        basicCharged2: calculateWeakenedDamage(baseDamage.basicCharged2, totalDmgBoostToWeakened),
        active1: calculateWeakenedDamage(baseDamage.active1, totalDmgBoostToWeakened),
        active2: calculateWeakenedDamage(baseDamage.active2, totalDmgBoostToWeakened),
        passiveMC: calculateWeakenedDamage(baseDamage.passiveMC, totalDmgBoostToWeakened),
    };

    const critDamage = {
        support: calculateCritDamage(baseDamage.support, critDmg),
        support2: calculateCritDamage(baseDamage.support2, critDmg),
        support3: calculateCritDamage(baseDamage.support3, critDmg),
        empoweredSupport: calculateCritDamage(baseDamage.empoweredSupport, critDmg),
        empoweredSupport2: calculateCritDamage(baseDamage.empoweredSupport2, critDmg),
        resonance: calculateCritDamage(baseDamage.resonance, critDmg),
        resonance2: calculateCritDamage(baseDamage.resonance2, critDmg),
        ardentOath: calculateCritDamage(baseDamage.ardentOath, critDmg),
        passive1: calculateCritDamage(baseDamage.passive1, critDmg),
        passive2: calculateCritDamage(baseDamage.passive2, critDmg),
        passive3: calculateCritDamage(baseDamage.passive3, critDmg),
        passive4: calculateCritDamage(baseDamage.passive4, critDmg),
        passive5: calculateCritDamage(baseDamage.passive5, critDmg),
        basicTotal: calculateCritDamage(baseDamage.basicTotal, critDmg),
        basic1: calculateCritDamage(baseDamage.basic1, critDmg),
        basic2: calculateCritDamage(baseDamage.basic2, critDmg),
        basic3: calculateCritDamage(baseDamage.basic3, critDmg),
        basic4: calculateCritDamage(baseDamage.basic4, critDmg),
        basic5: calculateCritDamage(baseDamage.basic5, critDmg),
        basicCharged: calculateCritDamage(baseDamage.basicCharged, critDmg),
        basicCharged2: calculateCritDamage(baseDamage.basicCharged2, critDmg),
        active1: calculateCritDamage(baseDamage.active1, critDmg),
        active2: calculateCritDamage(baseDamage.active2, critDmg),
        passiveMC: calculateWeakenedDamage(baseDamage.passiveMC, critDmg),
    };

    // Вспомогательная функция для округления при отображении
    const roundDisplay = (value) => Math.round(value);

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Combat Calculations:</h2>

            {hasAnySolarPair && defaultBuffs && (
                <table className={styles.statsTablePairBonus}>
                    <thead>
                    <tr>
                        <th className={styles.titleTD}>Pair Bonus:</th>
                        <th className={styles.titleTD}>Default Buffs</th>
                        <th className={styles.titleTD}>Companion Buffs</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className={styles.titleTD}>Starring Effect</th>
                        <td className={styles.titleTD}>{defaultBuffs.eidolon0}</td>
                        <td>{isCompanionMatching && companionData.eidolon0 ? companionData.eidolon0 : '—'}</td>
                    </tr>
                    <tr>
                        <th className={styles.titleTD}>Duo Rank 1</th>
                        <td className={styles.titleTD}>{defaultBuffs.eidolon1}</td>
                        <td>{isCompanionMatching && companionData.eidolon1 ? companionData.eidolon1 : '—'}</td>
                    </tr>
                    <tr>
                        <th className={styles.titleTD}>Duo Rank 2</th>
                        <td className={styles.titleTD}>{defaultBuffs.eidolon2}</td>
                        <td>{isCompanionMatching && companionData.eidolon2 ? companionData.eidolon2 : '—'}</td>
                    </tr>
                    <tr>
                        <th className={styles.titleTD}>Duo Rank 3</th>
                        <td className={styles.titleTD}>{defaultBuffs.eidolon3}</td>
                        <td>{isCompanionMatching && companionData.eidolon3 ? companionData.eidolon3 : '—'}</td>
                    </tr>
                    </tbody>
                </table>
            )}

            {/* Additional Bonus Section */}
            <div className={styles.additionalBonus}>
                <h3 className={styles.title}>Additional Bonus:</h3>

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
                            <div className={styles.rangeLabel}>Stellactrum count: {stellactrumCount}</div>
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
                                                width: `${(stellactrumCount / 6) * 100}%`
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
                    <th></th>
                    <th>Base</th>
                    <th>Weakened DMG</th>
                    <th>Crit DMG</th>
                    <th>Formula</th>
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
                        <td>{companionData.supportSkillFormula || '—'}</td>
                    </tr>
                )}

                {/* Empowered Support Skill */}
                {(baseDamage.empoweredSupport > 0 || companionData.empoweredSupportSkillFormula) && (
                    <tr>
                        <th>Empowered Support Skill</th>
                        <td>{roundDisplay(baseDamage.empoweredSupport)}</td>
                        <td>{roundDisplay(weakenedDamage.empoweredSupport)}</td>
                        <td>{roundDisplay(critDamage.empoweredSupport)}</td>
                        <td>{companionData.empoweredSupportSkillFormula || '—'}</td>
                    </tr>
                )}

                {/* Empowered Support Skill Additional */}
                {(baseDamage.empoweredSupport2 > 0 || companionData.empoweredSupportSkillFormula2) && (
                    <tr>
                        <th>Empowered Support Skill Additional</th>
                        <td>{roundDisplay(baseDamage.empoweredSupport2)}</td>
                        <td>{roundDisplay(weakenedDamage.empoweredSupport2)}</td>
                        <td>{roundDisplay(critDamage.empoweredSupport2)}</td>
                        <td>{companionData.empoweredSupportSkillFormula2 || '—'}</td>
                    </tr>
                )}

                {/* Support Skill Additional */}
                {(baseDamage.support2 > 0 || companionData.supportSkillFormula2) && (
                    <tr>
                        <th>Support Skill Additional</th>
                        <td>{roundDisplay(baseDamage.support2)}</td>
                        <td>{roundDisplay(weakenedDamage.support2)}</td>
                        <td>{roundDisplay(critDamage.support2)}</td>
                        <td>{companionData.supportSkillFormula2 || '—'}</td>
                    </tr>
                )}

                {/* Support Skill Additional 3 */}
                {(baseDamage.support3 > 0 || companionData.supportSkillFormula3) && (
                    <tr>
                        <th>Support Skill Additional</th>
                        <td>{roundDisplay(baseDamage.support3)}</td>
                        <td>{roundDisplay(weakenedDamage.support3)}</td>
                        <td>{roundDisplay(critDamage.support3)}</td>
                        <td>{companionData.supportSkillFormula3 || '—'}</td>
                    </tr>
                )}

                {/* Resonance Skill */}
                {(baseDamage.resonance > 0 || companionData.resonanceSkillFormula) && (
                    <tr>
                        <th>Resonance Skill</th>
                        <td>{roundDisplay(baseDamage.resonance)}</td>
                        <td>{roundDisplay(weakenedDamage.resonance)}</td>
                        <td>{roundDisplay(critDamage.resonance)}</td>
                        <td>{companionData.resonanceSkillFormula || '—'}</td>
                    </tr>
                )}

                {/* Resonance Skill Additional */}
                {(baseDamage.resonance2 > 0 || companionData.resonanceSkillFormula2) && (
                    <tr>
                        <th>Resonance Skill Additional</th>
                        <td>{roundDisplay(baseDamage.resonance2)}</td>
                        <td>{roundDisplay(weakenedDamage.resonance2)}</td>
                        <td>{roundDisplay(critDamage.resonance2)}</td>
                        <td>{companionData.resonanceSkillFormula2 || '—'}</td>
                    </tr>
                )}

                {/* Ardent Oath */}
                {(baseDamage.ardentOath > 0 || companionData.ardentOathFormula) && (
                    <tr>
                        <th>Ardent Oath</th>
                        <td>{roundDisplay(baseDamage.ardentOath)}</td>
                        <td>{roundDisplay(weakenedDamage.ardentOath)}</td>
                        <td>{roundDisplay(critDamage.ardentOath)}</td>
                        <td>{companionData.ardentOathFormula || '—'}</td>
                    </tr>
                )}

                {/* Passive Skills */}
                {(baseDamage.passive1 > 0 || companionData.passiveSkillFormula1) && (
                    <tr>
                        <th>Passive Skill (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive1)}</td>
                        <td>{roundDisplay(weakenedDamage.passive1)}</td>
                        <td>{roundDisplay(critDamage.passive1)}</td>
                        <td>{companionData.passiveSkillFormula1 || '—'}</td>
                    </tr>
                )}

                {(baseDamage.passive2 > 0 || companionData.passiveSkillFormula2) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive2)}</td>
                        <td>{roundDisplay(weakenedDamage.passive2)}</td>
                        <td>{roundDisplay(critDamage.passive2)}</td>
                        <td>{companionData.passiveSkillFormula2 || '—'}</td>
                    </tr>
                )}

                {(baseDamage.passive3 > 0 || companionData.passiveSkillFormula3) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive3)}</td>
                        <td>{roundDisplay(weakenedDamage.passive3)}</td>
                        <td>{roundDisplay(critDamage.passive3)}</td>
                        <td>{companionData.passiveSkillFormula3 || '—'}</td>
                    </tr>
                )}

                {(baseDamage.passive4 > 0 || companionData.passiveSkillFormula4) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive4)}</td>
                        <td>{roundDisplay(weakenedDamage.passive4)}</td>
                        <td>{roundDisplay(critDamage.passive4)}</td>
                        <td>{companionData.passiveSkillFormula4 || '—'}</td>
                    </tr>
                )}

                {(baseDamage.passive5 > 0 || companionData.passiveSkillFormula5) && (
                    <tr>
                        <th>Passive Skill Additional (Companion)</th>
                        <td>{roundDisplay(baseDamage.passive5)}</td>
                        <td>{roundDisplay(weakenedDamage.passive5)}</td>
                        <td>{roundDisplay(critDamage.passive5)}</td>
                        <td>{companionData.passiveSkillFormula5 || '—'}</td>
                    </tr>
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
                                <td>{weaponData.basicFirstStrike || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.basic2 > 0 || weaponData.basicSecondStrike) && (
                            <tr>
                                <th>Second Strike</th>
                                <td>{roundDisplay(baseDamage.basic2)}</td>
                                <td>{roundDisplay(weakenedDamage.basic2)}</td>
                                <td>{roundDisplay(critDamage.basic2)}</td>
                                <td>{weaponData.basicSecondStrike || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.basic3 > 0 || weaponData.basicThirdStrike) && (
                            <tr>
                                <th>Third Strike</th>
                                <td>{roundDisplay(baseDamage.basic3)}</td>
                                <td>{roundDisplay(weakenedDamage.basic3)}</td>
                                <td>{roundDisplay(critDamage.basic3)}</td>
                                <td>{weaponData.basicThirdStrike || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.basic4 > 0 || weaponData.basicFourthStrike) && (
                            <tr>
                                <th>Fourth Strike</th>
                                <td>{roundDisplay(baseDamage.basic4)}</td>
                                <td>{roundDisplay(weakenedDamage.basic4)}</td>
                                <td>{roundDisplay(critDamage.basic4)}</td>
                                <td>{weaponData.basicFourthStrike || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.basic5 > 0 || weaponData.basicFifthStrike) && (
                            <tr>
                                <th>Fifth Strike</th>
                                <td>{roundDisplay(baseDamage.basic5)}</td>
                                <td>{roundDisplay(weakenedDamage.basic5)}</td>
                                <td>{roundDisplay(critDamage.basic5)}</td>
                                <td>{weaponData.basicFifthStrike || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.basicTotal > 0 || weaponData.basicAttackFormula) && (
                            <tr>
                                <th>Basic Attack (Total DMG)</th>
                                <td>{roundDisplay(baseDamage.basicTotal)}</td>
                                <td>{roundDisplay(weakenedDamage.basicTotal)}</td>
                                <td>{roundDisplay(critDamage.basicTotal)}</td>
                                <td>{weaponData.basicAttackFormula || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.basicCharged > 0 || weaponData.basicChargedAttack) && (
                            <tr>
                                <th>Charged Attack</th>
                                <td>{roundDisplay(baseDamage.basicCharged)}</td>
                                <td>{roundDisplay(weakenedDamage.basicCharged)}</td>
                                <td>{roundDisplay(critDamage.basicCharged)}</td>
                                <td>{weaponData.basicChargedAttack || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.basicCharged2 > 0 || weaponData.basicChargedAttack2) && (
                            <tr>
                                <th>Charged Attack Additional</th>
                                <td>{roundDisplay(baseDamage.basicCharged2)}</td>
                                <td>{roundDisplay(weakenedDamage.basicCharged2)}</td>
                                <td>{roundDisplay(critDamage.basicCharged2)}</td>
                                <td>{weaponData.basicChargedAttack2 || '—'}</td>
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
                                <td>{weaponData.activeSkillFormula || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.active2 > 0 || weaponData.activeSkillSecondFormula) && (
                            <tr>
                                <th>Active Skill Additional</th>
                                <td>{roundDisplay(baseDamage.active2)}</td>
                                <td>{roundDisplay(weakenedDamage.active2)}</td>
                                <td>{roundDisplay(critDamage.active2)}</td>
                                <td>{weaponData.activeSkillSecondFormula || '—'}</td>
                            </tr>
                        )}

                        {(baseDamage.passiveMC > 0 || weaponData.passiveSkillMCFormula) && (
                            <tr>
                                <th>Passive Skill (MC)</th>
                                <td>{roundDisplay(baseDamage.passiveMC)}</td>
                                <td>{roundDisplay(weakenedDamage.passiveMC)}</td>
                                <td>{roundDisplay(critDamage.passiveMC)}</td>
                                <td>{weaponData.passiveSkillMCFormula || '—'}</td>
                            </tr>
                        )}
                    </>
                )}
                </tbody>
            </table>
        </section>
    )
}

export default CombatCalculations;