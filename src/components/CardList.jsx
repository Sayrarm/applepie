import styles from './CardList.module.css';
import Card from './Card.jsx';
import { Link } from 'react-router-dom';

function CardList({ cards, isSmall = true }) {
    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            {cards.map(card => (
                <Link
                    key={card.id}
                    to={`/memories/${card.id}`}
                >
                    <Card data={card} isSmall={isSmall} />
                </Link>
            ))}
        </div>
    );
}

export default CardList;