import styles from "./CombatCalculations.module.css";
import { useMemo } from "react";
import { useSolarPair } from "@hooks";

function TablePairBonus({ selectedCompanion, solarCards }) {
    // Вся логика пары — из хука
    const {
        solarRank,
        matchingCompanion,
        hasAnySolarPair,
        defaultBuffs,
    } = useSolarPair(solarCards);

    // Данные компаньона-пары (для колонки Companion Buffs)
    const companionData = matchingCompanion;

    // Совпадает ли выбранный компаньон с найденной парой
    const isCompanionMatching = useMemo(() => {
        if (!selectedCompanion?.companionName || !matchingCompanion) return false;
        return matchingCompanion.companionName === selectedCompanion.companionName;
    }, [selectedCompanion, matchingCompanion]);

    if (!hasAnySolarPair || !defaultBuffs) return null;

    return (
        <table className={styles.statsTablePairBonus}>
            <thead>
            <tr>
                <th className={styles.titleTD}>Pair Bonus:</th>
                <th className={styles.titleTD}>Default Buffs</th>
                <th className={styles.titleTD}>Companion Buffs</th>
            </tr>
            </thead>
            <tbody>
            {/* Starring Effect - всегда показываем */}
            <tr>
                <th className={styles.titleTD}>Starring Effect</th>
                <td className={styles.titleTD}>{defaultBuffs.eidolon0}</td>
                <td>
                    {isCompanionMatching && companionData?.eidolon0
                        ? companionData.eidolon0
                        : "—"}
                </td>
            </tr>

            {/* Duo Rank 1 - показываем если solarRank >= 1 */}
            {solarRank >= 1 && (
                <tr>
                    <th className={styles.titleTD}>Duo Rank 1</th>
                    <td className={styles.titleTD}>{defaultBuffs.eidolon1}</td>
                    <td>
                        {isCompanionMatching && companionData?.eidolon1
                            ? companionData.eidolon1
                            : "—"}
                    </td>
                </tr>
            )}

            {/* Duo Rank 2 - показываем если solarRank >= 2 */}
            {solarRank >= 2 && (
                <tr>
                    <th className={styles.titleTD}>Duo Rank 2</th>
                    <td className={styles.titleTD}>{defaultBuffs.eidolon2}</td>
                    <td>
                        {isCompanionMatching && companionData?.eidolon2
                            ? companionData.eidolon2
                            : "—"}
                    </td>
                </tr>
            )}

            {/* Duo Rank 3 - показываем если solarRank >= 3 */}
            {solarRank >= 3 && (
                <tr>
                    <th className={styles.titleTD}>Duo Rank 3</th>
                    <td className={styles.titleTD}>{defaultBuffs.eidolon3}</td>
                    <td>
                        {isCompanionMatching && companionData?.eidolon3
                            ? companionData.eidolon3
                            : "—"}
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default TablePairBonus;