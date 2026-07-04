import styles from "./Showcase.module.css";
import {useState, useRef, useMemo, useEffect} from "react";
import ModalWindow from "./ModalWindow.jsx";
import Card from "./Card.jsx";
import {getImageUrl} from "./imageUtils.js";
import {getCardLevel, getCardRank, getCardAscend, getCardProtocores} from "../data/cardUtils.js";
import {calculateFinalStats} from "../data/protocoreUtils.js";
import {getStatsWithRank} from "../data/levelCardData.js";
import ProtocoreBlock from "./ProtocoreBlock.jsx";
import {compData} from "../data/comp-data.js";
import {memoriesData} from '../data/memories-data.js';
import {enhanceMemoriesWithAvailability} from "../data/cardAvailability.js";
import {affinityData} from "../data/affinity-data.js";
import Select from 'react-select';
import { toPng } from 'html-to-image';

// Функции для работы с localStorage
const STORAGE_KEY = 'showcase_data';

const loadFromStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
    }
    return null;
};

const saveToStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
};

function Showcase() {
    // Загружаем сохраненные данные или используем значения по умолчанию
    const savedData = loadFromStorage();

    const [selectedCompanion, setSelectedCompanion] = useState(() => {
        if (savedData?.selectedCompanion) {
            return compData.find(c => c.id === savedData.selectedCompanion.id) || null;
        }
        return null;
    });

    const [selectedMCWeapon, setSelectedMCWeapon] = useState(() => {
        if (savedData?.selectedMCWeapon) {
            return compData.find(c => c.id === savedData.selectedMCWeapon.id) || null;
        }
        return null;
    });

    const [solarCards, setSolarCards] = useState(() => {
        if (savedData?.solarCards) {
            return savedData.solarCards.map(cardId => {
                if (cardId === null) return null;
                return memoriesData.find(c => c.id === cardId) || null;
            });
        }
        return [null, null];
    });

    const [lunarCards, setLunarCards] = useState(() => {
        if (savedData?.lunarCards) {
            return savedData.lunarCards.map(cardId => {
                if (cardId === null) return null;
                return memoriesData.find(c => c.id === cardId) || null;
            });
        }
        return [null, null, null, null];
    });

    const [affinityLevel, setAffinityLevel] = useState(() => {
        return savedData?.affinityLevel || 0;
    });

    const [isCapturing, setIsCapturing] = useState(false);
    const showcaseRef = useRef();
    const captureRef = useRef();

    const companionModalRef = useRef();
    const mcWeaponModalRef = useRef();
    const cardModalRef = useRef();
    const [modalPlacement, setModalPlacement] = useState(null);
    const [modalIndex, setModalIndex] = useState(null);

    // Опции для affinity
    const affinityOptions = useMemo(() => {
        const levels = affinityData[0]?.affinityLVL || [];
        return levels.map(lvl => ({
            value: lvl,
            label: `${lvl} LVL`
        }));
    }, []);

    // Сохраняем все данные при изменении
    useEffect(() => {
        const dataToSave = {
            selectedCompanion: selectedCompanion ? { id: selectedCompanion.id } : null,
            selectedMCWeapon: selectedMCWeapon ? { id: selectedMCWeapon.id } : null,
            solarCards: solarCards.map(card => card ? card.id : null),
            lunarCards: lunarCards.map(card => card ? card.id : null),
            affinityLevel: affinityLevel,
        };
        saveToStorage(dataToSave);
    }, [selectedCompanion, selectedMCWeapon, solarCards, lunarCards, affinityLevel]);

    // Функция для создания скриншота
    const captureScreenshot = async () => {
        if (!captureRef.current) return; // Используем captureRef вместо showcaseRef

        setIsCapturing(true);

        try {
            const element = captureRef.current;

            // Добавляем padding для отступов при скриншоте
            element.style.padding = '1px';

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: 'var(--bg-primary)',
                cacheBust: true,
                width: element.scrollWidth,
                height: element.scrollHeight,
                filter: (node) => {
                    return !node.classList?.contains('modal') &&
                        !node.closest?.('.modal');
                }
            });

            // Убираем временный padding
            element.style.padding = '0';

            const link = document.createElement('a');
            link.download = `showcase_${new Date().toISOString().slice(0, 10)}.png`;
            link.href = dataUrl;
            link.click();

        } catch (error) {
            console.error('Error capturing screenshot:', error);
            alert('Failed to capture screenshot. Please try again.');
            // Убираем padding в случае ошибки
            if (captureRef.current) {
                captureRef.current.style.padding = '0';
            }
        } finally {
            setIsCapturing(false);
        }
    };

    const showCompanionModal = () => {
        companionModalRef.current?.showModal();
    };

    const showMCWeaponModal = () => {
        mcWeaponModalRef.current?.showModal();
    };

    const showCardModal = (placement, index) => {
        setModalPlacement(placement);
        setModalIndex(index);
        cardModalRef.current?.showModal();
    };

    const handleSelectCompanion = (companion) => {
        setSelectedCompanion(companion);
        companionModalRef.current?.closeModal();
    };

    const handleSelectMCWeapon = (companion) => {
        setSelectedMCWeapon(companion);
        mcWeaponModalRef.current?.closeModal();
    };

    const handleSelectCard = (card) => {
        if (modalPlacement === 'solar') {
            const newSolar = [...solarCards];
            newSolar[modalIndex] = card;
            setSolarCards(newSolar);
        } else if (modalPlacement === 'lunar') {
            const newLunar = [...lunarCards];
            newLunar[modalIndex] = card;
            setLunarCards(newLunar);
        }
        cardModalRef.current?.closeModal();
    };

    // Функция для получения данных карточки с пересчетом статов
    const getCardData = (card) => {
        if (!card) return null;
        const level = getCardLevel(card.id);
        const rank = getCardRank(card.id);
        const isAscended = getCardAscend(card.id);
        const protocores = getCardProtocores(card.id);
        const baseStats = getStatsWithRank(card, level, rank, isAscended);

        // Используем calculateFinalStats для корректного расчета всех статов
        const stats = baseStats ? calculateFinalStats(card, baseStats, protocores) : null;

        return {level, rank, isAscended, protocores, stats};
    };

    // Функция для подсчета суммы статов со всех карточек
    const calculateTotalStats = useMemo(() => {
        const allCards = [...solarCards, ...lunarCards].filter(card => card !== null);

        const total = {
            hp: 0,
            atk: 0,
            def: 0,
            critRate: 0,
            critDmg: 0,
            dmgBoost: 0,
            oathStrength: 0,
            oathRecoveryBoost: 0,
            expeditedEnergyBoost: 0,
        };

        allCards.forEach(card => {
            const cardData = getCardData(card);
            if (cardData?.stats) {
                const stats = cardData.stats;
                total.hp += stats.hp || 0;
                total.atk += stats.atk || 0;
                total.def += stats.def || 0;
                total.critRate += stats.critRate || 0;
                total.critDmg += stats.critDmg || 0;
                total.dmgBoost += stats.dmgBoost || 0;
                total.oathStrength += stats.oathStrength || 0;
                total.oathRecoveryBoost += stats.oathRecoveryBoost || 0;
                total.expeditedEnergyBoost += stats.expeditedEnergyBoost || 0;
            }
        });

        return total;
    }, [solarCards, lunarCards]);

    // Функция для подсчета affinity бонусов
    const calculateAffinityBonus = useMemo(() => {
        if (affinityLevel === 0 || !affinityData.length) {
            return { hp: 0, atk: 0, def: 0 };
        }

        const affinityEntry = affinityData[0];
        const levels = affinityEntry.affinityLVL;
        const index = levels.indexOf(affinityLevel);

        if (index === -1) {
            return { hp: 0, atk: 0, def: 0 };
        }

        const hpPerLevel = affinityEntry.hp || 0;
        const atkPerLevel = affinityEntry.atk || 0;
        const defPerLevel = affinityEntry.def || 0;
        const levelCount = index + 1;

        return {
            hp: hpPerLevel * levelCount,
            atk: atkPerLevel * levelCount,
            def: defPerLevel * levelCount,
        };
    }, [affinityLevel]);

    // Финальные статы с учетом affinity
    const finalStats = useMemo(() => {
        const affinityBonus = calculateAffinityBonus;
        return {
            hp: calculateTotalStats.hp + affinityBonus.hp,
            atk: calculateTotalStats.atk + affinityBonus.atk,
            def: calculateTotalStats.def + affinityBonus.def,
            critRate: calculateTotalStats.critRate,
            critDmg: calculateTotalStats.critDmg + 150,
            dmgBoost: calculateTotalStats.dmgBoost,
            oathStrength: calculateTotalStats.oathStrength,
            oathRecoveryBoost: calculateTotalStats.oathRecoveryBoost,
            expeditedEnergyBoost: calculateTotalStats.expeditedEnergyBoost,
        };
    }, [calculateTotalStats, calculateAffinityBonus]);

    // Функция для отображения слота карточки с протокорами
    const renderCardSlot = (card, placement, index) => {
        const cardData = card ? getCardData(card) : null;

        return (
            <div
                className={`${styles.cardSlot} ${!card ? styles.emptySlot : ''}`}
                onClick={() => showCardModal(placement, index)}
            >
                {card ? (
                    <>
                        <div>
                            {/* Информация о карточке — уровень и ранг */}
                            <div className={styles.cardInfo}>
                                <span className={styles.cardLevel}>Lv.{cardData?.level || 1} </span>
                                <span className={styles.cardRank}>Rank {cardData?.rank || 0} </span>
                            </div>

                            <div className={styles.cardWrapper}>
                                <Card data={card} isSmall={false}/>
                            </div>
                        </div>

                        <div className={styles.protocoresContainer}>
                            {cardData?.protocores && cardData.protocores.length > 0 ? (
                                cardData.protocores.map(protocore => (
                                    <div key={protocore.id} className={styles.protocoreWrapper}>
                                        <ProtocoreBlock
                                            protocore={protocore}
                                            hideChange={true}
                                            hideDelete={true}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noProtocores}>No protocores</div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={styles.emptySlotContent}>
                        <span>+</span>
                        <span className={styles.emptyLabel}>Add {placement} card</span>
                    </div>
                )}
            </div>
        );
    };

    // Доступные карточки для выбора
    const getAvailableCards = (placement) => {
        return enhanceMemoriesWithAvailability(memoriesData)
            .filter(card => card.isAvailable === true && card.placementName === placement);
    };

    return (
        <div className={styles.wrapper}>
            {/* Кнопка для скриншота */}
            <button
                className={styles.screenshotButton}
                onClick={captureScreenshot}
                disabled={isCapturing}
            >
                {isCapturing ? '📸 Capturing...' : '📸 Save as Image'}
            </button>

            <div ref={captureRef}>
            <section
                ref={showcaseRef}
                className={styles.container}
                id="showcase-container"
            >
                {/* компаньон и MC Weapon */}
                <div className={styles.topContainer}>
                    <div className={styles.companionSection}>
                        {/* Кнопка выбора компаньона */}
                        <button className={styles.addCompanionBtn} onClick={showCompanionModal}>
                            {selectedCompanion ? (
                                <div className={styles.companionChar}>
                                    <img
                                        className={styles.companionImage}
                                        src={getImageUrl(selectedCompanion.img)}
                                        alt={selectedCompanion.companionName}
                                    />
                                    <div className={styles.companionName}>
                                        {selectedCompanion.companionName}
                                    </div>
                                </div>

                            ) : (
                                <div className={styles.addCompanionText}>+ Add Companion</div>
                            )}
                        </button>

                        {/* Кнопка выбора MC Weapon */}
                        <button className={styles.addCompanionBtn} onClick={showMCWeaponModal}>
                            {selectedMCWeapon ? (
                                <div className={styles.companionChar}>
                                    <img
                                        className={styles.mcWeaponImage}
                                        src={getImageUrl(selectedMCWeapon.imgWeapon)}
                                        alt={selectedMCWeapon.weaponName}
                                    />
                                    <div className={styles.companionName}>
                                        MC Weapon: {selectedMCWeapon.weaponName}
                                    </div>
                                </div>

                            ) : (
                                <div className={styles.addCompanionText}>+ Add MC Weapon</div>
                            )}
                        </button>
                    </div>

                    <div>
                        <table className={styles.statsTable}>
                            <tbody>
                            <tr>
                                <th>HP</th>
                                <td>{Math.round(finalStats.hp)}</td>
                                <th>Crit Rate</th>
                                <td>{finalStats.critRate.toFixed(2)}%</td>
                                <th>Oath Strength</th>
                                <td>{finalStats.oathStrength.toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th>ATK</th>
                                <td>{Math.round(finalStats.atk)}</td>
                                <th>Crit DMG</th>
                                <td>{finalStats.critDmg.toFixed(2)}%</td>
                                <th>Oath Recovery Boost</th>
                                <td>{finalStats.oathRecoveryBoost.toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <th>DEF</th>
                                <td>{Math.round(finalStats.def)}</td>
                                <th>DMG Boost to Weakened</th>
                                <td>{finalStats.dmgBoost.toFixed(2)}%</td>
                                <th>Expedited Energy Boost</th>
                                <td>{finalStats.expeditedEnergyBoost.toFixed(2)}%</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className={styles.bonuses}>
                            <div className={styles.affinity}>
                                <Select
                                    options={affinityOptions}
                                    value={affinityOptions.find(opt => opt.value === affinityLevel)}
                                    onChange={(option) => setAffinityLevel(option ? option.value : 0)}
                                    placeholder="Select Affinity LVL"
                                    className={styles.selectAffinityContainer}
                                    isClearable
                                />
                                <div className={styles.affinityBonus}>
                                    Affinity Bonus: +{calculateAffinityBonus.hp} HP, +{calculateAffinityBonus.atk} ATK, +{calculateAffinityBonus.def} DEF
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* карточки */}
                <div className={styles.cardsSection}>
                    {/* Solar карточки */}
                    <div className={styles.solarRow}>
                        <div className={styles.rowLabel}>SOLAR</div>
                        <div className={styles.solarCardsRow}>
                            {solarCards.map((card, index) => (
                                <div key={`solar-${index}`} className={styles.cardWrapperSlot}>
                                    {renderCardSlot(card, 'solar', index)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lunar карточки */}
                    <div className={styles.lunarRow}>
                        <div className={styles.rowLabel}>LUNAR</div>
                        <div className={styles.lunarCardsRow}>
                            {lunarCards.map((card, index) => (
                                <div key={`lunar-${index}`} className={styles.cardWrapperSlot}>
                                    {renderCardSlot(card, 'lunar', index)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            </div>

            {/* Модалка выбора компаньона */}
            <ModalWindow
                ref={companionModalRef}
                title="Select Companion"
                width={600}
                tag={
                    <div className={styles.companionGrid}>
                        {compData
                            .filter(companion => companion.img && companion.companionName)
                            .map(companion => (
                                <button
                                    key={companion.id}
                                    className={styles.companionItem}
                                    onClick={() => handleSelectCompanion(companion)}
                                >
                                    <img
                                        className={styles.companionImg}
                                        src={getImageUrl(companion.img)}
                                        alt={companion.companionName}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className={styles.companionTitle}>
                                        {companion.companionName}
                                    </div>
                                </button>
                            ))}
                    </div>
                }
            />

            {/* Модалка выбора MC Weapon */}
            <ModalWindow
                ref={mcWeaponModalRef}
                title="Select MC Weapon"
                width={600}
                tag={
                    <div className={styles.companionGrid}>
                        {compData
                            .filter(companion => companion.imgWeapon && companion.weaponName)
                            .map(companion => (
                                <button
                                    key={companion.id}
                                    className={styles.companionItem}
                                    onClick={() => handleSelectMCWeapon(companion)}
                                >
                                    <img
                                        className={styles.companionImg}
                                        src={getImageUrl(companion.imgWeapon)}
                                        alt={companion.weaponName}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className={styles.companionTitle}>
                                        {companion.weaponName}
                                    </div>
                                </button>
                            ))}
                    </div>
                }
            />

            {/* Модалка выбора карточки */}
            <ModalWindow
                ref={cardModalRef}
                title={`Select ${modalPlacement?.toUpperCase()} Card`}
                width={600}
                tag={
                    <div className={styles.cardGrid}>
                        {getAvailableCards(modalPlacement).map(card => (
                            <button
                                key={card.id}
                                className={styles.cardItem}
                                onClick={() => handleSelectCard(card)}
                            >
                                <Card data={card} isSmall={true}/>
                            </button>
                        ))}
                        {getAvailableCards(modalPlacement).length === 0 && (
                            <div className={styles.emptyCards}>
                                No available {modalPlacement} cards
                            </div>
                        )}
                    </div>
                }
            />
        </div>
    );
}

export default Showcase;