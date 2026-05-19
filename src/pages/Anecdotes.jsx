import styles from "./WorldUnderneath.module.css";
import { Link } from "react-router-dom";
import {anCategories} from "../data/an-categories.js";

function Anecdotes() {
    return (

            <nav className={styles.nav}>
                {anCategories.map(category => (
                    <Link
                        key={category.id}
                        className={styles.link}
                        to={`/anecdotes/${category.link}`}
                    >
                        <img src={category.image} alt="image"/>
                        <div className={styles.title}>{category.id}. {category.title}</div>
                    </Link>
                ))}
            </nav>

    );
}

export default Anecdotes;
