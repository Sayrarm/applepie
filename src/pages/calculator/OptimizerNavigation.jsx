import { NavLink, Outlet } from "react-router-dom";
import styles from "@pages/CalculatorAndAccountPage.module.css";
import { useTranslation } from "react-i18next";

function OptimizerNavigation() {
    const { t } = useTranslation();

    return (
        <div className={styles.optimizerContainer}>
            <div className={styles.optimizerNavigationButtons}>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`} to="/calculator/optimizer/team-optimizer">
                    {t('OptimizerNavigation.team')}
                </NavLink>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`} to="/calculator/optimizer/memory-optimizer">
                    {t('OptimizerNavigation.memory')}
                </NavLink>
            </div>


            <div className={styles.tabContentOptimizer}>
                <Outlet />
            </div>
        </div>
    );
}

export default OptimizerNavigation;