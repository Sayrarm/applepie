import { Link } from "react-router-dom";
import styles from "./PairBonusBlock.module.css";
import { CardList, AsideList } from "@components";
import { useTranslation } from "react-i18next";

function PairBonusBlock({
  cardId, // ID текущей карточки
  compData, // Данные компаньонов
  memoriesData, // Данные всех карточек
}) {
  const { t } = useTranslation();

  // Находим компаньона, у которого в cardIds есть текущая карточка
  const companion = compData.find((item) =>
    item.cardIds?.includes(Number(cardId)),
  );

  // Если компаньон не найден или нет карточек для пары
  if (!companion || !companion.cardIds || companion.cardIds.length < 2) {
    return null;
  }

  // Находим карточки, которые относятся к этому компаньону (все, включая текущую)
  const companionCards = memoriesData.filter((card) =>
    companion.cardIds.includes(card.id),
  );

  // Находим карточку-пару (все карточки, кроме текущей)
  const pairCards = companionCards.filter(
    (card) => String(card.id) !== String(cardId),
  );

  // Если нет парных карточек, не показываем блок
  if (pairCards.length === 0) {
    return null;
  }

  return (
    <AsideList
      items={[
        {
          key: "1",
          label: t('PairBonusBlock.label'),
          children: (
            <>
              <div className={styles.cards}>
                <CardList cards={companionCards} />
              </div>

              <div className={styles.companionLink}>
                <p>{t('PairBonusBlock.textInfo')}</p>
                <Link
                  to={`/battle/${companion.link}`}
                  className={styles.companionLinkText}
                >
                  {companion.companionName || companion.weaponName}
                </Link>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}

export default PairBonusBlock;
