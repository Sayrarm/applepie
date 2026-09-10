import styles from "./Optimizer.module.css";
import {ChooseCompanion, ChooseWeapon} from "@components";
import Select from "react-select";
import {useState} from "react";

function Optimizer() {

    const [selectedCompanion, setSelectedCompanion] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);

    // Опции для Select Beta Protocore
    const betaProtocoreOptions = [
        { value: "oath_recovery_boost", label: "Oath Recovery Boost" },
        { value: "oath_strength", label: "Oath Strength" },
        { value: "expedited_energy_boost", label: "Expedited Energy Boost" },
        { value: "atk_bonus", label: "ATK Bonus" },
        { value: "hp_bonus", label: "HP Bonus" },
        { value: "def_bonus", label: "DEF Bonus" },
    ];

    // Опции для Select Delta Protocore
    const deltaProtocoreOptions = [
        { value: "crit_rate", label: "CRIT Rate" },
        { value: "crit_dmg", label: "CRIT DMG" },
        { value: "dmg_boost_weakened", label: "DMG Boost to Weakened" },
        { value: "atk_bonus", label: "ATK Bonus" },
        { value: "hp_bonus", label: "HP Bonus" },
        { value: "def_bonus", label: "DEF Bonus" },
    ];

    // Опции для Select Main Stat
    const mainStatOptions = [
        { value: "hp", label: "HP" },
        { value: "atk", label: "ATK" },
        { value: "def", label: "DEF" },
    ];

    // Опции для Select Sub Stat
    const subStatOptions = [
        { value: "atk_bonus", label: "ATK Bonus" },
        { value: "hp_bonus", label: "HP Bonus" },
        { value: "def_bonus", label: "DEF Bonus" },
        { value: "crit_rate", label: "CRIT Rate" },
        { value: "crit_dmg", label: "CRIT DMG" },
        { value: "oath_strength", label: "Oath Strength" },
        { value: "dmg_boost_weakened", label: "DMG Boost to Weakened" },
    ];

    return (
        <section className={styles.container}>
            <nav className={styles.navigation}>
                <ChooseCompanion
                    selectedCompanion={selectedCompanion}
                    onSelectCompanion={setSelectedCompanion}
                />
                <ChooseWeapon
                    selectedMCWeapon={selectedWeapon}
                    onSelectMCWeapon={setSelectedWeapon}
                />
                <div className={styles.selectMenu}>
                    <Select
                        placeholder="Select Beta Protocore"
                        options={betaProtocoreOptions}
                        className={styles.select}
                        isClearable
                        isSearchable={false}
                    />
                    <Select
                        placeholder="Select Delta Protocore"
                        options={deltaProtocoreOptions}
                        className={styles.select}
                        isClearable
                        isSearchable={false}
                    />
                    <Select
                        placeholder="Select Main Stat"
                        options={mainStatOptions}
                        className={styles.select}
                        isClearable
                        isSearchable={false}
                    />
                    <Select
                        placeholder="Select Sub Stat"
                        options={subStatOptions}
                        className={styles.select}
                        isClearable
                        isSearchable={false}
                    />
                </div>
            </nav>

            <section className={styles.cardsContainer}>
                <article className={styles.articleContainer}>
                    <button className={styles.choosenCard}>
                        + Add Solar Memory
                    </button>
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>
                <article className={styles.articleContainer}>
                    <button className={styles.choosenCard}>
                        + Add Solar Memory
                    </button>
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>
                <article className={styles.articleContainer}>
                    <button className={styles.choosenCard}>
                        + Add Lunar Memory
                    </button>
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>
                <article className={styles.articleContainer}>
                    <button className={styles.choosenCard}>
                        + Add Lunar Memory
                    </button>
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>
                <article className={styles.articleContainer}>
                    <button className={styles.choosenCard}>
                        + Add Lunar Memory
                    </button>
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>
                <article className={styles.articleContainer}>
                    <button className={styles.choosenCard}>
                        + Add Lunar Memory
                    </button>
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>
            </section>

            <button className={styles.startButton}>
                Start
            </button>
        </section>
    );
}

export default Optimizer;
