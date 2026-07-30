import styles from "./Anecdotes.module.css";
import { Link } from "react-router-dom";
import {charactersCategories} from "../data/characters-categories.js";
import {getImageUrl} from "../components/imageUtils.js";
import {Fragment} from "react";

function Characters() {
    return (
        <>
            <nav className={styles.navigationTop}>
                <Fragment>
                    <Link
                        className={styles.linkTop}
                        to="/lore">
                        Lore
                    </Link>
                    <span> &gt; </span>
                    <span>Characters</span>
                </Fragment>
            </nav>

            <nav className={styles.nav}>
                {charactersCategories.map(category => (
                    <Link
                        key={category.id}
                        className={styles.link}
                        to={`/characters/${category.link}`}
                    >
                        <img className={styles.img} src={getImageUrl(category.image)} alt="image"/>
                        <div className={styles.title}>{category.title}</div>
                    </Link>
                ))}
            </nav>
        </>
    );
}

export default Characters;
