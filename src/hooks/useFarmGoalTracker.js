import { useState, useEffect, useCallback } from "react";
import { getFarmGoals, completeFarmGoal, deleteFarmGoal } from "@localstorage";
import {
  getBottles,
  getCoreEnergy,
  getCredits,
  getCrystals,
  getHearts,
  getCapsule,
} from "@localstorage";

export function useFarmGoals() {
  // ===== СОСТОЯНИЯ =====
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userResources, setUserResources] = useState({
    bottles: {},
    coreEnergy: {},
    credits: 0,
    crystals: {},
    hearts: {},
    capsules: {}
  });

  // ===== ЗАГРУЗКА ЦЕЛЕЙ =====
  const loadGoals = useCallback(() => {
    const savedGoals = getFarmGoals();
    setGoals(savedGoals);
    setLoading(false);
  }, []);

  // ===== ЗАГРУЗКА РЕСУРСОВ =====
  const loadResources = useCallback(() => {
    setUserResources({
      bottles: getBottles(),
      coreEnergy: getCoreEnergy(),
      credits: getCredits(),
      crystals: getCrystals(),
      hearts: getHearts(),
      capsules: getCapsule(),
    });
  }, []);

  // ===== ИНИЦИАЛИЗАЦИЯ =====
  useEffect(() => {
    loadGoals();
    loadResources();

    // Слушаем изменения в localStorage из других вкладок
    const handleStorageChange = (e) => {
      if (e.key === "farm_goals") {
        loadGoals();
      }
      if (e.key?.startsWith("inventory_")) {
        loadResources();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadGoals, loadResources]);

  // ===== ОБНОВЛЕНИЕ РЕСУРСОВ ПО ИНТЕРВАЛУ =====
  useEffect(() => {
    const interval = setInterval(loadResources, 2000);
    return () => clearInterval(interval);
  }, [loadResources]);

  // ===== ДЕЙСТВИЯ С ЦЕЛЯМИ =====
  const completeGoal = useCallback((goalId) => {
    const newGoals = completeFarmGoal(goalId);
    setGoals(newGoals);
  }, []);

  const deleteGoal = useCallback((goalId) => {
    const newGoals = deleteFarmGoal(goalId);
    setGoals(newGoals);
  }, []);

  // ===== ПОЛУЧЕНИЕ КРИСТАЛЛА ПО ЦВЕТУ И ТИПУ =====
  const getCrystalCount = useCallback(
    (color, type) => {
      const key = `${color}_${type}`;
      return userResources.crystals[key] || 0;
    },
    [userResources.crystals],
  );

  // ===== ПОЛУЧЕНИЕ КОЛИЧЕСТВА HEART =====
  const getHeartCount = useCallback(
    (heartName) => {
      const heartsState = userResources.hearts || {};

      let heartId = null;
      if (heartName.includes("SR") && !heartName.includes("SSR")) {
        heartId = "heart_sr";
      } else if (heartName.includes("SSR")) {
        heartId = "heart_ssr";
      }
      return heartId ? heartsState[heartId] || 0 : 0;
    },
    [userResources.hearts],
  );

  // ===== ВОЗВРАТ =====
  return {
    goals,
    userResources,
    loading,
    loadGoals,
    loadResources,
    completeGoal,
    deleteGoal,
    getCrystalCount,
    getHeartCount,
  };
}
