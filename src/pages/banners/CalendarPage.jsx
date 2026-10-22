import { useMemo, useRef } from "react";
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

            {/* 4. Передаем отфильтрованные баннеры в календарь */}
            <BannersCalendar banners={processedBanners} />
        </section>
    );
}

export default CalendarPage;