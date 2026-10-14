import styles from "./PairBonusBlock.module.css";
import {CardList, AsideList} from "@components";
import {useTranslation} from "react-i18next";
import {Trans} from "react-i18next";

function SolarPairBonusBlock({cardId, memoriesData, solarPairData}) {

    const {t} = useTranslation();

    // Находим пару для текущей карточки
    const solarPair = solarPairData.find((item) =>
        item.cardIds?.includes(Number(cardId)),
    );

    if (!solarPair) {
        return null;
    }

    // Находим карточки, которые относятся к этой паре
    const pairCards = memoriesData.filter((card) =>
        solarPair.cardIds.includes(card.id),
    );

    // Находим карточку-пару (все карточки, кроме текущей)
    const otherCards = pairCards.filter(
        (card) => String(card.id) !== String(cardId),
    );

    // Если нет парных карточек, не показываем блок
    if (otherCards.length === 0) {
        return null;
    }

    return (
        <AsideList
            items={[
                {
                    key: "1",
                    label: t('SolarPairBonusBlock.label'),
                    children: (
                        <>
                            <div className={styles.cards}>
                                <CardList cards={pairCards}/>
                            </div>

                            <div className={styles.companionLink4Star}>
                                <p>
                                    <Trans
                                        i18nKey="SolarPairBonusBlock.text1"
                                        components={{zero: <strong/>}}
                                    >
                                        <strong>Duo Rank 0:</strong> increases team DMG by 5%
                                    </Trans>
                                </p>
                                <p>
                                    <Trans
                                        i18nKey="SolarPairBonusBlock.text2"
                                        components={{one: <strong/>}}
                                    >
                                        <strong>Duo Rank 1:</strong> boosts Ardent Oath charge by 10%
                                    </Trans>
                                </p>
                                <p>
                                    <Trans
                                        i18nKey="SolarPairBonusBlock.text3"
                                        components={{two: <strong/>}}
                                    >
                                        <strong>Duo Rank 2:</strong> reduces team DMG taken by 5%
                                    </Trans>
                                </p>
                                <p>
                                    <Trans
                                        i18nKey="SolarPairBonusBlock.text4"
                                        components={{three: <strong/>}}
                                    >
                                        <strong>Duo Rank 3:</strong> increases team DMG by 5%
                                    </Trans>
                                </p>
                            </div>
                        </>
                    ),
                },
            ]}
        />
    );
}

export default SolarPairBonusBlock;
