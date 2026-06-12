import styles from "./Battle.module.css";
import {compData} from "../data/comp-data.js";
import {Link} from "react-router-dom";
import {getImageUrl} from "../components/imageUtils.js";
import PageLoader from "../components/PageLoader.jsx";

function Battle() {

    return (

        <PageLoader delay={300}>
            <nav className={styles.nav}>
                {compData.map(category => (
                    <Link
                        key={category.id}
                        className={styles.link}
                        to={`/battle/${category.link}`}
                    >
                        <img className={styles.img} src={getImageUrl(category.img || category.imgWeapon)} alt="image"/>
                        <div className={styles.title}>{category.companionName || category.weaponName}</div>
                    </Link>
                ))}
            </nav>
        </PageLoader>
    );
}

export default Battle
