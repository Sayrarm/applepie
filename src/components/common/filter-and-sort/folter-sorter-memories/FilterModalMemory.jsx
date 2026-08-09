import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Checkbox, Select, Tag, Button } from "antd";

// Функция для получения ключей с префиксом
const getStorageKeys = (prefix = '') => ({
    RARITY: prefix ? `${prefix}_filter_rarity` : 'filter_rarity',
    PLACEMENT: prefix ? `${prefix}_filter_placement` : 'filter_placement',
    TALENT: prefix ? `${prefix}_filter_talent` : 'filter_talent',
    STELLA: prefix ? `${prefix}_filter_stella` : 'filter_stella',
    AVAILABILITY: prefix ? `${prefix}_filter_availability` : 'filter_availability'
});

// Функции загрузки из localStorage
const loadFromStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
};

const FilterModalMemory = forwardRef(({
                                          open,
                                          onClose,
                                          onFilter,
                                          onClearFilters,
                                          storagePrefix = ''
                                      }, ref) => {
    const storageKeys = getStorageKeys(storagePrefix);

    // Состояния для каждого фильтра с загрузкой из localStorage
    const [rarity, setRarity] = useState(() => loadFromStorage(storageKeys.RARITY, []));
    const [placement, setPlacement] = useState(() => loadFromStorage(storageKeys.PLACEMENT, []));
    const [talent, setTalent] = useState(() => loadFromStorage(storageKeys.TALENT, []));
    const [stella, setStella] = useState(() => loadFromStorage(storageKeys.STELLA, []));
    const [availability, setAvailability] = useState(() => loadFromStorage(storageKeys.AVAILABILITY, []));

    // Сохраняем в localStorage при изменении
    useEffect(() => {
        localStorage.setItem(storageKeys.RARITY, JSON.stringify(rarity));
    }, [rarity, storageKeys.RARITY]);

    useEffect(() => {
        localStorage.setItem(storageKeys.PLACEMENT, JSON.stringify(placement));
    }, [placement, storageKeys.PLACEMENT]);

    useEffect(() => {
        localStorage.setItem(storageKeys.TALENT, JSON.stringify(talent));
    }, [talent, storageKeys.TALENT]);

    useEffect(() => {
        localStorage.setItem(storageKeys.STELLA, JSON.stringify(stella));
    }, [stella, storageKeys.STELLA]);

    useEffect(() => {
        localStorage.setItem(storageKeys.AVAILABILITY, JSON.stringify(availability));
    }, [availability, storageKeys.AVAILABILITY]);

    // ЭКСПОРТИРУЕМ ФУНКЦИЮ ДЛЯ ВНЕШНЕГО ВЫЗОВА
    useImperativeHandle(ref, () => ({
        clearAll: () => {
            // Очищаем локальные состояния
            setRarity([]);
            setPlacement([]);
            setTalent([]);
            setStella([]);
            setAvailability([]);

            // Очищаем localStorage
            Object.values(storageKeys).forEach(key => {
                localStorage.removeItem(key);
            });

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

        // Очищаем localStorage
        Object.values(storageKeys).forEach(key => {
            localStorage.removeItem(key);
        });

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