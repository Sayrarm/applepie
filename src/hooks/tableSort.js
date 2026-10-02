/**
 * Парсит строку протокоров вида "+15/+15", "+9", "—".
 * Возвращает { count, values }.
 */
const parseProtocores = (str) => {
    if (!str || str === "—") return { count: 0, values: [] };
    const values = str
        .split("/")
        .map((v) => parseInt(v.replace("+", ""), 10))
        .filter((n) => !isNaN(n));
    return { count: values.length, values };
};

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

        // level — уровень, при равенстве ascend
        if (key === "level") {
            if (a.level !== b.level) return (a.level - b.level) * sign;
            const aAscend = a.isAscended ? 1 : 0;
            const bAscend = b.isAscended ? 1 : 0;
            return (aAscend - bAscend) * sign;
        }

        if (key === "rank") {
            return (a.rank - b.rank) * sign;
        }

        // protocoreLevels — сначала по количеству, потом по значениям
        if (key === "protocoreLevels") {
            const aParsed = parseProtocores(a.protocoreLevels);
            const bParsed = parseProtocores(b.protocoreLevels);

            if (aParsed.count !== bParsed.count) {
                return (aParsed.count - bParsed.count) * sign;
            }

            const maxLen = Math.max(aParsed.values.length, bParsed.values.length);
            for (let i = 0; i < maxLen; i++) {
                const av = aParsed.values[i] ?? 0;
                const bv = bParsed.values[i] ?? 0;
                if (av !== bv) return (av - bv) * sign;
            }
            return 0;
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