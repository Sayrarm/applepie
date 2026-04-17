import {useState} from 'react';


export const useSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')

// Функция для обработки поиска из antd
    const onSearch = (value) => {
        setSearchQuery(value.toLowerCase()) // сохраняем запрос в нижнем регистре
    }

    const clearSearch = () => {
        setSearchQuery('');
    };

    return { searchQuery, onSearch, clearSearch }
}
