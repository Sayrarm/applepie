/**
 * Сортирует массив по конфигу { key, direction }.
 */
export const sortTableData = (data, sortConfig, valueGetter) => {
    if (!sortConfig || !sortConfig.key) return data;

    const { key, direction } = sortConfig;
    const sorted = [...data];
    const sign = direction === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
        // Кастомный getter, если передан
        if (valueGetter) {
            const aValue = valueGetter(a, key);
            const bValue = valueGetter(b, key);
            return compareValues(aValue, bValue, sign);
        }

        // Специальные ключи: level, rank
        if (key === "level") {
            if (a.level !== b.level) return (a.level - b.level) * sign;
            const aAscend = a.isAscended ? 1 : 0;
            const bAscend = b.isAscended ? 1 : 0;
            return (aAscend - bAscend) * sign;
        }

        if (key === "rank") {
            if (a.rank !== b.rank) return (a.rank - b.rank) * sign;
            const aAscend = a.isAscended ? 1 : 0;
            const bAscend = b.isAscended ? 1 : 0;
            return (aAscend - bAscend) * sign;
        }

        // Из card.stats или card
        let aValue, bValue;
        if (
            [
                "hp", "atk", "def", "critRate", "critDmg", "dmgBoost",
                "oathStrength", "oathRecoveryBoost", "expeditedEnergyBoost",
            ].includes(key)
        ) {
            aValue = a.stats?.[key] ?? 0;
            bValue = b.stats?.[key] ?? 0;
        } else {
            aValue = a[key];
            bValue = b[key];
        }

        return compareValues(aValue, bValue, sign);
    });

    return sorted;
};

/**
 * Сравнение двух значений с учётом направления.
 */
const compareValues = (aValue, bValue, sign) => {
    if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * sign;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * sign;
    }
    return 0;
};