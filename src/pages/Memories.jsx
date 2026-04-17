import styles from './Memories.module.css';
import { memoriesData } from '../data/memories-data.js';
import Card from "../components/Card.jsx";
import { Input, Select, Space, Button } from 'antd';
import myFilterIcon from '/src/assets/icons/filter.png';
import FilterModalWindow from "../components/FilterModalWindow.jsx";
import { useSearch } from '../hooks/useSearch';
import { useSort } from '../hooks/useSort';
import { useFilter } from '../hooks/useFilter';


function Memories() {

    const {Search} = Input;
    // Используем хуки
    const { searchQuery, onSearch  } = useSearch();
    const { sortCriteria, handleSortChange, clearSorting, sortMemories } = useSort();
    const {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        applyFilters,
        clearFilters,
        filterMemories
    } = useFilter();

    // Фильтруем данные
    const filteredMemories = filterMemories(memoriesData).filter(memory => {
        // Поиск по тексту
        const matchesSearch = memory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            memory.char.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
    });

    // Сортируем отфильтрованные данные
    const sortedMemories = sortMemories(filteredMemories);

    return (
        <>
            <section className={styles.memories}>
                <div className={styles.options}>
                    <nav className={styles.sortBy}>
                        <div>
                            <button className={`${styles.allButton} ${selectedChar === 'ALL' ? styles.active : ''}`}
                                    onClick={() => setSelectedChar('ALL')}>
                                ALL
                            </button>
                        </div>
                        <div className={styles.characters}>
                            <button onClick={() => setSelectedChar('Xavier')}>Xavier</button>
                            <button onClick={() => setSelectedChar('Zayne')}>Zayne</button>
                            <button onClick={() => setSelectedChar('Rafayel')}>Rafayel</button>
                            <button onClick={() => setSelectedChar('Sylus')}>Sylus</button>
                            <button onClick={() => setSelectedChar('Caleb')}>Caleb</button>
                        </div>

                        <Space>
                            <Select
                                mode="tags"
                                size={"medium"}
                                value={sortCriteria}
                                placeholder="Sorting by"
                                onChange={handleSortChange}
                                style={{ width: 350 }}
                                options={[
                                    { value: 'char', label: 'Character' },
                                    { value: 'name', label: 'Memory\'s name' },
                                    { value: 'rarity', label: 'Rarity' },
                                    { value: 'stella', label: 'Stellactrum' },
                                    { value: 'placement', label: 'Placement' },
                                    { value: 'talent', label: 'Talent' },
                                ]}

                            />
                        </Space>

                        {sortCriteria.length > 0 && (
                            <Button onClick={clearSorting} color="default" variant="solid">
                                Clear ({sortCriteria.length})
                            </Button>
                        )}
                    </nav>

                    <aside className={styles.filterBy}>

                        <Space vertical>
                            <Search
                                placeholder="Search by memory name"
                                onSearch={onSearch}
                                style={{width: 215}}
                            />
                        </Space>

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            icon={<img
                                className={styles.imgIcon}
                                src={myFilterIcon}
                                style={{ width: 20, height: 20 }}
                                alt={'filter'} />}
                        />
                        <FilterModalWindow
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onFilter={applyFilters}
                            onClearFilters={clearFilters}
                        />
                    </aside>
                </div>
                <div className={styles.cardsGrid}>
                    {sortedMemories.map(memory => (
                        <Card key={memory.id} data={memory}/>
                    ))}
                </div>

                {/* Если ничего не найдено */}
                {sortedMemories.length === 0 && (
                    <p className={styles.noResults}>No memories found</p>
                )}
            </section>
        </>
    )
}

export default Memories
