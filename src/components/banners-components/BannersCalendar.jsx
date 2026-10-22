import {useMemo, useRef, useState} from "react";
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

// Распределяет баннеры по рядам (lane), чтобы пересекающиеся по датам
// полосы не накладывались друг на друга, а шли одна под другой.
const assignLanes = (rows) => {
    const sorted = [...rows].sort((a, b) => a.startIndex - b.startIndex);

    // lanes[i] = массив занятых интервалов [start, end] в ряду i
    const lanes = [];

    return sorted.map((row) => {
        let laneIndex = 0;
        while (true) {
            if (!lanes[laneIndex]) lanes[laneIndex] = [];
            const hasConflict = lanes[laneIndex].some(
                ([s, e]) => row.startIndex <= e && row.endIndex >= s,
            );
            if (!hasConflict) {
                lanes[laneIndex].push([row.startIndex, row.endIndex]);
                break;
            }
            laneIndex++;
        }
        return { ...row, lane: laneIndex };
    });
};

const buildBannerRows = (banners, monthDays) => {
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
            imageUrl: getImageUrl(banner.image),
        });
    });
    return assignLanes(rows);
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

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Специальные диапазоны дат (без года — повторяются каждый год)
// month: 0-11 (как в JS), day: число месяца
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
    },
    {
        start: { month: 5, day: 8 },   // 8 июня
        end: { month: 5, day: 15 },    // 15 июня
        color: "caleb",
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

// Возвращает CSS-класс подсветки для конкретного дня (или "")
const getSpecialDayClass = (day) => {
    const month = day.getMonth();
    const date = day.getDate();

    for (const range of SPECIAL_RANGES) {
        const { start, end } = range;
        // Сравниваем по (month, day) — без года
        if (month < start.month || month > end.month) continue;

        // Если диапазон в пределах одного месяца
        if (start.month === end.month) {
            if (month === start.month && date >= start.day && date <= end.day) {
                return `specialDay${range.color.charAt(0).toUpperCase() + range.color.slice(1)}`;
            }
            continue;
        }

        // Диапазон переходит через границу месяцев (на всякий случай)
        if (
            (month === start.month && date >= start.day) ||
            (month === end.month && date <= end.day)
        ) {
            return `specialDay${range.color.charAt(0).toUpperCase() + range.color.slice(1)}`;
        }
    }

    return "";
};

// ===== Мини-месяц для режима "год" =====
function MiniMonth({ year, month, banners, onClick }) {
    const monthDays = useMemo(() => getMonthDays(year, month), [year, month]);
    const bannerRows = useMemo(
        () => buildBannerRows(banners, monthDays),
        [banners, monthDays],
    );

    const monthName = new Date(year, month, 1).toLocaleString("ru-RU", {
        month: "long",
    });

    const firstDayOfWeek = (monthDays[0].getDay() + 6) % 7;
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

                        return (
                            <div
                                key={i}
                                className={`${styles.miniDay} ${!isCurrentMonth ? styles.miniDayOutside : ""}`}
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
                    {bannerRows.map(({ banner, startIndex, endIndex, color, lane }) => {
                        const segments = getBannerSegments(startIndex, endIndex, firstDayOfWeek);

                        return (
                            <div key={banner.id} className={styles.miniSegmentsWrapper}>
                                {segments.map((seg, idx) => (
                                    <div
                                        key={`${banner.id}-${idx}`}
                                        className={styles.miniBannerBar}
                                        style={{
                                            gridColumn: `${seg.startCol} / span ${seg.span}`,
                                            gridRow: seg.row + 1,
                                            "--bar-color": color,
                                            marginTop: `${2 + (lane || 0) * 5}px`,
                                        }}
                                        title={banner.name}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ===== Основной компонент =====
function BannersCalendar({ banners, initialDate = new Date() }) {
    const [selectedBanner, setSelectedBanner] = useState(null);
    const memoriesModalRef = useRef();

    const showMemoriesModal = (banner) => {
        setSelectedBanner(banner);
        memoriesModalRef.current.showModal();
    };

    const cards = memoriesData.filter((card) =>
        selectedBanner?.cardIds?.includes(card.id),
    );

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

    // ===== Режим "месяц" =====
    const monthDays = useMemo(
        () => getMonthDays(selectedYear, selectedMonth),
        [selectedYear, selectedMonth],
    );

    // Используем отфильтрованный массив calendarBanners
    const bannerRows = useMemo(
        () => buildBannerRows(calendarBanners, monthDays),
        [calendarBanners, monthDays],
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
                            banners={calendarBanners} // Передаем отфильтрованный массив
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

    const firstDayOfWeek = (monthDays[0].getDay() + 6) % 7;
    const totalCells = Math.ceil((firstDayOfWeek + monthDays.length) / 7) * 7;
    const totalWeeks = totalCells / 7;
    const todayTime = startOfDay(new Date()).getTime();

    return (
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
                    style={{ gridTemplateRows: `repeat(${totalWeeks}, 1fr)` }}
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
                    style={{ gridTemplateRows: `repeat(${totalWeeks}, 1fr)` }}
                >
                    {bannerRows.map(({ banner, startIndex, endIndex, color, typeLabel, lane, imageUrl }) => {
                        const segments = getBannerSegments(startIndex, endIndex, firstDayOfWeek);
                        const chars = getBannerCharacters(banner);
                        const tooltip = `${banner.name} — ${typeLabel}${chars.length > 0 ? ` (${chars.join(", ")})` : ""}`;

                        return (
                            <div key={banner.id} className={styles.bannerSegmentsWrapper}>
                                {segments.map((seg, idx) => (
                                    <div
                                        key={`${banner.id}-${idx}`}
                                        className={styles.bannerBar}
                                        style={{
                                            gridColumn: `${seg.startCol} / span ${seg.span}`,
                                            gridRow: seg.row + 1,
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
                                        {seg.span > 1 && (
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
                                ))}
                            </div>
                        );
                    })}
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
        </div>
    );
}

export default BannersCalendar;