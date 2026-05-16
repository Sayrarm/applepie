import styles from './Footer.module.css'


function Footer() {

    return (

        <footer className={styles.footer}>

            <div className={styles.footerTextContainer}>
                <p>© 2026 applepie.github.io. All rights to the site's design and code are reserved.</p>
                <p>All trademarks, characters, stories, and images are the property of their respective owner, Infold
                    Games.</p>
            </div>

            <div className={styles.footerButtonContainer}>

                <button className={styles.button}>
                    <img className={styles.imgApple} src="src/assets/icons/animated_20260516_191916.gif"
                         alt="apple gif"/>
                </button>

                <a className={styles.a}
                   href={'https://t.me/helga_helheim'}
                   target="_blank">
                    <img
                        className={styles.img}
                        src="src/assets/icons/telegram_9669424.png" alt="telegram"/>
                </a>
            </div>
        </footer>

    )
}

export default Footer
