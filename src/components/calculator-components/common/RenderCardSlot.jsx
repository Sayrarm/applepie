import styles from "./RenderCardSlot.module.css";
import { ProtocoreBlock, Card, useHighlight } from "@components";
import { useTranslation } from "react-i18next";
import { getDmgBoostGrowth, STAT_ICONS } from "@data";
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
                            miniMode = false,
                            showProtocores = true,
                            className,
                            showCardSlotEquipped = true,
                        }) {
    const { highlightedStat } = useHighlight();
    const cardData = card ? getCardData(card) : null;
    const baseStats = cardData?.baseStats;
    const protocores = cardData?.protocores;
    const finalStats = cardData?.stats;

    // Считаем прирост
    const dmgBoostGrowth = cardData
        ? getDmgBoostGrowth(card, baseStats, protocores)
        : 0;

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

    // Блок статов (теперь принимает нужный объект статов + вариант оформления)
    const renderBaseStats = (statsToShow, isFinal = false, variant = "full") => {
        if (!statsToShow) return null;

        // Наборы классов под каждый вариант
        const c = variant === "mini"
            ? {
                container: styles.baseStatsContainerMini,
                row: styles.statsRowMini,
                cell: styles.statCellMini,
                iconWrap: styles.statIconWrapMini,
                value: styles.statValueMini,
            }
            : {
                container: styles.baseStatsContainer,
                row: styles.statsRow,
                cell: styles.statCell,
                iconWrap: styles.statIconWrap,
                value: styles.statValue,
            };

        return (
            <div className={c.container}>
                {/* Ряд 1: HP, ATK, DEF */}
                <div className={c.row}>
                    <div className={`${c.cell} ${highlightedStat === "hp" ? styles.highlight : ""}`}>
                        <div className={c.iconWrap}>{statIcon("hp")}</div>
                        <div className={c.value}>{statsToShow.hp}</div>
                    </div>
                    <div className={`${c.cell} ${highlightedStat === "atk" ? styles.highlight : ""}`}>
                        <div className={c.iconWrap}>{statIcon("atk")}</div>
                        <div className={c.value}>{statsToShow.atk}</div>
                    </div>
                    <div className={`${c.cell} ${highlightedStat === "def" ? styles.highlight : ""}`}>
                        <div className={c.iconWrap}>{statIcon("def")}</div>
                        <div className={c.value}>{statsToShow.def}</div>
                    </div>
                </div>

                {/* Ряд 2: CR, CD, DMG Boost */}
                <div className={c.row}>
                    {statsToShow.critRate > 0 && (
                        <div className={`${c.cell} ${highlightedStat === "critRate" ? styles.highlight : ""}`}>
                            <div className={c.iconWrap}>{statIcon("critRate")}</div>
                            <div className={c.value}>{statsToShow.critRate.toFixed(2)}%</div>
                        </div>
                    )}
                    {statsToShow.critDmg > 0 && (
                        <div className={`${c.cell} ${highlightedStat === "critDmg" ? styles.highlight : ""}`}>
                            <div className={c.iconWrap}>{statIcon("critDmg")}</div>
                            <div className={c.value}>{statsToShow.critDmg.toFixed(2)}%</div>
                        </div>
                    )}
                    <div className={`${c.cell} ${highlightedStat === "dmgBoost" ? styles.highlight : ""}`}>
                        <div className={c.iconWrap}>{statIcon("dmgBoost")}</div>
                        <div className={c.value}>
                            {isFinal
                                ? `${statsToShow.dmgBoost.toFixed(2)}%`
                                : `${baseStats.dmgBoost.toFixed(2)}%${dmgBoostGrowth > 0.01 ? ` + ${dmgBoostGrowth.toFixed(2)}%` : ""}`
                            }
                        </div>
                    </div>

                    {variant === "mini" && (
                        <>
                            <div className={`${c.cell} ${highlightedStat === "oathStrength" ? styles.highlight : ""}`}>
                                <div className={c.iconWrap}>{statIcon("oathStrength")}</div>
                                <div className={c.value}>{statsToShow.oathStrength.toFixed(2)}%</div>
                            </div>
                            <div className={`${c.cell} ${highlightedStat === "oathRecoveryBoost" ? styles.highlight : ""}`}>
                                <div className={c.iconWrap}>{statIcon("oathRecoveryBoost")}</div>
                                <div className={c.value}>{statsToShow.oathRecoveryBoost.toFixed(2)}%</div>
                            </div>
                            <div className={`${c.cell} ${highlightedStat === "expeditedEnergyBoost" ? styles.highlight : ""}`}>
                                <div className={c.iconWrap}>{statIcon("expeditedEnergyBoost")}</div>
                                <div className={c.value}>{statsToShow.expeditedEnergyBoost.toFixed(2)}%</div>
                            </div>
                        </>
                    )}
                </div>

                {/* Ряд 3: Oath Strength, Oath Recovery Boost, Expedited Energy Boost (ТОЛЬКО В MINI) */}

            </div>
        );
    };

    // ===== MINI-РЕЖИМ =====
    if (miniMode) {
        return (
            <div
                className={`${styles.cardSlot} ${styles.cardSlotMini} ${!card ? styles.emptySlot : ""}`}
                onClick={() => cardModalRef?.current?.showModal(placement, index)}
            >
                {card ? (
                    <div className={styles.miniModeContainer}>
                        <div className={styles.cardWrapper}>
                            <Card data={card} isSmall={true} showUserInfo={true} linkToCard={true} />
                        </div>
                        {/* Показываем финальные статы (base + protocores) */}
                        {renderBaseStats(finalStats, true, "mini")}
                    </div>
                ) : (
                    <div className={styles.emptySlotContent}>
                        <span className={styles.emptyLabel}>{t('RenderCardSlot.addButton', { placement: placement })}</span>
                    </div>
                )}
            </div>
        );
    }

    // ===== FULL-РЕЖИМ =====
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
                            {/* Показываем базовые статы + разбивку */}
                            {renderBaseStats(baseStats, false)}
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