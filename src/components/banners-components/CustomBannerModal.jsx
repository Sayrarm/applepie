import { useState, useEffect, useMemo } from "react";
import { Modal, Input, Select, Button } from "antd";
import { useTranslation } from "react-i18next";

const CHARACTERS = ["Xavier", "Zayne", "Rafayel", "Sylus", "Caleb"];

function CustomBannerModal({ open, onClose, onSave }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("solo");
    const [character, setCharacter] = useState("");
    const { t } = useTranslation();

    // Типы теперь зависят от перевода, поэтому создаем их внутри компонента
    const customTypes = useMemo(() => [
        { label: t('CustomBannerModal.types.solo'), value: "solo" },
        { label: t('CustomBannerModal.types.multi'), value: "multi" },
        { label: t('CustomBannerModal.types.birthday'), value: "birthday" },
        { label: t('CustomBannerModal.types.standart'), value: "standart" },
        { label: t('CustomBannerModal.types.myth'), value: "myth" },
    ], [t]);

    // Сбрасываем персонажа, если выбран тип, где он не нужен
    useEffect(() => {
        if (type === "multi" || type === "standart") {
            setCharacter("");
        }
    }, [type]);

    const showCharacterSelect = type === "solo" || type === "myth" || type === "birthday";

    const handleSave = () => {
        if (!name.trim()) {
            alert(t('CustomBannerModal.alertName'));
            return;
        }
        if (showCharacterSelect && !character) {
            alert(t('CustomBannerModal.alertChar'));
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
            title={t('CustomBannerModal.titleModalOwnBanner')}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    {t('CustomBannerModal.cancel')}
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    {t('CustomBannerModal.save')}
                </Button>,
            ]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "4px" }}>{t('CustomBannerModal.bannerName')}</label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('CustomBannerModal.enterName')}
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "4px" }}>{t('CustomBannerModal.type')}</label>
                    <Select
                        style={{ width: "100%" }}
                        value={type}
                        onChange={setType}
                        options={customTypes}
                    />
                </div>

                {/* Показываем выбор персонажа только для Solo / Myth / Birthday */}
                {showCharacterSelect && (
                    <div>
                        <label style={{ display: "block", marginBottom: "4px" }}>{t('CustomBannerModal.char')}</label>
                        <Select
                            style={{ width: "100%" }}
                            value={character}
                            onChange={setCharacter}
                            placeholder={t('CustomBannerModal.chooseChar')}
                            options={CHARACTERS.map((char) => ({ label: char, value: char }))}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default CustomBannerModal;