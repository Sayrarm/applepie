import styles from './ObtainInfo.module.css';
import { useRef, useState } from "react";
import ModalWindow from "./ModalWindow.jsx";

function ObtainInfo({ cardId, obtainData }) {
    const obtainModalRef = useRef();
    const [selectedObtain, setSelectedObtain] = useState(null);

    const showObtainModal = (obtainItem) => {
        setSelectedObtain(obtainItem);
        obtainModalRef.current.showModal();
    };

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
                ref={obtainModalRef}
                title={`How to get: ${selectedObtain?.obtain || ''}`}
                tag={
                    <div className={styles.modalInfo}>
                        {selectedObtain?.description}
                    </div>
                }
            />
        </div>
    );
}

export default ObtainInfo;