import React, { useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import styles from "./MemoriesTable.module.css";
import { getImageUrl } from "@hooks";
import { rankOptions, formatOptionLabel } from "@data";
import { useTableSort } from "@hooks";

const formatNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) return "—";
    if (typeof num === "string") return num;
    return num.toFixed(2);
};

function MemoriesTable({
                           data = [],
                           storageKey = "memoriesTable",
                           emptyText = "No available memories found",

                           showImage = true,
                           showName = true,
                           showLevel = true,
                           showRank = true,
                           showStella = true,
                           showRarity = true,
                           showPlacement = true,
                           showTalent = true,
                           showProtocoreLevels = true,
                           showHp = true,
                           showAtk = true,
                           showDef = true,
                           showCritRate = true,
                           showCritDmg = true,
                           showDmgBoost = true,
                           showOathStrength = true,
                           showOathRecoveryBoost = true,
                           showExpeditedEnergyBoost = true,

                           ref,
                       }) {
    const { sortConfig, handleSort, getSortIcon, sortData, resetSort } = useTableSort(
        { key: null, direction: "desc" },
        storageKey,
    );

    useImperativeHandle(ref, () => ({ resetSort }), [resetSort]);

    const sortedData = sortData(data);

    const visibleCount = [
        showImage, showName, showLevel, showRank, showStella, showRarity,
        showPlacement, showTalent, showProtocoreLevels,
        showHp, showAtk, showDef, showCritRate, showCritDmg,
        showDmgBoost, showOathStrength, showOathRecoveryBoost,
        showExpeditedEnergyBoost,
    ].filter(Boolean).length;

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.statsTable}>
                <thead>
                <tr>
                    {showImage && <th className={styles.sortable}>Memory</th>}

                    {showName && (
                        <th onClick={() => handleSort("name")} className={styles.sortable}>
                            Name {getSortIcon("name")}
                        </th>
                    )}

                    {showLevel && (
                        <th onClick={() => handleSort("level")} className={styles.sortable}>
                            Level {getSortIcon("level")}
                        </th>
                    )}

                    {showRank && (
                        <th onClick={() => handleSort("rank")} className={styles.sortable}>
                            Rank {getSortIcon("rank")}
                        </th>
                    )}

                    {showStella && (
                        <th onClick={() => handleSort("stellaName")} className={styles.sortable}>
                            Stella {getSortIcon("stellaName")}
                        </th>
                    )}

                    {showRarity && (
                        <th onClick={() => handleSort("rarityName")} className={styles.sortable}>
                            Rarity {getSortIcon("rarityName")}
                        </th>
                    )}

                    {showPlacement && (
                        <th onClick={() => handleSort("placementName")} className={styles.sortable}>
                            Placement {getSortIcon("placementName")}
                        </th>
                    )}

                    {showTalent && (
                        <th onClick={() => handleSort("talentName")} className={styles.sortable}>
                            Talent {getSortIcon("talentName")}
                        </th>
                    )}

                    {showProtocoreLevels && (
                        <th onClick={() => handleSort("protocoreLevels")} className={styles.sortable}>
                            Protocores lvl {getSortIcon("protocoreLevels")}
                        </th>
                    )}

                    {showHp && (
                        <th onClick={() => handleSort("hp")} className={styles.sortable}>
                            HP {getSortIcon("hp")}
                        </th>
                    )}

                    {showAtk && (
                        <th onClick={() => handleSort("atk")} className={styles.sortable}>
                            ATK {getSortIcon("atk")}
                        </th>
                    )}

                    {showDef && (
                        <th onClick={() => handleSort("def")} className={styles.sortable}>
                            DEF {getSortIcon("def")}
                        </th>
                    )}

                    {showCritRate && (
                        <th onClick={() => handleSort("critRate")} className={styles.sortable}>
                            Crit Rate {getSortIcon("critRate")}
                        </th>
                    )}

                    {showCritDmg && (
                        <th onClick={() => handleSort("critDmg")} className={styles.sortable}>
                            Crit DMG {getSortIcon("critDmg")}
                        </th>
                    )}

                    {showDmgBoost && (
                        <th onClick={() => handleSort("dmgBoost")} className={styles.sortable}>
                            DMG Boost to Weakened {getSortIcon("dmgBoost")}
                        </th>
                    )}

                    {showOathStrength && (
                        <th onClick={() => handleSort("oathStrength")} className={styles.sortable}>
                            Oath Strength {getSortIcon("oathStrength")}
                        </th>
                    )}

                    {showOathRecoveryBoost && (
                        <th onClick={() => handleSort("oathRecoveryBoost")} className={styles.sortable}>
                            Oath Recovery Boost {getSortIcon("oathRecoveryBoost")}
                        </th>
                    )}

                    {showExpeditedEnergyBoost && (
                        <th onClick={() => handleSort("expeditedEnergyBoost")} className={styles.sortable}>
                            Expedited Energy Boost {getSortIcon("expeditedEnergyBoost")}
                        </th>
                    )}
                </tr>
                </thead>

                <tbody>
                {sortedData.length === 0 ? (
                    <tr>
                        <td colSpan={visibleCount} className={styles.emptyState}>
                            {emptyText}
                        </td>
                    </tr>
                ) : (
                    sortedData.map((card) => (
                        <tr key={card.id}>
                            {showImage && (
                                <td>
                                    <img
                                        src={getImageUrl(card.imageSmall)}
                                        alt={card.name}
                                        className={styles.cardImage}
                                    />
                                </td>
                            )}
                            {showName && (
                                <td>
                                    <Link to={`/memories/${card.id}`} className={styles.cardLink}>
                                        {card.name}
                                    </Link>
                                </td>
                            )}
                            {showLevel && (
                                <td>
                                    <span className={styles.levelBadge}>
                                        {card.level}
                                        {card.isAscended && <span className={styles.ascendMark}>+</span>}
                                    </span>
                                </td>
                            )}
                            {showRank && (
                                <td>
                                    {formatOptionLabel(
                                        rankOptions.find((opt) => opt.value === card.rank),
                                    )}
                                </td>
                            )}
                            {showStella && (
                                <td className={styles.stellaContainer}>
                                    <img
                                        src={getImageUrl(card.stella)}
                                        alt={card.stellaName}
                                        className={styles.stellaIcon}
                                    />
                                    <div className={styles.stellaName}>
                                        {card.stellaName.charAt(0).toUpperCase() + card.stellaName.slice(1)}
                                    </div>
                                </td>
                            )}
                            {showRarity && (
                                <td>
                                    <div className={styles.rarityContainer}>
                                        <span className={styles.rarityStars}>{card.rarityName}</span>
                                    </div>
                                </td>
                            )}
                            {showPlacement && (
                                <td className={styles.placementContainer}>
                                    <img
                                        src={getImageUrl(card.placement)}
                                        alt={card.placementName}
                                        className={styles.placementIcon}
                                    />
                                    <div className={styles.placementName}>
                                        {card.placementName.charAt(0).toUpperCase() + card.placementName.slice(1)}
                                    </div>
                                </td>
                            )}
                            {showTalent && (
                                <td className={styles.talentContainer}>
                                    <img
                                        src={getImageUrl(card.talent)}
                                        alt={card.talentName}
                                        className={styles.talentIcon}
                                    />
                                    <div className={styles.talentName}>
                                        {card.talentName.toUpperCase()}
                                    </div>
                                </td>
                            )}
                            {showProtocoreLevels && (
                                <td>
                                    <span className={styles.protocoreLevel}>
                                        {card.protocoreLevels}
                                    </span>
                                </td>
                            )}
                            {showHp && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.hp === "number" ? formatNumber(card.stats.hp) : "—"}
                                </td>
                            )}
                            {showAtk && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.atk === "number" ? formatNumber(card.stats.atk) : "—"}
                                </td>
                            )}
                            {showDef && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.def === "number" ? formatNumber(card.stats.def) : "—"}
                                </td>
                            )}
                            {showCritRate && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.critRate === "number"
                                        ? formatNumber(card.stats.critRate.toFixed(1)) + "%"
                                        : "—"}
                                </td>
                            )}
                            {showCritDmg && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.critDmg === "number"
                                        ? formatNumber(card.stats.critDmg.toFixed(1)) + "%"
                                        : "—"}
                                </td>
                            )}
                            {showDmgBoost && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.dmgBoost === "number"
                                        ? formatNumber(card.stats.dmgBoost.toFixed(2)) + "%"
                                        : "—"}
                                </td>
                            )}
                            {showOathStrength && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.oathStrength === "number"
                                        ? formatNumber(card.stats.oathStrength.toFixed(2)) + "%"
                                        : "—"}
                                </td>
                            )}
                            {showOathRecoveryBoost && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.oathRecoveryBoost === "number"
                                        ? formatNumber(card.stats.oathRecoveryBoost.toFixed(2)) + "%"
                                        : "—"}
                                </td>
                            )}
                            {showExpeditedEnergyBoost && (
                                <td className={styles.statValue}>
                                    {typeof card.stats?.expeditedEnergyBoost === "number"
                                        ? formatNumber(card.stats.expeditedEnergyBoost.toFixed(2)) + "%"
                                        : "—"}
                                </td>
                            )}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default MemoriesTable;