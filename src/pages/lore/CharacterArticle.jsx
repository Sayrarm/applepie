import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./CharacterArticle.module.css";
import { charactersCategories } from "@data";
import { CharacterArticlePage, AsideList } from "@components";
import { useTranslation } from "react-i18next";

function CharacterArticle() {
  const { articleLink } = useParams();
  const { t } = useTranslation();

  // Находим текущую категорию
  const currentCategory = charactersCategories.find(
    (cat) => cat.link === articleLink,
  );

  const items = [
    {
      key: "1",
      label: t('CharacterArticle.label'),
      children: (
        <div className={styles.disclaimerContent}>
          <strong className={styles.titleMain}>
              {t('CharacterArticle.titleMain')}
          </strong>
          <p>
            <strong>Main Story</strong> {t('CharacterArticle.main')}
          </p>
          <p>
            <strong>Bond</strong> {t('CharacterArticle.bond')}
          </p>
          <p>
            <strong>World Underneath</strong> {t('CharacterArticle.wu')}
          </p>
          <p>
            <strong>Anecdotes</strong> {t('CharacterArticle.anecdotes')}
          </p>
          <p>
            <strong>Myths</strong> {t('CharacterArticle.myths')}
          </p>
          <p>
            <strong>Memoria</strong> {t('CharacterArticle.memoria')}
          </p>
          <p>
            <strong>Tender Moments</strong> {t('CharacterArticle.tm')}
          </p>
          <p>
            <strong>Secret Times</strong> {t('CharacterArticle.st')}
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <nav className={styles.nav}>
        <Fragment>
          <Link className={styles.link} to="/lore/characters">
            Characters
          </Link>
          <span> &gt; </span>
          {currentCategory && <span>{currentCategory.title}</span>}
        </Fragment>
      </nav>

      <div className={styles.titleAndDisclaimer}>
        <AsideList items={items} />
      </div>

      <CharacterArticlePage />
    </>
  );
}

export default CharacterArticle;
