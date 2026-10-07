import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AccountSwitcher.module.css";
import {
    saveSlotData,
    getSlot,
    deleteSlot,
    renameSlot,
    getCurrentDataObject,
    applySlotData,
    validateImportFile,
    reloadWithDelay,
} from "@localstorage";
import {
    notifyActiveAccountChanged,
    notifySlotUpdated,
} from "@hooks";

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

function AccountSlot({ slot, isActive, onSwitchRequest }) {
    const [meta, setMeta] = useState(null);
    const [isBusy, setIsBusy] = useState(false);

    // Режим редактирования имени
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameDraft, setNameDraft] = useState("");

    const inputRef = useRef(null);
    const nameInputRef = useRef(null);

    // ---------- Метаданные слота ----------
    const refreshMeta = useCallback(async () => {
        const data = await getSlot(slot.id);
        if (!data) {
            setMeta(null);
            return;
        }
        setMeta({
            name: data.name || slot.label,
            fileName: data.fileName,
            updatedAt: data.updatedAt,
            count: data.data ? Object.keys(data.data).length : 0,
        });
    }, [slot.id, slot.label]);

    useEffect(() => {
        void refreshMeta();
    }, [refreshMeta]);

    // Автофокус и выделение текста при входе в режим редактирования
    useEffect(() => {
        if (isEditingName && nameInputRef.current) {
            nameInputRef.current.focus();
            nameInputRef.current.select();
        }
    }, [isEditingName]);

    // ---------- Редактирование имени ----------
    const startEditName = () => {
        if (!meta) return; // пустой слот переименовать нельзя
        setNameDraft(meta.name || slot.label);
        setIsEditingName(true);
    };

    const cancelEditName = () => {
        setIsEditingName(false);
        setNameDraft("");
    };

    const commitEditName = async () => {
        // Переименовывать пустой слот нельзя
        if (!meta) {
            cancelEditName();
            return;
        }

        const trimmed = nameDraft.trim();
        const fallback = slot.label;
        const finalName = trimmed || fallback;

        if (finalName === meta.name) {
            cancelEditName();
            return;
        }

        try {
            setIsBusy(true);
            await renameSlot(slot.id, finalName);
            await refreshMeta();
            notifySlotUpdated(slot.id);
        } catch (err) {
            console.error(err);
            alert(`❌ Failed to rename: ${err.message}`);
        } finally {
            setIsBusy(false);
            cancelEditName();
        }
    };

    const handleNameKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            commitEditName();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancelEditName();
        }
    };

    // ---------- Загрузка файла в слот ----------
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsBusy(true);

            const text = await file.text();
            const content = JSON.parse(text);
            const keys = validateImportFile(content);

            // Если у слота уже есть имя — сохраняем его, иначе дефолт slot.label
            const existing = await getSlot(slot.id);
            const name = existing?.name || slot.label;

            await saveSlotData(slot.id, {
                name,
                fileName: file.name,
                data: content.data,
            });

            await refreshMeta();
            notifySlotUpdated(slot.id);

            const applyNow = window.confirm(
                `✅ File saved to "${name}" (${keys.length} items).\n\n` +
                `Apply it now? This will replace all current data.`,
            );

            if (applyNow) {
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

    // ---------- Активация слота ----------
    const handleActivate = () => {
        if (isActive) return handleSaveCurrent();
        onSwitchRequest(slot.id);
    };

    const handleSaveCurrent = async () => {
        try {
            setIsBusy(true);
            const { totalItems } = await saveCurrentStateToSlot(slot.id);
            await refreshMeta();
            notifySlotUpdated(slot.id);
            alert(
                `💾 Saved ${totalItems} items to "${meta?.name || slot.label}".`,
            );
        } catch (err) {
            alert(`❌ Failed to save: ${err.message}`);
        } finally {
            setIsBusy(false);
        }
    };

    const handleDelete = async () => {
        if (
            !window.confirm(
                `Remove saved file from "${meta?.name || slot.label}"?\n` +
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

    const displayName = meta?.name || slot.label;

    return (
        <div
            className={`${styles.accountCard} ${
                isActive ? styles.accountCardActive : ""
            }`}
        >
            <div className={styles.accountHeader}>
                <span className={styles.accountIcon}>👤</span>

                {isEditingName ? (
                    <input
                        ref={nameInputRef}
                        className={styles.nameInput}
                        value={nameDraft}
                        onChange={(e) => setNameDraft(e.target.value)}
                        onBlur={commitEditName}
                        onKeyDown={handleNameKeyDown}
                        maxLength={40}
                        disabled={isBusy}
                    />
                ) : (
                    <h4
                        className={styles.accountTitle}
                        onClick={meta ? startEditName : undefined}
                        title={meta ? "Click to rename" : "Upload a file first"}
                        style={{ cursor: meta ? "text" : "default" }}
                    >
                        {displayName}
                    </h4>
                )}

                {isActive && <span className={styles.activeBadge}>ACTIVE</span>}

                {meta && !isEditingName && (
                    <button
                        className={styles.iconButton}
                        onClick={startEditName}
                        title="Rename"
                        disabled={isBusy}
                        type="button"
                    >
                        ✏️
                    </button>
                )}
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
                    {isBusy ? "⏳..." : isActive ? "💾 Save current" : "▶ Activate"}
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

    /**
     * Переключение на слот.
     * По умолчанию сначала сохраняем текущий активный слот.
     */
    const switchToSlot = async (
        targetSlotId,
        { skipSaveCurrent = false } = {},
    ) => {
        try {
            // 1) Сохраняем текущий активный слот, чтобы не потерять изменения
            if (!skipSaveCurrent && activeSlot && activeSlot !== targetSlotId) {
                await saveCurrentStateToSlot(activeSlot);
                notifySlotUpdated(activeSlot);
            }

            // 2) Читаем целевой слот
            const target = await getSlot(targetSlotId);
            if (!target) {
                alert("❌ This slot is empty. Upload a file first.");
                return;
            }

            const confirmed = window.confirm(
                `⚠️ Switch to "${target.name || targetSlotId}"?\n\n` +
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
            notifyActiveAccountChanged();

            alert(
                `✅ Switched to "${target.name || targetSlotId}"\n\n` +
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
            // Синхронно IndexedDB не дождаться, но попытка не помешает
            saveCurrentStateToSlot(activeSlot).catch(() => {});
        };

        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [activeSlot]);

    // Дебаунс-автосохранение при изменениях в localStorage
    useEffect(() => {
        if (!activeSlot) return;

        let timer = null;
        const scheduleSave = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                saveCurrentStateToSlot(activeSlot)
                    .then(() => notifySlotUpdated(activeSlot))
                    .catch(() => {});
            }, 2000); // дебаунс 2 сек
        };

        // Патчим setItem/removeItem, чтобы ловить изменения внутри вкладки
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
                Upload a JSON export to each slot. Rename by clicking the title. Press{" "}
                <b>▶ Activate</b> to switch accounts.
            </p>

            <div className={styles.accountsGrid}>
                {SLOTS.map((slot) => (
                    <AccountSlot
                        key={slot.id}
                        slot={slot}
                        isActive={activeSlot === slot.id}
                        onSwitchRequest={switchToSlot}
                    />
                ))}
            </div>

            <div className={styles.warning}>
                ⚠️ <b>Activate</b> completely erases current app data and loads the
                chosen slot. Your current state will be auto-saved to the active slot
                first.
            </div>
        </div>
    );
}

export default AccountSwitcher;