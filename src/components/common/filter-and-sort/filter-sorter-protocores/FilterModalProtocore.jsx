import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Checkbox, Select, Tag, Button } from 'antd';
import { protocoreTypes } from '@data';

// Функция для получения ключей с префиксом
const getStorageKeys = (prefix = '') => ({
    TYPES: prefix ? `${prefix}_protocore_filter_types` : 'protocore_filter_types',
    STELLACTRUM: prefix ? `${prefix}_protocore_filter_stellactrum` : 'protocore_filter_stellactrum',
    LEVELS: prefix ? `${prefix}_protocore_filter_levels` : 'protocore_filter_levels',
    MAIN_STATS: prefix ? `${prefix}_protocore_filter_mainStats` : 'protocore_filter_mainStats',
    SUB_STATS: prefix ? `${prefix}_protocore_filter_subStats` : 'protocore_filter_subStats',
    STATUS: prefix ? `${prefix}_protocore_filter_status` : 'protocore_filter_status'
});

const loadFromStorage = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        if (saved === null) return defaultValue;
        try {
            return JSON.parse(saved);
        } catch {
            return saved;
        }
    } catch (e) {
        console.error('Error loading from storage:', e);
        return defaultValue;
    }
};

const FilterModalProtocore = forwardRef(({
                                             open,
                                             onClose,
                                             onFilter,
                                             onClearFilters,
                                             storagePrefix = ''
                                         }, ref) => {
    const storageKeys = getStorageKeys(storagePrefix);

    const [types, setTypes] = useState(() => loadFromStorage(storageKeys.TYPES, []));
    const [stellactrum, setStellactrum] = useState(() => loadFromStorage(storageKeys.STELLACTRUM, []));
    const [levels, setLevels] = useState(() => loadFromStorage(storageKeys.LEVELS, []));
    const [mainStats, setMainStats] = useState(() => loadFromStorage(storageKeys.MAIN_STATS, []));
    const [subStats, setSubStats] = useState(() => loadFromStorage(storageKeys.SUB_STATS, []));
    const [status, setStatus] = useState(() => loadFromStorage(storageKeys.STATUS, []));

    useEffect(() => {
        localStorage.setItem(storageKeys.TYPES, JSON.stringify(types));
    }, [types, storageKeys.TYPES]);

    useEffect(() => {
        localStorage.setItem(storageKeys.STELLACTRUM, JSON.stringify(stellactrum));
    }, [stellactrum, storageKeys.STELLACTRUM]);

    useEffect(() => {
        localStorage.setItem(storageKeys.LEVELS, JSON.stringify(levels));
    }, [levels, storageKeys.LEVELS]);

    useEffect(() => {
        localStorage.setItem(storageKeys.MAIN_STATS, JSON.stringify(mainStats));
    }, [mainStats, storageKeys.MAIN_STATS]);

    useEffect(() => {
        localStorage.setItem(storageKeys.SUB_STATS, JSON.stringify(subStats));
    }, [subStats, storageKeys.SUB_STATS]);

    useEffect(() => {
        localStorage.setItem(storageKeys.STATUS, JSON.stringify(status));
    }, [status, storageKeys.STATUS]);

    useImperativeHandle(ref, () => ({
        clearAll: () => {
            setTypes([]);
            setStellactrum([]);
            setLevels([]);
            setMainStats([]);
            setStatus([]);
            setSubStats([]);

            Object.values(storageKeys).forEach(key => {
                localStorage.removeItem(key);
            });

            if (onClearFilters) {
                onClearFilters();
            }
        }
    }));

    const protocoreTypeKeys = Object.keys(protocoreTypes);

    const stellactrumColors = [
        { value: 'emerald', label: 'Emerald', color: '#27650d' },
        { value: 'sapphire', label: 'Sapphire', color: '#00b1ff' },
        { value: 'violet', label: 'Violet', color: '#8141ff' },
        { value: 'amber', label: 'Amber', color: '#ff8711' },
        { value: 'ruby', label: 'Ruby', color: '#ff1111' },
        { value: 'pearl', label: 'Pearl', color: '#ff11f3' },
    ];

    const levelOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const mainStatOptions = ['HP', 'ATK', 'DEF', 'ATK Bonus', 'HP Bonus', 'DEF Bonus', 'CRIT Rate', 'CRIT DMG', 'DMG Boost to Weakened', 'Oath Strength', 'Oath Recovery Boost', 'Expedited Energy Boost'];
    const subStatOptions = ['HP', 'ATK', 'DEF', 'ATK Bonus', 'HP Bonus', 'DEF Bonus', 'CRIT Rate', 'CRIT DMG', 'DMG Boost to Weakened', 'Oath Strength'];
    const statusOptions = [
        { label: 'Equipped', value: 'equipped' },
        { label: 'Free', value: 'free' },
    ];

    const tagRender = props => {
        const { label, value, closable, onClose } = props;
        const option = stellactrumColors.find(opt => opt.value === value);
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

    const handleOk = () => {
        const filters = {
            types: types,
            stellactrum: stellactrum,
            levels: levels,
            mainStats: mainStats,
            subStats: subStats,
            status: status || []
        };
        onFilter(filters);
        onClose();
    };

    const handleClear = () => {
        setTypes([]);
        setStellactrum([]);
        setLevels([]);
        setMainStats([]);
        setSubStats([]);
        setStatus([]);

        Object.values(storageKeys).forEach(key => {
            localStorage.removeItem(key);
        });

        if (onClearFilters) {
            onClearFilters();
        }
    };

    return (
        <Modal
            title="Filter MyProtocores"
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            width={450}
        >
            <div style={{ marginBottom: 15 }}>
                <span>Type: </span>
                <Checkbox.Group
                    options={protocoreTypeKeys.map(key => ({
                        label: protocoreTypes[key].name,
                        value: key
                    }))}
                    value={types}
                    onChange={setTypes}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Level: </span>
                <Checkbox.Group
                    options={levelOptions.map(l => ({
                        label: `Lv. ${l}`,
                        value: String(l)
                    }))}
                    value={levels}
                    onChange={setLevels}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Main Stat: </span>
                <Checkbox.Group
                    options={mainStatOptions.map(stat => ({ label: stat, value: stat }))}
                    value={mainStats}
                    onChange={setMainStats}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Sub Stat: </span>
                <Checkbox.Group
                    options={subStatOptions.map(stat => ({ label: stat, value: stat }))}
                    value={subStats}
                    onChange={setSubStats}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Status: </span>
                <Checkbox.Group
                    options={statusOptions}
                    value={status}
                    onChange={setStatus}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <span>Stella: </span>
                <Select
                    tagRender={tagRender}
                    mode="multiple"
                    value={stellactrum}
                    onChange={setStellactrum}
                    style={{ width: '100%' }}
                    placeholder="Select stellactrum colors"
                    options={stellactrumColors}
                />
            </div>

            <Button onClick={handleClear}>
                Clear
            </Button>
        </Modal>
    );
});

export default FilterModalProtocore;