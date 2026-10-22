import { useState, useEffect } from "react";
import { Modal, Input, Select, Button } from "antd";

const CUSTOM_TYPES = [
    { label: "Solo", value: "solo" },
    { label: "Multi", value: "multi" },
    { label: "Birthday", value: "birthday" },
    { label: "Standart", value: "standart" },
    { label: "Myth", value: "myth" },
];

const CHARACTERS = ["Xavier", "Zayne", "Rafayel", "Sylus", "Caleb"];

function CustomBannerModal({ open, onClose, onSave }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("solo");
    const [character, setCharacter] = useState("");

    // Сбрасываем персонажа, если выбран тип, где он не нужен
    useEffect(() => {
        if (type === "multi" || type === "standart") {
            setCharacter("");
        }
    }, [type]);

    const showCharacterSelect = type === "solo" || type === "myth" || type === "birthday";

    const handleSave = () => {
        if (!name.trim()) {
            alert("Введите название баннера");
            return;
        }
        if (showCharacterSelect && !character) {
            alert("Выберите персонажа");
            return;
        }

        // Формируем картинку на основе выбранного персонажа (если он есть)
        const imageName = character ? character.toLowerCase() : "";
        const imagePath = character ? `../assets/icons/${imageName}_color.png` : "";

        const customBanner = {
            id: `custom-${Date.now()}`,
            name: name,
            type: type,
            customChar: character, // Сохраняем выбранного персонажа
            image: imagePath, // Автоматическая картинка
            cardIds: [],
            rerun: false,
            isCustom: true, // Флаг кастомного баннера
        };

        onSave(customBanner);

        // Сбрасываем форму
        setName("");
        setType("solo");
        setCharacter("");
        onClose();
    };

    return (
        <Modal
            title="Создать свой баннер"
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Сохранить
                </Button>,
            ]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "4px" }}>Название баннера</label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите название"
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "4px" }}>Тип</label>
                    <Select
                        style={{ width: "100%" }}
                        value={type}
                        onChange={setType}
                        options={CUSTOM_TYPES}
                    />
                </div>

                {/* Показываем выбор персонажа только для Solo / Myth / Birthday */}
                {showCharacterSelect && (
                    <div>
                        <label style={{ display: "block", marginBottom: "4px" }}>Персонаж</label>
                        <Select
                            style={{ width: "100%" }}
                            value={character}
                            onChange={setCharacter}
                            placeholder="Выберите персонажа"
                            options={CHARACTERS.map((char) => ({ label: char, value: char }))}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default CustomBannerModal;