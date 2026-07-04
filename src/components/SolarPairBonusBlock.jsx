import CardList from "./CardList.jsx";
import styles from "./PairBonusBlock.module.css";
import AsideList from "./AsideList.jsx";

function SolarPairBonusBlock ({
                            cardId,
                            memoriesData,
                            solarPairData,
                        }) {
    // Находим пару для текущей карточки
    const solarPair = solarPairData.find(item =>
        item.cardIds?.includes(Number(cardId))
    );

    if (!solarPair) {
        return null;
    }

    // Находим карточки, которые относятся к этой паре
    const pairCards = memoriesData.filter(card =>
        solarPair.cardIds.includes(card.id)
    );

    // Находим карточку-пару (все карточки, кроме текущей)
    const otherCards = pairCards.filter(card =>
        String(card.id) !== String(cardId)
    );

    // Если нет парных карточек, не показываем блок
    if (otherCards.length === 0) {
        return null;
    }

    return (
        <AsideList
            items={[
                {
                    key: '1',
                    label: '4★ Solar Pair Bonus',
                    children: (
                        <>
                            <CardList cards={pairCards} />

                            <div className={styles.companionLink4Star}>
                                <p><strong>Duo Rank 0:</strong>  increases team DMG by 5%</p>
                                <p><strong>Duo Rank 1:</strong>  boosts Ardent Oath charge by 10%</p>
                                <p><strong>Duo Rank 2:</strong>  reduces team DMG taken by 5%</p>
                                <p><strong>Duo Rank 3:</strong>  increases team DMG by 5%</p>
                            </div>
                        </>
                    )
                }
            ]}
        />
    );
}

export default SolarPairBonusBlock;