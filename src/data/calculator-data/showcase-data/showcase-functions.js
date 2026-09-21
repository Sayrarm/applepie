import { calculateFinalStats, getStatsWithRank, affinityData } from "@data";
import {
  getCardLevel,
  getCardRank,
  getCardAscend,
  getCardProtocores,
} from "@localstorage";
import {
  createEmptyStats,
  mergeStats,
  applyBaseCritDmgBonus,
} from "@data";

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
  const allCards = [...solarCards, ...lunarCards].filter(
      (card) => card !== null,
  );

  const total = createEmptyStats();

  allCards.forEach((card) => {
    const cardData = getCardDataFn(card);
    if (cardData?.stats) {
      mergeStats(total, cardData.stats);
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
export const calculateFinalStatsWithAffinity = (totalStats, affinityBonus) => {
  const withAffinity = {
    ...totalStats,
    hp: totalStats.hp + affinityBonus.hp,
    atk: totalStats.atk + affinityBonus.atk,
    def: totalStats.def + affinityBonus.def,
  };
  return applyBaseCritDmgBonus(withAffinity);
};