import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import styles from './CardProtocores.module.css';
import {
    ProtocoreBlock,
    ModalWindow,
    FilterSortBarProtocores,
    useProtocoreSearch,
    useProtocoreFilter,
    useProtocoreSort
} from '@components'
import {
    getProtocores,
    getCardProtocores,
    saveCardProtocores,
    getCardPlacement,
    getCardStella,
    getCardImageById,
    findCardForProtocore,
    getCompatibleProtocores,
    removeProtocoreFromAllCards,
} from '@localstorage';

function CardProtocores({ cardId }) {
    const protocoreModalRef = useRef();
    const filterModalRef = useRef();

    // Хуки для фильтрации и сортировки протокоров
    const { searchQuery, onSearch, clearSearch } = useProtocoreSearch('card');
    const { applyFilters, clearFilters, filterProtocores, isModalOpen, setIsModalOpen } = useProtocoreFilter('card');
    const { sortCriteria, handleSortChange, clearSorting, sortProtocores } = useProtocoreSort('card');

    // ===== СОСТОЯНИЯ =====
    const [allProtocores, setAllProtocores] = useState([]);
    const [selectedProtocores, setSelectedProtocores] = useState([]);

    // ===== ЗАГРУЗКА ДАННЫХ =====
    useEffect(() => {
        if (!cardId) return;

        // Загружаем все протокоры
        setAllProtocores(getProtocores());

        // Загружаем протокоры карточки
        setSelectedProtocores(getCardProtocores(cardId));
    }, [cardId]);

    // ===== СЛУШАЕМ ИЗМЕНЕНИЯ =====
    useEffect(() => {
        if (!cardId) return;

        const handleStorageChange = (e) => {
            if (e.key === 'protocores') {
                setAllProtocores(getProtocores());
            }
            if (e.key === `card_protocores_${cardId}`) {
                setSelectedProtocores(getCardProtocores(cardId));
            }
        };

        const handleProtocoresUpdated = (event) => {
            // Если событие пришло для этой карточки или глобальное
            if (!event.detail || event.detail.cardId === cardId) {
                setSelectedProtocores(getCardProtocores(cardId));
            }
            setAllProtocores(getProtocores());
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('protocoresUpdated', handleProtocoresUpdated);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('protocoresUpdated', handleProtocoresUpdated);
        };
    }, [cardId]);

    // ===== МЕМОИЗИРОВАННЫЕ ДАННЫЕ КАРТОЧКИ =====
    const cardPlacement = useMemo(() => getCardPlacement(cardId), [cardId]);
    const cardStella = useMemo(() => getCardStella(cardId), [cardId]);
    const currentCardImage = useMemo(() => getCardImageById(cardId), [cardId]);

    // ===== ФУНКЦИИ =====
    const showProtocoreModal = () => {
        protocoreModalRef.current.showModal();
    };

    // Сохранение протокоров карточки
    const saveProtocores = useCallback((protocores) => {
        if (!cardId) return;
        saveCardProtocores(cardId, protocores);

        window.dispatchEvent(new CustomEvent('protocoresUpdated', {
            detail: { cardId, protocores }
        }));
    }, [cardId]);

    // Проверка, можно ли добавить протокор
    const canAddProtocore = useCallback((protocore) => {
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

        // 4. Проверка: совместимость по стеллактуму
        if (cardStella && protocore.stellactrum !== cardStella) {
            alert(`This protocore has ${protocore.stellactrum} stellactrum, but the card requires ${cardStella}.`);
            return false;
        }

        return true;
    }, [selectedProtocores, cardPlacement, cardStella]);

    // Добавить протокор
    const handleAddProtocore = useCallback((protocoreId) => {
        const protocore = allProtocores.find(p => p.id === protocoreId);
        if (!protocore) return;

        if (!canAddProtocore(protocore)) return;

        // Сначала удаляем протокор со всех карточек (если он где-то есть)
        removeProtocoreFromAllCards(protocoreId);

        // Затем добавляем на текущую карточку
        const updatedProtocores = [...selectedProtocores, protocore];
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores);

        // Закрываем модалку после добавления
        protocoreModalRef.current?.closeModal?.();
    }, [allProtocores, canAddProtocore, selectedProtocores, saveProtocores]);

    // Удалить протокор
    const handleRemoveProtocore = useCallback((protocoreId) => {
        const updatedProtocores = selectedProtocores.filter(p => p.id !== protocoreId);
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores);
    }, [selectedProtocores, saveProtocores]);

    // ===== ФИЛЬТРАЦИЯ ДОСТУПНЫХ ПРОТОКОРОВ =====
    const availableProtocores = useMemo(() => {
        // 1. Фильтруем по совместимости с карточкой (placement + stellactrum)
        const compatible = getCompatibleProtocores(
            allProtocores,
            cardPlacement,
            cardStella,
            selectedProtocores
        );

        // 2. Применяем фильтры
        const filtered = filterProtocores(compatible);

        // 3. Применяем поиск
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            return sortProtocores(filtered.filter(protocore => {
                return protocore.type.toLowerCase().includes(searchLower) ||
                    protocore.mainStat.toLowerCase().includes(searchLower) ||
                    protocore.stellactrum.toLowerCase().includes(searchLower) ||
                    protocore.substats?.some(sub => sub.stat.toLowerCase().includes(searchLower));
            }));
        }

        // 4. Сортируем
        return sortProtocores(filtered);
    }, [allProtocores, cardPlacement, cardStella, selectedProtocores, filterProtocores, searchQuery, sortProtocores]);

    const resetAllSettings = () => {
        clearSearch();
        clearFilters();
        clearSorting();
    };

    const getLimitMessage = () => {
        if (selectedProtocores.length >= 2) {
            return 'Maximum 2 protocores equipped';
        }
        if (!cardPlacement) return 'Loading...';

        const placementLabel = cardPlacement.toUpperCase();
        const allowedTypes = cardPlacement === 'solar' ? 'Alpha, Beta' : 'Gamma, Delta';
        const stellaText = cardStella ? ` (${cardStella.charAt(0).toUpperCase() + cardStella.slice(1)})` : '';
        return `${placementLabel} allowed: ${allowedTypes}${stellaText}`;
    };

    if (!cardId) {
        return <div>Loading...</div>;
    }

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
                        onClick={showProtocoreModal}
                        disabled={allProtocores.length === 0 || selectedProtocores.length >= 2}
                    >
                        + Add Protocore
                    </button>
                </div>

                <ModalWindow
                    ref={protocoreModalRef}
                    title={'Choose MyProtocores'}
                    tag={
                        <div className={styles.modalInfo}>
                            <FilterSortBarProtocores
                                searchQuery={searchQuery}
                                onSearch={onSearch}
                                clearSearch={clearSearch}
                                sortCriteria={sortCriteria}
                                handleSortChange={handleSortChange}
                                clearSorting={clearSorting}
                                resetAllSettings={resetAllSettings}
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                applyFilters={applyFilters}
                                clearFilters={clearFilters}
                                storagePrefix="card"
                                filterModalRef={filterModalRef}
                            />

                            {availableProtocores.length === 0 && (
                                <div className={styles.noProtocores}>
                                    No protocores available
                                </div>
                            )}

                            <div className={styles.protocoreList}>
                                {availableProtocores.map(protocore => {
                                    // Находим карточку для этого протокора
                                    const cardImage = findCardForProtocore(protocore.id);

                                    return (
                                        <button
                                            key={protocore.id}
                                            className={styles.dropdownItem}
                                            onClick={() => handleAddProtocore(protocore.id)}
                                        >
                                            <ProtocoreBlock
                                                protocore={protocore}
                                                hideChange={true}
                                                hideDelete={true}
                                                cardImage={cardImage}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    }
                />
            </div>

            {selectedProtocores.length === 0 ? (
                <div className={styles.emptyState}>
                    No protocores equipped
                </div>
            ) : (
                <div className={styles.protocoreList}>
                    {selectedProtocores.map(protocore => {
                        // Для уже прикрепленных протокоров показываем картинку текущей карточки
                        return (
                            <div key={protocore.id} className={styles.protocoreWrapper}>
                                <ProtocoreBlock
                                    protocore={protocore}
                                    hideChange={true}
                                    onDelete={() => handleRemoveProtocore(protocore.id)}
                                    cardImage={currentCardImage}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CardProtocores;