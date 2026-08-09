import React, { useState } from 'react';
import styles from './DataManager.module.css';

// Список всех ключей localStorage, которые нужно сохранять
const STORAGE_KEYS = [
    // Данные Showcase (старый ключ)
    'showcase_data',
    // Данные команд Showcase (новый ключ)
    'showcase_teams',

    // Данные карточек (уровни, ранги, доступность, возвышение)
    /^cardLevel_\d+$/,
    /^cardRank_\d+$/,
    /^cardAvailable_\d+$/,
    /^cardAscend_\d+$/,
    /^card_protocores_\d+$/,

    // Данные протокоров
    'protocores',

    // Данные ресурсов
    'inventory_bottles',
    'inventory_heartsand',
    'inventory_crystals',
    'inventory_crystal_boxes',
    'inventory_hearts',
    'inventory_core_energy',
    'inventory_credits',
    'inventory_selected_crystal_color',
    'inventory_diamonds',
    'inventory_wish'
];

// Функция для проверки, соответствует ли ключ паттерну
const matchesPattern = (key, pattern) => {
    if (typeof pattern === 'string') {
        return key === pattern;
    }
    if (pattern instanceof RegExp) {
        return pattern.test(key);
    }
    return false;
};

// Функция для получения всех ключей, которые нужно очистить
const getKeysToClear = () => {
    const keysToClear = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const shouldClear = STORAGE_KEYS.some(pattern => matchesPattern(key, pattern));
        if (shouldClear) {
            keysToClear.push(key);
        }
    }
    return keysToClear;
};

function DataManager() {
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const fileInputRef = React.useRef();

    // Экспорт данных
    const exportData = () => {
        try {
            setIsExporting(true);

            const data = {};
            let totalItems = 0;

            // Собираем все данные из localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Проверяем, нужно ли сохранять этот ключ
                const shouldSave = STORAGE_KEYS.some(pattern => matchesPattern(key, pattern));

                if (shouldSave) {
                    try {
                        const value = localStorage.getItem(key);
                        data[key] = JSON.parse(value);
                        totalItems++;
                    } catch (e) {
                        // Если не парсится как JSON, сохраняем как строку
                        data[key] = localStorage.getItem(key);
                        totalItems++;
                    }
                }
            }

            // Добавляем метаданные
            const exportData = {
                version: '1.0.0',
                exportedAt: new Date().toISOString(),
                totalItems,
                data: data
            };

            // Создаем JSON файл
            const json = JSON.stringify(exportData, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Скачиваем файл
            const link = document.createElement('a');
            link.download = `love_and_deepspace_data_${new Date().toISOString().slice(0, 10)}.json`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            alert(`✅ Successfully exported ${totalItems} items!`);

        } catch (error) {
            console.error('Export error:', error);
            alert('❌ Failed to export data. See console for details.');
        } finally {
            setIsExporting(false);
        }
    };

    // Импорт данных
    const importData = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsImporting(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = JSON.parse(e.target.result);

                // Проверяем структуру файла
                if (!content.data || typeof content.data !== 'object') {
                    throw new Error('Invalid file format: missing "data" object');
                }

                // Подсчет количества импортируемых элементов
                const keys = Object.keys(content.data);
                let importedCount = 0;

                // Подтверждение перед импортом
                const confirmMessage =
                    `⚠️ This will overwrite ALL existing data in localStorage with data from the file.\n\n` +
                    `📦 Found ${keys.length} items to import:\n` +
                    keys.slice(0, 10).join('\n') +
                    (keys.length > 10 ? `\n... and ${keys.length - 10} more` : '') +
                    `\n\nExport date: ${content.exportedAt || 'Unknown'}\n` +
                    `Version: ${content.version || 'Unknown'}\n\n` +
                    `Are you sure you want to continue?`;

                if (!window.confirm(confirmMessage)) {
                    setIsImporting(false);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                    return;
                }

                // Импортируем данные
                for (const [key, value] of Object.entries(content.data)) {
                    try {
                        if (typeof value === 'object') {
                            localStorage.setItem(key, JSON.stringify(value));
                        } else {
                            localStorage.setItem(key, value);
                        }
                        importedCount++;
                    } catch (e) {
                        console.warn(`Failed to import key "${key}":`, e);
                    }
                }

                // Очищаем поле input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                alert(`✅ Successfully imported ${importedCount} items!\n\n🔄 Refreshing page to apply changes...`);

                // Перезагружаем страницу через 1 секунду
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (error) {
                console.error('Import error:', error);
                alert(`❌ Failed to import data: ${error.message}`);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } finally {
                setIsImporting(false);
            }
        };

        reader.onerror = () => {
            alert('❌ Failed to read file');
            setIsImporting(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        };

        reader.readAsText(file);
    };

    // Очистка всех данных
    const clearAllData = () => {
        const keysToClear = getKeysToClear();

        if (keysToClear.length === 0) {
            alert('ℹ️ No data found to clear.');
            return;
        }

        const confirmMessage =
            `⚠️ WARNING: This will permanently delete ALL your saved data!\n\n` +
            `📦 Found ${keysToClear.length} items to delete:\n` +
            keysToClear.slice(0, 10).join('\n') +
            (keysToClear.length > 10 ? `\n... and ${keysToClear.length - 10} more` : '') +
            `\n\nThis includes:\n` +
            `• All My Memories data (levels, ranks, availability, ascension)\n` +
            `• All My Protocores\n` +
            `• All My Resources\n` +
            `• All Showcase Teams\n\n` +
            `Are you absolutely sure you want to continue?`;

        if (!window.confirm(confirmMessage)) {
            return;
        }

        // Второе подтверждение для безопасности
        if (!window.confirm('⚠️ FINAL WARNING: This action cannot be undone! Are you sure?')) {
            return;
        }

        setIsClearing(true);

        try {
            let clearedCount = 0;
            for (const key of keysToClear) {
                localStorage.removeItem(key);
                clearedCount++;
            }

            alert(`✅ Successfully cleared ${clearedCount} items!\n\n🔄 Refreshing page to apply changes...`);

            // Перезагружаем страницу через 1 секунду
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error('Clear error:', error);
            alert('❌ Failed to clear data. See console for details.');
        } finally {
            setIsClearing(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>💾 Data Management</h3>

            <div className={styles.buttonGroup}>
                <button
                    className={`${styles.button} ${styles.exportButton}`}
                    onClick={exportData}
                    disabled={isExporting}
                >
                    {isExporting ? '⏳ Exporting...' : '📤 Export Data'}
                </button>

                <button
                    className={`${styles.button} ${styles.importButton}`}
                    onClick={triggerFileInput}
                    disabled={isImporting}
                >
                    {isImporting ? '⏳ Importing...' : '📥 Import Data'}
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
                    {isClearing ? '⏳ Clearing...' : '🗑️ Clear All Data'}
                </button>
            </div>

            <div className={styles.info}>
                <small>
                    💡 Exports all your data (My Memories, My Protocores, My Resources, Showcase Teams) to a JSON file.
                    <br />
                    Import will overwrite ALL existing data. Make sure to backup first!
                    <br />
                    ⚠️ Clear All Data will permanently delete ALL your saved data. This cannot be undone!
                </small>
            </div>
        </div>
    );
}

export default DataManager;