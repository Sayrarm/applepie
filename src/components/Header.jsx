import styles from './Header.module.css'
import {Link} from "react-router-dom";


function Header() {


    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link className={styles.logo} to="/">
                        <img
                            src="/apple_1010706.png" alt="logo"
                            width={50}
                            height={50}/>
                    </Link>
                    <div className={styles.link}>
                        <Link className={styles.a} to="/memories">Memories</Link>
                        <Link className={styles.a} to="/characters">Characters</Link>
                        <Link className={styles.a} to="/hunter-contest">Hunter Contest</Link>
                        <Link className={styles.a} to="/lore">Lore</Link>
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Header
