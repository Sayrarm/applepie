import DynamicImage from './DynamicImage.jsx';
import styles from '/src/pages/Home.module.css'

const MonthImage = () => {
    const roster = [
        {
            conditions: ['january', 'april', 'july', 'october'],
            image: '/cards-jan-apr-jul-oct.png',
            id: 'card-1',
        },
        {
            conditions: ['february', 'may', 'august', 'november'],
            image: '/cards-feb-may-aug-nov.png',
            id: 'card-2',
        },
        {
            conditions: ['march', 'june', 'september', 'december'],
            image: '/cards-mar-jun-sep-dec.png',
            id: 'card-3',
        }
    ];

    return (
        <DynamicImage
            roster={roster}
            type="month"
            basePath="src/assets/main-page/change-pic"
            alt="memories from wishing well"
            dayStartHour={5}
            className={styles.monthImg}
            containerClassName={styles.monthImgContainer}
        />
    );
};

export default MonthImage;