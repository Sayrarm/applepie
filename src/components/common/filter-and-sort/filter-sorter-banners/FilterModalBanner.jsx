import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Checkbox, Button } from "antd";
import {
    getFilters,
    saveFilters,
    getDefaultFilters,
    clearAllFilters,
    getFilterKeys,
} from "@localstorage";
import { useTranslation } from "react-i18next";

const FilterModalBanner = forwardRef(
    ({ open, onClose, onFilter, onClearFilters, storagePrefix = "" }, ref) => {
        const { t } = useTranslation();

        // Загружаем фильтры из localStorage
        const [type, setType] = useState(() => {
            const saved = getFilters(storagePrefix);
            return saved.type || [];
        });

        // Сохраняем в localStorage при изменении
        useEffect(() => {
            const saved = getFilters(storagePrefix);
            saveFilters(storagePrefix, { ...saved, type });
        }, [type, storagePrefix]);

        // ЭКСПОРТИРУЕМ ФУНКЦИЮ ДЛЯ ВНЕШНЕГО ВЫЗОВА
        useImperativeHandle(ref, () => ({
            clearAll: () => {
                setType([]);
                clearAllFilters(storagePrefix);
                if (onClearFilters) {
                    onClearFilters();
                }
            },
        }));

        const optionsType = [
            { label: t('FilterModalBanner.solo'), value: "solo" },
            { label: t('FilterModalBanner.multi'), value: "multi" },
        ];

        const handleTypeChange = (checkedValues) => {
            setType(checkedValues);
        };

        const handleClear = () => {
            setType([]);
            clearAllFilters(storagePrefix);
            if (onClearFilters) {
                onClearFilters();
            }
        };

        const handleOk = () => {
            const filters = {
                type: type,
            };
            onFilter(filters);
            onClose();
        };

        return (
            <Modal
                title={t('FilterModalBanner.titleModal')}
                open={open}
                onOk={handleOk}
                onCancel={onClose}
                width={400}
            >
                <div style={{ marginBottom: 15 }}>
                    <span>{t('FilterModalBanner.type')} </span>
                    <Checkbox.Group
                        options={optionsType}
                        value={type}
                        onChange={handleTypeChange}
                    />
                </div>

                <Button onClick={handleClear}>{t('FilterModalBanner.clear')}</Button>
            </Modal>
        );
    },
);

export default FilterModalBanner;