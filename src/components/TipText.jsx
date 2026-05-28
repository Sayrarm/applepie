import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import glossary from '../data/glossary.js';
import styles from './TipText.module.css'

const TipText = ({ text }) => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        text: '',
        x: 0,
        y: 0
    });

    const timeoutRef = useRef(null);
    const mouseMoveRef = useRef(null);
    const activeTermRef = useRef(null); // Для отслеживания активного термина на мобилке

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
    const handleMouseEnter = (event, description) => {
        if (isMobile()) return; // На мобилке игнорируем hover

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setTooltip({
            visible: true,
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
    const handleClick = (event, description, termKey) => {
        if (!isMobile()) return; // Только для мобилок

        event.stopPropagation(); // Предотвращаем всплытие

        const rect = event.currentTarget.getBoundingClientRect();

        // Если уже открыта подсказка для этого термина - закрываем
        if (tooltip.visible && activeTermRef.current === termKey) {
            setTooltip(prev => ({ ...prev, visible: false }));
            activeTermRef.current = null;
            return;
        }

        // Показываем подсказку под термином
        setTooltip({
            visible: true,
            text: description,
            x: rect.left + rect.width / 2,
            y: rect.bottom + 10, // Под термином
        });
        activeTermRef.current = termKey;
    };

    // Закрытие подсказки при клике вне области (для мобилок)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile() && tooltip.visible) {
                // Проверяем, был ли клик не по термину
                const isTermClick = event.target.className?.includes?.('glossaryTerm') ||
                    event.target.parentElement?.className?.includes?.('glossaryTerm');

                if (!isTermClick) {
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
                            // Десктопные события
                            onMouseEnter={(e) => handleMouseEnter(e, part.description)}
                            onMouseLeave={handleMouseLeave}
                            // Мобильные события
                            onClick={(e) => handleClick(e, part.description, part.key)}
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
                    {tooltip.text}
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