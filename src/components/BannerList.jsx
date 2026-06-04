import styles from './BannerList.module.css';
import FlexibleTimer from './FlexibleTimer.jsx';
import {useRef, useState} from 'react';
import CardList from './CardList.jsx';
import memoriesData from '../data/memories-data.json';
import {CardProvider} from "./CardProvider.jsx";
import ModalWindow from "./ModalWindow.jsx";
import {getImageUrl} from "./imageUtils.js";

function BannerList({ banners, showAll = false }) {
    const [selectedBanner, setSelectedBanner] = useState(null);
    const memoriesModalRef = useRef();

    const showMemoriesModal = (banner) => {
        setSelectedBanner(banner);
        memoriesModalRef.current.showModal();
    };

    const bannersToShow = showAll ? banners : banners.filter(b => b.active);

    if (bannersToShow.length === 0) {
        return <div className={styles.noBanners}>No banners available</div>;
    }

    return (
        <>
            <div className={styles.bannersGrid}>
                {bannersToShow.map(banner => (
                    <button
                        key={banner.id}
                        onClick={() => showMemoriesModal(banner)}
                        className={styles.bannerCard}
                    >
                        <FlexibleTimer
                            startDateTime={banner.startDate}
                            endDateTime={banner.endDate}
                        />
                        <img
                            className={styles.bannerImage}
                            src={getImageUrl(banner.image)}
                            alt={banner.name}
                        />
                        <div className={styles.bannerTitle}>{banner.name}</div>
                    </button>
                ))}
            </div>

            <ModalWindow
                ref={memoriesModalRef}
                title={selectedBanner?.name}
                tag={
                    <>
                        <CardProvider>
                            <CardList
                                cards={memoriesData.filter(card =>
                                    selectedBanner?.cardIds.includes(card.id)
                                )}
                            />
                        </CardProvider>
                    </>
                }/>
        </>
    );
}

export default BannerList;