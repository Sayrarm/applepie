import styles from "./SpacepediaNavigation.module.css";
import { NavLink } from "react-router-dom";

function SpacepediaNavigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        className={({ isActive }) =>
          `${styles.a} ${isActive ? styles.active : ""}`
        }
        to="/lore/spacepedia/guidance"
      >
        Hunter's guide
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.a} ${isActive ? styles.active : ""}`
        }
        to="/lore/spacepedia/message"
      >
        Deepspace Messages
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.a} ${isActive ? styles.active : ""}`
        }
        to="/lore/spacepedia/life"
      >
        Life At Linkon
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.a} ${isActive ? styles.active : ""}`
        }
        to="/lore/spacepedia/tale"
      >
        Tales
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.a} ${isActive ? styles.active : ""}`
        }
        to="/lore/spacepedia/note"
      >
        My Notes
      </NavLink>
    </nav>
  );
}

export default SpacepediaNavigation;
