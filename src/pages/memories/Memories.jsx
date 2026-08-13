import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Memories.module.css";
import {
  Card,
  useSearch,
  useSort,
  useFilter,
  FilterSortBarMemories,
} from "@components";
import { memoriesData as initialMemoriesData } from "@data";
import {
  getCardSize,
  saveCardSize,
  enhanceMemoriesWithAvailability,
} from "@localstorage";

function Memories() {
  // Используем хуки
  const { searchQuery, onSearch } = useSearch("memories");
  const { sortCriteria, handleSortChange, clearSorting, sortMemories } =
    useSort("memories");
  const {
    selectedChar,
    setSelectedChar,
    isModalOpen,
    setIsModalOpen,
    applyFilters,
    clearFilters,
    filterMemories,
  } = useFilter("memories");

  const filterModalRef = useRef();

  const [memoriesData, setMemoriesData] = useState(() => {
    return enhanceMemoriesWithAvailability(initialMemoriesData);
  });

  // ===== РАЗМЕР КАРТОЧЕК (используем ui-storage) =====
  const [isImageSmall, setIsImageSmall] = useState(() => {
    const saved = getCardSize();
    return saved === "small";
  });

  // Сохраняем в localStorage через сервис
  useEffect(() => {
    saveCardSize(isImageSmall ? "small" : "big");
  }, [isImageSmall]);

  const toggleImageSize = () => {
    setIsImageSmall((prev) => !prev);
  };

  // Фильтруем данные
  const filteredMemories = filterMemories(memoriesData).filter((memory) => {
    return (
      memory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.char.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // ===== СИНХРОНИЗАЦИЯ С LOCALSTORAGE =====
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith("cardAvailable_")) {
        const enhanced = enhanceMemoriesWithAvailability(initialMemoriesData);
        setMemoriesData(enhanced);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleAvailabilityChange = () => {
      const enhanced = enhanceMemoriesWithAvailability(initialMemoriesData);
      setMemoriesData(enhanced);
    };

    window.addEventListener(
      "cardAvailabilityChanged",
      handleAvailabilityChange,
    );
    return () =>
      window.removeEventListener(
        "cardAvailabilityChanged",
        handleAvailabilityChange,
      );
  }, []);

  // Сортируем отфильтрованные данные
  const sortedMemories = sortMemories(filteredMemories);

  // Функция сброса всех настроек
  const resetAllSettings = () => {
    setSelectedChar("ALL");
    clearSorting();
    onSearch("");
    clearFilters();

    // ВЫЗЫВАЕМ ОЧИСТКУ МОДАЛКИ
    if (filterModalRef.current) {
      filterModalRef.current.clearAll();
    }
  };

  return (
    <section className={styles.memories}>
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
        storagePrefix="memories"
        extraButtons={[
          {
            onClick: toggleImageSize,
            icon: "../assets/icons/icons8-change-64.png",
            title: "Change size of Cards",
          },
        ]}
      />

      <div className={styles.cardsGrid}>
        {sortedMemories.map((memory) => {
          // Находим индекс текущей карточки в отсортированном списке
          const currentIndex = sortedMemories.indexOf(memory);
          return (
            <Link
              key={memory.id}
              to={`/memories/${memory.id}`}
              state={{
                cards: sortedMemories,
                currentIndex: currentIndex,
              }}
              className={styles.cardLink}
            >
              <Card key={memory.id} data={memory} isSmall={isImageSmall} />
            </Link>
          );
        })}
      </div>

      {sortedMemories.length === 0 && (
        <p className={styles.noResults}>No memories found ¯\_(ツ)_/¯</p>
      )}
    </section>
  );
}

export default Memories;
