import GenericArticlePage from "@components/lore-components/GenericArticlePage.jsx";
import {Link, useParams} from "react-router-dom";
import {Fragment} from "react";
import styles from "./Article.module.css";
import {anCategories} from "@data/lore-data/an-categories.js";
import {anData} from "@data/lore-data/an-data.js";


function AnArticle() {

    const { articleLink } = useParams();

    // Находим текущую категорию
    const currentCategory = anCategories.find(cat => cat.link === articleLink);

    return (
        <>

            <nav className={styles.nav}>
                <Fragment>
                    <Link
                        className={styles.link}
                        to="/anecdotes">
                        Anecdotes
                    </Link>
                    <span> &gt; </span>
                    {currentCategory && (
                        <span>{currentCategory.title}</span>
                    )}
                </Fragment>
            </nav>

            <GenericArticlePage
                data={anData}
                categories={anCategories}
                linkField="link"
            />
        </>
    );
}

export default AnArticle;