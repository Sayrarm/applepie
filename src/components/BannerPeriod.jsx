import styles from './BannerPeriod.module.css';

function BannerPeriod({ banners }) {
    // Если нет баннеров или пустой массив
    if (!banners || banners.length === 0) {
        return null;
    }

    const formatDate = (dateString) => {
        return dateString.split('T')[0];
    };

    return (
        <div className={styles.period}>
            <h3>From banners:</h3>
            {banners.map(banner => (
                <div key={banner.id}>
                    "{banner.name}" : {formatDate(banner.startDate)} - {formatDate(banner.endDate)}
                </div>
            ))}
        </div>
    );
}

export default BannerPeriod;