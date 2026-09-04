import {
  FilterSortBarMemories,
  ModalWindow,
  Card,
  useFilter,
  useSearch,
  useSort,
} from "@components";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { enhanceMemoriesWithAvailability } from "@localstorage";
import { memoriesData } from "@data";
import styles from "./Showcase.module.css";

const ModalChooseCard = forwardRef(({ onSelectCard }, ref) => {
  const [modalPlacement, setModalPlacement] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const cardModalRef = useRef();

  // Хуки для фильтрации и сортировки карточек в модалке Showcase
  const filterModalRef = useRef();
  const { searchQuery, onSearch, clearSearch } =
    useSearch("showcaseCardSelect");
  const { sortCriteria, handleSortChange, clearSorting, sortMemories } =
    useSort("showcaseCardSelect");
  const {
    selectedChar,
    setSelectedChar,
    isModalOpen,
    setIsModalOpen,
    applyFilters,
    clearFilters,
    filterMemories,
  } = useFilter("showcaseCardSelect");

  // Используем useImperativeHandle для предоставления методов наружу
  useImperativeHandle(ref, () => ({
    showModal: (placement, index) => {
      setModalPlacement(placement);
      setModalIndex(index);
      cardModalRef.current?.showModal();
    },
    closeModal: () => {
      cardModalRef.current?.closeModal();
    },
  }));

  const handleSelectCard = (card) => {
    onSelectCard(modalPlacement, modalIndex, card);
    cardModalRef.current?.closeModal();
  };

  // Получаем доступные карточки с фильтрацией и сортировкой
  const getAvailableCards = (placement) => {
    // Сначала получаем все доступные карточки
    const available = enhanceMemoriesWithAvailability(memoriesData).filter(
      (card) => card.isAvailable === true && card.placementName === placement,
    );

    // Применяем фильтры
    const filtered = filterMemories(available);

    // Применяем поиск
    const searched = filtered.filter((card) => {
      return (
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.char.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Применяем сортировку
    return sortMemories(searched);
  };

  const resetAllSettings = () => {
    setSelectedChar("ALL");
    clearSorting();
    clearSearch();
    clearFilters();
    if (filterModalRef.current) {
      filterModalRef.current.clearAll();
    }
  };

  return (
    <>
      <ModalWindow
        ref={cardModalRef}
        title={`Select ${modalPlacement?.toUpperCase()} Card`}
        width={950}
        tag={
          <div className={styles.cardSelectModal}>
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
              storagePrefix="showcaseCardSelect"
            />

            <div className={styles.cardGrid}>
              {getAvailableCards(modalPlacement).map((card) => (
                <button
                  key={card.id}
                  className={styles.cardItem}
                  onClick={() => handleSelectCard(card)}
                >
                  <Card data={card} isSmall={true} showUserInfo={true} />
                </button>
              ))}
              {getAvailableCards(modalPlacement).length === 0 && (
                <div className={styles.emptyCards}>
                  No available {modalPlacement} cards found
                </div>
              )}
            </div>
          </div>
        }
      />
    </>
  );
});

export default ModalChooseCard;
