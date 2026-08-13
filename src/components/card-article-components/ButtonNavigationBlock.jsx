import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "@pages/memories/CardArticle.module.css";
import { memoriesData } from "@data";

//меняем цвет svg картинке
const IconLeft = () => (
  <svg
    className={styles.iconLeft}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.2322 23.2322C13.2559 24.2085 13.2559 25.7915 14.2322 26.7678L30.1421 42.6777C31.1184 43.654 32.7014 43.654 33.6777 42.6777C34.654 41.7014 34.654 40.1184 33.6777 39.1421L19.5355 25L33.6777 10.8579C34.654 9.88155 34.654 8.29864 33.6777 7.32233C32.7014 6.34602 31.1184 6.34602 30.1421 7.32233L14.2322 23.2322ZM17 25V22.5H16V25V27.5H17V25Z"
      fill="currentColor"
    />
  </svg>
);

const IconRight = () => (
  <svg
    className={styles.iconRight}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35.7678 26.7678C36.7441 25.7915 36.7441 24.2085 35.7678 23.2322L19.8579 7.32233C18.8816 6.34602 17.2986 6.34602 16.3223 7.32233C15.346 8.29864 15.346 9.88155 16.3223 10.8579L30.4645 25L16.3223 39.1421C15.346 40.1184 15.346 41.7014 16.3223 42.6777C17.2986 43.654 18.8816 43.654 19.8579 42.6777L35.7678 26.7678ZM32 25V27.5H34V25V22.5H32V25Z"
      fill="currentColor"
    />
  </svg>
);

function ButtonNavigationBlock() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Вычисляем значения напрямую
  const cardsList = useMemo(() => {
    return location.state?.cards?.length > 0
      ? location.state.cards
      : [memoriesData.find((c) => String(c.id) === cardId)].filter(Boolean);
  }, [location.state, cardId]);

  const currentIndex = useMemo(() => {
    return location.state?.cards?.length > 0
      ? location.state.currentIndex || 0
      : 0;
  }, [location.state]);

  // Функции навигации
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0 && cardsList.length > 0) {
      const prevCard = cardsList[currentIndex - 1];
      if (prevCard) {
        navigate(`/memories/${prevCard.id}`, {
          state: {
            cards: cardsList,
            currentIndex: currentIndex - 1,
          },
        });
      }
    }
  }, [currentIndex, cardsList, navigate]);

  const goToNext = useCallback(() => {
    if (currentIndex < cardsList.length - 1) {
      const nextCard = cardsList[currentIndex + 1];
      if (nextCard) {
        navigate(`/memories/${nextCard.id}`, {
          state: {
            cards: cardsList,
            currentIndex: currentIndex + 1,
          },
        });
      }
    }
  }, [currentIndex, cardsList, navigate]);

  // ДОБАВЛЯЕМ ОБРАБОТЧИК КЛАВИШ
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Проверяем, что пользователь не печатает в поле ввода
      const isInputFocused = ["INPUT", "TEXTAREA"].includes(
        event.target.tagName,
      );
      if (isInputFocused) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (currentIndex > 0) {
          goToPrevious();
        }
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (currentIndex < cardsList.length - 1) {
          goToNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, cardsList.length, goToPrevious, goToNext]);

  return (
    <>
      {/* Кнопки навигации */}
      {cardsList.length > 1 && (
        <div className={styles.navigation}>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={styles.navButtonLeft}
          >
            <IconLeft className={styles.iconLeft} />
          </button>
          <span className={styles.navCounter}>
            {currentIndex + 1} / {cardsList.length}
          </span>
          <button
            onClick={goToNext}
            disabled={currentIndex === cardsList.length - 1}
            className={styles.navButtonRight}
          >
            <IconRight className={styles.iconRight} />
          </button>
        </div>
      )}
    </>
  );
}

export default ButtonNavigationBlock;
