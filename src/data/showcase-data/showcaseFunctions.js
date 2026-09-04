import { calculateFinalStats, getStatsWithRank, affinityData } from "@data";
import {
    getCardLevel,
    getCardRank,
    getCardAscend,
    getCardProtocores,
} from "@localstorage";

// ===== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ КАРТОЧКИ =====
export const getCardData = (card) => {
    if (!card) return null;
    const level = getCardLevel(card.id);
    const rank = getCardRank(card.id);
    const isAscended = getCardAscend(card.id);
    const protocores = getCardProtocores(card.id);
    const baseStats = getStatsWithRank(card, level, rank, isAscended);

    const stats = baseStats
        ? calculateFinalStats(card, baseStats, protocores)
        : null;

    return { level, rank, isAscended, protocores, stats };
};

// ===== ПОДСЧЁТ СУММЫ СТАТОВ =====
export const calculateTotalStats = (solarCards, lunarCards, getCardDataFn) => {
    const allCards = [...solarCards, ...lunarCards].filter((card) => card !== null);

    const total = {
        hp: 0,
        atk: 0,
        def: 0,
        critRate: 0,
        critDmg: 0,
        dmgBoost: 0,
        oathStrength: 0,
        oathRecoveryBoost: 0,
        expeditedEnergyBoost: 0,
    };

    allCards.forEach((card) => {
        const cardData = getCardDataFn(card);
        if (cardData?.stats) {
            const stats = cardData.stats;
            total.hp += stats.hp || 0;
            total.atk += stats.atk || 0;
            total.def += stats.def || 0;
            total.critRate += stats.critRate || 0;
            total.critDmg += stats.critDmg || 0;
            total.dmgBoost += stats.dmgBoost || 0;
            total.oathStrength += stats.oathStrength || 0;
            total.oathRecoveryBoost += stats.oathRecoveryBoost || 0;
            total.expeditedEnergyBoost += stats.expeditedEnergyBoost || 0;
        }
    });

    return total;
};

// ===== ПОДСЧЁТ AFFINITY БОНУСОВ =====
export const calculateAffinityBonus = (affinityLevel) => {
    if (affinityLevel === 0 || !affinityData.length) {
        return { hp: 0, atk: 0, def: 0 };
    }

    const affinityEntry = affinityData[0];
    const levels = affinityEntry.affinityLVL;

    const index = levels.indexOf(affinityLevel);
    if (index === -1) {
        return { hp: 0, atk: 0, def: 0 };
    }

    const hpPerLevel = affinityEntry.hp || 0;
    const atkPerLevel = affinityEntry.atk || 0;
    const defPerLevel = affinityEntry.def || 0;

    const levelCount = affinityLevel / 5;

    return {
        hp: hpPerLevel * levelCount,
        atk: atkPerLevel * levelCount,
        def: defPerLevel * levelCount,
    };
};

// ===== ФИНАЛЬНЫЕ СТАТЫ С УЧЁТОМ AFFINITY =====
export const calculateFinalStatsWithAffinity = (
    totalStats,
    affinityBonus
) => {
    return {
        hp: totalStats.hp + affinityBonus.hp,
        atk: totalStats.atk + affinityBonus.atk,
        def: totalStats.def + affinityBonus.def,
        critRate: totalStats.critRate,
        critDmg: totalStats.critDmg + 150,
        dmgBoost: totalStats.dmgBoost,
        oathStrength: totalStats.oathStrength,
        oathRecoveryBoost: totalStats.oathRecoveryBoost,
        expeditedEnergyBoost: totalStats.expeditedEnergyBoost,
    };
};