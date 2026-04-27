import { msData } from '../data/ms-data';
import { msCategories } from '../data/ms-categories';
import GenericArticlePage from "../components/GenericArticlePage.jsx";


function MsArticle() {
    return (
        <GenericArticlePage
            data={msData}
            categories={msCategories}
            linkField="link"
        />
    );
}

export default MsArticle;