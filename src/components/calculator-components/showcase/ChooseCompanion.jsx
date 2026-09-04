import { useRef } from "react";
import styles from "./Showcase.module.css";
import { getImageUrl } from "@hooks";
import { ModalWindow } from "@components";
import { compData } from "@data";

function ChooseCompanionAndWeapon({ selectedCompanion, onSelectCompanion }) {
  const companionModalRef = useRef();

  const showCompanionModal = () => {
    companionModalRef.current?.showModal();
  };

  const handleSelectCompanion = (companion) => {
    onSelectCompanion(companion);
    companionModalRef.current?.closeModal();
  };

  return (
    <>
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

      {/* Модалка выбора компаньона */}
      <ModalWindow
        ref={companionModalRef}
        title="Select Companion"
        width={720}
        tag={
          <div className={styles.companionGrid}>
            {compData
              .filter((companion) => companion.img && companion.companionName)
              .map((companion) => (
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
    </>
  );
}

export default ChooseCompanionAndWeapon;
