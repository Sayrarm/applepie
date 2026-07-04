import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Checkbox, Select, Tag, Button } from 'antd';
import { protocoreTypes } from '../data/protocore-data';

const STORAGE_KEYS = {
    TYPES: 'protocore_filter_types',
    STELLACTRUM: 'protocore_filter_stellactrum',
    LEVELS: 'protocore_filter_levels',
    MAIN_STATS: 'protocore_filter_mainStats',
    SUB_STATS: 'protocore_filter_subStats'
};

const loadFromStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
};

const FilterModalProtocore = forwardRef(({ open, onClose, onFilter, onClearFilters }, ref) => {
    const [types, setTypes] = useState(() => loadFromStorage(STORAGE_KEYS.TYPES, []));
    const [stellactrum, setStellactrum] = useState(() => loadFromStorage(STORAGE_KEYS.STELLACTRUM, []));
    const [levels, setLevels] = useState(() => loadFromStorage(STORAGE_KEYS.LEVELS, []));
    const [mainStats, setMainStats] = useState(() => loadFromStorage(STORAGE_KEYS.MAIN_STATS, []));
    const [subStats, setSubStats] = useState(() => loadFromStorage(STORAGE_KEYS.SUB_STATS, []));

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.TYPES, JSON.stringify(types));
    }, [types]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.STELLACTRUM, JSON.stringify(stellactrum));
    }, [stellactrum]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.LEVELS, JSON.stringify(levels));
    }, [levels]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.MAIN_STATS, JSON.stringify(mainStats));
    }, [mainStats]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SUB_STATS, JSON.stringify(subStats));
    }, [subStats]);

    useImperativeHandle(ref, () => ({
        clearAll: () => {
            setTypes([]);
            setStellactrum([]);
            setLevels([]);
            setMainStats([]);
            setSubStats([]);

            localStorage.removeItem(STORAGE_KEYS.TYPES);
            localStorage.removeItem(STORAGE_KEYS.STELLACTRUM);
            localStorage.removeItem(STORAGE_KEYS.LEVELS);
            localStorage.removeItem(STORAGE_KEYS.MAIN_STATS);
            localStorage.removeItem(STORAGE_KEYS.SUB_STATS);

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
            subStats: subStats
        };
        onFilter(filters);
        onClose();
    };

    return (
        <Modal
            title="Filter Protocores"
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

            <Button onClick={() => {
                setTypes([]);
                setStellactrum([]);
                setLevels([]);
                setMainStats([]);
                setSubStats([]);
                if (onClearFilters) {
                    onClearFilters();
                }
            }}>
                Clear
            </Button>
        </Modal>
    );
});

export default FilterModalProtocore;