import { useMemo, useRef, useState } from "react";
import styles from "./Banners.module.css";
import { bannersDataFull } from "@data";
import {
    AsideList,
    BannersCalendar,
    FilterSortBarBanners,
    useBannersFilter,
    useBannersSearch,
} from "@components";
import { useTranslation } from "react-i18next";

function CalendarPage() {
    const filterModalRef = useRef();
    const [editMode, setEditMode] = useState(false); // Режим редактирования
    const { t } = useTranslation();

    // Подключаем фильтрацию и поиск (без сортировки)
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

    const items = [
        {
            key: "1",
            label: t('CalendarPage.hintsLabel'),
            children: (
                <div className={styles.disclaimerContent}>
                    <strong className={styles.titleMain}>
                        {t('CalendarPage.hintsTitle')}
                    </strong>
                    <p>{t('CalendarPage.hintPink')}</p>
                    <p>{t('CalendarPage.hintPurple')}</p>
                    <p>{t('CalendarPage.hintBlue')}</p>
                    <p>{t('CalendarPage.hintRed')}</p>
                    <p>{t('CalendarPage.hintOrange')}</p>
                    <p>{t('CalendarPage.hintGreen')}</p>
                    <p>{t('CalendarPage.hintDarkBlue')}</p>
                    <br/>
                    <p>{t('CalendarPage.hintRafaelBirthday')}</p>
                    <p>{t('CalendarPage.hintSilusBirthday')}</p>
                    <p>{t('CalendarPage.hintCalebBirthday')}</p>
                    <p>{t('CalendarPage.hintZaneBirthday')}</p>
                    <p>{t('CalendarPage.hintXavierBirthday')}</p>
                </div>
            ),
        },
    ];

    return (
        <section className={styles.calendarContainer}>
            <nav className={styles.navigationContainer}>
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

                <div className={styles.AsideListContainer}>
                    <AsideList
                        items={items}
                    />
                </div>
            </nav>


            <BannersCalendar
                banners={processedBanners}
                editMode={editMode}
                setEditMode={setEditMode}
            />
        </section>
    );
}

export default CalendarPage;