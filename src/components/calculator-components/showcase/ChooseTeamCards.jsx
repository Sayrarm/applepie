import { useRef, useState } from "react";
import styles from "./Showcase.module.css";
import {
  ProtocoreBlock,
  Card,
  ModalWindow,
  FilterSortBarMemories,
  useSearch,
  useSort,
  useFilter,
} from "@components";
import {memoriesData} from "@data";
import { enhanceMemoriesWithAvailability } from "@localstorage";

function ChooseTeamCards({
  solarCards,
  lunarCards,
  onSelectCard,
  getCardData, // передаем функцию из родителя
}) {
  const cardModalRef = useRef();
  const [modalPlacement, setModalPlacement] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);

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

  const showCardModal = (placement, index) => {
    setModalPlacement(placement);
    setModalIndex(index);
    cardModalRef.current?.showModal();
  };

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

  // Функция для отображения слота карточки с протокорами
  const renderCardSlot = (card, placement, index) => {
    const cardData = card ? getCardData(card) : null;

    return (
      <div
        className={`${styles.cardSlot} ${!card ? styles.emptySlot : ""}`}
        onClick={() => showCardModal(placement, index)}
      >
        {card ? (
          <>
            <div className={styles.cardSlotEquipped}>
              <div className={styles.cardWrapper}>
                <Card data={card} isSmall={false} showUserInfo={true}/>
              </div>
            </div>

            <div className={styles.protocoresContainer}>
              {cardData?.protocores && cardData.protocores.length > 0 ? (
                cardData.protocores.map((protocore) => (
                  <div key={protocore.id} className={styles.protocoreWrapper}>
                    <ProtocoreBlock
                      protocore={protocore}
                      hideChange={true}
                      hideDelete={true}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.noProtocores}>No protocores</div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.emptySlotContent}>
            <span>+</span>
            <span className={styles.emptyLabel}>Add {placement} card</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.cardsSection}>
        {/* Solar карточки */}
        <div className={styles.solarRow}>
          <div className={styles.rowLabel}>SOLAR</div>
          <div className={styles.solarCardsRow}>
            {solarCards.map((card, index) => (
              <div key={`solar-${index}`} className={styles.cardWrapperSlot}>
                {renderCardSlot(card, "solar", index)}
              </div>
            ))}
          </div>
        </div>

        {/* Lunar карточки */}
        <div className={styles.lunarRow}>
          <div className={styles.rowLabel}>LUNAR</div>
          <div className={styles.lunarCardsRow}>
            {lunarCards.map((card, index) => (
              <div key={`lunar-${index}`} className={styles.cardWrapperSlot}>
                {renderCardSlot(card, "lunar", index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модалка выбора карточки с фильтрами */}
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
                  <Card data={card} isSmall={true} showUserInfo={true}/>
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
}

export default ChooseTeamCards;
