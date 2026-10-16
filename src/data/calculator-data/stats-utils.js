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

// Display-имя (как в протокорах и StatsTable) → ключ в stats
export const STAT_KEY_BY_NAME = {
    "HP": "hp",
    "HP Bonus": "hp",
    "ATK": "atk",
    "ATK Bonus": "atk",
    "DEF": "def",
    "DEF Bonus": "def",
    "CRIT Rate": "critRate",
    "Crit Rate": "critRate",
    "CRIT DMG": "critDmg",
    "Crit DMG": "critDmg",
    "DMG Boost to Weakened": "dmgBoost",
    "Oath Strength": "oathStrength",
    "Oath Recovery Boost": "oathRecoveryBoost",
    "Expedited Energy Boost": "expeditedEnergyBoost",
};

export const getStatKey = (name) => STAT_KEY_BY_NAME[name] || null;