import styles from "./Showcase.module.css";
import { ProtocoreBlock, Card } from "@components";

function RenderCardSlot({ card, placement, index, getCardData, cardModalRef }) {
  const cardData = card ? getCardData(card) : null;

  return (
    <div
      className={`${styles.cardSlot} ${!card ? styles.emptySlot : ""}`}
      onClick={() => cardModalRef?.current?.showModal(placement, index)}
    >
      {card ? (
        <>
          <div className={styles.cardSlotEquipped}>
            <div className={styles.cardWrapper}>
              <Card data={card} isSmall={false} showUserInfo={true} />
            </div>
          </div>

          <div className={styles.protocoresContainer}>
            {cardData?.protocores && cardData.protocores.length > 0 ? (
              cardData.protocores.map((protocore) => (
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
        </>
      ) : (
        <div className={styles.emptySlotContent}>
          <span>+</span>
          <span className={styles.emptyLabel}>Add {placement} card</span>
        </div>
      )}
    </div>
  );
}

export default RenderCardSlot;
