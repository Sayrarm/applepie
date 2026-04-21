import { useState } from 'react';
import {Modal, Checkbox, Select, Tag, Button} from "antd";



function FilterModalWindow({ open, onClose, onFilter, onClearFilters }) {
    // Состояния для каждого фильтра
    const [rarity, setRarity] = useState([]);
    const [placement, setPlacement] = useState([]);
    const [talent, setTalent] = useState([]);
    const [stella, setStella] = useState([]);


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
        { value: 'pearl', label: 'pearl', color: '#ff11f3'  },
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

    const handleClear = () => {
        // Очищаем локальные состояния
        setRarity([]);
        setPlacement([]);
        setTalent([]);
        setStella([]);

        // Вызываем функцию очистки из родителя
        if (onClearFilters) {
            onClearFilters();
        }
    };

    const handleOk = () => {
        // Собираем все выбранные фильтры в один объект
        const filters = {
            rarity: rarity,
            placement: placement,
            talent: talent,
            stella: stella,
        };

        onFilter(filters); // отправляем родителю
        onClose(); // закрываем модалку
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

            <Button onClick={() => handleClear()}>
            Clear
            </Button>
        </Modal>
    );
}

export default FilterModalWindow;