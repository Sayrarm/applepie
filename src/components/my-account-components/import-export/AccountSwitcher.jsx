import React, { useRef, useState } from "react";
import styles from "./AccountSwitcher.module.css";
import {
    clearAppStorage,
    validateImportFile,
    applyDataToStorage,
    reloadWithDelay,
} from "@localstorage";

function AccountSlot({ title, onLoaded }) {
    const [isLoading, setIsLoading] = useState(false);
    const [lastFile, setLastFile] = useState(null);
    const inputRef = useRef(null);

    const resetInput = () => {
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleFile = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = JSON.parse(e.target.result);
                const keys = validateImportFile(content);

                const confirmed = window.confirm(
                    `⚠️ Load data into "${title}"?\n\n` +
                    `This will COMPLETELY WIPE all current localStorage data for this app ` +
                    `and replace it with data from the file.\n\n` +
                    `📦 Found ${keys.length} items to import.\n` +
                    `Export date: ${content.exportedAt || "Unknown"}\n` +
                    `Version: ${content.version || "Unknown"}\n\n` +
                    `Continue?`,
                );

                if (!confirmed) {
                    setIsLoading(false);
                    resetInput();
                    return;
                }

                // 1. Полная очистка текущих данных приложения
                const clearedCount = clearAppStorage();

                // 2. Импорт новых данных
                const importedCount = applyDataToStorage(content.data);

                setLastFile({
                    name: file.name,
                    importedAt: new Date().toLocaleString(),
                    count: importedCount,
                });

                if (onLoaded) onLoaded(title);

                alert(
                    `✅ "${title}" loaded!\n\n` +
                    `🗑️ Cleared: ${clearedCount} old items\n` +
                    `📥 Imported: ${importedCount} new items\n\n` +
                    `🔄 Refreshing page...`,
                );

                reloadWithDelay(1000);
            } catch (err) {
                console.error("Import error:", err);
                alert(`❌ Failed to load: ${err.message}`);
                setIsLoading(false);
                resetInput();
            }
        };

        reader.onerror = () => {
            alert("❌ Failed to read file");
            setIsLoading(false);
            resetInput();
        };

        reader.readAsText(file);
    };

    return (
        <div className={styles.accountCard}>
            <div className={styles.accountHeader}>
                <span className={styles.accountIcon}>👤</span>
                <h4 className={styles.accountTitle}>{title}</h4>
            </div>

            <button
                className={styles.uploadButton}
                onClick={() => inputRef.current?.click()}
                disabled={isLoading}
            >
                {isLoading ? "⏳ Loading..." : "📁 Upload the file"}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFile}
                style={{ display: "none" }}
            />

            {lastFile && (
                <div className={styles.fileInfo}>
                    <div className={styles.fileName} title={lastFile.name}>
                        📄 {lastFile.name}
                    </div>
                    <div className={styles.fileMeta}>
                        {lastFile.count} items • {lastFile.importedAt}
                    </div>
                </div>
            )}
        </div>
    );
}

function AccountSwitcher() {
    const handleLoaded = (accountName) => {
        console.log(`Account "${accountName}" loaded`);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>🔄 Account Switcher</h3>
            <p className={styles.subtitle}>
                Load a saved account. All current data will be replaced.
            </p>

            <div className={styles.accountsGrid}>
                <AccountSlot title="Account 1" onLoaded={handleLoaded} />
                <AccountSlot title="Account 2" onLoaded={handleLoaded} />
            </div>

            <div className={styles.warning}>
                ⚠️ Loading a file will <strong>completely erase</strong> all current
                data before importing. Make sure you've exported your current account
                first!
            </div>
        </div>
    );
}

export default AccountSwitcher;