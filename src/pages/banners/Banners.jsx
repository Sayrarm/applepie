import BannerList from '@components/common/banners-components/BannerList.jsx';
import {bannersDataFull} from '@data/banners-data-full.js';
import styles from './Banners.module.css'

function AllBannersPage() {
    return (
        <div>
            <h1 className={styles.title}>All banners</h1>
            <BannerList banners={bannersDataFull} />
        </div>
    );
}

export default AllBannersPage;