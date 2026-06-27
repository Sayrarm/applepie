import React, { useState, useEffect } from 'react';
import styles from './CardProtocores.module.css';
import ProtocoreBlock from './ProtocoreBlock.jsx';

function CardProtocores({ cardId }) {
    const [selectedProtocores, setSelectedProtocores] = useState([]);
    const [allProtocores, setAllProtocores] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Загружаем все протокоры из localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('protocores') || '[]');
        setAllProtocores(saved);
    }, []);

    // Загружаем прикреплённые протокоры для этой карточки
    useEffect(() => {
        if (!cardId) return;
        const saved = JSON.parse(localStorage.getItem(`card_protocores_${cardId}`) || '[]');
        setSelectedProtocores(saved);
    }, [cardId]);

    // ✅ Функция для сохранения в localStorage
    const saveProtocores = (protocores) => {
        if (!cardId) return;
        localStorage.setItem(`card_protocores_${cardId}`, JSON.stringify(protocores));
        // ✅ Отправляем событие для синхронизации
        window.dispatchEvent(new CustomEvent('protocoresUpdated', {
            detail: { cardId, protocores }
        }));
    };

    // Добавить протокор
    const handleAddProtocore = (protocoreId) => {
        const protocore = allProtocores.find(p => p.id === protocoreId);
        if (!protocore) return;

        if (selectedProtocores.some(p => p.id === protocoreId)) {
            alert('This protocore is already attached to this card');
            return;
        }

        const updatedProtocores = [...selectedProtocores, protocore];
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores); // ✅ СРАЗУ СОХРАНЯЕМ
        setShowDropdown(false);
    };

    // Удалить протокор
    const handleRemoveProtocore = (protocoreId) => {
        const updatedProtocores = selectedProtocores.filter(p => p.id !== protocoreId);
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores); // ✅ СРАЗУ СОХРАНЯЕМ
    };

    // Доступные протокоры (которые ещё не прикреплены)
    const availableProtocores = allProtocores.filter(
        p => !selectedProtocores.some(sp => sp.id === p.id)
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={styles.title}>Equipped Protocores</h4>
                <button
                    className={styles.addButton}
                    onClick={() => setShowDropdown(!showDropdown)}
                    disabled={availableProtocores.length === 0}
                >
                    + Add Protocore
                </button>
            </div>

            {showDropdown && availableProtocores.length > 0 && (
                <div className={styles.dropdown}>
                    {availableProtocores.map(protocore => (
                        <button
                            key={protocore.id}
                            className={styles.dropdownItem}
                            onClick={() => handleAddProtocore(protocore.id)}
                        >
                            {protocore.type.charAt(0).toUpperCase() + protocore.type.slice(1)} (Lv.{protocore.level})
                        </button>
                    ))}
                </div>
            )}

            {selectedProtocores.length === 0 ? (
                <div className={styles.emptyState}>
                    No protocores equipped
                </div>
            ) : (
                <div className={styles.protocoreList}>
                    {selectedProtocores.map(protocore => (
                        <div key={protocore.id} className={styles.protocoreWrapper}>
                            <ProtocoreBlock
                                protocore={protocore}
                                onEdit={() => {}}
                                onDelete={() => handleRemoveProtocore(protocore.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardProtocores;