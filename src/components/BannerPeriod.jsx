import styles from './BannerPeriod.module.css';

function BannerPeriod({ banner }) {
    if (!banner || !banner.startDate || !banner.endDate) {
        return null;
    }

    // Форматируем дату из "2024-01-27T05:00:00+02:00" в "2024-01-27"
    const formatDate = (dateString) => {
        return dateString.split('T')[0]; // берём только часть до T
    };

    const startDate = formatDate(banner.startDate);
    const endDate = formatDate(banner.endDate);

    return (
        <div className={styles.period}>
            <h3>From banners:</h3>
            <div>{banner.name}: {startDate} - {endDate}</div>
        </div>
    );
}

export default BannerPeriod;