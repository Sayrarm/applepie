import { useState } from 'react';
import styles from './Calculator.module.css';
import ProtocoreCalculator from "../components/ProtocoreCalculator.jsx";
import MemoryUpCalculator from "../components/MemoryUpCalculator.jsx";

function Calculator() {
    const [activeTab, setActiveTab] = useState('protocore');

    return (
        <section className={styles.containerCalculator}>
            {/* Навигация */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'protocore' ? styles.active : ''}`}
                    onClick={() => setActiveTab('protocore')}
                >
                    Protocore Calculator
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'memory' ? styles.active : ''}`}
                    onClick={() => setActiveTab('memory')}
                >
                    Memory Calculator
                </button>
            </div>

            {/* Контент */}
            <div className={styles.tabContent}>
                {activeTab === 'protocore' && <ProtocoreCalculator />}
                {activeTab === 'memory' && <MemoryUpCalculator />}
            </div>
        </section>
    );
}

export default Calculator;