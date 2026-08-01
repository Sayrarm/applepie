import {Link, useParams} from "react-router-dom";
import {Fragment} from "react";
import styles from "./Article.module.css";
import {charactersCategories} from "../data/characters-categories.js";
import CharacterArticlePage from "../components/CharacterArticlePage.jsx";



function CharacterArticle() {

    const { articleLink } = useParams();

    // Находим текущую категорию
    const currentCategory = charactersCategories.find(cat => cat.link === articleLink);

    return (
        <>

            <nav className={styles.nav}>
                <Fragment>
                    <Link
                        className={styles.link}
                        to="/characters">
                        Characters
                    </Link>
                    <span> &gt; </span>
                    {currentCategory && (
                        <span>{currentCategory.title}</span>
                    )}
                </Fragment>
            </nav>

            <CharacterArticlePage />
        </>
    );
}

export default CharacterArticle;