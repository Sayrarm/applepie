import { getCardProtocores } from "@localstorage";

export function getAvailableProtocores(excludedCards = []) {
    const allProtocores = JSON.parse(localStorage.getItem("protocores") || "[]");
    const excludedIds = new Set();

    excludedCards.forEach((opt) => {
        const protocores = getCardProtocores(opt.value);
        protocores.forEach((p) => excludedIds.add(p.id));
    });

    return {
        all: allProtocores,
        available: allProtocores.filter((p) => !excludedIds.has(p.id)),
    };
}