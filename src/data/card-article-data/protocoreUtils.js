import { calculateDmgBoost } from "@data";

// Функция для расчёта статов протокоров
export const calculateProtocoreStats = (protocores, baseStats) => {
  const stats = {
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

  // Если нет протокоров или baseStats, возвращаем нули
  if (!protocores || protocores.length === 0 || !baseStats) {
    return stats;
  }

  const bonuses = {
    hpFlat: 0,
    atkFlat: 0,
    defFlat: 0,
    hpPercent: 0,
    atkPercent: 0,
    defPercent: 0,
    critRate: 0,
    critDmg: 0,
    dmgBoostPercent: 0,
    oathStrengthPercent: 0,
    oathRecoveryBoostPercent: 0,
    expeditedEnergyBoostPercent: 0,
  };

  protocores.forEach((protocore) => {
    const statName = protocore.mainStat;
    const statValue = protocore.mainStatValue || 0;

    switch (statName) {
      case "HP":
        bonuses.hpFlat += statValue;
        break;
      case "ATK":
        bonuses.atkFlat += statValue;
        break;
      case "DEF":
        bonuses.defFlat += statValue;
        break;
      case "HP Bonus":
        bonuses.hpPercent += statValue;
        break;
      case "ATK Bonus":
        bonuses.atkPercent += statValue;
        break;
      case "DEF Bonus":
        bonuses.defPercent += statValue;
        break;
      case "CRIT Rate":
        bonuses.critRate += statValue;
        break;
      case "CRIT DMG":
        bonuses.critDmg += statValue;
        break;
      case "DMG Boost to Weakened":
        bonuses.dmgBoostPercent += statValue;
        break;
      case "Oath Strength":
        bonuses.oathStrengthPercent += statValue;
        break;
      case "Oath Recovery Boost":
        bonuses.oathRecoveryBoostPercent += statValue;
        break;
      case "Expedited Energy Boost":
        bonuses.expeditedEnergyBoostPercent += statValue;
        break;
      default:
        break;
    }

    if (protocore.substats) {
      protocore.substats.forEach((sub) => {
        switch (sub.stat) {
          case "HP":
            bonuses.hpFlat += sub.value || 0;
            break;
          case "ATK":
            bonuses.atkFlat += sub.value || 0;
            break;
          case "DEF":
            bonuses.defFlat += sub.value || 0;
            break;
          case "HP Bonus":
            bonuses.hpPercent += sub.value || 0;
            break;
          case "ATK Bonus":
            bonuses.atkPercent += sub.value || 0;
            break;
          case "DEF Bonus":
            bonuses.defPercent += sub.value || 0;
            break;
          case "CRIT Rate":
            bonuses.critRate += sub.value || 0;
            break;
          case "CRIT DMG":
            bonuses.critDmg += sub.value || 0;
            break;
          case "DMG Boost to Weakened":
            bonuses.dmgBoostPercent += sub.value || 0;
            break;
          case "Oath Strength":
            bonuses.oathStrengthPercent += sub.value || 0;
            break;
          default:
            break;
        }
      });
    }
  });

  // Рассчитываем статы с учетом процентов от базовых значений
  stats.hp = bonuses.hpFlat + (baseStats.hp || 0) * (bonuses.hpPercent / 100);
  stats.atk =
    bonuses.atkFlat + (baseStats.atk || 0) * (bonuses.atkPercent / 100);
  stats.def =
    bonuses.defFlat + (baseStats.def || 0) * (bonuses.defPercent / 100);
  stats.critRate = bonuses.critRate;
  stats.critDmg = bonuses.critDmg;
  stats.dmgBoost = bonuses.dmgBoostPercent;
  stats.oathStrength = bonuses.oathStrengthPercent;
  stats.oathRecoveryBoost = bonuses.oathRecoveryBoostPercent;
  stats.expeditedEnergyBoost = bonuses.expeditedEnergyBoostPercent;

  return stats;
};

// Функция для расчета финальных статов с учетом протокоров
export const calculateFinalStats = (card, baseStats, protocores) => {
  // Проверяем, что все необходимые данные есть
  if (!baseStats || !card) {
    return null;
  }

  // Рассчитываем бонусы от протокоров
  const protocoreStats = calculateProtocoreStats(protocores, baseStats);

  // Считаем финальные HP, ATK, DEF
  const finalHp = (baseStats.hp || 0) + (protocoreStats.hp || 0);
  const finalAtk = (baseStats.atk || 0) + (protocoreStats.atk || 0);
  const finalDef = (baseStats.def || 0) + (protocoreStats.def || 0);

  // Пересчитываем DMG Boost на основе финальных статов
  const talentKey = card.talentName;
  let finalDmgBoost = calculateDmgBoost(finalHp, finalAtk, finalDef, talentKey);

  // Добавляем бонусы от протокоров к DMG Boost и переводим в проценты
  finalDmgBoost = finalDmgBoost + (protocoreStats.dmgBoost || 0);

  return {
    hp: finalHp,
    atk: finalAtk,
    def: finalDef,
    critRate: (baseStats.critRate || 0) + (protocoreStats.critRate || 0),
    critDmg: (baseStats.critDmg || 0) + (protocoreStats.critDmg || 0),
    dmgBoost: finalDmgBoost,
    oathStrength:
      (baseStats.oathStrength || 0) + (protocoreStats.oathStrength || 0),
    oathRecoveryBoost:
      (baseStats.oathRecoveryBoost || 0) +
      (protocoreStats.oathRecoveryBoost || 0),
    expeditedEnergyBoost:
      (baseStats.expeditedEnergyBoost || 0) +
      (protocoreStats.expeditedEnergyBoost || 0),
  };
};

// Функция для получения строки с уровнями протокоров
export const getProtocoreLevelsString = (protocores) => {
  if (!protocores || protocores.length === 0) return "—";
  const levels = protocores
    .map((proto) => proto.level || 0)
    .sort((a, b) => b - a);
  return `+${levels.join(" / +")}`;
};
