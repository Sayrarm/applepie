import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Article.module.css";
import { GenericArticlePage } from "@components";
import { anCategories, anData } from "@data";

function AnArticle() {
  const { articleLink } = useParams();

  // Находим текущую категорию
  const currentCategory = anCategories.find((cat) => cat.link === articleLink);

  return (
    <>
      <nav className={styles.nav}>
        <Fragment>
          <Link className={styles.link} to="/anecdotes">
            Anecdotes
          </Link>
          <span> &gt; </span>
          {currentCategory && <span>{currentCategory.title}</span>}
        </Fragment>
      </nav>

      <GenericArticlePage
        data={anData}
        categories={anCategories}
        linkField="link"
      />
    </>
  );
}

export default AnArticle;
