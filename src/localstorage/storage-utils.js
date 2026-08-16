// ===== БАЗОВЫЕ ОПЕРАЦИИ С LOCALSTORAGE =====

/**
 * Безопасное получение данных из localStorage
 * @param {string} key - ключ в localStorage
 * @param {*} defaultValue - значение по умолчанию, если ключ не найден
 * @returns {*} - распарсенное значение или defaultValue
 */
export const get = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (e) {
    console.error(`Error loading from storage ${key}:`, e);
    return defaultValue;
  }
};

/**
 * Безопасное сохранение в localStorage
 * @param {string} key - ключ в localStorage
 * @param {*} value - значение для сохранения
 * @returns {boolean} - успех операции
 */
export const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Ошибка сохранения ${key}:`, error);
    return false;
  }
};

/**
 * Безопасное удаление из localStorage
 * @param {string} key - ключ в localStorage
 * @returns {boolean} - успех операции
 */
export const remove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Ошибка удаления ${key}:`, error);
    return false;
  }
};

/**
 * Проверка существования ключа в localStorage
 * @param {string} key - ключ в localStorage
 * @returns {boolean} - существует ли ключ
 */
export const has = (key) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (e) {
    return false;
  }
};

/**
 * Получение всех ключей с определённым префиксом
 * @param {string} prefix - префикс для поиска
 * @returns {string[]} - массив ключей
 */
export const getKeysByPrefix = (prefix) => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Очистка всех ключей с определённым префиксом
 * @param {string} prefix - префикс для очистки
 * @returns {boolean} - успех операции
 */
export const clearByPrefix = (prefix) => {
  try {
    const keys = getKeysByPrefix(prefix);
    keys.forEach((key) => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error(`Ошибка очистки ключей с префиксом ${prefix}:`, error);
    return false;
  }
};
