import {
    applyBaseCritDmgBonus,
    calculateFinalStats,
    getCardBaseStats,
    filterByStella,
    filterByMainStatWithFallback,
    statMatches
} from "@data";

// ===== Определение целевого main stat =====
export const resolveMainStatTarget = (mainStatChoice, card) => {
    if (!mainStatChoice || mainStatChoice.value === "Default") {
        const talent = card?.talentName?.toLowerCase();
        if (talent === "hp") return "HP";
        if (talent === "def") return "DEF";
        return "ATK"; // fallback
    }
    return mainStatChoice.value; // "HP" | "ATK" | "DEF"
};

// ===== Фиксированные формулы урона =====
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

// ===== Расчёт урона для одной карты =====
export const computeMemoryDamage = (stats, formula) => {
    const { hp = 0, atk = 0, def = 0 } = stats || {};
    const { base, atk: atkPct, hp: hpPct, def: defPct } = formula;
    return (
        base +
        (atk * atkPct) / 100 +
        (hp * hpPct) / 100 +
        (def * defPct) / 100
    );
};

// ===== Расчёт финальных статов карты с протокорами =====
export const computeCardFinalStats = (card, protocores) => {
    if (!card) return null;
    const baseStats = getCardBaseStats(card);
    if (!baseStats) return null;
    const finalStats = calculateFinalStats(card, baseStats, protocores);
    return applyBaseCritDmgBonus(finalStats);
};

// ===== Основная функция оптимизации одной карты =====
/**
 * @param card — карта, для которой оптимизируем
 * @param allProtocores — доступные протокоры (уже без исключённых)
 * @param mainStatTarget — "HP" | "ATK" | "DEF"
 * @param subStatTarget — строка из delta-опций
 * @param topN — сколько лучших сборок вернуть
 */
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

    const isSolar = card.placement === "solar";
    const targetType = isSolar ? "beta" : "delta";

    const formula = getDamageFormula(mainStatTarget);

    // Пул протокоров нужного типа + фильтр по цвету карты
    const pool = filterByStella(
        allProtocores.filter((p) => p.type === targetType),
        card,
    );

    // Фильтр по main stat
    const mainFiltered = filterByMainStatWithFallback(pool, mainStatTarget);

    // Сортируем по subStat, затем по общей полезности
    const scored = mainFiltered.map((p) => {
        const trialStats = computeCardFinalStats(card, [p]);
        const damage = computeMemoryDamage(trialStats, formula);

        // Бонус за соответствие subStat
        const subMatch = subStatTarget
            ? (p.subStats || []).some((s) =>
                statMatches(s.statName || s, subStatTarget),
            )
            : false;

        return { protocore: p, damage, subMatch };
    });

    // Сортируем: сначала subMatch, потом damage
    scored.sort((a, b) => {
        if (a.subMatch !== b.subMatch) return b.subMatch - a.subMatch;
        return b.damage - a.damage;
    });

    // Формируем topN уникальных сборок (каждая — один протокор)
    const builds = scored.slice(0, topN).map((entry, idx) => {
        const finalStats = computeCardFinalStats(card, [entry.protocore]);
        const damage = computeMemoryDamage(finalStats, formula);
        return {
            id: idx,
            results: {
                [isSolar ? "solar" : "lunar"]: {
                    [targetType]: entry.protocore,
                },
            },
            teamStats: finalStats,
            damageData: {
                baseSum: damage,
                weakenedSum: damage,
                critSum: damage,
            },
            damageType: "base",
        };
    });

    return { builds };
};

// ===== Статы текущей сборки карты =====
export const computeCardStats = (card, protocores) => {
    const stats = computeCardFinalStats(card, protocores);
    const formula = getDamageFormula(resolveMainStatTarget(null, card));
    const damage = computeMemoryDamage(stats, formula);
    return {
        stats,
        damageData: { baseSum: damage, weakenedSum: damage, critSum: damage },
    };
};