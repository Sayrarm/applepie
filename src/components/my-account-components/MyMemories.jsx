import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./MyMemories.module.css";
import {
  useSearch,
  useSort,
  useFilter,
  FilterSortBarMemories,
} from "@components";
import {
  memoriesData,
  getStatsWithRank,
  calculateFinalStats,
  getProtocoreLevelsString, rankOptions, formatOptionLabel,
} from "@data";
import { getImageUrl } from "@hooks";
import {
  getCardLevel,
  getCardRank,
  getCardAscend,
  getCardProtocores,
  enhanceMemoriesWithAvailability,
  getTableSort,
  saveTableSort,
  clearTableSort,
} from "@localstorage";

// Функция сортировки для таблицы
const sortTableData = (data, sortConfig) => {
  if (!sortConfig || !sortConfig.key) return data;

  const { key, direction } = sortConfig;
  const sorted = [...data];

  sorted.sort((a, b) => {
    // Специальная обработка для уровня
    if (key === "level") {
      // Сначала сравниваем уровень
      if (a.level !== b.level) {
        return direction === "asc" ? a.level - b.level : b.level - a.level;
      }
      // При равном уровне - возвышенные выше
      const aAscend = a.isAscended ? 1 : 0;
      const bAscend = b.isAscended ? 1 : 0;
      return direction === "asc" ? aAscend - bAscend : bAscend - aAscend;
    }

    // Специальная обработка для ранга
    if (key === "rank") {
      if (a.rank !== b.rank) {
        return direction === "asc" ? a.rank - b.rank : b.rank - a.rank;
      }
      const aAscend = a.isAscended ? 1 : 0;
      const bAscend = b.isAscended ? 1 : 0;
      return direction === "asc" ? aAscend - bAscend : bAscend - aAscend;
    }

    // Для остальных полей
    let aValue, bValue;

    // Для статов берём из stats
    if (
      [
        "hp",
        "atk",
        "def",
        "critRate",
        "critDmg",
        "dmgBoost",
        "oathStrength",
        "oathRecoveryBoost",
        "expeditedEnergyBoost",
      ].includes(key)
    ) {
      aValue = a.stats?.[key] ?? 0;
      bValue = b.stats?.[key] ?? 0;
    } else {
      aValue = a[key];
      bValue = b[key];
    }

    // Если значения — числа
    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Если значения — строки
    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return sorted;
};

function MyMemories() {
  // Используем хуки
  const { searchQuery, onSearch } = useSearch("mymemories");
  const { sortCriteria, handleSortChange, clearSorting, sortMemories } =
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
  const [availableCards, setAvailableCards] = useState([]);

  // ===== ЗАГРУЗАЕМ СОРТИРОВКУ ТАБЛИЦЫ =====
  const [tableSort, setTableSort] = useState(() => getTableSort());

  // ===== СОХРАНЯЕМ СОРТИРОВКУ ТАБЛИЦЫ =====
  useEffect(() => {
    saveTableSort(tableSort);
  }, [tableSort]);

  // Функция обновления доступных карточек
  const refreshAvailableCards = () => {
    // Получаем все карточки со статусом доступности
    const allCards = enhanceMemoriesWithAvailability(memoriesData);

    // Фильтруем только доступные карточки
    const available = allCards
      .filter((card) => card.isAvailable === true)
      .map((card) => {
        const cardId = String(card.id);

        // Используем функции из card-storage
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

    setAvailableCards(available);
  };

  useEffect(() => {
    refreshAvailableCards();

    const handleStorageChange = (e) => {
      if (
        e.key &&
        (e.key.startsWith("cardAvailable_") ||
          e.key.startsWith("cardLevel_") ||
          e.key.startsWith("cardRank_") ||
          e.key.startsWith("cardAscend_") ||
          e.key.startsWith("card_protocores_"))
      ) {
        refreshAvailableCards();
      }
    };

    const handleProtocoresUpdate = () => {
      refreshAvailableCards();
    };

    const handleCardAvailabilityChange = () => {
      refreshAvailableCards();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("protocoresUpdated", handleProtocoresUpdate);
    window.addEventListener(
      "cardAvailabilityChanged",
      handleCardAvailabilityChange,
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("protocoresUpdated", handleProtocoresUpdate);
      window.removeEventListener(
        "cardAvailabilityChanged",
        handleCardAvailabilityChange,
      );
    };
  }, []);

  // Фильтруем данные через хук useFilter
  const filteredCards = filterMemories(availableCards).filter((card) => {
    return (
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.char.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Сортируем через useSort (основная сортировка)
  let sortedCards = sortMemories(filteredCards);

  // Применяем сортировку по таблице (поверх основной)
  const handleTableSort = (key) => {
    setTableSort((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "desc" };
    });
  };

  // Применяем сортировку по таблице
  if (tableSort.key) {
    sortedCards = sortTableData(sortedCards, {
      key: tableSort.key,
      direction: tableSort.direction,
    });
  }

  const resetAllSettings = () => {
    setSelectedChar("ALL");
    clearSorting();
    onSearch("");
    clearFilters();
    setTableSort({ key: null, direction: "asc" });

    // Очищаем localStorage через сервис
    clearTableSort();

    if (filterModalRef.current) {
      filterModalRef.current.clearAll();
    }
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) return "—";
    if (typeof num === "string") return num;
    return num.toFixed(2);
  };

  // Получить класс для заголовка сортировки
  const getSortClass = (key) => {
    if (tableSort.key !== key) return "";
    return tableSort.direction === "asc" ? styles.sortAsc : styles.sortDesc;
  };

  // Получить иконку сортировки
  const getSortIcon = (key) => {
    if (tableSort.key !== key) return "↕";
    return tableSort.direction === "asc" ? "" : "";
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

      <div className={styles.tableWrapper}>
        <table className={styles.statsTable}>
          <thead>
            <tr>
              <th className={styles.sortable}>Memory</th>
              <th
                onClick={() => handleTableSort("name")}
                className={`${styles.sortable} ${getSortClass("name")}`}
              >
                Name {getSortIcon("name")}
              </th>
              <th
                onClick={() => handleTableSort("level")}
                className={`${styles.sortable} ${getSortClass("level")}`}
              >
                Level {getSortIcon("level")}
              </th>
              <th
                onClick={() => handleTableSort("rank")}
                className={`${styles.sortable} ${getSortClass("rank")}`}
              >
                Rank {getSortIcon("rank")}
              </th>
              <th
                onClick={() => handleTableSort("stellaName")}
                className={`${styles.sortable} ${getSortClass("stellaName")}`}
              >
                Stella {getSortIcon("stellaName")}
              </th>
              <th
                onClick={() => handleTableSort("rarityName")}
                className={`${styles.sortable} ${getSortClass("rarityName")}`}
              >
                Rarity {getSortIcon("rarityName")}
              </th>
              <th
                onClick={() => handleTableSort("placementName")}
                className={`${styles.sortable} ${getSortClass("placementName")}`}
              >
                Placement {getSortIcon("placementName")}
              </th>
              <th
                onClick={() => handleTableSort("talentName")}
                className={`${styles.sortable} ${getSortClass("talentName")}`}
              >
                Talent {getSortIcon("talentName")}
              </th>
              <th
                onClick={() => handleTableSort("protocoreLevels")}
                className={`${styles.sortable} ${getSortClass("protocoreLevels")}`}
              >
                Protocores lvl {getSortIcon("protocoreLevels")}
              </th>
              <th
                onClick={() => handleTableSort("hp")}
                className={`${styles.sortable} ${getSortClass("hp")}`}
              >
                HP {getSortIcon("hp")}
              </th>
              <th
                onClick={() => handleTableSort("atk")}
                className={`${styles.sortable} ${getSortClass("atk")}`}
              >
                ATK {getSortIcon("atk")}
              </th>
              <th
                onClick={() => handleTableSort("def")}
                className={`${styles.sortable} ${getSortClass("def")}`}
              >
                DEF {getSortIcon("def")}
              </th>
              <th
                onClick={() => handleTableSort("critRate")}
                className={`${styles.sortable} ${getSortClass("critRate")}`}
              >
                Crit Rate {getSortIcon("critRate")}
              </th>
              <th
                onClick={() => handleTableSort("critDmg")}
                className={`${styles.sortable} ${getSortClass("critDmg")}`}
              >
                Crit DMG {getSortIcon("critDmg")}
              </th>
              <th
                onClick={() => handleTableSort("dmgBoost")}
                className={`${styles.sortable} ${getSortClass("dmgBoost")}`}
              >
                DMG Boost to Weakened {getSortIcon("dmgBoost")}
              </th>
              <th
                onClick={() => handleTableSort("oathStrength")}
                className={`${styles.sortable} ${getSortClass("oathStrength")}`}
              >
                Oath Strength {getSortIcon("oathStrength")}
              </th>
              <th
                onClick={() => handleTableSort("oathRecoveryBoost")}
                className={`${styles.sortable} ${getSortClass("oathRecoveryBoost")}`}
              >
                Oath Recovery Boost {getSortIcon("oathRecoveryBoost")}
              </th>
              <th
                onClick={() => handleTableSort("expeditedEnergyBoost")}
                className={`${styles.sortable} ${getSortClass("expeditedEnergyBoost")}`}
              >
                Expedited Energy Boost {getSortIcon("expeditedEnergyBoost")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCards.length === 0 ? (
              <tr>
                <td colSpan="18" className={styles.emptyState}>
                  No available memories found
                </td>
              </tr>
            ) : (
              sortedCards.map((card) => (
                <tr key={card.id}>
                  <td>
                    <img
                      src={getImageUrl(card.imageSmall)}
                      alt={card.name}
                      className={styles.cardImage}
                    />
                  </td>
                  <td>
                    <Link
                      to={`/memories/${card.id}`}
                      className={styles.cardLink}
                    >
                      {card.name}
                    </Link>
                  </td>
                  <td>
                    <span className={styles.levelBadge}>
                      {card.level}
                      {card.isAscended && (
                        <span className={styles.ascendMark}>+</span>
                      )}
                    </span>
                  </td>
                  <td>
                    {formatOptionLabel(rankOptions.find(opt => opt.value === card.rank))}
                  </td>
                  <td className={styles.stellaContainer}>
                    <img
                      src={getImageUrl(card.stella)}
                      alt={card.stellaName}
                      className={styles.stellaIcon}
                    />
                    <div className={styles.stellaName}>
                      {card.stellaName.charAt(0).toUpperCase() +
                        card.stellaName.slice(1)}
                    </div>
                  </td>
                  <td>
                    <div className={styles.rarityContainer}>
                      <span className={styles.rarityStars}>
                        {card.rarityName}
                      </span>
                    </div>
                  </td>
                  <td className={styles.placementContainer}>
                    <img
                      src={getImageUrl(card.placement)}
                      alt={card.placementName}
                      className={styles.placementIcon}
                    />
                    <div className={styles.placementName}>
                      {card.placementName.charAt(0).toUpperCase() +
                        card.placementName.slice(1)}
                    </div>
                  </td>
                  <td className={styles.talentContainer}>
                    <img
                      src={getImageUrl(card.talent)}
                      alt={card.talentName}
                      className={styles.talentIcon}
                    />
                    <div className={styles.talentName}>
                      {card.talentName.toUpperCase()}
                    </div>
                  </td>
                  <td>
                    <span className={styles.protocoreLevel}>
                      {card.protocoreLevels}
                    </span>
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.hp === "number"
                      ? formatNumber(card.stats.hp)
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.atk === "number"
                      ? formatNumber(card.stats.atk)
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.def === "number"
                      ? formatNumber(card.stats.def)
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.critRate === "number"
                      ? formatNumber(card.stats.critRate.toFixed(1)) + "%"
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.critDmg === "number"
                      ? formatNumber(card.stats.critDmg.toFixed(1)) + "%"
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.dmgBoost === "number"
                      ? formatNumber(card.stats.dmgBoost.toFixed(2)) + "%"
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.oathStrength === "number"
                      ? formatNumber(card.stats.oathStrength.toFixed(2)) + "%"
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.oathRecoveryBoost === "number"
                      ? formatNumber(card.stats.oathRecoveryBoost.toFixed(2)) +
                        "%"
                      : "—"}
                  </td>
                  <td className={styles.statValue}>
                    {typeof card.stats?.expeditedEnergyBoost === "number"
                      ? formatNumber(
                          card.stats.expeditedEnergyBoost.toFixed(2),
                        ) + "%"
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MyMemories;
