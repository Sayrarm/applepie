import React, {useEffect, useMemo, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import styles from "./LevelCardBlock.module.css";
import {
  getStatsWithRank,
  memoryStats,
  memoriesData,
  calculateFinalStats,
  rankOptions,
  formatOptionLabel, getUpgradeResources, getExpNeeded, crystalColors,
} from "@data";
import {
  getCardLevel,
  saveCardLevel,
  getCardRank,
  saveCardRank,
  getCardAvailability,
  saveCardAvailability,
  getCardAscend,
  saveCardAscend,
  getCardProtocores,
  saveCardProtocores, addFarmGoal,
} from "@localstorage";
import {ModalWindow, LevelRangeControl} from "@components";

function LevelCardBlock({ cardId: propCardId, onAvailabilityChange }) {
  const { cardId: paramCardId } = useParams();
  const cardId = propCardId || paramCardId;

  const [level, setLevel] = useState(() => getCardLevel(cardId));
  const [rank, setRank] = useState(() => getCardRank(cardId));
  const [isAvailable, setIsAvailable] = useState(() =>
    getCardAvailability(cardId),
  );
  const [isAscended, setIsAscended] = useState(() => getCardAscend(cardId));
  const [equippedProtocores, setEquippedProtocores] = useState(() =>
    getCardProtocores(cardId),
  );
  const [draftLevel, setDraftLevel] = useState(level);
  const [draftAscended, setDraftAscended] = useState(false);

  const modalRef = useRef(null);

  // Находим карточку
  const card = useMemo(() => {
    if (!cardId) return null;
    return memoriesData.find((c) => String(c.id) === cardId) || null;
  }, [cardId]);

  // Пересчитываем статы
  const stats = useMemo(() => {
    if (!card) return null;
    const baseStats = getStatsWithRank(card, level, rank, isAscended);
    if (!baseStats) return null;
    return calculateFinalStats(card, baseStats, equippedProtocores);
  }, [card, level, rank, isAscended, equippedProtocores]);

  // ===== СОХРАНЕНИЕ В LOCALSTORAGE =====
  useEffect(() => {
    if (cardId) {
      saveCardLevel(cardId, level);
    }
  }, [level, cardId]);

  // Сохранение в localStorage при изменении ранка
  useEffect(() => {
    if (cardId) {
      saveCardRank(cardId, rank);
    }
  }, [rank, cardId]);

  useEffect(() => {
    if (cardId) {
      saveCardAvailability(cardId, isAvailable);
    }
  }, [isAvailable, cardId]);

  useEffect(() => {
    if (cardId) {
      saveCardAscend(cardId, isAscended);
    }
  }, [isAscended, cardId]);

  // Сохранение протокоров при их изменении
  useEffect(() => {
    if (cardId) {
      saveCardProtocores(cardId, equippedProtocores);
    }
  }, [equippedProtocores, cardId]);

  // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
  // при изменении isAvailable, вызываем колбэк
  useEffect(() => {
    if (onAvailabilityChange) {
      onAvailabilityChange(isAvailable);
    }
  }, [isAvailable, onAvailabilityChange]);

  // Слушаем кастомное событие обновления протокоров
  useEffect(() => {
    const handleProtocoresUpdate = (event) => {
      if (event.detail.cardId === cardId) {
        setEquippedProtocores(event.detail.protocores);
      }
    };

    // Слушаем событие storage (для синхронизации между вкладками)
    const handleStorageChange = (e) => {
      if (e.key === `card_protocores_${cardId}`) {
        const saved = JSON.parse(e.newValue || "[]");
        setEquippedProtocores(saved);
      }
    };

    window.addEventListener("protocoresUpdated", handleProtocoresUpdate);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("protocoresUpdated", handleProtocoresUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [cardId]);

  // Отправляем событие при изменении доступности
  useEffect(() => {
    if (cardId) {
      saveCardAvailability(cardId, isAvailable);
      window.dispatchEvent(
        new CustomEvent("cardAvailabilityChanged", {
          detail: { cardId, isAvailable },
        }),
      );
    }
  }, [isAvailable, cardId]);

  // Определяем доступные уровни
  const getAvailableLevels = () => {
    if (!card) return [];

    const rarity = card.rarityName;
    const talent = card.talentName;
    let memoryKey = "";

    if (rarity === "5-star") {
      if (talent === "hp") memoryKey = "HP Memory 0 Rank 5-star";
      else if (talent === "def") memoryKey = "DEF Memory 0 Rank 5-star";
      else if (talent === "atk") memoryKey = "ATK Memory 0 Rank 5-star";
    } else if (rarity === "4-star") {
      if (talent === "atk") memoryKey = "ATK Memory 0 Rank 4-star";
      else if (talent === "def") memoryKey = "DEF Memory 0 Rank 4-star";
      else if (talent === "hp") memoryKey = "HP Memory 0 Rank 4-star";
    } else if (rarity === "3-star") {
      if (talent === "hp") memoryKey = "HP Memory 0 Rank 3-star";
      else if (talent === "atk") memoryKey = "ATK Memory 0 Rank 3-star";
      else if (talent === "def") memoryKey = "DEF Memory 0 Rank 3-star";
    }

    if (!memoryKey) return [];

    const memoryData = memoryStats[memoryKey];
    if (!memoryData) return [];

    return Object.keys(memoryData.baseStats)
      .map(Number)
      .sort((a, b) => a - b);
  };

  const availableLevels = getAvailableLevels();
  const maxLevel =
    availableLevels.length > 0 ? Math.max(...availableLevels) : 80;

  const formatNumber = (num, decimals = 2) => {
    if (num === undefined || num === null || isNaN(num)) return "—";
    if (typeof num === "number" && !Number.isInteger(num)) {
      return Number(num.toFixed(decimals));
    }
    return num;
  };

  // Строим массив уровней так же, как в MemoryUpCalculator
  const buildAllLevels = () => {
    const allLevels = [];
    for (let i = 1; i <= 80; i++) {
      allLevels.push(String(i));
      if ([10, 20, 30, 40, 50, 60, 70].includes(i)) {
        allLevels.push(`Ascend ${i}+`);
      }
    }
    allLevels.push("Awaken 80");
    return allLevels;
  };

  const getLevelKey = (lvl, ascended) => {
    if (ascended) {
      if (lvl === 80) return "Awaken 80";
      if ([10, 20, 30, 40, 50, 60, 70].includes(lvl)) return `Ascend ${lvl}+`;
    }
    return String(lvl);
  };

  const getLevelIndexes = (allLevels) => {
    const currentKey = getLevelKey(level, isAscended);
    const targetKey = getLevelKey(draftLevel, draftAscended);
    return {
      currentIndex: allLevels.indexOf(currentKey),
      targetIndex: allLevels.indexOf(targetKey),
    };
  };

  const canAddGoal = () => {
    if (!card) return false;
    if (typeof draftLevel !== "number" || typeof level !== "number") return false;
    const allLevels = buildAllLevels();
    const { currentIndex, targetIndex } = getLevelIndexes(allLevels);
    return (
        currentIndex !== -1 && targetIndex !== -1 && targetIndex > currentIndex
    );
  };

// Открытие модалки: сбрасываем черновик на текущий уровень карточки
  const openGoalModal = () => {
    setDraftLevel(typeof level === "number" ? level : 1);
    setDraftAscended(isAscended);
    modalRef.current?.showModal();
  };

  const getCardCrystalColor = (stellaName) => {
    const found = crystalColors.find(
        (c) => c.id.toLowerCase() === String(stellaName).toLowerCase(),
    );
    return found ? found.id : stellaName; // вернёт "Violet" вместо "violet"
  };

// Добавление цели
  const handleAddToFarm = () => {
    if (!card) return;
    if (typeof draftLevel !== "number" || typeof level !== "number") return;

    const allLevels = buildAllLevels();
    const { currentIndex, targetIndex } = getLevelIndexes(allLevels);

    if (
        currentIndex === -1 ||
        targetIndex === -1 ||
        targetIndex <= currentIndex
    ) {
      return;
    }

    const rarity = card.rarityName;
    const crystalColor = getCardCrystalColor(card.stellaName);

    const expNeeded = getExpNeeded(rarity, level, draftLevel);
    const resources = getUpgradeResources(
        rarity,
        allLevels,
        currentIndex,
        targetIndex,
    );

    const goal = {
      id: Date.now(),
      type: "memory",
      rarity,
      currentLevel: level,
      targetLevel: draftLevel,
      currentAscended: isAscended,
      targetAscended: draftAscended,
      neededExp: expNeeded,
      neededCrystalsN: resources.crystals.N,
      neededCrystalsR: resources.crystals.R,
      neededCrystalsSR: resources.crystals.SR,
      crystalColor,
      neededCredits: resources.credits,
      expDungeonLevel: 9,
      creditDungeonLevel: 9,
      crystalDungeonLevel: 9,
      heart: resources.heart || null,
      createdAt: new Date().toISOString(),
      isCardGoal: true,
      cardId: card.id,
    };

    addFarmGoal(goal);
    modalRef.current?.closeModal();
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  const isLevelAvailable = availableLevels.includes(level);

  return (
    <>
      <section className={styles.availableButtonContainer}>
        <button
          className={`${styles.buttonAvailable} ${!isAvailable ? styles.active : ""}`}
          onClick={() => setIsAvailable(false)}
        >
          Not available
        </button>
        <button
          className={`${styles.buttonAvailable} ${isAvailable ? styles.active : ""}`}
          onClick={() => setIsAvailable(true)}
        >
          Available
        </button>

        <button
            className={styles.goalButton}
            onClick={openGoalModal}
        >
          🎯
        </button>
      </section>

      {isAvailable && (
        <section className={styles.container}>
          <div>
            <div className={styles.selectContainer}>
              <LevelRangeControl
                  level={level}
                  setLevel={setLevel}
                  maxLevel={maxLevel}
                  isAscended={isAscended}
                  setIsAscended={setIsAscended}
              />

              <Select
                options={rankOptions}
                value={rankOptions.find((opt) => opt.value === rank)}
                onChange={(option) => setRank(option ? option.value : 0)}
                placeholder="Select Rank"
                className={styles.selectRankContainer}
                isSearchable={false}
                formatOptionLabel={formatOptionLabel}
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
                  <td>{stats ? formatNumber(stats.hp.toFixed(2)) : "—"}</td>
                  <td>{stats ? formatNumber(stats.atk.toFixed(2)) : "—"}</td>
                  <td>{stats ? formatNumber(stats.def.toFixed(2)) : "—"}</td>
                  <td>
                    {stats
                      ? formatNumber(stats.critRate.toFixed(1)) + "%"
                      : "—"}
                  </td>
                  <td>
                    {stats ? formatNumber(stats.critDmg.toFixed(1)) + "%" : "—"}
                  </td>
                  <td>
                    {stats
                      ? formatNumber(stats.dmgBoost.toFixed(2)) + "%"
                      : "—"}
                  </td>
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
                  <td>
                    {stats ? formatNumber(stats.oathStrength) + "%" : "—"}
                  </td>
                  <td>
                    {stats ? formatNumber(stats.oathRecoveryBoost) + "%" : "—"}
                  </td>
                  <td>
                    {stats
                      ? formatNumber(stats.expeditedEnergyBoost) + "%"
                      : "—"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Модальное окно с выбором уровня */}
      <ModalWindow
          ref={modalRef}
          title="Select Level for Goal"
          width={600}
          tag={
            <div style={{ textAlign: "left" }}>
              <LevelRangeControl
                  id="modal-level-input"
                  level={draftLevel}
                  setLevel={setDraftLevel}
                  maxLevel={maxLevel}
                  isAscended={draftAscended}
                  setIsAscended={setDraftAscended}
              />
              <div style={{ textAlign: "right", marginTop: 16 }}>
                <button
                    className={styles.addGoalButton}
                    onClick={handleAddToFarm}
                    disabled={!canAddGoal()}
                >
                  🎯 Add to Development Goal
                </button>
              </div>
            </div>
          }
      />
    </>
  );
}

export default LevelCardBlock;
