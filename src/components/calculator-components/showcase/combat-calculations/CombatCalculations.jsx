import { useState } from "react";
import styles from "./CombatCalculations.module.css";
import { AsideList, TablePairBonus } from "@components";
import { useSolarPair } from "@hooks";
import AdditionalBonus from "@components/calculator-components/showcase/combat-calculations/AdditionalBonus.jsx";
import KitCombatTable from "@components/calculator-components/showcase/combat-calculations/KitCombatTable.jsx";

function CombatCalculations({
                                stats,
                                selectedCompanion,
                                selectedMCWeapon,
                                solarCards,
                            }) {
    // Вся логика пары solar-карточек — в хуке
    const { hasAnySolarPair, defaultBuffs, teamDmgBonus } =
        useSolarPair(solarCards);

    // Additional Bonus — значения приходят от дочернего компонента
    const [additionalBonus, setAdditionalBonus] = useState({
        attributeBonus: 0,
        perfectMatchBonus: 0,
    });

    const items = [
        {
            key: "1",
            label: "Disclaimer",
            children: (
                <div className={styles.disclaimerContent}>
                    <strong>
                        At the moment, the exact formula for damage directly from the game
                        is unknown.
                    </strong>
                    <p>
                        All calculations below are approximate figures of the damage you can
                        get in battle. Personal bonuses from the Companion kit are not
                        included here. Damage can also vary due to the level of the enemy,
                        its type, defense, etc., which are also not included in the
                        calculations below.
                    </p>
                    <p>
                        Only the increase in damage according to the ranks of Memories is
                        included permanently (Default Buffs: Starring Effect and Duo Rank
                        3).
                    </p>
                    <p>
                        You can also check the box for Attribute Bonus and Perfect Match to
                        calculate the damage along with these bonuses.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Combat Calculations</h2>

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