// Сохранить статус доступности карточки
export const setCardAvailability = (cardId, isAvailable) => {
    localStorage.setItem(`cardAvailable_${cardId}`, JSON.stringify(isAvailable));
};

// Получить статус доступности карточки
export const getCardAvailability = (cardId) => {
    const saved = localStorage.getItem(`cardAvailable_${cardId}`);
    return saved ? JSON.parse(saved) : false;
};

// Получить все карточки с их статусами
export const getAllCardAvailability = () => {
    const allCards = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cardAvailable_')) {
            const cardId = key.replace('cardAvailable_', '');
            const value = localStorage.getItem(key);
            allCards[cardId] = value ? JSON.parse(value) : false;
        }
    }
    return allCards;
};

// Обновить memoriesData с учетом статусов доступности
export const enhanceMemoriesWithAvailability = (memoriesData) => {
    const availabilityMap = getAllCardAvailability();
    return memoriesData.map(card => ({
        ...card,
        isAvailable: availabilityMap[String(card.id)] || false
    }));
};