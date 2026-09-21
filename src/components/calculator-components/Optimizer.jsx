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
    KitCombatTable
} from "@components";
import {
    clearOptimizerData,
    getOptimizerData,
    saveOptimizerData,
    getCardProtocores,
    saveCardProtocores,
    getShowcaseTeams,
    saveShowcaseTeams,
    createDefaultTeam,
} from "@localstorage";
import {
    optimizeTeam,
    calculateTeamStats,
    computeKitDamage,
    detectDamageType,
} from "@data";
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
    const [oldTeamStats, setOldTeamStats] = useState(null);
    const [damageComparison, setDamageComparison] = useState(null);
    const [isSending, setIsSending] = useState(false);
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

    {/*
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
    */}

    const buildOldResults = (cards) => {
        const result = {
            solar1: { alpha: null, beta: null },
            solar2: { alpha: null, beta: null },
            lunar1: { gamma: null, delta: null },
            lunar2: { gamma: null, delta: null },
            lunar3: { gamma: null, delta: null },
            lunar4: { gamma: null, delta: null },
        };

        Object.entries(cards).forEach(([slotId, card]) => {
            if (!card) return;
            const protocores = getCardProtocores(card.id);
            if (!protocores || protocores.length === 0) return;

            protocores.forEach((p) => {
                if (slotId.startsWith("solar")) {
                    if (p.type === "alpha" || p.type === "beta") {
                        result[slotId][p.type] = p;
                    }
                } else {
                    if (p.type === "gamma" || p.type === "delta") {
                        result[slotId][p.type] = p;
                    }
                }
            });
        });

        return result;
    };

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
    {/*
    const handleSubStat1Change = (option) =>
        setData((prev) => ({ ...prev, subStat1: option }));
    const handleSubStat2Change = (option) =>
        setData((prev) => ({ ...prev, subStat2: option }));
    */}

    const clearAll = () => {
        if (!window.confirm("Are you sure you want to clear all settings?"))
            return;
        clearOptimizerData();
        setData(getOptimizerData());
        setResults(null);
        setTeamStats(null);
        setOldTeamStats(null);
        setDamageComparison(null);
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

                // ===== Новые протокоры =====
                const { results: optimizationResults } = optimizeTeam({
                    cards: data.cards,
                    allProtocores,
                    targets,
                    context,
                });

                const newTeamStats = calculateTeamStats(
                    data.cards,
                    optimizationResults,
                );

                // ===== Старые протокоры =====
                const oldResults = buildOldResults(data.cards);
                const oldStats = calculateTeamStats(data.cards, oldResults);

                // ===== Сравнение урона =====
                const damageType = detectDamageType(targets.delta);

                const oldDamageData = computeKitDamage(oldStats, context);
                const newDamageData = computeKitDamage(newTeamStats, context);

                const pickDamage = (data) => {
                    switch (damageType) {
                        case "weakened":
                            return data.weakenedSum;
                        case "crit":
                            return data.critSum;
                        default:
                            return data.baseSum;
                    }
                };

                const oldDamage = pickDamage(oldDamageData);
                const newDamage = pickDamage(newDamageData);
                const percentChange = oldDamage > 0
                    ? ((newDamage - oldDamage) / oldDamage) * 100
                    : 0;

                setResults(optimizationResults);
                setTeamStats(newTeamStats);
                setOldTeamStats(oldStats);
                setDamageComparison({
                    oldDamage,
                    newDamage,
                    percentChange,
                    damageType,
                });
            } finally {
                setIsOptimizing(false);
            }
        }, 50);
    };

    // ===== отправка в Showcase =====
    const handleSendToShowcase = () => {
        setIsSending(true);

        try {
            // 1. Сохраняем протокоры на карточки в localStorage
            CARD_SLOTS.forEach((slot) => {
                const card = data.cards[slot.id];
                if (!card) return;

                const slotResult = results[slot.id];
                const protocores = slotResult
                    ? Object.values(slotResult).filter(Boolean)
                    : [];

                saveCardProtocores(card.id, protocores);
            });

            // 2. Собираем новую команду в формате Showcase
            const teams = getShowcaseTeams();
            const teamNumber = teams.length + 1;
            const teamName = `Optimized Team ${teamNumber}`;

            const newTeam = {
                ...createDefaultTeam(teamName),
                selectedCompanion: data.selectedCompanion,
                selectedMCWeapon: data.selectedWeapon,
                solarCards: [data.cards.solar1, data.cards.solar2],
                lunarCards: [
                    data.cards.lunar1,
                    data.cards.lunar2,
                    data.cards.lunar3,
                    data.cards.lunar4,
                ],
                affinityLevel: 0,
            };

            // 3. Сохраняем команду
            saveShowcaseTeams([...teams, newTeam]);

            alert(`"${teamName}" sent to Showcase successfully!`);
        } catch (err) {
            console.error("Send to Showcase error:", err);
            alert("Failed to send team to Showcase. See console for details.");
        } finally {
            setIsSending(false);
        }
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

                    {/* --Селекты для сабстатов, на данный момент не нужны--
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
                    */}
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
                <button
                    className={styles.sendButton}
                    onClick={handleSendToShowcase}
                    disabled={!results || !teamStats || isOptimizing || isSending}
                >
                    {isSending ? "Sending..." : "Send to Showcase"}
                </button>
            </div>

            {/* Индикатор загрузки */}
            {isOptimizing && (
                <div className={styles.loadingIndicator}>
                    Calculating best protocores, please wait...
                </div>
            )}

            <div className={styles.resultContainer}>
                {/* Два StatsTable рядом */}
                {(teamStats || oldTeamStats) && (
                    <div className={styles.statsComparison}>
                        {oldTeamStats && (
                            <div className={styles.statsColumn}>
                                <h3 className={styles.statsColumnTitle}>
                                    Before (Current Protocores)
                                </h3>
                                <StatsTable stats={oldTeamStats} />
                            </div>
                        )}
                        {teamStats && (
                            <div className={styles.statsColumn}>
                                <h3 className={styles.statsColumnTitle}>
                                    After (Optimized Protocores)
                                </h3>
                                <StatsTable stats={teamStats} />
                            </div>
                        )}
                    </div>
                )}

                {/* Процент изменения урона */}
                {damageComparison && (
                    <div className={styles.damageComparison}>
                        <div className={styles.damageRow}>
                <span className={styles.damageLabel}>
                    Damage ({damageComparison.damageType}):
                </span>
                            <span className={styles.damageOld}>
                    {Math.round(damageComparison.oldDamage).toLocaleString()}
                </span>
                            <span className={styles.damageArrow}>→</span>
                            <span className={styles.damageNew}>
                    {Math.round(damageComparison.newDamage).toLocaleString()}
                </span>
                            <span
                                className={
                                    damageComparison.percentChange >= 0
                                        ? styles.damagePositive
                                        : styles.damageNegative
                                }
                            >
                    {damageComparison.percentChange >= 0 ? "+" : ""}
                                {damageComparison.percentChange.toFixed(2)}%
                </span>
                        </div>
                    </div>
                )}

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