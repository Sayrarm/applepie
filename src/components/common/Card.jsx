import styles from "./Card.module.css";
import { getImageUrl } from "@hooks";
import {
  getCardLevel,
  getCardAvailability,
  getCardRank,
  getCardAscend,
} from "@localstorage";
import { formatOptionLabel, rankOptions } from "@data";

function Card({ data, isSmall = false, showUserInfo = false }) {
  const imageClass = isSmall ? styles.imgSmall : styles.img;

  const isAvailable =
    showUserInfo && data?.id ? getCardAvailability(data.id) : false;
  const userLevel = showUserInfo && data?.id ? getCardLevel(data.id) : null;
  const userRank =
    showUserInfo && data?.id && isAvailable ? getCardRank(data.id) : null;
  const rankOption =
    userRank !== null
      ? rankOptions.find((opt) => opt.value === userRank)
      : null;
  const isAscended =
    showUserInfo && data?.id && isAvailable ? getCardAscend(data.id) : false;

  return (
    <article className={styles.card}>
      <img
        className={imageClass}
        src={getImageUrl(data.imageSmall)}
        alt={data.name}
        width={248}
        height={456}
        loading="lazy"
        decoding="async"
      />

      <div className={styles.imgInfo}>
        {showUserInfo && isAvailable && (
          <div className={styles.userInfo}>
            <div className={styles.userRank}>
              {rankOption
                ? formatOptionLabel(rankOption)
                : `Rank ${userRank !== null ? userRank : 0}`}
            </div>
            <div className={styles.userLevel}>
              Lv.
              <span className={styles.level}>
                {userLevel !== null ? userLevel : 1}
              </span>
              {isAscended && <span className={styles.maxLevel}>+</span>}
            </div>
          </div>
        )}

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
  );
}

export default Card;
