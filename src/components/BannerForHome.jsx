import styles from '../pages/Home.module.css';
import {useRef} from 'react';
import CardList from './CardList.jsx';
import memoriesData from '../data/memories-data.json';
import { CardProvider } from "./CardProvider.jsx";
import ModalWindow from "./ModalWindow.jsx";
import { getImageUrl } from "./imageUtils.js";
import FlexibleTimer from "./FlexibleTimer.jsx";

function BannerForHome({ banner }) {
    const memoriesModalRef = useRef();

    const cards = memoriesData.filter(card => banner.cardIds.includes(card.id));

    return (
        <>
            <button
                onClick={() => memoriesModalRef.current.showModal()}
                className={styles.containerTitleTimerButton}>
                <div>
                    <div className={styles.bannerTitle}>{banner.name} {banner.rerun === true && ' (Rerun)'}</div>
                    <FlexibleTimer
                        startDateTime={banner.startDate}
                        endDateTime={banner.endDate}
                    />
                </div>

                <img className={styles.imgBanner} src={getImageUrl(banner.image)}
                     alt={banner.name}/>
            </button>

            <ModalWindow
                ref={memoriesModalRef}
                title={banner.name}
                tag={
                    <CardProvider>
                        <CardList cards={cards} />
                    </CardProvider>
                }
            />
        </>
    );
}

export default BannerForHome;