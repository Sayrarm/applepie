import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import glossary from '@data/companion-battle-data/glossary.js';
import styles from './TipText.module.css'

const TipText = ({ text }) => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        title: '',
        text: '',
        x: 0,
        y: 0
    });

    const timeoutRef = useRef(null);
    const mouseMoveRef = useRef(null);
    const activeTermRef = useRef(null); // Для отслеживания активного термина на мобилке
    const tooltipRef = useRef(null);     // Для получения DOM-элемента подсказки

    // Определяем мобильное устройство
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Разбираем текст на части
    const parseText = (content) => {
        if (!content || typeof content !== 'string') return [];

        const regex = /\[(.*?)]/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: content.substring(lastIndex, match.index)
                });
            }

            const termKey = match[1];
            const termData = glossary[termKey];

            parts.push({
                type: 'term',
                key: termKey,
                displayText: match[0],
                title: termData?.title || termKey,
                description: termData?.description || `There is no description for "${termKey}"`
            });

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < content.length) {
            parts.push({
                type: 'text',
                content: content.substring(lastIndex)
            });
        }

        return parts;
    };

    // Обработчик для десктопа (hover)
    const handleMouseEnter = (event, title, description) => {
        if (isMobile()) return; // На мобилке игнорируем hover

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setTooltip({
            visible: true,
            title: title,
            text: description,
            x: event.clientX,
            y: event.clientY
        });

        mouseMoveRef.current = (moveEvent) => {
            setTooltip(prev => ({
                ...prev,
                x: moveEvent.clientX,
                y: moveEvent.clientY
            }));
        };

        window.addEventListener('mousemove', mouseMoveRef.current);
    };

    const handleMouseLeave = () => {
        if (isMobile()) return; // На мобилке игнорируем

        if (mouseMoveRef.current) {
            window.removeEventListener('mousemove', mouseMoveRef.current);
            mouseMoveRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
            setTooltip(prev => ({ ...prev, visible: false }));
        }, 100);
    };

    // Обработчик для мобильных устройств (клик)
    const handleClick = (event, title, description, termKey) => {
        if (!isMobile()) return; // Только для мобилок

        event.stopPropagation(); // Предотвращаем всплытие

        const rect = event.currentTarget.getBoundingClientRect();

        // Если уже открыта подсказка для этого термина - закрываем
        if (tooltip.visible && activeTermRef.current === termKey) {
            setTooltip(prev => ({ ...prev, visible: false }));
            activeTermRef.current = null;
            return;
        }

        // Базовые координаты: под термином
        let x = rect.left + rect.width / 2;
        let y = rect.bottom + 10; // Под термином

        setTooltip({
            visible: true,
            title: title,
            text: description,
            x: x,
            y: y
        });
        activeTermRef.current = termKey;
    };

    // Корректировка позиции подсказки, чтобы она не выходила за пределы экрана
    useEffect(() => {
        if (tooltip.visible && tooltipRef.current) {
            const tooltipEl = tooltipRef.current;
            const rect = tooltipEl.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const margin = 10; // отступ от краёв экрана

            let newX = tooltip.x;
            let newY = tooltip.y;

            // Горизонтальная корректировка
            if (rect.width > viewportWidth - margin * 2) {
                // Если подсказка шире экрана, центрируем
                newX = viewportWidth / 2;
            } else {
                if (newX + rect.width / 2 > viewportWidth - margin) {
                    newX = viewportWidth - rect.width / 2 - margin;
                }
                if (newX - rect.width / 2 < margin) {
                    newX = rect.width / 2 + margin;
                }
            }

            // Вертикальная корректировка (только для мобильных, так как на десктопе подсказка движется за мышью)
            if (isMobile()) {
                const isAbove = tooltip.y + rect.height > viewportHeight - margin;
                if (isAbove) {
                    // Показываем над термином
                    const termRect = activeTermRef.current && document.querySelector(`.${styles.glossaryTerm}[data-term="${activeTermRef.current}"]`)?.getBoundingClientRect();
                    if (termRect) {
                        newY = termRect.top - rect.height - margin;
                    } else {
                        newY = viewportHeight - rect.height - margin;
                    }
                } else {
                    // Под термином — оставляем как есть, но проверяем, чтобы не уходило вниз
                    if (newY + rect.height > viewportHeight - margin) {
                        newY = viewportHeight - rect.height - margin;
                    }
                }
            } else {
                // На десктопе просто не даём вылезти за края окна
                if (newY + rect.height > viewportHeight - margin) {
                    newY = viewportHeight - rect.height - margin;
                }
                if (newX + rect.width > viewportWidth - margin) {
                    newX = viewportWidth - rect.width - margin;
                }
                if (newX < margin) {
                    newX = margin;
                }
            }

            // Обновляем позицию, если она изменилась
            if (newX !== tooltip.x || newY !== tooltip.y) {
                setTooltip(prev => ({ ...prev, x: newX, y: newY }));
            }
        }
    }, [tooltip.visible, tooltip.x, tooltip.y]);

    // Закрытие подсказки при клике вне области (для мобилок)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile() && tooltip.visible) {
                // Проверяем, был ли клик не по термину и не по подсказке
                const isTermClick = event.target.classList?.contains('glossaryTerm') ||
                    event.target.parentElement?.classList?.contains('glossaryTerm');

                const isTooltipClick = tooltipRef.current?.contains(event.target);

                if (!isTermClick && !isTooltipClick) {
                    setTooltip(prev => ({ ...prev, visible: false }));
                    activeTermRef.current = null;
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [tooltip.visible]);

    // Очищаем таймер и обработчик при размонтировании
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (mouseMoveRef.current) {
                window.removeEventListener('mousemove', mouseMoveRef.current);
            }
        };
    }, []);

    const parts = parseText(text);
    const mobile = isMobile();

    return (
        <>
            <div className={styles.glossaryText}>
                {parts.map((part, index) => {
                    if (part.type === 'text') {
                        return <span key={index}>{part.content}</span>;
                    }

                    return (
                        <span
                            key={index}
                            className={styles.glossaryTerm}
                            data-term={part.key}
                            // Десктопные события
                            onMouseEnter={(e) => handleMouseEnter(e, part.title, part.description)}
                            onMouseLeave={handleMouseLeave}
                            // Мобильные события
                            onClick={(e) => handleClick(e, part.title, part.description, part.key)}
                            // Добавляем атрибуты для доступности
                            role="button"
                            tabIndex={mobile ? 0 : -1}
                            aria-label={`Показать описание для ${part.displayText}`}
                        >
                            {part.displayText}
                        </span>
                    );
                })}
            </div>

            {/* Рендерим подсказку в body через портал */}
            {tooltip.visible && createPortal(
                <div
                    ref={tooltipRef}
                    className={styles.glossaryTooltip}
                    style={{
                        left: mobile ? `${tooltip.x}px` : `${tooltip.x + 15}px`,
                        top: mobile ? `${tooltip.y}px` : `${tooltip.y + 20}px`,
                        position: 'fixed',
                        pointerEvents: mobile ? 'auto' : 'none', // На мобилке можно взаимодействовать
                        transform: mobile ? 'translateX(-50%)' : 'none',
                        zIndex: 9999
                    }}
                >
                    {/* Заголовок */}
                    {tooltip.title && (
                        <div className={styles.glossaryTooltipTitle}>
                            {tooltip.title}
                        </div>
                    )}
                    {/* Описание */}
                    <div className={styles.glossaryTooltipText}>
                        {tooltip.text}
                    </div>
                    {mobile && (
                        <button
                            onClick={() => {
                                setTooltip(prev => ({ ...prev, visible: false }));
                                activeTermRef.current = null;
                            }}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'none',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer',
                                padding: '0 5px'
                            }}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    )}
                </div>,
                document.body
            )}
        </>
    );
};

export default TipText;