import BannerList from '../components/BannerList';
import bannersData from '../data/banners-data-full.json';

function AllBannersPage() {
    return (
        <div>
            <h1>All banners</h1>
            <BannerList banners={bannersData} showAll={true} />
        </div>
    );
}

export default AllBannersPage;