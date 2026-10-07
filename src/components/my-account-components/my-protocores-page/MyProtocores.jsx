import React, { useState, useEffect, useRef } from "react";
import styles from "./MyProtocores.module.css";
import {
  ProtocoreBlock,
  useProtocoreSearch,
  useProtocoreFilter,
  useProtocoreSort,
  FilterSortBarProtocores,
  OcrReader,
  ModalWindow
} from "@components";
import ModalWindowProtocore from "./ModalWindowProtocore.jsx";
import {
  getProtocores,
  deleteProtocore,
  removeProtocoreFromAllCards,
  findCardForProtocore,
} from "@localstorage";

function MyProtocores() {
  const [protocores, setProtocores] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const modalRef = useRef();
  const filterModalRef = useRef();
  const ocrModalRef = useRef();
  const ocrReaderRef = useRef();

  const { searchQuery, onSearch, clearSearch } =
      useProtocoreSearch("protocores");
  const {
    applyFilters,
    clearFilters,
    filterProtocores,
    isModalOpen,
    setIsModalOpen,
  } = useProtocoreFilter("protocores");
  const { sortCriteria, handleSortChange, clearSorting, sortProtocores } =
      useProtocoreSort("protocores");

  // ===== ЗАГРУЗКА ПРОТОКОРОВ =====
  useEffect(() => {
    const savedProtocores = getProtocores();
    setProtocores(savedProtocores);
  }, []);

  // ===== СЛУШАЕМ ИЗМЕНЕНИЯ В ДРУГИХ ВКЛАДКАХ =====
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "protocores") {
        const updated = getProtocores();
        setProtocores(updated);
      }
    };

    // Слушаем глобальное событие обновления протокоров
    const handleProtocoresUpdated = () => {
      const updated = getProtocores();
      setProtocores(updated);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("protocoresUpdated", handleProtocoresUpdated);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("protocoresUpdated", handleProtocoresUpdated);
    };
  }, []);

  // ===== ФИЛЬТРАЦИЯ =====
  const filteredProtocores = filterProtocores(protocores).filter(
      (protocore) => {
        if (!searchQuery) return true;

        const searchLower = searchQuery.toLowerCase();

      // Поиск по типу
      const typeMatch = protocore.type.toLowerCase().includes(searchLower);

      // Поиск по мейн стату
      const mainStatMatch = protocore.mainStat
        .toLowerCase()
        .includes(searchLower);

      // Поиск по сабстатам
      const subStatMatch = protocore.substats?.some((sub) =>
        sub.stat.toLowerCase().includes(searchLower),
      );

      // Поиск по стеллакруму
      const stellactrumMatch = protocore.stellactrum
        .toLowerCase()
        .includes(searchLower);

        return typeMatch || mainStatMatch || subStatMatch || stellactrumMatch;
      },
  );

  // ===== СОРТИРОВКА =====
  const sortedProtocores = sortProtocores(filteredProtocores);

  // ===== РЕЖИМ ВЫБОРА =====
  const toggleSelectionMode = () => {
    setIsSelectionMode((prev) => {
      if (prev) setSelectedIds(new Set()); // при выходе очищаем выбор
      return !prev;
    });
  };

  const toggleProtocoreSelection = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // ===== ОБРАБОТЧИКИ =====
  const resetAllSettings = () => {
    clearSearch();
    clearFilters();
    clearSorting();
    if (filterModalRef.current) {
      filterModalRef.current.clearAll();
    }
  };

  const handleOcr = () => {
    ocrModalRef.current?.showModal();
  };

  const handleModalClose = () => {
    ocrReaderRef.current?.reset();
  };

  const handleAddProtocore = () => {
    modalRef.current?.showModal();
  };

  const handleSaveProtocore = (newProtocore) => {
    setProtocores((prev) => [...prev, newProtocore]);
  };

  const handleUpdateProtocore = (updatedProtocore) => {
    setProtocores((prev) =>
        prev.map((p) => (p.id === updatedProtocore.id ? updatedProtocore : p)),
    );
  };

  const handleEditProtocore = (protocore) => {
    modalRef.current?.showModal(protocore);
  };

  const handleDeleteProtocore = (protocoreToDelete) => {
    // Показываем подтверждение перед удалением
    const confirmDelete = window.confirm(
        `Are you sure you want to delete ${protocoreToDelete.type.charAt(0).toUpperCase() + protocoreToDelete.type.slice(1)} Protocore (Lv. ${protocoreToDelete.level})?`,
    );

    if (confirmDelete) {
      // 1. Удаляем из общего списка протокоров
      deleteProtocore(protocoreToDelete.id);

      // 2. Удаляем протокор из всех карточек
      const updatedCards = removeProtocoreFromAllCards(protocoreToDelete.id);

      // 3. Отправляем события для обновления карточек
      updatedCards.forEach(({ cardId, protocores: cardProtocores }) => {
        window.dispatchEvent(
            new CustomEvent("protocoresUpdated", {
              detail: { cardId, protocores: cardProtocores },
            }),
        );
      });

      // 4. Обновляем состояние
      setProtocores((prev) =>
          prev.filter((p) => p.id !== protocoreToDelete.id),
      );

      window.dispatchEvent(new CustomEvent("protocoresUpdated"));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    const confirmDelete = window.confirm(
        "Are you sure you want to delete selected protocores?",
    );

    if (confirmDelete) {
      // 1. Удаляем каждый выбранный протокор
      selectedIds.forEach((id) => {
        deleteProtocore(id);
        removeProtocoreFromAllCards(id);
      });

      // 2. Обновляем состояние
      setProtocores((prev) => prev.filter((p) => !selectedIds.has(p.id)));

      // 3. Сбрасываем выбор и выходим из режима выбора
      setSelectedIds(new Set());
      setIsSelectionMode(false);

      // 4. Отправляем глобальное событие
      window.dispatchEvent(new CustomEvent("protocoresUpdated"));
    }
  };

  return (
      <section className={styles.container}>
        <FilterSortBarProtocores
            searchQuery={searchQuery}
            onSearch={onSearch}
            clearSearch={clearSearch}
            sortCriteria={sortCriteria}
            handleSortChange={handleSortChange}
            clearSorting={clearSorting}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            filterModalRef={filterModalRef}
            resetAllSettings={resetAllSettings}
            storagePrefix="protocores"
        />

        <div className={styles.buttonsContainer}>
          <button className={styles.addButton} onClick={handleAddProtocore}>
            + Add protocore
          </button>

          <button className={styles.addButton} onClick={handleOcr}>
            Upload protocore screenshots
          </button>

          <button className={styles.addButton} onClick={toggleSelectionMode}>
            {isSelectionMode ? "Cancel selection" : "Choose protocores"}
          </button>

          {isSelectionMode && (
              <button
                  className={styles.addButton}
                  onClick={handleDeleteSelected}
                  disabled={selectedIds.size === 0}
              >
                Delete protocores ({selectedIds.size})
              </button>
          )}
        </div>

        <section className={styles.protocoreList}>
          {sortedProtocores.length === 0 ? (
              <div className={styles.emptyState}>
                No protocores added yet. Click "Add protocore" to create one!
              </div>
          ) : (
              sortedProtocores.map((protocore) => {
                const cardImage = findCardForProtocore(protocore.id);
                const isSelected = selectedIds.has(protocore.id);
                return (
                    <div
                        className={styles.protocoreContainer}
                        key={protocore.id}
                        onClick={
                          isSelectionMode
                              ? () => toggleProtocoreSelection(protocore.id)
                              : undefined
                        }
                    >
                      {isSelectionMode && (
                          <input
                              className={styles.checkbox}
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleProtocoreSelection(protocore.id)}
                              onClick={(e) => e.stopPropagation()}
                          />
                      )}
                      <ProtocoreBlock
                          protocore={protocore}
                          onEdit={handleEditProtocore}
                          onDelete={handleDeleteProtocore}
                          hideGoal={false}
                          cardImage={cardImage}
                      />
                    </div>
                );
              })
          )}
        </section>

        <ModalWindowProtocore
            ref={modalRef}
            title="Add New Protocore"
            onSave={handleSaveProtocore}
            onUpdate={handleUpdateProtocore}
        />

        <ModalWindow
            ref={ocrModalRef}
            title="Upload screenshots"
            tag={<OcrReader ref={ocrReaderRef} />}
            onClose={handleModalClose}
        />
      </section>
  );
}

export default MyProtocores;