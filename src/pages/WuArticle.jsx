import { wuData } from '../data/wu-data';
import { wuCategories } from '../data/wu-categories.js'
import GenericArticlePage from "./GenericArticlePage.jsx";


function WuArticle() {

    return (
        <GenericArticlePage
            data={wuData}
            categories={wuCategories}
            linkField="link"
        />
    );
}

export default WuArticle;