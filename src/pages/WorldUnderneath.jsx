import styles from "./WorldUnderneath.module.css";
import { Link } from "react-router-dom";
import { categories } from "../data/wu-categories"; // импортируем категории

function WorldUnderneath() {
    return (
        <nav className={styles.nav}>
            {categories.map(category => (
                <Link
                    key={category.id}
                    className={styles.link}
                    to={`/world/${category.link}`}  // ← /world/lf, /world/st и т.д.
                >
                    {category.title}
                </Link>
            ))}
        </nav>
    );
}

export default WorldUnderneath;
