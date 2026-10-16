import styles from "./StatsTable.module.css";
import { useHighlight } from "@components";

function StatsTable({ stats }) {
    if (!stats) return null;

    const { setHighlightedStat } = useHighlight();

    const cellProps = (key) => ({
        onMouseEnter: () => setHighlightedStat(key),
        onMouseLeave: () => setHighlightedStat(null),
        "data-stat": key,
    });

    return (
        <table className={styles.statsTable}>
            <tbody>
            <tr>
                <th>HP</th>
                <td {...cellProps("hp")}>{stats.hp}</td>
                <th>Crit Rate</th>
                <td {...cellProps("critRate")}>{stats.critRate.toFixed(2)}%</td>
                <th>Oath Strength</th>
                <td {...cellProps("oathStrength")}>{stats.oathStrength.toFixed(2)}%</td>
            </tr>
            <tr>
                <th>ATK</th>
                <td {...cellProps("atk")}>{stats.atk}</td>
                <th>Crit DMG</th>
                <td {...cellProps("critDmg")}>{stats.critDmg.toFixed(2)}%</td>
                <th>Oath Recovery Boost</th>
                <td {...cellProps("oathRecoveryBoost")}>{stats.oathRecoveryBoost.toFixed(2)}%</td>
            </tr>
            <tr>
                <th>DEF</th>
                <td {...cellProps("def")}>{stats.def}</td>
                <th>DMG Boost to Weakened</th>
                <td {...cellProps("dmgBoost")}>{stats.dmgBoost.toFixed(2)}%</td>
                <th>Expedited Energy Boost</th>
                <td {...cellProps("expeditedEnergyBoost")}>{stats.expeditedEnergyBoost.toFixed(2)}%</td>
            </tr>
            </tbody>
        </table>
    )
}

export default StatsTable;