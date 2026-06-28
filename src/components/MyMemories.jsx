import styles from "./MyMemories.module.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { memoriesData } from '../data/memories-data.js';
import { getStatsWithRank } from '../data/levelCardData.js';
import { calculateFinalStats, getProtocoreLevelsString } from '../data/protocoreUtils.js';
import {getImageUrl} from "./imageUtils.js";

function MyMemories() {
    const [availableCards, setAvailableCards] = useState([]);

    const getCardLevel = (cardId) => {
        const saved = localStorage.getItem(`cardLevel_${cardId}`);
        return saved ? parseInt(saved) : 1;
    };

    const getCardRank = (cardId) => {
        const saved = localStorage.getItem(`cardRank_${cardId}`);
        return saved ? parseInt(saved) : 0;
    };

    const getCardAscend = (cardId) => {
        const saved = localStorage.getItem(`cardAscend_${cardId}`);
        return saved ? JSON.parse(saved) : false;
    };

    const getCardProtocores = (cardId) => {
        const saved = localStorage.getItem(`card_protocores_${cardId}`);
        return saved ? JSON.parse(saved) : [];
    };

    const refreshAvailableCards = () => {
        const available = memoriesData
            .filter(card => {
                const savedAvailability = localStorage.getItem(`cardAvailable_${card.id}`);
                return savedAvailability ? JSON.parse(savedAvailability) : false;
            })
            .map(card => {
                const level = getCardLevel(card.id);
                const rank = getCardRank(card.id);
                const isAscended = getCardAscend(card.id);
                const protocores = getCardProtocores(card.id);
                const protocoreLevels = getProtocoreLevelsString(protocores);

                const baseStats = getStatsWithRank(card, level, rank, isAscended);

                if (!baseStats) {
                    return {
                        ...card,
                        level,
                        rank,
                        isAscended,
                        protocores,
                        protocoreLevels,
                        stats: {
                            hp: '—',
                            atk: '—',
                            def: '—',
                            critRate: '—',
                            critDmg: '—',
                            dmgBoost: '—',
                            oathStrength: '—',
                            oathRecoveryBoost: '—',
                            expeditedEnergyBoost: '—'
                        }
                    };
                }

                // Используем новую функцию для расчета финальных статов
                const finalStats = calculateFinalStats(card, baseStats, protocores);

                return {
                    ...card,
                    level,
                    rank,
                    isAscended,
                    protocores,
                    protocoreLevels,
                    stats: finalStats
                };
            });
        setAvailableCards(available);
    };

    useEffect(() => {
        refreshAvailableCards();

        const handleStorageChange = (e) => {
            if (e.key && (
                e.key.startsWith('cardAvailable_') ||
                e.key.startsWith('cardLevel_') ||
                e.key.startsWith('cardRank_') ||
                e.key.startsWith('cardAscend_') ||
                e.key.startsWith('card_protocores_')
            )) {
                refreshAvailableCards();
            }
        };

        const handleProtocoresUpdate = () => {
            refreshAvailableCards();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('protocoresUpdated', handleProtocoresUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('protocoresUpdated', handleProtocoresUpdate);
        };
    }, []);

    const formatNumber = (num) => {
        if (num === undefined || num === null || isNaN(num)) return '—';
        if (typeof num === 'string') return num;
        return num;
    };

    return(
        <section className={styles.container}>
            <div className={styles.tableWrapper}>
                <table className={styles.statsTable}>
                    <thead>
                    <tr>
                        <th>Memory</th>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Rank</th>
                        <th>Stella</th>
                        <th>Rarity</th>
                        <th>Placement</th>
                        <th>Talent</th>
                        <th>Protocores</th>
                        <th>HP</th>
                        <th>ATK</th>
                        <th>DEF</th>
                        <th>Crit Rate</th>
                        <th>Crit DMG</th>
                        <th>DMG Boost</th>
                        <th>Oath Strength</th>
                        <th>Oath Recovery Boost</th>
                        <th>Expedited Energy Boost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {availableCards.length === 0 ? (
                        <tr>
                            <td colSpan="18" className={styles.emptyState}>
                                No available memories found
                            </td>
                        </tr>
                    ) : (
                        availableCards.map(card => (
                            <tr key={card.id}>
                                <td>
                                    <img
                                        src={getImageUrl(card.imageSmall)}
                                        alt={card.name}
                                        className={styles.cardImage}
                                    />
                                </td>
                                <td>
                                    <Link to={`/memories/${card.id}`} className={styles.cardLink}>
                                        {card.name}
                                    </Link>
                                </td>
                                <td>
                                    <span className={styles.levelBadge}>
                                        {card.level}
                                        {card.isAscended && <span className={styles.ascendMark}>✦</span>}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.rankBadge}>
                                       {card.rank}
                                    </span>
                                </td>
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
                                <td>
                                    <div className={styles.rarityContainer}>
                                        <span className={styles.rarityStars}>
                                            {card.rarityName}
                                        </span>
                                    </div>
                                </td>
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
                                <td>
                                    <span className={styles.protocoreLevel}>
                                        {card.protocoreLevels}
                                    </span>
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.hp === 'number' ? formatNumber(card.stats.hp) : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.atk === 'number' ? formatNumber(card.stats.atk) : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.def === 'number' ? formatNumber(card.stats.def) : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.critRate === 'number' ? formatNumber(card.stats.critRate.toFixed(1)) + '%' : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.critDmg === 'number' ? formatNumber(card.stats.critDmg.toFixed(1)) + '%' : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.dmgBoost === 'number' ? formatNumber(card.stats.dmgBoost.toFixed(2)) + '%' : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.oathStrength === 'number' ? formatNumber(card.stats.oathStrength) + '%' : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.oathRecoveryBoost === 'number' ? formatNumber(card.stats.oathRecoveryBoost) + '%' : '—'}
                                </td>
                                <td className={styles.statValue}>
                                    {typeof card.stats.expeditedEnergyBoost === 'number' ? formatNumber(card.stats.expeditedEnergyBoost) + '%' : '—'}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default MyMemories;