import { hearts } from "@data";
import { KEYS } from "@localstorage";

// Расчёт обмена Memory Heartsand (принимает состояние)
export const getHeartsandExchange = (heartsandState) => {
  const heartsandR = heartsandState["heartsand_r"] || 0;
  const heartsandSR = heartsandState["heartsand_sr"] || 0;
  const heartsandSSR = heartsandState["heartsand_ssr"] || 0;

  return {
    bottles: {
      R: Math.floor(heartsandR / 10) * 5,
      SR: Math.floor(heartsandSR / 5) * 5,
      SSR: Math.floor(heartsandSSR / 4) * 5,
      hasAny:
        Math.floor(heartsandR / 10) * 5 > 0 ||
        Math.floor(heartsandSR / 5) * 5 > 0 ||
        Math.floor(heartsandSSR / 4) * 5 > 0,
    },
    credits: {
      R: Math.floor(heartsandR / 100) * 50000,
      SR: Math.floor(heartsandSR / 10) * 50000,
      SSR: Math.floor(heartsandSSR / 2) * 50000,
      total:
        Math.floor(heartsandR / 100) * 50000 +
        Math.floor(heartsandSR / 10) * 50000 +
        Math.floor(heartsandSSR / 2) * 50000,
    },
  };
};

// Расчёт обмена Ascension Crystal Box (принимает состояние)
export const getCrystalBoxExchange = (crystalBoxesState) => {
  const exchange = {
    box_n: crystalBoxesState["box_n"] || 0,
    box_r: crystalBoxesState["box_r"] || 0,
    box_sr: crystalBoxesState["box_sr"] || 0,
    box_general: crystalBoxesState["box_general"] || 0,
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
    hasAny:
      exchange.box_n > 0 ||
      exchange.box_r > 0 ||
      exchange.box_sr > 0 ||
      exchange.box_general > 0,
  };
};

// Получение информации о Heart по id
export const getHeartInfo = (heartName) => {
  // heartName может быть 'Heart SR' или 'Heart SSR'
  const heart = hearts.find((h) => h.name === heartName);
  return heart || null;
};

// Получение количества Heart из localStorage
export const getHeartCount = (heartName) => {
  try {
    const saved = localStorage.getItem(KEYS.INVENTORY_HEARTS);
    const heartsState = saved ? JSON.parse(saved) : {};

    // heartName: 'Awakening Heart: SR' или 'Awakening Heart: SSR'
    // Находим соответствующий id
    let heartId = null;
    if (heartName.includes("SR") && !heartName.includes("SSR")) {
      heartId = "heart_sr";
    } else if (heartName.includes("SSR")) {
      heartId = "heart_ssr";
    }
    return heartId ? heartsState[heartId] || 0 : 0;
  } catch (e) {
    console.error("Error loading heart count:", e);
    return 0;
  }
};

// Расчёт обмена Diamonds на Wishes
export const getWishExchange = (diamondsState) => {
  const diamonds = Number(diamondsState) || 0;
  const wishPrice = 150;

  return {
    wishes: {
      standart: Math.floor(diamonds / wishPrice),
      limited: Math.floor(diamonds / wishPrice),
      rerun: Math.floor(diamonds / wishPrice),
    },
  };
};
