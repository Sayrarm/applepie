import {Link} from "react-router-dom";
import styles from './Lore.module.css'
import PageLoader from '../components/PageLoader';


function Lore() {


    return (
        <>
            <PageLoader delay={1000}>
            <nav className={styles.nav}>
                <Link className={styles.link} to="/spacepedia">
                    <img className={styles.img} src="src/assets/bg/b2_mainline_chapterbg_18.png" alt="spacepedia"/>
                    <div className={styles.title}>Spacepedia</div></Link>
                <Link className={styles.link} to="/world-underneath">
                    <img className={styles.img} src="src/assets/bg/b2_mainline_chapterbg_09.png" alt="spacepedia"/>
                    <div className={styles.title}>World Underneath</div></Link>
                <Link className={styles.link} to="/main-story">
                    <img className={styles.img} src="src/assets/bg/b2_mainline_chapterbg_08.png" alt="spacepedia"/>
                    <div className={styles.title}> Main Story</div>
                   </Link>
            </nav>
            </PageLoader>
        </>
    )
}

export default Lore
