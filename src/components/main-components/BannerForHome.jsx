import {useRef} from 'react';
import styles from '@pages/main/Home.module.css';
import {
    CardList,
    ModalWindow,
    FlexibleTimer,
    useTimezone
} from '@components'
import {memoriesData} from '@data';
import {getImageUrl} from '@hooks';

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