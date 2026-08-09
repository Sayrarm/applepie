import {Link, useParams} from "react-router-dom";
import React, {Fragment} from "react";
import styles from "./CharacterArticle.module.css";
import {charactersCategories} from "@data/lore-data/characters-categories.js";
import CharacterArticlePage from "@components/lore-components/CharacterArticlePage.jsx";
import AsideList from "@components/ui/AsideList.jsx";



function CharacterArticle() {

    const { articleLink } = useParams();

    // Находим текущую категорию
    const currentCategory = charactersCategories.find(cat => cat.link === articleLink);

    const items = [
        {
            key: '1',
            label: 'Spoiler Alert',
            children: (
                <div className={styles.disclaimerContent}>
                    <strong className={styles.titleMain}>
                        This page provides information about the character's story.  If you don't want spoilers, please open the links with caution :)
                    </strong>
                    <p>
                        <strong>Main Story</strong> - the main storyline. Below are the chapters in which the character appears (both in full and cameo). Presented as a visual novel + animation;
                    </p>
                    <p>
                        <strong>Bond</strong> - a story that opens when the Affinity level increases. Presented as an animation;
                    </p>
                    <p>
                        <strong>World Underneath</strong> - a story that opens when you open Main Story. Presented as text.
                    </p>
                    <p>
                        <strong>Anecdotes</strong> - a story that opens when you receive multiple Character Memories or open Main Story. Presented as text.
                    </p>
                    <p>
                        <strong>Myths</strong> - a major plot that is presented in several chapters (usually 9). Specific Memories are required. Presented as a visual novel + animation;
                    </p>
                    <p>
                        <strong>Memoria</strong> - story/dates that can be obtained from 5-star Memories (and some 4-star Memories). Presented as a visual novel + animation;
                    </p>
                    <p>
                        <strong>Tender Moments</strong> - a story that can be obtained from 4-star Memories. Presented as an audiobook (MC is not voiced, subtitles must be read).
                    </p>
                    <p>
                        <strong>Secret Times</strong> - a story that can be obtained from 4-star Memories or reaching the required Affinity level. Presented as an audio track with only the male character voiced.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <>

            <nav className={styles.nav}>
                <Fragment>
                    <Link
                        className={styles.link}
                        to="/characters">
                        Characters
                    </Link>
                    <span> &gt; </span>
                    {currentCategory && (
                        <span>{currentCategory.title}</span>
                    )}
                </Fragment>
            </nav>

            <div className={styles.titleAndDisclaimer}>
                <AsideList
                    items={items}/>
            </div>

            <CharacterArticlePage />
        </>
    );
}

export default CharacterArticle;