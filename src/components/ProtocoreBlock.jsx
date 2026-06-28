import React from 'react';
import styles from './ProtocoreBlock.module.css';
import { getImageUrl } from './imageUtils.js';
import {protocoreColor, protocoreTypes} from '../data/protocore-data.js';

function ProtocoreBlock({ protocore, onEdit, onDelete, hideChange = false, hideDelete = false }) {
    const { type, stellactrum, level, mainStat, mainStatValue, substats } = protocore;

    // Получаем данные типа из protocoreTypes
    const typeData = protocoreTypes[type];
    const typeDisplayName = typeData ? typeData.name : type.charAt(0).toUpperCase() + type.slice(1);

    // Функция для получения пути к картинке из protocoreColor
    const getProtocoreImage = (type, color) => {
        // Ищем совпадение по типу и цвету
        // В protocoreColor названия: amber-alfa, emerald-beta и т.д.
        const imageName = `${color}-${type}`;
        const found = protocoreColor.find(item => {
            // Извлекаем имя файла из пути
            const fileName = item.img.split('/').pop(); // например, "amber-alpha.png"
            const nameWithoutExt = fileName.split('.')[0];
            return nameWithoutExt === imageName;
        });

        return found ? found.img : null;
    };

    // Функция для форматирования значения стата
    const formatStatValue = (stat, value) => {
        if (value === null || value === undefined) return 'N/A';

        const flatStats = ['HP', 'ATK', 'DEF'];
        if (flatStats.includes(stat)) {
            return `+${value}`;
        } else {
            return `${value}%`;
        }
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(protocore);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(protocore);
        }
    };

    // Получаем путь к картинке
    const imagePath = getProtocoreImage(type, stellactrum);

    return (
        <section className={`${styles.protocoreBlock} ${styles[`stellactrum${stellactrum.charAt(0).toUpperCase() + stellactrum.slice(1)}`] || ''}`}>

          <div>
            <div className={styles.header}>
                <div className={styles.typeIcon}>
                    <img
                        src={getImageUrl(imagePath)}
                        alt={typeDisplayName}
                        className={styles.typeImage}
                    />
                </div>
                <div className={styles.typeInfo}>
                    <span className={styles.typeName}>{typeDisplayName}</span>
                    <span className={styles.level}>Lv. {level}</span>
                </div>
            </div>

            <div className={styles.mainStat}>
                <span className={styles.statLabelMain}>{mainStat}</span>
                <span className={styles.statValueMain}>
                     {formatStatValue(mainStat, mainStatValue)}
                </span>
            </div>

            <div className={styles.substatsContainer}>
                {substats && substats.map((substat, index) => {
                    const statName = typeof substat === 'object' ? substat.stat : substat;
                    const statValue = typeof substat === 'object' ? substat.value : null;

                    return (
                        <div key={index} className={styles.subStat}>
                            <span className={styles.statLabel}>{statName}</span>
                            <span className={styles.statValue}>
                                 {formatStatValue(statName, statValue)}
                            </span>
                        </div>
                    );
                })}
            </div>
          </div>


                <div className={styles.actions}>
                    {!hideChange && (
                    <button className={styles.editButton} onClick={handleEdit}>
                        Change
                    </button>
                    )}
                    {!hideDelete && (
                    <button className={styles.deleteButton} onClick={handleDelete}>
                        Delete
                    </button>
                    )}
                </div>

        </section>
    );
}

export default ProtocoreBlock;