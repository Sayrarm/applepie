import {BannerList} from '@components';
import {bannersDataFull} from '@data';
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