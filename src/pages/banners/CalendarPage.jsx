import { useMemo, useRef } from "react";
import styles from "./Banners.module.css";
import { bannersDataFull } from "@data";
import {
    BannersCalendar,
    FilterSortBarBanners,
    useBannersFilter,
    useBannersSearch,
    useBannersSort,
} from "@components";

function CalendarPage() {
    const filterModalRef = useRef();

    // 1. Подключаем хуки фильтрации, поиска и сортировки
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

    const { sortCriteria, handleSortChange, clearSorting, sortBanners } =
        useBannersSort("banners");

    // 2. Функция полного сброса
    const resetAllSettings = () => {
        clearAll();
        clearSearch();
        clearSorting();
        if (filterModalRef.current) {
            filterModalRef.current.clearAll();
        }
    };

    // 3. Применяем фильтры, поиск и сортировку к данным
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

        // Сортировка (влияет на порядок в списке, но в календаре баннеры все равно распределяются по датам)
        result = sortBanners(result);

        return result;
    }, [filterBanners, searchQuery, sortBanners]);

    return (
        <section className={styles.calendarContainer}>
            <FilterSortBarBanners
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
                storagePrefix="banners"
            />

            {/* 4. Передаем отфильтрованные баннеры в календарь */}
            <BannersCalendar banners={processedBanners} />
        </section>
    );
}

export default CalendarPage;