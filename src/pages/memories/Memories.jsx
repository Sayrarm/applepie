import styles from './Memories.module.css';
import Card from "@components/common/Card.jsx";
import { useSearch } from '@components/common/filter-and-sort/folter-sorter-memories/useSearch.js';
import { useSort } from '@components/common/filter-and-sort/folter-sorter-memories/useSort.js';
import { useFilter } from '@components/common/filter-and-sort/folter-sorter-memories/useFilter.js';
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { memoriesData as initialMemoriesData } from '../../data/card-article-data/memories-data.js';
import { enhanceMemoriesWithAvailability } from "../../data/card-article-data/cardAvailability.js";
import FilterSortBarMemories from '@components/common/filter-and-sort/folter-sorter-memories/FilterSortBarMemories.jsx';

function Memories() {
    // Используем хуки
    const { searchQuery, onSearch } = useSearch('memories');
    const { sortCriteria, handleSortChange, clearSorting, sortMemories } = useSort('memories');
    const {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        applyFilters,
        clearFilters,
        filterMemories
    } = useFilter('memories');

    const filterModalRef = useRef();

    const [memoriesData, setMemoriesData] = useState(() => {
        return enhanceMemoriesWithAvailability(initialMemoriesData);
    });

    // Локальное состояние для размера карточек
    const [isImageSmall, setIsImageSmall] = useState(() => {
        const saved = localStorage.getItem('card_image_size');
        return saved === 'small';
    });

    // Сохраняем в localStorage
    useEffect(() => {
        localStorage.setItem('card_image_size', isImageSmall ? 'small' : 'big');
    }, [isImageSmall]);

    const toggleImageSize = () => {
        setIsImageSmall(prev => !prev);
    };

    // Фильтруем данные
    const filteredMemories = filterMemories(memoriesData).filter(memory => {
        return memory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            memory.char.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Синхронизация с localStorage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key && e.key.startsWith('cardAvailable_')) {
                const enhanced = enhanceMemoriesWithAvailability(initialMemoriesData);
                setMemoriesData(enhanced);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        const handleAvailabilityChange = () => {
            const enhanced = enhanceMemoriesWithAvailability(initialMemoriesData);
            setMemoriesData(enhanced);
        };

        window.addEventListener('cardAvailabilityChanged', handleAvailabilityChange);
        return () => window.removeEventListener('cardAvailabilityChanged', handleAvailabilityChange);
    }, []);

    // Сортируем отфильтрованные данные
    const sortedMemories = sortMemories(filteredMemories);

    // Функция сброса всех настроек
    const resetAllSettings = () => {
        setSelectedChar('ALL');
        clearSorting();
        onSearch('');
        clearFilters();

        // ВЫЗЫВАЕМ ОЧИСТКУ МОДАЛКИ
        if (filterModalRef.current) {
            filterModalRef.current.clearAll();
        }
    };

    return (
        <section className={styles.memories}>
            <FilterSortBarMemories
                searchQuery={searchQuery}
                onSearch={onSearch}
                sortCriteria={sortCriteria}
                handleSortChange={handleSortChange}
                clearSorting={clearSorting}
                selectedChar={selectedChar}
                setSelectedChar={setSelectedChar}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                filterModalRef={filterModalRef}
                resetAllSettings={resetAllSettings}
                storagePrefix="memories"
                extraButtons={[
                    {
                        onClick: toggleImageSize,
                        icon: '../assets/icons/icons8-change-64.png',
                        title: 'Change size of Cards'
                    }
                ]}
            />

            <div className={styles.cardsGrid}>
                {sortedMemories.map(memory => {
                    // Находим индекс текущей карточки в отсортированном списке
                    const currentIndex = sortedMemories.indexOf(memory);
                    return (
                        <Link
                            key={memory.id}
                            to={`/memories/${memory.id}`}
                            state={{
                                cards: sortedMemories,
                                currentIndex: currentIndex
                            }}
                            className={styles.cardLink}
                        >
                            <Card key={memory.id} data={memory} isSmall={isImageSmall} />
                        </Link>
                    );
                })}
            </div>

            {sortedMemories.length === 0 && (
                <p className={styles.noResults}>No memories found ¯\_(ツ)_/¯</p>
            )}
        </section>
    );
}

export default Memories;