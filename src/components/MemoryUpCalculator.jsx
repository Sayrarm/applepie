import { useState } from 'react';
import styles from './Calculator.module.css';
import {
    rarityLevels,
    expDungeonData,
    crystalDungeonData,
    creditDungeonData,
    getExpNeeded,
    getAscendResources,
    getAwakenResources,
    getExpDungeonRuns,
    getCrystalDungeonRuns,
    getCreditDungeonRuns,
    getStaminaCost,
    DUNGEON_COST
} from '../data/memory-up-data';

function MemoryUpCalculator() {
    const [rarity, setRarity] = useState('5-star');
    const [currentLevel, setCurrentLevel] = useState(1);
    const [targetLevel, setTargetLevel] = useState(80);
    const [expDungeonLevel, setExpDungeonLevel] = useState(9);
    const [crystalDungeonLevel, setCrystalDungeonLevel] = useState(9);
    const [creditDungeonLevel, setCreditDungeonLevel] = useState(9);
    const [hasCalculated, setHasCalculated] = useState(false);
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        if (currentLevel >= targetLevel) return;

        const expNeeded = getExpNeeded(rarity, currentLevel, targetLevel);
        const ascendResources = getAscendResources(rarity, currentLevel, targetLevel);
        const awakenResources = getAwakenResources(rarity, currentLevel, targetLevel);

        let totalCrystals = {
            N: ascendResources.crystals.N,
            R: ascendResources.crystals.R,
            SR: ascendResources.crystals.SR
        };
        let totalCredits = ascendResources.credits;
        let heart = null;

        if (awakenResources) {
            totalCrystals.N += awakenResources.crystals.N;
            totalCrystals.R += awakenResources.crystals.R;
            totalCrystals.SR += awakenResources.crystals.SR;
            totalCredits += awakenResources.credits;
            heart = awakenResources.heart;
        }

        const expRuns = getExpDungeonRuns(expNeeded, expDungeonLevel);
        const crystalRuns = getCrystalDungeonRuns(totalCrystals, crystalDungeonLevel);
        const creditRuns = getCreditDungeonRuns(totalCredits, creditDungeonLevel);

        const staminaForExp = getStaminaCost(expRuns);
        const staminaForCrystals = getStaminaCost(crystalRuns);
        const staminaForCredits = getStaminaCost(creditRuns);

        setResult({
            expNeeded,
            crystals: totalCrystals,
            credits: totalCredits,
            heart,
            expRuns,
            crystalRuns,
            creditRuns,
            staminaForExp,
            staminaForCrystals,
            staminaForCredits,
            totalStamina: staminaForExp + staminaForCrystals + staminaForCredits
        });

        setHasCalculated(true);
    };

    // Сбрасываем результат при изменении любых параметров
    const handleRarityChange = (newRarity) => {
        setRarity(newRarity);
        setHasCalculated(false);
        setResult(null);
    };

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

    const handleExpDungeonChange = (value) => {
        setExpDungeonLevel(Number(value));
        setHasCalculated(false);
        setResult(null);
    };

    const handleCrystalDungeonChange = (value) => {
        setCrystalDungeonLevel(Number(value));
        setHasCalculated(false);
        setResult(null);
    };

    const handleCreditDungeonChange = (value) => {
        setCreditDungeonLevel(Number(value));
        setHasCalculated(false);
        setResult(null);
    };

    const availableLevels = [1, 10, 20, 30, 40, 50, 60, 70, 80];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Memory Upgrade Calculator</h1>

            {/* Редкость */}
            <div className={styles.formGroup}>
                <label>Rarity</label>
                <div className={styles.buttonGroup}>
                    {Object.entries(rarityLevels).map(([key, value]) => (
                        <button
                            key={key}
                            className={`${styles.typeButton} ${rarity === key ? styles.active : ''}`}
                            onClick={() => handleRarityChange(key)}
                        >
                            {value.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Уровни */}
            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label>Current Level</label>
                    <select
                        value={currentLevel}
                        onChange={(e) => handleCurrentLevelChange(e.target.value)}
                        className={styles.select}
                    >
                        {availableLevels.filter(l => l < 80).map(level => (
                            <option key={level} value={level}>Lvl {level}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Target Level</label>
                    <select
                        value={targetLevel}
                        onChange={(e) => handleTargetLevelChange(e.target.value)}
                        className={styles.select}
                    >
                        {availableLevels.map(level => (
                            <option key={level} value={level}>Lvl {level}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Данжи */}
            <div className={styles.formGroup}>
                <label>Heartbreaker Level</label>
                <select
                    value={expDungeonLevel}
                    onChange={(e) => handleExpDungeonChange(e.target.value)}
                    className={styles.select}
                >
                    {expDungeonData.map(d => (
                        <option key={d.level} value={d.level}>
                            Lvl {d.level} (+{d.exp} EXP per run)
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Pumpkin Magus | Lemonette | Snoozer Level</label>
                <select
                    value={crystalDungeonLevel}
                    onChange={(e) => handleCrystalDungeonChange(e.target.value)}
                    className={styles.select}
                >
                    {crystalDungeonData.map(d => (
                        <option key={d.level} value={d.level}>
                            Lvl {d.level} (N:{d.crystals.N} R:{d.crystals.R || 0} SR:{d.crystals.SR || 0} per run)
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Mr. Beanie Level</label>
                <select
                    value={creditDungeonLevel}
                    onChange={(e) => handleCreditDungeonChange(e.target.value)}
                    className={styles.select}
                >
                    {creditDungeonData.map(d => (
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

            {/* Результаты показываются только после нажатия Calculate */}
            {hasCalculated && result && currentLevel < targetLevel && (
                <div className={styles.results}>
                    <h2>Results</h2>


                    <div className={styles.resultCard}>
                        {/*
                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Rarity:</span>
                            <span>{rarityLevels[rarity]?.name}</span>
                        </div>
                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Upgrade:</span>
                            <span>Lvl {currentLevel} → Lvl {targetLevel}</span>
                        </div>


                        <div className={styles.divider}></div>
                         */}

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>EXP needed:</span>
                            <span>{result.expNeeded.toLocaleString()} EXP</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>EXP Dungeon runs:</span>
                            <span>{result.expRuns} runs (Lvl {expDungeonLevel})</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Stamina for EXP:</span>
                            <span>{result.staminaForExp} stamina</span>
                        </div>

                        <div className={styles.divider}></div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Crystals needed:</span>
                            <span>
                                N: {result.crystals.N}
                                {result.crystals.R > 0 && ` | R: ${result.crystals.R}`}
                                {result.crystals.SR > 0 && ` | SR: ${result.crystals.SR}`}
                            </span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Crystal Dungeon runs:</span>
                            <span>{result.crystalRuns} runs (Lvl {crystalDungeonLevel})</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Stamina for Crystals:</span>
                            <span>{result.staminaForCrystals} stamina</span>
                        </div>

                        <div className={styles.divider}></div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Credits needed:</span>
                            <span>{result.credits.toLocaleString()} Credits</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Credits Dungeon runs:</span>
                            <span>{result.creditRuns} runs (Lvl {creditDungeonLevel})</span>
                        </div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Stamina for Credits:</span>
                            <span>{result.staminaForCredits} stamina</span>
                        </div>

                        {result.heart && (
                            <>
                                <div className={styles.divider}></div>
                                <div className={styles.resultRow}>
                                    <span className={styles.resultLabel}>Special Item needed:</span>
                                    <span className={styles.heartRequired}>✨ {result.heart}</span>
                                </div>
                            </>
                        )}

                        <div className={styles.divider}></div>

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Total Stamina needed:</span>
                            <span className={styles.totalStamina}>{result.totalStamina} stamina</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MemoryUpCalculator;