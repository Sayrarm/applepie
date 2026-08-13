import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Article.module.css";
import { wuData, wuCategories } from "@data";
import { GenericArticlePage } from "@components";

function WuArticle() {
  const { articleLink } = useParams();

  // Находим текущую категорию
  const currentCategory = wuCategories.find((cat) => cat.link === articleLink);

  return (
    <>
      <nav className={styles.nav}>
        <Fragment>
          <Link className={styles.link} to="/world-underneath">
            World Underneath
          </Link>
          <span> &gt; </span>
          {currentCategory && <span>{currentCategory.title}</span>}
        </Fragment>
      </nav>

      <GenericArticlePage
        data={wuData}
        categories={wuCategories}
        linkField="link"
      />
    </>
  );
}

export default WuArticle;
