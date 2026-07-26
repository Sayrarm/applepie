import styles from './About.module.css';
import { aboutData } from '../data/about-data.js';
import { getImageUrl } from '../components/imageUtils.js';

function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About this Project</h1>

            <div className={styles.content}>
                {aboutData.map((item, index) => {
                    // Проверяем, есть ли изображение
                    const hasImage = item.img && item.img.trim() !== '';

                    // Определяем тип элемента для разных стилей
                    const isMainText = item.name === 'about' || item.name === 'about_2';
                    const isPoint = item.name.startsWith('point_');
                    const isItem = item.name.startsWith('item_');

                    return (
                        <div
                            key={index}
                            className={`${styles.block} ${isMainText ? styles.mainText : ''} ${isPoint ? styles.point : ''} ${isItem ? styles.item : ''}`}
                        >
                            {/* Текст */}
                            <div className={styles.textWrapper}>
                                <div dangerouslySetInnerHTML={{ __html: item.text }} />
                            </div>

                            {/* Изображение (если есть) */}
                            {hasImage && (
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={getImageUrl(item.img)}
                                        alt={item.name}
                                        className={styles.image}
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default About;