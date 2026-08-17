import { Navigate, NavLink, useParams } from "react-router-dom";
import styles from "@pages/CalculatorAndAccountPage.module.css";
import {
  ProtocoreCalculator,
  MemoryUpCalculator,
  Showcase,
  Optimizer,
} from "@components";

function Calculator() {
  const { navigation } = useParams(); // получаем "my-memories", "inventory" и т.д.

  // Если нет параметра — редиректим на showcase
  if (!navigation) {
    return <Navigate to="/calculator/showcase" replace />;
  }

  return (
    <section className={styles.containerCalculator}>
      {/* Навигация */}
      <div className={styles.tabs}>
        <NavLink
          className={({ isActive }) =>
            `${styles.tabButton} ${isActive ? styles.active : ""}`
          }
          to="/calculator/showcase"
        >
          Showcase
        </NavLink>
        {/*
        <NavLink
          className={({ isActive }) =>
            `${styles.tabButton} ${isActive ? styles.active : ""}`
          }
          to="/calculator/optimizer"
        >
          Optimizer
        </NavLink>
        */}
        <NavLink
          className={({ isActive }) =>
            `${styles.tabButton} ${isActive ? styles.active : ""}`
          }
          to="/calculator/protocore-calculator"
        >
          Protocore Calculator
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.tabButton} ${isActive ? styles.active : ""}`
          }
          to="/calculator/memory-calculator"
        >
          Memory Calculator
        </NavLink>
      </div>

      {/* Контент */}
      <div className={styles.tabContent}>
        {navigation === "showcase" && <Showcase />}
        {navigation === "optimizer" && <Optimizer />}
        {navigation === "protocore-calculator" && <ProtocoreCalculator />}
        {navigation === "memory-calculator" && <MemoryUpCalculator />}
      </div>
    </section>
  );
}

export default Calculator;
