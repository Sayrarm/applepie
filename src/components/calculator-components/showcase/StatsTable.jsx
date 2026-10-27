import styles from "./StatsTable.module.css";
import { useHighlight } from "@components";

function StatsTable({ stats }) {
    const { highlightedStat, setHighlightedStat } = useHighlight();

    if (!stats) return null;

    // Одна ячейка — обработчики + класс
    const cell = (key, content, isHeader = false) => {
        const Tag = isHeader ? "th" : "td";
        const isHighlighted = highlightedStat === key;
        return (
            <Tag
                onMouseEnter={() => setHighlightedStat(key)}
                onMouseLeave={() => setHighlightedStat(null)}
                className={isHighlighted ? styles.highlight : ""}
            >
                {/* Если контент передан как React-узел (для многострочности), оборачиваем в div */}
                {!isHeader && typeof content === "object" ? (
                    <div className={styles.cellContent}>{content}</div>
                ) : (
                    content
                )}
            </Tag>
        );
    };

    return (
        <table className={styles.statsTable}>
            <tbody>
            <tr>
                {cell("hp", "HP", true)}
                {cell("hp", stats.hp)}
                {cell("critRate", "Crit Rate", true)}
                {cell("critRate", `${stats.critRate.toFixed(2)}%`)}
                {cell("oathStrength", "Oath Strength", true)}
                {cell("oathStrength", `${stats.oathStrength.toFixed(2)}%`)}
            </tr>
            <tr>
                {cell("atk", "ATK", true)}
                {cell("atk", stats.atk)}
                {cell("critDmg", "Crit DMG", true)}
                {/* СЮДА МЫ ПЕРЕДАДИМ JSX ИЗ SHOWCASE */}
                {cell("critDmg", stats.critDmgContent)}
                {cell("oathRecoveryBoost", "Oath Recovery Boost", true)}
                {cell("oathRecoveryBoost", `${stats.oathRecoveryBoost.toFixed(2)}%`)}
            </tr>
            <tr>
                {cell("def", "DEF", true)}
                {cell("def", stats.def)}
                {cell("dmgBoost", "DMG Boost to Weakened", true)}
                {cell("dmgBoost", `${stats.dmgBoost.toFixed(2)}%`)}
                {cell("expeditedEnergyBoost", "Expedited Energy Boost", true)}
                {cell("expeditedEnergyBoost", `${stats.expeditedEnergyBoost.toFixed(2)}%`)}
            </tr>
            </tbody>
        </table>
    );
}

export default StatsTable;