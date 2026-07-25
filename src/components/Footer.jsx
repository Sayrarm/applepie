import styles from './Footer.module.css'
import {getImageUrl} from "./imageUtils.js";
import {Link} from "react-router-dom";



function Footer() {

    return (

        <footer className={styles.footer}>

            <div className={styles.footerMediaContainer}>
                General information:
                <div className={styles.borderHorizontal}></div>
                <Link className={styles.a} to="/about">About Project</Link>
                <Link className={styles.a} to="/faq">FAQ</Link>
                <div className={styles.borderHorizontalDashed}></div>
                <a className={styles.a}
                   href={'https://t.me/+Ime0QDgmW05kZmIy'}
                   target="_blank">
                    Telegram Group
                </a>
            </div>

            <div className={styles.footerTextContainer}>
                <p>© 2026 sayrarm.github.io</p>
                <div className={styles.borderHorizontal}></div>
                <p>All trademarks, characters, stories and images are the property of their respective owner, Infold
                    Games.</p>
                <br className={styles.br}/>
                <p>The site was created for informational purposes only.  For non-commercial use.</p>

            </div>

            <div className={styles.footerButtonContainer}>

                <button className={styles.button}>
                    <img className={styles.imgApple} src={getImageUrl('../assets/icons/animated_20260516_191916.gif')}
                         alt="apple gif"/>
                </button>
            </div>
        </footer>

    )
}

export default Footer
