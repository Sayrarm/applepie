import styles from './Memories.module.css';
import Card from "../components/Card.jsx";
import {Button, Input, Select} from 'antd';
import myFilterIcon from '/src/assets/icons/filter.png';
import myClearIcon from '/src/assets/icons/eraser_16863523.png';
import myChangeIcon from '/src/assets/icons/icons8-change-64.png';
import FilterModalWindow from "../components/FilterModalWindow.jsx";
import {useSearch} from '../hooks/useSearch';
import {useSort} from '../hooks/useSort';
import {useFilter} from '../hooks/useFilter';
import {stylesFnSearch} from "../components/stylesAntd.js";
import {fetchData} from '../hooks/api.js';
import {useContext, useEffect, useState} from "react";
import PageLoader from '../components/PageLoader';
import {CardContext} from "../components/CardContext.jsx";
import {Link} from "react-router-dom";

function Memories() {

    const {Search} = Input;
    // Используем хуки
    const {searchQuery, onSearch} = useSearch();
    const {sortCriteria, handleSortChange, clearSorting, sortMemories} = useSort();
    const [memoriesData, setMemoriesData] = useState([]);
    const { toggleImageSize } = useContext(CardContext); // получаем функцию переключения
    const {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        applyFilters,
        clearFilters,
        filterMemories
    } = useFilter();

    useEffect(() => {
        fetchData('memories-data').then(data => setMemoriesData(data));
    }, []);

    // Фильтруем данные
    const filteredMemories = filterMemories(memoriesData).filter(memory => {
        // Поиск по тексту
        return memory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            memory.char.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Сортируем отфильтрованные данные
    const sortedMemories = sortMemories(filteredMemories);

    return (
        <>
            <PageLoader delay={200}>
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
                                    src={myClearIcon}
                                    style={{width: 22, height: 22}}
                                    alt={'filter'}/>}
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
                                    src={myFilterIcon}
                                    style={{width: 20, height: 20}}
                                    alt={'filter'}/>}
                                title={"Filter"}
                                className={styles.colorBrown}
                            />
                            <FilterModalWindow
                                open={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onFilter={applyFilters}
                                onClearFilters={clearFilters}
                            />

                            <Button
                                onClick={toggleImageSize}
                                icon={<img
                                    className={styles.imgIcon}
                                    src={myChangeIcon}
                                    style={{width: 20, height: 20}}
                                    alt={'filter'}/>}
                                title={"change size of Cards"}
                                className={styles.colorBrown}
                            />
                        </aside>
                    </div>
                    <div className={styles.cardsGrid}>
                        {sortedMemories.map(memory => (
                            <Link
                                key={memory.id}
                                to={`/memories/${memory.id}`}
                                className={styles.cardLink}
                            >
                                <Card key={memory.id} data={memory}/>
                            </Link>
                        ))}
                    </div>

                    {sortedMemories.length === 0 && (
                        <p className={styles.noResults}>No memories found ¯\_(ツ)_/¯</p>
                    )}
                </section>
            </PageLoader>
        </>
    )
}

export default Memories
