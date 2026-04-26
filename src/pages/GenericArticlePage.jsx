import { useParams } from 'react-router-dom';

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
        <div>
            {/* Заголовок категории */}
            {category && (
                <div className="categoryHeader">
                    <div>{category.title}</div>
                </div>
            )}
            <br/>
            {/* Статьи */}
            {articles.map(article => (
                <article key={article.id}>
                    <div>{article.serialNumber} {article.subtitle}</div>
                    <br/>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    <br/>
                </article>
            ))}
        </div>
    );
}

export default GenericArticlePage;