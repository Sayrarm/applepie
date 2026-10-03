import {
    applyBaseCritDmgBonus,
    calculateFinalStats,
    getCardBaseStats,
    filterByStella,
    filterByMainStatWithFallback,
    statMatches,
} from "@data";


// ===== Определение целевого main stat =====
export const resolveMainStatTarget = (mainStatChoice, card) => {
    if (!mainStatChoice || mainStatChoice.value === "Default") {
        const talent = card?.talentName?.toLowerCase();
        if (talent === "hp") return "HP";
        if (talent === "def") return "DEF";
        return "ATK";
    }
    return mainStatChoice.value;
};

// ===== Фиксированные формулы =====
export const getDamageFormula = (mainStatTarget) => {
    switch (mainStatTarget) {
        case "HP":
            return { base: 1800, atk: 9.6, hp: 0.86, def: 0 };
        case "DEF":
            return { base: 1800, atk: 9.6, hp: 0, def: 38.2 };
        case "ATK":
        default:
            return { base: 1800, atk: 24.0, hp: 0, def: 0 };
    }
};

// ===== Сырой урон (raw) =====
export const computeRawDamage = (stats, formula) => {
    const { hp = 0, atk = 0, def = 0 } = stats || {};
    const { base, atk: atkPct, hp: hpPct, def: defPct } = formula;
    return (
        base +
        (atk * atkPct) / 100 +
        (hp * hpPct) / 100 +
        (def * defPct) / 100
    );
};

// ===== Разбивка урона на base / weakened / crit =====
export const computeMemoryDamage = (stats, formula) => {
    const raw = computeRawDamage(stats, formula);

    const critDmg = stats?.critDmg || 0;
    const weakenedDmg = stats?.dmgBoost || 0; // DMG Boost to Weakened

    return {
        baseSum: raw,
        weakenedSum: raw * (1 + weakenedDmg / 100),
        critSum: raw * (1 + critDmg / 100),
    };
};

// ===== Финальные статы карты =====
export const computeCardFinalStats = (card, protocores) => {
    if (!card) return null;
    const baseStats = getCardBaseStats(card);
    if (!baseStats) return null;
    const finalStats = calculateFinalStats(card, baseStats, protocores);
    return applyBaseCritDmgBonus(finalStats);
};

// ===== Проверка subStat =====
const hasSubStat = (protocore, subStatTarget) => {
    if (!protocore || !subStatTarget) return false;
    return (protocore.subStats || []).some((s) =>
        statMatches(s.statName || s, subStatTarget),
    );
};

// ===== Основная функция =====
export const optimizeMemory = ({
                                   card,
                                   allProtocores,
                                   mainStatTarget,
                                   subStatTarget,
                                   topN = 30,
                               }) => {
    if (!card || !allProtocores || allProtocores.length === 0) {
        return { builds: [] };
    }

    const isSolar = card.placementName === "solar";
    const primaryType = isSolar ? "alpha" : "gamma";
    const secondaryType = isSolar ? "beta" : "delta";

    const formula = getDamageFormula(mainStatTarget);

    // ===== Пулы =====
    const primaryPool = filterByStella(
        allProtocores.filter((p) => p.type === primaryType),
        card,
    );
    const secondaryPoolRaw = filterByStella(
        allProtocores.filter((p) => p.type === secondaryType),
        card,
    );
    const secondaryPool = filterByMainStatWithFallback(
        secondaryPoolRaw,
        mainStatTarget,
    );

    // Если хоть один пул пуст — вернём то, что сможем (по одному протокору)
    const primaryList = primaryPool.length > 0 ? primaryPool : [null];
    const secondaryList = secondaryPool.length > 0 ? secondaryPool : [null];

    // ===== Перебор пар =====
    const scored = [];

    for (const primary of primaryList) {
        for (const secondary of secondaryList) {
            if (!primary && !secondary) continue;

            const protocores = [primary, secondary].filter(Boolean);
            const finalStats = computeCardFinalStats(card, protocores);
            const damageData = computeMemoryDamage(finalStats, formula);

            // Приоритет по subStat: смотрим на secondary и primary
            const subMatch =
                hasSubStat(secondary, subStatTarget) ||
                hasSubStat(primary, subStatTarget);

            scored.push({
                primary,
                secondary,
                finalStats,
                damageData,
                subMatch,
            });
        }
    }

    // Сортировка: сначала subMatch, потом base damage
    scored.sort((a, b) => {
        if (a.subMatch !== b.subMatch) return b.subMatch - a.subMatch;
        return b.damageData.baseSum - a.damageData.baseSum;
    });

    // ===== Формируем topN =====
    const builds = scored.slice(0, topN).map((entry, idx) => {
        const slotKey = isSolar ? "solar" : "lunar";
        const slotResult = isSolar
            ? { alpha: entry.primary, beta: entry.secondary }
            : { gamma: entry.primary, delta: entry.secondary };

        return {
            id: idx,
            results: { [slotKey]: slotResult },
            teamStats: entry.finalStats,
            damageData: entry.damageData,
            damageType: "base",
        };
    });

    return { builds };
};

// ===== Статы текущей сборки карты =====
export const computeCardStats = (card, protocores) => {
    const stats = computeCardFinalStats(card, protocores);
    const formula = getDamageFormula(resolveMainStatTarget(null, card));
    const damageData = computeMemoryDamage(stats, formula);
    return { stats, damageData };
};