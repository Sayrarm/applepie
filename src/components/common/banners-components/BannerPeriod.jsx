import styles from './BannerPeriod.module.css';

function BannerPeriod({ banners }) {
    // Если нет баннеров или пустой массив
    if (!banners || banners.length === 0) {
        return null;
    }

    const formatDate = (dateString) => {
        if (dateString === 'permanently') {
            return 'Permanently';
        }
        // Разбиваем строку по T и берем первую часть
        const datePart = dateString.split('T')[0];
        // Разбиваем по '-' и меняем порядок на день.месяц.год
        const parts = datePart.split('-');
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
    };

    return (
        <div className={styles.period}>
            <h3>From banner:</h3>
            {banners.map(banner => (
                <div key={banner.id}>
                    "{banner.name}" {banner.rerun === true && ' (Rerun)'}: {formatDate(banner.startDate)} - {formatDate(banner.endDate)}
                </div>
            ))}
        </div>
    );
}

export default BannerPeriod;