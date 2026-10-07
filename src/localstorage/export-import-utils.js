import { isAppKey } from "./export-import-storage.js";

/**
 * Возвращает список всех ключей приложения, которые сейчас есть в localStorage.
 */
export const getAppKeys = () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (isAppKey(key)) keys.push(key);
    }
    return keys;
};

/**
 * Собирает все данные приложения из localStorage в объект.
 * Пытается распарсить JSON, иначе сохраняет как строку.
 */
export const collectAppData = () => {
    const data = {};
    let totalItems = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!isAppKey(key)) continue;

        const raw = localStorage.getItem(key);
        try {
            data[key] = JSON.parse(raw);
        } catch {
            data[key] = raw;
        }
        totalItems++;
    }

    return { data, totalItems };
};

/**
 * Полностью удаляет все ключи приложения из localStorage.
 * @returns {number} количество удалённых ключей
 */
export const clearAppStorage = () => {
    const keys = getAppKeys();
    keys.forEach((key) => localStorage.removeItem(key));
    return keys.length;
};

/**
 * Формирует итоговый объект для экспорта в файл.
 */
export const buildExportPayload = (data, totalItems) => ({
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    totalItems,
    data,
});

/**
 * Валидирует содержимое загруженного JSON-файла.
 * @throws {Error} если структура некорректна
 */
export const validateImportFile = (content) => {
    if (!content || typeof content !== "object") {
        throw new Error("Invalid file: not a JSON object");
    }
    if (!content.data || typeof content.data !== "object") {
        throw new Error('Invalid file format: missing "data" object');
    }
    return Object.keys(content.data);
};

/**
 * Записывает данные из объекта в localStorage.
 * @returns {number} количество успешно записанных ключей
 */
export const applyDataToStorage = (data) => {
    let importedCount = 0;
    for (const [key, value] of Object.entries(data)) {
        try {
            if (typeof value === "object" && value !== null) {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                localStorage.setItem(key, String(value));
            }
            importedCount++;
        } catch (err) {
            console.warn(`Failed to write key "${key}":`, err);
        }
    }
    return importedCount;
};

/**
 * Скачивает объект как JSON-файл.
 */
export const downloadJson = (payload, filenamePrefix = "lads-data") => {
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = `${filenamePrefix}-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Формирует короткий список ключей для превью в confirm-окне.
 */
export const formatKeysPreview = (keys, limit = 10) => {
    const preview = keys.slice(0, limit).join("\n");
    return keys.length > limit
        ? `${preview}\n... and ${keys.length - limit} more`
        : preview;
};

/**
 * Перезагружает страницу через заданную задержку.
 */
export const reloadWithDelay = (delay = 1000) => {
    setTimeout(() => window.location.reload(), delay);
};

export const switchToSlot = async (slotId) => {
    const text = await readSlotAsText(slotId);
    const content = JSON.parse(text);
    validateImportFile(content);

    const clearedCount = clearAppStorage();
    const importedCount = applyDataToStorage(content.data);

    return { clearedCount, importedCount };
};

/**
 * Собирает данные текущего localStorage в объект `{ key: value }`.
 */
export const getCurrentDataObject = () => {
    const { data } = collectAppData();
    return data;
};

/**
 * Применяет слот: чистит localStorage и заливает данные слота.
 */
export const applySlotData = (slot) => {
    if (!slot || !slot.data) throw new Error("Slot is empty");
    const cleared = clearAppStorage();
    const imported = applyDataToStorage(slot.data);
    return { cleared, imported };
};