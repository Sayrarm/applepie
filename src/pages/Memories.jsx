import {useState} from 'react'
import styles from './Memories.module.css'
import {memoriesData} from '../data/memories-data.js'
import Card from "../components/Card.jsx";
import {Input, Select, Space} from 'antd';

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
            const order = { '3-star': 1, '4-star': 2, '5-star': 3 }
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
            const order = ['def', 'hp', 'atk']
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

    // Обработчик добавления сортировки
    const handleSortChange = (value) => {
        if (!value) return

        // Добавляем новый критерий в конец массива
        setSortCriteria(prev => {
            // Если критерий уже есть, удаляем его из старого места и добавляем в конец
            const filtered = prev.filter(criterion => criterion !== value)
            return [...filtered, value]
        })
    }

    // Удаление критерия сортировки (по желанию)
    const removeSortCriterion = (criterionToRemove) => {
        setSortCriteria(prev => prev.filter(criterion => criterion !== criterionToRemove))
    }

    // Очистка всех сортировок
    const clearSorting = () => {
        setSortCriteria([])
    }

    // Получение названия для отображения
    const getCriterionLabel = (criterion) => {
        const labels = {
            char: 'Character',
            name: "Memory's name",
            rarity: 'Rarity',
            stella: 'Stellactrum',
            placement: 'Placement',
            talent: 'Talent'
        }
        return labels[criterion]
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

                        {/* Кнопка очистки сортировки */}
                        {sortCriteria.length > 0 && (
                            <button onClick={clearSorting} style={{ width: 180 }}>
                                Clear sorting ({sortCriteria.length})
                            </button>
                        )}

                        {/* Отображение активных сортировок */}
                        {sortCriteria.length > 0 && (
                            <div className={styles.activeSorts}>
                                <strong>Sorting by:</strong>
                                {sortCriteria.map((criterion, index) => (
                                    <span key={criterion} className={styles.sortChip}>
                                {index + 1}. {getCriterionLabel(criterion)}
                                        <button onClick={() => removeSortCriterion(criterion)}>×</button>
                            </span>
                                ))}
                            </div>
                        )}

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
