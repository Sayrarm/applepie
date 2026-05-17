import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {useState} from "react";


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

    return (

        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link className={styles.logo} to="/">
                    <img
                        src="/apple-logo.png"
                        alt="logo"
                        width={75}
                        height={70}/>
                </Link>
                <div className={styles.link}>
                    <Link className={styles.a} to="/">Home</Link>
                    <Link className={styles.a} to="/memories">Memories</Link>
                    <Link className={styles.a} to="/characters">Characters</Link>
                    <Link className={styles.a} to="/battle">Battle</Link>
                    <Link className={styles.a} to="/lore">Lore</Link>
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

                <div className={`${styles.modalNav} ${isMenuOpen ? styles.active : ''}`}>
                    <div className={styles.border}></div>
                    <Link className={styles.a} to="/" onClick={closeMenu}>
                        Home
                    </Link>
                    <Link className={styles.a} to="/memories" onClick={closeMenu}>
                        Memories
                    </Link>
                    <Link className={styles.a} to="/characters" onClick={closeMenu}>
                        Characters
                    </Link>
                    <Link className={styles.a} to="/battle" onClick={closeMenu}>
                        Battle
                    </Link>
                    <Link className={styles.a} to="/lore" onClick={closeMenu}>
                        Lore
                    </Link>
                </div>
            </nav>
        </header>


    )
}

export default Header
