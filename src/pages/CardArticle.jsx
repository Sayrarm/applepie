import { Link, useParams } from 'react-router-dom';
import styles from "./CardArticle.module.css";
import memoriesDataUrl from '../data/memories-data.json?url';
import { Fragment, useEffect, useState } from "react";
import {getImageUrl} from "../components/imageUtils.js";

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
                    <h1 className={styles.cardTitle}>{card.char}: {card.name}</h1>

                    <div className={styles.parametrsContainer}>
                        <div className={styles.generalContainer}>
                            <span>Rarity:</span>
                            {[...Array(card.rarityStars)].map((_, i) => (
                                <img
                                    className={styles.rarity}
                                    key={i}
                                    src={getImageUrl(card.rarity)}
                                    alt={card.rarityName}
                                    width={24}
                                    height={24}
                                />
                            ))}
                        </div>

                        <div className={styles.borderVertical}></div>

                        <div className={styles.generalContainer}>
                            <span>Stellactrum:</span>
                            <img
                                className={styles.stella}
                                src={getImageUrl(card.stella)}
                                alt={card.stellaName}
                                width={24}
                                height={24}
                            />
                        </div>

                        <div className={styles.borderVertical}></div>

                        <div className={styles.generalContainer}>
                            <span>Placement:</span>
                            <img
                                className={styles.placement}
                                src={getImageUrl(card.placement)}
                                alt={card.placementName}
                                width={24}
                                height={24}
                            />
                        </div>

                        <div className={styles.borderVertical}></div>

                        <div className={styles.generalContainer}>
                            <span>Talent:</span>
                            <img
                                className={styles.talent}
                                src={getImageUrl(card.talent)}
                                alt={card.talentName}
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>


                </div>
            </article>
        </>
    );
}

export default CardArticle;