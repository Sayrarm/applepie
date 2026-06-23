import styles from '../pages/Home.module.css';
import {useRef} from 'react';
import CardList from './CardList.jsx';
import {memoriesData} from '../data/memories-data.js';
import ModalWindow from "./ModalWindow.jsx";
import {getImageUrl} from "./imageUtils.js";
import FlexibleTimer from "./FlexibleTimer.jsx";
import {useTimezone} from './TimezoneContext';

function BannerForHome({banner}) {
    const memoriesModalRef = useRef();
    const {timezone} = useTimezone();

    const cards = memoriesData.filter(card => banner.cardIds.includes(card.id));

    return (
        <>
            <button
                onClick={() => memoriesModalRef.current.showModal()}
                className={styles.containerTitleTimerButton}>
                <div className={styles.bannerTitle}>{banner.name} {banner.rerun === true && ' (Rerun)'}</div>
                <FlexibleTimer
                    key={timezone}
                    startDateTime={banner.startDate}
                    endDateTime={banner.endDate}
                />

                <img className={styles.imgBanner} src={getImageUrl(banner.image)}
                     alt={banner.name}/>
            </button>

            <ModalWindow
                ref={memoriesModalRef}
                title={banner.name}
                tag={
                    <CardList cards={cards}/>
                }
            />
        </>
    );
}

export default BannerForHome;