import React, { useRef, useState } from "react";
import styles from "./DataManager.module.css";
import {
  collectAppData,
  buildExportPayload,
  downloadJson,
  validateImportFile,
  applyDataToStorage,
  clearAppStorage,
  getAppKeys,
  formatKeysPreview,
  reloadWithDelay,
} from "@localstorage"

function DataManager() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const fileInputRef = useRef();

  // ---------- EXPORT ----------
  const exportData = () => {
    try {
      setIsExporting(true);

      const { data, totalItems } = collectAppData();
      const payload = buildExportPayload(data, totalItems);

      downloadJson(payload);
      alert(`✅ Successfully exported ${totalItems} items!`);
    } catch (error) {
      console.error("Export error:", error);
      alert("❌ Failed to export data. See console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  // ---------- IMPORT ----------
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        const keys = validateImportFile(content);

        const confirmMessage =
            `⚠️ This will overwrite ALL existing data in localStorage with data from the file.\n\n` +
            `📦 Found ${keys.length} items to import:\n` +
            formatKeysPreview(keys) +
            `\n\nExport date: ${content.exportedAt || "Unknown"}\n` +
            `Version: ${content.version || "Unknown"}\n\n` +
            `Are you sure you want to continue?`;

        if (!window.confirm(confirmMessage)) {
          resetFileInput();
          return;
        }

        const importedCount = applyDataToStorage(content.data);
        resetFileInput();

        alert(
            `✅ Successfully imported ${importedCount} items!\n\n🔄 Refreshing page to apply changes...`,
        );
        reloadWithDelay(1000);
      } catch (error) {
        console.error("Import error:", error);
        alert(`❌ Failed to import data: ${error.message}`);
        resetFileInput();
      } finally {
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      alert("❌ Failed to read file");
      setIsImporting(false);
      resetFileInput();
    };

    reader.readAsText(file);
  };

  // ---------- CLEAR ----------
  const clearAllData = () => {
    const keys = getAppKeys();

    if (keys.length === 0) {
      alert("ℹ️ No data found to clear.");
      return;
    }

    const confirmMessage =
        `⚠️ WARNING: This will permanently delete ALL your saved data!\n\n` +
        `📦 Found ${keys.length} items to delete:\n` +
        formatKeysPreview(keys) +
        `\n\nThis includes:\n` +
        `• All My Memories data (levels, ranks, availability, ascension)\n` +
        `• All My Protocores\n` +
        `• All My Resources\n` +
        `• All Showcase Teams\n\n` +
        `Are you absolutely sure you want to continue?`;

    if (!window.confirm(confirmMessage)) return;
    if (
        !window.confirm(
            "⚠️ FINAL WARNING: This action cannot be undone! Are you sure?",
        )
    )
      return;

    setIsClearing(true);

    try {
      const clearedCount = clearAppStorage();
      alert(
          `✅ Successfully cleared ${clearedCount} items!\n\n🔄 Refreshing page to apply changes...`,
      );
      reloadWithDelay(1000);
    } catch (error) {
      console.error("Clear error:", error);
      alert("❌ Failed to clear data. See console for details.");
    } finally {
      setIsClearing(false);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
      <div className={styles.container}>
        <h3 className={styles.title}>💾 Data Management</h3>

        <div className={styles.buttonGroup}>
          <button
              className={`${styles.button} ${styles.exportButton}`}
              onClick={exportData}
              disabled={isExporting}
          >
            {isExporting ? "⏳ Exporting..." : "📤 Export Data"}
          </button>

          <button
              className={`${styles.button} ${styles.importButton}`}
              onClick={triggerFileInput}
              disabled={isImporting}
          >
            {isImporting ? "⏳ Importing..." : "📥 Import Data"}
          </button>

          <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={importData}
              className={styles.fileInput}
          />

          <button
              className={`${styles.button} ${styles.clearButton}`}
              onClick={clearAllData}
              disabled={isClearing}
          >
            {isClearing ? "⏳ Clearing..." : "🗑️ Clear All Data"}
          </button>
        </div>

        <div className={styles.info}>
          <small>
            💡 Exports all your data (My Memories, My Protocores, My Resources,
            Showcase Teams) to a JSON file.
            <br />
            Import will overwrite ALL existing data. Make sure to backup first!
            <br />
            ⚠️ Clear All Data will permanently delete ALL your saved data. This
            cannot be undone!
          </small>
        </div>
      </div>
  );
}

export default DataManager;