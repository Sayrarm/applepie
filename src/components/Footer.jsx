import styles from './Footer.module.css'
import {getImageUrl} from "./imageUtils.js";



function Footer() {

    return (

        <footer className={styles.footer}>

            <div className={styles.footerMediaContainer}>
                Official links:
                <div className={styles.borderHorizontal}></div>
                <p>Download the game on the website</p>
                <a className={styles.a}
                   href={'https://play.google.com/store/apps/details?id=com.papegames.lysk.en'}
                   target="_blank">
                    play.google.com
                </a>
                <a className={styles.a}
                   href={'https://apps.apple.com/us/app/love-and-deepspace/id6443467666'}
                   target="_blank">
                    apps.apple.com
                </a>
                <div className={styles.borderHorizontalDashed}></div>
                <a className={styles.a}
                   href={'https://loveanddeepspace.infoldgames.com/'}
                   target="_blank">
                    loveanddeepspace.infoldgames.com
                </a>
                <a className={styles.a}
                   href={'https://www.facebook.com/LoveandDeepspaceEN'}
                   target="_blank">
                    facebook.com
                </a>
                <a className={styles.a}
                   href={'https://www.tiktok.com/@loveanddeepspace'}
                   target="_blank">
                    tiktok.com
                </a>
                <a className={styles.a}
                   href={'https://www.instagram.com/loveanddeepspace/#'}
                   target="_blank">
                    instagram.com
                </a>
                <a className={styles.a}
                   href={'https://discord.gg/loveanddeepspace'}
                   target="_blank">
                    discord.gg
                </a>
                <a className={styles.a}
                   href={'https://www.reddit.com/r/LoveAndDeepspace/'}
                   target="_blank">
                    reddit.com
                </a>
                <a className={styles.a}
                   href={'https://www.youtube.com/@LoveandDeepspace'}
                   target="_blank">
                    youtube.com
                </a>
            </div>

            <div className={styles.footerTextContainer}>
                <p>© 2026 sayrarm.github.io</p>
                <div className={styles.borderHorizontal}></div>
                <p>All trademarks, characters, stories and images are the property of their respective owner, Infold
                    Games.</p>
                <br className={styles.br}/>
                <p>The site was created for informational purposes only.  For non-commercial use.</p>
                <div className={styles.borderHorizontalDashed}></div>
                <a className={styles.a} href="https://t.me/+Ime0QDgmW05kZmIy" target="_blank">Contact the developer and find out the latest news</a>
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
