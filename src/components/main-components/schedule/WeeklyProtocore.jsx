import {DynamicImage} from "@components";
import styles from '@pages/main/Home.module.css'

const WeeklyProtocore = () => {
    const roster = [
        {
            conditions: ['monday', 'thursday', 'sunday'],
            image: '/prot-mon-thur-sun.png',
            id: 'prot-1',
        },
        {
            conditions: ['tuesday', 'friday', 'sunday'],
            image: '/prot-tue-fri-sun.png',
            id: 'prot-2',
        },
        {
            conditions: ['wednesday', 'saturday', 'sunday'],
            image: '/prot-wed-sat-sun.png',
            id: 'prot-3',
        },
    ];

    return (
        <DynamicImage
            roster={roster}
            type="weekday"
            basePath="../assets/main-page/change-pic"
            dayStartHour={5}
            className={styles.weeklyImgProtocore}
            containerClassName={styles.weeklyImgContainer}
        />
    );
};

export default WeeklyProtocore;