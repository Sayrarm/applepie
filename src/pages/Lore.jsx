import {Link} from "react-router-dom";
import styles from './Lore.module.css'


function Lore() {


    return (
        <>

            <nav className={styles.nav}>
                {/*
                <Link className={styles.link} to="/main-story">
                    <div className={styles.title}>Main Story</div>
                    <img className={styles.img} src="src/assets/bg/b2_mainline_chapterbg_08.png" alt="spacepedia"/>
                </Link>
                */}
                <Link className={styles.link} to="/spacepedia">
                    <div className={styles.title}>Spacepedia</div>
                    <img className={styles.img} src="src/assets/bg/b2_mainline_chapterbg_18.png" alt="spacepedia"/>
                </Link>
                <Link className={styles.link} to="/world-underneath">
                    <div className={styles.title}>World Underneath</div>
                    <img className={styles.img} src="src/assets/bg/b2_mainline_chapterbg_09.png" alt="spacepedia"/>
                </Link>
                <Link className={styles.link} to="/anecdotes">
                    <div className={styles.title}>Anecdotes</div>
                    <img className={styles.img} src="src/assets/bg/x3_radioplay_bg.png" alt="spacepedia"/>
                </Link>
            </nav>

        </>
    )
}

export default Lore
