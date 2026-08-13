import { KEYS, getCardKeys } from './localStorageKeys';
import { memoriesData } from '@data';

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
const get = (key) => {
    try {
        const value = localStorage.getItem(key);
        if (value === null) return null;
        return JSON.parse(value);
    } catch {
        return localStorage.getItem(key);
    }
};

const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Ошибка сохранения ${key}:`, error);
        return false;
    }
};

// ===== ОСНОВНЫЕ ПРОТОКОРЫ (используем KEYS.PROTOCORES) =====
export const getProtocores = () => {
    return get(KEYS.PROTOCORES) || [];
};

export const saveProtocores = (protocores) => {
    return set(KEYS.PROTOCORES, protocores);
};

export const addProtocore = (protocore) => {
    const protocores = getProtocores();
    const newProtocore = {
        ...protocore,
        id: protocore.id || Date.now(),
        createdAt: protocore.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    protocores.push(newProtocore);
    saveProtocores(protocores);
    return newProtocore;
};

export const updateProtocore = (updatedProtocore) => {
    const protocores = getProtocores();
    const index = protocores.findIndex(p => p.id === updatedProtocore.id);
    if (index !== -1) {
        protocores[index] = {
            ...updatedProtocore,
            updatedAt: new Date().toISOString()
        };
        saveProtocores(protocores);
        return protocores[index];
    }
    return null;
};

export const deleteProtocore = (protocoreId) => {
    const protocores = getProtocores();
    const filtered = protocores.filter(p => p.id !== protocoreId);
    saveProtocores(filtered);
    return filtered;
};

export const getProtocoreById = (protocoreId) => {
    const protocores = getProtocores();
    return protocores.find(p => p.id === protocoreId) || null;
};

// ===== ПРОТОКОРЫ КАРТОЧЕК (используем getCardKeys) =====
export const getCardProtocores = (cardId) => {
    if (!cardId) return [];
    const keys = getCardKeys(cardId);
    return get(keys.protocores) || [];
};

export const saveCardProtocores = (cardId, protocores) => {
    if (!cardId) return false;
    const keys = getCardKeys(cardId);
    return set(keys.protocores, protocores);
};

// ===== УДАЛЕНИЕ ПРОТОКОРА ИЗ ВСЕХ КАРТОЧЕК =====
export const removeProtocoreFromAllCards = (protocoreId) => {
    const updatedCards = [];

    for (const card of memoriesData) {
        const cardId = String(card.id);
        const cardProtocores = getCardProtocores(cardId);
        const filtered = cardProtocores.filter(p => p.id !== protocoreId);

        if (filtered.length !== cardProtocores.length) {
            saveCardProtocores(cardId, filtered);
            updatedCards.push({ cardId, protocores: filtered });
        }
    }

    return updatedCards;
};

// ===== ОБНОВЛЕНИЕ ПРОТОКОРА ВО ВСЕХ КАРТОЧКАХ =====
export const updateProtocoreInAllCards = (updatedProtocore) => {
    const updatedCards = [];

    for (const card of memoriesData) {
        const cardId = String(card.id);
        const cardProtocores = getCardProtocores(cardId);
        const index = cardProtocores.findIndex(p => p.id === updatedProtocore.id);

        if (index !== -1) {
            cardProtocores[index] = { ...updatedProtocore };
            saveCardProtocores(cardId, cardProtocores);
            updatedCards.push({ cardId, protocores: cardProtocores });
        }
    }

    return updatedCards;
};

// ===== ПОИСК КАРТОЧКИ ДЛЯ ПРОТОКОРА =====
export const findCardForProtocore = (protocoreId) => {
    for (const card of memoriesData) {
        const cardId = String(card.id);
        const cardProtocores = getCardProtocores(cardId);
        if (cardProtocores.some(p => p.id === protocoreId)) {
            return card.imageSmall;
        }
    }
    return null;
};

// ===== ВСЕ ПРОТОКОРЫ С ИНФОРМАЦИЕЙ О КАРТОЧКАХ =====
export const getProtocoresWithCardInfo = () => {
    const protocores = getProtocores();
    return protocores.map(protocore => ({
        ...protocore,
        cardImage: findCardForProtocore(protocore.id)
    }));
};

// ===== ПРОВЕРКА СОВМЕСТИМОСТИ С КАРТОЧКОЙ =====
export const getCompatibleProtocores = (protocores, cardPlacement, cardStella, selectedProtocores) => {
    return protocores.filter(p => {
        // Проверяем, что протокор уже не выбран
        if (selectedProtocores.some(sp => sp.id === p.id)) return false;

        // Если уже 2 протокора — не показываем ничего
        if (selectedProtocores.length >= 2) return false;

        // Проверка совместимости с placement
        if (!cardPlacement) return false;

        const isSolar = cardPlacement === 'solar';
        const isLunar = cardPlacement === 'lunar';

        if (isSolar) {
            // Для Solar: только alpha и beta
            if (p.type !== 'alpha' && p.type !== 'beta') return false;
        } else if (isLunar) {
            // Для Lunar: только gamma и delta
            if (p.type !== 'gamma' && p.type !== 'delta') return false;
        }

        // Проверка совместимости по стеллактуму
        return !(cardStella && p.stellactrum !== cardStella);
    });
};

// ===== ПОЛУЧЕНИЕ КАРТИНКИ КАРТОЧКИ ПО ID =====
export const getCardImageById = (cardId) => {
    if (!cardId) return null;
    const card = memoriesData.find(c => String(c.id) === cardId);
    return card ? card.imageSmall : null;
};

// ===== ПОЛУЧЕНИЕ ПЛЕЙСМЕНТА КАРТОЧКИ ПО ID =====
export const getCardPlacement = (cardId) => {
    if (!cardId) return null;
    const card = memoriesData.find(c => String(c.id) === cardId);
    return card ? card.placementName : null;
};

// ===== ПОЛУЧЕНИЕ СТЕЛЛАКТРУМА КАРТОЧКИ ПО ID =====
export const getCardStella = (cardId) => {
    if (!cardId) return null;
    const card = memoriesData.find(c => String(c.id) === cardId);
    return card ? card.stellaName : null;
};

// ===== ПОЛУЧЕНИЕ ДАННЫХ КАРТОЧКИ ПО ID =====
export const getCardDataById = (cardId) => {
    if (!cardId) return null;
    return memoriesData.find(c => String(c.id) === cardId) || null;
};