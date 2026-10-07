export const STORAGE_KEYS = [
    // Showcase
    "showcase_teams",

    // Трекер
    "farm_goals",

    // Настройки
    "theme",
    "app_timezone",

    // Данные карточек (уровни, ранги, доступность, возвышение)
    /^cardLevel_\d+$/,
    /^cardRank_\d+$/,
    /^cardAvailable_\d+$/,
    /^cardAscend_\d+$/,
    /^card_protocores_\d+$/,

    // Протокоры
    "protocores",

    // Ресурсы
    "inventory_bottles",
    "inventory_heartsand",
    "inventory_crystals",
    "inventory_crystal_boxes",
    "inventory_hearts",
    "inventory_core_energy",
    "inventory_credits",
    "inventory_selected_crystal_color",
    "inventory_diamonds",
    "inventory_wish",
];

/**
 * Проверяет, соответствует ли ключ шаблону (строка или RegExp).
 */
export const matchesPattern = (key, pattern) => {
    if (typeof pattern === "string") return key === pattern;
    if (pattern instanceof RegExp) return pattern.test(key);
    return false;
};

/**
 * Проверяет, относится ли ключ к данным приложения.
 */
export const isAppKey = (key) =>
    STORAGE_KEYS.some((pattern) => matchesPattern(key, pattern));