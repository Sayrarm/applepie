import { KEYS } from "@localstorage";

export const getTimezone = () => {
  try {
    const saved = localStorage.getItem(KEYS.TIMEZONE);
    return saved || "+02:00";
  } catch {
    return "+02:00";
  }
};

export const saveTimezone = (timezone) => {
  try {
    localStorage.setItem(KEYS.TIMEZONE, timezone);
    return true;
  } catch (error) {
    console.error("Ошибка сохранения часового пояса:", error);
    return false;
  }
};
