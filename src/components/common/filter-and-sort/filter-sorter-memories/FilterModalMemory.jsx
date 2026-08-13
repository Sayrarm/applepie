import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Checkbox, Select, Tag, Button } from "antd";
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
    clearAllFilters,
    getFilterKeys,
} from '@localstorage';

const FilterModalMemory = forwardRef(({
                                          open,
                                          onClose,
                                          onFilter,
                                          onClearFilters,
                                          storagePrefix = ''
                                      }, ref) => {
    const filterKeys = getFilterKeys(storagePrefix);

    // Состояния для каждого фильтра с загрузкой из localStorage
    const [rarity, setRarity] = useState(() => getRarityFilter(storagePrefix));
    const [placement, setPlacement] = useState(() => getPlacementFilter(storagePrefix));
    const [talent, setTalent] = useState(() => getTalentFilter(storagePrefix));
    const [stella, setStella] = useState(() => getStellaFilter(storagePrefix));
    const [availability, setAvailability] = useState(() => getAvailabilityFilter(storagePrefix));

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

    // ЭКСПОРТИРУЕМ ФУНКЦИЮ ДЛЯ ВНЕШНЕГО ВЫЗОВА
    useImperativeHandle(ref, () => ({
        clearAll: () => {
            // Очищаем локальные состояния
            setRarity([]);
            setPlacement([]);
            setTalent([]);
            setStella([]);
            setAvailability([]);

            // Очищаем localStorage через сервис
            clearAllFilters(storagePrefix);

            // Вызываем функцию очистки из родителя
            if (onClearFilters) {
                onClearFilters();
            }
        }
    }));

    const optionsRarity = [
        { label: '5-star', value: '5-star' },
        { label: '4-star', value: '4-star' },
        { label: '3-star', value: '3-star' },
    ];
    const optionsPlace = [
        { label: 'Solar', value: 'solar' },
        { label: 'Lunar', value: 'lunar' },
    ];
    const optionsTalent = [
        { label: 'ATK', value: 'atk' },
        { label: 'DEF', value: 'def' },
        { label: 'HP', value: 'hp' },
    ];

    const optionsStella = [
        { value: 'emerald', label: 'emerald', color: '#27650d' },
        { value: 'sapphire', label: 'sapphire', color: '#00b1ff' },
        { value: 'violet', label: 'violet', color: '#8141ff' },
        { value: 'amber', label: 'amber', color: '#ff8711' },
        { value: 'ruby', label: 'ruby', color: '#ff1111' },
        { value: 'pearl', label: 'pearl', color: '#ff11f3' },
    ];

    const optionsAvailability = [
        { label: 'Available', value: 'available' },
        { label: 'Not Available', value: 'notAvailable' },
    ];

    const tagRender = props => {
        const { label, value, closable, onClose } = props;
        const option = optionsStella.find(opt => opt.value === value);
        const tagColor = option?.color || 'default';

        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={tagColor}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginInlineEnd: 4 }}
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

    const handleClear = () => {
        // Очищаем локальные состояния
        setRarity([]);
        setPlacement([]);
        setTalent([]);
        setStella([]);
        setAvailability([]);

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
        };

        onFilter(filters);
        onClose();
    };

    return (
        <Modal
            title="Filter"
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            width={400}
        >
            <div style={{ marginBottom: 15 }}>
                <span>Rarity: </span>
                <Checkbox.Group
                    options={optionsRarity}
                    value={rarity}
                    onChange={handleRarityChange}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Placement: </span>
                <Checkbox.Group
                    options={optionsPlace}
                    value={placement}
                    onChange={handlePlacementChange}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Talent: </span>
                <Checkbox.Group
                    options={optionsTalent}
                    value={talent}
                    onChange={handleTalentChange}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Availability: </span>
                <Checkbox.Group
                    options={optionsAvailability}
                    value={availability}
                    onChange={handleAvailabilityChange}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Stella: </span>
                <Select
                    tagRender={tagRender}
                    mode="multiple"
                    value={stella}
                    onChange={setStella}
                    style={{ width: '100%' }}
                    options={optionsStella}
                />
            </div>

            <Button onClick={handleClear}>
                Clear
            </Button>
        </Modal>
    );
});

export default FilterModalMemory;