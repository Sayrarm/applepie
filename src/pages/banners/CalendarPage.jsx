import {useEffect, useMemo, useRef, useState} from "react";
import styles from "./Banners.module.css";
import { bannersDataFull, battlePassData } from "@data";
import {
    AsideList,
    BannersCalendar,
    FilterSortBarBanners,
    useBannersFilter,
    useBannersSearch,
} from "@components";
import { useTranslation } from "react-i18next";
import {getBannerShowPromises, saveBannerShowPromises} from "@localstorage";

function CalendarPage() {
    const filterModalRef = useRef();
    const [editMode, setEditMode] = useState(false); // Режим редактирования
    const [showPromises, setShowPromises] = useState(() =>
        getBannerShowPromises("banners")
    );
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


    // сохраняем при каждом изменении
    useEffect(() => {
        saveBannerShowPromises("banners", showPromises);
    }, [showPromises]);

    // 2. Функция полного сброса (без clearSorting)
    const resetAllSettings = () => {
        clearAll();
        clearSearch();
        if (filterModalRef.current) {
            filterModalRef.current.clearAll();
        }
    };

    // Нормализуем Promise-баннеры: уникальный id (на случай коллизий)
    const battlePassAsBanners = useMemo(
        () =>
            battlePassData.map((bp) => ({
                ...bp,
                id: `bp-${bp.id}`,
            })),
        []
    );

    const allBanners = useMemo(
        () => [...bannersDataFull, ...battlePassAsBanners],
        [battlePassAsBanners]
    );

    // 3. Применяем только фильтры и поиск
    const processedBanners = useMemo(() => {
        let result = allBanners;

        // скрываем Promise, если выключено
        if (!showPromises) {
            result = result.filter((banner) => banner.type !== "promise");
        }

        // фильтрация
        result = filterBanners(result);

        // поиск
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter((banner) => {
                const nameMatch = banner.name.toLowerCase().includes(query);
                const rerunMatch = query === "rerun" && banner.rerun === true;
                return nameMatch || rerunMatch;
            });
        }

        return result;
    }, [allBanners, showPromises, filterBanners, searchQuery]);

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
                    <p>{t('CalendarPage.hintYellow')}</p>
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
                    showPromises={showPromises}
                    onTogglePromises={() => setShowPromises((v) => !v)}
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