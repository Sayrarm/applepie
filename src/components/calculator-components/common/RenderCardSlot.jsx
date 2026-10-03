import styles from "../showcase/Showcase.module.css";
import { ProtocoreBlock, Card } from "@components";

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
  const cardData = card ? getCardData(card) : null;

  // Сортированный список протокоров для отображения
  const sortedProtocores = cardData?.protocores
      ? sortProtocoresByType(cardData.protocores)
      : [];

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
                        <div className={styles.noProtocores}>No protocores</div>
                    )}
                  </div>
              )}
            </>
        ) : (
            <div className={styles.emptySlotContent}>
              <span className={styles.emptyLabel}>+ Add {placement} Memory</span>
            </div>
        )}
      </div>
  );
}

export default RenderCardSlot;