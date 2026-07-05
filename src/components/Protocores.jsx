import React, { useState, useEffect, useRef } from 'react';
import styles from './Protocores.module.css';
import ProtocoreBlock from './ProtocoreBlock';
import ModalWindowProtocore from './ModalWindowProtocore';
import { useProtocoreSearch } from '../hooks/useProtocoreSearch';
import { useProtocoreFilter } from '../hooks/useProtocoreFilter';
import { useProtocoreSort } from '../hooks/useProtocoreSort';
import FilterSortBarProtocores from "../components/FilterSortBarProtocores.jsx";
import {memoriesData} from "../data/memories-data.js";

function Protocores() {
    const [protocores, setProtocores] = useState([]);
    const modalRef = useRef();
    const filterModalRef = useRef();

    const { searchQuery, onSearch, clearSearch } = useProtocoreSearch();
    const { applyFilters, clearFilters, filterProtocores, isModalOpen, setIsModalOpen } = useProtocoreFilter();
    const { sortCriteria, handleSortChange, clearSorting, sortProtocores } = useProtocoreSort();

    useEffect(() => {
        const savedProtocores = JSON.parse(localStorage.getItem('protocores') || '[]');
        setProtocores(savedProtocores);
    }, []);

    // Фильтруем данные
    const filteredProtocores = filterProtocores(protocores).filter(protocore => {
        if (!searchQuery) return true;

        const searchLower = searchQuery.toLowerCase();

        // Поиск по типу
        const typeMatch = protocore.type.toLowerCase().includes(searchLower);

        // Поиск по мейн стату
        const mainStatMatch = protocore.mainStat.toLowerCase().includes(searchLower);

        // Поиск по сабстатам
        const subStatMatch = protocore.substats?.some(sub =>
            sub.stat.toLowerCase().includes(searchLower)
        );

        // Поиск по стеллакруму
        const stellactrumMatch = protocore.stellactrum.toLowerCase().includes(searchLower);

        return typeMatch || mainStatMatch || subStatMatch || stellactrumMatch;
    });

    // Сортируем данные
    const sortedProtocores = sortProtocores(filteredProtocores);

    const resetAllSettings = () => {
        clearSearch();
        clearFilters();
        clearSorting();
        if (filterModalRef.current) {
            filterModalRef.current.clearAll();
        }
    };

    const handleAddProtocore = () => {
        modalRef.current?.showModal();
    };

    const handleSaveProtocore = (newProtocore) => {
        setProtocores(prev => [...prev, newProtocore]);
    };

    const handleUpdateProtocore = (updatedProtocore) => {
        setProtocores(prev => prev.map(p =>
            p.id === updatedProtocore.id ? updatedProtocore : p
        ));
    };

    const handleEditProtocore = (protocore) => {
        modalRef.current?.showModal(protocore);
    };

    const handleDeleteProtocore = (protocoreToDelete) => {
        // Показываем подтверждение перед удалением
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${protocoreToDelete.type.charAt(0).toUpperCase() + protocoreToDelete.type.slice(1)} Protocore (Lv. ${protocoreToDelete.level})?`
        );

        if (confirmDelete) {
            // Удаляем из localStorage
            const existingProtocores = JSON.parse(localStorage.getItem('protocores') || '[]');
            const updatedProtocores = existingProtocores.filter(
                p => p.id !== protocoreToDelete.id
            );
            localStorage.setItem('protocores', JSON.stringify(updatedProtocores));

            // Обновляем состояние
            setProtocores(prev => prev.filter(p => p.id !== protocoreToDelete.id));
        }
    };

    const findCardForProtocore = (protocoreId) => {
        // Ищем во всех карточках
        for (const card of memoriesData) {
            const cardProtocores = JSON.parse(localStorage.getItem(`card_protocores_${card.id}`) || '[]');
            if (cardProtocores.some(p => p.id === protocoreId)) {
                return card.imageSmall;
            }
        }
        return null;
    };

    return (
        <section className={styles.container}>
            <FilterSortBarProtocores
                searchQuery={searchQuery}
                onSearch={onSearch}
                clearSearch={clearSearch}
                sortCriteria={sortCriteria}
                handleSortChange={handleSortChange}
                clearSorting={clearSorting}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                filterModalRef={filterModalRef}
                resetAllSettings={resetAllSettings}
            />

            <button
                className={styles.addButton}
                onClick={handleAddProtocore}
            >
                + Add protocore
            </button>

            <section className={styles.protocoreList}>
                {sortedProtocores.length === 0 ? (
                    <div className={styles.emptyState}>
                        No protocores added yet. Click "Add protocore" to create one!
                    </div>
                ) : (
                    sortedProtocores.map(protocore => {
                        const cardImage = findCardForProtocore(protocore.id);
                        return (
                            <ProtocoreBlock
                                key={protocore.id}
                                protocore={protocore}
                                onEdit={handleEditProtocore}
                                onDelete={handleDeleteProtocore}
                                cardImage={cardImage}
                            />
                        );
                    })
                )}
            </section>

            <ModalWindowProtocore
                ref={modalRef}
                title="Add New Protocore"
                onSave={handleSaveProtocore}
                onUpdate={handleUpdateProtocore}
            />
        </section>
    );
}

export default Protocores;