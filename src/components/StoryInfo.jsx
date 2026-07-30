import styles from './StoryInfo.module.css';
import { storyCardInfo } from '../data/story-card-info.js';
import { memoriesData } from '../data/memories-data.js';

function StoryInfo({ cardId }) {
    // Находим информацию о карточке в memoriesData
    const card = memoriesData.find(c => String(c.id) === String(cardId));

    // Если карточка не найдена - не показываем
    if (!card || !cardId) {
        return null;
    }

    // Проверяем, есть ли поле link у карточки
    if (!card.hasOwnProperty('link')) {
        return null;
    }

    // Находим историю, в которую входит карточка
    const storyInfo = storyCardInfo.find(item =>
        item.memories.some(id => String(id) === String(cardId))
    );

    if (!storyInfo) {
        return null;
    }

    // Проверяем, есть ли ссылка (не пустая)
    const hasLink = card.link && card.link.trim() !== '';

    const handleClick = (e) => {
        if (!hasLink) {
            e.preventDefault();
            alert('No data available for this memory. Try to find it on YT :)');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>Story:</div>
            <a
                href={hasLink ? card.link : '#'}
                target={hasLink ? "_blank" : undefined}
                rel={hasLink ? "noopener noreferrer" : undefined}
                className={styles.value}
                onClick={handleClick}
            >
                {storyInfo.story}
                {hasLink && <span className={styles.externalIcon}> ↗</span>}
            </a>
        </div>
    );
}

export default StoryInfo;