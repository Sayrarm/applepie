import {Navigate, useParams} from 'react-router-dom';
import SpacepediaNavigation from "../components/SpacepediaNavigation.jsx";
import {spacepediaData} from '../data/spacepedia-data.js';
import styles from "./Spacepedia.module.css";
import {Collapse} from 'antd';

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
            <SpacepediaNavigation/>

            <Collapse
                key={navigation}
                className={styles.content}
                ghost
                items={articles.map(article => ({
                    key: article.id,
                    label: <div className={styles.title}>{article.title}</div>,
                    children: <div dangerouslySetInnerHTML={{__html: article.content}}/>
                }))}
            />

        </>
    );
}

export default Spacepedia;