import React, {useCallback, useMemo, useRef, useState} from 'react';
import styles from './CardProtocores.module.css';
import ProtocoreBlock from './ProtocoreBlock.jsx';
import {memoriesData} from '../data/memories-data.js';
import ModalWindow from "./ModalWindow.jsx";
import FilterSortBarProtocore from "./FilterSortBarProtocores.jsx";
import { useProtocoreSearch } from '../hooks/useProtocoreSearch';
import { useProtocoreFilter } from '../hooks/useProtocoreFilter';
import { useProtocoreSort } from '../hooks/useProtocoreSort';

function CardProtocores({cardId}) {
    const protocoreModalRef = useRef();

    // Хуки для фильтрации и сортировки протокоров
    const { searchQuery, onSearch, clearSearch } = useProtocoreSearch();
    const { applyFilters, clearFilters, filterProtocores, isModalOpen, setIsModalOpen } = useProtocoreFilter();
    const { sortCriteria, handleSortChange, clearSorting, sortProtocores } = useProtocoreSort();

    // Загружаем все протокоры
    const [allProtocores] = useState(() => {
        return JSON.parse(localStorage.getItem('protocores') || '[]');
    });

    const [selectedProtocores, setSelectedProtocores] = useState(() => {
        if (!cardId) return [];
        return JSON.parse(localStorage.getItem(`card_protocores_${cardId}`) || '[]');
    });

    // Используем useMemo для placement
    const cardPlacement = useMemo(() => {
        if (!cardId) return null;
        const card = memoriesData.find(c => String(c.id) === cardId);
        return card ? card.placementName : null;
    }, [cardId]);

    // Картинка текущей карточки
    const currentCardImage = useMemo(() => {
        if (!cardId) return null;
        const card = memoriesData.find(c => String(c.id) === cardId);
        return card ? card.imageSmall : null;
    }, [cardId]);

    // Функция для поиска карточки, к которой прикреплен протокор
    const findCardForProtocore = useCallback((protocoreId) => {
        // Проходим по всем карточкам в memoriesData
        for (const card of memoriesData) {
            const cardProtocores = JSON.parse(localStorage.getItem(`card_protocores_${card.id}`) || '[]');
            if (cardProtocores.some(p => p.id === protocoreId)) {
                return card.imageSmall;
            }
        }
        return null;
    }, []);

    // Функция для сохранения в localStorage
    const saveProtocores = (protocores) => {
        if (!cardId) return;
        localStorage.setItem(`card_protocores_${cardId}`, JSON.stringify(protocores));
        window.dispatchEvent(new CustomEvent('protocoresUpdated', {
            detail: {cardId, protocores}
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

        // Закрываем модалку после добавления
        protocoreModalRef.current?.closeModal?.();
    };

    // Удалить протокор
    const handleRemoveProtocore = (protocoreId) => {
        const updatedProtocores = selectedProtocores.filter(p => p.id !== protocoreId);
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores);
    };

    // Используем useCallback для стабильности функций, Фильтруем и сортируем доступные протокоры
    const filterCompatible = useCallback((protocores) => {
        return protocores.filter(p => {
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
    }, [selectedProtocores, cardPlacement]);

    const filterBySearch = useCallback((protocores) => {
        if (!searchQuery) return protocores;
        const searchLower = searchQuery.toLowerCase();
        return protocores.filter(protocore => {
            return protocore.type.toLowerCase().includes(searchLower) ||
                protocore.mainStat.toLowerCase().includes(searchLower) ||
                protocore.stellactrum.toLowerCase().includes(searchLower) ||
                protocore.substats?.some(sub => sub.stat.toLowerCase().includes(searchLower));
        });
    }, [searchQuery]);

    // ✅ Используем useMemo без filterProtocores и sortProtocores в зависимостях
    const availableProtocores = useMemo(() => {
        // 1. Фильтруем по совместимости с карточкой
        const compatible = filterCompatible(allProtocores);

        // 2. Применяем фильтры (используем filterProtocores напрямую)
        const filtered = filterProtocores(compatible);

        // 3. Применяем поиск
        const searched = filterBySearch(filtered);

        // 4. Сортируем
        return sortProtocores(searched);
    }, [allProtocores, filterCompatible, filterBySearch, filterProtocores, sortProtocores]);

    const showProtocoreModal = () => {
        // Очищаем фильтры и поиск при открытии модалки
        clearSearch();
        clearFilters();
        clearSorting();
        protocoreModalRef.current.showModal();
    };

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
        return `${placementLabel} allowed: ${allowedTypes}`;
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
                        onClick={showProtocoreModal}
                        disabled={allProtocores.length === 0 || selectedProtocores.length >= 2}
                    >
                        + Add Protocore
                    </button>
                </div>

                <ModalWindow
                    ref={protocoreModalRef}
                    title={'Choose Protocores'}
                    tag={
                        <div className={styles.modalInfo}>
                            <FilterSortBarProtocore
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
                                                cardImage={cardImage} // Передаем найденную картинку или null
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