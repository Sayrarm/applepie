import styles from './FilterSortBar.module.css';
import { Button, Input, Select } from 'antd';
import FilterModalProtocore from './FilterModalProtocore';
import { getImageUrl } from './imageUtils';
import { stylesFnSearch } from "./stylesAntd.js";

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
                                     storagePrefix = '',
                                 }) {
    return (
        <div className={styles.options}>
            <div className={styles.select}>

                <div className={styles.sortBy}>
                    <Select
                        mode="tags"
                        placeholder="Select sort"
                        value={sortCriteria}
                        onChange={handleSortChange}
                        style={{ width: 250 }}
                        className={styles.colorBrown}
                        allowClear
                        options={[
                            { value: 'type', label: 'Type' },
                            { value: 'stellactrum', label: 'Stellactrum' },
                            { value: 'level', label: 'Level' },
                            { value: 'mainStat', label: 'Main Stat' }
                        ]}
                    />
                    <Button
                        onClick={clearSorting}
                        className={styles.colorBrown}
                        size="medium"
                        icon={
                            <img
                                src={getImageUrl('../assets/icons/eraser_16863523.png')}
                                style={{ width: 22, height: 22 }}
                                alt="Clear sorting"
                            />
                        }
                    />

                </div>


                <div className={styles.filterBy}>
                    <Search
                        placeholder="Search protocores..."
                        allowClear
                        onSearch={onSearch}
                        name="search-fn"
                        size="medium"
                        onChange={(e) => {
                            if (e.target.value === '') {
                                clearSearch();
                            }
                        }}
                        style={{ width: 215 }}
                        styles={stylesFnSearch}
                    />

                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className={styles.colorBrown}
                        icon={
                            <img
                                src={getImageUrl('../assets/icons/filter.png')}
                                style={{ width: 20, height: 20 }}
                                alt="Filter"
                            />
                        }
                    >
                    </Button>

                    <Button
                        onClick={resetAllSettings}
                        title="Reset all filters and sorting"
                        className={styles.colorBrown}
                        icon={
                            <img
                                src={getImageUrl('../assets/icons/reset.png')}
                                style={{ width: 20, height: 20 }}
                                alt="Reset"
                            />
                        }
                    >
                    </Button>
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