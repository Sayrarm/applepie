import styles from "./LevelCardBlock.module.css";
import {Range} from 'react-range';
import React, {useEffect, useMemo, useState} from "react";
import Select from 'react-select';
import {useParams} from 'react-router-dom';
import {getStatsWithRank, memoryStats} from '../data/levelCardData';
import {memoriesData} from '../data/memories-data.js';
import {calculateFinalStats} from '../data/protocoreUtils.js';

const rankOptions = [
    {value: 0, label: 'Rank 0'},
    {value: 1, label: 'Rank 1'},
    {value: 2, label: 'Rank 2'},
    {value: 3, label: 'Rank 3'},
];

// Функции для загрузки из localStorage
const getSavedLevel = (cardId) => {
    if (!cardId) return 1;
    const saved = localStorage.getItem(`cardLevel_${cardId}`);
    return saved ? parseInt(saved) : 1;
};

const getSavedRank = (cardId) => {
    if (!cardId) return 0;
    const saved = localStorage.getItem(`cardRank_${cardId}`);
    return saved ? parseInt(saved) : 0;
};

const getSavedAvailability = (cardId) => {
    if (!cardId) return false;
    const saved = localStorage.getItem(`cardAvailable_${cardId}`);
    return saved ? JSON.parse(saved) : false;
};

const getSavedAscend = (cardId) => {
    if (!cardId) return false;
    const saved = localStorage.getItem(`cardAscend_${cardId}`);
    return saved ? JSON.parse(saved) : false;
};

function LevelCardBlock({cardId: propCardId, onAvailabilityChange}) {
    const {cardId: paramCardId} = useParams();
    const cardId = propCardId || paramCardId;

    const [level, setLevel] = useState(() => getSavedLevel(cardId));
    const [rank, setRank] = useState(() => getSavedRank(cardId));
    const [isAvailable, setIsAvailable] = useState(() => getSavedAvailability(cardId));
    const [isAscended, setIsAscended] = useState(() => getSavedAscend(cardId));
    const [equippedProtocores, setEquippedProtocores] = useState([]);

    // Находим карточку
    const card = useMemo(() => {
        if (!cardId) return null;
        return memoriesData.find(c => String(c.id) === cardId) || null;
    }, [cardId]);

    // Загружаем прикреплённые протокоры
    useEffect(() => {
        if (!cardId) return;
        const saved = JSON.parse(localStorage.getItem(`card_protocores_${cardId}`) || '[]');
        setEquippedProtocores(saved);
    }, [cardId]);

    // при изменении isAvailable, вызываем колбэк
    useEffect(() => {
        if (onAvailabilityChange) {
            onAvailabilityChange(isAvailable);
        }
    }, [isAvailable, onAvailabilityChange]);

    // Пересчитываем статы
    const stats = useMemo(() => {
        if (!card) return null;
        const baseStats = getStatsWithRank(card, level, rank, isAscended);
        if (!baseStats) return null;

        // Используем новую функцию calculateFinalStats
        // Передаем card, baseStats и equippedProtocores
        return calculateFinalStats(card, baseStats, equippedProtocores);
    }, [card, level, rank, isAscended, equippedProtocores]);

    // Сохранение в localStorage
    useEffect(() => {
        if (cardId) {
            localStorage.setItem(`cardLevel_${cardId}`, String(level));
        }
    }, [level, cardId]);

    // Сохранение в localStorage при изменении ранка
    useEffect(() => {
        if (cardId) {
            localStorage.setItem(`cardRank_${cardId}`, String(rank));
        }
    }, [rank, cardId]);

    useEffect(() => {
        if (cardId) {
            localStorage.setItem(`cardAvailable_${cardId}`, JSON.stringify(isAvailable));
        }
    }, [isAvailable, cardId]);

    useEffect(() => {
        if (cardId) {
            localStorage.setItem(`cardAscend_${cardId}`, JSON.stringify(isAscended));
        }
    }, [isAscended, cardId]);

    useEffect(() => {
        // Слушаем кастомное событие обновления протокоров
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

    useEffect(() => {
        if (cardId) {
            localStorage.setItem(`cardAvailable_${cardId}`, JSON.stringify(isAvailable));
            // Отправляем событие для обновления списка в Memories
            window.dispatchEvent(new CustomEvent('cardAvailabilityChanged', {
                detail: { cardId, isAvailable }
            }));
        }
    }, [isAvailable, cardId]);

    // Проверяем, доступно ли возвышение для текущего уровня
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
        }

        if (!memoryKey) return [];

        const memoryData = memoryStats[memoryKey];
        if (!memoryData) return [];

        return Object.keys(memoryData.baseStats).map(Number).sort((a, b) => a - b);
    };

    const availableLevels = getAvailableLevels();
    const maxLevel = availableLevels.length > 0 ? Math.max(...availableLevels) : 80;

    if (!card) {
        return <div>Loading...</div>;
    }

    // Проверяем, доступен ли уровень
    const isLevelAvailable = availableLevels.includes(level);

    // Функция для форматирования чисел
    const formatNumber = (num) => {
        if (num === undefined || num === null || isNaN(num)) return '—';
        return num;
    };

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
                                    renderTrack={({props, children}) => (
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
                                    renderThumb={({props}) => {
                                        const {key, ...rest} = props;
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
                                <td>{stats ? formatNumber(stats.hp) : '—'}</td>
                                <td>{stats ? formatNumber(stats.atk) : '—'}</td>
                                <td>{stats ? formatNumber(stats.def) : '—'}</td>
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