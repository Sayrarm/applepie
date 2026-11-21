import { useTranslation } from "react-i18next";
import { CardList } from "@components";
import BannerPeriod from "./BannerPeriod.jsx";
import styles from "./BannerDetails.module.css";
import { memoriesData } from "@data";

function BannerDetails({ banner }) {
  const { t } = useTranslation();
  const cards = memoriesData.filter((card) =>
    banner?.cardIds?.includes(card.id),
  );

  if (!banner) return null;

  return (
    <>
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
