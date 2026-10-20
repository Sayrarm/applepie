import { useMemo, useState } from "react";
import styles from "./BannersCalendar.module.css";
import {
    getBannerColor,
    getBannerCharacters,
    getBannerTypeLabel,
} from "./bannerColors.js";

// --- Утилиты дат ---
const startOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

// "permanently" — считаем как очень далёкую дату
const parseDate = (value) => {
    if (!value || value === "permanently") return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
};

// Получить диапазон месяца (все дни)
const getMonthDays = (year, month) => {
    const days = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(startOfDay(new Date(year, month, day)));
    }
    return days;
};

// Пересечение диапазона баннера с диапазоном месяца
// Возвращает { startIndex, endIndex } — индексы колонок в сетке месяца
const getBannerRange = (banner, monthDays) => {
    const bannerStart = parseDate(banner.startDate);
    const bannerEnd = parseDate(banner.endDate);

    if (!bannerStart) return null;

    const monthFirst = monthDays[0];
    const monthLast = monthDays[monthDays.length - 1];

    // Баннер закончился до начала месяца
    if (bannerEnd && bannerEnd < monthFirst) return null;
    // Баннер начался после конца месяца
    if (bannerStart > monthLast) return null;

    // Вычисляем индекс старта
    let startIndex = 0;
    if (bannerStart > monthFirst) {
        startIndex = monthDays.findIndex((d) => d >= startOfDay(bannerStart));
        if (startIndex < 0) startIndex = 0;
    }

    // Вычисляем индекс конца
    let endIndex = monthDays.length - 1;
    if (bannerEnd && bannerEnd < monthLast) {
        endIndex = monthDays.findIndex((d) => d > startOfDay(bannerEnd)) - 1;
        if (endIndex < 0) endIndex = monthDays.length - 1;
    }

    return { startIndex, endIndex };
};

function BannersCalendar({ banners, initialDate = new Date() }) {
    const [currentDate, setCurrentDate] = useState(startOfDay(initialDate));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthDays = useMemo(
        () => getMonthDays(year, month),
        [year, month],
    );

    // Считаем видимые баннеры и их позиции
    const bannerRows = useMemo(() => {
        const rows = [];

        banners.forEach((banner) => {
            const range = getBannerRange(banner, monthDays);
            if (!range) return;

            rows.push({
                banner,
                startIndex: range.startIndex,
                endIndex: range.endIndex,
                color: getBannerColor(banner),
                typeLabel: getBannerTypeLabel(banner),
            });
        });

        return rows;
    }, [banners, monthDays]);

    const goPrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const monthName = currentDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button onClick={goPrevMonth} className={styles.navBtn}>
                    ←
                </button>
                <h2 className={styles.title}>{monthName}</h2>
                <button onClick={goNextMonth} className={styles.navBtn}>
                    →
                </button>
            </div>

            {/* Дни месяца */}
            <div
                className={styles.daysHeader}
                style={{ gridTemplateColumns: `repeat(${monthDays.length}, 1fr)` }}
            >
                {monthDays.map((day) => (
                    <div key={day.getTime()} className={styles.dayCell}>
                        {day.getDate()}
                    </div>
                ))}
            </div>

            {/* Полосы баннеров */}
            <div className={styles.rows}>
                {bannerRows.length === 0 && (
                    <div className={styles.empty}>No banners this month</div>
                )}

                {bannerRows.map(({ banner, startIndex, endIndex, color, typeLabel }) => {
                    const span = endIndex - startIndex + 1;
                    const chars = getBannerCharacters(banner);
                    const tooltip = `${banner.name} — ${typeLabel}${
                        chars.length > 0 ? ` (${chars.join(", ")})` : ""
                    }`;

                    return (
                        <div
                            key={banner.id}
                            className={styles.row}
                            style={{ gridTemplateColumns: `repeat(${monthDays.length}, 1fr)` }}
                        >
                            <div
                                className={styles.bannerBar}
                                style={{
                                    gridColumn: `${startIndex + 1} / span ${span}`,
                                    backgroundColor: color,
                                }}
                                title={tooltip}
                            >
                                <span className={styles.bannerBarText}>{banner.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BannersCalendar;