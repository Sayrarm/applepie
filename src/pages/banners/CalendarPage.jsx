import { useMemo, useRef, useState } from "react";
import styles from "./Banners.module.css";
import { bannersDataFull } from "@data";
import {
    BannersCalendar,
    FilterSortBarBanners,
    useBannersFilter,
    useBannersSearch,
} from "@components";

function CalendarPage() {
    const filterModalRef = useRef();
    const [editMode, setEditMode] = useState(false);

    // 1. Подключаем только фильтрацию и поиск (сортировка нам не нужна)
    const {
        selectedChar,
        setSelectedChar,
        isModalOpen,
        setIsModalOpen,
        applyFilters,
        clearFilters,
        clearAll,
        filterBanners,
    } = useBannersFilter("banners");

    const { searchQuery, onSearch, clearSearch } = useBannersSearch("banners");

    // 2. Функция полного сброса (без clearSorting)
    const resetAllSettings = () => {
        clearAll();
        clearSearch();
        if (filterModalRef.current) {
            filterModalRef.current.clearAll();
        }
    };

    // 3. Применяем только фильтры и поиск
    const processedBanners = useMemo(() => {
        let result = bannersDataFull;

        // Фильтрация
        result = filterBanners(result);

        // Поиск
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter((banner) => {
                const nameMatch = banner.name.toLowerCase().includes(query);
                const rerunMatch = query === "rerun" && banner.rerun === true;
                return nameMatch || rerunMatch;
            });
        }

        return result;
    }, [filterBanners, searchQuery]);

    return (
        <section className={styles.calendarContainer}>
            <FilterSortBarBanners
                onSearch={onSearch}
                // Для скрытой сортировки передаем заглушки, чтобы не ломать пропсы компонента
                sortCriteria={[]}
                handleSortChange={() => {}}
                clearSorting={() => {}}

                selectedChar={selectedChar}
                setSelectedChar={setSelectedChar}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                filterModalRef={filterModalRef}
                resetAllSettings={resetAllSettings}
                hideSort={true}
                storagePrefix="banners"
            />

            <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 16px", marginBottom: "16px" }}>
                <button
                    onClick={() => setEditMode(!editMode)}
                    style={{
                        padding: "8px 16px",
                        cursor: "pointer",
                        background: editMode ? "#9b6cff" : "#2a2a2a",
                        color: "#fff",
                        border: "1px solid #444",
                        borderRadius: "8px",
                        transition: "background 0.2s"
                    }}
                >
                    {editMode ? "Выйти из редактирования" : "Добавить предикт"}
                </button>
            </div>

            <BannersCalendar
                banners={processedBanners}
                editMode={editMode}
            />
        </section>
    );
}

export default CalendarPage;