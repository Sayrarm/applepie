import {KEYS} from "./localStorageKeys.js";

const STORAGE_KEY = KEYS.banners_calendar_predicts;
const SHOW_PREDICTS_KEY = KEYS.banners_calendar_show_predicts;

export const getPredicts = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to load predicts", e);
        return [];
    }
};

export const savePredicts = (predicts) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(predicts));
    } catch (e) {
        console.error("Failed to save predicts", e);
    }
};

export const addPredict = (predict) => {
    const predicts = getPredicts();
    predicts.push(predict);
    savePredicts(predicts);
    return predicts;
};

export const removePredict = (id) => {
    let predicts = getPredicts();
    predicts = predicts.filter((p) => p.id !== id);
    savePredicts(predicts);
    return predicts;
};

export const clearPredicts = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return [];
    } catch (e) {
        console.error("Failed to clear predicts", e);
        return [];
    }
};

export const getShowPredicts = () => {
    try {
        const data = localStorage.getItem(SHOW_PREDICTS_KEY);
        // Если ничего не сохранено — по умолчанию показываем предикты
        return data === null ? true : data === "true";
    } catch (e) {
        console.error("Failed to load showPredicts", e);
        return true;
    }
};

export const saveShowPredicts = (value) => {
    try {
        localStorage.setItem(SHOW_PREDICTS_KEY, String(value));
    } catch (e) {
        console.error("Failed to save showPredicts", e);
    }
};