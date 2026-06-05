import { Link, useParams } from 'react-router-dom';
import styles from "./CardArticle.module.css";
import memoriesDataUrl from '../data/memories-data.json?url';
import { Fragment, useEffect, useState } from "react";
import {getImageUrl} from "../components/imageUtils.js";
import CopyableText from "../components/CopyableText.jsx";
import ParametersBlock from "../components/ParametersBlock.jsx";

function CardArticle() {
    const { cardId } = useParams(); // только id карточки
    const [card, setCard] = useState(null);

    // Загружаем JSON
    useEffect(() => {
        fetch(memoriesDataUrl)
            .then(res => res.json())
            .then(data => {
                const found = data.find(c => String(c.id) === cardId);
                setCard(found);
            })
            .catch(error => console.error('Ошибка загрузки:', error));
    }, [cardId]);

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


                        <ParametersBlock card={card} />



                </div>
            </article>
        </>
    );
}

export default CardArticle;