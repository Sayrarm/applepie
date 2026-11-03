import {useEffect, useState, forwardRef, useImperativeHandle} from "react";
import {Modal, Checkbox, Select, Tag, Button} from "antd";
import {
    getRarityFilter,
    saveRarityFilter,
    getPlacementFilter,
    savePlacementFilter,
    getTalentFilter,
    saveTalentFilter,
    getStellaFilter,
    saveStellaFilter,
    getAvailabilityFilter,
    saveAvailabilityFilter,
    getObtainFilter,
    saveObtainFilter,
    clearAllFilters,
    getFilterKeys,
    getEventStandardFilter,
    saveEventStandardFilter,
} from "@localstorage";
import {useTranslation} from "react-i18next";

const FilterModalMemory = forwardRef(
    ({open, onClose, onFilter, onClearFilters, storagePrefix = ""}, ref) => {
        const filterKeys = getFilterKeys(storagePrefix);
        const {t} = useTranslation();

        // Состояния для каждого фильтра с загрузкой из localStorage
        const [rarity, setRarity] = useState(() => getRarityFilter(storagePrefix));
        const [placement, setPlacement] = useState(() =>
            getPlacementFilter(storagePrefix),
        );
        const [talent, setTalent] = useState(() => getTalentFilter(storagePrefix));
        const [stella, setStella] = useState(() => getStellaFilter(storagePrefix));
        const [obtain, setObtain] = useState(() => getObtainFilter(storagePrefix));
        const [eventStandard, setEventStandard] = useState(() => getEventStandardFilter(storagePrefix));
        const [availability, setAvailability] = useState(() =>
            getAvailabilityFilter(storagePrefix),
        );

        // Сохраняем в localStorage при изменении
        useEffect(() => {
            saveRarityFilter(storagePrefix, rarity);
        }, [rarity, storagePrefix]);

        useEffect(() => {
            savePlacementFilter(storagePrefix, placement);
        }, [placement, storagePrefix]);

        useEffect(() => {
            saveTalentFilter(storagePrefix, talent);
        }, [talent, storagePrefix]);

        useEffect(() => {
            saveStellaFilter(storagePrefix, stella);
        }, [stella, storagePrefix]);

        useEffect(() => {
            saveAvailabilityFilter(storagePrefix, availability);
        }, [availability, storagePrefix]);

        useEffect(() => {
            saveObtainFilter(storagePrefix, obtain);
        }, [obtain, storagePrefix]);

        useEffect(() => {
            saveEventStandardFilter(storagePrefix, eventStandard);
        }, [eventStandard, storagePrefix]);

        // ЭКСПОРТИРУЕМ ФУНКЦИЮ ДЛЯ ВНЕШНЕГО ВЫЗОВА
        useImperativeHandle(ref, () => ({
            clearAll: () => {
                // Очищаем локальные состояния
                setRarity([]);
                setPlacement([]);
                setTalent([]);
                setStella([]);
                setAvailability([]);
                setObtain([]);
                setEventStandard([]);

                // Очищаем localStorage через сервис
                clearAllFilters(storagePrefix);

                // Вызываем функцию очистки из родителя
                if (onClearFilters) {
                    onClearFilters();
                }
            },
        }));

        const optionsRarity = [
            {label: "5-star", value: "5-star"},
            {label: "4-star", value: "4-star"},
            {label: "3-star", value: "3-star"},
        ];
        const optionsPlace = [
            {label: "Solar", value: "solar"},
            {label: "Lunar", value: "lunar"},
        ];
        const optionsTalent = [
            {label: "ATK", value: "atk"},
            {label: "DEF", value: "def"},
            {label: "HP", value: "hp"},
        ];

        const optionsStella = [
            {value: "emerald", label: "emerald", color: "#27650d"},
            {value: "sapphire", label: "sapphire", color: "#00b1ff"},
            {value: "violet", label: "violet", color: "#8141ff"},
            {value: "amber", label: "amber", color: "#ff8711"},
            {value: "ruby", label: "ruby", color: "#ff1111"},
            {value: "pearl", label: "pearl", color: "#ff11f3"},
        ];

        const optionsObtain = [
            {value: "xspace-echo", label: "Xspace Echo"},
            {value: "limited-banner", label: "Limited Banner"},
            {value: "wishing-well", label: "Wishing Well"},
            {value: "galaxy-explorer", label: "Galaxy Explorer"},
            {value: "promise", label: "Promise"},
            {value: "oracle-of-stars", label: "Oracle Of Stars"},
            {value: "fondess-treasure", label: "Fondess Treasure"},
            {value: "illusia-locus", label: "Illusia Locus"},
            {value: "birthday-event", label: "Birthday Event"},
        ];

        const optionsAvailability = [
            {label: t('FilterModalMemory.available'), value: "available"},
            {label: t('FilterModalMemory.notAvailable'), value: "notAvailable"},
        ];

        const optionsEventStandard = [
            {label: t('FilterModalMemory.event'), value: "event-memories"},
            {label: t('FilterModalMemory.standard'), value: "standard-memories"},
        ];

        const tagRender = (props) => {
            const {label, value, closable, onClose} = props;
            const option = optionsStella.find((opt) => opt.value === value);
            const tagColor = option?.color || "default";

            const onPreventMouseDown = (event) => {
                event.preventDefault();
                event.stopPropagation();
            };
            return (
                <Tag
                    color={tagColor}
                    onMouseDown={onPreventMouseDown}
                    closable={closable}
                    onClose={onClose}
                    style={{marginInlineEnd: 4}}
                >
                    {label}
                </Tag>
            );
        };

        // Обработчики изменений
        const handleRarityChange = (checkedValues) => {
            setRarity(checkedValues);
        };

        const handlePlacementChange = (checkedValues) => {
            setPlacement(checkedValues);
        };

        const handleTalentChange = (checkedValues) => {
            setTalent(checkedValues);
        };

        const handleAvailabilityChange = (checkedValues) => {
            setAvailability(checkedValues);
        };

        const handleEventStandardChange = (checkedValues) => {
            setEventStandard(checkedValues);
        };

        const handleClear = () => {
            // Очищаем локальные состояния
            setRarity([]);
            setPlacement([]);
            setTalent([]);
            setStella([]);
            setAvailability([]);
            setObtain([]);
            setEventStandard([]);

            // Очищаем localStorage через сервис
            clearAllFilters(storagePrefix);

            // Вызываем функцию очистки из родителя
            if (onClearFilters) {
                onClearFilters();
            }
        };

        const handleOk = () => {
            const filters = {
                rarity: rarity,
                placement: placement,
                talent: talent,
                stella: stella,
                availability: availability || [],
                obtain: obtain || [],
                eventStandard: eventStandard || [],
            };

            onFilter(filters);
            onClose();
        };

        return (
            <Modal
                title={t('FilterModalMemory.titleModal')}
                open={open}
                onOk={handleOk}
                onCancel={onClose}
                width={400}
            >
                <div style={{marginBottom: 15}}>
                    <span>{t('FilterModalMemory.rarity')} </span>
                    <Checkbox.Group
                        options={optionsRarity}
                        value={rarity}
                        onChange={handleRarityChange}
                    />
                </div>

                <div style={{marginBottom: 15}}>
                    <span>{t('FilterModalMemory.placement')} </span>
                    <Checkbox.Group
                        options={optionsPlace}
                        value={placement}
                        onChange={handlePlacementChange}
                    />
                </div>

                <div style={{marginBottom: 15}}>
                    <span>{t('FilterModalMemory.talent')} </span>
                    <Checkbox.Group
                        options={optionsTalent}
                        value={talent}
                        onChange={handleTalentChange}
                    />
                </div>

                <div style={{marginBottom: 15}}>
                    <span>{t('FilterModalMemory.availability')} </span>
                    <Checkbox.Group
                        options={optionsAvailability}
                        value={availability}
                        onChange={handleAvailabilityChange}
                    />
                </div>

                <div style={{marginBottom: 15}}>
                    <span>{t('FilterModalMemory.stella')} </span>
                    <Select
                        tagRender={tagRender}
                        mode="multiple"
                        value={stella}
                        onChange={setStella}
                        style={{width: "100%"}}
                        options={optionsStella}
                    />
                </div>
                ------------------------------------------------------

                <div style={{marginBottom: 15}}>
                    <span>{t('FilterModalMemory.obtain')} </span>
                    <Select
                        tagRender={tagRender}
                        mode="multiple"
                        value={obtain}
                        onChange={setObtain}
                        style={{width: "100%"}}
                        options={optionsObtain}
                    />
                </div>

                <div style={{marginBottom: 15}}>
                    <span>{t('FilterModalMemory.memory')} </span>
                    <Checkbox.Group
                        options={optionsEventStandard}
                        value={eventStandard}
                        onChange={handleEventStandardChange}
                    />
                </div>

                <Button onClick={handleClear}>{t('FilterModalMemory.clear')}</Button>
            </Modal>
        );
    },
);

export default FilterModalMemory;
