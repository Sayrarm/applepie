import React, {useState, useEffect, useRef} from 'react';
import styles from './Protocores.module.css';
import filterSortBar from './FilterSortBar.module.css'
import ProtocoreBlock from './ProtocoreBlock';
import ModalWindowProtocore from './ModalWindowProtocore';
import {useProtocoreSearch} from '../hooks/useProtocoreSearch';
import {useProtocoreFilter} from '../hooks/useProtocoreFilter';
import {useProtocoreSort} from '../hooks/useProtocoreSort';
import FilterModalProtocore from '../components/FilterModalProtocore';
import {Button, Input, Select} from 'antd';
import {getImageUrl} from './imageUtils';
import {stylesFnSearch} from "./stylesAntd.js";

const {Search} = Input;

function Protocores() {
    const [protocores, setProtocores] = useState([]);
    const modalRef = useRef();
    const filterModalRef = useRef();

    const {searchQuery, onSearch, clearSearch} = useProtocoreSearch();
    const {filters, applyFilters, clearFilters, filterProtocores, isModalOpen, setIsModalOpen} = useProtocoreFilter();
    const {sortCriteria, handleSortChange, clearSorting, sortProtocores} = useProtocoreSort();

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

    return (
        <section className={styles.container}>
            {/* Фильтры и сортировка */}
            <div className={styles.controls}>
                <div className={styles.searchSortRow}>


                    <div className={styles.sortWrapper}>
                        <Select
                            mode="tags"
                            size="medium"
                            placeholder="Select sort"
                            value={sortCriteria}
                            onChange={handleSortChange}
                            className={filterSortBar.colorBrown}
                            options={[
                                {value: 'type', label: 'Type'},
                                {value: 'stellactrum', label: 'Stellactrum'},
                                {value: 'level', label: 'Level'},
                                {value: 'mainStat', label: 'Main Stat'}
                            ]}
                        />
                        <Button
                            onClick={clearSorting}
                            color="default"
                            variant="outlined"
                            icon={
                                <img
                                    className={filterSortBar.imgIcon}
                                    src={getImageUrl('../assets/icons/eraser_16863523.png')}
                                    style={{width: 22, height: 22}}
                                    alt="Clear sorting"
                                />
                            }
                            title="Clear sorting"
                            className={filterSortBar.colorBrown}
                        />
                    </div>

                    <div className={filterSortBar.filterBy}>
                        <Search
                            placeholder="Search protocores..."
                            allowClear
                            onSearch={onSearch}
                            onChange={(e) => {
                                if (e.target.value === '') {
                                    clearSearch();
                                }
                            }}
                            style={{width: 250}}
                            styles={stylesFnSearch}
                        />
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            title="Filter"
                            className={filterSortBar.colorBrown}
                            icon={
                                <img
                                    src={getImageUrl('../assets/icons/filter.png')}
                                    style={{width: 20, height: 20}}
                                    alt="Filter"
                                />
                            }
                        >
                        </Button>

                        <Button
                            onClick={resetAllSettings}
                            title="Reset all filters and sorting"
                            className={filterSortBar.colorBrown}
                            icon={
                                <img
                                    src={getImageUrl('../assets/icons/reset.png')}
                                    style={{width: 18, height: 18}}
                                    alt="Reset"
                                />
                            }
                        >
                        </Button>
                    </div>
                </div>
            </div>

            <FilterModalProtocore
                ref={filterModalRef}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onFilter={applyFilters}
                onClearFilters={clearFilters}
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
                    sortedProtocores.map(protocore => (
                        <ProtocoreBlock
                            key={protocore.id}
                            protocore={protocore}
                            onEdit={handleEditProtocore}
                            onDelete={handleDeleteProtocore}
                        />
                    ))
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