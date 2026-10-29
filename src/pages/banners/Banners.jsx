import styles from "./Banners.module.css";
import { useTranslation } from "react-i18next";
import {NavLink, Outlet} from "react-router-dom";

function AllBannersPage() {
    const { t } = useTranslation();

  return (
      <section className={styles.containerBanners}>
          <div className={styles.tabs}>
              <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                       to="/banners-history/all-banners">
                  {t('Banners.allBanners')}
              </NavLink>
              <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                       to="/banners-history/all-promises">
                  {t('Banners.allPromises')}
              </NavLink>
              <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                       to="/banners-history/banners-calendar">
                  {t('Banners.calendar')}
              </NavLink>
          </div>

          <div className={styles.tabContent}>
              <Outlet/>
          </div>
      </section>
  );
}

export default AllBannersPage;
