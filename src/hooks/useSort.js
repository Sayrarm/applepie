import { useState } from 'react';

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

export const useSort =() => {
    const [sortCriteria, setSortCriteria] = useState([])

    // Обработчик изменения сортировки (для mode="tags")
    const handleSortChange = (values) => {
        // values — это массив выбранных значений, например ['char', 'rarity']
        setSortCriteria(values)
    }

    // Очистка всех сортировок
    const clearSorting = () => {
        setSortCriteria([])
    }

    // Сортируем отфильтрованные данные
    const sortMemories = (memories) => {
        return multiSort(memories, sortCriteria);
    };

    return { sortCriteria,
            handleSortChange,
            clearSorting,
            sortMemories }

}
