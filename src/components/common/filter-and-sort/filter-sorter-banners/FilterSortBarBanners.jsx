import styles from "../FilterSortBar.module.css";
import { Button, Input, Select } from "antd";
import FilterModalBanner from "./FilterModalBanner.jsx";
import { getImageUrl } from "@hooks";
import { stylesFnSearch } from "@components";
import { useTranslation } from "react-i18next";

const { Search } = Input;

function FilterSortBarBanners({
                                  onSearch,
                                  sortCriteria,
                                  handleSortChange,
                                  clearSorting,
                                  selectedChar,
                                  setSelectedChar,
                                  isModalOpen,
                                  setIsModalOpen,
                                  applyFilters,
                                  clearFilters,
                                  filterModalRef,
                                  extraButtons = [],
                                  resetAllSettings,
                                  storagePrefix = "",
                                  hideSort = false,
                                  showPromises = true,
                                  onTogglePromises,
                              }) {
    const characters = ["Xavier", "Zayne", "Rafayel", "Sylus", "Caleb"];
    const { t } = useTranslation();

    return (
        <div className={styles.options}>
            <nav className={styles.select}>
                <div className={styles.selectChar}>
                    <button
                        className={`${styles.buttonSelectChar} ${selectedChar === "ALL" ? styles.active : ""}`}
                        onClick={() => setSelectedChar("ALL")}
                    >
                        ALL
                    </button>

                    <div className={styles.characters}>
                        {characters.map((char) => (
                            <button
                                key={char}
                                className={`${styles.buttonSelectChar} ${selectedChar === char ? styles.active : ""}`}
                                onClick={() => setSelectedChar(char)}
                            >
                                {char}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Скрываем блок сортировки, если hideSort === true */}
                {!hideSort && (
                    <div className={styles.sortBy}>
                        <Select
                            mode="tags"
                            size="medium"
                            value={sortCriteria}
                            placeholder={t('FilterSortBarBanners.placeholder')}
                            onChange={handleSortChange}
                            className={styles.colorBrown}
                            style={{ width: 250 }}
                            options={[
                                { value: "new", label: t('FilterSortBarBanners.new') },
                                { value: "rerun", label: t('FilterSortBarBanners.rerun') },
                                { value: "active", label: t('FilterSortBarBanners.active') },
                                { value: "inactive", label: t('FilterSortBarBanners.inactive') },
                                { value: "name", label: t('FilterSortBarBanners.name') },
                                { value: "startDate", label: t('FilterSortBarBanners.startDate') },
                            ]}
                        />

                        <Button
                            onClick={clearSorting}
                            color="default"
                            variant="outlined"
                            icon={
                                <img
                                    className={styles.imgIcon}
                                    src={getImageUrl("../assets/icons/eraser_16863523.png")}
                                    style={{ width: 22, height: 22 }}
                                    alt={t('FilterSortBarBanners.clearSorting')}
                                />
                            }
                            title={t('FilterSortBarBanners.clearSorting')}
                            className={styles.colorBrown}
                        />
                    </div>
                )}
            </nav>

            <aside className={styles.filterBy}>
                <Search
                    placeholder={t('FilterSortBarBanners.search')}
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 215 }}
                    styles={stylesFnSearch}
                    name="search-fn"
                    size="medium"
                />

                <Button
                    onClick={() => setIsModalOpen(true)}
                    icon={
                        <img
                            className={styles.imgIcon}
                            src={getImageUrl("../assets/icons/filter.png")}
                            style={{ width: 20, height: 20 }}
                            alt={t('FilterSortBarBanners.filterButton')}
                        />
                    }
                    title={t('FilterSortBarBanners.filterButton')}
                    className={styles.colorBrown}
                />

                <FilterModalBanner
                    ref={filterModalRef}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onFilter={applyFilters}
                    onClearFilters={clearFilters}
                    storagePrefix={storagePrefix}
                />

                {extraButtons.map((button, index) => (
                    <Button
                        key={index}
                        onClick={button.onClick}
                        icon={
                            button.icon && (
                                <img
                                    className={styles.imgIcon}
                                    src={getImageUrl(button.icon)}
                                    style={{ width: 20, height: 20 }}
                                    alt={button.title || "button"}
                                />
                            )
                        }
                        title={button.title || ""}
                        className={styles.colorBrown}
                    >
                        {button.label}
                    </Button>
                ))}

                <Button
                    onClick={resetAllSettings}
                    icon={
                        <img
                            src={getImageUrl("../assets/icons/reset.png")}
                            style={{ width: 20, height: 20 }}
                            alt="Reset"
                        />
                    }
                    title={t('FilterSortBarBanners.resetButton')}
                    className={styles.colorBrown}
                />

                {/* Кнопка показа/скрытия Promise-баннеров */}
                {typeof onTogglePromises === "function" && (
                    <Button
                        onClick={onTogglePromises}
                        title={
                            showPromises
                                ? t('FilterSortBarBanners.hidePromises')
                                : t('FilterSortBarBanners.showPromises')
                        }
                        className={styles.colorBrown}
                        type={showPromises ? "default" : "dashed"}
                    >
                        {showPromises
                            ? t('FilterSortBarBanners.promisesOn')
                            : t('FilterSortBarBanners.promisesOff')}
                    </Button>
                )}
            </aside>
        </div>
    );
}

export default FilterSortBarBanners;