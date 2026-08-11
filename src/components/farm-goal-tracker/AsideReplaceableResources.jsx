import { useEffect, useState } from 'react';
import styles from './AsideReplacableResources.module.css';
import { getImageUrl } from '@hooks';
import { STORAGE_KEYS, getHeartsandExchange, getCrystalBoxExchange } from '@data';
import {AsideList} from '@components';

function AsideReplaceableResources({ goal, remaining }) {
    const [heartsandExchange, setHeartsandExchange] = useState(null);
    const [crystalBoxExchange, setCrystalBoxExchange] = useState(null);

    // Функция для обновления данных
    const updateData = () => {
        const heartsandState = JSON.parse(localStorage.getItem(STORAGE_KEYS.HEARTSAND) || '{}');
        const crystalBoxesState = JSON.parse(localStorage.getItem(STORAGE_KEYS.CRYSTAL_BOXES) || '{}');

        const heartsand = getHeartsandExchange(heartsandState);
        const crystalBox = getCrystalBoxExchange(crystalBoxesState);

        setHeartsandExchange(heartsand);
        setCrystalBoxExchange(crystalBox);
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

        const handleCustomUpdate = () => updateData();
        window.addEventListener('resourcesUpdated', handleCustomUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('resourcesUpdated', handleCustomUpdate);
        };
    }, []);

    // Проверяем, осталось ли что-то фармить
    // Для memory нужны Bottles, для protocore - нет
    const needsBottles = goal.type === 'memory' && remaining.exp > 0;
    const needsCredits = remaining.credits > 0;
    const needsCrystals = goal.type === 'memory' && // <-- кристаллы только для memory
        remaining.crystals &&
        (remaining.crystals.N > 0 || remaining.crystals.R > 0 || remaining.crystals.SR > 0);

    // Проверяем, есть ли подходящие Heartsand для замены
    const hasRelevantHeartsand =
        (needsBottles && heartsandExchange?.bottles.hasAny) ||
        (needsCredits && heartsandExchange?.credits.total > 0);

    // Проверяем, есть ли подходящие Crystal Box для замены
    const hasRelevantCrystalBox =
        needsCrystals && crystalBoxExchange?.hasAny;

    // Если нет подходящих ресурсов - не показываем блок
    if (!hasRelevantHeartsand && !hasRelevantCrystalBox) return null;

    // Формируем items для AsideList
    const asideItems = [];

    // Memory Heartsand - только если нужны Bottles или Credits
    if (hasRelevantHeartsand && heartsandExchange) {
        const heartsandContent = (
            <div className={styles.replaceableItems}>
                {/* Показываем Bottles только если они нужны (remaining.exp > 0) и есть */}
                {needsBottles && heartsandExchange.bottles.R > 0 && (
                    <div className={styles.replaceableItem}>
                        <span className={styles.itemTitle}>Bottle of Wishes</span>
                        <img src={getImageUrl('../assets/icons/bottle-r.png')} alt="Bottle R" className={styles.smallIcon} />
                        <span>R: {heartsandExchange.bottles.R}</span>
                    </div>
                )}
                {needsBottles && heartsandExchange.bottles.SR > 0 && (
                    <div className={styles.replaceableItem}>
                        <span className={styles.itemTitle}>Bottle of Wishes</span>
                        <img src={getImageUrl('../assets/icons/bottle-sr.png')} alt="Bottle SR" className={styles.smallIcon} />
                        <span>SR: {heartsandExchange.bottles.SR}</span>
                    </div>
                )}
                {needsBottles && heartsandExchange.bottles.SSR > 0 && (
                    <div className={styles.replaceableItem}>
                        <span className={styles.itemTitle}>Bottle of Wishes</span>
                        <img src={getImageUrl('../assets/icons/bottle-ssr.png')} alt="Bottle SSR" className={styles.smallIcon} />
                        <span>SSR: {heartsandExchange.bottles.SSR}</span>
                    </div>
                )}

                {/* Разделитель "or" если показываем и Bottles, и Credits */}
                {needsBottles && needsCredits &&
                    heartsandExchange.bottles.hasAny &&
                    heartsandExchange.credits.total > 0 && (
                        <span className={styles.span}> or </span>
                    )}

                {/* Показываем Credits только если они нужны (remaining.credits > 0) и есть */}
                {needsCredits && heartsandExchange.credits.total > 0 && (
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

    // Ascension Crystal Box - только если нужны Crystals
    if (hasRelevantCrystalBox && crystalBoxExchange) {
        const crystalBoxContent = (
            <div className={styles.replaceableItemsCrystal}>
                <div className={styles.replaceableItems}>
                    {/* Показываем Crystal N только если нужен N (remaining.crystals.N > 0) */}
                    {needsCrystals && remaining.crystals.N > 0 && crystalBoxExchange.box_n > 0 && (
                        <div className={styles.replaceableItem}>
                            <span className={styles.itemTitle}>Crystal</span>
                            <img src={getImageUrl('../assets/icons/crystal-box-n.png')} alt="Box N" className={styles.smallIcon} />
                            <span>N: {crystalBoxExchange.box_n}</span>
                        </div>
                    )}
                    {/* Показываем Crystal R только если нужен R (remaining.crystals.R > 0) */}
                    {needsCrystals && remaining.crystals.R > 0 && crystalBoxExchange.box_r > 0 && (
                        <div className={styles.replaceableItem}>
                            <span className={styles.itemTitle}>Crystal</span>
                            <img src={getImageUrl('../assets/icons/crystal-box-r.png')} alt="Box R" className={styles.smallIcon} />
                            <span>R: {crystalBoxExchange.box_r}</span>
                        </div>
                    )}
                    {/* Показываем Crystal SR только если нужен SR (remaining.crystals.SR > 0) */}
                    {needsCrystals && remaining.crystals.SR > 0 && crystalBoxExchange.box_sr > 0 && (
                        <div className={styles.replaceableItem}>
                            <span className={styles.itemTitle}>Crystal</span>
                            <img src={getImageUrl('../assets/icons/crystal-box-sr.png')} alt="Box SR" className={styles.smallIcon} />
                            <span>SR: {crystalBoxExchange.box_sr}</span>
                        </div>
                    )}
                </div>

                {/* General Box показываем если нужны любые кристаллы и есть General Box */}
                {needsCrystals && crystalBoxExchange.box_general > 0 && (
                    <div className={styles.replaceableItemGeneralBox}>
                        <span className={styles.itemTitle}>
                            General Box
                            <img src={getImageUrl('../assets/icons/crystal-box-general.png')} alt="Box General" className={styles.smallIcon} />
                        </span>

                        <div className={styles.boxesContainer}>
                            {/* Показываем N только если нужен N */}
                            {remaining.crystals.N > 0 && (
                                <span>N: {crystalBoxExchange.box_general_to_n}</span>
                            )}
                            {remaining.crystals.N > 0 && (remaining.crystals.R > 0 || remaining.crystals.SR > 0) && (
                                <span className={styles.span}> or </span>
                            )}
                            {/* Показываем R только если нужен R */}
                            {remaining.crystals.R > 0 && (
                                <span>R: {crystalBoxExchange.box_general_to_r}</span>
                            )}
                            {remaining.crystals.R > 0 && remaining.crystals.SR > 0 && (
                                <span className={styles.span}> or </span>
                            )}
                            {/* Показываем SR только если нужен SR */}
                            {remaining.crystals.SR > 0 && (
                                <span>SR: {crystalBoxExchange.box_general_to_sr}</span>
                            )}
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

    // Если после фильтрации нет items - не показываем
    if (asideItems.length === 0) return null;

    return (
        <AsideList
            className={styles.aside}
            title="You have replaceable resources:"
            items={asideItems}
        />
    );
}

export default AsideReplaceableResources;