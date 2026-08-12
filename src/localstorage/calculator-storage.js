import { KEYS } from '@localstorage';

// ===== FARM GOALS =====
export const getFarmGoals = () => {
    try {
        const data = localStorage.getItem(KEYS.CALC_RESULT);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveFarmGoals = (goals) => {
    try {
        localStorage.setItem(KEYS.CALC_RESULT, JSON.stringify(goals));
        return true;
    } catch (error) {
        console.error('Ошибка сохранения farm_goals:', error);
        return false;
    }
};

export const addFarmGoal = (goal) => {
    const goals = getFarmGoals();
    goals.push(goal);
    saveFarmGoals(goals);
    return goals;
};

