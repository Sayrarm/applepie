import { Navigate, NavLink, useParams } from 'react-router-dom';
import styles from '@pages/CalculatorAndAccountPage.module.css';
import MyResources from "@components/calculator-components/MyResources.jsx";
import MyProtocores from "@components/calculator-components/protocore-page/MyProtocores.jsx";
import MyMemories from "@components/calculator-components/MyMemories.jsx";
import ExportImport from "@components/calculator-components/import-export/ExportImport.jsx";


function MyAccount() {
    const { navigation } = useParams();

    // Если нет параметра — редиректим на showcase
    if (!navigation) {
        return <Navigate to="/my-account/inventory" replace />;
    }

    return (
        <section className={styles.containerCalculator}>
            {/* Навигация */}
            <div className={styles.tabs}>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/my-account/inventory"
                >
                    Resources
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/my-account/my-memories"
                >
                    Memories
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/my-account/my-protocores"
                >
                    Protocores
                </NavLink>
                <NavLink
                    className={({ isActive }) => `${styles.tabButton} ${isActive ? styles.active : ''}`}
                    to="/my-account/export-import"
                >
                    Export/Import data
                </NavLink>
            </div>

            {/* Контент */}
            <div className={styles.tabContent}>
                {navigation === 'my-memories' && <MyMemories />}
                {navigation === 'my-protocores' && <MyProtocores />}
                {navigation === 'inventory' && <MyResources />}
                {navigation === 'export-import' && <ExportImport />}
            </div>
        </section>
    );
}

export default MyAccount;