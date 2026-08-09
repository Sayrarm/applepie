import styles from "./Anecdotes.module.css";
import { Link } from "react-router-dom";
import {anCategories} from "@data/lore-data/an-categories.js";
import {getImageUrl} from "@hooks/imageUtils.js";
import {Fragment} from "react";

function Anecdotes() {
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
                    <span>Anecdotes</span>
                </Fragment>
            </nav>

            <nav className={styles.nav}>
                {anCategories.map(category => (
                    <Link
                        key={category.id}
                        className={styles.link}
                        to={`/anecdotes/${category.link}`}
                    >
                        <img className={styles.img} src={getImageUrl(category.image)} alt="image"/>
                        <div className={styles.title}>{category.title}</div>
                    </Link>
                ))}
            </nav>
        </>
    );
}

export default Anecdotes;
