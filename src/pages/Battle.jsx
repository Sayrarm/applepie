import styles from "./Battle.module.css";
import {compData} from "../data/comp-data.js";
import {Link} from "react-router-dom";

function Battle() {

    return (

        <nav className={styles.nav}>
            {compData.map(category => (
                <Link
                    key={category.id}
                    className={styles.link}
                    to={`/battle/${category.link}`}
                >
                    <img className={styles.img} src={category.img || category.imgWeapon} alt="image"/>
                    <div className={styles.title}>{category.companionName || category.weaponName}</div>
                </Link>
            ))}
        </nav>

    );
}

export default Battle
