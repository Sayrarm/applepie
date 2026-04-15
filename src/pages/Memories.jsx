import {useState} from 'react'
import styles from './Memories.module.css'
import {memoriesData} from '../data/memories-data.js'
import Card from "../components/Card.jsx";
import {Input, Select, Space} from 'antd';

const {Search} = Input;

function Memories() {

    // Состояние для поискового запроса
    const [searchQuery, setSearchQuery] = useState('')

    // Состояние для выбранного персонажа (опционально, если нужен фильтр по кнопкам)
    const [selectedChar, setSelectedChar] = useState('ALL')

    const [sortBy, setSortBy] = useState(null)

    // Функция для сортировки
    const sortMemories = (memories, sortType) => {
        if (!sortType) return memories

        const sorted = [...memories]

        switch (sortType) {
            case 'char':
                return sorted.sort((a, b) => {
                    const order = ['Caleb', 'Rafayel', 'Sylus', 'Xavier', 'Zayne']
                    return order.indexOf(a.char) - order.indexOf(b.char)
                })

            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name))

            case 'rarity':
                return sorted.sort((a, b) => {
                    const order = { '3-star': 1, '4-star': 2, '5-star': 3 }
                    return (order[a.rarityName] || 0) - (order[b.rarityName] || 0)
                })

            case 'stella':
                return sorted.sort((a, b) => {
                    const order = ['emerald', 'sapphire', 'violet', 'amber', 'ruby', 'pearl']
                    return order.indexOf(a.stellaName) - order.indexOf(b.stellaName)
                })

            case 'placement':
                return sorted.sort((a, b) => {
                    const order = ['solar', 'lunar']
                    return order.indexOf(a.placementName) - order.indexOf(b.placementName)
                })

            case 'talent':
                return sorted.sort((a, b) => {
                    const order = ['atk', 'def', 'hp']
                    return order.indexOf(a.talentName) - order.indexOf(b.talentName)
                })

            default:
                return memories
        }
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
    const sortedMemories = sortMemories(filteredMemories, sortBy)

    const handleSortChange = (value) => {
        setSortBy(value)
    }

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
                    </nav>
                    <aside className={styles.filterBy}>
                        <Space vertical>
                            <Search
                                placeholder="Search by memory name..."
                                onSearch={onSearch}
                                style={{width: 200}}
                            />
                        </Space>
                        <Select
                            defaultValue="Sorting by"
                            style={{ width: 150 }}
                            onChange={handleSortChange}
                            options={[
                                { value: 'char', label: 'Character' },
                                { value: 'name', label: 'Memory\'s name' },
                                { value: 'rarity', label: 'Rarity' },
                                { value: 'stella', label: 'Stellactrum' },
                                { value: 'placement', label: 'Placement' },
                                { value: 'talent', label: 'Talent' },
                            ]}
                        />

                        <button>Filter</button>
                    </aside>
                </div>
                <div className={styles.cardsGrid}>
                    {sortedMemories.map(memory => (
                        <Card key={memory.id} data={memory}/>
                    ))}
                </div>

                {/* Если ничего не найдено */}
                {filteredMemories.length === 0 && (
                    <p className={styles.noResults}>No memories found</p>
                )}
            </section>
        </>
    )
}

export default Memories
