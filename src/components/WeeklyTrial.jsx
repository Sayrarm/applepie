import DynamicImage from "./DynamicImage.jsx";

const WeeklyTrial = () => {
    const roster = [
        {
            conditions: ['wednesday', 'friday', 'saturday', 'sunday'],
            image: '/caleb-wed-fri-sat-sun.png',
            id: 1
        },
        {
            conditions: ['wednesday', 'friday', 'saturday', 'sunday'],
            image: '/raf-wed-fri-sat-sun.png',
            id: 2
        },
        {
            conditions: ['tuesday', 'thursday', 'saturday', 'sunday'],
            image: '/sylus-tye-thur-sat-sun.png',
            id: 3
        },
        {
            conditions: ['monday', 'thursday', 'saturday', 'sunday'],
            image: '/xavier-mon-thur-sat-sun.png',
            id: 4
        },
        {
            conditions: ['tuesday', 'friday', 'saturday', 'sunday'],
            image: '/zayne-tue-fri-sat-sun.png',
            id: 5
        },
    ];

    return (
        <DynamicImage
            roster={roster}
            type="weekday"
            basePath="src/assets/main-page/change-pic"
            dayStartHour={5}
        />
    );
};

export default WeeklyTrial;