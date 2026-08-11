import React, {useMemo} from 'react';
import {getImageUrl} from '@hooks';

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
                          containerClassName = '',
                          alt = 'Dynamic image',
                          dayStartHour = 5 // Новый день начинается в 5 утра
                      }) => {

        // Получаем текущую дату с учетом начала дня в 5 утра
        const currentDate = useMemo(() => {
            const now = new Date();
            const currentHour = now.getHours();

            // Корректируем дату: если текущий час меньше 5, то мы все еще в предыдущем дне
            const adjustedDate = new Date(now);
            if (currentHour < dayStartHour) {
                adjustedDate.setDate(adjustedDate.getDate() - 1);
            }

            return adjustedDate;
        }, [dayStartHour]);

    // Определяем текущий день недели или месяц
    const currentCondition = useMemo(() => {

    if (type === 'weekday') {
        // getDay(): 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
        const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return weekdays[currentDate.getDay()];
    }

    if (type === 'month') {
        // getMonth(): 0 - январь, 1 - февраль, ..., 11 - декабрь
        const months = ['january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'];
        return months[currentDate.getMonth()];
    }

    return null;
}, [type, currentDate]);

// Находим подходящую картинку из ростра
const matchingImages = useMemo(() => {
    const matchedRules = roster.filter(rule => {
        return rule.conditions.includes(currentCondition);
    });
    return matchedRules.map(rule => {
        const imagePath = rule.image.startsWith('/')
            ? rule.image
            : `/${rule.image}`;
        return {
            src: `${basePath}${imagePath}`,
            id: rule.id
        };
    });
}, [roster, currentCondition, basePath]);

if (matchingImages.length === 0) {
    return null;
}


return (
    <div className={containerClassName}>
        {matchingImages.map((image, index) => (
            <img
                key={image.id}
                src={getImageUrl(image.src)}
                alt={`${alt} ${index + 1}`}
                className={className}
            />
        ))}
    </div>
);
}
;

export default DynamicImage;