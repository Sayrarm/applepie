import styles from "../FilterSortBar.module.css";
import { Button, Input, Select } from "antd";
import FilterModalMemory from "./FilterModalMemory.jsx";
import { getImageUrl } from "@hooks";
import { stylesFnSearch } from "@components";

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
            placeholder="Sorting by"
            onChange={handleSortChange}
            className={styles.colorBrown}
            style={{ width: 250 }}
            options={[
              { value: "char", label: "Character" },
              { value: "name", label: "Memory's name" },
              { value: "rarity", label: "Rarity" },
              { value: "stella", label: "Stellactrum" },
              { value: "placement", label: "Placement" },
              { value: "talent", label: "Talent" },
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
                alt="Clear sorting"
              />
            }
            title="Clear sorting"
            className={styles.colorBrown}
          />
        </div>
      </nav>

      <aside className={styles.filterBy}>
        <Search
          placeholder="Search by memory name"
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
              alt="Filter"
            />
          }
          title="Filter"
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
          title="Reset all filters and sorting"
          className={styles.colorBrown}
        />
      </aside>
    </div>
  );
}

export default FilterSortBarMemories;
