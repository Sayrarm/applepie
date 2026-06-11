import { useState, useEffect } from 'react';
import styles from './MyResources.module.css';
import {
    bottles,
    heartSand,
    crystalColors,
    crystalTypes,
    crystalBox,
    hearts,
    coreEnergy,
    credits,
    STORAGE_KEYS
} from '../data/my-resources';
import { getImageUrl } from './imageUtils';

function MyResources() {
    // Состояния для каждого типа ресурсов
    const [bottlesState, setBottlesState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.BOTTLES);
        return saved ? JSON.parse(saved) : {};
    });

    const [heartsandState, setHeartsandState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.HEARTSAND);
        return saved ? JSON.parse(saved) : {};
    });

    const [crystalsState, setCrystalsState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.CRYSTALS);
        return saved ? JSON.parse(saved) : {};
    });

    const [crystalBoxesState, setCrystalBoxesState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.CRYSTAL_BOXES);
        return saved ? JSON.parse(saved) : {};
    });

    const [heartsState, setHeartsState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.HEARTS);
        return saved ? JSON.parse(saved) : {};
    });

    const [coreEnergyState, setCoreEnergyState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.CORE_ENERGY);
        return saved ? JSON.parse(saved) : {};
    });

    const [creditsState, setCreditsState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.CREDITS);
        return saved ? JSON.parse(saved) : 0;
    });

    const [selectedCrystalColor, setSelectedCrystalColor] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_CRYSTAL_COLOR);
        return saved || 'violet';
    });

    // Сохранение в localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.BOTTLES, JSON.stringify(bottlesState));
    }, [bottlesState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.HEARTSAND, JSON.stringify(heartsandState));
    }, [heartsandState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CRYSTALS, JSON.stringify(crystalsState));
    }, [crystalsState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CRYSTAL_BOXES, JSON.stringify(crystalBoxesState));
    }, [crystalBoxesState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.HEARTS, JSON.stringify(heartsState));
    }, [heartsState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CORE_ENERGY, JSON.stringify(coreEnergyState));
    }, [coreEnergyState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CREDITS, JSON.stringify(creditsState));
    }, [creditsState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SELECTED_CRYSTAL_COLOR, selectedCrystalColor);
    }, [selectedCrystalColor]);

    // Функции для обновления количества
    const updateCount = (state, setState, id, value) => {
        setState(prev => ({ ...prev, [id]: Math.max(0, Number(value) || 0) }));
    };

    // Подсчёт общего EXP для Bottles
    const getTotalBottleExp = () => {
        let total = 0;
        bottles.forEach(bottle => {
            const count = bottlesState[bottle.id] || 0;
            total += count * (bottle.value || 0);
        });
        return total;
    };

    // Подсчёт общего EXP для Core Energy
    const getTotalCoreEnergyExp = () => {
        let total = 0;
        coreEnergy.forEach(energy => {
            const count = coreEnergyState[energy.id] || 0;
            total += count * (energy.value || 0);
        });
        return total;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Resources</h1>

            {/* Bottles of Wishes */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Bottles of Wishes</h2>
                    <div className={styles.totalExp}>
                        Total EXP: {getTotalBottleExp().toLocaleString()} EXP
                    </div>
                </div>
                <div className={styles.itemsGrid}>
                    {bottles.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                            <span className={styles.itemName}>{item.name}</span>
                            <input
                                type="number"
                                min="0"
                                value={bottlesState[item.id] || 0}
                                onChange={(e) => updateCount(bottlesState, setBottlesState, item.id, e.target.value)}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <span className={styles.itemValue}>+{item.value} EXP</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Memory Heartsand */}
            <div className={styles.section}>
                <h2>Memory Heartsand</h2>
                <div className={styles.itemsGrid}>
                    {heartSand.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                            <span className={styles.itemName}>{item.name}</span>
                            <input
                                type="number"
                                min="0"
                                value={heartsandState[item.id] || 0}
                                onChange={(e) => updateCount(heartsandState, setHeartsandState, item.id, e.target.value)}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Crystals - с выбором цвета */}
            <div className={styles.section}>
                <h2>Crystals</h2>
                <div className={styles.crystalColorRow}>
                    <span className={styles.label}>Color:</span>
                    <div className={styles.colorButtons}>
                        {crystalColors.map(color => (
                            <button
                                key={color.id}
                                className={`${styles.colorButton} ${selectedCrystalColor === color.id ? styles.active : ''}`}
                                onClick={() => setSelectedCrystalColor(color.id)}
                            >
                                <img src={getImageUrl(color.img)} alt={color.name} className={styles.colorIcon} />
                                {color.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.itemsGrid}>
                    {crystalTypes.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <span className={styles.itemName}>{item.name}</span>
                            <input
                                type="number"
                                min="0"
                                value={crystalsState[`${selectedCrystalColor}_${item.id}`] || 0}
                                onChange={(e) => updateCount(
                                    crystalsState,
                                    setCrystalsState,
                                    `${selectedCrystalColor}_${item.id}`,
                                    e.target.value
                                )}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Ascension Crystal Box */}
            <div className={styles.section}>
                <h2>Ascension Crystal Box</h2>
                <div className={styles.itemsGrid}>
                    {crystalBox.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                            <span className={styles.itemName}>{item.name}</span>
                            <input
                                type="number"
                                min="0"
                                value={crystalBoxesState[item.id] || 0}
                                onChange={(e) => updateCount(crystalBoxesState, setCrystalBoxesState, item.id, e.target.value)}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Awakening Hearts */}
            <div className={styles.section}>
                <h2>Awakening Hearts</h2>
                <div className={styles.itemsGrid}>
                    {hearts.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                            <span className={styles.itemName}>{item.name}</span>
                            <input
                                type="number"
                                min="0"
                                value={heartsState[item.id] || 0}
                                onChange={(e) => updateCount(heartsState, setHeartsState, item.id, e.target.value)}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Core Energy */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Core Energy</h2>
                    <div className={styles.totalExp}>
                        Total EXP: {getTotalCoreEnergyExp().toLocaleString()} EXP
                    </div>
                </div>
                <div className={styles.itemsGrid}>
                    {coreEnergy.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                            <span className={styles.itemName}>{item.name}</span>
                            <input
                                type="number"
                                min="0"
                                value={coreEnergyState[item.id] || 0}
                                onChange={(e) => updateCount(coreEnergyState, setCoreEnergyState, item.id, e.target.value)}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <span className={styles.itemValue}>+{item.value} EXP</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Credits */}
            <div className={styles.section}>
                <h2>Credits</h2>
                <div className={styles.itemsGrid}>
                    {credits.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                            <span className={styles.itemName}>{item.name}</span>
                            <input
                                type="number"
                                min="0"
                                value={creditsState}
                                onChange={(e) => setCreditsState(Math.max(0, Number(e.target.value) || 0))}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyResources;