export const KEYS = {
    SHOWCASE: 'showcase_teams', //витрина(шоукейс) команды
    CALC_RESULT: 'farm_goals', //трекер
    THEME: 'theme', //темная/светлая тема
    TIMEZONE: 'app_timezone', //часовой пояс
    TABLE_SORT_KEY: 'mymemories_table_sort', //фильтр таблицы в MyMemories
    CARD_SIZE: 'card_image_size', //карточка маленького/большого размера

    // Инвентарь
    INVENTORY_BOTTLES: 'inventory_bottles',
    INVENTORY_CORE_ENERGY: 'inventory_core_energy',
    INVENTORY_CREDITS: 'inventory_credits',
    INVENTORY_CRYSTALS: 'inventory_crystals',
    INVENTORY_HEARTSAND: 'inventory_heartsand',
    INVENTORY_CRYSTAL_BOXES: 'inventory_crystal_boxes',
    INVENTORY_HEARTS: 'inventory_hearts',
    INVENTORY_SELECTED_CRYSTAL_COLOR: 'inventory_selected_crystal_color',
    INVENTORY_DIAMONDS: 'inventory_diamonds',
    INVENTORY_WISH: 'inventory_wish',
};

// Функции для динамических ключей

//для карточек
export const getCardKeys = (cardId) => ({
    protocores: `card_protocores_${cardId}`,
    level: `cardLevel_${cardId}`,
    rank: `cardRank_${cardId}`,
    available: `cardAvailable_${cardId}`,
    ascend: `cardAscend_${cardId}`,
});

//для фильтров карточек
export const getMemoryFilterKeys = (prefix) => ({
    rarity: prefix ? `${prefix}_filter_rarity` : 'filter_rarity',
    placement: prefix ? `${prefix}_filter_placement` : 'filter_placement',
    talent: prefix ? `${prefix}_filter_talent` : 'filter_talent',
    stella: prefix ? `${prefix}_filter_stella` : 'filter_stella',
    availability: prefix ? `${prefix}_filter_availability` : 'filter_availability',
    selectedChar: prefix ? `${prefix}_selected_char` : 'memories_selected_char',
    filters: prefix ? `${prefix}_filters` : 'memories_filters',
    search: prefix ? `${prefix}_search_query` : 'memories_search_query',
    sort: prefix ? `${prefix}_sort_criteria` : 'memories_sort_criteria',
});

//для фильтров протокоров
export const getProtocoreFilterKeys = (prefix) => ({
    types: prefix ? `${prefix}_protocore_filter_types` : 'protocore_filter_types',
    stellactrum: prefix ? `${prefix}_protocore_filter_stellactrum` : 'protocore_filter_stellactrum',
    levels: prefix ? `${prefix}_protocore_filter_levels` : 'protocore_filter_levels',
    mainStats: prefix ? `${prefix}_protocore_filter_mainStats` : 'protocore_filter_mainStats',
    subStats: prefix ? `${prefix}_protocore_filter_subStats` : 'protocore_filter_subStats',
    status: prefix ? `${prefix}_protocore_filter_status` : 'protocore_filter_status',
    filters: prefix ? `${prefix}_protocore_filters` : 'protocore_filters',
    search: prefix ? `${prefix}_protocore_search_query` : 'protocore_search_query',
    sort: prefix ? `${prefix}_protocore_sort_criteria` : 'protocore_sort_criteria',
});