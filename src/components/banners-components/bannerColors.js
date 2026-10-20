import { memoriesData } from "@data";

// Цвета по персонажам (solo / birthday)
const CHAR_COLORS = {
    Xavier: "#9b6cff",   // фиолетовый
    Zayne: "#5fb8ff",    // голубой
    Rafayel: "#ff8ac4",  // розовый
    Sylus: "#ff4d4d",    // красный
    Caleb: "#ff9f43",    // оранжевый
};

// Фиксированные цвета
const COLORS = {
    multi: "#3fae5a",     // зелёный
    rerun: "#9a9a9a",     // серый
    standart: "#3a7bd5",  // синий
};

// Получить уникальных персонажей баннера
export const getBannerCharacters = (banner) => {
    const set = new Set();
    banner.cardIds?.forEach((cardId) => {
        const memory = memoriesData.find((m) => m.id === cardId);
        if (memory) set.add(memory.char);
    });
    return Array.from(set);
};

// Определить цвет баннера
export const getBannerColor = (banner) => {
    // Рерун важнее типа — он всегда серый
    if (banner.rerun === true) return COLORS.rerun;

    // Standart
    if (banner.type === "standart") return COLORS.standart;

    // Multi
    if (banner.type === "multi") return COLORS.multi;

    // Solo / Birthday — цвет персонажа
    if (banner.type === "solo" || banner.type === "birthday") {
        const chars = getBannerCharacters(banner);
        if (chars.length === 1) {
            return CHAR_COLORS[chars[0]] || "#888";
        }
        // Fallback: если по какой-то причине несколько персонажей
        return COLORS.multi;
    }

    // Myth — если не задан отдельный цвет, можно взять по персонажу
    if (banner.type === "myth") {
        const chars = getBannerCharacters(banner);
        if (chars.length === 1) {
            return CHAR_COLORS[chars[0]] || "#888";
        }
        return COLORS.multi;
    }

    return "#888"; // fallback
};

// Получить подпись типа (для tooltip)
export const getBannerTypeLabel = (banner) => {
    if (banner.rerun) return "Rerun";
    switch (banner.type) {
        case "standart": return "Standart";
        case "multi": return "Multi";
        case "solo": return "Solo";
        case "birthday": return "Birthday";
        case "myth": return "Myth";
        default: return "Banner";
    }
};