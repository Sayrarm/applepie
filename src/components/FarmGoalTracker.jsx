import {useEffect, useState} from 'react';
import styles from './FarmGoalTracker.module.css';
import {creditDungeonData, crystalDungeonData, DUNGEON_COST, expDungeonData} from '../data/memory-up-data';
import {CREDIT_DUNGEON_COST, DUNGEON_COST_PROTOCORE, dungeonData} from '../data/protocore-data';
import {bottles, crystalColors} from '../data/my-resources'; // <-- импорт crystalColors
import {getImageUrl} from './imageUtils';
import {Link} from "react-router-dom";

// Константы
const DAILY_STAMINA = 390; // суточное топливо

function FarmGoalTracker() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userResources, setUserResources] = useState({
        bottles: {},
        coreEnergy: {},
        credits: 0
    });

    // Загрузка целей из localStorage
    useEffect(() => {
        const loadGoals = () => {
            const savedGoals = JSON.parse(localStorage.getItem('farm_goals') || '[]');
            setGoals(savedGoals);
            setLoading(false);
        };

        loadGoals();

        const handleStorageChange = (e) => {
            if (e.key === 'farm_goals') {
                loadGoals();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Загрузка ресурсов пользователя
    useEffect(() => {
        const loadResources = () => {
            const bottles = JSON.parse(localStorage.getItem('inventory_bottles') || '{}');
            const coreEnergy = JSON.parse(localStorage.getItem('inventory_core_energy') || '{}');
            const credits = JSON.parse(localStorage.getItem('inventory_credits') || '0');
            const crystals = JSON.parse(localStorage.getItem('inventory_crystals') || '{}');
            setUserResources({bottles, coreEnergy, credits, crystals});
        };

        loadResources();

        const handleStorageChange = () => loadResources();
        window.addEventListener('storage', handleStorageChange);

        const interval = setInterval(loadResources, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // Подсчёт EXP из Bottles of Wishes (для карточек)
    const getTotalBottleExp = () => {
        const values = {
            bottle_n: 10,
            bottle_r: 50,
            bottle_sr: 250,
            bottle_ssr: 1000
        };
        let total = 0;

        Object.entries(userResources.bottles).forEach(([key, count]) => {
            total += count * (values[key] || 0);
        });

        return total;
    };

    // Подсчёт EXP из Core Energy (для протокоров)
    const getTotalCoreExp = () => {
        const values = {
            core_n: 10,
            core_r: 50,
            core_sr: 250,
            core_ssr: 1000
        };
        let total = 0;

        Object.entries(userResources.coreEnergy).forEach(([key, count]) => {
            total += count * (values[key] || 0);
        });

        return total;
    };

    // Подсчёт кристаллов пользователя с учётом цвета
    const getUserCrystalsByColor = (crystalColor, crystalType) => {
        // crystalColor: 'emerald', 'amber', 'ruby' и т.д.
        // crystalType: 'crystal_n', 'crystal_r', 'crystal_sr'
        const key = `${crystalColor}_${crystalType}`;
        return userResources.crystals[key] || 0;
    };

    // Функция для получения иконки цвета кристалла
    const getCrystalColorIcon = (colorName) => {
        const color = crystalColors.find(c => c.id === colorName);
        return color ? color.img : null;
    };

    // Расчёт фарма для EXP (Memory)
    const calculateExpFarmingMemory = (remainingExp, dungeonLevel) => {
        if (remainingExp <= 0) return {runs: 0, stamina: 0, days: 0};

        const dungeon = expDungeonData.find(d => d.level === dungeonLevel);
        const expPerRun = dungeon ? dungeon.exp : 380;
        const runs = Math.ceil(remainingExp / expPerRun);
        const stamina = runs * DUNGEON_COST;
        const days = Math.ceil(stamina / DAILY_STAMINA);

        return {runs, stamina, days, expPerRun};
    };

    // Расчёт фарма для EXP (Protocore)
    const calculateExpFarmingProtocore = (remainingExp, dungeonLevel) => {
        if (remainingExp <= 0) return {runs: 0, stamina: 0, days: 0};

        const dungeon = dungeonData.find(d => d.level === dungeonLevel);
        const expPerRun = dungeon ? dungeon.exp : 1300;
        const runs = Math.ceil(remainingExp / expPerRun);
        const stamina = runs * DUNGEON_COST_PROTOCORE;
        const days = Math.ceil(stamina / DAILY_STAMINA);

        return {runs, stamina, days, expPerRun};
    };

    // Расчёт фарма для Credits
    const calculateCreditsFarming = (remainingCredits, dungeonLevel, isProtocore = false) => {
        if (remainingCredits <= 0) return {runs: 0, stamina: 0, days: 0};

        const dungeon = creditDungeonData.find(d => d.level === dungeonLevel);
        const creditsPerRun = dungeon ? dungeon.credits : 7600;
        const runs = Math.ceil(remainingCredits / creditsPerRun);
        const stamina = runs * (isProtocore ? CREDIT_DUNGEON_COST : DUNGEON_COST);
        const days = Math.ceil(stamina / DAILY_STAMINA);

        return {runs, stamina, days, creditsPerRun};
    };

    // Расчёт фарма для кристаллов
    const calculateCrystalsFarming = (neededCrystals, dungeonLevel) => {
        if (!neededCrystals) return {runs: 0, stamina: 0, days: 0, details: {}};

        const dungeon = crystalDungeonData.find(d => d.level === dungeonLevel);
        if (!dungeon) return {runs: 0, stamina: 0, days: 0, details: {}};

        let maxRuns = 0;
        const details = {};

        if (neededCrystals.N > 0 && dungeon.crystals.N > 0) {
            const runsN = Math.ceil(neededCrystals.N / dungeon.crystals.N);
            details.N = {needed: neededCrystals.N, runs: runsN, perRun: dungeon.crystals.N};
            maxRuns = Math.max(maxRuns, runsN);
        }
        if (neededCrystals.R > 0 && dungeon.crystals.R > 0) {
            const runsR = Math.ceil(neededCrystals.R / dungeon.crystals.R);
            details.R = {needed: neededCrystals.R, runs: runsR, perRun: dungeon.crystals.R};
            maxRuns = Math.max(maxRuns, runsR);
        }
        if (neededCrystals.SR > 0 && dungeon.crystals.SR > 0) {
            const runsSR = Math.ceil(neededCrystals.SR / dungeon.crystals.SR);
            details.SR = {needed: neededCrystals.SR, runs: runsSR, perRun: dungeon.crystals.SR};
            maxRuns = Math.max(maxRuns, runsSR);
        }

        const stamina = maxRuns * DUNGEON_COST;
        const days = Math.ceil(stamina / DAILY_STAMINA);

        return {runs: maxRuns, stamina, days, details};
    };

    // Завершить цель
    const completeGoal = (goalId) => {
        setGoals(prev => {
            const newGoals = prev.filter(goal => goal.id !== goalId);
            localStorage.setItem('farm_goals', JSON.stringify(newGoals));
            return newGoals;
        });
    };

    // Удалить цель
    const deleteGoal = (goalId) => {
        setGoals(prev => {
            const newGoals = prev.filter(goal => goal.id !== goalId);
            localStorage.setItem('farm_goals', JSON.stringify(newGoals));
            return newGoals;
        });
    };

    // Расчёт остатка в зависимости от типа цели
    const calculateRemaining = (goal) => {
        let totalExp = 0;

        if (goal.type === 'memory') {
            totalExp = getTotalBottleExp();
        } else if (goal.type === 'protocore') {
            totalExp = getTotalCoreExp();
        }

        const remainingExp = Math.max(0, goal.neededExp - totalExp);
        const remainingCredits = Math.max(0, goal.neededCredits - (userResources.credits || 0));

        // Расчёт остатка кристаллов с учётом цвета
        let remainingCrystals = null;
        if (goal.type === 'memory' && (goal.neededCrystalsN > 0 || goal.neededCrystalsR > 0 || goal.neededCrystalsSR > 0)) {
            const crystalColor = goal.crystalColor || 'emerald'; // цвет кристаллов из цели

            const userCrystalsN = getUserCrystalsByColor(crystalColor, 'crystal_n');
            const userCrystalsR = getUserCrystalsByColor(crystalColor, 'crystal_r');
            const userCrystalsSR = getUserCrystalsByColor(crystalColor, 'crystal_sr');

            remainingCrystals = {
                N: Math.max(0, (goal.neededCrystalsN || 0) - userCrystalsN),
                R: Math.max(0, (goal.neededCrystalsR || 0) - userCrystalsR),
                SR: Math.max(0, (goal.neededCrystalsSR || 0) - userCrystalsSR)
            };
        }

        return {exp: remainingExp, credits: remainingCredits, crystals: remainingCrystals};
    };

    const getGoalDescription = (goal) => {
        if (goal.type === 'memory') {
            const rarityMap = {'3-star': '3★', '4-star': '4★', '5-star': '5★'};
            return `${rarityMap[goal.rarity]} Memory: Lvl ${goal.currentLevel} → ${goal.targetLevel}`;
        } else if (goal.type === 'protocore') {
            const typeMap = {alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ'};
            return `${typeMap[goal.protocoreType]} Protocore (${goal.mainStat}): Lvl ${goal.currentLevel} → ${goal.targetLevel}`;
        }
        return 'Unknown goal';
    };

    const getExpLabel = (goal) => {
        return goal.type === 'memory' ? 'EXP (Bottles):' : 'EXP (Core Energy):';
    };

    // Получение уровня данжа для EXP из цели (если сохранён) или значение по умолчанию
    const getExpDungeonLevel = (goal) => {
        return goal.expDungeonLevel || (goal.type === 'memory' ? 9 : 10);
    };

    // Получение уровня данжа для Credits из цели (если сохранён) или значение по умолчанию
    const getCreditDungeonLevel = (goal) => {
        return goal.creditDungeonLevel || 9;
    };

    // Получение уровня данжа для кристаллов из цели (если сохранён) или значение по умолчанию
    const getCrystalDungeonLevel = (goal) => {
        return goal.crystalDungeonLevel || 9;
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.noGoals}>Loading...</div>
            </div>
        );
    }

    if (goals.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.noGoals}>
                    <p>No active goals</p>
                    <p>Go to Protocore Calculator or Memory Upgrade Calculator, calculate resources, and click "Add to
                        Farm
                        Goal Tracker".</p>
                    <p className={styles.linkContainer}>
                        <Link className={styles.link} to="calculator/protocore-calculator">Protocore Calculator</Link>
                        <Link className={styles.link} to="calculator/memory-calculator">Memory Upgrade Calculator</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>

            <div className={styles.goalsList}>
                {goals.map(goal => {
                    const remaining = calculateRemaining(goal);
                    const expCompleted = remaining.exp <= 0;
                    const creditsCompleted = remaining.credits <= 0;

                    // Проверка на кристаллы
                    let crystalsCompleted = true;
                    if (remaining.crystals) {
                        crystalsCompleted = remaining.crystals.N <= 0 && remaining.crystals.R <= 0 && remaining.crystals.SR <= 0;
                    }

                    const expDungeonLvl = getExpDungeonLevel(goal);
                    const creditDungeonLvl = getCreditDungeonLevel(goal);
                    const crystalDungeonLvl = getCrystalDungeonLevel(goal);

                    let expFarming;
                    if (goal.type === 'memory') {
                        expFarming = calculateExpFarmingMemory(remaining.exp, expDungeonLvl);
                    } else {
                        expFarming = calculateExpFarmingProtocore(remaining.exp, expDungeonLvl);
                    }

                    const creditsFarming = calculateCreditsFarming(remaining.credits, creditDungeonLvl, goal.type === 'protocore');
                    const crystalsFarming = remaining.crystals ? calculateCrystalsFarming(remaining.crystals, crystalDungeonLvl) : null;

                    // Суммарные дни фарма (правильный расчет)
                    let totalStamina = 0;

                    // Добавляем стамину для EXP
                    if (remaining.exp > 0) {
                        totalStamina += expFarming.stamina;
                    }

                    // Добавляем стамину для Credits
                    if (remaining.credits > 0) {
                        totalStamina += creditsFarming.stamina;
                    }

                    // Добавляем стамину для Crystal
                    if (remaining.crystals && crystalsFarming &&
                        (remaining.crystals.N > 0 || remaining.crystals.R > 0 || remaining.crystals.SR > 0)) {
                        totalStamina += crystalsFarming.stamina;
                    }

                    const totalDays = Math.ceil(totalStamina / DAILY_STAMINA);


                    return (
                        <div key={goal.id} className={styles.goalCard}>
                            <div className={styles.goalHeader}>
                                <h3 className={styles.goalTitle}>{getGoalDescription(goal)}</h3>
                                <div className={styles.goalActions}>
                                    <button
                                        className={styles.completeButton}
                                        onClick={() => completeGoal(goal.id)}
                                    >
                                        ✓ Complete
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => deleteGoal(goal.id)}
                                    >
                                        ✕ Delete
                                    </button>
                                </div>
                            </div>

                            <div className={styles.goalContent}>
                                {/* Resources Needed */}
                                <div className={styles.resourcesSection}>
                                    <h4>Resources Needed:</h4>
                                    <div className={styles.resourcesList}>
                                        <div>{getExpLabel(goal)} {goal.neededExp.toLocaleString()}</div>
                                        {goal.type === 'memory' && (goal.neededCrystalsN > 0 || goal.neededCrystalsR > 0 || goal.neededCrystalsSR > 0) && (
                                            <div className={styles.crystalRow}>
                                                <img
                                                    src={getImageUrl(getCrystalColorIcon(goal.crystalColor))}
                                                    alt={goal.crystalColor}
                                                    className={styles.crystalColorIcon}
                                                />
                                                {goal.crystalColor} Crystals:
                                                {goal.neededCrystalsN > 0 && ` N: ${goal.neededCrystalsN}`}
                                                {goal.neededCrystalsR > 0 && ` | R: ${goal.neededCrystalsR}`}
                                                {goal.neededCrystalsSR > 0 && ` | SR: ${goal.neededCrystalsSR}`}
                                            </div>
                                        )}
                                        <div>Credits: {goal.neededCredits.toLocaleString()}</div>
                                    </div>
                                </div>

                                {/* Remaining to Farm */}
                                <div className={styles.remainingSection}>
                                    <h4>Remaining to Farm:</h4>
                                    <div className={styles.remainingList}>
                                        <div className={expCompleted ? styles.completed : styles.notCompleted}>
                                            {getExpLabel(goal)} {remaining.exp.toLocaleString()}
                                        </div>
                                        {remaining.crystals && (remaining.crystals.N > 0 || remaining.crystals.R > 0 || remaining.crystals.SR > 0) && (
                                            <div
                                                className={`${crystalsCompleted ? styles.completed : styles.notCompleted} ${styles.crystalRow}`}>
                                                <img
                                                    src={getImageUrl(getCrystalColorIcon(goal.crystalColor))}
                                                    alt={goal.crystalColor}
                                                    className={styles.crystalColorIcon}
                                                />
                                                {goal.crystalColor} Crystals:
                                                {remaining.crystals.N > 0 && ` N: ${remaining.crystals.N}`}
                                                {remaining.crystals.R > 0 && ` | R: ${remaining.crystals.R}`}
                                                {remaining.crystals.SR > 0 && ` | SR: ${remaining.crystals.SR}`}
                                            </div>
                                        )}
                                        <div className={creditsCompleted ? styles.completed : styles.notCompleted}>
                                            Credits: {remaining.credits.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Farming Calculation */}
                                {(remaining.exp > 0 || remaining.credits > 0 || (remaining.crystals && (remaining.crystals.N > 0 || remaining.crystals.R > 0 || remaining.crystals.SR > 0))) && (
                                    <div className={styles.farmingSection}>
                                        <h4>Farming Plan:</h4>
                                        <div className={styles.farmingList}>
                                            <div className={styles.farmingDungeons}>
                                                {remaining.exp > 0 && (
                                                    <div className={styles.farmingCard}>
                                                        <div className={styles.farmingItem}>{getExpLabel(goal)}</div>
                                                        <img src={getImageUrl('../assets/icons/heartbreaker.png')}
                                                             alt="exp dungeon"
                                                             className={styles.itemIcon}/>
                                                        <span className={styles.farmingItem}>{expFarming.runs} runs (Lvl {expDungeonLvl})</span>
                                                        <span
                                                            className={styles.farmingValue}> {expFarming.stamina} stamina</span>
                                                    </div>
                                                )}
                                                {remaining.crystals && crystalsFarming && (remaining.crystals.N > 0 || remaining.crystals.R > 0 || remaining.crystals.SR > 0) && (
                                                    <div className={styles.farmingCard}>
                                                        <div className={styles.farmingItem}>Crystals:</div>
                                                        <img src={getImageUrl('../assets/icons/lemonette.png')}
                                                             alt="crystals dungeon"
                                                             className={styles.itemIcon}/>
                                                        <span
                                                            className={styles.farmingItem}>{crystalsFarming.runs} runs (Lvl {crystalDungeonLvl})</span>
                                                        <span
                                                            className={styles.farmingValue}>{crystalsFarming.stamina} stamina</span>
                                                    </div>
                                                )}
                                                {remaining.credits > 0 && (
                                                    <div className={styles.farmingCard}>
                                                        <div className={styles.farmingItem}>Credits:</div>
                                                        <img src={getImageUrl('../assets/icons/beanie.png')}
                                                             alt="credits dungeon"
                                                             className={styles.itemIcon}/>
                                                        <span
                                                            className={styles.farmingItem}>{creditsFarming.runs} runs (Lvl {creditDungeonLvl})</span>
                                                        <span
                                                            className={styles.farmingValue}>{creditsFarming.stamina} stamina</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.farmingRow}>
                                                ⏱️ Estimated: <strong>~{totalDays} day{totalDays !== 1 ? 's' : ''}</strong> (based
                                                on {DAILY_STAMINA} stamina/day)
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FarmGoalTracker;