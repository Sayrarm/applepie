import { useRef } from "react";
import styles from "./Choose.module.css";
import { getImageUrl } from "@hooks";
import { ModalWindow } from "@components";
import { compData } from "@data";
import { useTranslation } from "react-i18next";

function ChooseCompanion({ selectedCompanion, onSelectCompanion }) {
  const companionModalRef = useRef();
  const { t } = useTranslation();

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
          <div className={styles.addCompanionText}>{t('ChooseCompanion.addButton')}</div>
        )}
      </button>

      {/* Модалка выбора компаньона */}
      <ModalWindow
        ref={companionModalRef}
        title={t('ChooseCompanion.titleModal')}
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

export default ChooseCompanion;
