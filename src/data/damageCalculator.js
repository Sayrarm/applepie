import {compDataShowcaseDefault} from "./comp-data-showcase.js";

export const calculateDamage = (stats, formulaStats) => {
    const { hp = 0, atk = 0, def = 0 } = stats;
    const { base = 0, atk: atkPercent = 0, hp: hpPercent = 0, def: defPercent = 0 } = formulaStats;

    // Вычисляем урон
    const damage = base
        + (atk * atkPercent / 100)
        + (hp * hpPercent / 100)
        + (def * defPercent / 100);

    return Math.round(damage);
};

export const calculateWeakenedDamage = (baseDamage, dmgBoostToWeakened = 0, perfectMatch = 0) => {
    return Math.round(baseDamage * (1 + (dmgBoostToWeakened + perfectMatch) / 100));
};

export const calculateCritDamage = (baseDamage, critDmg = 0) => {
    return Math.round(baseDamage * (1 + critDmg / 100));
};

export const createDamageCalculator = (formulaStats, defaultMultiplier = 1) => {
    return (stats, multiplier = defaultMultiplier) => {
        return calculateDamage(stats, formulaStats, multiplier);
    };
};

const perfectMatch = 100; //100% к DMG Boost to Weakened за совпадение всех стелл
const stellaMatch = 5; //5% к team DMG Boost за каждое совпадение стеллы, макс до 6 раз может стакаться
const teamDMG = compDataShowcaseDefault.buffEidolon0Stats.teamDMG + compDataShowcaseDefault.buffEidolon3Stats.teamDMG + stellaMatch

