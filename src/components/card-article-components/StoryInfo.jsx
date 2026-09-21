import styles from "./StoryInfo.module.css";
import {storyCardInfo, memoriesData, mythTitle} from "@data";
import {useRef, useState} from "react";
import {CopyableText, ModalWindow} from "@components";

function StoryInfo({ cardId }) {
  const modalRef = useRef();
  const [mythInfo, setMythInfo] = useState(null);

  // Находим информацию о карточке в memoriesData
  const card = memoriesData.find((c) => String(c.id) === String(cardId));

  // Если карточка не найдена - не показываем
  if (!card || !cardId) {
    return null;
  }

  // Проверяем, есть ли поле link у карточки
  if (!Object.prototype.hasOwnProperty.call(card, "link")) {
    return null;
  }

  // Находим историю, в которую входит карточка
  const storyInfo = storyCardInfo.find((item) =>
      item.memories.some((id) => String(id) === String(cardId)),
  );

  if (!storyInfo) {
    return null;
  }

  // Проверяем, является ли история Myth
  const isMyth = storyInfo.story === "Myths";

  // Находим информацию о мифе для этой карточки
  const mythData = isMyth
      ? mythTitle.find((item) =>
          item.cardsId.some((id) => String(id) === String(cardId)),
      )
      : null;

  // Проверяем, есть ли ссылка (не пустая)
  const hasLink = card.link && card.link.trim() !== "";

  const handleClick = (e) => {
    // Если это Myth и есть данные о мифе - показываем модалку
    if (isMyth && mythData) {
      e.preventDefault();
      setMythInfo(mythData);
      modalRef.current?.showModal();
      return;
    }

    // Если это не Myth или нет данных о мифе - пробуем открыть ссылку
    if (!hasLink) {
      e.preventDefault();
      alert("No data available for this memory. Try to find it on YT :)");
    }
  };

  return (
      <>
        <div className={styles.container}>
          <div className={styles.label}>Story:</div>
          <a
              href={hasLink ? card.link : "#"}
              target={hasLink ? "_blank" : undefined}
              rel={hasLink ? "noopener noreferrer" : undefined}
              className={styles.value}
              onClick={handleClick}
          >
            {storyInfo.story}
          </a>
        </div>

        {/* Модалка для Myth */}
        <ModalWindow
            ref={modalRef}
            title="Description"
            width={300}
            tag={
              <div className={styles.mythModal}>
                <p>
                  The memory is related to the Myth story
                </p>
                <div>
                  <CopyableText
                      text={mythInfo?.title}
                      className={styles.cardTitle}
                  >
                    "{mythInfo?.title}"
                  </CopyableText>
                </div>
              </div>
            }
        />
      </>
  );
}

export default StoryInfo;
