import styles from "../showcase/Showcase.module.css";
import { ProtocoreBlock, Card, useHighlight } from "@components";
import { useTranslation } from "react-i18next";
import { STAT_ICONS } from "@data";
import { getImageUrl } from "@hooks";

// Порядок отображения протокоров: Alpha/Gamma — слева, Beta/Delta — справа
const PROTOCORE_TYPE_ORDER = { alpha: 0, gamma: 0, beta: 1, delta: 1 };

function sortProtocoresByType(protocores) {
    return [...protocores].sort(
        (a, b) =>
            (PROTOCORE_TYPE_ORDER[a.type] ?? 99) -
            (PROTOCORE_TYPE_ORDER[b.type] ?? 99),
    );
}

function RenderCardSlot({
                            card,
                            placement,
                            index,
                            getCardData,
                            cardModalRef,
                            smallCard,
                            showProtocores = true,
                            className,
                            showCardSlotEquipped = true,
                        }) {
    const { highlightedStat } = useHighlight();
    const cardData = card ? getCardData(card) : null;
    const baseStats = cardData?.baseStats;
    const { t } = useTranslation();

    // Сортированный список протокоров для отображения
    const sortedProtocores = cardData?.protocores
        ? sortProtocoresByType(cardData.protocores)
        : [];

    // Хелпер для иконки стата (обычная функция, не компонент)
    const statIcon = (statKey) => {
        const icon = STAT_ICONS[statKey];
        if (!icon) return null;
        return (
            <img
                src={getImageUrl(icon.src)}
                alt={icon.alt}
                className={styles.statIcon}
            />
        );
    };

    const cellReadOnly = (key, content, isHeader = false) => {
        const Tag = isHeader ? "th" : "td";
        const isHighlighted = highlightedStat === key;
        return (
            <Tag className={isHighlighted ? styles.highlight : ""}>
                {content}
            </Tag>
        );
    };

    return (
        <div
            className={className || `${styles.cardSlot} ${!card ? styles.emptySlot : ""}`}
            onClick={() => cardModalRef?.current?.showModal(placement, index)}
        >
            {card ? (
                <>
                    {showCardSlotEquipped ? (
                        <div className={styles.cardSlotEquipped}>
                            <div className={styles.cardWrapper}>
                                <Card data={card} isSmall={smallCard} showUserInfo={true} linkToCard={true} />
                            </div>

                            {baseStats && (
                                <table className={styles.baseStats}>
                                    <tbody>
                                    <tr>
                                        {cellReadOnly("hp", statIcon("hp"), true)}
                                        {cellReadOnly("hp", baseStats.hp)}
                                        {cellReadOnly("atk", statIcon("atk"), true)}
                                        {cellReadOnly("atk", baseStats.atk)}
                                        {cellReadOnly("def", statIcon("def"), true)}
                                        {cellReadOnly("def", baseStats.def)}
                                    </tr>
                                    <tr>
                                        {baseStats.critRate > 0 && (
                                            <>
                                                {cellReadOnly("critRate", statIcon("critRate"), true)}
                                                {cellReadOnly("critRate", `${baseStats.critRate.toFixed(2)}%`)}
                                            </>
                                        )}
                                        {baseStats.critDmg > 0 && (
                                            <>
                                                {cellReadOnly("critDmg", statIcon("critDmg"), true)}
                                                {cellReadOnly("critDmg", `${baseStats.critDmg.toFixed(2)}%`)}
                                            </>
                                        )}
                                        {cellReadOnly("dmgBoost", statIcon("dmgBoost"), true)}
                                        {cellReadOnly("dmgBoost", `${baseStats.dmgBoost.toFixed(2)}%`)}
                                    </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ) : (
                        <div className={styles.cardWrapper}>
                            <Card data={card} isSmall={smallCard} showUserInfo={true} linkToCard={true} />
                        </div>
                    )}

                    {showProtocores && (
                        <div className={styles.protocoresContainer}>
                            {sortedProtocores.length > 0 ? (
                                sortedProtocores.map((protocore) => (
                                    <div key={protocore.id} className={styles.protocoreWrapper}>
                                        <ProtocoreBlock
                                            protocore={protocore}
                                            hideChange={true}
                                            hideDelete={true}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noProtocores}>{t('RenderCardSlot.noProtocoreText')}</div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.emptySlotContent}>
                    <span className={styles.emptyLabel}>{t('RenderCardSlot.addButton', { placement: placement })}</span>
                </div>
            )}
        </div>
    );
}

export default RenderCardSlot;