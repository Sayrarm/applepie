import React from "react";
import { Range } from "react-range";
import styles from "./LevelRangeControl.module.css";

const DEFAULT_ASCEND_LEVELS = [10, 20, 30, 40, 50, 60, 70, 80];

function LevelRangeControl({
                               id = "input",
                               level,
                               setLevel,
                               maxLevel,
                               minLevel = 1,
                               isAscended,
                               setIsAscended,
                               ascendLevels = DEFAULT_ASCEND_LEVELS,
                               showAscend = true,
                           }) {
    const isAscendable = showAscend && ascendLevels.includes(level);
    const isAwaken = level === 80;

    const handleLevelChange = (numVal) => {
        setLevel(numVal);
        if (!ascendLevels.includes(numVal)) {
            setIsAscended?.(false);
        }
    };

    return (
        <div className={styles.rangeContainer}>
            <div className={styles.levelContainer}>
                <label className={styles.levelInput} htmlFor={id}>
                    Level:
                </label>
                <input
                    id={id}
                    type="number"
                    min={minLevel}
                    max={maxLevel}
                    value={level}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                            setLevel("");
                        } else {
                            const numVal = parseInt(val);
                            if (!isNaN(numVal) && numVal >= minLevel && numVal <= maxLevel) {
                                handleLevelChange(numVal);
                            }
                        }
                    }}
                    onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (isNaN(val) || val < minLevel) {
                            setLevel(minLevel);
                        } else if (val > maxLevel) {
                            setLevel(maxLevel);
                        }
                    }}
                    className={styles.levelInput}
                />
                {isAscendable && (
                    <div className={styles.ascendContainer}>
                        <button
                            className={`${styles.ascendButton} ${isAscended ? styles.active : ""}`}
                            onClick={() => setIsAscended(!isAscended)}
                        >
                            {isAwaken ? "Awaken" : "Ascend"} {isAscended ? "✓" : ""}
                        </button>
                    </div>
                )}
            </div>

            <Range
                step={1}
                min={minLevel}
                max={maxLevel}
                values={[typeof level === "number" ? level : minLevel]}
                onChange={(values) => handleLevelChange(values[0])}
                renderTrack={({ props, children }) => (
                    <div {...props} className={styles.track}>
                        <div
                            className={styles.trackFilled}
                            style={{
                                width: `${((level - minLevel) / (maxLevel - minLevel)) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => {
                    const { key, ...rest } = props;
                    return (
                        <div
                            key={key}
                            {...rest}
                            className={styles.point}
                            onKeyDown={(e) => {
                                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    );
                }}
            />
        </div>
    );
}

export default LevelRangeControl;