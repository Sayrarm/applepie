import DynamicImage from './DynamicImage';

const MonthImage = () => {
    const roster = [
        {
            conditions: ['january', 'april', 'july', 'october'],
            image: '/cards-jan-apr-jul-oct.png'
        },
        {
            conditions: ['february', 'may', 'august', 'november'],
            image: '/cards-feb-may-aug-nov.png'
        },
        {
            conditions: ['march', 'june', 'september', 'december'],
            image: '/cards-mar-jun-sep-dec.png'
        }
    ];

    return (
        <DynamicImage
            roster={roster}
            type="month"
            basePath="src/assets/main-page/change-pic"
            alt="memories from wishing well"
        />
    );
};

export default MonthImage;