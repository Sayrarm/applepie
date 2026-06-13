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

    // Расчёт обмена Memory Heartsand
    const getHeartsandExchange = () => {
        const heartsandR = heartsandState['heartsand_r'] || 0;
        const heartsandSR = heartsandState['heartsand_sr'] || 0;
        const heartsandSSR = heartsandState['heartsand_ssr'] || 0;

        return {
            // Обмен на Bottles
            bottles: {
                R: Math.floor(heartsandR / 10) * 5,      // 10 R → 5 Bottle R
                SR: Math.floor(heartsandSR / 5) * 5,     // 5 SR → 5 Bottle SR
                SSR: Math.floor(heartsandSSR / 4) * 5,     // 4 SR → 5 Bottle SSR
                hasAny: (Math.floor(heartsandR / 10) * 5) > 0 ||
                    (Math.floor(heartsandSR / 5) * 5) > 0 ||
                    (Math.floor(heartsandSR / 4) * 5) > 0
            },
            // Обмен на Credits
            credits: {
                R: Math.floor(heartsandR / 100) * 50000,      // 100 R → 50000
                SR: Math.floor(heartsandSR / 10) * 50000,     // 10 SR → 50000
                SSR: Math.floor(heartsandSSR / 2) * 50000,    // 2 SSR → 50000
                total: (Math.floor(heartsandR / 100) * 50000) +
                    (Math.floor(heartsandSR / 10) * 50000) +
                    (Math.floor(heartsandSSR / 2) * 50000)
            }
        };
    };

    // Расчёт обмена Ascension Crystal Box General
    const getCrystalBoxExchange = () => {
        const generalBoxes = crystalBoxesState['box_general'] || 0;

        return {
            toN: generalBoxes * 5,   // 1 General → 5 N
            toR: generalBoxes * 2,   // 1 General → 2 R
            toSR: generalBoxes    // 1 General → 1 SR
        };
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
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                                    {item.name}
                                </label>
                            </div>

                            <div className={styles.itemDiv}>
                                <span className={styles.itemValue}>+{item.value} EXP</span>
                                <input
                                    id={`input-${item.id}`}
                                    name="item"
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
                            </div>
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
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={heartsandState[item.id] || 0}
                                onChange={(e) => updateCount(heartsandState, setHeartsandState, item.id, e.target.value)}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        updateCount(heartsandState, setHeartsandState, item.id, 0);
                                    }
                                }}
                                className={styles.itemInput}
                            />
                        </div>
                    ))}
                </div>

                {/* Информация об обмене Memory Heartsand */}
                {(() => {
                    const exchange = getHeartsandExchange();
                    const hasBottles = exchange.bottles.hasAny;
                    const hasCredits = exchange.credits.total > 0;

                    if (!hasBottles && !hasCredits) return null;

                    return (
                        <div className={styles.exchangeSection}>
                            <h3 className={styles.exchangeTitle}>Memory Heartsand can be exchanged for:</h3>
                            <div className={styles.exchangeGrid}>
                                {/* Карточка обмена на Bottles */}
                                {hasBottles && (
                                    <div className={styles.exchangeCard}>
                                        <div className={styles.exchangeItem}>Bottle of Wishes</div>
                                        <div className={styles.exchangeValue}>
                                            {exchange.bottles.R > 0 && <div>R: {exchange.bottles.R}</div>}
                                            {exchange.bottles.SR > 0 && <div>SR: {exchange.bottles.SR}</div>}
                                            {exchange.bottles.SSR > 0 && <div>SSR: {exchange.bottles.SSR}</div>}
                                        </div>
                                    </div>
                                )}

                                {/* Карточка обмена на Credits */}
                                {hasCredits && (
                                    <div className={styles.exchangeCard}>
                                        <div className={styles.exchangeItem}>Credits</div>
                                        <div className={styles.exchangeValue}>
                                            {exchange.credits.total.toLocaleString()}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.exchangeNote}>
                                * Exchange rates: 10 MH R → 5 Bottle R | 5 MH SR → 5 Bottle SR | 4 MH SSR → 5 Bottle SSR
                                <br />
                                100 MH R → 50,000 Credits | 10 MH SR → 50,000 Credits | 2 MH SSR → 50,000 Credits
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Crystals - с выбором цвета */}
            <div className={styles.section}>
                <h2>Crystals</h2>
                <div className={styles.crystalColorRow}>
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
                            <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            <input
                                id={`input-${item.id}`}
                                name="item"
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
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={crystalBoxesState[item.id] || 0}
                                onChange={(e) => updateCount(crystalBoxesState, setCrystalBoxesState, item.id, e.target.value)}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        updateCount(crystalBoxesState, setCrystalBoxesState, item.id, 0);
                                    }
                                }}
                                className={styles.itemInput}
                            />
                        </div>
                    ))}
                </div>

                {/* Информация об обмене General Box */}
                {crystalBoxesState['box_general'] > 0 && (
                    <div className={styles.exchangeSection}>
                        <h3 className={styles.exchangeTitle}>Ascension Crystal Box: General can be exchanged for:</h3>
                        <div className={styles.exchangeContent}>
                            {(() => {
                                const exchange = getCrystalBoxExchange();
                                return (
                                    <div className={styles.exchangeGrid}>
                                        <div className={styles.exchangeCard}>
                                            <span className={styles.exchangeValue}>{exchange.toN}</span>
                                            <span className={styles.exchangeItem}>Ascension Crystal Box: N</span>
                                        </div>
                                        <div className={styles.exchangeCard}>
                                            <span className={styles.exchangeValue}>{exchange.toR}</span>
                                            <span className={styles.exchangeItem}>Ascension Crystal Box: R</span>
                                        </div>
                                        <div className={styles.exchangeCard}>
                                            <span className={styles.exchangeValue}>{exchange.toSR}</span>
                                            <span className={styles.exchangeItem}>Ascension Crystal Box: SR</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        <div className={styles.exchangeNote}>
                            * Exchange rates: 1 General Box for either 5 N, or 2 R, or 1 SR
                        </div>
                    </div>
                )}
            </div>

            {/* Awakening Hearts */}
            <div className={styles.section}>
                <h2>Awakening Hearts</h2>
                <div className={styles.itemsGrid}>
                    {hearts.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
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
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <div className={styles.itemDiv}>
                                <span className={styles.itemValue}>+{item.value} EXP</span>
                                <input
                                    id={`input-${item.id}`}
                                    name="item"
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

                            </div>

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
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon} />
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
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