import { useParams } from 'react-router-dom';
import { wuData } from '../data/wu-data';
import { wuCategories } from '../data/wu-categories.js'

function WuArticle() {
    const { articleLink } = useParams();

    // Просто фильтруем данные напрямую — без useEffect!
    const articles = wuData.filter(article => article.link === articleLink);
    const categories = wuCategories.find(category => category.link === articleLink);

    if (articles.length === 0) {
        return <div>Статья не найдена</div>;
    }

    return (
        <div>
            {/* Заголовок категории */}
            {categories && (
                <div className="categoryHeader">
                    <div>{categories.title}</div>
                </div>
            )}

            {/* Статьи */}
            {articles.map(article => (
                <article key={article.id}>
                    <div>{article.subtitle}</div>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </article>
            ))}
        </div>
    );
}

export default WuArticle;