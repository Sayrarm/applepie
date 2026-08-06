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
import {toPng} from 'html-to-image';
import FilterSortBarMemories from './FilterSortBarMemories.jsx';
import {useSearch} from '../hooks/useSearch';
import {useSort} from '../hooks/useSort';
import {useFilter} from '../hooks/useFilter';
import {Button} from "antd";
import CombatCalculations from "./CombatCalculations.jsx";

// Ключ для localStorage
const STORAGE_KEY = 'showcase_teams';

// Функции для работы с localStorage
const loadTeamsFromStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading teams from localStorage:', e);
    }
    return null;
};

const saveTeamsToStorage = (teams) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
    } catch (e) {
        console.error('Error saving teams to localStorage:', e);
    }
};

function Showcase() {
    // Загружаем сохраненные команды
    const savedTeams = loadTeamsFromStorage();

    // Состояние для всех команд
    const [teams, setTeams] = useState(() => {
        if (savedTeams && savedTeams.length > 0) {
            return savedTeams;
        }
        // Дефолтная команда
        return [{
            id: Date.now(),
            name: 'Team 1',
            selectedCompanion: null,
            selectedMCWeapon: null,
            solarCards: [null, null],
            lunarCards: [null, null, null, null],
            affinityLevel: 0
        }];
    });

    const [activeTeamIndex, setActiveTeamIndex] = useState(0);
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingName, setEditingName] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);
    const showcaseRef = useRef();
    const captureRef = useRef();

    const companionModalRef = useRef();
    const mcWeaponModalRef = useRef();
    const cardModalRef = useRef();
    const renameModalRef = useRef();
    const [modalPlacement, setModalPlacement] = useState(null);
    const [modalIndex, setModalIndex] = useState(null);
    const [longPressTimer, setLongPressTimer] = useState(null);

    // Хуки для фильтрации и сортировки карточек в модалке Showcase
    const filterModalRef = useRef();
    const {searchQuery, onSearch, clearSearch} = useSearch('showcaseCardSelect');
    const {sortCriteria, handleSortChange, clearSorting, sortMemories} = useSort('showcaseCardSelect');
    const {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        applyFilters,
        clearFilters,
        filterMemories
    } = useFilter('showcaseCardSelect');

    // Получаем текущую активную команду
    const currentTeam = teams[activeTeamIndex] || teams[0];

    // Опции для affinity
    const affinityOptions = useMemo(() => {
        const levels = affinityData[0]?.affinityLVL || [];
        return levels.map(lvl => ({
            value: lvl,
            label: `${lvl} LVL`
        }));
    }, []);

    // Обработчики для переименования
    const handleTabContextMenu = (e, team) => {
        e.preventDefault();
        startEditingName(team.name);
    };

    const handleTabTouchStart = (e, team) => {
        const timer = setTimeout(() => {
            startEditingName(team.name);
        }, 800);
        setLongPressTimer(timer);
    };

    const handleTabTouchEnd = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }
    };

    // Сохраняем команды при изменении
    useEffect(() => {
        saveTeamsToStorage(teams);
    }, [teams]);

    // Обновляем текущую команду
    const updateCurrentTeam = (updates) => {
        const updatedTeams = [...teams];
        updatedTeams[activeTeamIndex] = {
            ...updatedTeams[activeTeamIndex],
            ...updates
        };
        setTeams(updatedTeams);
    };

    // Добавление новой команды
    const addNewTeam = () => {
        const newTeam = {
            id: Date.now(),
            name: `Team ${teams.length + 1}`,
            selectedCompanion: null,
            selectedMCWeapon: null,
            solarCards: [null, null],
            lunarCards: [null, null, null, null],
            affinityLevel: 0
        };
        setTeams([...teams, newTeam]);
        setActiveTeamIndex(teams.length);
    };

    // Удаление команды
    const deleteTeam = (index) => {
        if (teams.length <= 1) {
            alert('Cannot delete the last team!');
            return;
        }
        if (window.confirm(`Are you sure you want to delete "${teams[index].name}"?`)) {
            const updatedTeams = teams.filter((_, i) => i !== index);
            setTeams(updatedTeams);
            if (activeTeamIndex >= updatedTeams.length) {
                setActiveTeamIndex(updatedTeams.length - 1);
            } else if (activeTeamIndex === index) {
                setActiveTeamIndex(Math.max(0, index - 1));
            }
        }
    };

    // Изменение названия команды
    const startEditingName = (name) => {
        setEditingName(name);
        renameModalRef.current?.showModal();
    };

    const saveTeamName = () => {
        if (editingName.trim()) {
            updateCurrentTeam({name: editingName.trim()});
        }
        setIsEditingName(false);
        renameModalRef.current?.closeModal();
    };

    // Функция для очистки всех данных
    const clearCurrentTeam = () => {
        if (window.confirm(`Are you sure you want to clear all data for "${currentTeam.name}"?`)) {
            const updatedTeams = [...teams];
            updatedTeams[activeTeamIndex] = {
                ...updatedTeams[activeTeamIndex],
                selectedCompanion: null,
                selectedMCWeapon: null,
                solarCards: [null, null],
                lunarCards: [null, null, null, null],
                affinityLevel: 0
            };
            setTeams(updatedTeams);
        }
    };

    // Функция для создания скриншота
    const captureScreenshot = async () => {
        if (!captureRef.current) return;

        setIsCapturing(true);

        try {
            const element = captureRef.current;

            // Добавляем padding для отступов при скриншоте
            element.style.padding = '1px';

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 3,
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
            link.download = `showcase_${currentTeam.name}_${new Date().toISOString().slice(0, 10)}.png`;
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
        updateCurrentTeam({selectedCompanion: companion});
        companionModalRef.current?.closeModal();
    };

    const handleSelectMCWeapon = (companion) => {
        updateCurrentTeam({selectedMCWeapon: companion});
        mcWeaponModalRef.current?.closeModal();
    };

    const handleSelectCard = (card) => {
        const newSolar = [...currentTeam.solarCards];
        const newLunar = [...currentTeam.lunarCards];

        if (modalPlacement === 'solar') {
            newSolar[modalIndex] = card;
            updateCurrentTeam({solarCards: newSolar});
        } else if (modalPlacement === 'lunar') {
            newLunar[modalIndex] = card;
            updateCurrentTeam({lunarCards: newLunar});
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
        const allCards = [...currentTeam.solarCards, ...currentTeam.lunarCards].filter(card => card !== null);

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
    }, [currentTeam.solarCards, currentTeam.lunarCards]);

    // Функция для подсчета affinity бонусов
    const calculateAffinityBonus = useMemo(() => {
        const affinityLevel = currentTeam.affinityLevel || 0;
        if (affinityLevel === 0 || !affinityData.length) {
            return {hp: 0, atk: 0, def: 0};
        }

        const affinityEntry = affinityData[0];
        const levels = affinityEntry.affinityLVL;

        // Проверяем, есть ли такой уровень в массиве
        const index = levels.indexOf(affinityLevel);
        if (index === -1) {
            return {hp: 0, atk: 0, def: 0};
        }

        const hpPerLevel = affinityEntry.hp || 0;
        const atkPerLevel = affinityEntry.atk || 0;
        const defPerLevel = affinityEntry.def || 0;

        // Используем сам уровень, деленный на шаг (5)
        // Например: 5/5 = 1, 10/5 = 2, 15/5 = 3, и т.д.
        const levelCount = affinityLevel / 5;

        return {
            hp: hpPerLevel * levelCount,
            atk: atkPerLevel * levelCount,
            def: defPerLevel * levelCount,
        };
    }, [currentTeam.affinityLevel]);

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

    // Получаем доступные карточки с фильтрацией и сортировкой
    const getAvailableCards = (placement) => {
        // Сначала получаем все доступные карточки
        const available = enhanceMemoriesWithAvailability(memoriesData)
            .filter(card => card.isAvailable === true && card.placementName === placement);

        // Применяем фильтры
        const filtered = filterMemories(available);

        // Применяем поиск
        const searched = filtered.filter(card => {
            return card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.char.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // Применяем сортировку
        return sortMemories(searched);
    };

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
                        <div className={styles.cardSlotEquipped}>
                            {/* Информация о карточке — уровень и ранг */}
                            <div className={styles.cardInfo}>
                                <span className={styles.cardLevel}>Lv.{cardData?.level || 1} {cardData?.isAscended && <span className={styles.ascendMark}>✦</span>}</span>
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

    const resetAllSettings = () => {
        setSelectedChar('ALL');
        clearSorting();
        clearSearch();
        clearFilters();
        if (filterModalRef.current) {
            filterModalRef.current.clearAll();
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* Вкладки команд */}
            <div className={styles.tabsContainer}>

            </div>
            {/* Кнопки для скриншота и очистки */}
            <div className={styles.utilButtons}>
                <button
                    className={styles.screenshotButton}
                    onClick={captureScreenshot}
                    disabled={isCapturing}
                >
                    {isCapturing ? '📸 Capturing...' : '📸 Save as Image'}
                </button>

                <button
                    className={styles.clearButton}
                    onClick={clearCurrentTeam}
                >
                    🗑️ Clear All
                </button>
            </div>

            {/* Кнопки управления */}
            <div className={styles.teamControls}>
                {teams.map((team, index) => (
                    <div key={team.id} className={styles.tabWrapper}>
                        <button
                            className={`${styles.teamNameButton} ${activeTeamIndex === index ? styles.activeTab : ''}`}
                            onClick={() => setActiveTeamIndex(index)}
                            onContextMenu={(e) => handleTabContextMenu(e, team)}
                            onTouchStart={(e) => handleTabTouchStart(e, team)}
                            onTouchEnd={handleTabTouchEnd}
                            onTouchCancel={handleTabTouchEnd}
                        >
                            {team.name}
                        </button>
                        <button
                            className={styles.deleteTab}
                            onClick={() => deleteTeam(index)}
                            title="Delete team"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button className={styles.addTeamButton} onClick={addNewTeam}>
                    + Add Team
                </button>

                <ModalWindow
                    ref={renameModalRef}
                    title="Rename Team"
                    width={400}
                    tag={
                        <div className={styles.renameModal}>
                            <input
                                className={styles.nameInputModal}
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveTeamName();
                                    } else if (e.key === 'Escape') {
                                        renameModalRef.current?.closeModal();
                                    }
                                }}
                                autoFocus
                            />
                            <div className={styles.renameButtons}>
                                <Button className={styles.saveButton} onClick={saveTeamName}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    }
                />
            </div>

            <div ref={captureRef} className={styles.captureRef}>

                <section
                    ref={showcaseRef}
                    className={styles.container}
                    id="showcase-container"
                >
                    {/* компаньон и MC Weapon */}
                    <div className={styles.topContainer}>
                        {/* Кнопка выбора компаньона */}
                        <div className={styles.companionSection}>
                            <button className={styles.addCompanionBtn} onClick={showCompanionModal}>
                                {currentTeam.selectedCompanion ? (
                                    <div className={styles.companionChar}>
                                        <img
                                            className={styles.companionImage}
                                            src={getImageUrl(currentTeam.selectedCompanion.img)}
                                            alt={currentTeam.selectedCompanion.companionName}
                                        />
                                        <div className={styles.companionName}>
                                            {currentTeam.selectedCompanion.companionName}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.addCompanionText}>+ Add Companion</div>
                                )}
                            </button>
                            {/* Кнопка выбора MC Weapon */}
                            <button className={styles.addCompanionBtn} onClick={showMCWeaponModal}>
                                {currentTeam.selectedMCWeapon ? (
                                    <div className={styles.companionChar}>
                                        <img
                                            className={styles.mcWeaponImage}
                                            src={getImageUrl(currentTeam.selectedMCWeapon.imgWeapon)}
                                            alt={currentTeam.selectedMCWeapon.weaponName}
                                        />
                                        <div className={styles.companionName}>
                                            MC Weapon: {currentTeam.selectedMCWeapon.weaponName}
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
                                    <td>{finalStats.hp.toFixed(2)}</td>
                                    <th>Crit Rate</th>
                                    <td>{finalStats.critRate.toFixed(2)}%</td>
                                    <th>Oath Strength</th>
                                    <td>{finalStats.oathStrength.toFixed(2)}%</td>
                                </tr>
                                <tr>
                                    <th>ATK</th>
                                    <td>{finalStats.atk.toFixed(2)}</td>
                                    <th>Crit DMG</th>
                                    <td>{finalStats.critDmg.toFixed(2)}%</td>
                                    <th>Oath Recovery Boost</th>
                                    <td>{finalStats.oathRecoveryBoost.toFixed(2)}%</td>
                                </tr>
                                <tr>
                                    <th>DEF</th>
                                    <td>{finalStats.def.toFixed(2)}</td>
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
                                        value={affinityOptions.find(opt => opt.value === currentTeam.affinityLevel)}
                                        onChange={(option) => updateCurrentTeam({affinityLevel: option ? option.value : 0})}
                                        placeholder="Select Affinity LVL"
                                        className={styles.selectAffinityContainer}
                                        isClearable
                                        isSearchable={false}
                                    />
                                    <div className={styles.affinityBonus}>
                                        Affinity Bonus: +{calculateAffinityBonus.hp} HP,
                                        +{calculateAffinityBonus.atk} ATK, +{calculateAffinityBonus.def} DEF
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
                                {currentTeam.solarCards.map((card, index) => (
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
                                {currentTeam.lunarCards.map((card, index) => (
                                    <div key={`lunar-${index}`} className={styles.cardWrapperSlot}>
                                        {renderCardSlot(card, 'lunar', index)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


            </div>

            <br/>
            <br/>


            {/* CombatCalculations - показываем только если есть Компаньон и MC Weapon */}
            {currentTeam.selectedCompanion && currentTeam.selectedMCWeapon && (
                <CombatCalculations
                    stats={finalStats}
                    selectedCompanion={currentTeam.selectedCompanion}
                    selectedMCWeapon={currentTeam.selectedMCWeapon}
                    solarCards={currentTeam.solarCards}
                />
            )}

            {/* Модалка выбора компаньона */}
            <ModalWindow
                ref={companionModalRef}
                title="Select Companion"
                width={720}
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
                width={720}
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

            {/* Модалка выбора карточки с фильтрами */}
            <ModalWindow
                ref={cardModalRef}
                title={`Select ${modalPlacement?.toUpperCase()} Card`}
                width={950}
                tag={
                    <div className={styles.cardSelectModal}>
                        <FilterSortBarMemories
                            searchQuery={searchQuery}
                            onSearch={onSearch}
                            sortCriteria={sortCriteria}
                            handleSortChange={handleSortChange}
                            clearSorting={clearSorting}
                            selectedChar={selectedChar}
                            setSelectedChar={setSelectedChar}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            applyFilters={applyFilters}
                            clearFilters={clearFilters}
                            filterModalRef={filterModalRef}
                            resetAllSettings={resetAllSettings}
                            storagePrefix="showcaseCardSelect"
                        />

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
                                    No available {modalPlacement} cards found
                                </div>
                            )}
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default Showcase;