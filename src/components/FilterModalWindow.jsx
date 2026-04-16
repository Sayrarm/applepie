import { useState } from 'react';
import { Modal, Checkbox, Select, Tag } from "antd";

function FilterModalWindow({ open, onClose, onFilter }) {
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
        { value: 'emerald', label: 'emerald', color: '#3fff00' },
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
        console.log('Выбрано rarity:', checkedValues);
    };

    const handlePlacementChange = (checkedValues) => {
        setPlacement(checkedValues);
        console.log('Выбрано placement:', checkedValues);
    };

    const handleTalentChange = (checkedValues) => {
        setTalent(checkedValues);
        console.log('Выбрано talent:', checkedValues);
    };

    const handleOk = () => {
        // Собираем все выбранные фильтры в один объект
        const filters = {
            rarity: rarity,
            placement: placement,
            talent: talent,
            stella: stella,
        };

        console.log('Применяем фильтры:', filters);
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
            <div style={{ marginBottom: 16 }}>
                <span>Rarity: </span>
                <Checkbox.Group
                    options={optionsRarity}
                    value={rarity}           // ← текущее состояние
                    onChange={handleRarityChange}  // ← обновляем состояние
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <span>Placement: </span>
                <Checkbox.Group
                    options={optionsPlace}
                    value={placement}
                    onChange={handlePlacementChange}
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <span>Talent: </span>
                <Checkbox.Group
                    options={optionsTalent}
                    value={talent}
                    onChange={handleTalentChange}
                />
            </div>

            <div style={{ marginBottom: 16 }}>
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
        </Modal>
    );
}

export default FilterModalWindow;