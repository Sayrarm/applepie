import {
    compDataShowcaseSpecific,
    weaponDataShowcaseSpecific,
    calculateAllDamageTypes,
    createDamageCalculator,
} from "@data";

/**
 * Находит данные компаньона по companionName
 */
const findCompanionData = (selectedCompanion) => {
    if (!selectedCompanion?.companionName) return {};
    return (
        compDataShowcaseSpecific.find(
            (item) => item.companionName === selectedCompanion.companionName,
        ) || {}
    );
};

/**
 * Находит данные оружия по weaponName
 */
const findWeaponData = (selectedMCWeapon) => {
    if (!selectedMCWeapon?.weaponName) return {};
    return (
        weaponDataShowcaseSpecific.find(
            (item) => item.weaponName === selectedMCWeapon.weaponName,
        ) || {}
    );
};

/**
 * Собирает rawDamage по всем скиллам
 */
const computeRawDamage = (companionData, weaponData, s) => {
    const calc = createDamageCalculator;

    return {
        // Companion
        support: companionData.supportSkillStats ? calc(companionData.supportSkillStats)(s) : 0,
        support2: companionData.supportSkillStats2 ? calc(companionData.supportSkillStats2)(s) : 0,
        support3: companionData.supportSkillStats3 ? calc(companionData.supportSkillStats3)(s) : 0,
        empoweredSupport: companionData.empoweredSupportSkillStats ? calc(companionData.empoweredSupportSkillStats)(s) : 0,
        empoweredSupport2: companionData.empoweredSupportSkillStats2 ? calc(companionData.empoweredSupportSkillStats2)(s) : 0,
        resonance: companionData.resonanceSkillStats ? calc(companionData.resonanceSkillStats)(s) : 0,
        resonance2: companionData.resonanceSkillStats2 ? calc(companionData.resonanceSkillStats2)(s) : 0,
        ardentOath: companionData.ardentOathStats ? calc(companionData.ardentOathStats)(s) : 0,
        passive1: companionData.passiveSkillStats1 ? calc(companionData.passiveSkillStats1)(s) : 0,
        passive2: companionData.passiveSkillStats2 ? calc(companionData.passiveSkillStats2)(s) : 0,
        passive3: companionData.passiveSkillStats3 ? calc(companionData.passiveSkillStats3)(s) : 0,
        passive4: companionData.passiveSkillStats4 ? calc(companionData.passiveSkillStats4)(s) : 0,
        passive5: companionData.passiveSkillStats5 ? calc(companionData.passiveSkillStats5)(s) : 0,
        basicSync1: companionData.basicSyncFirstStrikeStats ? calc(companionData.basicSyncFirstStrikeStats)(s) : 0,
        basicSync2: companionData.basicSyncSecondStrikeStats ? calc(companionData.basicSyncSecondStrikeStats)(s) : 0,
        basicSync3: companionData.basicSyncThirdStrikeStats ? calc(companionData.basicSyncThirdStrikeStats)(s) : 0,
        basicSync4: companionData.basicSyncFourthStrikeStats ? calc(companionData.basicSyncFourthStrikeStats)(s) : 0,
        basicSyncCharged: companionData.basicSyncChargedAttackStats ? calc(companionData.basicSyncChargedAttackStats)(s) : 0,
        activeI: companionData.activeSkill_IStats ? calc(companionData.activeSkill_IStats)(s) : 0,
        activeII: companionData.activeSkill_IStats ? calc(companionData.activeSkill_IStats)(s) : 0,
        activeII2: companionData.activeSkill_IIStats2 ? calc(companionData.activeSkill_IIStats2)(s) : 0,
        activeIII: companionData.activeSkill_IIIStats ? calc(companionData.activeSkill_IIIStats)(s) : 0,
        activeIII2: companionData.activeSkill_IIIStats2 ? calc(companionData.activeSkill_IIIStats2)(s) : 0,

        // Weapon
        basicTotal: weaponData.basicAttackFormula ? calc(weaponData.basicAttackStats)(s) : 0,
        basic1: weaponData.basicFirstStrikeStats ? calc(weaponData.basicFirstStrikeStats)(s) : 0,
        basic2: weaponData.basicSecondStrikeStats ? calc(weaponData.basicSecondStrikeStats)(s) : 0,
        basic3: weaponData.basicThirdStrikeStats ? calc(weaponData.basicThirdStrikeStats)(s) : 0,
        basic4: weaponData.basicFourthStrikeStats ? calc(weaponData.basicFourthStrikeStats)(s) : 0,
        basic5: weaponData.basicFifthStrikeStats ? calc(weaponData.basicFifthStrikeStats)(s) : 0,
        basicCharged: weaponData.basicChargedAttackStats ? calc(weaponData.basicChargedAttackStats)(s) : 0,
        basicCharged2: weaponData.basicChargedAttackStats2 ? calc(weaponData.basicChargedAttackStats2)(s) : 0,
        active1: weaponData.activeSkillStats ? calc(weaponData.activeSkillStats)(s) : 0,
        active2: weaponData.activeSkillSecondStats ? calc(weaponData.activeSkillSecondStats)(s) : 0,
        passiveMC: weaponData.passiveSkillMCStats ? calc(weaponData.passiveSkillMCStats)(s) : 0,
    };
};

const sumDamage = (damageMap) =>
    Object.values(damageMap).reduce((acc, v) => acc + (v || 0), 0);

/**
 * Чистая функция расчёта урона команды.
 *
 * @param stats — { hp, atk, def, dmgBoost, critDmg, oathStrength, ... }
 * @param context — { selectedCompanion, selectedMCWeapon, teamDmgBonus }
 * @returns { baseDamage, weakenedDamage, critDamage, baseSum, weakenedSum, critSum }
 */
export const computeKitDamage = (stats, context) => {
    const {
        selectedCompanion,
        selectedMCWeapon,
        teamDmgBonus = 0,
    } = context || {};

    const companionData = findCompanionData(selectedCompanion);
    const weaponData = findWeaponData(selectedMCWeapon);

    const companionStats = {
        hp: stats?.hp || 1,
        atk: stats?.atk || 1,
        def: stats?.def || 1,
    };

    const dmgBoostToWeakened = Number((stats?.dmgBoost || 0).toFixed(2));
    const critDmg = stats?.critDmg || 0;
    const oathStrength = stats?.oathStrength || 0;

    const rawDamage = computeRawDamage(companionData, weaponData, companionStats);

    const bonuses = {
        attributeBonus: 0,      // в оптимизаторе не используется
        teamDmgBonus,
        oathStrength,
        critDmg,
        weakenedDmg: dmgBoostToWeakened,
    };

    const ardentOathSkills = ["ardentOath"];

    const { baseDamage, weakenedDamage, critDamage } = calculateAllDamageTypes(
        rawDamage,
        bonuses,
        ardentOathSkills,
    );

    return {
        baseDamage,
        weakenedDamage,
        critDamage,
        baseSum: sumDamage(baseDamage),
        weakenedSum: sumDamage(weakenedDamage),
        critSum: sumDamage(critDamage),
    };
};

/**
 * Определяет целевой тип урона по выбранному delta
 */
export const detectDamageType = (delta) => {
    if (!delta) return "base";
    const d = String(delta).toLowerCase();
    if (d.includes("weakened") || d.includes("dmg boost")) return "weakened";
    if (d.includes("crit")) return "crit";
    return "base";
};