import styles from "./Showcase.module.css";
import {getImageUrl} from "../../../hooks/imageUtils.js";
import {useRef} from "react";
import ModalWindow from "../../ui/ModalWindow.jsx";
import {compData} from "../../../data/companion-battle-data/comp-data.js";

function ChooseCompanionAndWeapon({
                                      selectedCompanion,
                                      selectedMCWeapon,
                                      onSelectCompanion,
                                      onSelectMCWeapon
                                  }) {
    const companionModalRef = useRef();
    const mcWeaponModalRef = useRef();

    const showCompanionModal = () => {
        companionModalRef.current?.showModal();
    };

    const showMCWeaponModal = () => {
        mcWeaponModalRef.current?.showModal();
    };

    const handleSelectCompanion = (companion) => {
        onSelectCompanion(companion);
        companionModalRef.current?.closeModal();
    };

    const handleSelectMCWeapon = (companion) => {
        onSelectMCWeapon(companion);
        mcWeaponModalRef.current?.closeModal();
    };

    return (
        <div className={styles.companionSection}>
            {/* Кнопка выбора компаньона */}
            <button className={styles.addCompanionBtn} onClick={showCompanionModal}>
                {selectedCompanion ? (
                    <div className={styles.companionChar}>
                        <img
                            className={styles.companionImage}
                            src={getImageUrl(selectedCompanion.img)}
                            alt={selectedCompanion.companionName}
                        />
                        <div className={styles.companionName}>
                            {selectedCompanion.companionName}
                        </div>
                    </div>
                ) : (
                    <div className={styles.addCompanionText}>+ Add Companion</div>
                )}
            </button>

            {/* Кнопка выбора MC Weapon */}
            <button className={styles.addCompanionBtn} onClick={showMCWeaponModal}>
                {selectedMCWeapon ? (
                    <div className={styles.companionChar}>
                        <img
                            className={styles.mcWeaponImage}
                            src={getImageUrl(selectedMCWeapon.imgWeapon)}
                            alt={selectedMCWeapon.weaponName}
                        />
                        <div className={styles.companionName}>
                            MC Weapon: {selectedMCWeapon.weaponName}
                        </div>
                    </div>
                ) : (
                    <div className={styles.addCompanionText}>+ Add MC Weapon</div>
                )}
            </button>

            {/* Модалка выбора компаньона */}
            <ModalWindow
                ref={companionModalRef}
                title="Select Companion"
                width={720}
                tag={
                    <div className={styles.companionGrid}>
                        {compData
                            .filter(companion => companion.img && companion.companionName)
                            .map(companion => (
                                <button
                                    key={companion.id}
                                    className={styles.companionItem}
                                    onClick={() => handleSelectCompanion(companion)}
                                >
                                    <img
                                        className={styles.companionImg}
                                        src={getImageUrl(companion.img)}
                                        alt={companion.companionName}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className={styles.companionTitle}>
                                        {companion.companionName}
                                    </div>
                                </button>
                            ))}
                    </div>
                }
            />

            {/* Модалка выбора MC Weapon */}
            <ModalWindow
                ref={mcWeaponModalRef}
                title="Select MC Weapon"
                width={720}
                tag={
                    <div className={styles.companionGrid}>
                        {compData
                            .filter(companion => companion.imgWeapon && companion.weaponName)
                            .map(companion => (
                                <button
                                    key={companion.id}
                                    className={styles.companionItem}
                                    onClick={() => handleSelectMCWeapon(companion)}
                                >
                                    <img
                                        className={styles.companionImg}
                                        src={getImageUrl(companion.imgWeapon)}
                                        alt={companion.weaponName}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className={styles.companionTitle}>
                                        {companion.weaponName}
                                    </div>
                                </button>
                            ))}
                    </div>
                }
            />
        </div>
    );
}

export default ChooseCompanionAndWeapon;