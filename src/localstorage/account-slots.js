// Хранилище "слотов" аккаунтов в IndexedDB.
// В каждом слоте лежит { name, fileName, fileBlob, updatedAt }.

const DB_NAME = "lads-accounts";
const DB_VERSION = 1;
const STORE = "slots";

const openDb = () =>
    new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE, { keyPath: "slotId" });
            }
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
 * Сохранить файл в слот.
 * @param {string} slotId  например "account-1"
 * @param {File} file
 */
export const saveSlotFile = async (slotId, file) => {
    return tx("readwrite", (store) =>
        store.put({
            slotId,
            fileName: file.name,
            fileBlob: file, // File — подкласс Blob, отлично хранится
            size: file.size,
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
        const store = transaction.objectStore(STORE);
        const req = store.get(slotId);

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
 * Прочитать содержимое файла слота как текст.
 */
export const readSlotAsText = async (slotId) => {
    const slot = await getSlot(slotId);
    if (!slot) throw new Error("Slot is empty");
    return slot.fileBlob.text();
};