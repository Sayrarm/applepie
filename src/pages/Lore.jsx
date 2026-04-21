import {Link} from "react-router-dom";
import styles from './Lore.module.css'


function Lore() {


    return (
        <>
            <div>Lore</div>
            <nav className={styles.nav}>
                <Link className={styles.link} to="/spacepedia">Spacepedia</Link>
                <Link className={styles.link} to="/world-underneath">World Underneath</Link>
                <Link className={styles.link} to="/main-story">Main Story</Link>
            </nav>
        </>
    )
}

export default Lore
