import { useEffect, useState } from 'react';
import styles from './AsideReplacableResources.module.css';
import { getImageUrl } from './imageUtils';
import { STORAGE_KEYS, getHeartsandExchange, getCrystalBoxExchange } from '../data/my-resources';
import AsideList from './AsideList';

function ReplaceableResources({ goal }) {
    const [heartsandExchange, setHeartsandExchange] = useState(null);
    const [crystalBoxExchange, setCrystalBoxExchange] = useState(null);
    const [hasHeartsand, setHasHeartsand] = useState(false);
    const [hasCrystalBox, setHasCrystalBox] = useState(false);

    // Функция для обновления данных
    const updateData = () => {
        const heartsandState = JSON.parse(localStorage.getItem(STORAGE_KEYS.HEARTSAND) || '{}');
        const crystalBoxesState = JSON.parse(localStorage.getItem(STORAGE_KEYS.CRYSTAL_BOXES) || '{}');

        const heartsand = getHeartsandExchange(heartsandState);
        const crystalBox = getCrystalBoxExchange(crystalBoxesState);

        setHeartsandExchange(heartsand);
        setCrystalBoxExchange(crystalBox);
        setHasHeartsand(heartsand.bottles.hasAny || heartsand.credits.total > 0);
        setHasCrystalBox(crystalBox.hasAny);
    };

    // Загружаем данные при монтировании
    useEffect(() => {
        updateData();
    }, []);

    // Слушаем изменения в localStorage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === STORAGE_KEYS.HEARTSAND || e.key === STORAGE_KEYS.CRYSTAL_BOXES) {
                updateData();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Также слушаем кастомное событие для обновления из той же вкладки
        const handleCustomUpdate = () => updateData();
        window.addEventListener('resourcesUpdated', handleCustomUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('resourcesUpdated', handleCustomUpdate);
        };
    }, []);

    if (!hasHeartsand && !hasCrystalBox) return null;

    // Формируем items для AsideList
    const asideItems = [];

    // Memory Heartsand
    if (hasHeartsand && heartsandExchange) {
        const heartsandContent = (
            <div className={styles.replaceableItems}>
                {heartsandExchange.bottles.R > 0 && (
                    <div className={styles.replaceableItem}>
                        <span className={styles.itemTitle}>Bottle of Wishes</span>
                        <img src={getImageUrl('../assets/icons/bottle-r.png')} alt="Bottle R" className={styles.smallIcon} />
                        <span>R: {heartsandExchange.bottles.R}</span>
                    </div>
                )}
                {heartsandExchange.bottles.SR > 0 && (
                    <div className={styles.replaceableItem}>
                        <span className={styles.itemTitle}>Bottle of Wishes</span>
                        <img src={getImageUrl('../assets/icons/bottle-sr.png')} alt="Bottle SR" className={styles.smallIcon} />
                        <span>SR: {heartsandExchange.bottles.SR}</span>
                    </div>
                )}
                {heartsandExchange.bottles.SSR > 0 && (
                    <div className={styles.replaceableItem}>
                        <span className={styles.itemTitle}>Bottle of Wishes</span>
                        <img src={getImageUrl('../assets/icons/bottle-ssr.png')} alt="Bottle SSR" className={styles.smallIcon} />
                        <span>SSR: {heartsandExchange.bottles.SSR}</span>
                    </div>
                )}
                {heartsandExchange.bottles.hasAny && heartsandExchange.credits.total > 0 && (
                    <span className={styles.span}> or </span>
                )}
                {heartsandExchange.credits.total > 0 && (
                    <div className={styles.replaceableItem}>
                        <span className={styles.itemTitle}>Credits</span>
                        <img src={getImageUrl('../assets/icons/credits.png')} alt="Credits" className={styles.smallIcon} />
                        <span>{heartsandExchange.credits.total.toLocaleString()}</span>
                    </div>
                )}
            </div>
        );

        asideItems.push({
            key: 'heartsand',
            label: 'Memory Heartsand',
            children: heartsandContent,
        });
    }

    // Ascension Crystal Box
    if (hasCrystalBox && crystalBoxExchange) {
        const crystalBoxContent = (
            <div className={styles.replaceableItemsCrystal}>
                <div className={styles.replaceableItems}>
                    {crystalBoxExchange.box_n > 0 && (
                        <div className={styles.replaceableItem}>
                            <span className={styles.itemTitle}>Crystal</span>
                            <img src={getImageUrl('../assets/icons/crystal-box-n.png')} alt="Box N" className={styles.smallIcon} />
                            <span>N: {crystalBoxExchange.box_n}</span>
                        </div>
                    )}
                    {crystalBoxExchange.box_r > 0 && (
                        <div className={styles.replaceableItem}>
                            <span className={styles.itemTitle}>Crystal</span>
                            <img src={getImageUrl('../assets/icons/crystal-box-r.png')} alt="Box R" className={styles.smallIcon} />
                            <span>R: {crystalBoxExchange.box_r}</span>
                        </div>
                    )}
                    {crystalBoxExchange.box_sr > 0 && (
                        <div className={styles.replaceableItem}>
                            <span className={styles.itemTitle}>Crystal</span>
                            <img src={getImageUrl('../assets/icons/crystal-box-sr.png')} alt="Box SR" className={styles.smallIcon} />
                            <span>SR: {crystalBoxExchange.box_sr}</span>
                        </div>
                    )}
                </div>

                {crystalBoxExchange.box_general > 0 && (
                    <div className={styles.replaceableItemGeneralBox}>
                        <span className={styles.itemTitle}>
                            General Box
                            <img src={getImageUrl('../assets/icons/crystal-box-general.png')} alt="Box General" className={styles.smallIcon} />
                        </span>

                        <div className={styles.boxesContainer}>
                            <span>N: {crystalBoxExchange.box_general_to_n}</span>
                            <span className={styles.span}> or </span>
                            <span>R: {crystalBoxExchange.box_general_to_r}</span>
                            <span className={styles.span}> or </span>
                            <span>SR: {crystalBoxExchange.box_general_to_sr}</span>
                        </div>
                    </div>
                )}
            </div>
        );

        asideItems.push({
            key: 'crystalbox',
            label: 'Ascension Crystal Box',
            children: crystalBoxContent,
        });
    }

    return (
        <AsideList
            className={styles.aside}
            title="You have replaceable resources:"
            items={asideItems}
        />
    );
}

export default ReplaceableResources;