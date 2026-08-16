import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Calculator.module.css";
import {
  protocoreTypes,
  getMainStatValue,
  getRequiredExp,
  getRequiredCredits,
  getRequiredDungeonRuns,
  getRequiredStamina,
  getSubstatUpgradeInfo,
  MAX_LEVEL,
  dungeonData,
  SUBSTAT_LEVELS,
  getCreditDungeonRuns,
  getStaminaForCredits,
  creditDungeonData,
} from "@data";
import { getImageUrl } from "@hooks";
import { ModalWindow } from "@components";
import { addFarmGoal } from "@localstorage";

// Функция для получения первого доступного мейн стата
const getFirstMainStat = (type) => {
  return protocoreTypes[type]?.mainStats[0]?.name || "";
};

function ProtocoreCalculator() {
  const [protocoreType, setProtocoreType] = useState("alpha");
  const [mainStat, setMainStat] = useState(getFirstMainStat("alpha"));
  const [currentLevel, setCurrentLevel] = useState(0);
  const [targetLevel, setTargetLevel] = useState(1);
  const [dungeonLevel, setDungeonLevel] = useState(10);
  const [creditDungeonLevel, setCreditDungeonLevel] = useState(9);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState(null);
  const modalGoalButton = useRef();

  const showModalGoalButton = () => {
    modalGoalButton.current.showModal();
  };

  // Получаем доступные мейн статы для выбранного типа
  const availableStats = protocoreTypes[protocoreType]?.mainStats || [];

  // Устанавливаем первый доступный мейн стат при смене типа
  const handleTypeChange = (type) => {
    setProtocoreType(type);
    setMainStat(getFirstMainStat(type));
    setHasCalculated(false);
    setResult(null);
  };

  // Обработчики изменения полей
  const handleCurrentLevelChange = (value) => {
    setCurrentLevel(Number(value));
    setHasCalculated(false);
    setResult(null);
  };

  const handleTargetLevelChange = (value) => {
    setTargetLevel(Number(value));
    setHasCalculated(false);
    setResult(null);
  };

  const handleDungeonLevelChange = (value) => {
    setDungeonLevel(Number(value));
    setHasCalculated(false);
    setResult(null);
  };

  const handleMainStatChange = (value) => {
    setMainStat(value);
    setHasCalculated(false);
    setResult(null);
  };

  const handleCreditDungeonChange = (value) => {
    setCreditDungeonLevel(Number(value));
    setHasCalculated(false);
    setResult(null);
  };

  // Обработчик кнопки Calculate
  const handleCalculate = () => {
    if (currentLevel >= targetLevel) return;

    const expNeeded = getRequiredExp(currentLevel, targetLevel);
    const creditsNeeded = getRequiredCredits(currentLevel, targetLevel);
    const currentStatValue = getMainStatValue(
      protocoreType,
      mainStat,
      currentLevel,
    );
    const targetStatValue = getMainStatValue(
      protocoreType,
      mainStat,
      targetLevel,
    );
    const substatUpgrades = getSubstatUpgradeInfo(currentLevel, targetLevel);

    const dungeonRuns = getRequiredDungeonRuns(expNeeded, dungeonLevel);
    const staminaNeeded = getRequiredStamina(expNeeded, dungeonLevel);
    const creditRuns = getCreditDungeonRuns(creditsNeeded, creditDungeonLevel);
    const staminaForCredits = getStaminaForCredits(
      creditsNeeded,
      creditDungeonLevel,
    );
    const currentDungeonExp =
      dungeonData.find((d) => d.level === dungeonLevel)?.exp || 0;

    setResult({
      expNeeded,
      creditsNeeded,
      currentStatValue,
      targetStatValue,
      substatUpgrades,
      dungeonRuns,
      staminaNeeded,
      currentDungeonExp,
      creditRuns,
      staminaForCredits,
    });

    setHasCalculated(true);
  };

  // Определяем, какие уровни саб-статов будут достигнуты
  const substatLevelsReached = SUBSTAT_LEVELS.filter(
    (level) => level > currentLevel && level <= targetLevel,
  );

  const handleAddToFarm = () => {
    const goal = {
      id: Date.now(),
      type: "protocore",
      protocoreType: protocoreType,
      mainStat: mainStat,
      currentLevel: currentLevel,
      targetLevel: targetLevel,
      neededExp: result.expNeeded,
      neededCredits: result.creditsNeeded,
      expDungeonLevel: dungeonLevel,
      creditDungeonLevel: creditDungeonLevel,
      neededCrystals: null,
      createdAt: new Date().toISOString(),
    };

    addFarmGoal(goal);
    showModalGoalButton();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Protocore Calculator</h1>

      <div className={styles.formGroup}>
        <div>Protocore Type</div>
        <div className={styles.buttonGroup}>
          {Object.entries(protocoreTypes).map(([key, value]) => (
            <button
              key={key}
              className={`${styles.typeButton} ${protocoreType === key ? styles.active : ""}`}
              onClick={() => handleTypeChange(key)}
            >
              <img
                src={getImageUrl(value.image)}
                alt={value.name}
                width={30}
                height={30}
              />
              {value.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="main-stat-select">Main Stat</label>
        <select
          id="main-stat-select"
          name="main-stat"
          value={mainStat}
          onChange={(e) => handleMainStatChange(e.target.value)}
          className={styles.select}
        >
          {availableStats.map((stat, idx) => (
            <option key={idx} value={stat.name}>
              {stat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="current-lvl-select">Current Level</label>
          <select
            id="current-lvl-select"
            name="current-lvl"
            value={currentLevel}
            onChange={(e) => handleCurrentLevelChange(e.target.value)}
            className={styles.select}
          >
            {[...Array(MAX_LEVEL + 1)].map((_, i) => (
              <option key={i} value={i}>
                Lvl {i}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="target-lvl-select">Target Level</label>
          <select
            id="target-lvl-select"
            name="target-lvl"
            value={targetLevel}
            onChange={(e) => handleTargetLevelChange(e.target.value)}
            className={styles.select}
          >
            {[...Array(MAX_LEVEL + 1)].map((_, i) => (
              <option key={i} value={i}>
                Lvl {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="core-hunt-lvl-select">Core Hunt Level</label>
        <select
          id="core-hunt-lvl-select"
          name="core-hunt-lvl"
          value={dungeonLevel}
          onChange={(e) => handleDungeonLevelChange(e.target.value)}
          className={styles.select}
        >
          {dungeonData.map((d) => (
            <option key={d.level} value={d.level}>
              Fusion Arena Lvl {d.level} (+{d.exp} EXP per run)
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="credits-lvl-select">Mr. Beanie Level</label>
        <select
          id="credits-lvl-select"
          name="credits-lvl"
          value={creditDungeonLevel}
          onChange={(e) => handleCreditDungeonChange(e.target.value)}
          className={styles.select}
        >
          {creditDungeonData.map((d) => (
            <option key={d.level} value={d.level}>
              Lvl {d.level} (+{d.credits.toLocaleString()} Credits per run)
            </option>
          ))}
        </select>
      </div>

      <button
        className={styles.calculateButton}
        onClick={handleCalculate}
        disabled={currentLevel >= targetLevel}
      >
        Calculate
      </button>

      {currentLevel >= targetLevel && (
        <div className={styles.warning}>
          Target level must be higher than current level!
        </div>
      )}

      {hasCalculated && result && currentLevel < targetLevel && (
        <div className={styles.results}>
          <h2>Results</h2>

          <div className={styles.resultCard}>
            <div className={styles.resultRowUpgrade}>
              <span className={styles.resultLabel}>Stat growth:</span>
              <span>
                {result.currentStatValue} → {result.targetStatValue}
                {typeof result.targetStatValue === "number" &&
                  typeof result.currentStatValue === "number" &&
                  ` (+${(result.targetStatValue - result.currentStatValue).toFixed(2)})`}
                {mainStat === "HP" || mainStat === "ATK" ? ` ${mainStat}` : "%"}
              </span>
            </div>

            {/* Информация о саб-статах */}
            {result.substatUpgrades.length > 0 && (
              <div className={styles.substatSection}>
                <div className={styles.substatTitle}>Secondary Stats:</div>
                {result.substatUpgrades.map((upgrade, idx) => (
                  <div key={idx} className={styles.substatRow}>
                    <span className={styles.substatIcon}>
                      {upgrade.type === "new" ? "✨" : "⬆️"}
                    </span>
                    <span>{upgrade.message}</span>
                  </div>
                ))}
                <div className={styles.substatNote}>
                  {substatLevelsReached.length} substat level(s) reached
                </div>
              </div>
            )}

            <div className={styles.resultContainer}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>EXP needed:</span>
                <span>{result.expNeeded.toLocaleString()} EXP</span>
              </div>

              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>
                  "Core Hunt" runs needed:
                </span>
                <span>
                  {result.dungeonRuns} run(s) (Lvl {dungeonLevel})
                </span>
              </div>

              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Stamina for EXP:</span>
                <span>{result.staminaNeeded} stamina</span>
              </div>
            </div>

            <div className={styles.resultContainer}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Credits needed:</span>
                <span>{result.creditsNeeded.toLocaleString()} Credits</span>
              </div>

              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>
                  "Mr. Beanie" runs needed:
                </span>
                <span>
                  {result.creditRuns} run(s) (Lvl {creditDungeonLevel})
                </span>
              </div>

              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Stamina for Credits:</span>
                <span>{result.staminaForCredits} stamina</span>
              </div>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Total Stamina needed:</span>
              <span>
                {result.staminaNeeded + result.staminaForCredits} stamina
              </span>
            </div>
          </div>
        </div>
      )}

      {hasCalculated && result && currentLevel < targetLevel && (
        <div className={styles.goToFarmSection}>
          <button className={styles.goToFarmButton} onClick={handleAddToFarm}>
            🎯 Add to Farm Goal Tracker
          </button>

          <ModalWindow
            ref={modalGoalButton}
            title={"Alert"}
            tag={
              <>
                <h2>Goal added to Farm Tracker on Home page!</h2>
                <Link className={styles.link} to="/">
                  Go to Main Page
                </Link>
              </>
            }
          />
        </div>
      )}
    </div>
  );
}

export default ProtocoreCalculator;
