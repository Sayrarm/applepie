import styles from './Footer.module.css'
import infoldIcon from '../assets/icons/social-media/logo-infold.png'
import GPicon from '../assets/icons/social-media/icons8-google-play-50.png'
import appstoreIcon from '../assets/icons/social-media/icons8-apple-app-store-50.png'
import fbIcon from '../assets/icons/social-media/icons8-facebook-50.png'
import tiktokIcon from '../assets/icons/social-media/icons8-tiktok-50.png'
import instaIcon from '../assets/icons/social-media/icons8-instagram-48.png'
import discordIcon from '../assets/icons/social-media/icons8-discord-50.png'
import redditIcon from '../assets/icons/social-media/icons8-reddit-50.png'
import telegramIcon from '../assets/icons/social-media/icons8-telegram-50.png'
import youtubeIcon from '../assets/icons/social-media/icons8-youtube-play-50.png'
import logoApple from '../assets/icons/animated_20260516_191916.gif'



function Footer() {

    return (

        <footer className={styles.footer}>

            <div className={styles.footerTextContainer}>
                <p>© 2026 applepie.github.io.</p>
                <p>All trademarks, characters, stories, and images are the property of their respective owner, Infold
                    Games.</p>
                <p>Icons by <a className={styles.a} target="_blank" href="https://icons8.com">Icons8.com</a></p>
            </div>

            <div className={styles.footerMediaContainer}>
                <a className={styles.a}
                   href={'https://loveanddeepspace.infoldgames.com/'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={infoldIcon} alt="infold icon"/>
                </a>
                <a className={styles.a}
                   href={'https://play.google.com/store/apps/details?id=com.papegames.lysk.en'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={GPicon} alt="google play icon"/>
                </a>
                <a className={styles.a}
                   href={'https://apps.apple.com/us/app/love-and-deepspace/id6443467666'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={appstoreIcon} alt="app store icon"/>
                </a>
                <a className={styles.a}
                   href={'https://www.facebook.com/LoveandDeepspaceEN'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={fbIcon} alt="facebook icon"/>
                </a>
                <a className={styles.a}
                   href={'https://www.tiktok.com/@loveanddeepspace'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={tiktokIcon} alt="tiktok icon"/>
                </a>
                <a className={styles.a}
                   href={'https://www.instagram.com/loveanddeepspace/#'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={instaIcon} alt="instagram icon"/>
                </a>
                <a className={styles.a}
                   href={'https://discord.gg/loveanddeepspace'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={discordIcon} alt="discord icon"/>
                </a>
                <a className={styles.a}
                   href={'https://www.reddit.com/r/LoveAndDeepspace/'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={redditIcon} alt="reddit icon"/>
                </a>
                <a className={styles.a}
                   href={'https://www.youtube.com/@LoveandDeepspace'}
                   target="_blank">
                    <img
                        className={styles.imgMedia}
                        src={youtubeIcon} alt="youtube icon"/>
                </a>
            </div>

            <div className={styles.footerButtonContainer}>

                <button className={styles.button}>
                    <img className={styles.imgApple} src={logoApple}
                         alt="apple gif"/>
                </button>

                <a className={styles.a}
                   href={'https://t.me/+Ime0QDgmW05kZmIy'}
                   target="_blank">
                    <img
                        className={styles.imgTel}
                        src={telegramIcon} alt="telegram"/>
                </a>
            </div>
        </footer>

    )
}

export default Footer
