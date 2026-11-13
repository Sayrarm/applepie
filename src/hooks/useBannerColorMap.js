import {getFixedBannerColor, getHashedColor} from "@components";

export const getBannerColorMap = (banners) => {
    const result = new Map();

    // Сортируем по началу, чтобы конфликты решались последовательно
    const sorted = [...banners].sort((a, b) => {
        const aStart = new Date(a.startDate).getTime() || 0;
        const bStart = new Date(b.startDate).getTime() || 0;
        return aStart - bStart;
    });

    // Уже занятые цвета по «интервалам» — для проверки пересечений
    const colored = []; // { start, end, color }

    sorted.forEach((banner) => {
        const fixed = getFixedBannerColor(banner);
        if (fixed) {
            result.set(banner.id, fixed);
            colored.push({
                start: new Date(banner.startDate).getTime() || 0,
                end: banner.endDate === "permanently"
                    ? Infinity
                    : (new Date(banner.endDate).getTime() || Infinity),
                color: fixed,
            });
            return;
        }

        const start = new Date(banner.startDate).getTime() || 0;
        const end = banner.endDate === "permanently"
            ? Infinity
            : (new Date(banner.endDate).getTime() || Infinity);

        // Какие цвета уже заняты в этом интервале?
        const takenColors = new Set(
            colored
                .filter((c) => c.start <= end && c.end >= start)   // пересечение
                .map((c) => c.color)
        );

        // Подбираем цвет: пробуем seed, seed+1, seed+2...
        let attempt = 0;
        let color = getHashedColor(banner.id, attempt);
        while (takenColors.has(color) && attempt < 50) {
            attempt++;
            color = getHashedColor(banner.id, attempt);
        }

        result.set(banner.id, color);
        colored.push({ start, end, color });
    });

    return result;
};