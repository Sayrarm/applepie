import { useState } from 'react';
import styles from './CalculatorPage.module.css';
import ProtocoreCalculator from "../components/ProtocoreCalculator.jsx";
import MemoryUpCalculator from "../components/MemoryUpCalculator.jsx";
import MyResources from "../components/MyResources.jsx";
import Protocores from "../components/Protocores.jsx";
import MyMemories from "../components/MyMemories.jsx";

function Calculator() {
    const [activeTab, setActiveTab] = useState('inventory');

    return (
        <section className={styles.containerCalculator}>
            {/* Навигация */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'myMemories' ? styles.active : ''}`}
                    onClick={() => setActiveTab('myMemories')}
                >
                    My Memories
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'allProtocores' ? styles.active : ''}`}
                    onClick={() => setActiveTab('allProtocores')}
                >
                    My Protocores
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'inventory' ? styles.active : ''}`}
                    onClick={() => setActiveTab('inventory')}
                >
                    My Resources
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'protocoreCalc' ? styles.active : ''}`}
                    onClick={() => setActiveTab('protocoreCalc')}
                >
                    Protocore Calculator
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'memoryCalc' ? styles.active : ''}`}
                    onClick={() => setActiveTab('memoryCalc')}
                >
                    Memory Calculator
                </button>
            </div>

            {/* Контент */}
            <div className={styles.tabContent}>
                {activeTab === 'myMemories' && <MyMemories />}
                {activeTab === 'allProtocores' && <Protocores />}
                {activeTab === 'inventory' && <MyResources />}
                {activeTab === 'protocoreCalc' && <ProtocoreCalculator />}
                {activeTab === 'memoryCalc' && <MemoryUpCalculator />}
            </div>
        </section>
    );
}

export default Calculator;