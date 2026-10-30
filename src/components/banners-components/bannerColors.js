import { memoriesData } from "@data";

// Цвета по персонажам (solo / birthday)
const CHAR_COLORS = {
    Xavier: "#9b6cff",   // фиолетовый
    Zayne: "#7bc6ff",    // голубой
    Rafayel: "#ff8ac4",  // розовый
    Sylus: "#8e2828",    // красный
    Caleb: "#ff9f43",    // оранжевый
};

// Фиксированные цвета
const COLORS = {
    multi: "#3fae5a",     // зелёный
    rerun: "#9a9a9a",     // серый
    standart: "#175fb3",  // синий
    promise: "#ffce00",  //желтый
};

// Получить уникальных персонажей баннера
export const getBannerCharacters = (banner) => {
    // Если это кастомный баннер с указанным персонажем (из модалки)
    if (banner.customChar) {
        return [banner.customChar];
    }

    const set = new Set();
    banner.cardIds?.forEach((cardId) => {
        const memory = memoriesData.find((m) => m.id === cardId);
        if (memory) set.add(memory.char);
    });
    return Array.from(set);
};

// Определить цвет баннера
export const getBannerColor = (banner) => {
    // Если у баннера есть кастомный цвет — используем его (на будущее)
    if (banner.customColor) return banner.customColor;

    // Если это кастомный баннер с персонажем — берем цвет из CHAR_COLORS
    if (banner.customChar && CHAR_COLORS[banner.customChar]) {
        return CHAR_COLORS[banner.customChar];
    }

    // Рерун важнее типа — он всегда серый
    if (banner.rerun === true) return COLORS.rerun;

    // Standart
    if (banner.type === "standart") return COLORS.standart;

    // Multi
    if (banner.type === "multi") return COLORS.multi;

    // Promise
    if (banner.type === "promise") return COLORS.promise;

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
        case "promise": return "Promise";
        default: return "Banner";
    }
};