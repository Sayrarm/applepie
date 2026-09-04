import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import styles from "./Showcase.module.css";
import Select from "react-select";
import { Button } from "antd";
import CombatCalculations from "./CombatCalculations.jsx";
import ModalWindow from "@components/ui/ModalWindow.jsx";
import {
  getShowcaseTeamsOrDefault,
  saveShowcaseTeams,
  deleteShowcaseTeam,
  createDefaultTeam,
} from "@localstorage";
import {
  ChooseCompanionAndWeapon,
  RenderCardSlot,
  ModalChooseCard,
} from "@components";
import { useScreenshot } from "@hooks";
import {
  getCardData,
  calculateTotalStats,
  calculateAffinityBonus,
  calculateFinalStatsWithAffinity,
  affinityData,
} from "@data";

function Showcase() {
  // Загружаем сохраненные команды
  const [teams, setTeams] = useState(() => getShowcaseTeamsOrDefault());

  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [longPressTimer, setLongPressTimer] = useState(null);

  const showcaseRef = useRef();
  const captureRef = useRef();
  const renameModalRef = useRef();
  const cardModalRef = useRef();

  const { isCapturing, captureScreenshot } = useScreenshot();

  // Получаем текущую активную команду
  const currentTeam = teams[activeTeamIndex] || teams[0];

  // Опции для affinity
  const affinityOptions = useMemo(() => {
    const levels = affinityData[0]?.affinityLVL || [];
    return levels.map((lvl) => ({
      value: lvl,
      label: `${lvl} LVL`,
    }));
  }, []);

  // ===== ОБРАБОТЧИКИ ДЛЯ ПЕРЕИМЕНОВАНИЯ =====
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
      alert("Cannot delete the last team!");
      return;
    }
    const teamToDelete = teams[index];
    if (
        window.confirm(`Are you sure you want to delete "${teamToDelete.name}"?`)
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
  const startEditingName = (name) => {
    setEditingName(name);
    renameModalRef.current?.showModal();
  };

  const saveTeamName = () => {
    if (editingName.trim()) {
      updateCurrentTeam({ name: editingName.trim() });
    }
    setIsEditingName(false);
    renameModalRef.current?.closeModal();
  };

  // ===== ОЧИСТКА ТЕКУЩЕЙ КОМАНДЫ =====
  const clearCurrentTeam = () => {
    if (
        window.confirm(
            `Are you sure you want to clear all data for "${currentTeam.name}"?`,
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
      updateCurrentTeam({ solarCards: updatedSolarCards });
    } else if (placement === "lunar") {
      const updatedLunarCards = [...currentTeam.lunarCards];
      updatedLunarCards[index] = card;
      updateCurrentTeam({ lunarCards: updatedLunarCards });
    }
  };

  // ===== ОБЕРНУТАЯ ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ КАРТОЧКИ (для передачи в дочерние компоненты) =====
  const getCardDataWrapper = useCallback((card) => {
    return getCardData(card);
  }, []);

  // ===== ПОДСЧЁТ СУММЫ СТАТОВ =====
  const totalStats = useMemo(() => {
    return calculateTotalStats(
        currentTeam.solarCards,
        currentTeam.lunarCards,
        getCardData
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
      <div className={styles.wrapper}>
        {/* Кнопки для скриншота и очистки */}
        <div className={styles.utilButtons}>
          <button
              className={styles.screenshotButton}
              onClick={() => captureScreenshot(captureRef.current, currentTeam.name)}
              disabled={isCapturing}
          >
            {isCapturing ? "📸 Capturing..." : "📸 Save as Image"}
          </button>

          <button className={styles.clearButton} onClick={clearCurrentTeam}>
            🗑️ Clear All
          </button>
        </div>

        {/* Кнопки управления */}
        <div className={styles.teamControls}>
          {teams.map((team, index) => (
              <div key={team.id} className={styles.tabWrapper}>
                <button
                    className={`${styles.teamNameButton} ${activeTeamIndex === index ? styles.activeTab : ""}`}
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
                        if (e.key === "Enter") {
                          saveTeamName();
                        } else if (e.key === "Escape") {
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
                  onSelectCompanion={(companion) =>
                      updateCurrentTeam({ selectedCompanion: companion })
                  }
                  onSelectMCWeapon={(companion) =>
                      updateCurrentTeam({ selectedMCWeapon: companion })
                  }
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
                        value={affinityOptions.find(
                            (opt) => opt.value === currentTeam.affinityLevel,
                        )}
                        onChange={(option) =>
                            updateCurrentTeam({
                              affinityLevel: option ? option.value : 0,
                            })
                        }
                        placeholder="Select Affinity LVL"
                        className={styles.selectAffinityContainer}
                        isClearable
                        isSearchable={false}
                    />
                    <div className={styles.affinityBonus}>
                      Affinity Bonus: +{affinityBonus.hp} HP, +
                      {affinityBonus.atk} ATK, +
                      {affinityBonus.def} DEF
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
            <ModalChooseCard onSelectCard={handleSelectCard} ref={cardModalRef} />
          </section>
        </div>

        <br />
        <br />

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