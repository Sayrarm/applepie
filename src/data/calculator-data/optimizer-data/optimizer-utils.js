import {
    getCardLevel,
    getCardRank,
    getCardAscend,
} from "@localstorage";
import { getStatsWithRank } from "@data";

// ===== Утилиты =====
export const normalizeStat = (stat) =>
    String(stat).toLowerCase().replace(/\s+/g, "_").replace(/_+/g, "_");

export const statMatches = (a, b) => {
    if (!a || !b) return false;
    const na = normalizeStat(a);
    const nb = normalizeStat(b);
    return na === nb || na.includes(nb) || nb.includes(na);
};

// ===== Базовые статы карточки =====
export const getCardBaseStats = (card) => {
    if (!card) return null;
    const cardId = String(card.id);
    const level = getCardLevel(cardId);
    const rank = getCardRank(cardId);
    const isAscended = getCardAscend(cardId);
    return getStatsWithRank(card, level, rank, isAscended);
};

// ===== Кэш базовых статов =====
export const createBaseStatsCache = () => {
    const cache = new Map();
    return (card) => {
        if (!card) return null;
        const key = String(card.id);
        if (cache.has(key)) return cache.get(key);
        const s = getCardBaseStats(card);
        cache.set(key, s);
        return s;
    };
};

// ===== Фильтр по цвету =====
export const filterByStella = (protocores, card) => {
    if (!card || !card.stellaName) return protocores;
    return protocores.filter((p) => p.stellactrum === card.stellaName);
};

// ===== Фильтр по main stat с фолбэком =====
export const filterByMainStatWithFallback = (pool, mainStatFilter) => {
    if (!mainStatFilter) return pool;
    const matching = pool.filter((p) => statMatches(p.mainStat, mainStatFilter));
    return matching.length > 0 ? matching : pool;
};

// ===== Разделение протокоров по типам =====
export const splitProtocoresByType = (allProtocores) => ({
    alpha: allProtocores.filter((p) => p.type === "alpha"),
    beta: allProtocores.filter((p) => p.type === "beta"),
    gamma: allProtocores.filter((p) => p.type === "gamma"),
    delta: allProtocores.filter((p) => p.type === "delta"),
});