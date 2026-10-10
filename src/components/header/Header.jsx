import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import ThemeToggleButton from "./ThemeToggleButton.jsx";
import TimezoneButton from "./TimezoneButton.jsx";
import { useActiveAccount } from "@hooks";
import LanguageButton from "./LanguageButton.jsx";

function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const activeAccount = useActiveAccount();

  const accountLabel = activeAccount
      ? t('nav.accountWithName', { name: activeAccount.name })
      : t('nav.account');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        setIsHidden(false);
      } else if (currentScroll > lastScroll) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Закрываем меню при клике вне области (для мобильных)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Проверяем, что меню открыто
      if (!isMenuOpen) return;

      // Проверяем, был ли клик не по бургеру и не по меню
      const isBurger = event.target.closest(`.${styles.burgerContainer}`);
      const isModal = event.target.closest(`.${styles.modalNav}`);
      if (!isBurger && !isModal) setIsMenuOpen(false);
    };

    // Добавляем обработчик
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
      <header className={isHidden ? styles.headerHidden : ""}>
        <nav className={styles.nav}>
          <div className={styles.link}>
            <NavLink className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ""}`} to="/">
              {t('nav.main')}
            </NavLink>
            <NavLink className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ""}`} to="/banners-history">
              {t('nav.banners')}
            </NavLink>
            <NavLink className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ""}`} to="/lore">
              {t('nav.lore')}
            </NavLink>
            <NavLink className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ""}`} to="/memories">
              {t('nav.memories')}
            </NavLink>
            <NavLink className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ""}`} to="/battle">
              {t('nav.battle')}
            </NavLink>
            <NavLink className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ""}`} to="/calculator">
              {t('nav.calculator')}
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ""}`}
                to="/my-account"
                title={activeAccount?.fileName || ""}
            >
              {accountLabel}
            </NavLink>
          </div>

          <div className={styles.burgerContainer}>
            <label className={styles.burger} htmlFor="burger">
              <input type="checkbox" id="burger" checked={isMenuOpen} onChange={toggleMenu} />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className={styles.buttonsChangers}>
            <TimezoneButton />
            <ThemeToggleButton />
            <LanguageButton />
          </div>

          <div className={`${styles.modalNav} ${isMenuOpen ? styles.active : ""}`}>
            <div className={styles.border}></div>
            <Link className={styles.a} to="/" onClick={closeMenu}>{t('nav.main')}</Link>
            <Link className={styles.a} to="/banners-history" onClick={closeMenu}>{t('nav.banners')}</Link>
            <Link className={styles.a} to="/lore" onClick={closeMenu}>{t('nav.lore')}</Link>
            <Link className={styles.a} to="/memories" onClick={closeMenu}>{t('nav.memories')}</Link>
            <Link className={styles.a} to="/battle" onClick={closeMenu}>{t('nav.battle')}</Link>
            <Link className={styles.a} to="/calculator" onClick={closeMenu}>{t('nav.calculator')}</Link>
            <Link
                className={styles.a}
                to="/my-account"
                onClick={closeMenu}
                title={activeAccount?.fileName || ""}
            >
              {accountLabel}
            </Link>
          </div>
        </nav>
      </header>
  );
}

export default Header;