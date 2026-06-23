import styles from './BannerList.module.css';
import FlexibleTimer from './FlexibleTimer.jsx';
import {useRef, useState} from 'react';
import CardList from './CardList.jsx';
import {memoriesData} from '../data/memories-data.js';
import ModalWindow from "./ModalWindow.jsx";
import {getImageUrl} from "./imageUtils.js";

function BannerList({banners}) {
    const [selectedBanner, setSelectedBanner] = useState(null);
    const memoriesModalRef = useRef();

    const showMemoriesModal = (banner) => {
        setSelectedBanner(banner);
        memoriesModalRef.current.showModal();
    };

    const cards = memoriesData.filter(card => selectedBanner?.cardIds?.includes(card.id));

    if (!banners || banners.length === 0) {
        return <div className={styles.noBanners}>No banners available</div>;
    }

    return (
        <>
            <div className={styles.bannersGrid}>
                {banners.map(banner => (
                    <button
                        key={banner.id}
                        onClick={() => showMemoriesModal(banner)}
                        className={styles.bannerCard}
                    >

                        <img
                            className={styles.bannerImage}
                            src={getImageUrl(banner.image)}
                            alt={banner.name}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className={styles.bannerTitle}>{banner.name} {banner.rerun === true && ' (Rerun)'}</div>
                        <FlexibleTimer
                            startDateTime={banner.startDate}
                            endDateTime={banner.endDate}
                        />
                    </button>
                ))}
            </div>

            <ModalWindow
                ref={memoriesModalRef}
                title={selectedBanner?.name}
                tag={
                    <CardList cards={cards}/>
                }
            />
        </>
    );
}

export default BannerList;