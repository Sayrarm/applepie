import { useState } from "react";
import styles from "./CombatCalculations.module.css";
import {
    AsideList,
    TablePairBonus,
    AdditionalBonus,
    KitCombatTable
} from "@components";
import { useSolarPair } from "@hooks";
import { useTranslation } from "react-i18next";

function CombatCalculations({
                                stats,
                                selectedCompanion,
                                selectedMCWeapon,
                                solarCards,
                            }) {
    // Вся логика пары solar-карточек — в хуке
    const { hasAnySolarPair, defaultBuffs, teamDmgBonus } =
        useSolarPair(solarCards);

    const { t } = useTranslation();

    // Additional Bonus — значения приходят от дочернего компонента
    const [additionalBonus, setAdditionalBonus] = useState({
        attributeBonus: 0,
        perfectMatchBonus: 0,
    });

    const items = [
        {
            key: "1",
            label: t('CombatCalculations.disclaimer'),
            children: (
                <div className={styles.disclaimerContent}>
                    <p className={styles.red}>
                        {t('CombatCalculations.text1')}
                    </p>
                    <p>
                        {t('CombatCalculations.text2')}
                    </p>
                    <p>
                        {t('CombatCalculations.text3')}
                    </p>
                    <p>
                        {t('CombatCalculations.text4')}
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{t('CombatCalculations.titleContainer')}</h2>

            <div className={styles.titleAndDisclaimer}>
                <AsideList items={items} />
            </div>

            {hasAnySolarPair && defaultBuffs && (
                <TablePairBonus
                    selectedCompanion={selectedCompanion}
                    solarCards={solarCards}
                />
            )}

            {/* Additional Bonus Section */}
            <AdditionalBonus onChange={setAdditionalBonus} />

            <KitCombatTable
                stats={stats}
                selectedCompanion={selectedCompanion}
                selectedMCWeapon={selectedMCWeapon}
                teamDmgBonus={teamDmgBonus}
                additionalBonus={additionalBonus}
            />
        </section>
    );
}

export default CombatCalculations;