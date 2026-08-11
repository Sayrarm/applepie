import {Fragment} from "react";
import {Link, Navigate, useParams} from 'react-router-dom';
import {Collapse} from 'antd';
import styles from "./Spacepedia.module.css";
import {SpacepediaNavigation} from "@components";
import {spacepediaData} from "@data";
import {getImageUrl} from "@hooks";

function Spacepedia() {
    const {navigation} = useParams(); // получаем "guidance", "message" и т.д.

    // Фильтруем статьи по navigation
    const articles = spacepediaData.filter(
        article => article.navigation === navigation
    );

    // Если нет параметра — редиректим на guidance
    if (!navigation) {
        return <Navigate to="/spacepedia/guidance" replace/>;
    }

    // Если нет выбранной навигации или нет статей
    if (!navigation || articles.length === 0) {
        return (
            <>
                <SpacepediaNavigation/>
                <div className={styles.content}>
                    <p>No articles found ¯\_(ツ)_/¯</p>
                </div>
            </>
        );
    }

    return (
        <>
            <nav className={styles.nav}>
                <Fragment>
                    <Link
                        className={styles.link}
                        to="/lore">
                        Lore
                    </Link>
                    <span> &gt; </span>
                    <span>Spacepedia</span>
                </Fragment>
            </nav>

            <SpacepediaNavigation/>

            <Collapse
                key={navigation}
                className={styles.content}
                ghost
                accordion
                items={articles.map(article => ({
                    key: article.id,
                    label: <div className={styles.title}>{article.title}</div>,
                    children: (
                        <>
                            {article.img && (
                                <img className={styles.img} src={getImageUrl(article.img)} alt={article.title} />
                            )}
                            <div className={styles.text} dangerouslySetInnerHTML={{__html: article.content}} />
                        </>
                    )
                }))}
            />

        </>
    );
}

export default Spacepedia;