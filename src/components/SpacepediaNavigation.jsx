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
                Deepspace Messages
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/life"
            >
                Life At Linkon
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/tale"
            >
                Tales
            </NavLink>
            <NavLink
                className={({ isActive }) => `${styles.a} ${isActive ? styles.active : ''}`}
                to="/spacepedia/note"
            >
                My Notes
            </NavLink>
        </nav>
    );
}

export default SpacepediaNavigation;