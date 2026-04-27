import styles from "./WorldUnderneath.module.css";
import { Link } from "react-router-dom";
import { wuCategories } from "../data/wu-categories";
import PageLoader from '../components/PageLoader';

function WorldUnderneath() {
    return (
        <PageLoader delay={1000}>
        <nav className={styles.nav}>
            {wuCategories.map(category => (
                <Link
                    key={category.id}
                    className={styles.link}
                    to={`/world-underneath/${category.link}`}
                >
                    <img src={category.image} alt="image"/>
                    <div className={styles.title}>{category.title}</div>
                </Link>
            ))}
        </nav>
        </PageLoader>
    );
}

export default WorldUnderneath;
