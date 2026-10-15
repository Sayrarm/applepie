import styles from "../FilterSortBar.module.css";
import { Button, Input, Select } from "antd";
import FilterModalMemory from "./FilterModalMemory.jsx";
import { getImageUrl } from "@hooks";
import { stylesFnSearch } from "@components";
import { useTranslation } from "react-i18next";

const { Search } = Input;

function FilterSortBarMemories({
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

        <div className={styles.sortBy}>
          <Select
            mode="tags"
            size="medium"
            value={sortCriteria}
            placeholder={t('FilterSortBarMemories.placeholder')}
            onChange={handleSortChange}
            className={styles.colorBrown}
            style={{ width: 250 }}
            options={[
              { value: "char", label: t('FilterSortBarMemories.char') },
              { value: "name", label: t('FilterSortBarMemories.name') },
              { value: "rarity", label: t('FilterSortBarMemories.rarity') },
              { value: "stella", label: t('FilterSortBarMemories.stella') },
              { value: "placement", label: t('FilterSortBarMemories.placement') },
              { value: "talent", label: t('FilterSortBarMemories.talent') },
              { value: "release", label: t('FilterSortBarMemories.release') },
              { value: "level", label: t('FilterSortBarMemories.level') },
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
                alt={t('FilterSortBarMemories.clearSorting')}
              />
            }
            title={t('FilterSortBarMemories.clearSorting')}
            className={styles.colorBrown}
          />
        </div>
      </nav>

      <aside className={styles.filterBy}>
        <Search
          placeholder={t('FilterSortBarMemories.search')}
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
              alt={t('FilterSortBarMemories.filterButton')}
            />
          }
          title={t('FilterSortBarMemories.filterButton')}
          className={styles.colorBrown}
        />

        <FilterModalMemory
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
          title={t('FilterSortBarMemories.resetButton')}
          className={styles.colorBrown}
        />
      </aside>
    </div>
  );
}

export default FilterSortBarMemories;
