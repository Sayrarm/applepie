import {NavLink, Outlet} from "react-router-dom";
import styles from "@pages/CalculatorAndAccountPage.module.css";
import { useTranslation } from "react-i18next";

function Calculator() {
    const { t } = useTranslation();

    return (
        <section className={styles.containerCalculator}>
            <div className={styles.tabs}>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/showcase">
                    {t('Calculator.showcase')}
                </NavLink>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/optimizer">
                    {t('Calculator.optimizer')}
                </NavLink>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/protocore-calculator">
                    {t('Calculator.protocoreCalculator')}
                </NavLink>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/memory-calculator">
                    {t('Calculator.memoryCalculator')}
                </NavLink>
            </div>

            <div className={styles.tabContent}>
                <Outlet/>
            </div>
        </section>
    );
}

export default Calculator;
