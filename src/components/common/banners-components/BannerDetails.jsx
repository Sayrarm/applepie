import { useTranslation } from "react-i18next";
import { CardList } from "@components";
import BannerPeriod from "./BannerPeriod.jsx";
import styles from "./BannerDetails.module.css";

function BannerDetails({ banner, cards }) {
  const { t } = useTranslation();

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
