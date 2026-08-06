import { Navigate, NavLink, useParams } from 'react-router-dom';
import styles from './CalculatorPage.module.css';
import ProtocoreCalculator from "../components/ProtocoreCalculator.jsx";
import MemoryUpCalculator from "../components/MemoryUpCalculator.jsx";
import MyResources from "../components/MyResources.jsx";
import Protocores from "../components/Protocores.jsx";
import MyMemories from "../components/MyMemories.jsx";
import Showcase from "../components/Showcase.jsx";
import ExportImport from "../components/ExportImport.jsx";
import Optimizer from "../components/Optimizer.jsx";

function Calculator() {
    const { navigation } = useParams(); // получаем "my-memories", "inventory" и т.д.

    // Если нет параметра — редиректим на showcase
    if (!navigation) {
        return <Navigate to="/calculator/inventory" replace />;
    }

    return (
        <section className={styles.containerCalculator}>
            {/* Навигация */}
            <div className={styles.tabs}>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/inventory"
                >
                    My Resources
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/showcase"
                >
                    Showcase
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/optimizer"
                >
                    Optimizer
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/my-memories"
                >
                    My Memories
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/my-protocores"
                >
                    My Protocores
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/protocore-calculator"
                >
                    Protocore Calculator
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/memory-calculator"
                >
                    Memory Calculator
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/calculator/export-import"
                >
                    Export/Import data
                </NavLink>
            </div>

            {/* Контент */}
            <div className={styles.tabContent}>
                {navigation === 'showcase' && <Showcase />}
                {navigation === 'optimizer' && <Optimizer />}
                {navigation === 'my-memories' && <MyMemories />}
                {navigation === 'my-protocores' && <Protocores />}
                {navigation === 'inventory' && <MyResources />}
                {navigation === 'protocore-calculator' && <ProtocoreCalculator />}
                {navigation === 'memory-calculator' && <MemoryUpCalculator />}
                {navigation === 'export-import' && <ExportImport />}
            </div>
        </section>
    );
}

export default Calculator;