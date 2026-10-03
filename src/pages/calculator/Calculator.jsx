import {NavLink, Outlet} from "react-router-dom";
import styles from "@pages/CalculatorAndAccountPage.module.css";

function Calculator() {
    return (
        <section className={styles.containerCalculator}>
            <div className={styles.tabs}>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/showcase">
                    Showcase
                </NavLink>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/optimizer">
                    Optimizer
                </NavLink>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/protocore-calculator">
                    Protocore Calculator
                </NavLink>
                <NavLink className={({isActive}) => `${styles.tabButton} ${isActive ? styles.active : ""}`}
                         to="/calculator/memory-calculator">
                    Memory Calculator
                </NavLink>
            </div>

            <div className={styles.tabContent}>
                <Outlet/>
            </div>
        </section>
    );
}

export default Calculator;
