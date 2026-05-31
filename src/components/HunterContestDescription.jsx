import styles from '/src/pages/Home.module.css'

const HunterBuffCard = ({
                            iconCount = 5,           // количество иконок
                            iconSrc = '',            // путь к иконке
                            extraIconSrc = null,     // дополнительная иконка (если нужна)
                            title = '',              // заголовок
                            description = '',        // описание
                            showExtraIcon = true,   // флаг, нужно ли показывать доп. иконку
                            className = ''           // дополнительный класс
                        }) => {
    const shouldShowExtraIcon = extraIconSrc && showExtraIcon;

    return (
        <div className={className}>
            <div className={styles.stellaImgContainer}>
                {/* Основные иконки */}
                {[...Array(iconCount)].map((_, i) => (
                    <img
                        key={i}
                        className={styles.stellacrumImg}
                        src={iconSrc}
                        alt={`icon-${i}`}
                    />
                ))}
                {/* Дополнительная иконка */}
                {shouldShowExtraIcon && (
                    <img
                        className={styles.stellacrumImg}
                        src={extraIconSrc}
                        alt="extra-icon"
                    />
                )}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default HunterBuffCard;