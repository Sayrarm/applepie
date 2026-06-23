import styles from "./LevelCardBlock.module.css"
import {Range} from 'react-range';
import {useState} from "react";
import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'rank-0', label: 'Rank 0' },
    { value: 'rank-1', label: 'Rank 1' },
    { value: 'rank-2', label: 'Rank 2' },
    { value: 'rank-3', label: 'Rank 3' },
];

function LevelCardBlock() {

    const [values, setValues] = useState([50]);

    return (
        <section className={styles.container}>
            <button>I have card</button>

            <div>
                <Select
                    options={options}
                    placeholder="Select Rank"
                />

                <h3>Level: {values[0]}</h3>
                <Range
                    step={1}
                    min={1}
                    max={80}
                    values={values}
                    onChange={(values) => setValues(values)}
                    renderTrack={({props, children}) => (

                        <div
                            {...props}
                            className={styles.track}
                        >
                            <div
                                className={styles.trackFilled}
                                style={{
                                    width: `${((values[0] - 1) / (80 - 1)) * 100}%`
                                }}
                            />
                            {children}
                        </div>

                    )}
                    renderThumb={({props}) => (
                        <div
                            {...props}
                            className={styles.point}
                        >
                        </div>
                    )}
                />

            </div>

            <div>
                <div>HP</div>
                <div>ATK</div>
                <div>DEF</div>
                <div>Crit Rate</div>
                <div>Crit DMG</div>
                <div>DMG Boost to Weakened</div>
                <div>Oath Strength</div>
                <div>Oath Recovery Boost</div>
                <div>Expedited Energy Boost</div>
            </div>


        </section>
    )
}

export default LevelCardBlock;