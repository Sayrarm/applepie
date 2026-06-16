import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import styles from "./CardArticle.module.css";
import {memoriesData} from '../data/memories-data.js';
import {Fragment} from "react";
import {getImageUrl} from "../components/imageUtils.js";
import CopyableText from "../components/CopyableText.jsx";
import ParametersBlock from "../components/ParametersBlock.jsx";
import BannerPeriod from "../components/BannerPeriod.jsx";
import {bannersDataFull} from '../data/banners-data-full.js';
import ObtainInfo from "../components/ObtainInfo.jsx";
import {obtainData} from '../data/obtain-data.js';

function CardArticle() {
    const {cardId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Вычисляем значения напрямую
    const cardsList = location.state?.cards && location.state?.cards.length > 0
        ? location.state.cards
        : (memoriesData.find(c => String(c.id) === cardId) ? [memoriesData.find(c => String(c.id) === cardId)] : []);

    const currentIndex = location.state?.cards && location.state?.cards.length > 0
        ? location.state.currentIndex || 0
        : 0;

    // Находим карточку напрямую в данных (для отображения)
    const card = memoriesData.find(c => String(c.id) === cardId);

    // Находим ВСЕ баннеры, где есть эта карточка
    const banners = bannersDataFull.filter(b => b.cardIds.includes(Number(cardId)));

    // Функции навигации
    const goToPrevious = () => {
        if (currentIndex > 0 && cardsList.length > 0) {
            const prevCard = cardsList[currentIndex - 1];
            if (prevCard) {
                navigate(`/memories/${prevCard.id}`, {
                    state: {
                        cards: cardsList,
                        currentIndex: currentIndex - 1
                    }
                });
            }
        }
    };

    const goToNext = () => {
        if (currentIndex < cardsList.length - 1) {
            const nextCard = cardsList[currentIndex + 1];
            if (nextCard) {
                navigate(`/memories/${nextCard.id}`, {
                    state: {
                        cards: cardsList,
                        currentIndex: currentIndex + 1
                    }
                });
            }
        }
    };

    if (!card) {
        return <div>Card not found ¯\_(ツ)_/¯</div>;
    }

    return (
        <>
            <nav className={styles.nav}>
                <Fragment>
                    <Link className={styles.link} to="/memories">
                        Memories
                    </Link>
                    <span className={styles.span}> &gt; </span>
                    <span>{card.char}: {card.name}</span>
                </Fragment>
            </nav>

            <article className={styles.card}>
                <div className={styles.imgContainer}>
                    <img
                        className={styles.img}
                        src={getImageUrl(card.image)}
                        alt={card.name}
                    />
                </div>
                <div className={styles.infoContainer}>
                    <CopyableText
                        text={`${card.char}: ${card.name}`}
                        className={styles.cardTitle}
                    >
                        {card.char}: {card.name}
                    </CopyableText>

                    <ParametersBlock card={card}/>

                    <ObtainInfo cardId={cardId} obtainData={obtainData} />

                    <BannerPeriod banners={banners} />
                </div>
            </article>

            {/* Кнопки навигации */}
            <div className={styles.navigation}>
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0 || cardsList.length === 0}
                    className={styles.navButton}
                >
                    <img className={styles.arrowsButton} src={getImageUrl('../assets/icons/left-arrow.svg')} alt="back"/>
                </button>
                <span className={styles.navCounter}>
                    {cardsList.length > 0 && `${currentIndex + 1} / ${cardsList.length}`}
                </span>
                <button
                    onClick={goToNext}
                    disabled={currentIndex === cardsList.length - 1 || cardsList.length === 0}
                    className={styles.navButton}
                >
                    <img className={styles.arrowsButton} src={getImageUrl('../assets/icons/right-arrow.svg')} alt="next"/>
                </button>
            </div>
        </>
    );
}

export default CardArticle;