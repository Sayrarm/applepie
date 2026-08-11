import {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './Calculator.module.css';
import {ModalWindow} from "@components";
import {getImageUrl} from "@hooks";
import {
    rarityLevels,
    expDungeonData,
    crystalDungeonData,
    getExpNeeded,
    getUpgradeResources,
    getExpDungeonRuns,
    getCrystalDungeonRuns,
    getCrystalDungeonByColor,
    getStaminaCost,
    crystalTypesDungeons,
    creditDungeonData,
    getCreditDungeonRuns,
    crystalColors,
    getHeartInfo
} from '@data';

function MemoryUpCalculator() {
    const [rarity, setRarity] = useState('5-star');
    const [currentLevel, setCurrentLevel] = useState('1');
    const [targetLevel, setTargetLevel] = useState('80');
    const [expDungeonLevel, setExpDungeonLevel] = useState(9);
    const [crystalDungeonLevel, setCrystalDungeonLevel] = useState(9);
    const [creditDungeonLevel, setCreditDungeonLevel] = useState(9);
    const [selectedColor, setSelectedColor] = useState('Emerald');
    const [hasCalculated, setHasCalculated] = useState(false);
    const [result, setResult] = useState(null);
    const modalGoalButton = useRef();

    const showModalGoalButton = () => {
        modalGoalButton.current.showModal();
    };

    const crystalDungeonType = getCrystalDungeonByColor(selectedColor);
    const crystalDungeonName = crystalTypesDungeons.find(d => d.id === crystalDungeonType)?.name || 'Lemonette';

    // Создаем полный список уровней по порядку
    const allLevels = [];
    for (let i = 1; i <= 80; i++) {
        allLevels.push(String(i));
        if (i === 10) allLevels.push('Ascend 10+');
        else if (i === 20) allLevels.push('Ascend 20+');
        else if (i === 30) allLevels.push('Ascend 30+');
        else if (i === 40) allLevels.push('Ascend 40+');
        else if (i === 50) allLevels.push('Ascend 50+');
        else if (i === 60) allLevels.push('Ascend 60+');
        else if (i === 70) allLevels.push('Ascend 70+');
    }
    allLevels.push('Awaken 80');

    const getDisplayLevel = (level) => {
        if (level.includes('Ascend')) return level;
        if (level === 'Awaken 80') return 'Awaken 80';
        return `${level} lvl`;
    };

    const getLevelNumber = (level) => {
        if (typeof level === 'number') return level;
        const match = String(level).match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    const handleCalculate = () => {
        const currentIndex = allLevels.indexOf(String(currentLevel));
        const targetIndex = allLevels.indexOf(String(targetLevel));

        // EXP считаем по числам
        const currentNum = getLevelNumber(currentLevel);
        const targetNum = getLevelNumber(targetLevel);
        const expNeeded = getExpNeeded(rarity, currentNum, targetNum);

        // Ресурсы считаем по индексам
        const resources = getUpgradeResources(rarity, allLevels, currentIndex, targetIndex);

        const expRuns = getExpDungeonRuns(expNeeded, expDungeonLevel);
        const crystalRuns = getCrystalDungeonRuns(resources.crystals, crystalDungeonLevel);
        const creditRuns = getCreditDungeonRuns(resources.credits, creditDungeonLevel);

        const staminaForExp = getStaminaCost(expRuns);
        const staminaForCrystals = getStaminaCost(crystalRuns);
        const staminaForCredits = getStaminaCost(creditRuns);

        setResult({
            expNeeded,
            crystals: resources.crystals,
            credits: resources.credits,
            heart: resources.heart,
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

    const handleRarityChange = (newRarity) => {
        setRarity(newRarity);
        setHasCalculated(false);
        setResult(null);
    };

    const handleCurrentLevelChange = (value) => {
        setCurrentLevel(value);
        setHasCalculated(false);
        setResult(null);
    };

    const handleTargetLevelChange = (value) => {
        setTargetLevel(value);
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

    const handleColorChange = (colorId) => {
        setSelectedColor(colorId);
        setHasCalculated(false);
        setResult(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Memory Upgrade Calculator</h1>

            <div className={styles.formGroup}>
                <div>Rarity</div>
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
                        {allLevels.map(level => {
                            if (level === 'Awaken 80') return null;
                            return (
                                <option key={level} value={level}>
                                    {getDisplayLevel(level)}
                                </option>
                            );
                        })}
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
                        {allLevels.map(level => {
                            const currentIndex = allLevels.indexOf(String(currentLevel));
                            const levelIndex = allLevels.indexOf(String(level));
                            if (levelIndex < currentIndex) return null;
                            return (
                                <option key={level} value={level}>
                                    {getDisplayLevel(level)}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className={styles.formGroup}>
                <div>Crystal Color</div>
                <div className={styles.colorButtons}>
                    {crystalColors.map(color => (
                        <button
                            key={color.id}
                            className={`${styles.colorButton} ${selectedColor === color.id ? styles.active : ''}`}
                            onClick={() => handleColorChange(color.id)}
                        >
                            <img src={getImageUrl(color.img)} alt={color.name} className={styles.colorIcon}/>
                            {color.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="bottle-lvl-select">Heartbreaker Level</label>
                <select
                    id="bottle-lvl-select"
                    name="bottle-lvl"
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
                <label htmlFor="crystal-lvl-select">{crystalDungeonName} Level</label>
                <select
                    id="crystal-lvl-select"
                    name="crystal-lvl"
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
                <label htmlFor="credits-lvl-select">Mr. Beanie Level</label>
                <select
                    id="credits-lvl-select"
                    name="credits-lvl"
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
                disabled={allLevels.indexOf(String(currentLevel)) >= allLevels.indexOf(String(targetLevel))}
            >
                Calculate
            </button>

            {allLevels.indexOf(String(currentLevel)) >= allLevels.indexOf(String(targetLevel)) && (
                <div className={styles.warning}>
                    Target level must be higher than current level!
                </div>
            )}

            {hasCalculated && result && (
                <div className={styles.results}>
                    <h2>Results</h2>
                    <div className={styles.resultCard}>
                        <div className={styles.resultRowUpgrade}>
                            <span className={styles.resultLabel}>Upgrade:</span>
                            <span>{getDisplayLevel(currentLevel)} → {getDisplayLevel(targetLevel)}</span>
                        </div>

                        <div className={styles.resultContainer}>
                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>EXP needed:</span>
                                <span>{result.expNeeded.toLocaleString()} EXP</span>
                            </div>

                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>"Heartbreaker" runs needed:</span>
                                <span>{result.expRuns} runs (Lvl {expDungeonLevel})</span>
                            </div>

                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>Stamina needed:</span>
                                <span>{result.staminaForExp} stamina</span>
                            </div>
                        </div>

                        <div className={styles.resultContainer}>
                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>Crystals needed:</span>
                                <span>
                                N: {result.crystals.N}
                                    {result.crystals.R > 0 && ` | R: ${result.crystals.R}`}
                                    {result.crystals.SR > 0 && ` | SR: ${result.crystals.SR}`}
                            </span>
                            </div>

                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>"{crystalDungeonName}" runs needed:</span>
                                <span>{result.crystalRuns} runs (Lvl {crystalDungeonLevel})</span>
                            </div>

                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>Stamina needed:</span>
                                <span>{result.staminaForCrystals} stamina</span>
                            </div>
                        </div>


                        <div className={styles.resultContainer}>
                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>Credits needed:</span>
                                <span>{result.credits.toLocaleString()} Credits</span>
                            </div>

                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>"Mr. Beanie" runs needed:</span>
                                <span>{result.creditRuns} runs (Lvl {creditDungeonLevel})</span>
                            </div>

                            <div className={styles.resultRow}>
                                <span className={styles.resultLabel}>Stamina needed:</span>
                                <span>{result.staminaForCredits} stamina</span>
                            </div>
                        </div>

                        {result.heart && (() => {
                            const heartInfo = getHeartInfo(result.heart);
                            if (!heartInfo) return null;

                            return (
                                <div className={styles.resultContainer}>
                                    <div className={styles.resultRow}>
                                        <span className={styles.resultLabel}>Special Item needed:</span>
                                        <div className={styles.heartContainer}>
                                            <img
                                                src={getImageUrl(heartInfo.img)}
                                                alt={heartInfo.name}
                                                className={styles.heartIcon}
                                            />
                                            <span className={styles.heartRequired}>
                                                {heartInfo.name}
                                            </span> x1
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        <div className={styles.resultRow}>
                            <span className={styles.resultLabel}>Total Stamina needed:</span>
                            <span className={styles.totalStamina}>{result.totalStamina} stamina</span>
                        </div>
                    </div>
                </div>
            )}

            {hasCalculated && result && (
                <div className={styles.goToFarmSection}>
                    <button
                        className={styles.goToFarmButton}
                        onClick={() => {
                            const goal = {
                                id: Date.now(),
                                type: 'memory',
                                rarity: rarity,
                                currentLevel: currentLevel,
                                targetLevel: targetLevel,
                                neededExp: result.expNeeded,
                                neededCrystalsN: result.crystals.N,
                                neededCrystalsR: result.crystals.R,
                                neededCrystalsSR: result.crystals.SR,
                                crystalColor: selectedColor,
                                neededCredits: result.credits,
                                expDungeonLevel: expDungeonLevel,
                                creditDungeonLevel: creditDungeonLevel,
                                crystalDungeonLevel: crystalDungeonLevel,
                                heart: result.heart || null,
                                createdAt: new Date().toISOString()
                            };
                            const existingGoals = JSON.parse(localStorage.getItem('farm_goals') || '[]');
                            existingGoals.push(goal);
                            localStorage.setItem('farm_goals', JSON.stringify(existingGoals));
                            showModalGoalButton();
                        }}
                    >
                        🎯 Add to Farm Goal Tracker
                    </button>

                    <ModalWindow
                        ref={modalGoalButton}
                        title={'Alert'}
                        tag={
                            <>
                                <h2>Goal added to Farm Tracker on Home page!</h2>
                                <Link className={styles.link} to='/'>Go to Main Page</Link>
                            </>
                        }
                    />
                </div>
            )}
        </div>
    );
}

export default MemoryUpCalculator;