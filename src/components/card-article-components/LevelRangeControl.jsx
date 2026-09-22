import React from "react";
import { Range } from "react-range";
import styles from "./LevelCardBlock.module.css";

const ASCEND_LEVELS = [10, 20, 30, 40, 50, 60, 70, 80];

function LevelRangeControl({
                               id = "input",
                               level,
                               setLevel,
                               maxLevel,
                               isAscended,
                               setIsAscended,
                           }) {
    const isAscendable = ASCEND_LEVELS.includes(level);
    const isAwaken = level === 80;

    const handleLevelChange = (numVal) => {
        setLevel(numVal);
        if (!ASCEND_LEVELS.includes(numVal)) {
            setIsAscended(false);
        }
    };

    return (
        <div className={styles.rangeContainer}>
            <div className={styles.levelContainer}>
                <label className={styles.levelInput} htmlFor="input">
                    Level:
                </label>
                <input
                    id={id}
                    type="number"
                    min="1"
                    max={maxLevel}
                    value={level}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                            setLevel("");
                        } else {
                            const numVal = parseInt(val);
                            if (!isNaN(numVal) && numVal >= 1 && numVal <= maxLevel) {
                                handleLevelChange(numVal);
                            }
                        }
                    }}
                    onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (isNaN(val) || val < 1) {
                            setLevel(1);
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
                min={1}
                max={maxLevel}
                values={[typeof level === "number" ? level : 1]}
                onChange={(values) => handleLevelChange(values[0])}
                renderTrack={({ props, children }) => (
                    <div {...props} className={styles.track}>
                        <div
                            className={styles.trackFilled}
                            style={{
                                width: `${((level - 1) / (maxLevel - 1)) * 100}%`,
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