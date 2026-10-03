import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import styles from "./Optimizer.module.css";
import {
    ModalChooseCard,
    ProtocoreBlock,
    StatsComparisonTable,
} from "@components";
import {
    getOptimizerData,
    saveOptimizerData,
    clearOptimizerData,
    getCardProtocores,
    saveCardProtocores,
    findCardForProtocore,
    removeProtocoreFromAllCards
} from "@localstorage";
import {
    optimizeMemory,
    resolveMainStatTarget,
    getAvailableProtocores, computeCardStats
} from "@data";
import { useExcludedCards } from "@hooks";

// ===== Опции селектов =====
const MAIN_STAT_OPTIONS = [
    { value: "Default", label: "Default (by talent)" },
    { value: "HP", label: "HP" },
    { value: "ATK", label: "ATK" },
    { value: "DEF", label: "DEF" },
];

const SUB_STAT_OPTIONS = [
    { value: "CRIT Rate", label: "CRIT Rate" },
    { value: "CRIT DMG", label: "CRIT DMG" },
    { value: "DMG Boost to Weakened", label: "DMG Boost to Weakened" },
    { value: "Oath Strength", label: "Oath Strength" },
    { value: "ATK Bonus", label: "ATK Bonus" },
    { value: "HP Bonus", label: "HP Bonus" },
    { value: "DEF Bonus", label: "DEF Bonus" },
];

function MemoryOptimizer() {
    const [data, setData] = useState(() => getOptimizerData());
    const [builds, setBuilds] = useState([]);
    const [activeBuildIndex, setActiveBuildIndex] = useState(0);
    const [oldStats, setOldStats] = useState(null);
    const [oldDamageData, setOldDamageData] = useState(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [progressText, setProgressText] = useState("");
    const [isEquipping, setIsEquipping] = useState(false);
    const modalChooseCardRef = useRef();

    useEffect(() => {
        saveOptimizerData(data);
    }, [data]);

    const { exclusionOptions, handleExcludedCardsChange, formatCardOption } =
        useExcludedCards(data, setData, styles);

    // ===== Выбор карты =====
    const handleSelectCard = (placement, index, card) => {
        setData((prev) => ({
            ...prev,
            selectedCard: card,
            // Сбрасываем селекты при смене карты
            mainStat: null,
            subStat: null,
        }));
        setBuilds([]);
    };

    const handleMainStatChange = (option) =>
        setData((prev) => ({ ...prev, mainStat: option }));

    const handleSubStatChange = (option) =>
        setData((prev) => ({ ...prev, subStat: option }));

    // ===== Тип протокора для выбранной карты =====
    const isSolar = data.selectedCard?.placement === "solar";
    const targetType = isSolar ? "beta" : "delta";
    const targetTypeLabel = isSolar ? "Beta" : "Delta";

    // ===== Clear all =====
    const clearAll = () => {
        if (!window.confirm("Are you sure you want to clear all settings?"))
            return;
        clearOptimizerData();
        setData(getOptimizerData());
        setBuilds([]);
        setActiveBuildIndex(0);
        setOldStats(null);
        setOldDamageData(null);
    };

    // ===== Start optimization =====
    const startOptimization = () => {
        if (!data.selectedCard) {
            alert("Please select a card first.");
            return;
        }

        const { available } = getAvailableProtocores(data.excludedCards || []);
        if (available.length === 0) {
            alert("All protocores are excluded. Remove some exclusions.");
            return;
        }

        const card = data.selectedCard;
        const mainStatTarget = resolveMainStatTarget(data.mainStat, card);
        const subStatTarget = data.subStat?.value || null;

        setIsOptimizing(true);
        setProgressText("Calculating...");

        setTimeout(() => {
            try {
                // Старая сборка карты
                const oldProtocores = getCardProtocores(card.id);
                const oldStatsCalc = computeCardStats(card, oldProtocores);

                const { builds: newBuilds } = optimizeMemory({
                    card,
                    allProtocores: available,
                    mainStatTarget,
                    subStatTarget,
                });

                setBuilds(newBuilds);
                setActiveBuildIndex(0);
                setOldStats(oldStatsCalc.stats);
                setOldDamageData(oldStatsCalc.damageData);
            } finally {
                setIsOptimizing(false);
                setProgressText("");
            }
        }, 50);
    };

    // ===== Equip on Card (вместо Send to Showcase) =====
    const handleEquipOnCard = () => {
        const activeBuild = builds[activeBuildIndex];
        const card = data.selectedCard;
        if (!activeBuild || !card) return;

        const confirmed = window.confirm(
            `Protocores on "${card.name}" will be replaced. Continue?`,
        );
        if (!confirmed) return;

        setIsEquipping(true);
        try {
            const slotResult = activeBuild.results[
                isSolar ? "solar" : "lunar"
                ];
            const newProtocores = Object.values(slotResult || {}).filter(Boolean);

            // Убираем эти протокоры со всех других карт
            const newIds = new Set(newProtocores.map((p) => p.id));
            newIds.forEach((id) => removeProtocoreFromAllCards(id));

            // Сохраняем на нашу карту
            saveCardProtocores(card.id, newProtocores);

            alert(`Protocores equipped on "${card.name}"!`);
        } catch (err) {
            console.error("Equip error:", err);
            alert("Failed to equip protocores.");
        } finally {
            setIsEquipping(false);
        }
    };

    // ===== Активная сборка =====
    const activeBuild = builds[activeBuildIndex] || null;
    const activeResults = activeBuild?.results || null;

    return (
        <section className={styles.container}>
            <nav className={styles.navigation}>
                <div className={styles.selectMenu}>
                    {/* Exclude protocores */}
                    <div className={styles.protoSelectContainer}>
                        Exclude protocores:
                        <div className={styles.selectContainer}>
                            <Select
                                isMulti
                                options={exclusionOptions}
                                value={data.excludedCards || []}
                                onChange={handleExcludedCardsChange}
                                className={styles.select}
                                placeholder="Select cards to exclude their protocores"
                                isSearchable
                                formatOptionLabel={formatCardOption}
                            />
                        </div>
                    </div>

                    {/* Choose Card */}
                    <div className={styles.protoSelectContainer}>
                        Choose Card:
                        <div className={styles.selectContainer}>
                            <button
                                className={styles.chooseButton}
                                onClick={() => modalChooseCardRef.current?.showModal("all", 0)}
                            >
                                {data.selectedCard ? data.selectedCard.name : "Select Card"}
                            </button>
                        </div>
                    </div>

                    {/* Main Stat */}
                    <div className={styles.statsSelectContainer}>
                        Main Stat:
                        <div className={styles.selectContainer}>
                            <Select
                                placeholder="Select Main Stat"
                                options={MAIN_STAT_OPTIONS}
                                value={data.mainStat}
                                onChange={handleMainStatChange}
                                className={styles.select}
                                isClearable
                                isSearchable={false}
                            />
                        </div>
                    </div>

                    {/* Sub Stat */}
                    <div className={styles.statsSelectContainer}>
                        Sub Stat:
                        <div className={styles.selectContainer}>
                            <Select
                                placeholder="Select Sub Stat"
                                options={SUB_STAT_OPTIONS}
                                value={data.subStat}
                                onChange={handleSubStatChange}
                                className={styles.select}
                                isClearable
                                isSearchable={false}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Карта + результат */}
            <section className={styles.cardsContainer}>
                {data.selectedCard && (
                    <article className={styles.articleContainer}>
                        <img
                            src={data.selectedCard.imageSmall}
                            alt={data.selectedCard.name}
                            className={styles.choosenCard}
                        />

                        {activeResults && (
                            <div className={styles.resultProtocores}>
                                {Object.entries(
                                    activeResults[isSolar ? "solar" : "lunar"] || {},
                                ).map(
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
                                                    cardImage={findCardForProtocore(
                                                        protocore.id,
                                                    )}
                                                />
                                            </div>
                                        ),
                                )}
                            </div>
                        )}
                    </article>
                )}
            </section>

            {/* Кнопки */}
            <div className={styles.buttonsContainer}>
                <button className={styles.clearButton} onClick={clearAll}>
                    Clear all
                </button>
                <button
                    className={styles.startButton}
                    onClick={startOptimization}
                    disabled={isOptimizing || !data.selectedCard}
                >
                    {isOptimizing ? "Optimizing..." : "Start"}
                </button>
                <button
                    className={styles.sendButton}
                    onClick={handleEquipOnCard}
                    disabled={!activeResults || isOptimizing || isEquipping}
                >
                    {isEquipping ? "Equipping..." : "Equip on Card"}
                </button>
            </div>

            {/* Индикатор загрузки */}
            {isOptimizing && (
                <div className={styles.loadingIndicator}>
                    {progressText || "Calculating best protocores, please wait..."}
                </div>
            )}

            {/* Результаты */}
            <div className={styles.resultContainer}>
                {builds.length > 0 && (
                    <StatsComparisonTable
                        beforeStats={oldStats}
                        beforeDamage={oldDamageData}
                        builds={builds}
                        activeIndex={activeBuildIndex}
                        onSelectBuild={setActiveBuildIndex}
                        defaultSortKey="base"
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

export default MemoryOptimizer;