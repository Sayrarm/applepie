import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./AccountSwitcher.module.css";
import {
    saveSlotData,
    getSlot,
    deleteSlot,
    getCurrentDataObject,
    applySlotData,
    validateImportFile,
    reloadWithDelay,
} from "@localstorage";

const ACTIVE_SLOT_KEY = "activeAccountSlot";
const SLOTS = [
    { id: "account-1", label: "Account 1" },
    { id: "account-2", label: "Account 2" },
];

/**
 * Сохраняет текущее состояние localStorage в указанный слот.
 */
async function saveCurrentStateToSlot(slotId) {
    const existing = await getSlot(slotId);
    const data = getCurrentDataObject();

    await saveSlotData(slotId, {
        name: existing?.name ?? slotId,
        fileName: existing?.fileName ?? null,
        data,
    });

    return { totalItems: Object.keys(data).length };
}

function AccountSlot({ slot, isActive, onActivate, onSwitchRequest }) {
    const [meta, setMeta] = useState(null);
    const [isBusy, setIsBusy] = useState(false);
    const inputRef = useRef(null);

    const refreshMeta = useCallback(async () => {
        const data = await getSlot(slot.id);
        if (!data) return setMeta(null);
        setMeta({
            fileName: data.fileName,
            updatedAt: data.updatedAt,
            count: data.data ? Object.keys(data.data).length : 0,
        });
    }, [slot.id]);

    useEffect(() => {
        void refreshMeta();
    }, [refreshMeta]);

    // ---- Загрузить новый файл в слот ----
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsBusy(true);

            const text = await file.text();
            const content = JSON.parse(text);
            const keys = validateImportFile(content);

            await saveSlotData(slot.id, {
                name: slot.label,
                fileName: file.name,
                data: content.data,
            });

            await refreshMeta();

            const applyNow = window.confirm(
                `✅ File saved to "${slot.label}" (${keys.length} items).\n\n` +
                `Apply it now? This will replace all current data.`,
            );

            if (applyNow) {
                // Активируем напрямую из только что загруженных данных
                await onSwitchRequest(slot.id, { skipSaveCurrent: true });
            }
        } catch (err) {
            console.error(err);
            alert(`❌ Failed to save file: ${err.message}`);
        } finally {
            setIsBusy(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    // ---- Активировать слот ----
    const handleActivate = () => {
        if (isActive) {
            // Это активный слот → просто сохранить текущее состояние
            return handleSaveCurrent();
        }
        onSwitchRequest(slot.id);
    };

    const handleSaveCurrent = async () => {
        try {
            setIsBusy(true);
            const { totalItems } = await saveCurrentStateToSlot(slot.id);
            await refreshMeta();
            alert(`💾 Saved ${totalItems} items to "${slot.label}".`);
        } catch (err) {
            alert(`❌ Failed to save: ${err.message}`);
        } finally {
            setIsBusy(false);
        }
    };

    const handleDelete = async () => {
        if (
            !window.confirm(
                `Remove saved file from "${slot.label}"?\n` +
                `(Current app data will NOT be touched)`,
            )
        )
            return;

        try {
            await deleteSlot(slot.id);
            setMeta(null);
        } catch (err) {
            alert(`❌ Failed to delete: ${err.message}`);
        }
    };

    return (
        <div
            className={`${styles.accountCard} ${isActive ? styles.accountCardActive : ""}`}
        >
            <div className={styles.accountHeader}>
                <span className={styles.accountIcon}>👤</span>
                <h4 className={styles.accountTitle}>{slot.label}</h4>
                {isActive && <span className={styles.activeBadge}>ACTIVE</span>}
            </div>

            {meta ? (
                <div className={styles.fileInfo}>
                    <div className={styles.fileName} title={meta.fileName}>
                        📄 {meta.fileName || "(no file name)"}
                    </div>
                    <div className={styles.fileMeta}>
                        {meta.count} items • {new Date(meta.updatedAt).toLocaleString()}
                    </div>
                </div>
            ) : (
                <div className={styles.emptyState}>No data saved yet</div>
            )}

            <div className={styles.buttonRow}>
                <button
                    className={`${styles.btn} ${
                        isActive ? styles.btnPrimary : styles.btnActivate
                    }`}
                    onClick={handleActivate}
                    disabled={isBusy || (!meta && !isActive)}
                    title={!meta && !isActive ? "Upload a file first" : ""}
                >
                    {isBusy
                        ? "⏳..."
                        : isActive
                            ? "💾 Save current"
                            : "▶ Activate"}
                </button>

                <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={() => inputRef.current?.click()}
                    disabled={isBusy}
                >
                    {meta ? "🔁 Replace file" : "📁 Upload the file"}
                </button>

                {meta && !isActive && (
                    <button
                        className={`${styles.btn} ${styles.btnDanger}`}
                        onClick={handleDelete}
                        disabled={isBusy}
                        title="Remove saved file"
                    >
                        🗑️
                    </button>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleUpload}
                style={{ display: "none" }}
            />
        </div>
    );
}

function AccountSwitcher() {
    const [activeSlot, setActiveSlot] = useState(
        () => localStorage.getItem(ACTIVE_SLOT_KEY) || null,
    );
    const [refreshKey, setRefreshKey] = useState(0);

    /**
     * Переключение на слот.
     * По умолчанию сначала сохраняем текущий активный слот.
     */
    const switchToSlot = async (targetSlotId, { skipSaveCurrent = false } = {}) => {
        try {
            // 1) Сохраняем текущий активный слот, чтобы не потерять изменения
            if (!skipSaveCurrent && activeSlot && activeSlot !== targetSlotId) {
                await saveCurrentStateToSlot(activeSlot);
                setRefreshKey((k) => k + 1); // обновим мету активного слота
            }

            // 2) Читаем целевой слот
            const target = await getSlot(targetSlotId);
            if (!target) {
                alert("❌ This slot is empty. Upload a file first.");
                return;
            }

            const confirmed = window.confirm(
                `⚠️ Switch to "${target.name}"?\n\n` +
                `Current app data will be COMPLETELY replaced by:\n` +
                `📄 ${target.fileName || "(no file name)"}\n` +
                `📦 ${Object.keys(target.data).length} items\n` +
                `🕒 saved ${new Date(target.updatedAt).toLocaleString()}\n\n` +
                `Continue?`,
            );
            if (!confirmed) return;

            // 3) Применяем
            const { cleared, imported } = applySlotData(target);

            localStorage.setItem(ACTIVE_SLOT_KEY, targetSlotId);
            setActiveSlot(targetSlotId);
            setRefreshKey((k) => k + 1);

            alert(
                `✅ Switched to "${target.name}"\n\n` +
                `🗑️ Cleared: ${cleared}\n` +
                `📥 Imported: ${imported}\n\n` +
                `🔄 Refreshing...`,
            );
            reloadWithDelay(1000);
        } catch (err) {
            console.error(err);
            alert(`❌ Failed to switch: ${err.message}`);
        }
    };

    // Автосохранение при закрытии вкладки
    useEffect(() => {
        if (!activeSlot) return;
        const handler = () => {
            // Синхронно использовать IndexedDB нельзя, но попытка не помешает.
            // Чаще всего браузер успевает завершить транзакцию.
            saveCurrentStateToSlot(activeSlot).catch(() => {});
        };
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [activeSlot]);

    // Опционально: автосохранение при изменениях в localStorage
    // (см. блок ниже — можно вынести в хук useActiveSlotSync)
    useEffect(() => {
        if (!activeSlot) return;

        let timer = null;
        const scheduleSave = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                saveCurrentStateToSlot(activeSlot).catch(() => {});
            }, 2000); // дебаунс 2 сек
        };

        // Патчим setItem/removeItem, чтобы ловить изменения внутри одной вкладки
        const origSet = Storage.prototype.setItem;
        const origRemove = Storage.prototype.removeItem;

        Storage.prototype.setItem = function (...args) {
            origSet.apply(this, args);
            scheduleSave();
        };
        Storage.prototype.removeItem = function (...args) {
            origRemove.apply(this, args);
            scheduleSave();
        };

        return () => {
            Storage.prototype.setItem = origSet;
            Storage.prototype.removeItem = origRemove;
            clearTimeout(timer);
        };
    }, [activeSlot]);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>🔄 Account Switcher</h3>
            <p className={styles.subtitle}>
                Changes you make in the app are auto-saved into the active slot before
                switching. Press <b>▶ Activate</b> to switch accounts.
            </p>

            <div className={styles.accountsGrid}>
                {SLOTS.map((slot) => (
                    <AccountSlot
                        key={`${slot.id}-${refreshKey}`}
                        slot={slot}
                        isActive={activeSlot === slot.id}
                        onActivate={setActiveSlot}
                        onSwitchRequest={switchToSlot}
                    />
                ))}
            </div>

            <div className={styles.warning}>
                ⚠️ Switching erases current app data and loads the other slot. Your
                current state will be saved to the active slot automatically first.
            </div>
        </div>
    );
}

export default AccountSwitcher;