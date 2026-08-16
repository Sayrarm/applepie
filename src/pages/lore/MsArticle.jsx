import { msData, msCategories } from "@data";
import { GenericArticlePage } from "@components";

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
