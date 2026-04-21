import { useParams } from 'react-router-dom';
import { wuData } from '../data/wu-data';

function WuArticle() {
    const { articleLink } = useParams();

    // Просто фильтруем данные напрямую — без useEffect!
    const articles = wuData.filter(article => article.link === articleLink);

    if (articles.length === 0) {
        return <div>Статья не найдена</div>;
    }

    return (
        <div>
            {articles.map(article => (
                <article key={article.id}>
                    <h2>{article.subtitle}</h2>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </article>
            ))}
        </div>
    );
}

export default WuArticle;