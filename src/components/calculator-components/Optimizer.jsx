import styles from "./Optimizer.module.css";
import {ChooseCompanion, ChooseWeapon, ModalChooseCard, RenderCardSlot} from "@components";
import Select from "react-select";
import {useState, useRef} from "react";

function Optimizer() {
    const [selectedCompanion, setSelectedCompanion] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);

    // Состояния для карточек
    const [solarCard1, setSolarCard1] = useState(null);
    const [solarCard2, setSolarCard2] = useState(null);
    const [lunarCard1, setLunarCard1] = useState(null);
    const [lunarCard2, setLunarCard2] = useState(null);
    const [lunarCard3, setLunarCard3] = useState(null);
    const [lunarCard4, setLunarCard4] = useState(null);

    // Рефы для модалок
    const modalChooseCardRef = useRef();

    const betaProtocoreOptions = [
        {value: "oath_recovery_boost", label: "Oath Recovery Boost"},
        {value: "oath_strength", label: "Oath Strength"},
        {value: "expedited_energy_boost", label: "Expedited Energy Boost"},
        {value: "atk_bonus", label: "ATK Bonus"},
        {value: "hp_bonus", label: "HP Bonus"},
        {value: "def_bonus", label: "DEF Bonus"},
    ];

    const deltaProtocoreOptions = [
        {value: "crit_rate", label: "CRIT Rate"},
        {value: "crit_dmg", label: "CRIT DMG"},
        {value: "dmg_boost_weakened", label: "DMG Boost to Weakened"},
        {value: "atk_bonus", label: "ATK Bonus"},
        {value: "hp_bonus", label: "HP Bonus"},
        {value: "def_bonus", label: "DEF Bonus"},
    ];

    const mainStatOptions = [
        {value: "hp", label: "HP"},
        {value: "atk", label: "ATK"},
        {value: "def", label: "DEF"},
    ];

    const subStatOptions = [
        {value: "atk_bonus", label: "ATK Bonus"},
        {value: "hp_bonus", label: "HP Bonus"},
        {value: "def_bonus", label: "DEF Bonus"},
        {value: "crit_rate", label: "CRIT Rate"},
        {value: "crit_dmg", label: "CRIT DMG"},
        {value: "oath_strength", label: "Oath Strength"},
        {value: "dmg_boost_weakened", label: "DMG Boost to Weakened"},
    ];

    const handleSelectCard = (placement, index, card) => {
        switch (placement) {
            case "solar":
                if (index === 0) setSolarCard1(card);
                else if (index === 1) setSolarCard2(card);
                break;
            case "lunar":
                if (index === 0) setLunarCard1(card);
                else if (index === 1) setLunarCard2(card);
                else if (index === 2) setLunarCard3(card);
                else if (index === 3) setLunarCard4(card);
                break;
            default:
                break;
        }
    };

    // Функция для получения данных карточки (заглушка, если нужна)
    const getCardData = (card) => {
        if (!card) return null;
        return {level: 1, rank: 0, isAscended: false, protocores: []};
    };

    return (
        <section className={styles.container}>
            <nav className={styles.navigation}>
                <div>
                    <ChooseCompanion
                        selectedCompanion={selectedCompanion}
                        onSelectCompanion={setSelectedCompanion}
                    />
                    <ChooseWeapon
                        selectedMCWeapon={selectedWeapon}
                        onSelectMCWeapon={setSelectedWeapon}
                    />
                </div>

                <div className={styles.selectMenu}>
                    <div className={styles.selectContainer}>
                        Beta:
                        <Select
                            placeholder="Select Beta Protocore"
                            options={betaProtocoreOptions}
                            className={styles.select}
                            isClearable
                            isSearchable={false}
                        />
                    </div>

                    <div className={styles.selectContainer}>
                        Delta:
                        <Select
                            placeholder="Select Delta Protocore"
                            options={deltaProtocoreOptions}
                            className={styles.select}
                            isClearable
                            isSearchable={false}
                        />
                    </div>
                    <div className={styles.selectContainer}>
                        Main Stat:
                        <Select
                            placeholder="Select Main Stat"
                            options={mainStatOptions}
                            className={styles.select}
                            isClearable
                            isSearchable={false}
                        />
                    </div>
                    <div className={styles.selectContainer}>
                        Sub Stat:
                        <Select
                            placeholder="Select Sub Stat"
                            options={subStatOptions}
                            className={styles.select}
                            isClearable
                            isSearchable={false}
                        />
                    </div>
                </div>
            </nav>

            <section className={styles.cardsContainer}>
                <article className={styles.articleContainer}>
                    <RenderCardSlot
                        card={solarCard1}
                        placement="solar"
                        index={0}
                        getCardData={getCardData}
                        cardModalRef={modalChooseCardRef}
                        smallCard={true}
                        showProtocores={false}
                        className={`${styles.choosenCard} ${!solarCard1 ? styles.emptySlot : ""}`}
                        showCardSlotEquipped={false}
                    />
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>

                <article className={styles.articleContainer}>
                    <RenderCardSlot
                        card={solarCard2}
                        placement="solar"
                        index={1}
                        getCardData={getCardData}
                        cardModalRef={modalChooseCardRef}
                        smallCard={true}
                        showProtocores={false}
                        className={`${styles.choosenCard} ${!solarCard2 ? styles.emptySlot : ""}`}
                        showCardSlotEquipped={false}
                    />
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>

                <article className={styles.articleContainer}>
                    <RenderCardSlot
                        card={lunarCard1}
                        placement="lunar"
                        index={0}
                        getCardData={getCardData}
                        cardModalRef={modalChooseCardRef}
                        smallCard={true}
                        showProtocores={false}
                        className={`${styles.choosenCard} ${!lunarCard1 ? styles.emptySlot : ""}`}
                        showCardSlotEquipped={false}
                    />
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>

                <article className={styles.articleContainer}>
                    <RenderCardSlot
                        card={lunarCard2}
                        placement="lunar"
                        index={1}
                        getCardData={getCardData}
                        cardModalRef={modalChooseCardRef}
                        smallCard={true}
                        showProtocores={false}
                        className={`${styles.choosenCard} ${!lunarCard2 ? styles.emptySlot : ""}`}
                        showCardSlotEquipped={false}
                    />
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>

                <article className={styles.articleContainer}>
                    <RenderCardSlot
                        card={lunarCard3}
                        placement="lunar"
                        index={2}
                        getCardData={getCardData}
                        cardModalRef={modalChooseCardRef}
                        smallCard={true}
                        showProtocores={false}
                        className={`${styles.choosenCard} ${!lunarCard3 ? styles.emptySlot : ""}`}
                        showCardSlotEquipped={false}
                    />
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>

                <article className={styles.articleContainer}>
                    <RenderCardSlot
                        card={lunarCard4}
                        placement="lunar"
                        index={3}
                        getCardData={getCardData}
                        cardModalRef={modalChooseCardRef}
                        smallCard={true}
                        showProtocores={false}
                        className={`${styles.choosenCard} ${!lunarCard4 ? styles.emptySlot : ""}`}
                        showCardSlotEquipped={false}
                    />
                    <div className={styles.protocoreContainer}>
                        <div>Protocore 1</div>
                        <div>Protocore 2</div>
                    </div>
                </article>
            </section>

            <button className={styles.startButton}>Start</button>

            {/* Модалка выбора карточки */}
            <ModalChooseCard
                ref={modalChooseCardRef}
                onSelectCard={handleSelectCard}
            />
        </section>
    );
}

export default Optimizer;