import {Link, useParams} from 'react-router-dom';
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

    // Находим карточку напрямую в данных
    const card = memoriesData.find(c => String(c.id) === cardId);

    // Находим ВСЕ баннеры, где есть эта карточка
    const banners = bannersDataFull.filter(b => b.cardIds.includes(Number(cardId)));

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
        </>
    );
}

export default CardArticle;