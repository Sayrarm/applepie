import {
    optimizeTeam as optimizeSingleBuild,
    calculateTeamStats,
    computeKitDamage,
    detectDamageType,
} from "@data";

const TARGET_BUILDS = 30; // минимум

/**
 * Генерирует много разных сборок.
 */
export const buildOptimizationResults = ({
                                             cards,
                                             allProtocores,
                                             targets,
                                             context,
                                             onProgress,
                                         }) => {
    if (!allProtocores || allProtocores.length === 0) {
        return { builds: [] };
    }

    // Берём первый непустой delta — для определения цели урона
    const primaryDelta = targets.delta1 || targets.delta2 || null;
    const originalDamageType = detectDamageType(primaryDelta);

    const damageTypesPool = [
        originalDamageType,
        "weakened",
        "crit",
        "base",
    ];

    const builds = [];
    const seenSignatures = new Set();

    const addBuild = (results, dmgType) => {
        if (!results) return false;

        const signature = getSignature(results);
        if (seenSignatures.has(signature)) return false;
        seenSignatures.add(signature);

        const teamStats = calculateTeamStats(cards, results);
        const damageData = computeKitDamage(teamStats, context);

        builds.push({
            id: builds.length,
            results,
            teamStats,
            damageData,
            damageType: dmgType,
        });

        return true;
    };

    // === Фаза 1: разные цели ===
    for (const dmgType of damageTypesPool) {
        if (builds.length >= TARGET_BUILDS) break;
        if (onProgress) onProgress(builds.length, TARGET_BUILDS);

        // ⚠️ ФИКС: деструктурируем results
        const { results } = optimizeSingleBuild({
            cards,
            allProtocores,
            targets,
            context,
            damageTypeOverride: dmgType,
        });

        addBuild(results, dmgType);
    }

    // === Фаза 2: рандомизация ===
    let attempts = 0;
    const MAX_ATTEMPTS = 200;

    while (builds.length < TARGET_BUILDS && attempts < MAX_ATTEMPTS) {
        attempts++;
        if (onProgress) onProgress(builds.length, TARGET_BUILDS);

        const dmgType =
            damageTypesPool[Math.floor(Math.random() * damageTypesPool.length)];

        const shuffled = shuffleArray(allProtocores);

        // ⚠️ ФИКС: деструктурируем results
        const { results } = optimizeSingleBuild({
            cards,
            allProtocores: shuffled,
            targets,
            context,
            damageTypeOverride: dmgType,
            randomizeSeed: attempts,
        });

        addBuild(results, dmgType);
    }

    // Сортируем по целевому урону (оригинальный damageType)
    builds.sort((a, b) => {
        const aVal = pickDamage(a.damageData, originalDamageType);
        const bVal = pickDamage(b.damageData, originalDamageType);
        return bVal - aVal;
    });

    return { builds };
};

// ===== утилиты =====
const getSignature = (results) => {
    const ids = [];
    Object.values(results).forEach((slot) => {
        if (!slot) return;
        Object.values(slot).forEach((p) => {
            if (p) ids.push(p.id);
        });
    });
    return ids.sort().join(",");
};

const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const pickDamage = (damageData, damageType) => {
    if (!damageData) return 0;
    switch (damageType) {
        case "weakened":
            return damageData.weakenedSum ?? 0;
        case "crit":
            return damageData.critSum ?? 0;
        default:
            return damageData.baseSum ?? 0;
    }
};