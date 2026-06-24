import styles from "./LevelCardBlock.module.css";
import { Range } from 'react-range';
import { useState, useEffect } from "react";
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

function LevelCardBlock({ cardId: propCardId }) {
    const { cardId: paramCardId } = useParams();
    const cardId = propCardId || paramCardId;

    const [level, setLevel] = useState(1);
    const [rank, setRank] = useState(0);
    const [stats, setStats] = useState(null);
    const [card, setCard] = useState(null);

    // Находим карточку
    useEffect(() => {
        if (cardId) {
            const foundCard = memoriesData.find(c => String(c.id) === cardId);
            setCard(foundCard);
        }
    }, [cardId]);

    // Пересчитываем статы при изменении уровня, ранка или карточки
    useEffect(() => {
        if (card) {
            const calculatedStats = getStatsWithRank(card, level, rank);
            setStats(calculatedStats);
        }
    }, [card, level, rank]);

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

    // Функция для форматирования чисел
    const formatNumber = (num) => {
        if (num === undefined || num === null || isNaN(num)) return '—';
        return num;
    };

    return (
        <section className={styles.container}>
            <div className={styles.availableButtonContainer}>
                <button className={styles.buttonAvailable}>Available</button>
                <button className={styles.buttonAvailable}>Not available</button>
            </div>

            <div>
                <div className={styles.selectContainer}>
                    <div className={styles.rangeContainer}>

                        <div className={styles.levelContainer}>
                            <h3>Level:</h3>
                            <input
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
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    className={styles.point}
                                />
                            )}
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
    );
}

export default LevelCardBlock;