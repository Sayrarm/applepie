import styles from "./Showcase.module.css";

function StatsTable({ stats }) {
    if (!stats) return null;

    return (
        <table className={styles.statsTable}>
            <tbody>
            <tr>
                <th>HP</th>
                <td>{stats.hp.toFixed(2)}</td>
                <th>Crit Rate</th>
                <td>{stats.critRate.toFixed(2)}%</td>
                <th>Oath Strength</th>
                <td>{stats.oathStrength.toFixed(2)}%</td>
            </tr>
            <tr>
                <th>ATK</th>
                <td>{stats.atk.toFixed(2)}</td>
                <th>Crit DMG</th>
                <td>{stats.critDmg.toFixed(2)}%</td>
                <th>Oath Recovery Boost</th>
                <td>{stats.oathRecoveryBoost.toFixed(2)}%</td>
            </tr>
            <tr>
                <th>DEF</th>
                <td>{stats.def.toFixed(2)}</td>
                <th>DMG Boost to Weakened</th>
                <td>{stats.dmgBoost.toFixed(2)}%</td>
                <th>Expedited Energy Boost</th>
                <td>{stats.expeditedEnergyBoost.toFixed(2)}%</td>
            </tr>
            </tbody>
        </table>
    )
}

export default StatsTable;