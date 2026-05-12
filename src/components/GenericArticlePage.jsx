import { useParams } from 'react-router-dom';
import styles from "./GenericArticlePage.module.css";

function GenericArticlePage({ data, categories, linkField = "link" }) {
    const { articleLink } = useParams();

    // Фильтруем статьи
    const articles = data.filter(article => article[linkField] === articleLink);

    // Находим категорию
    const category = categories?.find(cat => cat[linkField] === articleLink);

    if (articles.length === 0) {
        return <div>Статья не найдена</div>;
    }

    return (
        <div className={styles.containerArticle}>
            {/* Заголовок категории */}
            {category && (
                <div>
                    <div className={styles.mainTitle}>{category.title}</div>
                </div>
            )}
            {/* Статьи */}
            {articles.map(article => (
                <article key={article.id} className={styles.article}>
                    <div className={styles.articleTitle}>{article.serialNumber} {article.subtitle}</div>
                    <br/>
                    <div className={styles.articleText} dangerouslySetInnerHTML={{ __html: article.content }} />
                    <br/>
                </article>
            ))}
        </div>
    );
}

export default GenericArticlePage;