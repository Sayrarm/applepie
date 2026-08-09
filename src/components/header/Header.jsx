import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import ThemeToggleButton from "./ThemeToggleButton.jsx";
import TimezoneButton from "./TimezoneButton.jsx";


function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Переключение меню
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Закрываем меню при смене страницы
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const [isHidden, setIsHidden] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);

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

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScroll]);

    // Закрываем меню при клике вне области (для мобильных)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Проверяем, что меню открыто
            if (!isMenuOpen) return;

            // Проверяем, был ли клик не по бургеру и не по меню
            const isBurger = event.target.closest(`.${styles.burgerContainer}`);
            const isModal = event.target.closest(`.${styles.modalNav}`);

            if (!isBurger && !isModal) {
                setIsMenuOpen(false);
            }
        };

        // Добавляем обработчик
        document.addEventListener('click', handleClickOutside);

        // Убираем обработчик при размонтировании
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (

        <header className={isHidden ? styles.headerHidden : ''}>
            <nav className={styles.nav}>
                <div className={styles.link}>
                    <Link className={styles.a} to="/">Main</Link>
                    <Link className={styles.a} to="/banners-history">Banners</Link>
                    <Link className={styles.a} to="/lore">Lore</Link>
                    <Link className={styles.a} to="/memories">Memories</Link>
                    <Link className={styles.a} to="/battle">Battle</Link>
                    <Link className={styles.a} to="/calculator">Calculator</Link>
                </div>

                <div className={styles.burgerContainer}>
                    <label className={styles.burger} htmlFor="burger">
                        <input type="checkbox"
                               id="burger"
                               checked={isMenuOpen}
                               onChange={toggleMenu}/>
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                <div className={styles.buttonsChangers}>
                    <TimezoneButton />
                    <ThemeToggleButton/>
                </div>

                <div className={`${styles.modalNav} ${isMenuOpen ? styles.active : ''}`}>
                    <div className={styles.border}></div>
                    <Link className={styles.a} to="/" onClick={closeMenu}>
                        Main
                    </Link>
                    <Link className={styles.a} to="/banners-history" onClick={closeMenu}>
                        Banners
                    </Link>
                    <Link className={styles.a} to="/lore" onClick={closeMenu}>
                        Lore
                    </Link>
                    <Link className={styles.a} to="/memories" onClick={closeMenu}>
                        Memories
                    </Link>
                    <Link className={styles.a} to="/battle" onClick={closeMenu}>
                        Battle
                    </Link>
                    <Link className={styles.a} to="/calculator" onClick={closeMenu}>
                        Calculator
                    </Link>
                </div>
            </nav>
        </header>


    )
}

export default Header
