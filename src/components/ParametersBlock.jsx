import styles from "./ParametersBlock.module.css";
import {getImageUrl} from "./imageUtils.js";
import {useRef} from "react";
import ModalWindow from "./ModalWindow.jsx";

function ParametersBlock({card}) {

    const parametersModalRef = useRef();

    const showParametersModal = () => {
        parametersModalRef.current.showModal();
    };

    if (!card) return null;

    return (
        <>
            <button
                onClick={showParametersModal}
                className={styles.parametersContainer}>
                <div className={styles.generalContainer}>
                    <span>Rarity:</span>
                    {[...Array(card.rarityStars)].map((_, i) => (
                        <img
                            className={styles.rarity}
                            key={i}
                            src={getImageUrl(card.rarity)}
                            alt={card.rarityName}
                            width={24}
                            height={24}
                        />
                    ))}
                </div>

                <div className={styles.borderVertical}></div>

                <div className={styles.generalContainer}>
                    <span>Stellactrum:</span>
                    <img
                        className={styles.stella}
                        src={getImageUrl(card.stella)}
                        alt={card.stellaName}
                        width={24}
                        height={24}
                    />
                </div>

                <div className={styles.borderVertical}></div>

                <div className={styles.generalContainer}>
                    <span>Placement:</span>
                    <img
                        className={styles.placement}
                        src={getImageUrl(card.placement)}
                        alt={card.placementName}
                        width={24}
                        height={24}
                    />
                </div>

                <div className={styles.borderVertical}></div>

                <div className={styles.generalContainer}>
                    <span>Talent:</span>
                    <img
                        className={styles.talent}
                        src={getImageUrl(card.talent)}
                        alt={card.talentName}
                        width={24}
                        height={24}
                    />
                </div>
            </button>

            <ModalWindow
                ref={parametersModalRef}
                title={'Hints for parameters'}
                tag={
                    <>
                        <img
                            className={styles.img}
                            src={getImageUrl('../assets/main-page/modal-window/protocore-schedule.png')}
                            alt={'protocore schedule'}/>
                        <img
                            className={styles.img}
                            src={'src/assets/main-page/modal-window/trial-schedule.png'}
                            alt={'trial schedule'}/>
                    </>
                }/>
        </>
    )

}

export default ParametersBlock