import {Link, useParams} from 'react-router-dom';
import styles from "./CardArticle.module.css";
import {memoriesData} from '../../data/card-article-data/memories-data.js';
import {Fragment, useState} from "react";
import {getImageUrl} from "../../hooks/imageUtils.js";
import CopyableText from "@components/card-article-components/CopyableText.jsx";
import ParametersBlock from "@components/card-article-components/ParametersBlock.jsx";

import ObtainInfo from "@components/card-article-components/ObtainInfo.jsx";
import {obtainData} from '../../data/card-article-data/obtain-data.js';
import {compData} from "../../data/companion-battle-data/comp-data.js";
import PairBonusBlock from "@components/card-article-components/PairBonusBlock.jsx";
import ButtonNavigationBlock from "@components/card-article-components/ButtonNavigationBlock.jsx";
import LevelCardBlock from "@components/card-article-components/LevelCardBlock.jsx";
import CardProtocores from "@components/card-article-components/CardProtocores.jsx";
import SolarPairBonusBlock from "@components/card-article-components/SolarPairBonusBlock.jsx";
import {solar4Stars} from "../../data/card-article-data/solar-4-star-info.js";
import StoryInfo from "@components/card-article-components/StoryInfo.jsx";

function CardArticle() {
    const {cardId} = useParams();
    const [isCardAvailable, setIsCardAvailable] = useState(false);

    // Находим карточку напрямую в данных (для отображения)
    const card = memoriesData.find(c => String(c.id) === cardId);



    // Находим компаньона для текущей карточки
    const companion = compData.find(item =>
        item.cardIds?.includes(Number(cardId))
    );

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

            <article key={cardId} className={styles.card}>
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

                    <ObtainInfo cardId={cardId} obtainData={obtainData}/>
                    <StoryInfo cardId={cardId}/>


                    <ParametersBlock card={card}/>

                    {companion && (
                        <PairBonusBlock
                            cardId={cardId}
                            currentCard={card}
                            compData={compData}
                            memoriesData={memoriesData}
                        />
                    )}

                    <SolarPairBonusBlock
                        cardId={cardId}
                        memoriesData={memoriesData}
                        solarPairData={solar4Stars}
                    />



                    <LevelCardBlock
                        cardId={cardId}
                        onAvailabilityChange={setIsCardAvailable}
                    />

                    {isCardAvailable && (
                        <CardProtocores
                            cardId={cardId} />
                    )}

                </div>
            </article>

            <ButtonNavigationBlock/>
        </>
    );
}

export default CardArticle;