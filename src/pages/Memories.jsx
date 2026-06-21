import styles from './Memories.module.css';
import Card from "../components/Card.jsx";
import {Button, Input, Select} from 'antd';
import FilterModalWindow from "../components/FilterModalWindow.jsx";
import {useSearch} from '../hooks/useSearch';
import {useSort} from '../hooks/useSort';
import {useFilter} from '../hooks/useFilter';
import {stylesFnSearch} from "../components/stylesAntd.js";
import { useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {getImageUrl} from "../components/imageUtils.js";
import {memoriesData as initialMemoriesData} from '../data/memories-data.js';
import {CardProvider} from "../components/CardProvider.jsx";

function Memories() {
    const {Search} = Input;

    // Используем хуки
    const {searchQuery, onSearch} = useSearch();
    const {sortCriteria, handleSortChange, clearSorting, sortMemories} = useSort();
    const [memoriesData, setMemoriesData] = useState(initialMemoriesData); // Загружаем данные напрямую из импорта
    const {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        applyFilters,
        clearFilters,
        filterMemories
    } = useFilter();

    // СОЗДАЁМ REF ДЛЯ МОДАЛКИ
    const filterModalRef = useRef();

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
        <>
            <section className={styles.memories}>
                <div className={styles.options}>
                    <nav className={styles.select}>
                        <div className={styles.selectChar}>
                            <button
                                className={`${styles.buttonSelectChar} ${selectedChar === 'ALL' ? styles.active : ''}`}
                                onClick={() => setSelectedChar('ALL')}>
                                ALL
                            </button>

                            <div className={styles.characters}>
                                <button
                                    className={`${styles.buttonSelectChar} ${selectedChar === 'Xavier' ? styles.active : ''}`}
                                    onClick={() => setSelectedChar('Xavier')}>Xavier
                                </button>
                                <button
                                    className={`${styles.buttonSelectChar} ${selectedChar === 'Zayne' ? styles.active : ''}`}
                                    onClick={() => setSelectedChar('Zayne')}>Zayne
                                </button>
                                <button
                                    className={`${styles.buttonSelectChar} ${selectedChar === 'Rafayel' ? styles.active : ''}`}
                                    onClick={() => setSelectedChar('Rafayel')}>Rafayel
                                </button>
                                <button
                                    className={`${styles.buttonSelectChar} ${selectedChar === 'Sylus' ? styles.active : ''}`}
                                    onClick={() => setSelectedChar('Sylus')}>Sylus
                                </button>
                                <button
                                    className={`${styles.buttonSelectChar} ${selectedChar === 'Caleb' ? styles.active : ''}`}
                                    onClick={() => setSelectedChar('Caleb')}>Caleb
                                </button>
                            </div>
                        </div>

                        <div className={styles.sortBy}>
                            <Select
                                mode="tags"
                                size="medium"
                                value={sortCriteria}
                                placeholder="Sorting by"
                                onChange={handleSortChange}
                                className={styles.colorBrown}
                                style={{width: 250}}
                                options={[
                                    {value: 'char', label: 'Character'},
                                    {value: 'name', label: 'Memory\'s name'},
                                    {value: 'rarity', label: 'Rarity'},
                                    {value: 'stella', label: 'Stellactrum'},
                                    {value: 'placement', label: 'Placement'},
                                    {value: 'talent', label: 'Talent'},
                                ]}
                            />

                            <Button
                                onClick={clearSorting}
                                color="default"
                                variant="outlined"
                                icon={<img
                                    className={styles.imgIcon}
                                    src={getImageUrl('../assets/icons/eraser_16863523.png')}
                                    style={{width: 22, height: 22}}
                                    alt={'Clear sorting'}/>}
                                title={"Clear sorting"}
                                className={styles.colorBrown}
                            >
                            </Button>
                        </div>

                    </nav>

                    <aside className={styles.filterBy}>

                        <Search
                            placeholder="Search by memory name"
                            allowClear
                            onSearch={onSearch}
                            style={{width: 215}}
                            styles={stylesFnSearch}
                            name="search-fn"
                            size={"medium"}
                        />

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            icon={<img
                                className={styles.imgIcon}
                                src={getImageUrl('../assets/icons/filter.png')}
                                style={{width: 20, height: 20}}
                                alt={'filter'}/>}
                            title={"Filter"}
                            className={styles.colorBrown}
                        />

                        <FilterModalWindow
                            ref={filterModalRef}
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onFilter={applyFilters}
                            onClearFilters={clearFilters}
                        />

                        <Button
                            onClick={toggleImageSize}
                            icon={<img
                                className={styles.imgIcon}
                                src={getImageUrl('../assets/icons/icons8-change-64.png')}
                                style={{width: 20, height: 20}}
                                alt={'filter'}/>}
                            title={"change size of Cards"}
                            className={styles.colorBrown}
                        />

                        <Button
                            onClick={resetAllSettings}
                            icon={<img src={getImageUrl('../assets/icons/reset.png')} style={{width: 20, height: 20}}
                                       alt="reset"/>}
                            title="Reset all filters and sorting"
                            className={styles.colorBrown}
                        />
                    </aside>
                </div>
                <div className={styles.cardsGrid}>
                    {sortedMemories.map(memory => {
                        // Находим индекс текущей карточки в отсортированном списке
                        const currentIndex = sortedMemories.indexOf(memory);

                        return (
                            <Link
                                key={memory.id}
                                to={`/memories/${memory.id}`}
                                state={{
                                    cards: sortedMemories,      // ← передаём весь список
                                    currentIndex: currentIndex   // ← передаём индекс
                                }}
                                className={styles.cardLink}
                            >
                                <CardProvider>
                                <Card key={memory.id} data={memory} isSmall={isImageSmall}/>
                                </CardProvider>
                            </Link>
                        );
                    })}
                </div>

                {sortedMemories.length === 0 && (
                    <p className={styles.noResults}>No memories found ¯\_(ツ)_/¯</p>
                )}
            </section>
        </>
    )
}

export default Memories