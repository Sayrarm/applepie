import Select from "react-select";
import {useState, useRef, useEffect, useMemo} from "react";
import styles from "./Optimizer.module.css";
import {
    ChooseCompanion,
    ChooseWeapon,
    ModalChooseCard,
    RenderCardSlot,
    ProtocoreBlock,
    StatsComparisonTable
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
    removeProtocoreFromAllCards,
    findCardForProtocore,
} from "@localstorage";
import {
    calculateTeamStats,
    computeKitDamage,
    detectDamageType,
    buildOptimizationResults,
    memoriesData
} from "@data";
import {getImageUrl, useSolarPair} from "@hooks";
import { useTranslation } from "react-i18next";

const CARD_SLOTS = [
    {id: "solar1", placement: "solar", index: 0},
    {id: "solar2", placement: "solar", index: 1},
    {id: "lunar1", placement: "lunar", index: 0},
    {id: "lunar2", placement: "lunar", index: 1},
    {id: "lunar3", placement: "lunar", index: 2},
    {id: "lunar4", placement: "lunar", index: 3},
];

function TeamOptimizer() {
    const [data, setData] = useState(() => getOptimizerData());
    const [builds, setBuilds] = useState([]);
    const [activeBuildIndex, setActiveBuildIndex] = useState(0);
    const [oldTeamStats, setOldTeamStats] = useState(null);
    const [oldDamageData, setOldDamageData] = useState(null);
    const [damageType, setDamageType] = useState(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [progressText, setProgressText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isEquipping, setIsEquipping] = useState(false);
    const [cardsWithProtocoresVersion, setCardsWithProtocoresVersion] = useState(0);
    const modalChooseCardRef = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        saveOptimizerData(data);
    }, [data]);

    const betaProtocoreOptions = [
        {value: "Oath Recovery Boost", label: "Oath Recovery Boost"},
        {value: "Oath Strength", label: "Oath Strength"},
        {value: "Expedited Energy Boost", label: "Expedited Energy Boost"},
        {value: "ATK Bonus", label: "ATK Bonus"},
        {value: "HP Bonus", label: "HP Bonus"},
        {value: "DEF Bonus", label: "DEF Bonus"},
    ];

    const deltaProtocoreOptions = [
        {value: "CRIT Rate", label: "CRIT Rate"},
        {value: "CRIT DMG", label: "CRIT DMG"},
        {value: "DMG Boost to Weakened", label: "DMG Boost to Weakened"},
        {value: "ATK Bonus", label: "ATK Bonus"},
        {value: "HP Bonus", label: "HP Bonus"},
        {value: "DEF Bonus", label: "DEF Bonus"},
    ];

    // Применяет сборку к картам: снимает протокоры со ВСЕХ карт
    // и сохраняет на целевые. Возвращает массив {cardId, protocores}.
    const applyBuildToCards = (build) => {
        const newProtocoresBySlot = [];
        const allNewIds = [];

        CARD_SLOTS.forEach((slot) => {
            const card = data.cards[slot.id];
            if (!card) return;

            const slotResult = build.results[slot.id];
            const protocores = slotResult
                ? Object.values(slotResult).filter(Boolean)
                : [];

            newProtocoresBySlot.push({ cardId: card.id, protocores });
            protocores.forEach((p) => allNewIds.push(p.id));
        });

        // 1. Очищаем целевые карты (гарантия, что старые протокоры не останутся).
        newProtocoresBySlot.forEach(({ cardId }) => {
            saveCardProtocores(cardId, []);
        });

        // 2. Снимаем новые протокоры со ВСЕХ карт (в т.ч. с не-целевых).
        allNewIds.forEach((id) => {
            removeProtocoreFromAllCards(id);
        });

        // 3. Сохраняем на целевые карты.
        newProtocoresBySlot.forEach(({ cardId, protocores }) => {
            saveCardProtocores(cardId, protocores);
        });

        return newProtocoresBySlot;
    };

    const handleEquipOnCards = () => {
        const activeBuild = builds[activeBuildIndex];
        if (!activeBuild) return;

        const confirmed = window.confirm(
            t('TeamOptimizer.alertEquipOnCards'),
        );
        if (!confirmed) return;

        setIsEquipping(true);
        try {
            applyBuildToCards(activeBuild);
            alert(t('TeamOptimizer.alertEquipSuccess'));
        } catch (err) {
            console.error("Equip error:", err);
            alert("Failed to equip protocores.");
        } finally {
            setIsEquipping(false);
            setCardsWithProtocoresVersion((v) => v + 1);
            setData((prev) => ({
                ...prev,
                excludedCards: (prev.excludedCards || []).filter((opt) => {
                    const protocores = getCardProtocores(opt.value);
                    return protocores && protocores.length > 0;
                }),
            }));
        }
    };

    const buildOldResults = (cards) => {
        const result = {
            solar1: {alpha: null, beta: null},
            solar2: {alpha: null, beta: null},
            lunar1: {gamma: null, delta: null},
            lunar2: {gamma: null, delta: null},
            lunar3: {gamma: null, delta: null},
            lunar4: {gamma: null, delta: null},
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
    const {teamDmgBonus} = useSolarPair(solarCards);

    const findSlotId = (placement, index) =>
        CARD_SLOTS.find(
            (slot) => slot.placement === placement && slot.index === index,
        )?.id;

    const handleSelectCard = (placement, index, card) => {
        const slotId = findSlotId(placement, index);
        if (!slotId) return;
        setData((prev) => ({
            ...prev,
            cards: {...prev.cards, [slotId]: card},
        }));
    };

    const handleSelectCompanion = (companion) =>
        setData((prev) => ({...prev, selectedCompanion: companion}));

    const handleSelectWeapon = (weapon) =>
        setData((prev) => ({...prev, selectedWeapon: weapon}));

    const handleBetaChange1 = (option) =>
        setData((prev) => ({...prev, betaProtocore_1: option}));
    const handleBetaChange2 = (option) =>
        setData((prev) => ({...prev, betaProtocore_2: option}));
    const handleDeltaChange1 = (option) =>
        setData((prev) => ({ ...prev, deltaProtocore_1: option }));
    const handleDeltaChange2 = (option) =>
        setData((prev) => ({ ...prev, deltaProtocore_2: option }));

    const clearAll = () => {
        if (!window.confirm(t('TeamOptimizer.alertClearAll')))
            return;
        clearOptimizerData();
        setData(getOptimizerData());
        setBuilds([]);
        setActiveBuildIndex(0);
        setOldTeamStats(null);
        setOldDamageData(null);
        setDamageType(null);
    };

    const startOptimization = () => {
        const allProtocores = JSON.parse(
            localStorage.getItem("protocores") || "[]",
        );

        if (allProtocores.length === 0) {
            alert(t('TeamOptimizer.alertNoProtocores'));
            return;
        }

        if (!data.selectedCompanion || !data.selectedWeapon) {
            alert(t('TeamOptimizer.alertCompanion'));
            return;
        }

        // ⚠️ Фильтрация исключённых
        const excludedProtocoreIds = new Set();
        (data.excludedCards || []).forEach((opt) => {
            const cardId = opt.value;
            const protocores = getCardProtocores(cardId);
            protocores.forEach((p) => excludedProtocoreIds.add(p.id));
        });

        const availableProtocores = allProtocores.filter(
            (p) => !excludedProtocoreIds.has(p.id),
        );

        if (availableProtocores.length === 0) {
            alert(t('TeamOptimizer.alertExclude'));
            return;
        }

        setIsOptimizing(true);
        setProgressText(t('TeamOptimizer.starting'));

        setTimeout(() => {
            try {
                const targets = {
                    beta1: data.betaProtocore_1?.value,
                    beta2: data.betaProtocore_2?.value,
                    delta: data.deltaProtocore_1?.value,        // ← для обратной совместимости
                    delta1: data.deltaProtocore_1?.value,
                    delta2: data.deltaProtocore_2?.value,
                    subStat1: data.subStat1?.value,
                    subStat2: data.subStat2?.value,
                };

                const context = {
                    selectedCompanion: data.selectedCompanion,
                    selectedMCWeapon: data.selectedWeapon,
                    teamDmgBonus,
                };

                const {builds: newBuilds} = buildOptimizationResults({
                    cards: data.cards,
                    allProtocores: availableProtocores,
                    targets,
                    context,
                    onProgress: (cur, total) =>
                        setProgressText(`Building ${cur} of ${total}...`),
                });

                // Старая сборка
                const oldResults = buildOldResults(data.cards);
                const oldStats = calculateTeamStats(data.cards, oldResults);
                const oldDamage = computeKitDamage(oldStats, context);

                const detectedType = detectDamageType(targets.delta);

                setBuilds(newBuilds);
                setActiveBuildIndex(0);
                setOldTeamStats(oldStats);
                setOldDamageData(oldDamage);
                setDamageType(detectedType);
            } finally {
                setIsOptimizing(false);
                setProgressText("");
            }
        }, 50);
    };

    const handleSendToShowcase = () => {
        const activeBuild = builds[activeBuildIndex];
        if (!activeBuild) return;

        const confirmed = window.confirm(
            t('TeamOptimizer.alertSendShowcase'),
        );
        if (!confirmed) return;

        setIsSending(true);

        try {
            applyBuildToCards(activeBuild);

            const teams = getShowcaseTeams();

            const getNextTeamNumber = (list) => {
                if (list.length === 0) return 1;
                const numbers = list
                    .map((t) => {
                        const m = t.name?.match(/Optimized Team (\d+)/);
                        return m ? parseInt(m[1], 10) : 0;
                    })
                    .filter((n) => n > 0);
                return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
            };

            const teamName = `Optimized Team ${getNextTeamNumber(teams)}`;

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

            saveShowcaseTeams([...teams, newTeam]);

            alert(t('TeamOptimizer.alertSentShowcaseSuccess', { teamName }));
        } catch (err) {
            console.error("Send to Showcase error:", err);
            alert("Failed to send team to Showcase. See console for details.");
        } finally {
            setIsSending(false);
            setCardsWithProtocoresVersion((v) => v + 1);
            setData((prev) => ({
                ...prev,
                excludedCards: (prev.excludedCards || []).filter((opt) => {
                    const protocores = getCardProtocores(opt.value);
                    return protocores && protocores.length > 0;
                }),
            }));
        }
    };

    const getCardData = (card) => {
        if (!card) return null;
        return {level: 1, rank: 0, isAscended: false, protocores: []};
    };

    const activeBuild = builds[activeBuildIndex] || null;
    const activeResults = activeBuild?.results || null;

    // Карточки, у которых сейчас есть протокоры
    const cardsWithProtocores = useMemo(() => {
        return memoriesData
            .map((card) => ({
                card,
                protocores: getCardProtocores(card.id),
            }))
            .filter(({protocores}) => protocores && protocores.length > 0);
    }, [cardsWithProtocoresVersion]);

    const formatCardOption = (option, { context }) => {
        const isValue = context === "value";

        return (
            <div className={styles.cardOption}>
                <img
                    src={getImageUrl(option.imageSmall)}
                    alt={option.label}
                    className={styles.cardOptionImage}
                    style={{
                        width: isValue ? 24 : 32,
                        height: isValue ? 24 : 32,
                    }}
                />
                {!isValue && (
                    <span className={styles.cardOptionLabel}>{option.label}</span>
                )}
            </div>
        );
    };

    const exclusionOptions = useMemo(
        () =>
            cardsWithProtocores
                .map(({ card }) => ({
                    value: card.id,
                    label: card.name,
                    imageSmall: card.imageSmall,
                }))
                .sort((a, b) => a.label.localeCompare(b.label)),
        [cardsWithProtocores],
    );

    const handleExcludedCardsChange = (options) => {
        setData((prev) => ({...prev, excludedCards: options || []}));
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
                        {t('TeamOptimizer.excludeText')}
                        <div className={styles.selectContainer}>
                            <Select
                                isMulti
                                options={exclusionOptions}
                                value={data.excludedCards || []}
                                onChange={handleExcludedCardsChange}
                                className={styles.select}
                                placeholder={t('TeamOptimizer.excludePlaceholder')}
                                isSearchable
                                formatOptionLabel={formatCardOption}
                            />
                        </div>
                    </div>
                    <div className={styles.protoSelectContainer}>
                        {t('TeamOptimizer.chooseProtocoresText')}
                        <div className={styles.selectContainer}>
                            Beta 1:
                            <Select
                                placeholder={t('TeamOptimizer.chooseBetaPlaceholder')}
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
                                placeholder={t('TeamOptimizer.chooseBetaPlaceholder')}
                                options={betaProtocoreOptions}
                                value={data.betaProtocore_2}
                                onChange={handleBetaChange2}
                                className={styles.select}
                                isClearable
                                isSearchable={false}
                            />
                        </div>
                        <div className={styles.selectContainer}>
                            Delta 1:
                            <Select
                                placeholder={t('TeamOptimizer.chooseDeltaPlaceholder')}
                                options={deltaProtocoreOptions}
                                value={data.deltaProtocore_1}
                                onChange={handleDeltaChange1}
                                className={styles.select}
                                isClearable
                                isSearchable={false}
                            />
                        </div>
                        <div className={styles.selectContainer}>
                            Delta 2:
                            <Select
                                placeholder={t('TeamOptimizer.chooseDeltaPlaceholder')}
                                options={deltaProtocoreOptions}
                                value={data.deltaProtocore_2}
                                onChange={handleDeltaChange2}
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

                        {activeResults && activeResults[slot.id] && (
                            <div className={styles.resultProtocores}>
                                {Object.entries(activeResults[slot.id]).map(
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
                                                    cardImage={findCardForProtocore(protocore.id)}
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
                    {t('TeamOptimizer.clearButton')}
                </button>
                <button
                    className={styles.startButton}
                    onClick={startOptimization}
                    disabled={isOptimizing}
                >
                    {isOptimizing ? t('TeamOptimizer.startButtonActive') : t('TeamOptimizer.startButton')}
                </button>
                <button
                    className={styles.sendButton}
                    onClick={handleEquipOnCards}
                    disabled={!activeResults || isOptimizing || isEquipping || isSending}
                >
                    {isEquipping ? t('TeamOptimizer.equipButtonActive') : t('TeamOptimizer.equipButton')}
                </button>
                <button
                    className={styles.sendButton}
                    onClick={handleSendToShowcase}
                    disabled={!activeResults || isOptimizing || isSending || isEquipping}
                >
                    {isSending ? t('TeamOptimizer.sendButtonActive') : t('TeamOptimizer.sendButton')}
                </button>
            </div>

            {/* Индикатор загрузки */}
            {isOptimizing && (
                <div className={styles.loadingIndicator}>
                    {progressText || t('TeamOptimizer.progressText')}
                </div>
            )}

            <div className={styles.resultContainer}>
                {builds.length > 0 && (
                    <StatsComparisonTable
                        beforeStats={oldTeamStats}
                        beforeDamage={oldDamageData}
                        builds={builds}
                        activeIndex={activeBuildIndex}
                        onSelectBuild={setActiveBuildIndex}
                        defaultSortKey={damageType}
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

export default TeamOptimizer;