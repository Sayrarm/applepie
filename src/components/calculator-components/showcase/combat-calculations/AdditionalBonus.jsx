import { useState, useEffect, useCallback } from "react";
import { Range } from "react-range";
import styles from "./CombatCalculations.module.css";
import { useTranslation } from "react-i18next";

function AdditionalBonus({ onChange }) {
    // Внутренние состояния
    const [isAttributeBonus, setIsAttributeBonus] = useState(false);
    const [stellactrumCount, setStellactrumCount] = useState(0);
    const [isPerfectMatch, setIsPerfectMatch] = useState(false);
    const { t } = useTranslation();

    // Считаем бонусы
    const attributeBonus = isAttributeBonus ? stellactrumCount * 5 : 0;
    const perfectMatchBonus = isPerfectMatch ? 100 : 0;

    // Стабильный колбэк для родителя
    const notifyChange = useCallback(() => {
        onChange?.({ attributeBonus, perfectMatchBonus });
    }, [onChange, attributeBonus, perfectMatchBonus]);

    // Сообщаем родителю при любом изменении
    useEffect(() => {
        notifyChange();
    }, [notifyChange]);

    return (
        <div className={styles.additionalBonus}>
            <h3>{t('AdditionalBonus.titleContainer')}</h3>

            <div className={styles.bonusRow}>
                <label className={styles.checkboxLabel}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={isAttributeBonus}
                        onChange={(e) => setIsAttributeBonus(e.target.checked)}
                    />
                    {t('AdditionalBonus.attributiveText')}
                </label>
                {isAttributeBonus && (
                    <div className={styles.rangeContainer}>
                        <div className={styles.rangeLabel}>
                            {t('AdditionalBonus.countRange', {stellactrumCount: stellactrumCount})}
                        </div>
                        <Range
                            step={1}
                            min={0}
                            max={6}
                            values={[stellactrumCount]}
                            onChange={(values) => setStellactrumCount(values[0])}
                            renderTrack={({ props, children }) => (
                                <div {...props} className={styles.track}>
                                    <div
                                        className={styles.trackFilled}
                                        style={{
                                            width: `${(stellactrumCount / 6) * 100}%`,
                                        }}
                                    />
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => {
                                const { key, ...rest } = props;
                                return (
                                    <div
                                        key={key}
                                        {...rest}
                                        className={styles.point}
                                        onKeyDown={(e) => {
                                            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
                )}
            </div>

            <div className={styles.bonusRow}>
                <label className={styles.checkboxLabel}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={isPerfectMatch}
                        onChange={(e) => setIsPerfectMatch(e.target.checked)}
                    />
                    {t('AdditionalBonus.perfectMatchText')}
                </label>
            </div>
        </div>
    );
}

export default AdditionalBonus;