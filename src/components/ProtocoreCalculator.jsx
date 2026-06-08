import {useState, useMemo} from 'react';
import styles from './ProtocoreCalculator.module.css';
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
    SUBSTAT_LEVELS
} from '../data/protocore-data';
import {Collapse} from "antd";

// Функция для получения первого доступного мейн стата
const getFirstMainStat = (type) => {
    return protocoreTypes[type]?.mainStats[0]?.name || '';
};

function ProtocoreCalculator() {
    const [protocoreType, setProtocoreType] = useState('alpha');
    const [mainStat, setMainStat] = useState(getFirstMainStat('alpha'));
    const [currentLevel, setCurrentLevel] = useState(0);
    const [targetLevel, setTargetLevel] = useState(1);
    const [dungeonLevel, setDungeonLevel] = useState(10);
    const [hasCalculated, setHasCalculated] = useState(false);

    // Получаем доступные мейн статы для выбранного типа
    const availableStats = protocoreTypes[protocoreType]?.mainStats || [];

    // Устанавливаем первый доступный мейн стат при смене типа
    const handleTypeChange = (type) => {
        setProtocoreType(type);
        setMainStat(getFirstMainStat(type)); // ← обновляем здесь
        setHasCalculated(false);
    };

    // Обработчики изменения полей
    const handleCurrentLevelChange = (value) => {
        setCurrentLevel(Number(value));
        setHasCalculated(false);
    };

    const handleTargetLevelChange = (value) => {
        setTargetLevel(Number(value));
        setHasCalculated(false);
    };

    const handleDungeonLevelChange = (value) => {
        setDungeonLevel(Number(value));
        setHasCalculated(false);
    };

    const handleMainStatChange = (value) => {
        setMainStat(value);
        setHasCalculated(false);
    };

    // Обработчик кнопки Calculate
    const handleCalculate = () => {
        setHasCalculated(true);
    };

    // Расчёты (только если hasCalculated = true)
    const calculation = useMemo(() => {
        if (!hasCalculated || currentLevel >= targetLevel) {
            return null;
        }

        const expNeeded = getRequiredExp(currentLevel, targetLevel);
        const creditsNeeded = getRequiredCredits(currentLevel, targetLevel);
        const currentStatValue = getMainStatValue(protocoreType, mainStat, currentLevel);
        const targetStatValue = getMainStatValue(protocoreType, mainStat, targetLevel);
        const substatUpgrades = getSubstatUpgradeInfo(currentLevel, targetLevel);

        const dungeonRuns = getRequiredDungeonRuns(expNeeded, dungeonLevel);
        const staminaNeeded = getRequiredStamina(expNeeded, dungeonLevel);
        const currentDungeonExp = dungeonData.find(d => d.level === dungeonLevel)?.exp || 0;

        return {
            expNeeded,
            creditsNeeded,
            currentStatValue,
            targetStatValue,
            substatUpgrades,
            dungeonRuns,
            staminaNeeded,
            currentDungeonExp
        };
    }, [hasCalculated, protocoreType, mainStat, currentLevel, targetLevel, dungeonLevel]);

    // Определяем, какие уровни саб-статов будут достигнуты
    const substatLevelsReached = SUBSTAT_LEVELS.filter(level =>
        level > currentLevel && level <= targetLevel
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Protocore Calculator</h1>

            <div className={styles.formGroup}>
                <div>Protocore Type</div>
                <div className={styles.buttonGroup}>
                    {Object.entries(protocoreTypes).map(([key, value]) => (
                        <button
                            key={key}
                            className={`${styles.typeButton} ${protocoreType === key ? styles.active : ''}`}
                            onClick={() => handleTypeChange(key)}
                        >
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
                            <option key={i} value={i}>Lvl {i}</option>
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
                            <option key={i} value={i}>Lvl {i}</option>
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
                    {dungeonData.map(d => (
                        <option key={d.level} value={d.level}>
                            Fusion Arena Lvl {d.level} (+{d.exp} EXP per run)
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

            { hasCalculated && calculation && currentLevel < targetLevel && (
                <div className={styles.results}>
                    <h2>Results</h2>

                    <div className={styles.resultCard}>
                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Protocore:</span>
                            <span>{protocoreTypes[protocoreType]?.name}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Main Stat:</span>
                            <span>{mainStat}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Upgrade:</span>
                            <span>Lvl {currentLevel} → Lvl {targetLevel}</span>
                        </div>

                        <div className={styles.divider}></div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Stat growth:</span>
                            <span>
                                {calculation.currentStatValue} → {calculation.targetStatValue}
                                {typeof calculation.targetStatValue === 'number' &&
                                    typeof calculation.currentStatValue === 'number' &&
                                    ` (+${(calculation.targetStatValue - calculation.currentStatValue).toFixed(2)})`}  {mainStat === 'HP' || mainStat === 'ATK' ? ` ${mainStat}` : '%'}
                            </span>
                        </div>

                        {/* Информация о саб-статах */}
                        {calculation.substatUpgrades.length > 0 && (
                            <div className={styles.substatSection}>
                                <div className={styles.substatTitle}>Secondary Stats:</div>
                                {calculation.substatUpgrades.map((upgrade, idx) => (
                                    <div key={idx} className={styles.substatRow}>
                                        <span className={styles.substatIcon}>
                                            {upgrade.type === 'new' ? '✨' : '⬆️'}
                                        </span>
                                        <span>{upgrade.message}</span>
                                    </div>
                                ))}
                                <div className={styles.substatNote}>
                                    {substatLevelsReached.length} substat level(s) reached
                                </div>
                            </div>
                        )}

                        <div className={styles.divider}></div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>EXP needed:</span>
                            <span>{calculation.expNeeded.toLocaleString()} EXP</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Credits needed:</span>
                            <span>{calculation.creditsNeeded.toLocaleString()} Credits</span>
                        </div>

                        <div className={styles.divider}></div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Core Hunt runs needed:</span>
                            <span>{calculation.dungeonRuns} runs (Lvl {dungeonLevel})</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Stamina needed:</span>
                            <span>{calculation.staminaNeeded} stamina</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProtocoreCalculator;