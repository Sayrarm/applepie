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
import { useTranslation } from "react-i18next";

function DataManager() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const fileInputRef = useRef();
  const { t } = useTranslation();

  // ---------- EXPORT ----------
  const exportData = () => {
    try {
      setIsExporting(true);

      const { data, totalItems } = collectAppData();
      const payload = buildExportPayload(data, totalItems);

      downloadJson(payload);
      alert(t('DataManager.alertSuccess', {totalItems}));
    } catch (error) {
      console.error("Export error:", error);
      alert(t('DataManager.alertFailed'));
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
            t('DataManager.alertWarning') +
            t('DataManager.alertInfo', { count: keys.length }) +
            formatKeysPreview(keys) +
            t('DataManager.alertDate', { date: content.exportedAt.slice(0, -14) || "Unknown" }) +
            t('DataManager.alertWarning2');

        if (!window.confirm(confirmMessage)) {
          resetFileInput();
          return;
        }

        const importedCount = applyDataToStorage(content.data);
        resetFileInput();

        alert(
            t('DataManager.alertImport', { items: importedCount }),
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
        t('DataManager.alerdDelete', { itemsDelete: keys.length }) +
        formatKeysPreview(keys) +
        t('DataManager.alertDeleteConfirm');

    if (!window.confirm(confirmMessage)) return;
    if (
        !window.confirm(
            t('DataManager.alertDeleteConfirmSecond'),
        )
    )
      return;

    setIsClearing(true);

    try {
      const clearedCount = clearAppStorage();
      alert(
          t('DataManager.alertSuccessDelete', { clearedCount: clearedCount }),
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
        <h3 className={styles.title}>{t('DataManager.titleContainer')}</h3>

        <div className={styles.buttonGroup}>
          <button
              className={`${styles.button} ${styles.exportButton}`}
              onClick={exportData}
              disabled={isExporting}
          >
            {isExporting ? t('DataManager.exportButtonActing') : t('DataManager.exportButton')}
          </button>

          <button
              className={`${styles.button} ${styles.importButton}`}
              onClick={triggerFileInput}
              disabled={isImporting}
          >
            {isImporting ? t('DataManager.importButtonActing') : t('DataManager.importButton')}
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
            {isClearing ? t('DataManager.clearButtonActing') : t('DataManager.clearButton')}
          </button>
        </div>

        <div className={styles.info}>
          <small>
            {t('DataManager.exportInfo')}
            <br />
            {t('DataManager.ImportInfo')}
            <br />
            {t('DataManager.ClearInfo')}
          </small>
        </div>
      </div>
  );
}

export default DataManager;