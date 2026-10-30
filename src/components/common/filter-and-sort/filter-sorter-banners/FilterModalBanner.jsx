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

        // Загружаем каждый фильтр из общего объекта
        const [type, setType] = useState(() => {
            const saved = getBannerFilters(storagePrefix);
            return saved.type || [];
        });
        const [newRerun, setNewRerun] = useState(() => {
            const saved = getBannerFilters(storagePrefix);
            return saved.newRerun || [];
        });
        const [availability, setAvailability] = useState(() => {
            const saved = getBannerFilters(storagePrefix);
            return saved.availability || [];
        });

        // Сохраняем при изменении любого фильтра
        useEffect(() => {
            const saved = getBannerFilters(storagePrefix);
            saveBannerFilters(storagePrefix, {
                ...saved,
                type,
                newRerun,
                availability,
            });
        }, [type, newRerun, availability, storagePrefix]);

        // Экспорт функции для внешнего вызова
        useImperativeHandle(ref, () => ({
            clearAll: () => {
                setType([]);
                setNewRerun([]);
                setAvailability([]);
                clearAllBannerFilters(storagePrefix);
                if (onClearFilters) {
                    onClearFilters();
                }
            },
        }));

        // --- Опции чекбоксов ---
        const optionsType = [
            { label: t("FilterModalBanner.standart"), value: "standart" },
            { label: t("FilterModalBanner.multi"), value: "multi" },
            { label: t("FilterModalBanner.myth"), value: "myth" },
            { label: t("FilterModalBanner.solo"), value: "solo" },
            { label: t("FilterModalBanner.birthday"), value: "birthday" },
            { label: t("FilterModalBanner.promise"), value: "promise" },
        ];

        const optionsNewRerun = [
            { label: t("FilterModalBanner.new"), value: "new" },
            { label: t("FilterModalBanner.rerun"), value: "rerun" },
        ];

        const optionsAvailability = [
            { label: t("FilterModalBanner.active"), value: "active" },
            { label: t("FilterModalBanner.inactive"), value: "inactive" },
        ];

        const handleClear = () => {
            setType([]);
            setNewRerun([]);
            setAvailability([]);
            clearAllBannerFilters(storagePrefix);
            if (onClearFilters) {
                onClearFilters();
            }
        };

        const handleOk = () => {
            onFilter({ type, newRerun, availability });
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

                <div style={{ marginBottom: 15 }}>
                    <span>{t("FilterModalBanner.newRerun")} </span>
                    <Checkbox.Group
                        options={optionsNewRerun}
                        value={newRerun}
                        onChange={setNewRerun}
                    />
                </div>

                <div style={{ marginBottom: 15 }}>
                    <span>{t("FilterModalBanner.availability")} </span>
                    <Checkbox.Group
                        options={optionsAvailability}
                        value={availability}
                        onChange={setAvailability}
                    />
                </div>

                <Button onClick={handleClear}>{t("FilterModalBanner.clear")}</Button>
            </Modal>
        );
    },
);

export default FilterModalBanner;