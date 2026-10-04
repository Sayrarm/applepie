import { NavLink, Outlet } from "react-router-dom";
import styles from "@pages/CalculatorAndAccountPage.module.css";

function OptimizerNavigation() {
    return (
        <div className={styles.optimizerContainer}>
            <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`} to="/calculator/optimizer/team-optimizer">
                Team Optimizer
            </NavLink>
            <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`} to="/calculator/optimizer/memory-optimizer">
                Memory Optimizer
            </NavLink>

            <div className={styles.tabContentOptimizer}>
                <Outlet />
            </div>
        </div>
    );
}

export default OptimizerNavigation;