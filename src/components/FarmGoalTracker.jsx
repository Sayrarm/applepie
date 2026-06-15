import { useState, useEffect } from 'react';
import styles from './FarmGoalTracker.module.css';

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
            setUserResources({ bottles, coreEnergy, credits });
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
        return { exp: remainingExp, credits: remainingCredits };
    };

    const getGoalDescription = (goal) => {
        if (goal.type === 'memory') {
            const rarityMap = { '3-star': '3★', '4-star': '4★', '5-star': '5★' };
            return `${rarityMap[goal.rarity]} Memory: Lvl ${goal.currentLevel} → ${goal.targetLevel}`;
        } else if (goal.type === 'protocore') {
            const typeMap = { alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ' };
            return `${typeMap[goal.protocoreType]} Protocore (${goal.mainStat}): Lvl ${goal.currentLevel} → ${goal.targetLevel}`;
        }
        return 'Unknown goal';
    };

    const getExpLabel = (goal) => {
        return goal.type === 'memory' ? 'EXP (Bottles):' : 'EXP (Core Energy):';
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
                    <p>Go to Protocore Calculator or Memory Up Calculator, calculate resources, and click "Add to Farm Goal Tracker".</p>
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
                                <div className={styles.resourcesSection}>
                                    <h4>Resources Needed:</h4>
                                    <div className={styles.resourcesList}>
                                        <div>{getExpLabel(goal)} {goal.neededExp.toLocaleString()}</div>
                                        <div>Credits: {goal.neededCredits.toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className={styles.remainingSection}>
                                    <h4>Remaining to Farm:</h4>
                                    <div className={styles.remainingList}>
                                        <div className={expCompleted ? styles.completed : styles.notCompleted}>
                                            {getExpLabel(goal)} {remaining.exp.toLocaleString()}
                                        </div>
                                        <div className={creditsCompleted ? styles.completed : styles.notCompleted}>
                                            Credits: {remaining.credits.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FarmGoalTracker;