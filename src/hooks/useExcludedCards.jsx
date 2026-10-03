import { useMemo } from "react";
import { getCardProtocores } from "@localstorage";
import { getImageUrl } from "./index.js";
import { memoriesData } from "@data";

export function useExcludedCards(data, setData, styles) {
    const cardsWithProtocores = useMemo(() => {
        return memoriesData
            .map((card) => ({
                card,
                protocores: getCardProtocores(card.id),
            }))
            .filter(({ protocores }) => protocores && protocores.length > 0);
    }, []);

    const exclusionOptions = useMemo(
        () =>
            cardsWithProtocores
                .map(({ card }) => ({
                    value: card.id,
                    label: card.name,
                    imageSmall: card.imageSmall,
                }))
                .sort((a, b) => a.label.localeCompare(b.label)),
        [cardsWithProtocores],
    );

    const handleExcludedCardsChange = (options) => {
        setData((prev) => ({ ...prev, excludedCards: options || [] }));
    };

    const formatCardOption = (option, { context }) => {
        const isValue = context === "value";
        return (
            <div className={styles.cardOption}>
                <img
                    src={getImageUrl(option.imageSmall)}
                    alt={option.label}
                    className={styles.cardOptionImage}
                    style={{ width: isValue ? 24 : 32, height: isValue ? 24 : 32 }}
                />
                {!isValue && (
                    <span className={styles.cardOptionLabel}>{option.label}</span>
                )}
            </div>
        );
    };

    return {
        exclusionOptions,
        handleExcludedCardsChange,
        formatCardOption,
    };
}