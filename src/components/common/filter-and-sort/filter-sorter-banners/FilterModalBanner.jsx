import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Checkbox, Button } from "antd";
import {
    getBannerFilters,
    saveBannerFilters,
    clearAllBannerFilters,
} from "@localstorage";
import { useTranslation } from "react-i18next";

const FilterModalBanner = forwardRef(
    ({ open, onClose, onFilter, onClearFilters, storagePrefix = "" }, ref) => {
        const { t } = useTranslation();

        // Загружаем фильтры из localStorage
        const [type, setType] = useState(() => {
            const saved = getBannerFilters(storagePrefix);
            return saved.type || [];
        });

        // Сохраняем только type, не затирая другие поля
        useEffect(() => {
            const saved = getBannerFilters(storagePrefix);
            saveBannerFilters(storagePrefix, { ...saved, type });
        }, [type, storagePrefix]);

        // ЭКСПОРТИРУЕМ ФУНКЦИЮ ДЛЯ ВНЕШНЕГО ВЫЗОВА
        useImperativeHandle(ref, () => ({
            clearAll: () => {
                setType([]);
                clearAllBannerFilters(storagePrefix);
                if (onClearFilters) {
                    onClearFilters();
                }
            },
        }));

        const optionsType = [
            { label: t("FilterModalBanner.solo"), value: "solo" },
            { label: t("FilterModalBanner.multi"), value: "multi" },
        ];

        const handleClear = () => {
            setType([]);
            clearAllBannerFilters(storagePrefix);
            if (onClearFilters) {
                onClearFilters();
            }
        };

        const handleOk = () => {
            onFilter({ type });
            onClose();
        };

        return (
            <Modal
                title={t("FilterModalBanner.titleModal")}
                open={open}
                onOk={handleOk}
                onCancel={onClose}
                width={400}
            >
                <div style={{ marginBottom: 15 }}>
                    <span>{t("FilterModalBanner.type")} </span>
                    <Checkbox.Group
                        options={optionsType}
                        value={type}
                        onChange={setType}
                    />
                </div>

                <Button onClick={handleClear}>{t("FilterModalBanner.clear")}</Button>
            </Modal>
        );
    },
);

export default FilterModalBanner;