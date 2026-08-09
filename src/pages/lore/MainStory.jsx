import styles from "./MainStory.module.css";
import {msCategories} from "@data/lore-data/ms-categories.js";
import {Link} from "react-router-dom";
import {getImageUrl} from "@hooks/imageUtils.js";


function MainStory() {

    return (
        <nav className={styles.nav}>
            {msCategories.map(category => (
                <Link
                    key={category.id}
                    className={styles.link}
                    to={`/main-story/${category.link}`}
                >
                    <img className={styles.img} src={getImageUrl(category.image)} alt="image"/>
                    <div className={styles.title}>{category.title}</div>
                </Link>
            ))}
        </nav>
    );
}

export default MainStory
