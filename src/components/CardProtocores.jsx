import React, {useState, useMemo} from 'react';
import styles from './CardProtocores.module.css';
import ProtocoreBlock from './ProtocoreBlock.jsx';
import { memoriesData } from '../data/memories-data.js';

function CardProtocores({ cardId }) {
    // Ленивая инициализация — загружаем данные сразу при создании состояния
    const [allProtocores, setAllProtocores] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('protocores') || '[]');
        return saved;
    });

    const [selectedProtocores, setSelectedProtocores] = useState(() => {
        if (!cardId) return [];
        const saved = JSON.parse(localStorage.getItem(`card_protocores_${cardId}`) || '[]');
        return saved;
    });

    const [showDropdown, setShowDropdown] = useState(false);

    // Используем useMemo для placement
    const cardPlacement = useMemo(() => {
        if (!cardId) return null;
        const card = memoriesData.find(c => String(c.id) === cardId);
        return card ? card.placementName : null;
    }, [cardId]);

    // Функция для сохранения в localStorage
    const saveProtocores = (protocores) => {
        if (!cardId) return;
        localStorage.setItem(`card_protocores_${cardId}`, JSON.stringify(protocores));
        window.dispatchEvent(new CustomEvent('protocoresUpdated', {
            detail: { cardId, protocores }
        }));
    };

    // Проверка, можно ли добавить протокор
    const canAddProtocore = (protocore) => {
        // 1. Проверка: максимум 2 протокора
        if (selectedProtocores.length >= 2) {
            alert('Maximum 2 protocores per card');
            return false;
        }

        // 2. Проверка: уже добавлен
        if (selectedProtocores.some(p => p.id === protocore.id)) {
            alert('This protocore is already attached to this card');
            return false;
        }

        // 3. Проверка: совместимость с placement
        if (!cardPlacement) {
            alert('Card placement not found');
            return false;
        }

        const isSolar = cardPlacement === 'solar';
        const isLunar = cardPlacement === 'lunar';

        // Alpha и Beta — только для Solar
        if ((protocore.type === 'alpha' || protocore.type === 'beta') && isLunar) {
            alert(`Alpha and Beta protocores can only be equipped on SOLAR cards. This card is ${cardPlacement.toUpperCase()}.`);
            return false;
        }

        // Gamma и Delta — только для Lunar
        if ((protocore.type === 'gamma' || protocore.type === 'delta') && isSolar) {
            alert(`Gamma and Delta protocores can only be equipped on LUNAR cards. This card is ${cardPlacement.toUpperCase()}.`);
            return false;
        }

        return true;
    };

    // Добавить протокор
    const handleAddProtocore = (protocoreId) => {
        const protocore = allProtocores.find(p => p.id === protocoreId);
        if (!protocore) return;

        if (!canAddProtocore(protocore)) return;

        const updatedProtocores = [...selectedProtocores, protocore];
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores);
        setShowDropdown(false);
    };

    // Удалить протокор
    const handleRemoveProtocore = (protocoreId) => {
        const updatedProtocores = selectedProtocores.filter(p => p.id !== protocoreId);
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores);
    };

    // Фильтруем доступные протокоры через useMemo
    const availableProtocores = useMemo(() => {
        return allProtocores.filter(p => {
            // Уже добавленные — не показываем
            if (selectedProtocores.some(sp => sp.id === p.id)) return false;

            // Если уже 2 протокора — не показываем ничего
            if (selectedProtocores.length >= 2) return false;

            // Проверка совместимости с placement
            if (!cardPlacement) return false;

            const isSolar = cardPlacement === 'solar';
            const isLunar = cardPlacement === 'lunar';

            if (isSolar) {
                // Для Solar: только alpha и beta
                return p.type === 'alpha' || p.type === 'beta';
            } else if (isLunar) {
                // Для Lunar: только gamma и delta
                return p.type === 'gamma' || p.type === 'delta';
            }
            return false;
        });
    }, [allProtocores, selectedProtocores, cardPlacement]);

    // Получаем сообщение о лимите
    const getLimitMessage = () => {
        if (selectedProtocores.length >= 2) {
            return 'Maximum 2 protocores equipped';
        }
        if (!cardPlacement) return 'Loading...';

        const placementLabel = cardPlacement.toUpperCase();
        const allowedTypes = cardPlacement === 'solar' ? 'Alpha, Beta' : 'Gamma, Delta';
        return `${placementLabel} card — allowed: ${allowedTypes}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h4 className={styles.title}>Equipped Protocores</h4>
                    <div className={styles.placementInfo}>
                        {getLimitMessage()}
                    </div>
                </div>


                <div className={styles.headerActions}>
                    <span className={styles.limitInfo}>
                        {selectedProtocores.length}/2
                    </span>
                    <button
                        className={styles.addButton}
                        onClick={() => setShowDropdown(!showDropdown)}
                        disabled={availableProtocores.length === 0 || selectedProtocores.length >= 2}
                    >
                        + Add Protocore
                    </button>

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
                </div>
            </div>

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