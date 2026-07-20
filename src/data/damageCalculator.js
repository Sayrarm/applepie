import {compDataShowcaseDefault} from "./comp-data-showcase.js";

export const calculateDamage = (stats, formulaStats, multiplier = 1) => {
    const { hp = 0, atk = 0, def = 0 } = stats;
    const { base = 0, atk: atkPercent = 0, hp: hpPercent = 0, def: defPercent = 0 } = formulaStats;

    // Вычисляем урон
    const damage = base
        + (atk * atkPercent / 100)
        + (hp * hpPercent / 100)
        + (def * defPercent / 100);

    return Math.round(damage * multiplier);
};

export const createDamageCalculator = (formulaStats, defaultMultiplier = 1) => {
    return (stats, multiplier = defaultMultiplier) => {
        return calculateDamage(stats, formulaStats, multiplier);
    };
};

const stellaMatch = 5; //5% к team DMG Boost за каждое совпадение стеллы, макс до 6 раз может стакаться
const perfectMatch = 100; //100% к DMG Boost to Weakened за совпадение всех стелл
const teamDMG = compDataShowcaseDefault.buffEidolon0Stats.teamDMG + compDataShowcaseDefault.buffEidolon3Stats.teamDMG

