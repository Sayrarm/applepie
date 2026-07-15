//Bottles of Wishes
export const bottles = [
    {id: 'bottle_n', name: "Bottle of Wishes: N", value: 10, img: "../assets/icons/bottle-n.png"},
    {id: 'bottle_r', name: "Bottle of Wishes: R", value: 50, img: "../assets/icons/bottle-r.png"},
    {id: 'bottle_sr', name: "Bottle of Wishes: SR", value: 250, img: "../assets/icons/bottle-sr.png"},
    {id: 'bottle_ssr', name: "Bottle of Wishes: SSR", value: 1000, img: "../assets/icons/bottle-ssr.png"}
];

//Memory Heartsand
export const heartSand = [
    {id: 'heartsand_r', name: "Memory Heartsand: R", value: 1, img: "../assets/icons/heartsand-r.png"},
    {id: 'heartsand_sr', name: "Memory Heartsand: SR", value: 1, img: "../assets/icons/heartsand-sr.png"},
    {id: 'heartsand_ssr', name: "Memory Heartsand: SSR", value: 1, img: "../assets/icons/heartsand-ssr.png"}
];

//Crystals Type
export const crystalColors = [
    {id: 'Violet', name: "Violet", value: 1, img: "../assets/icons/violet-sr.png"},
    {id: 'Amber', name: "Amber", value: 1, img: "../assets/icons/amber-sr.png"},
    {id: 'Ruby', name: "Ruby", value: 1, img: "../assets/icons/ruby-sr.png"},
    {id: 'Emerald', name: "Emerald", value: 1, img: "../assets/icons/emerald-sr.png"},
    {id: 'Pearl', name: "Pearl", value: 1, img: "../assets/icons/pearl-sr.png"},
    {id: 'Sapphire', name: "Sapphire", value: 1, img: "../assets/icons/sapphire-sr.png"},
];

//Crystals
export const crystalTypes = [
    {id: 'crystal_n', name: "Crystal: N", value: 1, img: "../assets/icons/gray-n.png"},
    {id: 'crystal_r', name: "Crystal: R", value: 1, img: "../assets/icons/gray-r.png"},
    {id: 'crystal_sr', name: "Crystal: SR", value: 1, img: "../assets/icons/gray-sr.png"}
];

//Boss
export const bossImg = [
    {id: 'Heartbreaker', img: "../assets/icons/heartbreaker.png"},
    {id: 'Core_Hunt', img: "../assets/icons/core-hunt.png"},
    {id: 'Lemonette', img: "../assets/icons/lemonette.png"},
    {id: 'Snoozer', img: "../assets/icons/snoozer.png"},
    {id: 'Pumpkin_Magus', img: "../assets/icons/magus.png"},
];

export const crystalIcons = {
    'Violet': {
        'crystal_n': '../assets/icons/violet-n.png',
        'crystal_r': '../assets/icons/violet-r.png',
        'crystal_sr': '../assets/icons/violet-sr.png'
    },
    'Amber': {
        'crystal_n': '../assets/icons/amber-n.png',
        'crystal_r': '../assets/icons/amber-r.png',
        'crystal_sr': '../assets/icons/amber-sr.png'
    },
    'Ruby': {
        'crystal_n': '../assets/icons/ruby-n.png',
        'crystal_r': '../assets/icons/ruby-r.png',
        'crystal_sr': '../assets/icons/ruby-sr.png'
    },
    'Emerald': {
        'crystal_n': '../assets/icons/emerald-n.png',
        'crystal_r': '../assets/icons/emerald-r.png',
        'crystal_sr': '../assets/icons/emerald-sr.png'
    },
    'Pearl': {
        'crystal_n': '../assets/icons/pearl-n.png',
        'crystal_r': '../assets/icons/pearl-r.png',
        'crystal_sr': '../assets/icons/pearl-sr.png'
    },
    'Sapphire': {
        'crystal_n': '../assets/icons/sapphire-n.png',
        'crystal_r': '../assets/icons/sapphire-r.png',
        'crystal_sr': '../assets/icons/sapphire-sr.png'
    }
};

//Ascension Crystal Box
export const crystalBox = [
    {id: 'box_n', name: "Ascension Crystal Box: N", value: 1, img: "../assets/icons/crystal-box-n.png"},
    {id: 'box_r', name: "Ascension Crystal Box: R", value: 1, img: "../assets/icons/crystal-box-r.png"},
    {id: 'box_sr', name: "Ascension Crystal: SR", value: 1, img: "../assets/icons/crystal-box-sr.png"},
    {id: 'box_general', name: "Ascension Crystal Box: General", value: 1, img: "../assets/icons/crystal-box-general.png"}
];

//Awakening Heart
export const hearts = [
    {id: 'heart_sr', name: "Awakening Heart: SR", value: 1, img: "../assets/icons/heart-sr.png"},
    {id: 'heart_ssr', name: "Awakening Heart: SSR", value: 1, img: "../assets/icons/heart-ssr.png"},
];

//Core Energy
export const coreEnergy = [
    {id: 'core_n', name: "Core Energy: N", value: 10, img: "../assets/icons/crystal-n.png"},
    {id: 'core_r', name: "Core Energy: R", value: 50, img: "../assets/icons/crystal-r.png"},
    {id: 'core_sr', name: "Core Energy: SR", value: 250, img: "../assets/icons/crystal-sr.png"},
    {id: 'core_ssr', name: "Core Energy: SSR", value: 1000, img: "../assets/icons/crystal-ssr.png"}
];

//Credits
export const credits = [
    {id: 'credits', name: "Credits", value: 1, img: "../assets/icons/credits.png"},
];

// Расчёт обмена Memory Heartsand (принимает состояние)
export const getHeartsandExchange = (heartsandState) => {
    const heartsandR = heartsandState['heartsand_r'] || 0;
    const heartsandSR = heartsandState['heartsand_sr'] || 0;
    const heartsandSSR = heartsandState['heartsand_ssr'] || 0;

    return {
        bottles: {
            R: Math.floor(heartsandR / 10) * 5,
            SR: Math.floor(heartsandSR / 5) * 5,
            SSR: Math.floor(heartsandSSR / 4) * 5,
            hasAny: (Math.floor(heartsandR / 10) * 5) > 0 ||
                (Math.floor(heartsandSR / 5) * 5) > 0 ||
                (Math.floor(heartsandSSR / 4) * 5) > 0
        },
        credits: {
            R: Math.floor(heartsandR / 100) * 50000,
            SR: Math.floor(heartsandSR / 10) * 50000,
            SSR: Math.floor(heartsandSSR / 2) * 50000,
            total: (Math.floor(heartsandR / 100) * 50000) +
                (Math.floor(heartsandSR / 10) * 50000) +
                (Math.floor(heartsandSSR / 2) * 50000)
        }
    };
};

// Расчёт обмена Ascension Crystal Box (принимает состояние)
export const getCrystalBoxExchange = (crystalBoxesState) => {
    const exchange = {
        box_n: crystalBoxesState['box_n'] || 0,
        box_r: crystalBoxesState['box_r'] || 0,
        box_sr: crystalBoxesState['box_sr'] || 0,
        box_general: crystalBoxesState['box_general'] || 0
    };

    return {
        box_n: exchange.box_n,
        box_r: exchange.box_r,
        box_sr: exchange.box_sr,
        box_general: exchange.box_general,
        toN: exchange.box_general * 5,
        toR: exchange.box_general * 2,
        toSR: exchange.box_general,
        box_general_to_n: exchange.box_general * 5,
        box_general_to_r: exchange.box_general * 2,
        box_general_to_sr: exchange.box_general,
        hasAny: exchange.box_n > 0 || exchange.box_r > 0 || exchange.box_sr > 0 || exchange.box_general > 0
    };
};

// Получение иконки Memory Heartsand по id
export const getHeartSandIcon = (id) => {
    const item = heartSand.find(h => h.id === id);
    return item ? item.img : null;
};

// Получение иконки Crystal Box по id
export const getCrystalBoxIcon = (id) => {
    const item = crystalBox.find(c => c.id === id);
    return item ? item.img : null;
};

// Ключи для localStorage
export const STORAGE_KEYS = {
    BOTTLES: 'inventory_bottles',
    HEARTSAND: 'inventory_heartsand',
    CRYSTALS: 'inventory_crystals',
    CRYSTAL_BOXES: 'inventory_crystal_boxes',
    HEARTS: 'inventory_hearts',
    CORE_ENERGY: 'inventory_core_energy',
    CREDITS: 'inventory_credits',
    SELECTED_CRYSTAL_COLOR: 'inventory_selected_crystal_color'
};




