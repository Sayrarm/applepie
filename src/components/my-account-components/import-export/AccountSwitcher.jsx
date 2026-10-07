import React, { useEffect, useRef, useState } from "react";
import styles from "./AccountSwitcher.module.css";
import {
    saveSlotFile,
    getSlot,
    deleteSlot,
    readSlotAsText,
    clearAppStorage,
    validateImportFile,
    applyDataToStorage,
    reloadWithDelay,
} from "@localstorage";

const ACTIVE_SLOT_KEY = "activeAccountSlot";

const SLOTS = [
    { id: "account-1", label: "Account 1" },
    { id: "account-2", label: "Account 2" },
];

function AccountSlot({ slot, isActive, onActivate, onRefreshAll }) {
    const [meta, setMeta] = useState(null); // { fileName, updatedAt, size }
    const [isBusy, setIsBusy] = useState(false);
    const inputRef = useRef(null);

    // Загружаем метаданные слота при монтировании
    useEffect(() => {
        let mounted = true;
        getSlot(slot.id).then((data) => {
            if (!mounted) return;
            if (data) {
                setMeta({
                    fileName: data.fileName,
                    updatedAt: data.updatedAt,
                    size: data.size,
                });
            } else {
                setMeta(null);
            }
        });
        return () => {
            mounted = false;
        };
    }, [slot.id]);

    // Загрузить новый файл в слот
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsBusy(true);
            await saveSlotFile(slot.id, file);

            const data = await getSlot(slot.id);
            setMeta({
                fileName: data.fileName,
                updatedAt: data.updatedAt,
                size: data.size,
            });

            onRefreshAll?.();

            const applyNow = window.confirm(
                `✅ File saved to "${slot.label}".\n\n` +
                `Apply it now? This will replace all current data.`,
            );

            if (applyNow) {
                await activateSlot();
            }
        } catch (err) {
            console.error(err);
            alert(`❌ Failed to save file: ${err.message}`);
        } finally {
            setIsBusy(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    // Применить слот: очистить localStorage + залить данные
    const activateSlot = async () => {
        try {
            setIsBusy(true);

            const text = await readSlotAsText(slot.id);
            const content = JSON.parse(text);
            validateImportFile(content);

            const confirmed = window.confirm(
                `⚠️ Switch to "${slot.label}"?\n\n` +
                `This will COMPLETELY replace current data with:\n` +
                `📄 ${meta?.fileName}\n` +
                `📦 ${Object.keys(content.data).length} items\n\n` +
                `Continue?`,
            );

            if (!confirmed) {
                setIsBusy(false);
                return;
            }

            const clearedCount = clearAppStorage();
            const importedCount = applyDataToStorage(content.data);

            localStorage.setItem(ACTIVE_SLOT_KEY, slot.id);
            onActivate(slot.id);

            alert(
                `✅ Switched to "${slot.label}"\n\n` +
                `🗑️ Cleared: ${clearedCount}\n` +
                `📥 Imported: ${importedCount}\n\n` +
                `🔄 Refreshing...`,
            );
            reloadWithDelay(1000);
        } catch (err) {
            console.error(err);
            alert(`❌ Failed to switch: ${err.message}`);
            setIsBusy(false);
        }
    };

    const handleDelete = async () => {
        if (
            !window.confirm(
                `Remove saved file from "${slot.label}"?\n` +
                `(Current data in the app will NOT be touched)`,
            )
        )
            return;

        try {
            await deleteSlot(slot.id);
            setMeta(null);
            onRefreshAll?.();
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
                        📄 {meta.fileName}
                    </div>
                    <div className={styles.fileMeta}>
                        {new Date(meta.updatedAt).toLocaleString()}
                    </div>
                </div>
            ) : (
                <div className={styles.emptyState}>No file saved yet</div>
            )}

            <div className={styles.buttonRow}>
                <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={activateSlot}
                    disabled={isBusy || !meta}
                    title={!meta ? "Upload a file first" : "Apply this account"}
                >
                    {isBusy ? "⏳..." : "▶ Activate"}
                </button>

                <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={() => inputRef.current?.click()}
                    disabled={isBusy}
                >
                    {meta ? "🔁 Replace file" : "📁 Upload the file"}
                </button>

                {meta && (
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

    const refreshAll = () => setRefreshKey((k) => k + 1);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>🔄 Account Switcher</h3>
            <p className={styles.subtitle}>
                Upload a JSON export to each slot. Then press <b>▶ Activate</b> to
                switch accounts — the current data will be fully replaced.
            </p>

            <div className={styles.accountsGrid}>
                {SLOTS.map((slot) => (
                    <AccountSlot
                        key={`${slot.id}-${refreshKey}`}
                        slot={slot}
                        isActive={activeSlot === slot.id}
                        onActivate={setActiveSlot}
                        onRefreshAll={refreshAll}
                    />
                ))}
            </div>

            <div className={styles.warning}>
                ⚠️ <b>Activate</b> completely erases current app data and loads the
                chosen file. Make sure you've exported your current state first.
            </div>
        </div>
    );
}

export default AccountSwitcher;