export const getCardLevel = (cardId) => {
    const saved = localStorage.getItem(`cardLevel_${cardId}`);
    return saved ? parseInt(saved) : 1;
};

export const getCardRank = (cardId) => {
    const saved = localStorage.getItem(`cardRank_${cardId}`);
    return saved ? parseInt(saved) : 0;
};

export const getCardAscend = (cardId) => {
    const saved = localStorage.getItem(`cardAscend_${cardId}`);
    return saved ? JSON.parse(saved) : false;
};

export const getCardProtocores = (cardId) => {
    const saved = localStorage.getItem(`card_protocores_${cardId}`);
    return saved ? JSON.parse(saved) : [];
};