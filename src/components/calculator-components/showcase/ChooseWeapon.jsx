import { useRef } from "react";
import styles from "./Showcase.module.css";
import { getImageUrl } from "@hooks";
import { ModalWindow } from "@components";
import { compData } from "@data";

function ChooseCompanionAndWeapon({ selectedMCWeapon, onSelectMCWeapon }) {
  const mcWeaponModalRef = useRef();

  const showMCWeaponModal = () => {
    mcWeaponModalRef.current?.showModal();
  };

  const handleSelectMCWeapon = (companion) => {
    onSelectMCWeapon(companion);
    mcWeaponModalRef.current?.closeModal();
  };

  return (
    <>
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

      {/* Модалка выбора MC Weapon */}
      <ModalWindow
        ref={mcWeaponModalRef}
        title="Select MC Weapon"
        width={720}
        tag={
          <div className={styles.companionGrid}>
            {compData
              .filter(
                (companion) => companion.imgWeapon && companion.weaponName,
              )
              .map((companion) => (
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
    </>
  );
}

export default ChooseCompanionAndWeapon;
