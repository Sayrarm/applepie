import React, {useState, useEffect, useRef, useMemo, useCallback} from "react";
import styles from "./MyMemories.module.css";
import {
    useSearch,
    useSort,
    useFilter,
    FilterSortBarMemories,
    MemoriesTable,
} from "@components";
import {
    memoriesData,
    getStatsWithRank,
    calculateFinalStats,
    getProtocoreLevelsString,
} from "@data";
import {
    getCardLevel,
    getCardRank,
    getCardAscend,
    getCardProtocores,
    enhanceMemoriesWithAvailability,
} from "@localstorage";

function MyMemories() {
    const {searchQuery, onSearch} = useSearch("mymemories");
    const {sortCriteria, handleSortChange, clearSorting, sortMemories} =
        useSort("mymemories");
    const {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        applyFilters,
        clearFilters,
        filterMemories,
    } = useFilter("mymemories");

    const filterModalRef = useRef();
    const tableRef = useRef(); // ссылка на MemoriesTable

    // тик — меняется, когда надо пересчитать данные из localStorage
    const [refreshTick, setRefreshTick] = useState(0);

    const refresh = useCallback(() => {
        setRefreshTick((t) => t + 1);
    }, []);

    // ===== вычисляем availableCards во время рендера (мемоизация) =====
    const availableCards = useMemo(() => {
        const allCards = enhanceMemoriesWithAvailability(memoriesData);

        return allCards
            .filter((card) => card.isAvailable === true)
            .map((card) => {
                const cardId = String(card.id);
                const level = getCardLevel(cardId);
                const rank = getCardRank(cardId);
                const isAscended = getCardAscend(cardId);
                const protocores = getCardProtocores(cardId);
                const protocoreLevels = getProtocoreLevelsString(protocores);

                const baseStats = getStatsWithRank(card, level, rank, isAscended);

                if (!baseStats) {
                    return {
                        ...card,
                        level,
                        rank,
                        isAscended,
                        protocores,
                        protocoreLevels,
                        stats: {
                            hp: 0,
                            atk: 0,
                            def: 0,
                            critRate: 0,
                            critDmg: 0,
                            dmgBoost: 0,
                            oathStrength: 0,
                            oathRecoveryBoost: 0,
                            expeditedEnergyBoost: 0,
                        },
                    };
                }

                const finalStats = calculateFinalStats(card, baseStats, protocores);

                return {
                    ...card,
                    level,
                    rank,
                    isAscended,
                    protocores,
                    protocoreLevels,
                    stats: finalStats,
                };
            });
    }, []);

    // ===== эффект — только подписка на внешние события =====
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (
                e.key &&
                (e.key.startsWith("cardAvailable_") ||
                    e.key.startsWith("cardLevel_") ||
                    e.key.startsWith("cardRank_") ||
                    e.key.startsWith("cardAscend_") ||
                    e.key.startsWith("card_protocores_"))
            ) {
                refresh();
            }
        };

        const handleProtocoresUpdate = () => refresh();
        const handleCardAvailabilityChange = () => refresh();

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("protocoresUpdated", handleProtocoresUpdate);
        window.addEventListener("cardAvailabilityChanged", handleCardAvailabilityChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("protocoresUpdated", handleProtocoresUpdate);
            window.removeEventListener("cardAvailabilityChanged", handleCardAvailabilityChange);
        };
    }, [refresh]);

    // ===== фильтрация и сортировка карточек =====
    const filteredCards = filterMemories(availableCards).filter((card) => {
        return (
            card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.char.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const sortedCards = sortMemories(filteredCards);

    const resetAllSettings = () => {
        setSelectedChar("ALL");
        clearSorting();
        onSearch("");
        clearFilters();
        if (filterModalRef.current) {
            filterModalRef.current.clearAll();
        }
        tableRef.current?.resetSort(); // сброс сортировки в таблице
    };

    return (
        <section className={styles.container}>
            <FilterSortBarMemories
                searchQuery={searchQuery}
                onSearch={onSearch}
                sortCriteria={sortCriteria}
                handleSortChange={handleSortChange}
                clearSorting={clearSorting}
                selectedChar={selectedChar}
                setSelectedChar={setSelectedChar}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                filterModalRef={filterModalRef}
                resetAllSettings={resetAllSettings}
                storagePrefix="mymemories"
            />

            <section className={styles.myMemoriesContainer}>
                <MemoriesTable
                    ref={tableRef}
                    data={sortedCards}
                    storageKey="mymemories"
                    emptyText="No available memories found"
                />
            </section>
        </section>
    );
}

export default MyMemories;