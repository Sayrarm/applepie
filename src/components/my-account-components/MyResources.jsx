import {useState, useEffect} from 'react';
import styles from './MyResources.module.css';
import {
    bottles,
    heartSand,
    crystalColors,
    crystalTypes,
    crystalIcons,
    crystalBox,
    hearts,
    coreEnergy,
    credits,
    STORAGE_KEYS,
    wish,
    diamond,
    getHeartsandExchange,
    getCrystalBoxExchange,
    getWishExchange
} from '@data';
import {getImageUrl} from '@hooks';

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

    const [diamondsState, setDiamondsState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.DIAMONDS);
        return saved ? JSON.parse(saved) : 0;
    });

    const [wishState, setWishState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.WISH);
        return saved ? JSON.parse(saved) : {};
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

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.DIAMONDS, JSON.stringify(diamondsState));
    }, [diamondsState]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.WISH, JSON.stringify(wishState));
    }, [wishState]);

    // Функции для обновления количества
    const updateCount = (state, setState, id, value) => {
        setState(prev => ({...prev, [id]: Math.max(0, Number(value) || 0)}));
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

    // Функция для получения иконки кристалла по цвету и типу
    const getCrystalIcon = (color, typeId) => {
        if (!color || !typeId) return null;
        const colorIcons = crystalIcons[color];
        if (!colorIcons) return null;
        return colorIcons[typeId] || null;
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
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
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
                                    value={bottlesState[item.id] || ""}
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
                    {crystalTypes.map(item => {
                        // Получаем иконку для выбранного цвета и текущего типа
                        const iconPath = getCrystalIcon(selectedCrystalColor, item.id);
                        return (
                            <div key={item.id} className={styles.itemRow}>
                                <div className={styles.itemDiv}>
                                    {iconPath && (
                                        <img
                                            src={getImageUrl(iconPath)}
                                            alt={`${selectedCrystalColor} ${item.name}`}
                                            className={styles.itemIcon}
                                        />
                                    )}
                                    <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                                        {selectedCrystalColor} {item.name}
                                    </label>
                                </div>
                                <input
                                    id={`input-${item.id}`}
                                    name="item"
                                    type="number"
                                    min="0"
                                    value={crystalsState[`${selectedCrystalColor}_${item.id}`] || ""}
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
                        );
                    })}
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
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <div className={styles.itemDiv}>
                                <span className={styles.itemValue}>+{item.value} EXP</span>
                                <input
                                    id={`input-${item.id}`}
                                    name="item"
                                    type="number"
                                    min="0"
                                    value={coreEnergyState[item.id] || ""}
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
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={creditsState}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Разрешаем пустую строку или числа >= 0
                                    if (value === '' || Number(value) >= 0) {
                                        setCreditsState(value);
                                    }
                                }}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    // При потере фокуса преобразуем в число для отображения
                                    const value = e.target.value;
                                    if (value === '' || value === '0') {
                                        setCreditsState('0');
                                    } else {
                                        setCreditsState(String(Number(value)));
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
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={heartsState[item.id] || ""}
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

            {/* Ascension Crystal Box */}
            <div className={styles.section}>
                <h2>Ascension Crystal Box</h2>
                <div className={styles.itemsGrid}>
                    {crystalBox.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={crystalBoxesState[item.id] || ""}
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
                                const exchange = getCrystalBoxExchange(crystalBoxesState);
                                return (
                                    <div className={styles.exchangeGrid}>
                                        <div className={styles.exchangeCard}>
                                            <img src={getImageUrl("../assets/icons/gray-n.png")} alt="Crystal N"
                                                 className={styles.itemIconGray}/>
                                            <span className={styles.exchangeItem}>Crystal</span>
                                            <span className={styles.exchangeValue}>N: {exchange.toN}</span>
                                        </div>
                                        or
                                        <div className={styles.exchangeCard}>
                                            <img src={getImageUrl("../assets/icons/gray-r.png")} alt="Crystal R"
                                                 className={styles.itemIconGray}/>
                                            <span className={styles.exchangeItem}>Crystal</span>
                                            <span className={styles.exchangeValue}>R: {exchange.toR}</span>
                                        </div>
                                        or
                                        <div className={styles.exchangeCard}>
                                            <img src={getImageUrl("../assets/icons/gray-sr.png")} alt="Crystal SR"
                                                 className={styles.itemIconGray}/>
                                            <span className={styles.exchangeItem}>Crystal</span>
                                            <span className={styles.exchangeValue}>SR: {exchange.toSR}</span>
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

            {/* Memory Heartsand */}
            <div className={styles.section}>
                <h2>Memory Heartsand</h2>
                <div className={styles.itemsGrid}>
                    {heartSand.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={heartsandState[item.id] || ""}
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
                    const exchange = getHeartsandExchange(heartsandState);
                    const hasBottles = exchange.bottles.hasAny;
                    const hasCredits = exchange.credits.total > 0;

                    if (!hasBottles && !hasCredits) return null;

                    return (
                        <div className={styles.exchangeSection}>
                            <h3 className={styles.exchangeTitle}>Memory Heartsand can be exchanged for:</h3>
                            <div className={styles.exchangeGrid}>
                                {/* Карточка обмена на Bottles */}
                                {hasBottles && (

                                    <div className={styles.exchangeGridBottles}>
                                        {exchange.bottles.R > 0 &&
                                            (
                                                <div className={styles.exchangeCard}>
                                                    <div className={styles.exchangeItem}>Bottle of Wishes</div>
                                                    <img src={getImageUrl(bottles[1].img)} alt="Bottle R"
                                                         className={styles.itemIconGray}/>
                                                    <div className={styles.exchangeValue}>R: {exchange.bottles.R}</div>
                                                </div>
                                            )
                                        }
                                        {exchange.bottles.SR > 0 &&
                                            (
                                                <div className={styles.exchangeCard}>
                                                    <div className={styles.exchangeItem}>Bottle of Wishes</div>
                                                    <img src={getImageUrl(bottles[2].img)} alt="Bottle SR"
                                                         className={styles.itemIconGray}/>
                                                    <div className={styles.exchangeValue}>SR: {exchange.bottles.SR}</div>
                                                </div>
                                            )
                                        }
                                        {exchange.bottles.SSR > 0 &&
                                            (
                                                <div className={styles.exchangeCard}>
                                                    <div className={styles.exchangeItem}>Bottle of Wishes</div>
                                                    <img src={getImageUrl(bottles[3].img)} alt="Bottle SSR"
                                                         className={styles.itemIconGray}/>
                                                    <div className={styles.exchangeValue}>SSR: {exchange.bottles.SSR}</div>
                                                </div>
                                            )
                                        }
                                    </div>

                                )}

                                or

                                {/* Карточка обмена на Credits */}
                                {hasCredits && (
                                    <div className={styles.exchangeValue}>
                                        <div className={styles.exchangeCard}>
                                            <div className={styles.exchangeItem}>Credits</div>
                                            <img src={getImageUrl(credits[0].img)} alt="Credits"
                                                 className={styles.itemIconGray}/>
                                            {exchange.credits.total.toLocaleString()}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.exchangeNote}>
                                * Exchange rates: 10 MH R → 5 Bottle R | 5 MH SR → 5 Bottle SR | 4 MH SSR → 5 Bottle SSR
                                <br/>
                                100 MH R → 50,000 Credits | 10 MH SR → 50,000 Credits | 2 MH SSR → 50,000 Credits
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Diamonds */}
            <div className={styles.section}>
                <h2>Diamonds</h2>
                <div className={styles.itemsGrid}>
                    {diamond.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={diamondsState}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || Number(value) >= 0) {
                                        setDiamondsState(value);
                                    }
                                }}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || value === '0') {
                                        setDiamondsState('0');
                                    } else {
                                        setDiamondsState(String(Number(value)));
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Информация об обмене Diamonds на Wishes */}
                {(() => {
                    const exchange = getWishExchange(diamondsState);
                    const hasWishes = exchange.wishes.standart > 0 || exchange.wishes.limited > 0 || exchange.wishes.rerun > 0;

                    if (!hasWishes) return null;

                    return (
                        <div className={styles.exchangeSection}>
                            <h3 className={styles.exchangeTitle}>Diamonds can be exchanged for:</h3>
                            <div className={styles.exchangeGrid}>
                                {exchange.wishes.standart > 0 && (
                                    <div className={styles.exchangeCard}>
                                        <div className={styles.exchangeItem}>Empyrean Wish</div>
                                        <img src={getImageUrl(wish[0].img)} alt="Empyrean Wish" className={styles.itemIconGray}/>
                                        <div className={styles.exchangeValue}>{exchange.wishes.standart}</div>
                                    </div>
                                )}
                                or
                                {exchange.wishes.rerun > 0 && (
                                    <div className={styles.exchangeCard}>
                                        <div className={styles.exchangeItem}>Time Wish</div>
                                        <img src={getImageUrl(wish[2].img)} alt="Time Wish" className={styles.itemIconGray}/>
                                        <div className={styles.exchangeValue}>{exchange.wishes.rerun}</div>
                                    </div>
                                )}
                                or
                                {exchange.wishes.limited > 0 && (
                                    <div className={styles.exchangeCard}>
                                        <div className={styles.exchangeItem}>Deepspace Wish</div>
                                        <img src={getImageUrl(wish[1].img)} alt="Deepspace Wish" className={styles.itemIconGray}/>
                                        <div className={styles.exchangeValue}>{exchange.wishes.limited}</div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.exchangeNote}>
                                * Exchange rate: 1 Wish = 150 Diamonds
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Wish */}
            <div className={styles.section}>
                <h2>Wishes</h2>
                <div className={styles.itemsGrid}>
                    {wish.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemDiv}>
                                <img src={getImageUrl(item.img)} alt={item.name} className={styles.itemIcon}/>
                                <label htmlFor={`input-${item.id}`} className={styles.itemName}>{item.name}</label>
                            </div>

                            <input
                                id={`input-${item.id}`}
                                name="item"
                                type="number"
                                min="0"
                                value={wishState[item.id] || ""}
                                onChange={(e) => updateCount(wishState, setWishState, item.id, e.target.value)}
                                className={styles.itemInput}
                                onFocus={(e) => {
                                    if (e.target.value === '0') {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        updateCount(wishState, setWishState, item.id, 0);
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