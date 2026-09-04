import Select from "react-select";
import styles from "./AffinitySelect.module.css";
import { affinityData } from "@data";
import { calculateAffinityBonus } from "@data";
import { useMemo } from "react";

function AffinitySelect({
  value, // текущее значение из родителя
  onChange, // функция для обновления значения в родителе
}) {
  // Опции для affinity
  const affinityOptions = useMemo(() => {
    const levels = affinityData[0]?.affinityLVL || [];
    return levels.map((lvl) => ({
      value: lvl,
      label: `${lvl} LVL`,
    }));
  }, []);

  // Подсчет бонусов
  const affinityBonus = useMemo(() => {
    return calculateAffinityBonus(value);
  }, [value]);

  const handleChange = (option) => {
    onChange(option ? option.value : 0);
  };

  return (
    <div className={styles.affinity}>
      <Select
        options={affinityOptions}
        value={affinityOptions.find((opt) => opt.value === value)}
        onChange={handleChange}
        placeholder="Select Affinity LVL"
        className={styles.selectAffinityContainer}
        isClearable
        isSearchable={false}
      />
      <div className={styles.affinityBonus}>
        Affinity Bonus: +{affinityBonus.hp} HP, +{affinityBonus.atk} ATK, +
        {affinityBonus.def} DEF
      </div>
    </div>
  );
}

export default AffinitySelect;
