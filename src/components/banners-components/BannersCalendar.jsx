import { useMemo, useRef, useState } from "react";
import styles from "./BannersCalendar.module.css";
import {
    getBannerColor,
    getBannerCharacters,
    getBannerTypeLabel,
} from "./bannerColors.js";
import { getImageUrl } from "@hooks";
import {memoriesData} from "@data";
import {
    CardList,
    ModalWindow,
    BannerPeriod
} from "@components";

// --- Утилиты дат ---
const startOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const parseDate = (value) => {
    if (!value || value === "permanently") return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
};

const getMonthDays = (year, month) => {
    const days = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(startOfDay(new Date(year, month, day)));
    }
    return days;
};

const getBannerRange = (banner, monthDays) => {
    const bannerStart = parseDate(banner.startDate);
    const bannerEnd = parseDate(banner.endDate);
    if (!bannerStart) return null;

    const monthFirst = monthDays[0];
    const monthLast = monthDays[monthDays.length - 1];

    if (bannerEnd && bannerEnd < monthFirst) return null;
    if (bannerStart > monthLast) return null;

    let startIndex = 0;
    if (bannerStart > monthFirst) {
        startIndex = monthDays.findIndex((d) => d >= startOfDay(bannerStart));
        if (startIndex < 0) startIndex = 0;
    }

    let endIndex = monthDays.length - 1;
    if (bannerEnd && bannerEnd < monthLast) {
        endIndex = monthDays.findIndex((d) => d > startOfDay(bannerEnd)) - 1;
        if (endIndex < 0) endIndex = monthDays.length - 1;
    }

    return { startIndex, endIndex };
};

// Нарезает диапазон баннера на сегменты по 7 дней (для календарной сетки)
const getBannerSegments = (startIndex, endIndex, firstDayOfWeek) => {
    const segments = [];
    const startCell = startIndex + firstDayOfWeek;
    const endCell = endIndex + firstDayOfWeek;

    let currentStart = startCell;
    while (currentStart <= endCell) {
        const currentRow = Math.floor(currentStart / 7);
        const rowEndCell = (currentRow + 1) * 7 - 1;
        const segmentEnd = Math.min(endCell, rowEndCell);

        segments.push({
            startCol: (currentStart % 7) + 1, // CSS Grid колонки начинаются с 1
            span: segmentEnd - currentStart + 1,
            row: currentRow, // Индекс строки (0, 1, 2...)
        });

        currentStart = segmentEnd + 1;
    }
    return segments;
};

// Строит сегменты баннеров и распределяет их по локальным рядам (lane) для каждой недели
const buildBannerSegments = (banners, monthDays, firstDayOfWeek) => {
    const allSegments = [];

    // 1. Собираем все сегменты
    banners.forEach((banner) => {
        const range = getBannerRange(banner, monthDays);
        if (!range) return;

        const segments = getBannerSegments(range.startIndex, range.endIndex, firstDayOfWeek);
        segments.forEach(seg => {
            allSegments.push({
                banner,
                color: getBannerColor(banner),
                typeLabel: getBannerTypeLabel(banner),
                imageUrl: getImageUrl(banner.image),
                startCol: seg.startCol,
                span: seg.span,
                row: seg.row, // Это номер недели (строки календаря)
                realStartTime: parseDate(banner.startDate)?.getTime() ?? 0,
                realEndTime: parseDate(banner.endDate)?.getTime() ?? Infinity,
            });
        });
    });

    // 2. Сортируем сегменты по неделям, затем по реальной дате начала
    allSegments.sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        if (a.realStartTime !== b.realStartTime) return a.realStartTime - b.realStartTime;
        return a.realEndTime - b.realEndTime;
    });

    // 3. Распределяем ЛОКАЛЬНЫЕ lane для каждой недели
    const weekLanes = [];
    const result = [];

    allSegments.forEach((seg) => {
        if (!weekLanes[seg.row]) weekLanes[seg.row] = [];

        const segEnd = seg.startCol + seg.span - 1;
        let laneIndex = 0;

        while (true) {
            if (!weekLanes[seg.row][laneIndex]) weekLanes[seg.row][laneIndex] = [];

            const hasConflict = weekLanes[seg.row][laneIndex].some(
                ([s, e]) => seg.startCol <= e && segEnd >= s
            );

            if (!hasConflict) {
                weekLanes[seg.row][laneIndex].push([seg.startCol, segEnd]);
                break;
            }
            laneIndex++;
        }

        result.push({ ...seg, lane: laneIndex });
    });

    return result;
};

// Специальные диапазоны дат (без года — повторяются каждый год)
const SPECIAL_RANGES = [
    {
        start: { month: 2, day: 1 },   // 1 марта
        end: { month: 2, day: 8 },     // 8 марта
        color: "rafayel",
    },
    {
        start: { month: 3, day: 13 },  // 13 апреля
        end: { month: 3, day: 20 },    // 20 апреля
        color: "sylus",
        skipYears: [2024],
    },
    {
        start: { month: 5, day: 8 },   // 8 июня
        end: { month: 5, day: 15 },    // 15 июня
        color: "caleb",
        skipYears: [2024],
    },
    {
        start: { month: 8, day: 1 },   // 1 сентября
        end: { month: 8, day: 7 },     // 7 сентября
        color: "zayne",
    },
    {
        start: { month: 9, day: 11 },  // 11 октября
        end: { month: 9, day: 18 },    // 18 октября
        color: "xavier",
    },
];

const getSpecialDayClass = (day) => {
    const month = day.getMonth();
    const date = day.getDate();
    const year = day.getFullYear();

    for (const range of SPECIAL_RANGES) {
        if (range.skipYears && range.skipYears.includes(year)) continue;

        const { start, end } = range;
        if (month < start.month || month > end.month) continue;

        if (start.month === end.month) {
            if (month === start.month && date >= start.day && date <= end.day) {
                return `specialDay${range.color.charAt(0).toUpperCase() + range.color.slice(1)}`;
            }
            continue;
        }

        if (
            (month === start.month && date >= start.day) ||
            (month === end.month && date <= end.day)
        ) {
            return `specialDay${range.color.charAt(0).toUpperCase() + range.color.slice(1)}`;
        }
    }

    return "";
};

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// ===== Мини-месяц для режима "год" =====
function MiniMonth({ year, month, banners, onClick }) {
    const monthDays = useMemo(() => getMonthDays(year, month), [year, month]);

    const firstDayOfWeek = (monthDays[0].getDay() + 6) % 7;

    const bannerRows = useMemo(
        () => buildBannerSegments(banners, monthDays, firstDayOfWeek),
        [banners, monthDays, firstDayOfWeek],
    );

    const monthName = new Date(year, month, 1).toLocaleString("ru-RU", {
        month: "long",
    });

    const totalCells = Math.ceil((firstDayOfWeek + monthDays.length) / 7) * 7;
    const totalWeeks = totalCells / 7;

    return (
        <div
            className={styles.miniMonth}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick();
            }}
            title={`Открыть ${monthName} ${year}`}
        >
            <div className={styles.miniMonthTitle}>{monthName}</div>

            {/* Шапка с днями недели */}
            <div className={styles.miniWeekHeader}>
                {WEEK_DAYS.map((d) => (
                    <div key={d} className={styles.miniWeekDayName}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Сетка чисел и баннеров */}
            <div className={styles.miniGridWrapper}>
                <div
                    className={styles.miniGrid}
                    style={{ gridTemplateRows: `repeat(${totalWeeks}, 1fr)` }}
                >
                    {Array.from({ length: totalCells }).map((_, i) => {
                        const dayIndex = i - firstDayOfWeek;
                        const day = monthDays[dayIndex];
                        const isCurrentMonth = dayIndex >= 0 && dayIndex < monthDays.length;

                        const specialClass = isCurrentMonth ? getSpecialDayClass(day) : "";

                        return (
                            <div
                                key={i}
                                className={[
                                    styles.miniDay,
                                    !isCurrentMonth ? styles.miniDayOutside : "",
                                    specialClass ? styles[specialClass] : "",
                                ].filter(Boolean).join(" ")}
                            >
                                {isCurrentMonth ? day.getDate() : ""}
                            </div>
                        );
                    })}
                </div>

                {/* Слой с полосами баннеров */}
                <div
                    className={styles.miniBannersLayer}
                    style={{ gridTemplateRows: `repeat(${totalWeeks}, 1fr)` }}
                >
                    {bannerRows.map((seg, idx) => {
                        const { banner, color, startCol, span, row, lane } = seg;
                        return (
                            <div
                                key={`${banner.id}-${row}-${idx}`}
                                className={styles.miniBannerBar}
                                style={{
                                    gridColumn: `${startCol} / span ${span}`,
                                    gridRow: row + 1,
                                    "--bar-color": color,
                                    marginTop: `${2 + (lane || 0) * 5}px`,
                                }}
                                title={banner.name}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ===== Основной компонент =====
function BannersCalendar({ banners, initialDate = new Date() }) {
    // Фильтруем перманентные баннеры (без даты окончания)
    const calendarBanners = useMemo(() => {
        return banners.filter(b => b.endDate !== "permanently");
    }, [banners]);

    const [selectedYear, setSelectedYear] = useState(
        () => initialDate.getFullYear(),
    );
    const [viewMode, setViewMode] = useState("year"); // "year" | "month"
    const [selectedMonth, setSelectedMonth] = useState(
        () => initialDate.getMonth(),
    );

    // Состояние для модалки
    const [selectedBanner, setSelectedBanner] = useState(null);
    const memoriesModalRef = useRef();

    const showMemoriesModal = (banner) => {
        setSelectedBanner(banner);
        memoriesModalRef.current.showModal();
    };

    const cards = memoriesData.filter((card) =>
        selectedBanner?.cardIds?.includes(card.id),
    );

    // ===== Режим "месяц" =====
    const monthDays = useMemo(
        () => getMonthDays(selectedYear, selectedMonth),
        [selectedYear, selectedMonth],
    );

    const firstDayOfWeek = (monthDays[0].getDay() + 6) % 7;

    const bannerRows = useMemo(
        () => buildBannerSegments(calendarBanners, monthDays, firstDayOfWeek),
        [calendarBanners, monthDays, firstDayOfWeek]
    );

    const goPrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(11);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const goNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedYear(selectedYear + 1);
            setSelectedMonth(0);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const goPrevYear = () => setSelectedYear(selectedYear - 1);
    const goNextYear = () => setSelectedYear(selectedYear + 1);

    const openMonth = (monthIdx) => {
        setSelectedMonth(monthIdx);
        setViewMode("month");
    };

    const backToYear = () => {
        setViewMode("year");
    };

    // ===== РЕНДЕР: режим "год" =====
    if (viewMode === "year") {
        return (
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <button onClick={goPrevYear} className={styles.navBtn}>
                        ←
                    </button>
                    <h2 className={styles.title}>{selectedYear}</h2>
                    <button onClick={goNextYear} className={styles.navBtn}>
                        →
                    </button>
                </div>

                <div className={styles.yearGrid}>
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <MiniMonth
                            key={idx}
                            year={selectedYear}
                            month={idx}
                            banners={calendarBanners}
                            onClick={() => openMonth(idx)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // ===== РЕНДЕР: режим "месяц" =====
    const monthName = new Date(selectedYear, selectedMonth, 1).toLocaleString(
        "ru-RU",
        { month: "long", year: "numeric" },
    );

    const totalCells = Math.ceil((firstDayOfWeek + monthDays.length) / 7) * 7;
    const totalWeeks = totalCells / 7;
    const todayTime = startOfDay(new Date()).getTime();

    // Вычисляем максимальный lane для каждой недели, чтобы правильно задать высоту строки
    const weekMaxLanes = Array(totalWeeks).fill(0);
    bannerRows.forEach(seg => {
        if (seg.lane !== undefined) {
            weekMaxLanes[seg.row] = Math.max(weekMaxLanes[seg.row], seg.lane);
        }
    });

    // Высота ячейки: минимум 100px, плюс 32px на каждый дополнительный слой
    const gridTemplateRows = weekMaxLanes
        .map(maxLane => `minmax(${Math.max(100, 35 + maxLane * 32)}px, auto)`)
        .join(" ");

    return (
        <>
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <button onClick={goPrevMonth} className={styles.navBtn}>
                        ←
                    </button>
                    <h2
                        className={`${styles.title} ${styles.titleClickable}`}
                        onClick={backToYear}
                        title="Вернуться к году"
                    >
                        {monthName}
                    </h2>
                    <button onClick={goNextMonth} className={styles.navBtn}>
                        →
                    </button>
                </div>

                {/* Шапка дней недели */}
                <div className={styles.weekHeader}>
                    {WEEK_DAYS.map((d) => (
                        <div key={d} className={styles.weekDayName}>
                            {d}
                        </div>
                    ))}
                </div>

                {/* Сетка календаря */}
                <div className={styles.monthGridWrapper}>
                    <div
                        className={styles.monthGrid}
                        style={{ gridTemplateRows: gridTemplateRows }}
                    >
                        {Array.from({ length: totalCells }).map((_, i) => {
                            const dayIndex = i - firstDayOfWeek;
                            const day = monthDays[dayIndex];
                            const isCurrentMonth = dayIndex >= 0 && dayIndex < monthDays.length;
                            const isToday = isCurrentMonth && day.getTime() === todayTime;

                            const specialClass = isCurrentMonth ? getSpecialDayClass(day) : "";

                            return (
                                <div
                                    key={i}
                                    className={[
                                        styles.monthDay,
                                        !isCurrentMonth ? styles.monthDayOutside : "",
                                        specialClass ? styles[specialClass] : "",
                                        isToday ? styles.monthDayToday : "",
                                    ].filter(Boolean).join(" ")}
                                >
                                    {isCurrentMonth ? day.getDate() : ""}
                                </div>
                            );
                        })}
                    </div>

                    {/* Слой с полосами баннеров */}
                    <div
                        className={styles.monthBannersLayer}
                        style={{ gridTemplateRows: gridTemplateRows }}
                    >
                        {bannerRows.map((seg, idx) => {
                            const { banner, color, typeLabel, imageUrl, startCol, span, row, lane } = seg;
                            const chars = getBannerCharacters(banner);
                            const tooltip = `${banner.name} — ${typeLabel}${chars.length > 0 ? ` (${chars.join(", ")})` : ""}`;

                            return (
                                <div
                                    key={`${banner.id}-${row}-${idx}`}
                                    className={styles.bannerBar}
                                    style={{
                                        gridColumn: `${startCol} / span ${span}`,
                                        gridRow: row + 1,
                                        "--bar-color": color,
                                        marginTop: `${3 + (lane || 0) * 32}px`,
                                    }}
                                    title={tooltip}
                                    onClick={() => showMemoriesModal(banner)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            showMemoriesModal(banner);
                                        }
                                    }}
                                >
                                    {span > 1 && (
                                        <div className={styles.bannerBarText}>{banner.name}</div>
                                    )}
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt=""
                                            className={styles.bannerBarImage}
                                            loading="lazy"
                                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <ModalWindow
                ref={memoriesModalRef}
                title={selectedBanner?.name}
                tag={
                    <>
                        <CardList cards={cards} />
                        {selectedBanner && (
                            <BannerPeriod banners={[selectedBanner]} />
                        )}
                    </>
                }
            />
        </>
    );
}

export default BannersCalendar;