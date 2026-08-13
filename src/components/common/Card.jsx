import styles from "./Card.module.css";
import { getImageUrl } from "@hooks";

function Card({ data, isSmall = false }) {
  const imageClass = isSmall ? styles.imgSmall : styles.img;

  return (
    <>
      <article className={styles.card}>
        <img
          className={imageClass}
          src={getImageUrl(data.imageSmall)}
          alt={data.name}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.imgInfo}>
          <div className={styles.starsGroup}>
            {[...Array(data.rarityStars)].map((_, i) => (
              <img
                className={styles.stars}
                key={i}
                src={getImageUrl(data.rarity)}
                alt={data.rarityName}
                width={15}
                height={15}
              />
            ))}
          </div>
          <img
            className={styles.stella}
            src={getImageUrl(data.stella)}
            alt={data.stellaName}
            width={22}
            height={22}
          />
          <img
            className={styles.placement}
            src={getImageUrl(data.placement)}
            alt={data.placementName}
            width={22}
            height={22}
          />
          <img
            className={styles.talent}
            src={getImageUrl(data.talent)}
            alt={data.talentName}
            width={22}
            height={22}
          />

          <div className={styles.parametrsBG}></div>
        </div>

        <p className={styles.cardName}>
          {data.char}: {data.name}
        </p>
      </article>
    </>
  );
}

export default Card;
