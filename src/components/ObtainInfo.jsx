import styles from './ObtainInfo.module.css';
import {useRef, useState} from "react";
import ModalWindow from "./ModalWindow.jsx";
import {getImageUrl} from "./imageUtils.js";
import BannerPeriod from "./BannerPeriod.jsx";
import {bannersDataFull} from "../data/banners-data-full.js";
import BannerList from "./BannerList.jsx";

function ObtainInfo({cardId, obtainData}) {
    const obtainModalRef = useRef();
    const [selectedObtain, setSelectedObtain] = useState(null);

    const showObtainModal = (obtainItem) => {
        setSelectedObtain(obtainItem);
        obtainModalRef.current.showModal();
    };

    // Находим ВСЕ баннеры, где есть эта карточка
    const banners = bannersDataFull.filter(b => b.cardIds.includes(Number(cardId)));

    // Список способов получения, для которых показываем баннеры
    const BANNER_OBTAIN_TYPES = ['Xspace Echo', 'Limited Banner'];

    if (!obtainData || !cardId) {
        return null;
    }

    // Находим ВСЕ способы получения, где есть этот cardId
    const foundObtains = obtainData.filter(item =>
        item.memories.includes(Number(cardId))
    );

    if (foundObtains.length === 0) {
        return null;
    }

    return (
        <div className={styles.obtainContainer}>
            <div className={styles.label}>Obtain:</div>
            <div className={styles.values}>
                {foundObtains.map((item, index) => (
                    <span key={item.obtain}>
                        <button
                            className={styles.value}
                            onClick={() => showObtainModal(item)}
                        >
                            {item.obtain}
                        </button>
                        {index < foundObtains.length - 1 &&
                            <span className={styles.separator}> | </span>
                        }
                    </span>
                ))}
            </div>

            <ModalWindow
                width={600}
                ref={obtainModalRef}
                title={`How to get: ${selectedObtain?.obtain || ''}`}
                tag={
                    <div className={styles.modalInfo}>
                        <div className={styles.modalInfo}>
                            {selectedObtain?.description}
                            <img src={getImageUrl(selectedObtain?.image)} alt={selectedObtain?.obtain} width={'50%'} height={'50%'} />
                        </div>

                        {/* Показываем баннеры только для Xspace Echo и Limited Banner */}
                        {selectedObtain && BANNER_OBTAIN_TYPES.includes(selectedObtain.obtain) && banners.length > 0 && (
                            <>
                                <BannerPeriod banners={banners}/>
                                <BannerList banners={banners}/>
                            </>
                        )}

                    </div>
                }
            />
        </div>
    );
}

export default ObtainInfo;