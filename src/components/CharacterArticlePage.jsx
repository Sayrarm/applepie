import styles from './CharacterArticlePage.module.css';
import {useParams, Link} from 'react-router-dom';
import {charactersData} from '../data/characters-data.js';
import {storyCardInfo} from '../data/story-card-info.js';
import {memoriesData} from '../data/memories-data.js';
import {wuCategories} from '../data/wu-categories.js';
import {anCategories} from '../data/an-categories.js';
import {getImageUrl} from './imageUtils.js';

function CharacterArticlePage() {
    const {articleLink} = useParams();

    // Находим данные персонажа
    const character = charactersData.find(char => char.link === articleLink);

    if (!character) {
        return <div className={styles.notFound}>Character not found</div>;
    }

    // Находим все истории, в которых есть карточки этого персонажа
    const characterStories = storyCardInfo.filter(story => {
        return story.memories.some(memoryId => {
            const memory = memoriesData.find(m => String(m.id) === String(memoryId));
            return memory && memory.char === character.char;
        });
    });

    // Функция для поиска ссылки по названию World Underneath
    const getWuLink = (title) => {
        const category = wuCategories.find(cat =>
            cat.title.toLowerCase() === title.toLowerCase()
        );
        return category ? `/world-underneath/${category.link}` : null;
    };

    // Функция для поиска ссылки по названию Anecdote
    const getAnLink = (title) => {
        const category = anCategories.find(cat =>
            cat.title.toLowerCase() === title.toLowerCase()
        );
        return category ? `/anecdotes/${category.link}` : null;
    };

    // Функция для рендера ссылки с заголовком и картинкой
    const renderLinkWithTitle = (linkObj) => {
        if (!linkObj || !linkObj.link || linkObj.link === '' || linkObj.link === 'ссылка') {
            return <div className={styles.noData}>No data available</div>;
        }
        return (
            <a
                href={linkObj.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
                {linkObj.title || linkObj.link}
            </a>
        );
    };

    // Функция для рендера Bond с картинкой
    const renderBondItem = (bond) => {
        if (!bond || !bond.link || bond.link === '' || bond.link === 'ссылка') {
            return <div className={styles.noData}>No data available</div>;
        }
        return (
            <a
                href={bond.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bondLink}
            >
                <img
                    src={getImageUrl(bond.image)}
                    alt={bond.title}
                    className={styles.bondImage}
                />
                <div className={styles.bondTitle}>{bond.title}</div>
            </a>
        );
    };

    // Функция для рендера списка World Underneath с ссылками
    const renderWuList = (items) => {
        if (!items || items.length === 0) {
            return <div className={styles.noData}>No data available</div>;
        }
        return (
            <ul className={styles.list}>
                {items.map((item, index) => {
                    const link = getWuLink(item);
                    return (
                        <li key={index} className={styles.listItem}>
                            {link ? (
                                <Link to={link} className={styles.linkInternal}>
                                    {item}
                                </Link>
                            ) : (
                                <div className={styles.noLink}>{item}</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    // Функция для рендера списка Anecdotes с ссылками
    const renderAnList = (items) => {
        if (!items || items.length === 0) {
            return <div className={styles.noData}>No data available</div>;
        }
        return (
            <ul className={styles.list}>
                {items.map((item, index) => {
                    const link = getAnLink(item);
                    return (
                        <li key={index} className={styles.listItem}>
                            {link ? (
                                <Link to={link} className={styles.linkInternal}>
                                    {item}
                                </Link>
                            ) : (
                                <div className={styles.noLink}>{item}</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    // Собираем все Bond в массив для удобного отображения
    const bonds = [];
    if (character.bond_1) bonds.push(character.bond_1);
    if (character.bond_2) bonds.push(character.bond_2);

    return (
        <div className={styles.container}>

            <img
                src={getImageUrl(character.img)}
                alt={character.char}
                className={styles.characterImage}
            />

            <div className={styles.content}>
                <h1 className={styles.characterName}>{character.char}</h1>

                {/* Main Story */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Main Story</h2>
                    <div className={styles.sectionContent}>
                        {renderLinkWithTitle(
                            {link: character.mainStory, title: 'Watch on YouTube'}
                        )}
                    </div>
                </div>

                {/* Bond */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Bond</h2>

                    {bonds.length > 0 ? (
                        <div className={styles.bondList}>
                            {bonds.map((bond, index) => (
                                <div key={index} className={styles.bondItem}>
                                    {renderBondItem(bond)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noData}>No data available</div>
                    )}
                </div>

                <div className={styles.storyContainer}>
                    {/* World Underneath */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>World Underneath</h2>
                        <div className={styles.sectionContent}>
                            {renderWuList(character.wu)}
                        </div>
                    </div>

                    {/* Anecdotes */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Anecdotes</h2>
                        <div className={styles.sectionContent}>
                            {renderAnList(character.anecdotes)}
                        </div>
                    </div>
                </div>

                {/* Related Lore Stories */}
                {characterStories.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Related Lore Stories</h2>
                        <div className={styles.sectionContent}>
                            <ul className={styles.list}>
                                {characterStories.map((story, index) => (
                                    <li key={index} className={styles.listItem}>{story.story}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CharacterArticlePage;