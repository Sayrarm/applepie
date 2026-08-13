import { Link } from "react-router-dom";
import styles from "./Lore.module.css";
import { getImageUrl } from "@hooks";

function Lore() {
  return (
    <>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/characters">
          <div className={styles.title}>Characters</div>
          <img
            className={styles.img}
            src={getImageUrl("../assets/bg/bg-characters.jpg")}
            alt="characters"
          />
        </Link>

        <Link className={styles.link} to="/main-story">
          <div className={styles.title}>Main Story</div>
          <img
            className={styles.img}
            src={getImageUrl("../assets/bg/bg-main-story.png")}
            alt="main story"
          />
        </Link>

        <Link className={styles.link} to="/spacepedia">
          <div className={styles.title}>Spacepedia</div>
          <img
            className={styles.img}
            src={getImageUrl("../assets/bg/bg-city.png")}
            alt="spacepedia"
          />
        </Link>
        <Link className={styles.link} to="/world-underneath">
          <div className={styles.title}>World Underneath</div>
          <img
            className={styles.img}
            src={getImageUrl("../assets/bg/nightcity.png")}
            alt="spacepedia"
          />
        </Link>
        <Link className={styles.link} to="/anecdotes">
          <div className={styles.title}>Anecdotes</div>
          <img
            className={styles.img}
            src={getImageUrl("../assets/bg/bg-anecdotes.png")}
            alt="spacepedia"
          />
        </Link>
      </nav>
    </>
  );
}

export default Lore;
