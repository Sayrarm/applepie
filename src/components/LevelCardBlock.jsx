import styles from "./LevelCardBlock.module.css";
import { Range } from 'react-range';
import {useState, useEffect, useMemo} from "react";
import React from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { getStatsWithRank, memoryStats } from '../data/levelCardData';
import { memoriesData } from '../data/memories-data.js';

const rankOptions = [
    { value: 0, label: 'Rank 0' },
    { value: 1, label: 'Rank 1' },
    { value: 2, label: 'Rank 2' },
    { value: 3, label: 'Rank 3' },
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


function LevelCardBlock({ cardId: propCardId }) {
    const { cardId: paramCardId } = useParams();
    const cardId = propCardId || paramCardId;

    const [isAvailable, setIsAvailable] = useState(() => {
        const saved = localStorage.getItem(`cardAvailable_${cardId}`);
        return saved ? JSON.parse(saved) : false; // false = Not Available по умолчанию
    });

    // Сохранение состояния видимости в localStorage
    useEffect(() => {
        if (cardId) {
            localStorage.setItem(`cardAvailable_${cardId}`, JSON.stringify(isAvailable));
        }
    }, [isAvailable, cardId]);

    // ✅ Ленивая инициализация - загружаем из localStorage ПРИ СОЗДАНИИ состояния
    const [level, setLevel] = useState(() => getSavedLevel(cardId));
    const [rank, setRank] = useState(() => getSavedRank(cardId));

    // Находим карточку напрямую через useMemo
    const card = useMemo(() => {
        if (!cardId) return null;
        return memoriesData.find(c => String(c.id) === cardId) || null;
    }, [cardId]);

    // Пересчитываем статы через useMemo
    const stats = useMemo(() => {
        if (!card) return null;
        return getStatsWithRank(card, level, rank);
    }, [card, level, rank]);

    // Сохранение в localStorage при изменении уровня
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

    // Определяем доступные уровни для текущей памяти
    const getAvailableLevels = () => {
        if (!card) return [];
        let memoryType = '';
        if (card.talentName === 'hp') memoryType = 'HP Memory 0 Rank';
        else if (card.talentName === 'def') memoryType = 'DEF Memory 0 Rank';
        else if (card.talentName === 'atk') memoryType = 'ATK Memory 0 Rank';
        else return [];

        const memoryData = memoryStats[memoryType];
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
    const isFiveStar = card?.rarityName === '5-star';

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
                            </div>

                            <Range
                                step={1}
                                min={1}
                                max={maxLevel}
                                values={[level]}
                                onChange={(values) => setLevel(values[0])}
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
                        />
                    </div>

                    {!isLevelAvailable && (
                        <div className={styles.warningMessage}>
                            ⚠️ Data not available for this level. Stats may not be accurate.
                        </div>
                    )}

                    {!isFiveStar && (
                        <div className={styles.warningMessage}>
                            ⚠️ Stats data is currently only available for 5-star cards.
                            <br />
                            <small>Card rarity: {card?.rarityName}</small>
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