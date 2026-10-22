import {KEYS} from "./localStorageKeys.js";

const STORAGE_KEY = KEYS.banners_calendar_predicts;

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