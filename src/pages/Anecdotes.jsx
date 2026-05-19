import styles from "./WorldUnderneath.module.css";
import { Link } from "react-router-dom";
import { wuCategories } from "../data/wu-categories";

function Anecdotes() {
    return (

            <nav className={styles.nav}>
                {wuCategories.map(category => (
                    <Link
                        key={category.id}
                        className={styles.link}
                        to={`/world-underneath/${category.link}`}
                    >
                        <img src={category.image} alt="image"/>
                        <div className={styles.title}>{category.id}. {category.title}</div>
                    </Link>
                ))}
            </nav>

    );
}

export default Anecdotes;
