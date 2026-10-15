import { Button, Input, Select } from "antd";
import styles from "../FilterSortBar.module.css";
import FilterModalProtocore from "./FilterModalProtocore.jsx";
import { getImageUrl } from "@hooks";
import { stylesFnSearch } from "@components";
import { useTranslation } from "react-i18next";

const { Search } = Input;

function FilterSortBarProtocores({
  onSearch,
  clearSearch,
  sortCriteria,
  handleSortChange,
  clearSorting,
  isModalOpen,
  setIsModalOpen,
  applyFilters,
  clearFilters,
  filterModalRef,
  resetAllSettings,
  storagePrefix = "",
}) {
  const { t } = useTranslation();

  return (
    <div className={styles.options}>
      <div className={styles.select}>
        <div className={styles.sortBy}>
          <Select
            mode="tags"
            placeholder={t('FilterSortBarProtocores.placeholder')}
            value={sortCriteria}
            onChange={handleSortChange}
            style={{ width: 250 }}
            className={styles.colorBrown}
            allowClear
            options={[
              { value: "type", label: t('FilterSortBarProtocores.type') },
              { value: "stellactrum", label: t('FilterSortBarProtocores.stella') },
              { value: "level", label: t('FilterSortBarProtocores.level') },
              { value: "mainStat", label: t('FilterSortBarProtocores.mainStat') },
              { value: "status", label: t('FilterSortBarProtocores.status') },
            ]}
          />
          <Button
            onClick={clearSorting}
            title={t('FilterSortBarProtocores.clearSorting')}
            className={styles.colorBrown}
            size="medium"
            icon={
              <img
                src={getImageUrl("../assets/icons/eraser_16863523.png")}
                style={{ width: 22, height: 22 }}
                alt="Clear sorting"
              />
            }
          />
        </div>

        <div className={styles.filterBy}>
          <Search
            placeholder={t('FilterSortBarProtocores.search')}
            allowClear
            onSearch={onSearch}
            name="search-fn"
            size="medium"
            onChange={(e) => {
              if (e.target.value === "") {
                clearSearch();
              }
            }}
            style={{ width: 215 }}
            styles={stylesFnSearch}
          />

          <Button
            onClick={() => setIsModalOpen(true)}
            title={t('FilterSortBarProtocores.filterButton')}
            className={styles.colorBrown}
            icon={
              <img
                src={getImageUrl("../assets/icons/filter.png")}
                style={{ width: 20, height: 20 }}
                alt="Filter"
              />
            }
          ></Button>

          <Button
            onClick={resetAllSettings}
            title={t('FilterSortBarProtocores.resetButton')}
            className={styles.colorBrown}
            icon={
              <img
                src={getImageUrl("../assets/icons/reset.png")}
                style={{ width: 20, height: 20 }}
                alt="Reset"
              />
            }
          ></Button>
        </div>
      </div>

      <FilterModalProtocore
        ref={filterModalRef}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFilter={applyFilters}
        onClearFilters={clearFilters}
        storagePrefix={storagePrefix}
      />
    </div>
  );
}

export default FilterSortBarProtocores;
