// src/hooks/useResources.js
import { useState, useEffect, useCallback } from "react";
import {
  getBottles,
  saveBottles,
  getHeartsand,
  saveHeartsand,
  getCrystals,
  saveCrystals,
  getCrystalBoxes,
  saveCrystalBoxes,
  getHearts,
  saveHearts,
  getCoreEnergy,
  saveCoreEnergy,
  getCredits,
  saveCredits,
  getSelectedCrystalColor,
  saveSelectedCrystalColor,
  getDiamonds,
  saveDiamonds,
  getWish,
  saveWish,
} from "@localstorage";

export function useResources() {
  // ===== СОСТОЯНИЯ =====
  const [bottles, setBottles] = useState(getBottles);
  const [heartsand, setHeartsand] = useState(getHeartsand);
  const [crystals, setCrystals] = useState(getCrystals);
  const [crystalBoxes, setCrystalBoxes] = useState(getCrystalBoxes);
  const [hearts, setHearts] = useState(getHearts);
  const [coreEnergy, setCoreEnergy] = useState(getCoreEnergy);
  const [credits, setCredits] = useState(getCredits);
  const [selectedCrystalColor, setSelectedCrystalColor] = useState(
    getSelectedCrystalColor,
  );
  const [diamonds, setDiamonds] = useState(getDiamonds);
  const [wish, setWish] = useState(getWish);

  // ===== ОБНОВЛЕНИЕ КОЛИЧЕСТВА (универсальная функция) =====
  const updateCount = useCallback((state, setState, id, value) => {
    const newState = { ...state };
    newState[id] = Math.max(0, Number(value) || 0);
    setState(newState);
    return newState;
  }, []);

  // ===== СОХРАНЕНИЕ В LOCALSTORAGE ПРИ ИЗМЕНЕНИИ =====
  useEffect(() => {
    saveBottles(bottles);
  }, [bottles]);
  useEffect(() => {
    saveHeartsand(heartsand);
  }, [heartsand]);
  useEffect(() => {
    saveCrystals(crystals);
  }, [crystals]);
  useEffect(() => {
    saveCrystalBoxes(crystalBoxes);
  }, [crystalBoxes]);
  useEffect(() => {
    saveHearts(hearts);
  }, [hearts]);
  useEffect(() => {
    saveCoreEnergy(coreEnergy);
  }, [coreEnergy]);
  useEffect(() => {
    saveCredits(credits);
  }, [credits]);
  useEffect(() => {
    saveSelectedCrystalColor(selectedCrystalColor);
  }, [selectedCrystalColor]);
  useEffect(() => {
    saveDiamonds(diamonds);
  }, [diamonds]);
  useEffect(() => {
    saveWish(wish);
  }, [wish]);

  // ===== ВОЗВРАЩАЕМ ВСЁ, ЧТО НУЖНО КОМПОНЕНТУ =====
  return {
    // Данные
    bottles,
    heartsand,
    crystals,
    crystalBoxes,
    hearts,
    coreEnergy,
    credits,
    selectedCrystalColor,
    diamonds,
    wish,

    // Сеттеры (для прямого обновления)
    setBottles,
    setHeartsand,
    setCrystals,
    setCrystalBoxes,
    setHearts,
    setCoreEnergy,
    setCredits,
    setSelectedCrystalColor,
    setDiamonds,
    setWish,

    // Утилиты
    updateCount,
  };
}
