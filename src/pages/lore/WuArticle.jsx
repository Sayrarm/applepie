import {wuData} from '@data/lore-data/wu-data.js';
import {wuCategories} from '@data/lore-data/wu-categories.js'
import GenericArticlePage from "@components/lore-components/GenericArticlePage.jsx";
import {Link, useParams} from "react-router-dom";
import {Fragment} from "react";
import styles from "./Article.module.css";


function WuArticle() {

    const { articleLink } = useParams();

    // Находим текущую категорию
    const currentCategory = wuCategories.find(cat => cat.link === articleLink);

    return (
        <>

            <nav className={styles.nav}>
                <Fragment>
                    <Link
                        className={styles.link}
                        to="/world-underneath">
                        World Underneath
                    </Link>
                    <span> &gt; </span>
                    {currentCategory && (
                        <span>{currentCategory.title}</span>
                    )}
                </Fragment>
            </nav>

            <GenericArticlePage
                data={wuData}
                categories={wuCategories}
                linkField="link"
            />
        </>
    );
}

export default WuArticle;