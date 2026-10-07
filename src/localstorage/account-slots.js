const DB_NAME = "lads-accounts";
const DB_VERSION = 2; // подняли версию — старые слоты несовместимы
const STORE = "slots";

const openDb = () =>
    new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onupgradeneeded = () => {
            const db = req.result;
            if (db.objectStoreNames.contains(STORE)) {
                db.deleteObjectStore(STORE); // чистим старый формат
            }
            db.createObjectStore(STORE, { keyPath: "slotId" });
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });

const tx = async (mode, fn) => {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE, mode);
        const store = transaction.objectStore(STORE);
        const result = fn(store);

        transaction.oncomplete = () => resolve(result);
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
    });
};

/**
 * Слот: { slotId, name, fileName, data, updatedAt }
 * data — тот же объект, что и в экспортном JSON (ключ → значение).
 */

export const saveSlotData = async (slotId, { name, fileName, data }) => {
    return tx("readwrite", (store) =>
        store.put({
            slotId,
            name,
            fileName: fileName || null,
            data,
            updatedAt: Date.now(),
        }),
    );
};

/**
 * Прочитать слот.
 * @returns {Promise<{slotId, fileName, fileBlob, updatedAt} | null>}
 */
export const getSlot = async (slotId) => {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE, "readonly");
        const req = transaction.objectStore(STORE).get(slotId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
};

/**
 * Удалить слот.
 */
export const deleteSlot = async (slotId) => {
    return tx("readwrite", (store) => store.delete(slotId));
};

/**
 * Переименовать слот, не трогая его data.
 */
export const renameSlot = async (slotId, newName) => {
    const existing = await getSlot(slotId);
    if (!existing) throw new Error("Slot is empty");

    return saveSlotData(slotId, {
        name: newName,
        fileName: existing.fileName,
        data: existing.data,
    });
};

/**
 * Создать пустой слот (новый аккаунт без данных).
 */
export const createEmptySlot = async (slotId, name) => {
    const existing = await getSlot(slotId);
    if (existing) return existing; // уже есть — не трогаем

    await saveSlotData(slotId, {
        name,
        fileName: null,
        data: {},
    });

    return getSlot(slotId);
};