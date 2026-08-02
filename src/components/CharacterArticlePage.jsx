import styles from './CharacterArticlePage.module.css';
import {Link, useParams} from 'react-router-dom';
import {charactersData} from '../data/characters-data.js';
import {storyCardInfo} from '../data/story-card-info.js';
import {memoriesData} from '../data/memories-data.js';
import {wuCategories} from '../data/wu-categories.js';
import {anCategories} from '../data/an-categories.js';
import {msData} from '../data/ms-data.js';
import {getImageUrl} from './imageUtils.js';
import CardList from './CardList.jsx';

function CharacterArticlePage() {
    const {articleLink} = useParams();

    // Находим данные персонажа
    const character = charactersData.find(char => char.link === articleLink);

    if (!character) {
        return <div className={styles.notFound}>Character not found</div>;
    }

    // Функция для получения карточек персонажа по истории с сортировкой по дате release
    const getCharacterCardsForStory = (storyName) => {
        const story = storyCardInfo.find(s => s.story === storyName);
        if (!story) return [];

        // Получаем ID карточек из story, фильтруем по персонажу
        const characterCardIds = story.memories
            .filter(memoryId => {
                const memory = memoriesData.find(m => String(m.id) === String(memoryId));
                return memory && memory.char === character.char;
            });

        // Получаем полные данные карточек и сортируем по дате release (от старых к новым)
        return memoriesData
            .filter(m => characterCardIds.includes(m.id) && m.char === character.char)
            .sort((a, b) => {
                // Если у одной из карточек нет даты release, она идет в конец
                if (!a.release) return 1;
                if (!b.release) return -1;
                return new Date(a.release) - new Date(b.release);
            });
    };

    // Получаем карточки для каждой истории
    const mythsCards = getCharacterCardsForStory('Myths');
    const memoriaCards = getCharacterCardsForStory('Memoria');
    const secretTimesCards = getCharacterCardsForStory('Secret Times');
    const tenderMomentsCards = getCharacterCardsForStory('Tender Moments');

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

    // Функция для поиска ссылки по тайтлу и серийному номеру
    const getMsLink = (title, serialNumber) => {
        const msEntry = msData.find(item =>
            item.link.toLowerCase().replace(/-/g, ' ') === title.toLowerCase() &&
            item.serialNumber === serialNumber
        );
        // Проверяем, что ссылка существует и начинается с http
        const link = msEntry?.content;
        if (link && (link.startsWith('http://') || link.startsWith('https://'))) {
            return link;
        }
        return null;
    };

    // Функция для рендера Main Story
    const renderMainStory = (mainStoryArray) => {
        if (!mainStoryArray || mainStoryArray.length === 0) {
            return <div className={styles.noData}>No data available</div>;
        }

        // Группируем по тайтлу
        const grouped = {};
        mainStoryArray.forEach(item => {
            if (!grouped[item.title]) {
                grouped[item.title] = [];
            }
            grouped[item.title].push(item);
        });

        return (
            <div className={styles.mainStoryList}>
                {Object.keys(grouped).map((title, index) => (
                    <div key={index} className={styles.mainStoryGroup}>
                        <h3 className={styles.mainStoryTitle}>{title}</h3>
                        {grouped[title].map((item, idx) => {
                            const link = getMsLink(item.title, item.serialNumber);
                            return (
                                <div key={idx} className={styles.mainStorytitlesContainer}>
                                    <span className={styles.serialNumber}>{item.serialNumber}.</span>
                                    {link ? (
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            {item.subtitle}
                                        </a>
                                    ) : (
                                        <span className={styles.noLink}>{item.subtitle}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
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

            <div className={styles.freeStory}>
                <img
                    src={getImageUrl(character.img)}
                    alt={character.char}
                    className={styles.characterImage}
                />

                <div className={styles.content}>

                    <h1 className={styles.characterName}>{character.char}</h1>

                    <div className={styles.commonContent}>

                        <div className={styles.content1}>
                            {/* Main Story */}
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Main Story</h2>
                                <div>
                                    {renderMainStory(character.mainStory)}
                                </div>
                            </div>
                        </div>

                        <div className={styles.content2}>
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
                        </div>
                    </div>


                </div>
            </div>

            {/* Myths */}
            {mythsCards.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionCardsTitle}>Myths</h2>
                    <div className={styles.sectionContent}>
                        <CardList cards={mythsCards} isSmall={true}/>
                    </div>
                </div>
            )}

            {/* Memoria */}
            {memoriaCards.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionCardsTitle}>Memoria</h2>
                    <div className={styles.sectionContent}>
                        <CardList cards={memoriaCards} isSmall={true}/>
                    </div>
                </div>
            )}

            {/* Tender Moments */}
            {tenderMomentsCards.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionCardsTitle}>Tender Moments</h2>
                    <div className={styles.sectionContent}>
                        <CardList cards={tenderMomentsCards} isSmall={true}/>
                    </div>
                </div>
            )}

            {/* Secret Times */}
            {secretTimesCards.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionCardsTitle}>Secret Times</h2>
                    <div className={styles.sectionContent}>
                        <CardList cards={secretTimesCards} isSmall={true}/>
                    </div>
                </div>
            )}

            {mythsCards.length === 0 && memoriaCards.length === 0 &&
                secretTimesCards.length === 0 && tenderMomentsCards.length === 0 && (
                    <div className={styles.noData}>No lore stories available</div>
                )}

        </div>
    );
}

export default CharacterArticlePage;