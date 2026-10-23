import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import styles from "./Optimizer.module.css";
import memoryStyles from "./MemoryOptimizer.module.css";
import {
    ModalChooseCard,
    ProtocoreBlock,
    RenderCardSlot,
    StatsComparisonTable,
} from "@components";
import {
    getCardProtocores,
    saveCardProtocores,
    findCardForProtocore,
    removeProtocoreFromAllCards,
    getCardLevel,
    getCardRank,
    getCardAscend,
    getMemoryOptimizerData,
    saveMemoryOptimizerData,
    clearMemoryOptimizerData
} from "@localstorage";
import {
    optimizeMemory,
    resolveMainStatTarget,
    getAvailableProtocores,
    computeCardStats,
} from "@data";
import { useExcludedCards } from "@hooks";
import { useTranslation } from "react-i18next";

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

function MemoryOptimizer() {
    const [data, setData] = useState(() => getMemoryOptimizerData());
    const [builds, setBuilds] = useState([]);
    const [activeBuildIndex, setActiveBuildIndex] = useState(0);
    const [oldStats, setOldStats] = useState(null);
    const [oldDamageData, setOldDamageData] = useState(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [progressText, setProgressText] = useState("");
    const [isEquipping, setIsEquipping] = useState(false);
    const [excludedVersion, setExcludedVersion] = useState(0);
    const modalChooseCardRef = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        saveMemoryOptimizerData(data);
    }, [data]);

    const { exclusionOptions, handleExcludedCardsChange, formatCardOption } =
        useExcludedCards(data, setData, styles, excludedVersion);

    // ===== Тип карты =====
    const isSolar = data.selectedCard?.placementName === "solar";
    const targetType = isSolar ? "beta" : "delta";
    const targetTypeLabel = isSolar ? "Beta" : "Delta";
    const protocoreKey = `${targetType} Protocore`;

    // ===== Выбор карты =====
    const handleSelectCard = (placement, index, card) => {
        setData((prev) => ({
            ...prev,
            selectedCard: card,
            mainStat: null,
            subStat: null,
            betaProtocore: null,
            deltaProtocore: null,
        }));
        setBuilds([]);
    };

    const handleMainStatChange = (option) =>
        setData((prev) => ({ ...prev, mainStat: option }));

    const handleSubStatChange = (option) =>
        setData((prev) => ({ ...prev, subStat: option }));

    const handleBetaChange = (option) =>
        setData((prev) => ({ ...prev, betaProtocore: option }));

    const handleDeltaChange = (option) =>
        setData((prev) => ({ ...prev, deltaProtocore: option }));

    // ===== Clear all =====
    const clearAll = () => {
        if (!window.confirm(t('MemoryOptimizer.alertClearAll')))
            return;
        clearMemoryOptimizerData();
        setData(getMemoryOptimizerData());
        setBuilds([]);
        setActiveBuildIndex(0);
        setOldStats(null);
        setOldDamageData(null);
    };

    // Применяет сборку к одной карте: снимает протокоры со ВСЕХ карт,
    // очищает целевую карту и сохраняет на неё новые протокоры.
    const applyBuildToCard = (build, card) => {
        const slotResult = build.results[isSolar ? "solar" : "lunar"];
        const newProtocores = Object.values(slotResult || {}).filter(Boolean);

        // 1. Очищаем целевую карту (гарантия, что старые протокоры не останутся).
        saveCardProtocores(card.id, []);

        // 2. Снимаем новые протокоры со ВСЕХ карт (в т.ч. с не-целевых).
        newProtocores.forEach((p) => removeProtocoreFromAllCards(p.id));

        // 3. Сохраняем на целевую карту.
        saveCardProtocores(card.id, newProtocores);
    };

    // ===== Start optimization =====
    const startOptimization = () => {
        if (!data.selectedCard) {
            alert(t('MemoryOptimizer.alertChooseCard'));
            return;
        }

        const { available } = getAvailableProtocores(data.excludedCards || []);
        if (available.length === 0) {
            alert(t('MemoryOptimizer.alertExclude'));
            return;
        }

        const card = data.selectedCard;

        // Main Stat карты → формула урона
        const mainStatTarget = resolveMainStatTarget(data.mainStat, card);

        // Main Stat второго протокора (Beta/Delta) → фильтр secondary
        const protocoreMainStat = data[protocoreKey]?.value || null;

        // Sub Stat (substats протокора) → приоритет сортировки
        const subStatTarget = data.subStat?.value || null;

        setIsOptimizing(true);
        setProgressText(t('MemoryOptimizer.starting'));

        setTimeout(() => {
            try {
                const oldProtocores = getCardProtocores(card.id);
                const oldStatsCalc = computeCardStats(card, oldProtocores);

                const { builds: newBuilds } = optimizeMemory({
                    card,
                    allProtocores: available,
                    mainStatTarget,
                    protocoreMainStat,
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

    // ===== Equip on Card =====
    const handleEquipOnCard = () => {
        const activeBuild = builds[activeBuildIndex];
        const card = data.selectedCard;
        if (!activeBuild || !card) return;

        const confirmed = window.confirm(
            t('MemoryOptimizer.alertEquipOnCard', { card: card.name }),
        );
        if (!confirmed) return;

        setIsEquipping(true);
        try {
            applyBuildToCard(activeBuild, card);
            alert(t('MemoryOptimizer.alertEquipSuccess', { card: card.name }));
        } catch (err) {
            console.error("Equip error:", err);
            alert("Failed to equip protocores.");
        } finally {
            setIsEquipping(false);
            setExcludedVersion((v) => v + 1);  // ← добавь
            setData((prev) => ({
                ...prev,
                excludedCards: (prev.excludedCards || []).filter((opt) => {
                    const protocores = getCardProtocores(opt.value);
                    return protocores && protocores.length > 0;
                }),
            }));
        }
    };

    // ===== Активная сборка =====
    const activeBuild = builds[activeBuildIndex] || null;
    const activeResults = activeBuild?.results || null;

    // ===== Данные для RenderCardSlot =====
    const getCardData = (card) => {
        if (!card) return null;
        const id = String(card.id);
        return {
            level: getCardLevel(id),
            rank: getCardRank(id),
            isAscended: getCardAscend(id),
            protocores: [],
        };
    };

    return (
        <section className={memoryStyles.container}>
            <nav className={memoryStyles.navigation}>
                <div className={memoryStyles.selectMenu}>
                    {/* Exclude protocores */}
                    <div className={memoryStyles.excludeSelectContainer}>
                        {t('MemoryOptimizer.excludeText')}
                        <div className={memoryStyles.selectContainer}>
                            <Select
                                isMulti
                                options={exclusionOptions}
                                value={data.excludedCards || []}
                                onChange={handleExcludedCardsChange}
                                className={styles.select}
                                placeholder={t('MemoryOptimizer.excludePlaceholder')}
                                isSearchable
                                formatOptionLabel={formatCardOption}
                            />
                        </div>
                    </div>

                    {/* Choose Protocores: Beta ИЛИ Delta в зависимости от типа карты */}
                    <div className={memoryStyles.protoSelectContainer}>
                        {data.selectedCard ? (
                            <div className={memoryStyles.selectContainer}>
                                {t('MemoryOptimizer.chooseProtocore', {targetTypeLabel: targetTypeLabel})}
                                <Select
                                    placeholder={t('MemoryOptimizer.chooseProtocorePlaceholder', {targetTypeLabel: targetTypeLabel})}
                                    options={
                                        isSolar
                                            ? betaProtocoreOptions
                                            : deltaProtocoreOptions
                                    }
                                    value={data[protocoreKey]}
                                    onChange={
                                        isSolar ? handleBetaChange : handleDeltaChange
                                    }
                                    className={styles.select}
                                    isClearable
                                    isSearchable={false}
                                />
                            </div>
                        ) : (
                            <div className={memoryStyles.selectContainer}>
            <span className={memoryStyles.hintText}>
               {t('MemoryOptimizer.noProtocoreText')}
            </span>
                            </div>
                        )}
                    </div>

                    {/* Main Stat / Sub Stat */}
                    <div className={memoryStyles.statsSelectContainer}>
                        {t('MemoryOptimizer.mainStat')}
                        <div className={memoryStyles.mainStatContainer}>
                            <Select
                                placeholder={t('MemoryOptimizer.mainStatPlaceholder')}
                                options={MAIN_STAT_OPTIONS}
                                value={data.mainStat}
                                onChange={handleMainStatChange}
                                className={styles.select}
                                isClearable
                                isSearchable={false}
                            />
                        </div>

                        {t('MemoryOptimizer.subStat')}
                        <div className={memoryStyles.subStatContainer}>
                            <Select
                                placeholder={t('MemoryOptimizer.subStatPlaceholder')}
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
                <article className={memoryStyles.articleContainer}>
                    <RenderCardSlot
                        card={data.selectedCard}
                        placement="any"
                        index={0}
                        getCardData={getCardData}
                        cardModalRef={modalChooseCardRef}
                        smallCard={true}
                        showProtocores={false}
                        className={`${styles.choosenCard} ${!data.selectedCard ? styles.emptySlot : ""}`}
                        showCardSlotEquipped={false}
                    />

                    {activeResults && (
                        <div className={memoryStyles.resultProtocores}>
                            {Object.entries(
                                activeResults[isSolar ? "solar" : "lunar"] || {},
                            ).map(
                                ([type, protocore]) =>
                                    protocore && (
                                        <div
                                            key={type}
                                            className={memoryStyles.resultProtocore}
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
            </section>

            {/* Кнопки */}
            <div className={styles.buttonsContainer}>
                <button className={styles.clearButton} onClick={clearAll}>
                    {t('MemoryOptimizer.clearButton')}
                </button>
                <button
                    className={styles.startButton}
                    onClick={startOptimization}
                    disabled={isOptimizing || !data.selectedCard}
                >
                    {isOptimizing ? t('MemoryOptimizer.startButtonActive') : t('MemoryOptimizer.startButton')}
                </button>
                <button
                    className={styles.sendButton}
                    onClick={handleEquipOnCard}
                    disabled={!activeResults || isOptimizing || isEquipping}
                >
                    {isEquipping ? t('MemoryOptimizer.equipButtonActive') : t('MemoryOptimizer.equipButton')}
                </button>
            </div>

            {/* Индикатор загрузки */}
            {isOptimizing && (
                <div className={styles.loadingIndicator}>
                    {progressText || t('MemoryOptimizer.progressText')}
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