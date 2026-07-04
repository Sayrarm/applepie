import React, { useState } from 'react';
import styles from './DataManager.module.css';

// Список всех ключей localStorage, которые нужно сохранять
const STORAGE_KEYS = [
    // Данные Showcase
    'showcase_data',

    // Данные карточек (уровни, ранги, доступность, возвышение)
    /^cardLevel_\d+$/,
    /^cardRank_\d+$/,
    /^cardAvailable_\d+$/,
    /^cardAscend_\d+$/,
    /^card_protocores_\d+$/,

    // Данные протокоров
    'protocores',

    // Данные ресурсов
    'myResources_bottles',
    'myResources_heartsand',
    'myResources_crystals',
    'myResources_crystalBoxes',
    'myResources_hearts',
    'myResources_coreEnergy',
    'myResources_credits',
    'myResources_selectedCrystalColor',
];

function DataManager() {
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = React.useRef();

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
            </div>

            <div className={styles.info}>
                <small>
                    💡 Exports all your data (My Memories, My Protocores, My Resources, Showcase) to a JSON file.
                    <br />
                    Import will overwrite ALL existing data. Make sure to backup first!
                </small>
            </div>
        </div>
    );
}

export default DataManager;