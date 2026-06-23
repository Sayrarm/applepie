import styles from "./LevelCardBlock.module.css"
import {Range} from 'react-range';
import {useState} from "react";
import React from 'react';
import Select from 'react-select';

const options = [
    {value: 'rank-0', label: 'Rank 0'},
    {value: 'rank-1', label: 'Rank 1'},
    {value: 'rank-2', label: 'Rank 2'},
    {value: 'rank-3', label: 'Rank 3'},
];

function LevelCardBlock() {

    const [values, setValues] = useState([50]);

    return (
        <section className={styles.container}>

            <div className={styles.availableButtonContainer}>
                <button className={styles.buttonAvailable}>Available</button>
                <button className={styles.buttonAvailable}>Not available</button>
            </div>

            <div>
                <div className={styles.selectContainer}>

                    <div className={styles.rangeContainer}>
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

                    <Select
                        options={options}
                        placeholder="Select Rank"
                        className={styles.selectRankContainer}
                    />
                </div>

                <table className={styles.statsTable}>
                    <thead>
                    <tr>
                        <th>HP</th>
                        <th>ATK</th>
                        <th>DEF</th>
                        <th>Crit Rate</th>
                        <th>Crit DMG</th>
                        <th>DMG Boost to Weakened</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1000</td>
                        <td>50</td>
                        <td>40</td>
                        <td>2.0%</td>
                        <td>20%</td>
                        <td>100%</td>
                    </tr>
                    </tbody>
                </table>

                <table className={styles.statsTable}>
                    <thead>
                    <tr>
                        <th>Oath Strength</th>
                        <th>Oath Recovery Boost</th>
                        <th>Expedited Energy Boost</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>30%</td>
                        <td>12%</td>
                        <td>23%</td>
                    </tr>
                    </tbody>
                </table>

            </div>


        </section>
    )
}

export default LevelCardBlock;