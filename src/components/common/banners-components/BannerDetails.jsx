import { useTranslation } from "react-i18next";
import { CardList } from "@components";
import BannerPeriod from "./BannerPeriod.jsx";
import styles from "./BannerDetails.module.css";
import { memoriesData } from "@data";
import { getImageUrl } from "@hooks";

function BannerDetails({ banner }) {
  const { t } = useTranslation();
  if (!banner) return null;

  const cards = memoriesData.filter((card) =>
    banner.cardIds?.includes(card.id),
  );

  const isEvent = banner.source === "events";

  return (
    <>
      {isEvent && banner.image && (
        <img
          src={getImageUrl(banner.image)}
          alt={banner.name}
          className={styles.eventImage}
          loading="lazy"
        />
      )}
      {isEvent && banner.text && (
        <p className={styles.eventText}>{banner.text}</p>
      )}
      <CardList cards={cards} />
      <BannerPeriod banners={[banner]} />
      {banner.link && (
        <a
          href={banner.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bannerLink}
        >
          {t("BannerDetails.linkWiki")}
        </a>
      )}
    </>
  );
}

export default BannerDetails;
