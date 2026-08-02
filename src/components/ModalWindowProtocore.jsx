import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Button, Modal, Select, InputNumber, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { protocoreTypes } from '../data/protocore-data';
import { memoriesData } from '../data/memories-data';

const ModalWindowProtocore = forwardRef((props, ref) => {
    const {
        title = "Title",
        tag = null,
        onSave = () => {},
        onUpdate = () => {},
    } = props;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [editingProtocore, setEditingProtocore] = useState(null);

    const formRef = useRef(null);

    const protocoreTypeKeys = Object.keys(protocoreTypes);
    const stellactrumColors = ['emerald', 'amber', 'violet', 'pearl', 'sapphire', 'ruby'];

    const getAvailableMainStatsForType = (typeKey) => {
        if (!typeKey) return [];
        const typeData = protocoreTypes[typeKey];
        if (!typeData) return [];
        return typeData.mainStats.map((stat) => stat.name);
    };

    const substats = [
        { label: 'HP', type: 'flat' },
        { label: 'ATK', type: 'flat' },
        { label: 'DEF', type: 'flat' },
        { label: 'ATK Bonus', type: 'percent' },
        { label: 'HP Bonus', type: 'percent' },
        { label: 'DEF Bonus', type: 'percent' },
        { label: 'CRIT Rate', type: 'percent' },
        { label: 'CRIT DMG', type: 'percent' },
        { label: 'DMG Boost to Weakened', type: 'percent' },
        { label: 'Oath Strength', type: 'percent' },
    ];

    const getStellactrumColor = (color) => {
        const colors = {
            emerald: '#50c878',
            amber: '#ffbf00',
            violet: '#8b00ff',
            pearl: '#e379ff',
            sapphire: '#5193fd',
            ruby: '#8e1111'
        };
        return colors[color] || '#ffffff';
    };

    const getMainStatValue = (typeKey, level, statName) => {
        if (!typeKey || !statName || level === undefined) return null;
        const typeData = protocoreTypes[typeKey];
        if (!typeData) return null;
        const statData = typeData.mainStats.find((stat) => stat.name === statName);
        if (!statData) return null;
        return statData.values[level] || null;
    };

    const getForm = () => {
        return formRef.current;
    };

    // НОВАЯ ФУНКЦИЯ: Обновление протокора во всех карточках
    const updateProtocoreInAllCards = (updatedProtocore) => {
        // Проходим по всем карточкам
        for (const card of memoriesData) {
            const key = `card_protocores_${card.id}`;
            const cardProtocores = JSON.parse(localStorage.getItem(key) || '[]');

            // Проверяем, есть ли этот протокор в карточке
            const index = cardProtocores.findIndex(p => p.id === updatedProtocore.id);
            if (index !== -1) {
                // Обновляем данные протокора в карточке
                cardProtocores[index] = {
                    ...updatedProtocore
                };
                localStorage.setItem(key, JSON.stringify(cardProtocores));

                // Отправляем событие для этой карточки
                window.dispatchEvent(new CustomEvent('protocoresUpdated', {
                    detail: {
                        cardId: card.id,
                        protocores: cardProtocores
                    }
                }));
            }
        }
    };

    useImperativeHandle(ref, () => ({
        showModal: (protocore = null) => {
            setOpen(true);
            setEditingProtocore(protocore);

            setTimeout(() => {
                const form = getForm();
                if (!form) return;

                if (protocore) {
                    setSelectedType(protocore.type);
                    form.setFieldsValue({
                        type: protocore.type,
                        stellactrum: protocore.stellactrum,
                        level: protocore.level,
                        mainStat: protocore.mainStat,
                        mainStatValue: protocore.mainStatValue,
                        substats: protocore.substats.map((s) => ({
                            stat: s.stat,
                            value: s.value
                        }))
                    });
                } else {
                    setSelectedType(null);
                    form.resetFields();
                    form.setFieldsValue({
                        substats: [{ stat: null, value: null }]
                    });
                }
            }, 0);
        }
    }));

    const updateMainStatValue = () => {
        const form = getForm();
        if (!form) return;
        const type = form.getFieldValue('type');
        const level = form.getFieldValue('level');
        const mainStat = form.getFieldValue('mainStat');
        if (type && level !== undefined && mainStat) {
            const value = getMainStatValue(type, level, mainStat);
            if (value !== null) {
                form.setFieldsValue({ mainStatValue: value });
            }
        }
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
        const form = getForm();
        if (!form) return;
        if (!type) {
            form.setFieldsValue({ mainStat: undefined, mainStatValue: undefined });
            return;
        }
        const availableStats = getAvailableMainStatsForType(type);
        if (availableStats.length > 0) {
            if (availableStats.length === 1) {
                const mainStat = availableStats[0];
                const level = form.getFieldValue('level');
                form.setFieldsValue({ mainStat: mainStat });
                if (level !== undefined && level !== null) {
                    const value = getMainStatValue(type, level, mainStat);
                    if (value !== null) {
                        form.setFieldsValue({ mainStatValue: value });
                    }
                }
            } else {
                form.setFieldsValue({ mainStat: undefined, mainStatValue: undefined });
            }
        }
    };

    const handleOk = async () => {
        try {
            setLoading(true);
            const form = getForm();
            if (!form) {
                console.error('Form not available');
                setLoading(false);
                return;
            }

            const values = await form.validateFields();

            const substatsWithValues = values.substats
                .filter((item) => item.stat !== null && item.stat !== undefined && item.stat !== '')
                .map((item) => {
                    const statInfo = substats.find((s) => s.label === item.stat);
                    return {
                        stat: item.stat,
                        value: item.value,
                        type: statInfo?.type || 'flat'
                    };
                });

            const protocoreData = {
                id: editingProtocore ? editingProtocore.id : Date.now(),
                type: values.type,
                stellactrum: values.stellactrum,
                level: values.level,
                mainStat: values.mainStat,
                mainStatValue: values.mainStatValue,
                substats: substatsWithValues,
                createdAt: editingProtocore ? editingProtocore.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (editingProtocore) {
                // Обновление существующего протокора
                const existingProtocores = JSON.parse(localStorage.getItem('protocores') || '[]');
                const index = existingProtocores.findIndex((p) => p.id === editingProtocore.id);
                if (index !== -1) {
                    existingProtocores[index] = protocoreData;
                    localStorage.setItem('protocores', JSON.stringify(existingProtocores));
                }
                onUpdate(protocoreData);

                // НОВОЕ: Обновляем протокор во всех карточках
                updateProtocoreInAllCards(protocoreData);

            } else {
                // Создание нового протокора
                const existingProtocores = JSON.parse(localStorage.getItem('protocores') || '[]');
                existingProtocores.push(protocoreData);
                localStorage.setItem('protocores', JSON.stringify(existingProtocores));
                onSave(protocoreData);
            }

            // Отправляем глобальное событие
            window.dispatchEvent(new CustomEvent('protocoresUpdated'));

            setOpen(false);
            form.resetFields();
            setSelectedType(null);
            setEditingProtocore(null);
        } catch (error) {
            console.error('Validation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
        const form = getForm();
        if (form) {
            form.resetFields();
        }
        setSelectedType(null);
        setEditingProtocore(null);
    };

    const availableMainStats = selectedType ? getAvailableMainStatsForType(selectedType) : [];
    const currentMainStat = (() => {
        const form = getForm();
        return form ? form.getFieldValue('mainStat') : null;
    })();

    const typeOptions = protocoreTypeKeys.map((key) => ({
        label: protocoreTypes[key].name,
        value: key
    }));

    const stellactrumOptions = stellactrumColors.map((color) => ({
        label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: getStellactrumColor(color),
                    border: '1px solid #d9d9d9'
                }} />
                {color.charAt(0).toUpperCase() + color.slice(1)}
            </span>
        ),
        value: color
    }));

    const mainStatOptions = availableMainStats.map((stat) => ({
        label: stat,
        value: stat
    }));

    const substatOptions = substats.map(({ label, type }) => ({
        label: `${label} ${type === 'flat' ? '(Flat)' : '(%)'}`,
        value: label
    }));

    return (
        <Modal
            open={open}
            title={editingProtocore ? `Edit ${editingProtocore.type.charAt(0).toUpperCase() + editingProtocore.type.slice(1)} Protocore` : title}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
            width={412}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" loading={loading} onClick={handleOk}>
                    {editingProtocore ? 'Update' : 'Save'}
                </Button>
            ]}
        >
            {tag && <div style={{ marginBottom: '20px', textAlign: 'center' }}>{tag}</div>}

            <Form
                ref={formRef}
                layout="vertical"
                initialValues={{
                    level: 0,
                    substats: [{ stat: null, value: null }]
                }}
                onValuesChange={(changedValues) => {
                    if (changedValues.type !== undefined) {
                        handleTypeChange(changedValues.type);
                    }
                    if (changedValues.level !== undefined && selectedType) {
                        updateMainStatValue();
                    }
                    if (changedValues.mainStat !== undefined && selectedType) {
                        updateMainStatValue();
                    }
                }}
            >
                <Form.Item
                    name="type"
                    label="Protocore Type"
                    rules={[{ required: true, message: 'Please select protocore type!' }]}
                >
                    <Select
                        placeholder="Select protocore type"
                        options={typeOptions}
                        onChange={(value) => {
                            const form = getForm();
                            if (form) {
                                form.setFieldsValue({ type: value });
                            }
                            handleTypeChange(value);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="stellactrum"
                    label="Protocore Stellactrum (Color)"
                    rules={[{ required: true, message: 'Please select stellactrum color!' }]}
                >
                    <Select
                        placeholder="Select stellactrum color"
                        options={stellactrumOptions}
                    />
                </Form.Item>

                <Form.Item
                    name="level"
                    label="Protocore Level"
                    rules={[
                        { required: true, message: 'Please select level!' },
                        { type: 'number', min: 0, max: 15, message: 'Level must be between 0 and 15!' }
                    ]}
                >
                    <InputNumber
                        min={0}
                        max={15}
                        style={{ width: '100%' }}
                        placeholder="Enter level (0-15)"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                </Form.Item>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                        name="mainStat"
                        label="Main Stat"
                        rules={[
                            { required: true, message: 'Please select main stat!' },
                            {
                                validator: (_, value) => {
                                    const form = getForm();
                                    if (!form) return Promise.resolve();
                                    const type = form.getFieldValue('type');
                                    if (!type) {
                                        return Promise.reject(new Error('Please select protocore type first!'));
                                    }
                                    const availableStats = getAvailableMainStatsForType(type);
                                    if (!availableStats.includes(value)) {
                                        return Promise.reject(new Error(`This stat is not available for ${protocoreTypes[type]?.name || type}`));
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                        style={{ flex: 1 }}
                    >
                        <Select
                            placeholder={selectedType ? "Select main stat" : "Select protocore type first"}
                            disabled={!selectedType}
                            value={currentMainStat}
                            options={mainStatOptions}
                            onChange={(value) => {
                                const form = getForm();
                                if (form) {
                                    form.setFieldsValue({ mainStat: value });
                                }
                                updateMainStatValue();
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="mainStatValue"
                        label="Main Stat Value"
                        rules={[{ required: true, message: 'Please enter main stat value!' }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Auto-filled from data"
                            disabled
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    </Form.Item>
                </div>

                <Form.Item label="Substats (1-4)">
                    <Form.List name="substats">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            name={[field.name, 'stat']}
                                            rules={[
                                                { required: true, message: 'Please select substat!' }
                                            ]}
                                            style={{ flex: 1, marginBottom: 0 }}
                                        >
                                            <Select
                                                placeholder={`Substat ${index + 1}`}
                                                style={{ width: '230px' }}
                                                options={substatOptions}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name={[field.name, 'value']}
                                            rules={[
                                                { required: true, message: 'Please enter value!' }
                                            ]}
                                            style={{ marginBottom: 0 }}
                                        >
                                            <InputNumber
                                                placeholder="Value"
                                                style={{ width: '100px' }}
                                                min={0}
                                                step={0.1}
                                                inputMode="decimal"
                                                pattern="[0-9.]*"
                                            />
                                        </Form.Item>

                                        {fields.length > 1 && (
                                            <MinusCircleOutlined
                                                onClick={() => remove(field.name)}
                                                style={{ color: '#8e1111' }}
                                            />
                                        )}
                                    </Space>
                                ))}
                                {fields.length < 4 && (
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add({ stat: null, value: null })}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Add Substat
                                        </Button>
                                    </Form.Item>
                                )}
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default ModalWindowProtocore;