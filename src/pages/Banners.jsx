import BannerList from '../components/BannerList';
import bannersData from '../data/banners-data-full.json';
import styles from './Banners.module.css'

function AllBannersPage() {
    return (
        <div>
            <h1 className={styles.title}>All banners</h1>
            <BannerList banners={bannersData} />
        </div>
    );
}

export default AllBannersPage;