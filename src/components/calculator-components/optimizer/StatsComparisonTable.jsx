import styles from "./StatsComparisonTable.module.css";

const DAMAGE_LABELS = {
    base: "Base DMG",
    weakened: "Weakened DMG",
    crit: "Crit DMG",
};

function StatsComparisonTable({
                                  beforeStats,
                                  afterStats,
                                  beforeDamage,
                                  afterDamage,
                                  damageType,
                              }) {
    const formatNumber = (num, decimals = 2) => {
        if (typeof num !== "number" || isNaN(num)) return "—";
        return num.toFixed(decimals);
    };

    const formatDamage = (num) => {
        if (typeof num !== "number" || isNaN(num)) return "—";
        return Math.round(num).toLocaleString();
    };

    const getDamage = (damageData, key) => {
        if (!damageData) return null;
        switch (key) {
            case "base":
                return damageData.baseSum;
            case "weakened":
                return damageData.weakenedSum;
            case "crit":
                return damageData.critSum;
            default:
                return null;
        }
    };

    const activeKey = damageType || null;
    const damageColumnClass = (key) =>
        activeKey === key ? styles.damageActiveColumn : "";

    // Значения урона для активного типа
    const oldDamage = getDamage(beforeDamage, activeKey);
    const newDamage = getDamage(afterDamage, activeKey);

    const percentChange =
        typeof oldDamage === "number" &&
        typeof newDamage === "number" &&
        oldDamage > 0
            ? ((newDamage - oldDamage) / oldDamage) * 100
            : null;

    // Класс для ячейки с процентом (зелёный / красный)
    const percentClass =
        percentChange === null
            ? ""
            : percentChange >= 0
                ? styles.damagePositive
                : styles.damageNegative;

    const rows = [
        {
            key: "before",
            label: "Before (Current)",
            stats: beforeStats,
            damage: beforeDamage,
            className: styles.beforeRow,
        },
        {
            key: "after",
            label: "After (Optimized)",
            stats: afterStats,
            damage: afterDamage,
            className: styles.afterRow,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th></th>
                    <th>HP</th>
                    <th>ATK</th>
                    <th>DEF</th>
                    <th>Crit Rate</th>
                    <th>Crit DMG</th>
                    <th>DMG Boost</th>
                    <th>Oath Strength</th>
                    <th>Oath Recovery</th>
                    <th>Expedited Energy</th>
                    <th className={damageColumnClass("base")}>
                        {DAMAGE_LABELS.base}
                    </th>
                    <th className={damageColumnClass("weakened")}>
                        {DAMAGE_LABELS.weakened}
                    </th>
                    <th className={damageColumnClass("crit")}>
                        {DAMAGE_LABELS.crit}
                    </th>
                    <th>Δ %</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(({ key, label, stats, damage, className }) => (
                    <tr key={key} className={className}>
                        <th className={styles.labelCell}>{label}</th>
                        <td>{formatNumber(stats?.hp)}</td>
                        <td>{formatNumber(stats?.atk)}</td>
                        <td>{formatNumber(stats?.def)}</td>
                        <td>{formatNumber(stats?.critRate, 1)}%</td>
                        <td>{formatNumber(stats?.critDmg, 1)}%</td>
                        <td>{formatNumber(stats?.dmgBoost)}%</td>
                        <td>{formatNumber(stats?.oathStrength)}%</td>
                        <td>{formatNumber(stats?.oathRecoveryBoost)}%</td>
                        <td>{formatNumber(stats?.expeditedEnergyBoost)}%</td>
                        <td className={damageColumnClass("base")}>
                            {formatDamage(getDamage(damage, "base"))}
                        </td>
                        <td className={damageColumnClass("weakened")}>
                            {formatDamage(getDamage(damage, "weakened"))}
                        </td>
                        <td className={damageColumnClass("crit")}>
                            {formatDamage(getDamage(damage, "crit"))}
                        </td>
                        <td className={percentClass}>
                            {key === "after" && percentChange !== null
                                ? `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`
                                : "—"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatsComparisonTable;