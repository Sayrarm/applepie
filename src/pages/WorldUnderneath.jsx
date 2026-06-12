import styles from "./WorldUnderneath.module.css";
import {Link} from "react-router-dom";
import {wuCategories} from "../data/wu-categories";
import PageLoader from '../components/PageLoader';
import {getImageUrl} from "../components/imageUtils.js";
import {Fragment} from "react";

function WorldUnderneath() {
    return (
        <PageLoader delay={300}>
            <nav className={styles.navigationTop}>
                <Fragment>
                    <Link
                        className={styles.linkTop}
                        to="/lore">
                        Lore
                    </Link>
                    <span> &gt; </span>
                    <span>World Underneath</span>
                </Fragment>
            </nav>

            <nav className={styles.nav}>
                {wuCategories.map(category => (
                    <Link
                        key={category.id}
                        className={styles.link}
                        to={`/world-underneath/${category.link}`}
                    >
                        <img src={getImageUrl(category.image)} alt="image"/>
                        <div className={styles.title}>{category.id}. {category.title}</div>
                    </Link>
                ))}
            </nav>
        </PageLoader>
    );
}

export default WorldUnderneath;
