import {useState} from 'react'
import styles from './Memories.module.css'
import {memoriesData} from '../data/memories-data.js'
import Card from "../components/Card.jsx";
import {Input, Select, Space, Button} from 'antd';
import myFilterIcon from '/public/filter.png';

const {Search} = Input;


function Memories() {

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedChar, setSelectedChar] = useState('ALL')
    const [sortCriteria, setSortCriteria] = useState([])


    // Функции сравнения для каждого типа сортировки
    const compareFunctions = {
        char: (a, b) => {
            const order = ['Caleb', 'Rafayel', 'Sylus', 'Xavier', 'Zayne']
            return order.indexOf(a.char) - order.indexOf(b.char)
        },
        name: (a, b) => a.name.localeCompare(b.name),
        rarity: (a, b) => {
            const order = { '3-star': 3, '4-star': 2, '5-star': 1 }
            return (order[a.rarityName] || 0) - (order[b.rarityName] || 0)
        },
        stella: (a, b) => {
            const order = ['emerald', 'sapphire', 'violet', 'amber', 'ruby', 'pearl']
            return order.indexOf(a.stellaName) - order.indexOf(b.stellaName)
        },
        placement: (a, b) => {
            const order = ['solar', 'lunar']
            return order.indexOf(a.placementName) - order.indexOf(b.placementName)
        },
        talent: (a, b) => {
            const order = ['atk', 'def', 'hp']
            return order.indexOf(a.talentName) - order.indexOf(b.talentName)
        }
    }

    // Функция для многоуровневой сортировки
    const multiSort = (memories, criteria) => {
        if (criteria.length === 0) return memories

        const sorted = [...memories]

        return sorted.sort((a, b) => {
            // Проходим по всем критериям сортировки в порядке их добавления
            for (const criterion of criteria) {
                const compare = compareFunctions[criterion]
                const result = compare(a, b)

                // Если элементы отличаются по текущему критерию, возвращаем результат
                if (result !== 0) {
                    return result
                }
                // Если равны, переходим к следующему критерию
            }
            return 0 // Если все критерии равны
        })
    }

    // Обработчик изменения сортировки (для mode="tags")
    const handleSortChange = (values) => {
        // values — это массив выбранных значений, например ['char', 'rarity']
        setSortCriteria(values)
    }

    // Очистка всех сортировок
    const clearSorting = () => {
        setSortCriteria([])
    }


    // Фильтруем данные
    const filteredMemories = memoriesData.filter(memory => {
        const matchesSearch = memory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            memory.char.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesChar = selectedChar === 'ALL' ||
            memory.char.toLowerCase() === selectedChar.toLowerCase()
        return matchesSearch && matchesChar
    })

    // Сортируем отфильтрованные данные
    const sortedMemories = multiSort(filteredMemories, sortCriteria)

    // Функция для обработки поиска из antd
    const onSearch = (value) => {
        setSearchQuery(value.toLowerCase()) // сохраняем запрос в нижнем регистре
    }

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
                            icon={<img
                                className={styles.imgIcon}
                                src={myFilterIcon}
                                style={{ width: 20, height: 20 }}
                                alt={'filter'} />}
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
