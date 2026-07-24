export const calculateDamage = (stats, formulaStats) => {
    const { hp = 0, atk = 0, def = 0 } = stats;
    const { base = 0, atk: atkPercent = 0, hp: hpPercent = 0, def: defPercent = 0 } = formulaStats;

    return base
        + (atk * atkPercent / 100)
        + (hp * hpPercent / 100)
        + (def * defPercent / 100);
};

export const createDamageCalculator = (formulaStats) => {
    return (stats) => {
        return calculateDamage(stats, formulaStats);
    };
};

export const calculateDamageWithBonuses = (rawDamage, bonuses = {}, isArdentOath = false) => {
    const {
        attributeBonus = 0,
        teamDmgBonus = 0,
        oathStrength = 0,
        critDmg = 0,
        weakenedDmg = 0,
    } = bonuses;

    // Базовый множитель (без крита и weakened)
    let baseMultiplier = 1 + (attributeBonus + teamDmgBonus) / 100;

    // Для Ardent Oath добавляем oathStrength
    if (isArdentOath) {
        baseMultiplier += oathStrength / 100;
    }

    // Множитель для Weakened DMG
    const weakenedMultiplier = baseMultiplier + weakenedDmg / 100;

    // Множитель для Crit DMG
    const critMultiplier = baseMultiplier + critDmg / 100;

    return {
        base: rawDamage * baseMultiplier,
        weakened: rawDamage * weakenedMultiplier,
        crit: rawDamage * critMultiplier,
    };
};

export const calculateAllDamageTypes = (rawDamageMap, bonuses = {}, ardentOathSkills = []) => {
    const baseDamage = {};
    const weakenedDamage = {};
    const critDamage = {};

    Object.keys(rawDamageMap).forEach(skillName => {
        const rawDamage = rawDamageMap[skillName];
        if (rawDamage === 0) {
            baseDamage[skillName] = 0;
            weakenedDamage[skillName] = 0;
            critDamage[skillName] = 0;
            return;
        }

        const isArdentOath = ardentOathSkills.includes(skillName);
        const result = calculateDamageWithBonuses(rawDamage, bonuses, isArdentOath);

        baseDamage[skillName] = result.base;
        weakenedDamage[skillName] = result.weakened;
        critDamage[skillName] = result.crit;
    });

    return { baseDamage, weakenedDamage, critDamage };
};