import styles from "./Optimizer.module.css";
import { ChooseCompanion, ChooseWeapon, ModalChooseCard, RenderCardSlot } from "@components";
import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import {
    getOptimizerData,
    saveOptimizerData
} from "@localstorage";

// Конфигурация слотов
const CARD_SLOTS = [
    { id: "solar1", placement: "solar", index: 0 },
    { id: "solar2", placement: "solar", index: 1 },
    { id: "lunar1", placement: "lunar", index: 0 },
    { id: "lunar2", placement: "lunar", index: 1 },
    { id: "lunar3", placement: "lunar", index: 2 },
    { id: "lunar4", placement: "lunar", index: 3 },
];

function Optimizer() {
    // Загружаем сохраненные данные
    const [data, setData] = useState(() => getOptimizerData());

    const modalChooseCardRef = useRef();

    // Сохраняем при изменении
    useEffect(() => {
        saveOptimizerData(data);
    }, [data]);

    const betaProtocoreOptions = [
        { value: "oath_recovery_boost", label: "Oath Recovery Boost" },
        { value: "oath_strength", label: "Oath Strength" },
        { value: "expedited_energy_boost", label: "Expedited Energy Boost" },
        { value: "atk_bonus", label: "ATK Bonus" },
        { value: "hp_bonus", label: "HP Bonus" },
        { value: "def_bonus", label: "DEF Bonus" },
    ];

    const deltaProtocoreOptions = [
        { value: "crit_rate", label: "CRIT Rate" },
        { value: "crit_dmg", label: "CRIT DMG" },
        { value: "dmg_boost_weakened", label: "DMG Boost to Weakened" },
        { value: "atk_bonus", label: "ATK Bonus" },
        { value: "hp_bonus", label: "HP Bonus" },
        { value: "def_bonus", label: "DEF Bonus" },
    ];

    const mainStatOptions = [
        { value: "hp", label: "HP" },
        { value: "atk", label: "ATK" },
        { value: "def", label: "DEF" },
    ];

    const subStatOptions = [
        { value: "atk_bonus", label: "ATK Bonus" },
        { value: "hp_bonus", label: "HP Bonus" },
        { value: "def_bonus", label: "DEF Bonus" },
        { value: "crit_rate", label: "CRIT Rate" },
        { value: "crit_dmg", label: "CRIT DMG" },
        { value: "oath_strength", label: "Oath Strength" },
        { value: "dmg_boost_weakened", label: "DMG Boost to Weakened" },
    ];

    // Находим слот по placement и index
    const findSlotId = (placement, index) => {
        return CARD_SLOTS.find(
            (slot) => slot.placement === placement && slot.index === index
        )?.id;
    };

    const handleSelectCard = (placement, index, card) => {
        const slotId = findSlotId(placement, index);
        if (!slotId) return;

        setData((prev) => ({
            ...prev,
            cards: {
                ...prev.cards,
                [slotId]: card,
            },
        }));
    };

    const handleSelectCompanion = (companion) => {
        setData((prev) => ({ ...prev, selectedCompanion: companion }));
    };

    const handleSelectWeapon = (weapon) => {
        setData((prev) => ({ ...prev, selectedWeapon: weapon }));
    };

    const handleBetaChange = (option) => {
        setData((prev) => ({ ...prev, betaProtocore: option }));
    };

    const handleDeltaChange = (option) => {
        setData((prev) => ({ ...prev, deltaProtocore: option }));
    };

    const handleMainStatChange = (option) => {
        setData((prev) => ({ ...prev, mainStat: option }));
    };

    const handleSubStatChange = (option) => {
        setData((prev) => ({ ...prev, subStat: option }));
    };

    const getCardData = (card) => {
        if (!card) return null;
        return { level: 1, rank: 0, isAscended: false, protocores: [] };
    };

    return (
        <section className={styles.container}>
            <nav className={styles.navigation}>
                <div>
                    <ChooseCompanion
                        selectedCompanion={data.selectedCompanion}
                        onSelectCompanion={handleSelectCompanion}
                    />
                    <ChooseWeapon
                        selectedMCWeapon={data.selectedWeapon}
                        onSelectMCWeapon={handleSelectWeapon}
                    />
                </div>

                <div className={styles.selectMenu}>
                    <div className={styles.selectContainer}>
                        Beta:
                        <Select
                            placeholder="Select Beta Protocore"
                            options={betaProtocoreOptions}
                            value={data.betaProtocore}
                            onChange={handleBetaChange}
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
                            value={data.deltaProtocore}
                            onChange={handleDeltaChange}
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
                            value={data.mainStat}
                            onChange={handleMainStatChange}
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
                            value={data.subStat}
                            onChange={handleSubStatChange}
                            className={styles.select}
                            isClearable
                            isSearchable={false}
                        />
                    </div>
                </div>
            </nav>

            <section className={styles.cardsContainer}>
                {CARD_SLOTS.map((slot) => (
                    <article key={slot.id} className={styles.articleContainer}>
                        <RenderCardSlot
                            card={data.cards[slot.id]}
                            placement={slot.placement}
                            index={slot.index}
                            getCardData={getCardData}
                            cardModalRef={modalChooseCardRef}
                            smallCard={true}
                            showProtocores={false}
                            className={`${styles.choosenCard} ${!data.cards[slot.id] ? styles.emptySlot : ""}`}
                            showCardSlotEquipped={false}
                        />
                        <div className={styles.protocoreContainer}>
                            <div>Protocore 1</div>
                            <div>Protocore 2</div>
                        </div>
                    </article>
                ))}
            </section>

            <button className={styles.startButton}>Start</button>

            <ModalChooseCard
                ref={modalChooseCardRef}
                onSelectCard={handleSelectCard}
            />
        </section>
    );
}

export default Optimizer;