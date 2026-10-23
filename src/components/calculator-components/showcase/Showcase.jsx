import {useState, useRef, useMemo, useEffect, useCallback} from "react";
import styles from "./Showcase.module.css";
import {Button} from "antd";
import {
    getShowcaseTeamsOrDefault,
    saveShowcaseTeams,
    deleteShowcaseTeam,
    createDefaultTeam,
    getActiveTeamId,
    saveActiveTeamId, loadTeamIntoOptimizer,
} from "@localstorage";
import {
    ModalWindow,
    RenderCardSlot,
    ModalChooseCard,
    AffinitySelect,
    ChooseCompanion,
    ChooseWeapon,
    CombatCalculations,
    StatsTable, HighlightProvider
} from "@components";
import {useScreenshot} from "@hooks";
import {
    getCardData,
    calculateTotalStats,
    calculateFinalStatsWithAffinity,
    calculateAffinityBonus,
} from "@data";
import {useTranslation} from "react-i18next";

function Showcase() {

    const [editingName, setEditingName] = useState("");
    const [editingTeamIndex, setEditingTeamIndex] = useState(null);
    const [longPressTimer, setLongPressTimer] = useState(null);
    const {t} = useTranslation();

    const showcaseRef = useRef();
    const captureRef = useRef();
    const renameModalRef = useRef();
    const cardModalRef = useRef();

    const {isCapturing, captureScreenshot} = useScreenshot();

    // Загружаем сохраненные команды
    const [teams, setTeams] = useState(() => getShowcaseTeamsOrDefault());

    // Восстанавливаем активную команду по сохранённому id
    const [activeTeamIndex, setActiveTeamIndex] = useState(() => {
        const savedId = getActiveTeamId();
        const initialTeams = getShowcaseTeamsOrDefault();
        const idx = initialTeams.findIndex((t) => String(t.id) === String(savedId));
        return idx >= 0 ? idx : 0;
    });

    useEffect(() => {
        const activeTeam = teams[activeTeamIndex];
        if (activeTeam) {
            saveActiveTeamId(activeTeam.id);
        }
    }, [activeTeamIndex, teams]);

    // Получаем текущую активную команду
    const currentTeam = teams[activeTeamIndex] || teams[0];

    // ===== ОБРАБОТЧИКИ ДЛЯ ПЕРЕИМЕНОВАНИЯ =====
    const handleTabContextMenu = (e, team, index) => {
        e.preventDefault();
        startEditingName(team.name, index);
    };

    const handleTabTouchStart = (e, team, index) => {
        const timer = setTimeout(() => {
            startEditingName(team.name, index);
        }, 800);
        setLongPressTimer(timer);
    };

    const handleTabTouchEnd = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }
    };

    // ===== СОХРАНЕНИЕ КОМАНД ПРИ ИЗМЕНЕНИИ =====
    useEffect(() => {
        saveShowcaseTeams(teams);
    }, [teams]);

    // ===== ОБНОВЛЕНИЕ ТЕКУЩЕЙ КОМАНДЫ =====
    const updateCurrentTeam = (updates) => {
        const updatedTeams = [...teams];
        updatedTeams[activeTeamIndex] = {
            ...updatedTeams[activeTeamIndex],
            ...updates,
        };
        setTeams(updatedTeams);
    };

    // ===== ДОБАВЛЕНИЕ НОВОЙ КОМАНДЫ =====
    const addNewTeam = () => {
        const newTeam = createDefaultTeam(`Team ${teams.length + 1}`);
        setTeams([...teams, newTeam]);
        setActiveTeamIndex(teams.length);
    };

    // ===== УДАЛЕНИЕ КОМАНДЫ =====
    const deleteTeam = (index) => {
        if (teams.length <= 1) {
            alert(t('Showcase.alertTeam'));
            return;
        }
        const teamToDelete = teams[index];
        if (
            window.confirm(
                t('Showcase.alertDeleteTeam', {teamToDelete: teamToDelete.name})
            )
        ) {
            deleteShowcaseTeam(teamToDelete.id);
            const updatedTeams = teams.filter((_, i) => i !== index);
            setTeams(updatedTeams);
            if (activeTeamIndex >= updatedTeams.length) {
                setActiveTeamIndex(updatedTeams.length - 1);
            } else if (activeTeamIndex === index) {
                setActiveTeamIndex(Math.max(0, index - 1));
            }
        }
    };

    // ===== ИЗМЕНЕНИЕ НАЗВАНИЯ КОМАНДЫ =====
    const startEditingName = (name, index) => {
        setEditingName(name);
        setEditingTeamIndex(index);
        renameModalRef.current?.showModal();
    };

    const saveTeamName = () => {
        if (editingName.trim() && editingTeamIndex !== null) {
            const updatedTeams = [...teams];
            updatedTeams[editingTeamIndex] = {
                ...updatedTeams[editingTeamIndex],
                name: editingName.trim(),
            };
            setTeams(updatedTeams);
        }
        setEditingTeamIndex(null);
        renameModalRef.current?.closeModal();
    };

    // ===== Отправка в Оптимайзер =====
    const handleSendToOptimizer = () => {
        const confirmed = window.confirm(
            t('Showcase.alertSendToOptimizer', { team: currentTeam.name })
        );
        if (!confirmed) return;

        loadTeamIntoOptimizer(currentTeam);
    };

    // ===== ОЧИСТКА ТЕКУЩЕЙ КОМАНДЫ =====
    const clearCurrentTeam = () => {
        if (
            window.confirm(
                t('Showcase.alertClearButton', {currentTeam: currentTeam.name}),
            )
        ) {
            const updatedTeams = [...teams];
            updatedTeams[activeTeamIndex] = {
                ...updatedTeams[activeTeamIndex],
                selectedCompanion: null,
                selectedMCWeapon: null,
                solarCards: [null, null],
                lunarCards: [null, null, null, null],
                affinityLevel: 0,
            };
            setTeams(updatedTeams);
        }
    };

    // ===== ОБРАБОТЧИК ВЫБОРА КАРТОЧКИ =====
    const handleSelectCard = (placement, index, card) => {
        if (placement === "solar") {
            const updatedSolarCards = [...currentTeam.solarCards];
            updatedSolarCards[index] = card;
            updateCurrentTeam({solarCards: updatedSolarCards});
        } else if (placement === "lunar") {
            const updatedLunarCards = [...currentTeam.lunarCards];
            updatedLunarCards[index] = card;
            updateCurrentTeam({lunarCards: updatedLunarCards});
        }
    };

    // ===== ОБРАБОТЧИК ИЗМЕНЕНИЯ AFFINITY =====
    const handleAffinityChange = (level) => {
        updateCurrentTeam({affinityLevel: level});
    };

    // ===== ОБЕРНУТАЯ ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ КАРТОЧКИ =====
    const getCardDataWrapper = useCallback((card) => {
        return getCardData(card);
    }, []);

    // ===== ПОДСЧЁТ СУММЫ СТАТОВ =====
    const totalStats = useMemo(() => {
        return calculateTotalStats(
            currentTeam.solarCards,
            currentTeam.lunarCards,
            getCardData,
        );
    }, [currentTeam.solarCards, currentTeam.lunarCards]);

    // ===== ПОДСЧЁТ AFFINITY БОНУСОВ =====
    const affinityBonus = useMemo(() => {
        return calculateAffinityBonus(currentTeam.affinityLevel);
    }, [currentTeam.affinityLevel]);

    // ===== ФИНАЛЬНЫЕ СТАТЫ С УЧЁТОМ AFFINITY =====
    const finalStats = useMemo(() => {
        return calculateFinalStatsWithAffinity(totalStats, affinityBonus);
    }, [totalStats, affinityBonus]);

    return (
        <HighlightProvider>
            <div className={styles.wrapper}>
                {/* Кнопки для скриншота и очистки */}
                <div className={styles.utilButtons}>
                    <button
                        className={styles.screenshotButton}
                        onClick={() =>
                            captureScreenshot(captureRef.current, currentTeam.name)
                        }
                        disabled={isCapturing}
                    >
                        {isCapturing ? t('Showcase.imageButtonActive') : t('Showcase.imageButton')}
                    </button>

                    <button className={styles.clearButton} onClick={clearCurrentTeam}>
                        {t('Showcase.clearButton')}
                    </button>

                    <button
                        className={styles.sendToOptimizerButton}
                        onClick={handleSendToOptimizer}
                    >
                        {t('Showcase.sendToOptimizerButton')}
                    </button>
                </div>

                {/* Кнопки управления */}
                <div className={styles.teamControls}>
                    {teams.map((team, index) => (
                        <div key={team.id} className={styles.tabWrapper}>
                            <button
                                className={`${styles.teamNameButton} ${activeTeamIndex === index ? styles.activeTab : ""}`}
                                onClick={() => setActiveTeamIndex(index)}
                                onContextMenu={(e) => handleTabContextMenu(e, team, index)}
                                onTouchStart={(e) => handleTabTouchStart(e, team, index)}
                                onTouchEnd={handleTabTouchEnd}
                                onTouchCancel={handleTabTouchEnd}
                            >
                                {team.name}
                            </button>
                            <button
                                className={styles.deleteTab}
                                onClick={() => deleteTeam(index)}
                                title={t('Showcase.deletePlaceholder')}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button className={styles.addTeamButton} onClick={addNewTeam}>
                        {t('Showcase.addTeamButton')}
                    </button>

                    <ModalWindow
                        ref={renameModalRef}
                        title={t('Showcase.titleModalRename')}
                        width={400}
                        tag={
                            <div className={styles.renameModal}>
                                <input
                                    className={styles.nameInputModal}
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveTeamName();
                                        } else if (e.key === "Escape") {
                                            setEditingTeamIndex(null);
                                            renameModalRef.current?.closeModal();
                                        }
                                    }}
                                    autoFocus
                                />
                                <div className={styles.renameButtons}>
                                    <Button className={styles.saveButton} onClick={saveTeamName}>
                                        {t('Showcase.saveButton')}
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
                            <div className={styles.companionSection}>
                                <ChooseCompanion
                                    selectedCompanion={currentTeam.selectedCompanion}
                                    onSelectCompanion={(companion) =>
                                        updateCurrentTeam({selectedCompanion: companion})
                                    }
                                />
                                <ChooseWeapon
                                    selectedMCWeapon={currentTeam.selectedMCWeapon}
                                    onSelectMCWeapon={(companion) =>
                                        updateCurrentTeam({selectedMCWeapon: companion})
                                    }
                                />
                            </div>

                            <div>
                                <StatsTable stats={finalStats}/>

                                <div className={styles.bonuses}>
                                    <AffinitySelect
                                        value={currentTeam.affinityLevel}
                                        onChange={handleAffinityChange}
                                    />
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
                                        <div
                                            key={`solar-${index}`}
                                            className={styles.cardWrapperSlot}
                                        >
                                            <RenderCardSlot
                                                card={card}
                                                placement="solar"
                                                index={index}
                                                getCardData={getCardDataWrapper}
                                                cardModalRef={cardModalRef}
                                                smallCard={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Lunar карточки */}
                            <div className={styles.lunarRow}>
                                <div className={styles.rowLabel}>LUNAR</div>
                                <div className={styles.lunarCardsRow}>
                                    {currentTeam.lunarCards.map((card, index) => (
                                        <div
                                            key={`lunar-${index}`}
                                            className={styles.cardWrapperSlot}
                                        >
                                            <RenderCardSlot
                                                card={card}
                                                placement="lunar"
                                                index={index}
                                                getCardData={getCardDataWrapper}
                                                cardModalRef={cardModalRef}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Модалка выбора карточки с фильтрами */}
                        <ModalChooseCard onSelectCard={handleSelectCard} ref={cardModalRef}/>
                    </section>
                </div>

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
        </HighlightProvider>
    );
}

export default Showcase;
