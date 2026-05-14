import DynamicImage from "./DynamicImage.jsx";

const WeeklyProtocore = () => {
    const roster = [
        {
            conditions: ['monday', 'thursday', 'sunday'],
            image: '/prot-mon-thur-sun.png'
        },
        {
            conditions: ['tuesday', 'friday', 'sunday'],
            image: '/prot-tue-fri-sun.png'
        },
        {
            conditions: ['wednesday', 'saturday', 'sunday'],
            image: '/prot-wed-sat-sun.png'
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

export default WeeklyProtocore;