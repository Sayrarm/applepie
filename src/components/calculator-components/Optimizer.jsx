import styles from "./Optimizer.module.css";
import { ChooseCompanion, ChooseWeapon, ModalChooseCard, RenderCardSlot, ProtocoreBlock } from "@components";
import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import {
    clearOptimizerData,
    getOptimizerData,
    saveOptimizerData,
} from "@localstorage";
import { optimizeTeam, calculateTeamStats } from "@data";
import StatsTable from "@components/calculator-components/showcase/StatsTable.jsx";

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
    const [results, setResults] = useState(null);
    const [teamStats, setTeamStats] = useState(null);
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
            cards: { ...prev.cards, [slotId]: card },
        }));
    };

    const handleSelectCompanion = (companion) => {
        setData((prev) => ({ ...prev, selectedCompanion: companion }));
    };

    const handleSelectWeapon = (weapon) => {
        setData((prev) => ({ ...prev, selectedWeapon: weapon }));
    };

    const handleBetaChange1 = (option) => {
        setData((prev) => ({ ...prev, betaProtocore_1: option }));
    };

    const handleBetaChange2 = (option) => {
        setData((prev) => ({ ...prev, betaProtocore_2: option }));
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

    const clearAll = () => {
        if (!window.confirm("Are you sure you want to clear all settings?")) return;
        clearOptimizerData();
        setData(getOptimizerData());
        setResults(null);
        setTeamStats(null);
    };

    const startOptimization = () => {
        const allProtocores = JSON.parse(localStorage.getItem("protocores") || "[]");

        if (allProtocores.length === 0) {
            alert("You don't have any protocores. Add them first.");
            return;
        }

        const targets = {
            beta1: data.betaProtocore_1?.value,
            beta2: data.betaProtocore_2?.value,
            delta: data.deltaProtocore?.value,
            mainStat: data.mainStat?.value,
            subStat: data.subStat?.value,
        };

        const { results: optimizationResults } = optimizeTeam({
            cards: data.cards,
            allProtocores,
            targets,
        });

        // Считаем суммарные статы команды (карточки + протокоры)
        const totalStats = calculateTeamStats(data.cards, optimizationResults);

        setResults(optimizationResults);
        setTeamStats(totalStats);
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
                        Beta 1:
                        <Select
                            placeholder="Select Beta Protocore"
                            options={betaProtocoreOptions}
                            value={data.betaProtocore_1}
                            onChange={handleBetaChange1}
                            className={styles.select}
                            isClearable
                            isSearchable={false}
                        />
                    </div>

                    <div className={styles.selectContainer}>
                        Beta 2:
                        <Select
                            placeholder="Select Beta Protocore"
                            options={betaProtocoreOptions}
                            value={data.betaProtocore_2}
                            onChange={handleBetaChange2}
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

                        {results && results[slot.id] && (
                            <div className={styles.resultProtocores}>
                                {Object.entries(results[slot.id]).map(
                                    ([type, protocore]) =>
                                        protocore && (
                                            <div key={type} className={styles.resultProtocore}>
                                                <ProtocoreBlock
                                                    protocore={protocore}
                                                    hideChange={true}
                                                    hideDelete={true}
                                                />
                                            </div>
                                        )
                                )}
                            </div>
                        )}
                    </article>
                ))}
            </section>

            {/* Суммарные статы команды */}
            {teamStats && (
                <StatsTable
                    stats={teamStats}
                />
            )}

            <div className={styles.buttonsContainer}>
                <button className={styles.clearButton} onClick={clearAll}>
                    Clear all
                </button>
                <button className={styles.startButton} onClick={startOptimization}>
                    Start
                </button>
            </div>

            <ModalChooseCard
                ref={modalChooseCardRef}
                onSelectCard={handleSelectCard}
            />
        </section>
    );
}

export default Optimizer;