import styles from '../../pages/main/Home.module.css';
import {useRef} from 'react';
import CardList from '../common/CardList.jsx';
import {memoriesData} from '../../data/card-article-data/memories-data.js';
import ModalWindow from "../ui/ModalWindow.jsx";
import {getImageUrl} from "../../hooks/imageUtils.js";
import FlexibleTimer from "../common/FlexibleTimer.jsx";
import {useTimezone} from '../header/TimezoneContext.jsx';

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