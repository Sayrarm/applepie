import { useState, useMemo } from "react";
import styles from "./StatsComparisonTable.module.css";
import { useTableSort } from "@hooks";

const DAMAGE_LABELS = {
    base: "Base DMG",
    weakened: "Weakened DMG",
    crit: "Crit DMG",
};

const getDamage = (damageData, key) => {
    if (!damageData) return 0;
    switch (key) {
        case "base":
            return damageData.baseSum ?? 0;
        case "weakened":
            return damageData.weakenedSum ?? 0;
        case "crit":
            return damageData.critSum ?? 0;
        default:
            return 0;
    }
};

const formatNumber = (num, decimals = 2) => {
    if (typeof num !== "number" || isNaN(num)) return "—";
    return num.toFixed(decimals);
};

const formatDamage = (num) => {
    if (typeof num !== "number" || isNaN(num)) return "—";
    return Math.round(num).toLocaleString();
};

const PAGE_SIZE = 10;

function StatsComparisonTable({
                                  beforeStats,
                                  beforeDamage,
                                  builds,
                                  activeIndex,
                                  onSelectBuild,
                                  defaultSortKey,
                              }) {
    const initialSortKey = (() => {
        if (defaultSortKey === "weakened") return "weakenedSum";
        if (defaultSortKey === "crit") return "critSum";
        if (defaultSortKey === "base") return "baseSum";
        return null;
    })();

    const { handleSort, getSortIcon, sortData } = useTableSort(
        { key: initialSortKey, direction: "desc" },
        // storageKey не передаём — не сохраняем
    );

    const [page, setPage] = useState(0);

    const buildRows = useMemo(
        () =>
            builds.map((build, idx) => ({
                idx,
                name: `#${idx + 1}`,
                stats: build.teamStats,
                damage: build.damageData,
            })),
        [builds],
    );

    // Кастомный valueGetter для сортировки
    const valueGetter = useMemo(() => {
        return (row, key) => {
            if (key === "baseSum" || key === "weakenedSum" || key === "critSum") {
                return row.damage?.[key] ?? 0;
            }
            if (key === "percentChange") {
                const beforeVal = getDamage(beforeDamage, defaultSortKey);
                const val = getDamage(row.damage, defaultSortKey);
                return beforeVal > 0 ? ((val - beforeVal) / beforeVal) * 100 : 0;
            }
            return row.stats?.[key] ?? 0;
        };
    }, [beforeDamage, defaultSortKey]);

    const sortedRows = useMemo(
        () => sortData(buildRows, valueGetter),
        [buildRows, sortData, valueGetter],
    );

    // Пагинация
    const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages - 1);
    const pageRows = sortedRows.slice(
        safePage * PAGE_SIZE,
        safePage * PAGE_SIZE + PAGE_SIZE,
    );

    const activeKey = defaultSortKey || null;
    const damageColumnClass = (key) =>
        activeKey === key ? styles.damageActiveColumn : "";

    const beforeDamageValue = getDamage(beforeDamage, defaultSortKey);

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th></th>
                    <th onClick={() => handleSort("hp")} className={styles.sortable}>
                        HP {getSortIcon("hp")}
                    </th>
                    <th onClick={() => handleSort("atk")} className={styles.sortable}>
                        ATK {getSortIcon("atk")}
                    </th>
                    <th onClick={() => handleSort("def")} className={styles.sortable}>
                        DEF {getSortIcon("def")}
                    </th>
                    <th onClick={() => handleSort("critRate")} className={styles.sortable}>
                        Crit Rate {getSortIcon("critRate")}
                    </th>
                    <th onClick={() => handleSort("critDmg")} className={styles.sortable}>
                        Crit DMG {getSortIcon("critDmg")}
                    </th>
                    <th onClick={() => handleSort("dmgBoost")} className={styles.sortable}>
                        DMG Boost {getSortIcon("dmgBoost")}
                    </th>
                    <th onClick={() => handleSort("oathStrength")} className={styles.sortable}>
                        Oath Strength {getSortIcon("oathStrength")}
                    </th>
                    <th onClick={() => handleSort("oathRecoveryBoost")} className={styles.sortable}>
                        Oath Recovery {getSortIcon("oathRecoveryBoost")}
                    </th>
                    <th onClick={() => handleSort("expeditedEnergyBoost")} className={styles.sortable}>
                        Expedited Energy {getSortIcon("expeditedEnergyBoost")}
                    </th>
                    <th
                        onClick={() => handleSort("baseSum")}
                        className={`${styles.sortable} ${damageColumnClass("base")}`}
                    >
                        {DAMAGE_LABELS.base} {getSortIcon("baseSum")}
                    </th>
                    <th
                        onClick={() => handleSort("weakenedSum")}
                        className={`${styles.sortable} ${damageColumnClass("weakened")}`}
                    >
                        {DAMAGE_LABELS.weakened} {getSortIcon("weakenedSum")}
                    </th>
                    <th
                        onClick={() => handleSort("critSum")}
                        className={`${styles.sortable} ${damageColumnClass("crit")}`}
                    >
                        {DAMAGE_LABELS.crit} {getSortIcon("critSum")}
                    </th>
                    <th onClick={() => handleSort("percentChange")} className={styles.sortable}>
                        difference {getSortIcon("percentChange")}
                    </th>
                </tr>
                </thead>
                <tbody>
                {/* Pinned: Before */}
                {beforeStats && (
                    <tr className={styles.beforeRow}>
                        <th className={styles.labelCell}>Current</th>
                        <td>{formatNumber(beforeStats.hp)}</td>
                        <td>{formatNumber(beforeStats.atk)}</td>
                        <td>{formatNumber(beforeStats.def)}</td>
                        <td>{formatNumber(beforeStats.critRate, 1)}%</td>
                        <td>{formatNumber(beforeStats.critDmg, 1)}%</td>
                        <td>{formatNumber(beforeStats.dmgBoost)}%</td>
                        <td>{formatNumber(beforeStats.oathStrength)}%</td>
                        <td>{formatNumber(beforeStats.oathRecoveryBoost)}%</td>
                        <td>{formatNumber(beforeStats.expeditedEnergyBoost)}%</td>
                        <td className={damageColumnClass("base")}>
                            {formatDamage(getDamage(beforeDamage, "base"))}
                        </td>
                        <td className={damageColumnClass("weakened")}>
                            {formatDamage(getDamage(beforeDamage, "weakened"))}
                        </td>
                        <td className={damageColumnClass("crit")}>
                            {formatDamage(getDamage(beforeDamage, "crit"))}
                        </td>
                        <td>—</td>
                    </tr>
                )}

                {/* Сортируемые Build #N */}
                {pageRows.map((row) => {
                    const isActive = row.idx === activeIndex;
                    const damageVal = getDamage(row.damage, defaultSortKey);
                    const percent =
                        beforeDamageValue > 0
                            ? ((damageVal - beforeDamageValue) / beforeDamageValue) * 100
                            : null;
                    const percentClass =
                        percent === null
                            ? ""
                            : percent >= 0
                                ? styles.damagePositive
                                : styles.damageNegative;

                    return (
                        <tr
                            key={row.idx}
                            className={`${styles.buildRow} ${isActive ? styles.activeRow : ""}`}
                            onClick={() => onSelectBuild(row.idx)}
                        >
                            <th className={styles.labelCell}>{row.name}</th>
                            <td>{formatNumber(row.stats?.hp)}</td>
                            <td>{formatNumber(row.stats?.atk)}</td>
                            <td>{formatNumber(row.stats?.def)}</td>
                            <td>{formatNumber(row.stats?.critRate, 1)}%</td>
                            <td>{formatNumber(row.stats?.critDmg, 1)}%</td>
                            <td>{formatNumber(row.stats?.dmgBoost)}%</td>
                            <td>{formatNumber(row.stats?.oathStrength)}%</td>
                            <td>{formatNumber(row.stats?.oathRecoveryBoost)}%</td>
                            <td>{formatNumber(row.stats?.expeditedEnergyBoost)}%</td>
                            <td className={damageColumnClass("base")}>
                                {formatDamage(getDamage(row.damage, "base"))}
                            </td>
                            <td className={damageColumnClass("weakened")}>
                                {formatDamage(getDamage(row.damage, "weakened"))}
                            </td>
                            <td className={damageColumnClass("crit")}>
                                {formatDamage(getDamage(row.damage, "crit"))}
                            </td>
                            <td className={percentClass}>
                                {percent !== null
                                    ? `${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%`
                                    : "—"}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {/* Пагинация */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        className={styles.pageButton}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={safePage === 0}
                    >
                        ← Prev
                    </button>
                    <span className={styles.pageInfo}>
                        Page {safePage + 1} of {totalPages}
                    </span>
                    <button
                        className={styles.pageButton}
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={safePage >= totalPages - 1}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}

export default StatsComparisonTable;