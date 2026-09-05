import styles from "./Optimizer.module.css";
import {ChooseCompanion, ChooseWeapon} from "@components";
import Select from "react-select";

function Optimizer() {
    return (
        <section className={styles.container}>
            <nav className={styles.navigation}>
                <ChooseCompanion/>
                <ChooseWeapon/>
                <div className={styles.selectMenu}>
                    <Select
                        placeholder="Select Main Stat"
                        className={styles.select}
                        isClearable
                        isSearchable={false}
                    />
                    <Select
                        placeholder="Select Sub Stat"
                        className={styles.select}
                        isClearable
                        isSearchable={false}
                    />
                    <Select
                        placeholder="Select Beta Protocore"
                        className={styles.select}
                        isClearable
                        isSearchable={false}
                    />
                    <Select
                        placeholder="Select Delta Protocore"
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
