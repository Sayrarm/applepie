import React from 'react';
import styles from './ProtocoreBlock.module.css';
import { getImageUrl } from './imageUtils.js';

function ProtocoreBlock({ protocore, onEdit, onDelete }) {
    const { type, stellactrum, level, mainStat, mainStatValue, substats } = protocore;

    // Функция для получения цвета stellactrum
    const getStellactrumColor = (color) => {
        const colors = {
            emerald: '#50c878',
            amber: '#ffbf00',
            violet: '#8b00ff',
            pearl: '#f5f5f5',
            sapphire: '#0f52ba',
            ruby: '#e0115f'
        };
        return colors[color] || '#ffffff';
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

    return (
        <section className={`${styles.protocoreBlock} ${styles[`stellactrum${stellactrum.charAt(0).toUpperCase() + stellactrum.slice(1)}`] || ''}`}>
            <div className={styles.header}>
                <div className={styles.typeIcon}>
                    <img src={getImageUrl(type)} alt={type} className={styles.typeImage} />
                </div>
                <div className={styles.typeInfo}>
                    <span className={styles.typeName}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <span className={styles.level}>Lv. {level}</span>
                </div>
                <div className={styles.stellactrumBadge} style={{ backgroundColor: getStellactrumColor(stellactrum) }}>
                    <span>{stellactrum.charAt(0).toUpperCase() + stellactrum.slice(1)}</span>
                </div>
            </div>

            <div className={styles.mainStat}>
                <span className={styles.statLabel}>Main:</span>
                <span className={styles.statValue}>
                    {mainStat} {formatStatValue(mainStat, mainStatValue)}
                </span>
            </div>

            <div className={styles.substatsContainer}>
                {substats && substats.map((substat, index) => {
                    const statName = typeof substat === 'object' ? substat.stat : substat;
                    const statValue = typeof substat === 'object' ? substat.value : null;

                    return (
                        <div key={index} className={styles.subStat}>
                            <span className={styles.statLabel}>Sub {index + 1}:</span>
                            <span className={styles.statValue}>
                                {statName} {formatStatValue(statName, statValue)}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className={styles.actions}>
                <button className={styles.editButton} onClick={handleEdit}>
                    ✏️ Change
                </button>
                <button className={styles.deleteButton} onClick={handleDelete}>
                    🗑️ Delete
                </button>
            </div>
        </section>
    );
}

export default ProtocoreBlock;