import { useState } from 'react'
import styles from './Memories.module.css'
import {memoriesData} from '../data/memories-data.js'
import Card from "../components/Card.jsx";
import { Input, Space } from 'antd';

const { Search } = Input;

function Memories() {

    // Состояние для поискового запроса
    const [searchQuery, setSearchQuery] = useState('')

    // Состояние для выбранного персонажа (опционально, если нужен фильтр по кнопкам)
    const [selectedChar, setSelectedChar] = useState('ALL')

    // Функция для обработки поиска из antd
    const onSearch = (value) => {
        setSearchQuery(value.toLowerCase()) // сохраняем запрос в нижнем регистре
    }

    // Фильтруем данные
    const filteredMemories = memoriesData.filter(memory => {
        // Проверяем совпадение по имени карточки
        const matchesSearch = memory.name.toLowerCase().includes(searchQuery)

        // Проверяем совпадение по персонажу
        const matchesChar = selectedChar === 'ALL' || memory.char === selectedChar


        return matchesSearch && matchesChar
    })

    return (
        <>
            <section className={styles.memories}>
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
                            onChange={(e) => setSearchQuery(e.target.value)} // ← позволяет искать по мере ввода
                            style={{ width: 200 }}
                        />
                    </Space>
                    <button>Sort</button>
                    <button>Filter</button>
                </aside>
                <div className={styles.cardsGrid}>
                    {filteredMemories.map(memory => (
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
