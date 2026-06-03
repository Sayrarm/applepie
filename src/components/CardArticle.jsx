import { useParams } from 'react-router-dom';
import styles from "./GenericArticlePage.module.css";
import memoriesData from '../data/memories-data.json';

function CardArticle() {

    const { cardId } = useParams(); // ← получаем id из URL


    // Находим карточку по id (или по другому полю)
    const card = memoriesData.find(card => card.id === Number(cardId));


    if (!card) {
        return <div>Card not found ¯\_(ツ)_/¯</div>;
    }

    return (
        <div className={styles.containerCard}>
            <article className={styles.card}>
                <div className={styles.imgContainer}>
                    <img src={card.image} alt={card.name} />
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.cardTitle}>{card.char}: {card.name}</div>
                    <div>Rarity: {card.rarityName}</div>
                    <div>Stella: {card.stellaName}</div>
                    <div>Placement: {card.placementName}</div>
                    <div>Talent: {card.talentName}</div>
                </div>
            </article>
        </div>
    );
}

export default CardArticle;