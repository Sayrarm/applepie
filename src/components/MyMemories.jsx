import styles from "./MyMemories.module.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { memoriesData } from '../data/memories-data.js';
import {getImageUrl} from "./imageUtils.js";

function MyMemories() {
    const [availableCards, setAvailableCards] = useState([]);

    // Функция для получения уровня карточки из localStorage
    const getCardLevel = (cardId) => {
        const saved = localStorage.getItem(`cardLevel_${cardId}`);
        return saved ? parseInt(saved) : 1;
    };

    // Функция для получения ранка карточки из localStorage
    const getCardRank = (cardId) => {
        const saved = localStorage.getItem(`cardRank_${cardId}`);
        return saved ? parseInt(saved) : 0;
    };

    // Функция для получения статуса возвышения из localStorage
    const getCardAscend = (cardId) => {
        const saved = localStorage.getItem(`cardAscend_${cardId}`);
        return saved ? JSON.parse(saved) : false;
    };

    const refreshAvailableCards = () => {
        const available = memoriesData
            .filter(card => {
                const savedAvailability = localStorage.getItem(`cardAvailable_${card.id}`);
                return savedAvailability ? JSON.parse(savedAvailability) : false;
            })
            .map(card => ({
                ...card,
                level: getCardLevel(card.id),
                rank: getCardRank(card.id),
                isAscended: getCardAscend(card.id)
            }));
        setAvailableCards(available);
    };

    useEffect(() => {
        refreshAvailableCards();

        // Слушаем изменения в localStorage
        const handleStorageChange = (e) => {
            if (e.key && (
                e.key.startsWith('cardAvailable_') ||
                e.key.startsWith('cardLevel_') ||
                e.key.startsWith('cardRank_') ||
                e.key.startsWith('cardAscend_')
            )) {
                refreshAvailableCards();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return(
        <section className={styles.container}>
            <table className={styles.statsTable}>
                <thead>
                <tr>
                    <th>Memory</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Rank</th>
                    <th>Rarity</th>
                    <th>Stella</th>
                    <th>Placement</th>
                    <th>Talent</th>
                </tr>
                </thead>
                <tbody>
                {availableCards.length === 0 ? (
                    <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
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
                                    {card.isAscended && <span className={styles.ascendMark}> ✦</span>}
                                </span>
                            </td>
                            <td>
                                <span className={styles.rankBadge}>
                                    Rank {card.rank}
                                </span>
                            </td>
                            <td>
                                {card.rarityName}
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
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </section>
    )
}

export default MyMemories;