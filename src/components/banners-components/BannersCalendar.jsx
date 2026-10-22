import { useMemo, useRef, useState, useEffect } from "react";
import styles from "./BannersCalendar.module.css";
import {
    getBannerColor,
    getBannerCharacters,
    getBannerTypeLabel,
} from "./bannerColors.js";
import { getImageUrl } from "@hooks";
import { memoriesData } from "@data";
import {
    CardList,
    ModalWindow,
    useTimezone,
    BannerPeriod,
    BannerList
} from "@components";
import { useTranslation } from "react-i18next";
import {
    getPredicts,
    addPredict,
    clearPredicts,
    savePredicts
} from "@localstorage";

// --- Утилиты дат ---
// ИСПРАВЛЕНО: applyTimezone теперь принимает isPredict и не сдвигает время для предиктов
const applyTimezone = (dateInput, serverOffset, isPredict = false) => {
    if (!dateInput) return null;

    // Парсим строку как локальное время пользователя (Москва)
    const localDate = new Date(dateInput);
    if (isNaN(localDate.getTime())) return null;

    // Если это предикт, мы не сдвигаем его по часовому поясу,
    // чтобы он всегда отображался в тех днях, которые выбрал пользователь.
    if (isPredict) {
        return localDate;
    }

    const userOffsetMinutes = -localDate.getTimezoneOffset();

    // Парсим оффсет сервера (например, "+08:00" -> 480 минут)
    const match = serverOffset?.match(/([+-])(\d{2}):(\d{2})/);
    if (!match) return localDate;

    const sign = match[1] === "-" ? -1 : 1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    const serverOffsetMinutes = sign * (hours * 60 + minutes);

    // Вычисляем разницу: (Оффсет пользователя - Оффсет сервера)
    const diffMinutes = userOffsetMinutes - serverOffsetMinutes;
    const diffMs = diffMinutes * 60 * 1000;

    // Возвращаем новую дату
    return new Date(localDate.getTime() + diffMs);
};

const startOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const getMonthDays = (year, month) => {
    const days = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(startOfDay(new Date(year, month, day)));
    }
    return days;
};

const parseDate = (value, timezone, isPredict) => {
    if (!value || value === "permanently") return null;
    return applyTimezone(value, timezone, isPredict); // <-- Передаем флаг
};

const getBannerRange = (banner, monthDays, timezone) => {
    const isPredict = banner.isPredict; // <-- Получаем флаг
    const bannerStart = parseDate(banner.startDate, timezone, isPredict);
    const bannerEnd = parseDate(banner.endDate, timezone, isPredict);
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
            startCol: (currentStart % 7) + 1,
            span: segmentEnd - currentStart + 1,
            row: currentRow,
        });

        currentStart = segmentEnd + 1;
    }
    return segments;
};

const buildBannerSegments = (banners, monthDays, firstDayOfWeek, timezone) => {
    const allSegments = [];

    // 1. Собираем все сегменты
    banners.forEach((banner) => {
        const range = getBannerRange(banner, monthDays, timezone);
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
                row: seg.row,
                realStartTime: parseDate(banner.startDate, timezone, banner.isPredict)?.getTime() ?? 0,
                realEndTime: parseDate(banner.endDate, timezone, banner.isPredict)?.getTime() ?? Infinity,
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
        start: { month: 2, day: 1 },
        end: { month: 2, day: 8 },
        color: "rafayel",
    },
    {
        start: { month: 3, day: 13 },
        end: { month: 3, day: 20 },
        color: "sylus",
        skipYears: [2024],
    },
    {
        start: { month: 5, day: 8 },
        end: { month: 5, day: 15 },
        color: "caleb",
        skipYears: [2024],
    },
    {
        start: { month: 8, day: 1 },
        end: { month: 8, day: 7 },
        color: "zayne",
    },
    {
        start: { month: 9, day: 11 },
        end: { month: 9, day: 18 },
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

// ===== Мини-месяц для режима "год" =====
function MiniMonth({ year, month, banners, onClick }) {
    const { timezone } = useTimezone();
    const { t, i18n } = useTranslation();
    const monthDays = useMemo(() => getMonthDays(year, month), [year, month]);

    const firstDayOfWeek = (monthDays[0].getDay() + 6) % 7;

    const bannerRows = useMemo(
        () => buildBannerSegments(banners, monthDays, firstDayOfWeek, timezone),
        [banners, monthDays, firstDayOfWeek, timezone],
    );

    const monthName = new Date(year, month, 1).toLocaleString(i18n.language, {
        month: "long",
    });


    const weekDayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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
            title={t('BannersCalendar.openMonthTitle', { month: monthName, year })}
        >
            <div className={styles.miniMonthTitle}>{monthName}</div>

            {/* Шапка с днями недели */}
            <div className={styles.miniWeekHeader}>
                {weekDayKeys.map((key) => (
                    <div key={key} className={styles.miniWeekDayName}>
                        {t(`BannersCalendar.weekDays.${key}`)}
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
                                    marginTop: `${4 + (lane || 0) * 5}px`,
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
function BannersCalendar({ banners, initialDate = new Date(), editMode, setEditMode }) {
    const { timezone } = useTimezone();
    const { t, i18n } = useTranslation();

    const [selectedYear, setSelectedYear] = useState(
        () => initialDate.getFullYear(),
    );
    const [viewMode, setViewMode] = useState("year");
    const [selectedMonth, setSelectedMonth] = useState(
        () => initialDate.getMonth(),
    );

    // Состояние для модалки
    const [selectedBanner, setSelectedBanner] = useState(null);
    const memoriesModalRef = useRef();

    // ===== СОСТОЯНИЯ ДЛЯ ПРЕДИКТОВ =====
    const [selectedDays, setSelectedDays] = useState([]); // Массив timestamp
    const [predicts, setPredicts] = useState(() => getPredicts());
    const predictModalRef = useRef(); // Ссылка на модалку выбора

    // Сброс выбранных дней при выходе из режима
    useEffect(() => {
        if (!editMode) {
            setSelectedDays([]);
        }
    }, [editMode]);

    // Объединяем оригинальные баннеры и предикты
    const allBanners = useMemo(() => {
        return [...banners, ...predicts];
    }, [banners, predicts]);

    const calendarBanners = useMemo(() => {
        return allBanners.filter(b => b.endDate !== "permanently");
    }, [allBanners]);

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
        () => buildBannerSegments(calendarBanners, monthDays, firstDayOfWeek, timezone),
        [calendarBanners, monthDays, firstDayOfWeek, timezone]
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

    // ===== ОБРАБОТЧИКИ РЕЖИМА РЕДАКТИРОВАНИЯ =====
    const handleDayClick = (day) => {
        if (!editMode) return;
        const time = day.getTime();
        setSelectedDays((prev) =>
            prev.includes(time)
                ? prev.filter((t) => t !== time)
                : [...prev, time]
        );
    };

    const handleAddPredict = (banner) => {
        if (selectedDays.length === 0) return;

        const sortedDays = [...selectedDays].sort((a, b) => a - b);

        // ИСПРАВЛЕНО: ставим 00:00:00 для начала и 23:59:59 для конца
        const startDate = new Date(sortedDays[0]);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(sortedDays[sortedDays.length - 1]);
        endDate.setHours(23, 59, 59, 999);

        const predict = {
            ...banner,
            id: `predict-${Date.now()}`, // Уникальный ID
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            isPredict: true, // Флаг предикта
        };

        const updatedPredicts = addPredict(predict);
        setPredicts(updatedPredicts);

        setSelectedDays([]);
        // Закрываем модалку
        if (predictModalRef.current) {
            predictModalRef.current.closeModal();
        }
    };

    // ===== УДАЛЕНИЕ ВСЕХ ПРЕДИКТОВ =====
    const handleClearAllPredicts = () => {
        if (window.confirm("Вы уверены, что хотите удалить все предикты?")) {
            clearPredicts();
            setPredicts([]);
        }
    };

    // ===== УДАЛЕНИЕ ВЫБРАННЫХ ПРЕДИКТОВ =====
    const handleRemoveSelectedPredicts = () => {
        if (selectedDays.length === 0) return;

        // Находим предикты, которые пересекаются с выбранными днями
        const remainingPredicts = predicts.filter((predict) => {
            const range = getBannerRange(predict, monthDays, timezone);
            if (!range) return true; // Оставляем, если не попадает в этот месяц

            // Проверяем пересечение с выбранными днями
            for (let i = range.startIndex; i <= range.endIndex; i++) {
                const dayTime = monthDays[i].getTime();
                if (selectedDays.includes(dayTime)) {
                    return false; // Если пересекается — удаляем
                }
            }
            return true; // Если нет — оставляем
        });

        // Сохраняем обновленный список
        savePredicts(remainingPredicts);
        setPredicts(remainingPredicts);
        setSelectedDays([]);
    };

    const weekDayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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
        i18n.language,
        { month: "long", year: "numeric" },
    );

    const totalCells = Math.ceil((firstDayOfWeek + monthDays.length) / 7) * 7;
    const totalWeeks = totalCells / 7;

    // Сдвигаем "сегодня" в соответствии с выбранным поясом
    const todayTime = applyTimezone(new Date(), timezone)?.getTime();

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
                        title={t('BannersCalendar.backToYearTitle')}
                    >
                        {monthName}
                    </h2>
                    <button onClick={goNextMonth} className={styles.navBtn}>
                        →
                    </button>
                </div>

                {/* Шапка дней недели */}
                <div className={styles.weekHeader}>
                    {weekDayKeys.map((key) => (
                        <div key={key} className={styles.weekDayName}>
                            {t(`BannersCalendar.weekDays.${key}`)}
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

                            // ВАЖНО: todayTime уже сдвинут, но startOfDay применяется к нему,
                            // чтобы сравнить именно дни (без учета времени)
                            const isToday = isCurrentMonth && day.getTime() === startOfDay(todayTime).getTime();
                            const specialClass = isCurrentMonth ? getSpecialDayClass(day) : "";
                            const isSelectedDay = isCurrentMonth && selectedDays.includes(day.getTime());

                            return (
                                <div
                                    key={i}
                                    onClick={() => handleDayClick(day)}
                                    className={[
                                        styles.monthDay,
                                        !isCurrentMonth ? styles.monthDayOutside : "",
                                        specialClass ? styles[specialClass] : "",
                                        isToday ? styles.monthDayToday : "",
                                        isSelectedDay ? styles.monthDaySelected : "",
                                        editMode && isCurrentMonth ? styles.monthDayEdit : "",
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
                                    onClick={(e) => {
                                        if (!editMode) {
                                            showMemoriesModal(banner);
                                        } else {
                                            e.stopPropagation(); // Блокируем клик по дню, если кликнули по баннеру
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if ((e.key === "Enter" || e.key === " ") && !editMode) {
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

                {/* Блок кнопок внизу календаря */}
                <div style={{ marginTop: "16px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                    {/* Кнопка входа/выхода из режима редактирования - ТОЛЬКО В РЕЖИМЕ МЕСЯЦА */}
                    <button
                        onClick={() => setEditMode(!editMode)}
                        style={{
                            padding: "10px 20px",
                            cursor: "pointer",
                            background: editMode ? "#9b6cff" : "#2a2a2a",
                            color: "#fff",
                            border: "1px solid #444",
                            borderRadius: "8px",
                            fontSize: "16px"
                        }}
                    >
                        {editMode ? "Выйти из редактирования" : "Добавить предикт"}
                    </button>

                    {/* Остальные кнопки - только если включен режим редактирования */}
                    {editMode && (
                        <>
                            {selectedDays.length > 0 && (
                                <button
                                    onClick={() => {
                                        if (predictModalRef.current) {
                                            predictModalRef.current.showModal();
                                        }
                                    }}
                                    style={{ padding: "10px 20px", cursor: "pointer", background: "#9b6cff", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px" }}
                                >
                                    Подтвердить ({selectedDays.length} дн.)
                                </button>
                            )}

                            {selectedDays.length > 0 && predicts.length > 0 && (
                                <button
                                    onClick={handleRemoveSelectedPredicts}
                                    style={{ padding: "10px 20px", cursor: "pointer", background: "#ff4d4d", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px" }}
                                >
                                    Удалить предикт в выбранных днях
                                </button>
                            )}

                            {predicts.length > 0 && (
                                <button
                                    onClick={handleClearAllPredicts}
                                    style={{ padding: "10px 20px", cursor: "pointer", background: "#444", color: "#fff", border: "1px solid #666", borderRadius: "8px", fontSize: "16px" }}
                                >
                                    Удалить все предикты ({predicts.length})
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Модалка выбора баннера для предикта */}
            <ModalWindow
                ref={predictModalRef}
                title="Выберите баннер"
                onClose={() => {}} // Пустая функция, чтобы не сбрасывать выбранные дни при закрытии
                tag={
                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                        <BannerList
                            banners={banners}
                            showFilters={true}
                            onSelect={(banner) => handleAddPredict(banner)}
                        />
                    </div>
                }
            />

            {/* Существующая модалка для просмотра карточек */}
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