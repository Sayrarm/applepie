import { useMemo } from "react";
import {
    compDataShowcaseSpecific,
    compDataShowcaseDefault5star,
    compDataShowcaseDefault4star,
    solar4Stars,
} from "@data";
import { getCardRank } from "@localstorage";

/**
 * Хук, инкапсулирующий всю логику, связанную с парой solar-карточек:
 * - ID solar-карточек
 * - минимальный ранг (для Duo Rank)
 * - найденный компаньон по cardIds
 * - 5-star / 4-star / любая пара
 * - defaultBuffs для отображения и расчётов
 * - teamDmgBonus
 */
export const useSolarPair = (solarCards) => {
    // ID solar-карточек (отсортированные)
    const solarCardIds = useMemo(() => {
        return solarCards
            .filter((card) => card !== null)
            .map((card) => card.id)
            .sort((a, b) => a - b);
    }, [solarCards]);

    // Минимальный ранг среди solar-карточек
    const solarRank = useMemo(() => {
        const nonNullCards = solarCards.filter((card) => card !== null);
        if (nonNullCards.length < 2) return 0;
        const ranks = nonNullCards.map((card) => getCardRank(card.id) || 0);
        return Math.min(...ranks);
    }, [solarCards]);

    // Компаньон с совпадающими cardIds (если есть)
    const matchingCompanion = useMemo(() => {
        if (solarCardIds.length < 2) return null;

        return (
            compDataShowcaseSpecific.find((item) => {
                if (!item.cardIds || item.cardIds.length === 0) return false;
                const sortedItemIds = [...item.cardIds].sort((a, b) => a - b);
                return (
                    sortedItemIds.length === solarCardIds.length &&
                    sortedItemIds.every((id, index) => id === solarCardIds[index])
                );
            }) || null
        );
    }, [solarCardIds]);

    // 5-star пара
    const hasSolarPair5Star = useMemo(
        () => matchingCompanion !== null,
        [matchingCompanion],
    );

    // 4-star пара
    const hasSolarPair4Star = useMemo(() => {
        if (solarCardIds.length < 2) return false;

        return solar4Stars.some((pair) => {
            const sortedPairIds = [...pair.cardIds].sort((a, b) => a - b);
            return (
                sortedPairIds.length === solarCardIds.length &&
                sortedPairIds.every((id, index) => id === solarCardIds[index])
            );
        });
    }, [solarCardIds]);

    // Есть ли вообще какая-либо пара
    const hasAnySolarPair = hasSolarPair5Star || hasSolarPair4Star;

    // Default Buffs: 5-star → 4-star → null
    const defaultBuffs = hasSolarPair5Star
        ? compDataShowcaseDefault5star
        : hasSolarPair4Star
            ? compDataShowcaseDefault4star
            : null;

    // Бонус к team DMG
    const teamDmgBonus = useMemo(() => {
        if (!hasAnySolarPair || !defaultBuffs) return 0;

        let bonus = 0;

        // eidolon0 — всегда активен (Starring Effect)
        bonus += defaultBuffs.buffEidolon0Stats?.teamDMG || 0;

        // eidolon3 — активен только если solarRank >= 3
        if (solarRank >= 3) {
            bonus += defaultBuffs.buffEidolon3Stats?.teamDMG || 0;
        }

        return bonus;
    }, [hasAnySolarPair, defaultBuffs, solarRank]);

    return {
        solarCardIds,
        solarRank,
        matchingCompanion,
        hasSolarPair5Star,
        hasSolarPair4Star,
        hasAnySolarPair,
        defaultBuffs,
        teamDmgBonus,
    };
};