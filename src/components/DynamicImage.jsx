// DynamicImage.jsx
import React, {useMemo} from 'react';

/**
 * Универсальный компонент для динамической смены картинок
 * @param {Object} props
 * @param {Array} props.roster - массив объектов с правилами отображения
 * @param {string} props.basePath - базовый путь до папки с картинками (например: '/images')
 * @param {string} props.type - тип условия ('weekday' или 'month')
 * @param {string} props.className - дополнительные CSS классы
 * @param {string} props.alt - альтернативный текст
 */
const DynamicImage = ({
                          roster,
                          basePath = '/images',
                          type = 'weekday',
                          className = '',
                          alt = 'Dynamic image'
                      }) => {

    // Определяем текущий день недели или месяц
    const currentCondition = useMemo(() => {
        const now = new Date();

        if (type === 'weekday') {
            // getDay(): 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
            const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return weekdays[now.getDay()];
        }

        if (type === 'month') {
            // getMonth(): 0 - январь, 1 - февраль, ..., 11 - декабрь
            const months = ['january', 'february', 'march', 'april', 'may', 'june',
                'july', 'august', 'september', 'october', 'november', 'december'];
            return months[now.getMonth()];
        }

        return null;
    }, [type]);

    // Находим подходящую картинку из ростра
    const selectedImage = useMemo(() => {
        // Ищем первое правило, которое подходит под текущие условия
        const matchedRule = roster.find(rule => {
            // Проверяем, подходит ли условие (день недели или месяц)
            return rule.conditions.includes(currentCondition);
        });

        // Если нашли правило - берем картинку, иначе дефолтную
        const imageName = matchedRule?.image || roster[0]?.image || 'default.png';

        return `${basePath}/${imageName}`;
    }, [roster, currentCondition, basePath]);

    return (
        <img
            src={selectedImage}
            alt={alt}
            className={className}
        />
    );
};

export default DynamicImage;