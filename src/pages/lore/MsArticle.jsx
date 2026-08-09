import { msData } from '@data/lore-data/ms-data.js';
import { msCategories } from '@data/lore-data/ms-categories.js';
import GenericArticlePage from "@components/lore-components/GenericArticlePage.jsx";


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