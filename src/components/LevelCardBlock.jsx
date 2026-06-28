import styles from "./LevelCardBlock.module.css";
import {Range} from 'react-range';
import {useState, useEffect, useMemo} from "react";
import React from 'react';
import Select from 'react-select';
import {useParams} from 'react-router-dom';
import {getStatsWithRank, memoryStats} from '../data/levelCardData';
import {memoriesData} from '../data/memories-data.js';

// Функция для расчёта статов протокоров
const calculateProtocoreStats = (protocores, baseHp, baseAtk, baseDef) => {
    const stats = {
        hp: 0,
        atk: 0,
        def: 0,
        critRate: 0,
        critDmg: 0,
        dmgBoost: 0,
        oathStrength: 0,
        oathRecoveryBoost: 0,
        expeditedEnergyBoost: 0
    };

    if (!protocores || protocores.length === 0) return stats;

    // Сначала собираем все бонусы отдельно
    const bonuses = {
        hpFlat: 0,
        atkFlat: 0,
        defFlat: 0,
        hpPercent: 0,
        atkPercent: 0,
        defPercent: 0,
        critRate: 0,
        critDmg: 0,
        dmgBoost: 0,
        oathStrength: 0,
        oathRecoveryBoost: 0,
        expeditedEnergyBoost: 0
    };

    protocores.forEach(protocore => {
        const statName = protocore.mainStat;
        const statValue = protocore.mainStatValue || 0;

        // Основные статы
        switch (statName) {
            case 'HP': bonuses.hpFlat += statValue; break;
            case 'ATK': bonuses.atkFlat += statValue; break;
            case 'DEF': bonuses.defFlat += statValue; break;
            case 'HP Bonus': bonuses.hpPercent += statValue; break;
            case 'ATK Bonus': bonuses.atkPercent += statValue; break;
            case 'DEF Bonus': bonuses.defPercent += statValue; break;
            case 'CRIT Rate': bonuses.critRate += statValue; break;
            case 'CRIT DMG': bonuses.critDmg += statValue; break;
            case 'DMG Boost to Weakened': bonuses.dmgBoost += statValue; break;
            case 'Oath Strength': bonuses.oathStrength += statValue; break;
            case 'Oath Recovery Boost': bonuses.oathRecoveryBoost += statValue; break;
            case 'Expedited Energy Boost': bonuses.expeditedEnergyBoost += statValue; break;
            default: break;
        }

        // Сабстаты
        if (protocore.substats) {
            protocore.substats.forEach(sub => {
                switch (sub.stat) {
                    case 'HP': bonuses.hpFlat += sub.value || 0; break;
                    case 'ATK': bonuses.atkFlat += sub.value || 0; break;
                    case 'DEF': bonuses.defFlat += sub.value || 0; break;
                    case 'HP Bonus': bonuses.hpPercent += sub.value || 0; break;
                    case 'ATK Bonus': bonuses.atkPercent += sub.value || 0; break;
                    case 'DEF Bonus': bonuses.defPercent += sub.value || 0; break;
                    case 'CRIT Rate': bonuses.critRate += sub.value || 0; break;
                    case 'CRIT DMG': bonuses.critDmg += sub.value || 0; break;
                    case 'DMG Boost to Weakened': bonuses.dmgBoost += sub.value || 0; break;
                    case 'Oath Strength': bonuses.oathStrength += sub.value || 0; break;
                    default: break;
                }
            });
        }
    });

    // Вычисляем финальные статы
    // HP: плоский бонус + процент от базового HP
    stats.hp = bonuses.hpFlat + Math.round(baseHp * (bonuses.hpPercent / 100));
    stats.atk = bonuses.atkFlat + Math.round(baseAtk * (bonuses.atkPercent / 100));
    stats.def = bonuses.defFlat + Math.round(baseDef * (bonuses.defPercent / 100));

    // Процентные статы просто суммируются
    stats.critRate = bonuses.critRate;
    stats.critDmg = bonuses.critDmg;
    stats.dmgBoost = bonuses.dmgBoost;
    stats.oathStrength = bonuses.oathStrength;
    stats.oathRecoveryBoost = bonuses.oathRecoveryBoost;
    stats.expeditedEnergyBoost = bonuses.expeditedEnergyBoost;

    return stats;
};

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

        // Передаём базовые статы для расчёта процентов
        const protocoreStats = calculateProtocoreStats(
            equippedProtocores,
            baseStats.hp || 0,
            baseStats.atk || 0,
            baseStats.def || 0
        );

        return {
            hp: Math.round((baseStats.hp || 0) + protocoreStats.hp),
            atk: Math.round((baseStats.atk || 0) + protocoreStats.atk),
            def: Math.round((baseStats.def || 0) + protocoreStats.def),
            critRate: (baseStats.critRate || 0) + protocoreStats.critRate,
            critDmg: (baseStats.critDmg || 0) + protocoreStats.critDmg,
            dmgBoost: (baseStats.dmgBoost || 0) + protocoreStats.dmgBoost,
            oathStrength: (baseStats.oathStrength || 0) + protocoreStats.oathStrength,
            oathRecoveryBoost: (baseStats.oathRecoveryBoost || 0) + protocoreStats.oathRecoveryBoost,
            expeditedEnergyBoost: (baseStats.expeditedEnergyBoost || 0) + protocoreStats.expeditedEnergyBoost,
            isAscended: baseStats.isAscended
        };
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

    // Проверяем, доступно ли возвышение для текущего уровня
    const isAscendable = [10, 20, 30, 40, 50, 60, 70, 80].includes(level);
    const isAwaken = level === 80;

    // Определяем доступные уровни
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
                                <br/>
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