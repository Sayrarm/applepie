
import styles from './CardList.module.css';
import Card from './Card.jsx';
import { Link } from 'react-router-dom';

function CardList({ cards, className }) {
    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div className={`${styles.cardsGrid} ${className || ''}`}>
            {cards.map(card => (
                <Link
                    key={card.id}
                    to={`/memories/${card.id}`}
                    className={styles.cardLink}
                >
                    <Card data={card} />
                </Link>
            ))}
        </div>
    );
}

export default CardList;