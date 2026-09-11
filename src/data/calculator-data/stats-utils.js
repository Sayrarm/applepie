export const createEmptyStats = () => ({
    hp: 0,
    atk: 0,
    def: 0,
    critRate: 0,
    critDmg: 0,
    dmgBoost: 0,
    oathStrength: 0,
    oathRecoveryBoost: 0,
    expeditedEnergyBoost: 0,
});

export const applyStat = (total, statName, value) => {
    switch (statName) {
        case "HP":
        case "HP Bonus":
            total.hp += value;
            break;
        case "ATK":
        case "ATK Bonus":
            total.atk += value;
            break;
        case "DEF":
        case "DEF Bonus":
            total.def += value;
            break;
        case "CRIT Rate":
            total.critRate += value;
            break;
        case "CRIT DMG":
            total.critDmg += value;
            break;
        case "DMG Boost to Weakened":
            total.dmgBoost += value;
            break;
        case "Oath Strength":
            total.oathStrength += value;
            break;
        case "Oath Recovery Boost":
            total.oathRecoveryBoost += value;
            break;
        case "Expedited Energy Boost":
            total.expeditedEnergyBoost += value;
            break;
        default:
            break;
    }
};

export const addProtocoreStats = (total, protocore) => {
    if (!protocore) return;
    applyStat(total, protocore.mainStat, protocore.mainStatValue || 0);
    if (protocore.substats) {
        protocore.substats.forEach((sub) => {
            applyStat(total, sub.stat, sub.value || 0);
        });
    }
};

export const addBaseStats = (total, baseStats) => {
    if (!baseStats) return;
    Object.keys(total).forEach((key) => {
        total[key] += baseStats[key] || 0;
    });
};

export const mergeStats = (target, source) => {
    if (!source) return target;
    Object.keys(target).forEach((key) => {
        target[key] += source[key] || 0;
    });
    return target;
};

export const applyBaseCritDmgBonus = (stats) => ({
    ...stats,
    critDmg: stats.critDmg + 150,
});