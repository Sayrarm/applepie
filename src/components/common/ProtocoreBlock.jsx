import React, {useRef, useState} from "react";
import styles from "./ProtocoreBlock.module.css";
import { getImageUrl } from "@hooks";
import {
  getRequiredCredits,
  getRequiredExp,
  protocoreColor,
  protocoreTypes,
  getStatKey
} from "@data";
import {addFarmGoal} from "@localstorage";
import {LevelRangeControl, ModalWindow, useHighlight} from "@components";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";

function ProtocoreBlock({
  protocore,
  onEdit,
  onDelete,
  hideChange = false,
  hideDelete = false,
  hideGoal = true,
  cardImage,
}) {
  const [goalAdded, setGoalAdded] = useState(false);
  const { type, stellactrum, level, mainStat, mainStatValue, substats } =
    protocore;
  const { highlightedStat } = useHighlight();

  const mainStatKey = getStatKey(mainStat);
  const isMainHighlighted = highlightedStat && mainStatKey === highlightedStat;

  const modalRef = useRef(null);
  const [draftLevel, setDraftLevel] = useState(level);
  const { t } = useTranslation();

  const openGoalModal = () => {
    setDraftLevel(level);
    setGoalAdded(false);
    modalRef.current?.showModal();
  };

  const canAddGoal = () => {
    return (
        typeof draftLevel === "number" &&
        typeof level === "number" &&
        draftLevel > level
    );
  };

  const handleAddToFarm = () => {
    if (!canAddGoal()) return;

    const expNeeded = getRequiredExp(level, draftLevel);
    const creditsNeeded = getRequiredCredits(level, draftLevel);

    const goal = {
      id: Date.now(),
      type: "protocore",
      protocoreId: protocore.id,
      protocoreType: type,
      mainStat: mainStat,
      currentLevel: level,
      targetLevel: draftLevel,
      neededExp: expNeeded,
      neededCredits: creditsNeeded,
      expDungeonLevel: 10,
      creditDungeonLevel: 9,
      neededCrystals: null,
      createdAt: new Date().toISOString(),
    };

    addFarmGoal(goal);
    setGoalAdded(true);
  };

  // Получаем данные типа из protocoreTypes
  const typeData = protocoreTypes[type];
  const typeDisplayName = typeData
    ? typeData.name
    : type.charAt(0).toUpperCase() + type.slice(1);

  // Функция для получения пути к картинке из protocoreColor
  const getProtocoreImage = (type, color) => {
    // Ищем совпадение по типу и цвету
    // В protocoreColor названия: amber-alfa, emerald-beta и т.д.
    const imageName = `${color}-${type}`;
    const found = protocoreColor.find((item) => {
      // Извлекаем имя файла из пути
      const fileName = item.img.split("/").pop(); // например, "amber-alpha.png"
      const nameWithoutExt = fileName.split(".")[0];
      return nameWithoutExt === imageName;
    });
    return found ? found.img : null;
  };

  // Функция для форматирования значения стата
  const formatStatValue = (stat, value) => {
    if (value === null || value === undefined) return "N/A";
    const flatStats = ["HP", "ATK", "DEF"];
    if (flatStats.includes(stat)) {
      return `+${value}`;
    } else {
      return `${value}%`;
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(protocore);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(protocore);
    }
  };

  // Получаем путь к картинке
  const imagePath = getProtocoreImage(type, stellactrum);

  return (
    <section
      className={`${styles.protocoreBlock} ${styles[`stellactrum${stellactrum.charAt(0).toUpperCase() + stellactrum.slice(1)}`] || ""}`}
    >
      {/* Картинка карточки, если есть */}
      {cardImage && (
        <img
          src={getImageUrl(cardImage)}
          alt="Card"
          className={styles.cardImage}
        />
      )}

      <div className={styles.protocoreInfo}>
        <div className={styles.header}>
          <div className={styles.typeIcon}>
            <img
              src={getImageUrl(imagePath)}
              alt={typeDisplayName}
              className={styles.typeImage}
            />
          </div>
          <div className={styles.typeInfo}>
            <span className={styles.typeName}>{typeDisplayName}</span>
            <span className={styles.level}>Lv. {level}</span>
          </div>
        </div>

        <div className={`${styles.mainStat} ${isMainHighlighted ? styles.highlighted : ""}`}>
          <span className={styles.statLabelMain}>{mainStat}</span>
          <span className={styles.statValueMain}>
    {formatStatValue(mainStat, mainStatValue)}
  </span>
        </div>

        <div className={styles.substatsContainer}>
          {substats && substats.map((substat, index) => {
            const statName = typeof substat === "object" ? substat.stat : substat;
            const statValue = typeof substat === "object" ? substat.value : null;
            const isHighlighted =
                highlightedStat && getStatKey(statName) === highlightedStat;
            return (
                <div
                    key={index}
                    className={`${styles.subStat} ${isHighlighted ? styles.highlighted : ""}`}
                >
                  <span className={styles.statLabel}>{statName}</span>
                  <span className={styles.statValue}>
        {formatStatValue(statName, statValue)}
      </span>
                </div>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        {!hideGoal && (
        <button className={styles.goalButton} onClick={openGoalModal}>
          🎯
        </button>
        )}
        {!hideChange && (
          <button className={styles.editButton} onClick={handleEdit}>
            {t('ProtocoreBlock.changeButton')}
          </button>
        )}
        {!hideDelete && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            {t('ProtocoreBlock.deleteButton')}
          </button>
        )}
      </div>

      <ModalWindow
          ref={modalRef}
          title={t('ProtocoreBlock.titleModalGoalButton')}
          width={500}
          tag={
            goalAdded ? (
                <div style={{ textAlign: "left" }}>
                  <p>{t('ProtocoreBlock.addGoalAlert')}</p>
                  <Link
                      className={styles.link}
                      to="/"
                      onClick={() => modalRef.current?.closeModal()}
                  >
                    {t('ProtocoreBlock.mainButton')}
                  </Link>
                </div>
            ) : (
                <div style={{ textAlign: "left" }}>
                  <LevelRangeControl
                      id="protocore-goal-level"
                      level={draftLevel}
                      setLevel={setDraftLevel}
                      minLevel={0}
                      maxLevel={15}
                      showAscend={false}
                      label="Level:"
                  />
                  <div style={{ textAlign: "right", marginTop: 16 }}>
                    <button
                        className={styles.addGoalButton}
                        onClick={handleAddToFarm}
                        disabled={!canAddGoal()}
                    >
                      {t('ProtocoreBlock.addButton')}
                    </button>
                  </div>
                </div>
            )
          }
      />

    </section>
  );
}

export default ProtocoreBlock;
