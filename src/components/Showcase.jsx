import styles from "./Showcase.module.css";
import {useState, useRef} from "react";
import ModalWindow from "./ModalWindow.jsx";
import Card from "./Card.jsx";
import {getImageUrl} from "./imageUtils.js";
import {getCardLevel, getCardRank, getCardAscend, getCardProtocores} from "../data/cardUtils.js";
import {calculateFinalStats} from "../data/protocoreUtils.js";
import {getStatsWithRank} from "../data/levelCardData.js";
import ProtocoreBlock from "./ProtocoreBlock.jsx";
import {compData} from "../data/comp-data.js";
import {memoriesData} from '../data/memories-data.js';
import {enhanceMemoriesWithAvailability} from "../data/cardAvailability.js";

function Showcase() {
    const [selectedCompanion, setSelectedCompanion] = useState(null);
    const [solarCards, setSolarCards] = useState([null, null]);
    const [lunarCards, setLunarCards] = useState([null, null, null, null]);

    const companionModalRef = useRef();
    const cardModalRef = useRef();
    const [modalPlacement, setModalPlacement] = useState(null);
    const [modalIndex, setModalIndex] = useState(null);

    const showCompanionModal = () => {
        companionModalRef.current?.showModal();
    };

    const showCardModal = (placement, index) => {
        setModalPlacement(placement);
        setModalIndex(index);
        cardModalRef.current?.showModal();
    };

    const handleSelectCompanion = (companion) => {
        setSelectedCompanion(companion);
        companionModalRef.current?.closeModal();
    };

    const handleSelectCard = (card) => {
        if (modalPlacement === 'solar') {
            const newSolar = [...solarCards];
            newSolar[modalIndex] = card;
            setSolarCards(newSolar);
        } else if (modalPlacement === 'lunar') {
            const newLunar = [...lunarCards];
            newLunar[modalIndex] = card;
            setLunarCards(newLunar);
        }
        cardModalRef.current?.closeModal();
    };

    // Функция для получения данных карточки
    const getCardData = (card) => {
        if (!card) return null;
        const level = getCardLevel(card.id);
        const rank = getCardRank(card.id);
        const isAscended = getCardAscend(card.id);
        const protocores = getCardProtocores(card.id);
        const baseStats = getStatsWithRank(card, level, rank, isAscended);
        const stats = baseStats ? calculateFinalStats(card, baseStats, protocores) : null;
        return {level, rank, isAscended, protocores, stats};
    };

    // Функция для отображения слота карточки с протокорами
    const renderCardSlot = (card, placement, index) => {
        const cardData = card ? getCardData(card) : null;

        return (
            <div
                className={`${styles.cardSlot} ${!card ? styles.emptySlot : ''}`}
                onClick={() => showCardModal(placement, index)}
            >
                {card ? (
                    <>
                        <div>
                            {/* Информация о карточке — уровень и ранг */}
                            <div className={styles.cardInfo}>
                                <span className={styles.cardLevel}>Lv.{cardData?.level || 1} </span>
                                <span className={styles.cardRank}>Rank {cardData?.rank || 0} </span>
                            </div>

                            <div className={styles.cardWrapper}>
                                <Card data={card} isSmall={false}/>
                            </div>
                        </div>

                        <div className={styles.protocoresContainer}>
                            {cardData?.protocores && cardData.protocores.length > 0 ? (
                                cardData.protocores.map(protocore => (
                                    <div key={protocore.id} className={styles.protocoreWrapper}>
                                        <ProtocoreBlock
                                            protocore={protocore}
                                            hideChange={true}
                                            hideDelete={true}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noProtocores}>No protocores</div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={styles.emptySlotContent}>
                        <span>+</span>
                        <span className={styles.emptyLabel}>Add {placement} card</span>
                    </div>
                )}
            </div>
        );
    };

    // Доступные карточки для выбора
    const getAvailableCards = (placement) => {
        return enhanceMemoriesWithAvailability(memoriesData)
            .filter(card => card.isAvailable === true && card.placementName === placement);
    };

    return (
        <section className={styles.container}>
            {/* Левая часть — компаньон */}
            <div className={styles.companionSection}>
                <button className={styles.addCompanionBtn} onClick={showCompanionModal}>
                    {selectedCompanion ? (
                        <>
                            <img
                                className={styles.companionImage}
                                src={getImageUrl(selectedCompanion.img || selectedCompanion.imgWeapon)}
                                alt={selectedCompanion.companionName || selectedCompanion.weaponName}
                            />
                            <div className={styles.companionName}>
                                {selectedCompanion.companionName || selectedCompanion.weaponName}
                            </div>
                        </>
                    ) : (
                        <span className={styles.addCompanionText}>+ Add Companion</span>
                    )}
                </button>
            </div>

            {/* Правая часть — карточки */}
            <div className={styles.cardsSection}>
                {/* Solar карточки */}
                <div className={styles.solarRow}>
                    <div className={styles.rowLabel}>SOLAR</div>
                    <div className={styles.solarCardsRow}>
                        {solarCards.map((card, index) => (
                            <div key={`solar-${index}`} className={styles.cardWrapperSlot}>
                                {renderCardSlot(card, 'solar', index)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lunar карточки */}
                <div className={styles.lunarRow}>
                    <div className={styles.rowLabel}>LUNAR</div>
                    <div className={styles.lunarCardsRow}>
                        {lunarCards.map((card, index) => (
                            <div key={`lunar-${index}`} className={styles.cardWrapperSlot}>
                                {renderCardSlot(card, 'lunar', index)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Модалка выбора компаньона */}
            <ModalWindow
                ref={companionModalRef}
                title="Select Companion"
                width={600}
                tag={
                    <div className={styles.companionGrid}>
                        {compData.map(companion => (
                            <button
                                key={companion.id}
                                className={styles.companionItem}
                                onClick={() => handleSelectCompanion(companion)}
                            >
                                <img
                                    className={styles.companionImg}
                                    src={getImageUrl(companion.img || companion.imgWeapon)}
                                    alt={companion.companionName || companion.weaponName}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className={styles.companionTitle}>
                                    {companion.companionName || companion.weaponName}
                                </div>
                            </button>
                        ))}
                    </div>
                }
            />

            {/* Модалка выбора карточки */}
            <ModalWindow
                ref={cardModalRef}
                title={`Select ${modalPlacement?.toUpperCase()} Card`}
                width={600}
                tag={
                    <div className={styles.cardGrid}>
                        {getAvailableCards(modalPlacement).map(card => (
                            <button
                                key={card.id}
                                className={styles.cardItem}
                                onClick={() => handleSelectCard(card)}
                            >
                                <Card data={card} isSmall={true}/>
                            </button>
                        ))}
                        {getAvailableCards(modalPlacement).length === 0 && (
                            <div className={styles.emptyCards}>
                                No available {modalPlacement} cards
                            </div>
                        )}
                    </div>
                }
            />
        </section>
    );
}

export default Showcase;