import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./WorldUnderneath.module.css";
import { wuCategories } from "@data";
import { getImageUrl } from "@hooks";

function WorldUnderneath() {
  return (
    <>
      <nav className={styles.navigationTop}>
        <Fragment>
          <Link className={styles.linkTop} to="/lore">
            Lore
          </Link>
          <span> &gt; </span>
          <span>World Underneath</span>
        </Fragment>
      </nav>

      <nav className={styles.nav}>
        {wuCategories.map((category) => (
          <Link
            key={category.id}
            className={styles.link}
            to={`/world-underneath/${category.link}`}
          >
            <img
              className={styles.img}
              src={getImageUrl(category.image)}
              alt="image"
              loading="lazy"
              decoding="async"
            />
            <div className={styles.title}>
              {category.id}. {category.title}
            </div>
          </Link>
        ))}
      </nav>
    </>
  );
}

export default WorldUnderneath;
