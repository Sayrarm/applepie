import { get, set, getCardKeys, getKeysByPrefix } from "@localstorage";

// ===== УРОВЕНЬ КАРТОЧКИ =====
export const getCardLevel = (cardId) => {
  if (!cardId) return 1;
  const keys = getCardKeys(cardId);
  const saved = get(keys.level);
  return saved ? parseInt(saved) : 1;
};

export const saveCardLevel = (cardId, level) => {
  if (!cardId) return false;
  const keys = getCardKeys(cardId);
  return set(keys.level, String(level));
};

// ===== РАНГ КАРТОЧКИ =====
export const getCardRank = (cardId) => {
  if (!cardId) return 0;
  const keys = getCardKeys(cardId);
  const saved = get(keys.rank);
  return saved ? parseInt(saved) : 0;
};

export const saveCardRank = (cardId, rank) => {
  if (!cardId) return false;
  const keys = getCardKeys(cardId);
  return set(keys.rank, String(rank));
};

// ===== ДОСТУПНОСТЬ КАРТОЧКИ =====
export const getCardAvailability = (cardId) => {
  if (!cardId) return false;
  const keys = getCardKeys(cardId);
  const saved = get(keys.available);
  return saved !== null ? saved : false;
};

export const saveCardAvailability = (cardId, isAvailable) => {
  if (!cardId) return false;
  const keys = getCardKeys(cardId);
  return set(keys.available, isAvailable);
};

// ===== ВОЗВЫШЕНИЕ КАРТОЧКИ (ASCEND) =====
export const getCardAscend = (cardId) => {
  if (!cardId) return false;
  const keys = getCardKeys(cardId);
  const saved = get(keys.ascend);
  return saved !== null ? saved : false;
};

export const saveCardAscend = (cardId, isAscended) => {
  if (!cardId) return false;
  const keys = getCardKeys(cardId);
  return set(keys.ascend, isAscended);
};

// ===== ВСЕ ДАННЫЕ КАРТОЧКИ =====
export const getAllCardData = (cardId) => {
  if (!cardId) return null;
  return {
    level: getCardLevel(cardId),
    rank: getCardRank(cardId),
    available: getCardAvailability(cardId),
    ascend: getCardAscend(cardId),
  };
};

export const saveAllCardData = (cardId, data) => {
  if (!cardId) return false;
  if (data.level !== undefined) saveCardLevel(cardId, data.level);
  if (data.rank !== undefined) saveCardRank(cardId, data.rank);
  if (data.available !== undefined)
    saveCardAvailability(cardId, data.available);
  if (data.ascend !== undefined) saveCardAscend(cardId, data.ascend);
  return true;
};

// ===== ВСЕ ДОСТУПНЫЕ КАРТОЧКИ =====
export const getAllCardAvailabilityMap = () => {
  const allCards = {};
  const keys = getKeysByPrefix("cardAvailable_");
  keys.forEach((key) => {
    const cardId = key.replace("cardAvailable_", "");
    allCards[cardId] = get(key, false);
  });
  return allCards;
};

// ===== ОБНОВЛЕНИЕ МАССИВА КАРТОЧЕК С ДОСТУПНОСТЬЮ =====
export const enhanceMemoriesWithAvailability = (memoriesData) => {
  const availabilityMap = getAllCardAvailabilityMap();
  return memoriesData.map((card) => ({
    ...card,
    isAvailable: availabilityMap[String(card.id)] || false,
  }));
};
