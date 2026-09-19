import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import styles from "./Optimizer.module.css";
import {
    ChooseCompanion,
    ChooseWeapon,
    ModalChooseCard,
    RenderCardSlot,
    ProtocoreBlock,
    StatsTable,
} from "@components";
import {
    clearOptimizerData,
    getOptimizerData,
    saveOptimizerData,
} from "@localstorage";
import { optimizeTeam, calculateTeamStats } from "@data";
import KitCombatTable from "@components/calculator-components/common/KitCombatTable.jsx";
import { useSolarPair } from "@hooks";

const CARD_SLOTS = [
    { id: "solar1", placement: "solar", index: 0 },
    { id: "solar2", placement: "solar", index: 1 },
    { id: "lunar1", placement: "lunar", index: 0 },
    { id: "lunar2", placement: "lunar", index: 1 },
    { id: "lunar3", placement: "lunar", index: 2 },
    { id: "lunar4", placement: "lunar", index: 3 },
];

function Optimizer() {
    const [data, setData] = useState(() => getOptimizerData());
    const [results, setResults] = useState(null);
    const [teamStats, setTeamStats] = useState(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const modalChooseCardRef = useRef();

    useEffect(() => {
        saveOptimizerData(data);
    }, [data]);

    const betaProtocoreOptions = [
        { value: "Oath Recovery Boost", label: "Oath Recovery Boost" },
        { value: "Oath Strength", label: "Oath Strength" },
        { value: "Expedited Energy Boost", label: "Expedited Energy Boost" },
        { value: "ATK Bonus", label: "ATK Bonus" },
        { value: "HP Bonus", label: "HP Bonus" },
        { value: "DEF Bonus", label: "DEF Bonus" },
    ];

    const deltaProtocoreOptions = [
        { value: "CRIT Rate", label: "CRIT Rate" },
        { value: "CRIT DMG", label: "CRIT DMG" },
        { value: "DMG Boost to Weakened", label: "DMG Boost to Weakened" },
        { value: "ATK Bonus", label: "ATK Bonus" },
        { value: "HP Bonus", label: "HP Bonus" },
        { value: "DEF Bonus", label: "DEF Bonus" },
    ];

    const subStat1Options = [
        { value: "HP", label: "HP" },
        { value: "ATK", label: "ATK" },
        { value: "DEF", label: "DEF" },
    ];

    const subStat2Options = [
        { value: "CRIT Rate", label: "CRIT Rate" },
        { value: "CRIT DMG", label: "CRIT DMG" },
        { value: "Oath Strength", label: "Oath Strength" },
        { value: "DMG Boost to Weakened", label: "DMG Boost to Weakened" },
    ];

    const solarCards = [data.cards.solar1, data.cards.solar2];
    const { teamDmgBonus } = useSolarPair(solarCards);

    const findSlotId = (placement, index) =>
        CARD_SLOTS.find(
            (slot) => slot.placement === placement && slot.index === index,
        )?.id;

    const handleSelectCard = (placement, index, card) => {
        const slotId = findSlotId(placement, index);
        if (!slotId) return;
        setData((prev) => ({
            ...prev,
            cards: { ...prev.cards, [slotId]: card },
        }));
    };

    const handleSelectCompanion = (companion) =>
        setData((prev) => ({ ...prev, selectedCompanion: companion }));

    const handleSelectWeapon = (weapon) =>
        setData((prev) => ({ ...prev, selectedWeapon: weapon }));

    const handleBetaChange1 = (option) =>
        setData((prev) => ({ ...prev, betaProtocore_1: option }));
    const handleBetaChange2 = (option) =>
        setData((prev) => ({ ...prev, betaProtocore_2: option }));
    const handleDeltaChange = (option) =>
        setData((prev) => ({ ...prev, deltaProtocore: option }));
    const handleSubStat1Change = (option) =>
        setData((prev) => ({ ...prev, subStat1: option }));
    const handleSubStat2Change = (option) =>
        setData((prev) => ({ ...prev, subStat2: option }));

    const clearAll = () => {
        if (!window.confirm("Are you sure you want to clear all settings?"))
            return;
        clearOptimizerData();
        setData(getOptimizerData());
        setResults(null);
        setTeamStats(null);
    };

    const startOptimization = () => {
        const allProtocores = JSON.parse(
            localStorage.getItem("protocores") || "[]",
        );

        if (allProtocores.length === 0) {
            alert("You don't have any protocores. Add them first.");
            return;
        }

        if (!data.selectedCompanion || !data.selectedWeapon) {
            alert("Please select a Companion and MC Weapon first.");
            return;
        }

        setIsOptimizing(true);

        // Даём React отрисовать индикатор, потом запускаем тяжёлый расчёт
        setTimeout(() => {
            try {
                const targets = {
                    beta1: data.betaProtocore_1?.value,
                    beta2: data.betaProtocore_2?.value,
                    delta: data.deltaProtocore?.value,
                    subStat1: data.subStat1?.value,
                    subStat2: data.subStat2?.value,
                };

                const context = {
                    selectedCompanion: data.selectedCompanion,
                    selectedMCWeapon: data.selectedWeapon,
                    teamDmgBonus,
                };

                const { results: optimizationResults } = optimizeTeam({
                    cards: data.cards,
                    allProtocores,
                    targets,
                    context,
                });

                const totalStats = calculateTeamStats(
                    data.cards,
                    optimizationResults,
                );

                setResults(optimizationResults);
                setTeamStats(totalStats);
            } finally {
                setIsOptimizing(false);
            }
        }, 50);
    };

    const getCardData = (card) => {
        if (!card) return null;
        return { level: 1, rank: 0, isAscended: false, protocores: [] };
    };

    return (
        <section className={styles.container}>
            <nav className={styles.navigation}>
                <div className={styles.companionsContainer}>
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
                    <div className={styles.protoSelectContainer}>
                        Choose Protocores:
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
                    </div>

                    <div className={styles.substatsSelectContainer}>
                        Choose Sub Stats:
                        <div className={styles.selectContainer}>
                            Sub Stat 1:
                            <Select
                                placeholder="Select Sub Stat 1"
                                options={subStat1Options}
                                value={data.subStat1}
                                onChange={handleSubStat1Change}
                                className={styles.select}
                                isClearable
                                isSearchable={false}
                            />
                        </div>

                        <div className={styles.selectContainer}>
                            Sub Stat 2:
                            <Select
                                placeholder="Select Sub Stat 2"
                                options={subStat2Options}
                                value={data.subStat2}
                                onChange={handleSubStat2Change}
                                className={styles.select}
                                isClearable
                                isSearchable={false}
                            />
                        </div>
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
                                            <div
                                                key={type}
                                                className={styles.resultProtocore}
                                            >
                                                <ProtocoreBlock
                                                    protocore={protocore}
                                                    hideChange={true}
                                                    hideDelete={true}
                                                />
                                            </div>
                                        ),
                                )}
                            </div>
                        )}
                    </article>
                ))}
            </section>

            <div className={styles.buttonsContainer}>
                <button className={styles.clearButton} onClick={clearAll}>
                    Clear all
                </button>
                <button
                    className={styles.startButton}
                    onClick={startOptimization}
                    disabled={isOptimizing}
                >
                    {isOptimizing ? "Optimizing..." : "Start"}
                </button>
            </div>

            {/* Индикатор загрузки */}
            {isOptimizing && (
                <div className={styles.loadingIndicator}>
                    Calculating best protocores, please wait...
                </div>
            )}

            <div className={styles.resultContainer}>
                {teamStats && <StatsTable stats={teamStats} />}

                {teamStats && data.selectedCompanion && data.selectedWeapon && (
                    <KitCombatTable
                        stats={teamStats}
                        selectedCompanion={data.selectedCompanion}
                        selectedMCWeapon={data.selectedWeapon}
                        teamDmgBonus={teamDmgBonus}
                    />
                )}
            </div>

            <ModalChooseCard
                ref={modalChooseCardRef}
                onSelectCard={handleSelectCard}
            />
        </section>
    );
}

export default Optimizer;