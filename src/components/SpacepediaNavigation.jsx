import styles from "./SpacepediaNavigation.module.css"
import { NavLink } from "react-router-dom"; // ← используем NavLink

function SpacepediaNavigation() {
    return (
        <nav className={styles.nav}>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/guidance"
            >
                Hunter's guide
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/message"
            >
                Message
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/life"
            >
                Life
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/tale"
            >
                Tale
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/note"
            >
                Note
            </NavLink>
        </nav>
    );
}

export default SpacepediaNavigation;