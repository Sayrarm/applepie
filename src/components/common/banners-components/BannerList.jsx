import { useRef, useState, useMemo } from "react";
import styles from "./BannerList.module.css";
import {
  FlexibleTimer,
  CardList,
  ModalWindow,
  FilterSortBarBanners,
  useBannersFilter,
  useBannersSearch,
  useBannersSort,
  BannerDetails,
} from "@components";
import { memoriesData } from "@data";
import { getImageUrl } from "@hooks";
import BannerPeriod from "./BannerPeriod.jsx";
import { useTranslation } from "react-i18next";

function BannerList({ banners, showFilters = false, onSelect = null }) {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const memoriesModalRef = useRef();
  const filterModalRef = useRef();
  const { t, i18n } = useTranslation();

  // Хуки для фильтра, поиска и сортировки
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

  // Полный сброс всех настроек
  const resetAllSettings = () => {
    clearAll();
    clearSearch();
    clearSorting();
    if (filterModalRef.current) {
      filterModalRef.current.clearAll();
    }
  };

  // Обрабатываем данные: фильтр → поиск → сортировка
  const processedBanners = useMemo(() => {
    if (!banners || banners.length === 0) return [];

    let result = banners;

    // 1. Фильтрация
    result = filterBanners(result);

    // 2. Поиск (по названию баннера + слово "rerun")
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((banner) => {
        const nameMatch = banner.name.toLowerCase().includes(query);
        // Поиск по слову "rerun" (в т.ч. "(Rerun)" в отображении)
        const rerunMatch = query === "rerun" && banner.rerun === true;
        return nameMatch || rerunMatch;
      });
    }

    // 3. Сортировка
    result = sortBanners(result);

    return result;
  }, [banners, filterBanners, searchQuery, sortBanners]);

  // ОДНА функция показа модалки / выбора баннера
  const showMemoriesModal = (banner) => {
    if (onSelect) {
      onSelect(banner); // <-- Если передан onSelect, возвращаем баннер
      return;
    }
    setSelectedBanner(banner);
    memoriesModalRef.current.showModal();
  };

  return (
    <>
      {showFilters && (
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
      )}

      {(!banners || banners.length === 0) && (
        <div className={styles.noBanners}> {t("BannerList.noBanners")}</div>
      )}

      {banners && banners.length > 0 && processedBanners.length === 0 && (
        <div className={styles.noBanners}>{t("BannerList.noMatch")}</div>
      )}

      <div className={styles.bannersGrid}>
        {processedBanners.map((banner) => (
          <button
            key={banner.id}
            onClick={() => showMemoriesModal(banner)}
            className={styles.bannerCard}
          >
            <img
              className={styles.bannerImage}
              src={getImageUrl(banner.image)}
              alt={banner.name}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.bannerTitle}>
              {banner.name} {banner.rerun === true && " (Rerun)"}
            </div>
            <FlexibleTimer
              startDateTime={banner.startDate}
              endDateTime={banner.endDate}
            />
          </button>
        ))}
      </div>

      <ModalWindow
        ref={memoriesModalRef}
        title={selectedBanner?.name}
        tag={<BannerDetails banner={selectedBanner} />}
      />
    </>
  );
}

export default BannerList;
