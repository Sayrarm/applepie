import { KEYS } from "@localstorage";

// ===== РАЗМЕР КАРТОЧЕК =====
export const getCardSize = () => {
  try {
    const saved = localStorage.getItem(KEYS.CARD_SIZE);
    return saved || "big";
  } catch {
    return "big";
  }
};

export const saveCardSize = (size) => {
  try {
    localStorage.setItem(KEYS.CARD_SIZE, size);
    return true;
  } catch (error) {
    console.error("Ошибка сохранения размера карточек:", error);
    return false;
  }
};

// ===== ПОКАЗЫВАТЬ ИНФОРМАЦИЮ О КАРТОЧКЕ =====
export const getShowUserInfo = () => {
  try {
    const saved = localStorage.getItem(KEYS.SHOW_USER_INFO);
    return saved !== null ? JSON.parse(saved) : true;
  } catch {
    return true;
  }
};

export const saveShowUserInfo = (value) => {
  try {
    localStorage.setItem(KEYS.SHOW_USER_INFO, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Ошибка сохранения настройки отображения информации:", error);
    return false;
  }
};