import React, {useCallback, useMemo, useRef, useState} from 'react';
import styles from './CardProtocores.module.css';
import ProtocoreBlock from '../common/ProtocoreBlock.jsx';
import {memoriesData} from '../../data/card-article-data/memories-data.js';
import ModalWindow from "../ui/ModalWindow.jsx";
import FilterSortBarProtocore from "../common/filter-and-sort/filter-sorter-protocores/FilterSortBarProtocores.jsx";
import { useProtocoreSearch } from '../common/filter-and-sort/filter-sorter-protocores/useProtocoreSearch.js';
import { useProtocoreFilter } from '../common/filter-and-sort/filter-sorter-protocores/useProtocoreFilter.js';
import { useProtocoreSort } from '../common/filter-and-sort/filter-sorter-protocores/useProtocoreSort.js';

function CardProtocores({cardId}) {
    const protocoreModalRef = useRef();
    const filterModalRef = useRef();

    // Хуки для фильтрации и сортировки протокоров
    const { searchQuery, onSearch, clearSearch } = useProtocoreSearch('card');
    const { applyFilters, clearFilters, filterProtocores, isModalOpen, setIsModalOpen } = useProtocoreFilter('card');
    const { sortCriteria, handleSortChange, clearSorting, sortProtocores } = useProtocoreSort('card');

    const showProtocoreModal = () => {
        protocoreModalRef.current.showModal();
    };

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

    // Получаем стеллактум текущей карточки
    const cardStella = useMemo(() => {
        if (!cardId) return null;
        const card = memoriesData.find(c => String(c.id) === cardId);
        return card ? card.stellaName : null;
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

    // Функция для удаления протокора со всех карточек
    const removeProtocoreFromAllCards = useCallback((protocoreId) => {
        // Проходим по всем карточкам в memoriesData
        for (const card of memoriesData) {
            const cardProtocores = JSON.parse(localStorage.getItem(`card_protocores_${card.id}`) || '[]');
            const filtered = cardProtocores.filter(p => p.id !== protocoreId);

            if (filtered.length !== cardProtocores.length) {
                // Если протокор был найден и удален, сохраняем изменения
                localStorage.setItem(`card_protocores_${card.id}`, JSON.stringify(filtered));

                // Отправляем событие об обновлении
                window.dispatchEvent(new CustomEvent('protocoresUpdated', {
                    detail: {cardId: card.id, protocores: filtered}
                }));
            }
        }
    }, []);

    // Функция для сохранения в localStorage
    const saveProtocores = useCallback((protocores) => {
        if (!cardId) return;
        localStorage.setItem(`card_protocores_${cardId}`, JSON.stringify(protocores));
        window.dispatchEvent(new CustomEvent('protocoresUpdated', {
            detail: {cardId, protocores}
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
    }, [allProtocores, canAddProtocore, removeProtocoreFromAllCards, selectedProtocores, saveProtocores]);

    // Удалить протокор
    const handleRemoveProtocore = useCallback((protocoreId) => {
        const updatedProtocores = selectedProtocores.filter(p => p.id !== protocoreId);
        setSelectedProtocores(updatedProtocores);
        saveProtocores(updatedProtocores);
    }, [selectedProtocores, saveProtocores]);

    // Фильтруем протокоры по совместимости с карточкой
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
                if (p.type !== 'alpha' && p.type !== 'beta') return false;
            } else if (isLunar) {
                // Для Lunar: только gamma и delta
                if (p.type !== 'gamma' && p.type !== 'delta') return false;
            }

            // Проверка совместимости по стеллактуму
            return !(cardStella && p.stellactrum !== cardStella);

        });
    }, [selectedProtocores, cardPlacement, cardStella]);

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

    // Используем useMemo
    const availableProtocores = useMemo(() => {
        // 1. Фильтруем по совместимости с карточкой (placement + stellactrum)
        const compatible = filterCompatible(allProtocores);

        // 2. Применяем фильтры
        const filtered = filterProtocores(compatible);

        // 3. Применяем поиск
        const searched = filterBySearch(filtered);

        // 4. Сортируем
        return sortProtocores(searched);
    }, [allProtocores, filterCompatible, filterBySearch, filterProtocores, sortProtocores]);


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