import React, { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
import { Range } from 'react-range';
import Select from 'react-select';
import styles from "./LevelCardBlock.module.css";
import {
    getStatsWithRank,
    memoryStats,
    memoriesData,
    calculateFinalStats
} from '@data';
import {
    getCardLevel,
    saveCardLevel,
    getCardRank,
    saveCardRank,
    getCardAvailability,
    saveCardAvailability,
    getCardAscend,
    saveCardAscend,
    getCardProtocores,
    saveCardProtocores,
} from '@localstorage';

const rankOptions = [
    { value: 0, label: 'Rank 0' },
    { value: 1, label: 'Rank 1' },
    { value: 2, label: 'Rank 2' },
    { value: 3, label: 'Rank 3' },
];

function LevelCardBlock({ cardId: propCardId, onAvailabilityChange }) {
    const { cardId: paramCardId } = useParams();
    const cardId = propCardId || paramCardId;

    const [level, setLevel] = useState(() => getCardLevel(cardId));
    const [rank, setRank] = useState(() => getCardRank(cardId));
    const [isAvailable, setIsAvailable] = useState(() => getCardAvailability(cardId));
    const [isAscended, setIsAscended] = useState(() => getCardAscend(cardId));
    const [equippedProtocores, setEquippedProtocores] = useState(() => getCardProtocores(cardId));

    // Находим карточку
    const card = useMemo(() => {
        if (!cardId) return null;
        return memoriesData.find(c => String(c.id) === cardId) || null;
    }, [cardId]);

    // Пересчитываем статы
    const stats = useMemo(() => {
        if (!card) return null;
        const baseStats = getStatsWithRank(card, level, rank, isAscended);
        if (!baseStats) return null;
        return calculateFinalStats(card, baseStats, equippedProtocores);
    }, [card, level, rank, isAscended, equippedProtocores]);

    // ===== СОХРАНЕНИЕ В LOCALSTORAGE =====
    useEffect(() => {
        if (cardId) {
            saveCardLevel(cardId, level);
        }
    }, [level, cardId]);

    // Сохранение в localStorage при изменении ранка
    useEffect(() => {
        if (cardId) {
            saveCardRank(cardId, rank);
        }
    }, [rank, cardId]);

    useEffect(() => {
        if (cardId) {
            saveCardAvailability(cardId, isAvailable);
        }
    }, [isAvailable, cardId]);

    useEffect(() => {
        if (cardId) {
            saveCardAscend(cardId, isAscended);
        }
    }, [isAscended, cardId]);

    // Сохранение протокоров при их изменении
    useEffect(() => {
        if (cardId) {
            saveCardProtocores(cardId, equippedProtocores);
        }
    }, [equippedProtocores, cardId]);

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    // при изменении isAvailable, вызываем колбэк
    useEffect(() => {
        if (onAvailabilityChange) {
            onAvailabilityChange(isAvailable);
        }
    }, [isAvailable, onAvailabilityChange]);

    // Слушаем кастомное событие обновления протокоров
    useEffect(() => {
        const handleProtocoresUpdate = (event) => {
            if (event.detail.cardId === cardId) {
                setEquippedProtocores(event.detail.protocores);
            }
        };

        // Слушаем событие storage (для синхронизации между вкладками)
        const handleStorageChange = (e) => {
            if (e.key === `card_protocores_${cardId}`) {
                const saved = JSON.parse(e.newValue || '[]');
                setEquippedProtocores(saved);
            }
        };

        window.addEventListener('protocoresUpdated', handleProtocoresUpdate);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('protocoresUpdated', handleProtocoresUpdate);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [cardId]);

    // Отправляем событие при изменении доступности
    useEffect(() => {
        if (cardId) {
            saveCardAvailability(cardId, isAvailable);
            window.dispatchEvent(new CustomEvent('cardAvailabilityChanged', {
                detail: { cardId, isAvailable }
            }));
        }
    }, [isAvailable, cardId]);

    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    const isAscendable = [10, 20, 30, 40, 50, 60, 70, 80].includes(level);
    const isAwaken = level === 80;

    // Определяем доступные уровни
    const getAvailableLevels = () => {
        if (!card) return [];

        const rarity = card.rarityName;
        const talent = card.talentName;
        let memoryKey = '';

        if (rarity === '5-star') {
            if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 5-star';
            else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 5-star';
            else if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 5-star';
        } else if (rarity === '4-star') {
            if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 4-star';
            else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 4-star';
            else if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 4-star';
        } else if (rarity === '3-star') {
            if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 3-star';
            else if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 3-star';
            else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 3-star';
        }

        if (!memoryKey) return [];

        const memoryData = memoryStats[memoryKey];
        if (!memoryData) return [];

        return Object.keys(memoryData.baseStats).map(Number).sort((a, b) => a - b);
    };

    const availableLevels = getAvailableLevels();
    const maxLevel = availableLevels.length > 0 ? Math.max(...availableLevels) : 80;

    const formatNumber = (num, decimals = 2) => {
        if (num === undefined || num === null || isNaN(num)) return '—';
        if (typeof num === 'number' && !Number.isInteger(num)) {
            return Number(num.toFixed(decimals));
        }
        return num;
    };

    if (!card) {
        return <div>Loading...</div>;
    }

    const isLevelAvailable = availableLevels.includes(level);

    return (
        <>
            <section className={styles.availableButtonContainer}>
                <button
                    className={`${styles.buttonAvailable} ${!isAvailable ? styles.active : ''}`}
                    onClick={() => setIsAvailable(false)}
                >
                    Not available
                </button>
                <button
                    className={`${styles.buttonAvailable} ${isAvailable ? styles.active : ''}`}
                    onClick={() => setIsAvailable(true)}
                >
                    Available
                </button>
            </section>

            {isAvailable && (
                <section className={styles.container}>
                    <div>
                        <div className={styles.selectContainer}>
                            <div className={styles.rangeContainer}>
                                <div className={styles.levelContainer}>
                                    <label className={styles.levelInput} htmlFor="input">Level:</label>
                                    <input
                                        id="input"
                                        type="number"
                                        min="1"
                                        max={maxLevel}
                                        value={level}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === '') {
                                                setLevel('');
                                            } else {
                                                const numVal = parseInt(val);
                                                if (!isNaN(numVal) && numVal >= 1 && numVal <= maxLevel) {
                                                    setLevel(numVal);
                                                    // Сбрасываем состояние Ascend при смене уровня
                                                    if (![10, 20, 30, 40, 50, 60, 70, 80].includes(numVal)) {
                                                        setIsAscended(false);
                                                    }
                                                }
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (isNaN(val) || val < 1) {
                                                setLevel(1);
                                            } else if (val > maxLevel) {
                                                setLevel(maxLevel);
                                            }
                                        }}
                                        className={styles.levelInput}
                                    />
                                    {isAscendable && (
                                        <div className={styles.ascendContainer}>
                                            <button
                                                className={`${styles.ascendButton} ${isAscended ? styles.active : ''}`}
                                                onClick={() => setIsAscended(!isAscended)}
                                            >
                                                {isAwaken ? 'Awaken' : 'Ascend'} {isAscended ? '✓' : ''}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <Range
                                    step={1}
                                    min={1}
                                    max={maxLevel}
                                    values={[level]}
                                    onChange={(values) => {
                                        const newLevel = values[0];
                                        setLevel(newLevel);
                                        // Сбрасываем состояние Ascend при смене уровня
                                        if (![10, 20, 30, 40, 50, 60, 70, 80].includes(newLevel)) {
                                            setIsAscended(false);
                                        }
                                    }}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            className={styles.track}
                                        >
                                            <div
                                                className={styles.trackFilled}
                                                style={{
                                                    width: `${((level - 1) / (maxLevel - 1)) * 100}%`
                                                }}
                                            />
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => {
                                        const { key, ...rest } = props;
                                        return (
                                            <div
                                                key={key}
                                                {...rest}
                                                className={styles.point}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <Select
                                options={rankOptions}
                                value={rankOptions.find(opt => opt.value === rank)}
                                onChange={(option) => setRank(option ? option.value : 0)}
                                placeholder="Select Rank"
                                className={styles.selectRankContainer}
                                isSearchable={false}
                            />
                        </div>

                        {!isLevelAvailable && (
                            <div className={styles.warningMessage}>
                                ⚠️ Data not available for this level. Stats may not be accurate.
                            </div>
                        )}

                        <table className={styles.statsTable}>
                            <thead>
                            <tr>
                                <th>HP</th>
                                <th>ATK</th>
                                <th>DEF</th>
                                <th>Crit Rate</th>
                                <th>Crit DMG</th>
                                <th>DMG Boost to Weakened</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{stats ? formatNumber(stats.hp.toFixed(2)) : '—'}</td>
                                <td>{stats ? formatNumber(stats.atk.toFixed(2)) : '—'}</td>
                                <td>{stats ? formatNumber(stats.def.toFixed(2)) : '—'}</td>
                                <td>{stats ? formatNumber(stats.critRate.toFixed(1)) + '%' : '—'}</td>
                                <td>{stats ? formatNumber(stats.critDmg.toFixed(1)) + '%' : '—'}</td>
                                <td>{stats ? formatNumber(stats.dmgBoost.toFixed(2)) + '%' : '—'}</td>
                            </tr>
                            </tbody>
                        </table>

                        <table className={styles.statsTable}>
                            <thead>
                            <tr>
                                <th>Oath Strength</th>
                                <th>Oath Recovery Boost</th>
                                <th>Expedited Energy Boost</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{stats ? formatNumber(stats.oathStrength) + '%' : '—'}</td>
                                <td>{stats ? formatNumber(stats.oathRecoveryBoost) + '%' : '—'}</td>
                                <td>{stats ? formatNumber(stats.expeditedEnergyBoost) + '%' : '—'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </>
    );
}

export default LevelCardBlock;