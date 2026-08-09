import DynamicImage from "../DynamicImage.jsx";
import styles from '/src/pages/main/Home.module.css'

const WeeklyTrial = () => {
    const roster = [
        {
            conditions: ['wednesday', 'friday', 'saturday', 'sunday'],
            image: '/caleb-wed-fri-sat-sun.png',
            id: 'caleb'
        },
        {
            conditions: ['wednesday', 'friday', 'saturday', 'sunday'],
            image: '/raf-wed-fri-sat-sun.png',
            id: 'rafayel'
        },
        {
            conditions: ['tuesday', 'thursday', 'saturday', 'sunday'],
            image: '/sylus-tye-thur-sat-sun.png',
            id: 'sylus'
        },
        {
            conditions: ['monday', 'thursday', 'saturday', 'sunday'],
            image: '/xavier-mon-thur-sat-sun.png',
            id: 'xavier'
        },
        {
            conditions: ['tuesday', 'friday', 'saturday', 'sunday'],
            image: '/zayne-tue-fri-sat-sun.png',
            id: 'zayne'
        },
    ];

    return (
        <DynamicImage
            roster={roster}
            type="weekday"
            basePath="../assets/main-page/change-pic"
            dayStartHour={5}
            className={styles.weeklyImg}
            containerClassName={styles.weeklyImgContainer}
        />
    );
};

export default WeeklyTrial;