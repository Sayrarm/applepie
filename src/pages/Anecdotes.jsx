import styles from "./Anecdotes.module.css";
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
                        <img className={styles.img} src={category.image} alt="image"/>
                        <div className={styles.title}>{category.title}</div>
                    </Link>
                ))}
            </nav>

    );
}

export default Anecdotes;
