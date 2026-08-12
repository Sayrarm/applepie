import {useState, useRef, useMemo, useEffect} from "react";
import styles from "./Showcase.module.css";
import Select from 'react-select';
import {toPng} from 'html-to-image';
import {Button} from "antd";
import CombatCalculations from "./CombatCalculations.jsx";
import ChooseCompanionAndWeapon from "./ChooseCompanionAndWeapon.jsx";
import ChooseTeamCards from "./ChooseTeamCards.jsx";
import ModalWindow from "@components/ui/ModalWindow.jsx";
import {
    calculateFinalStats,
    getStatsWithRank,
    affinityData
} from "@data";
import {
    getCardLevel,
    getCardRank,
    getCardAscend,
    getCardProtocores
} from '@localstorage';

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
    const renameModalRef = useRef();
    const [longPressTimer, setLongPressTimer] = useState(null);

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

                        <ChooseCompanionAndWeapon
                            selectedCompanion={currentTeam.selectedCompanion}
                            selectedMCWeapon={currentTeam.selectedMCWeapon}
                            onSelectCompanion={(companion) => updateCurrentTeam({selectedCompanion: companion})}
                            onSelectMCWeapon={(companion) => updateCurrentTeam({selectedMCWeapon: companion})}
                        />

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
                    <ChooseTeamCards
                        solarCards={currentTeam.solarCards}
                        lunarCards={currentTeam.lunarCards}
                        onSelectCard={(placement, index, card) => {
                            const newSolar = [...currentTeam.solarCards];
                            const newLunar = [...currentTeam.lunarCards];

                            if (placement === 'solar') {
                                newSolar[index] = card;
                                updateCurrentTeam({solarCards: newSolar});
                            } else if (placement === 'lunar') {
                                newLunar[index] = card;
                                updateCurrentTeam({lunarCards: newLunar});
                            }
                        }}
                        getCardData={getCardData}
                    />
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

        </div>
    );
}

export default Showcase;