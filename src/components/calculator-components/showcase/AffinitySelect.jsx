import Select from "react-select";
import styles from "./AffinitySelect.module.css";
import { useHighlight } from "@components";
import { calculateAffinityBonus, affinityData } from "@data";
import { useMemo } from "react";

function AffinitySelect({ value, onChange }) {
  const { highlightedStat } = useHighlight();

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

  const bonusSpan = (key, value, suffix) => (
      <span
          className={highlightedStat === key ? styles.highlight : ""}
          data-stat={key}
      >
      +{value} {suffix}
    </span>
  );

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
          Affinity Bonus:{" "}
          {bonusSpan("hp", affinityBonus.hp, "HP")},{" "}
          {bonusSpan("atk", affinityBonus.atk, "ATK")},{" "}
          {bonusSpan("def", affinityBonus.def, "DEF")}
        </div>
      </div>
  );
}

export default AffinitySelect;