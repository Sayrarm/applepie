import {compDataShowcaseDefault, compDataShowcaseSpecific} from "../data/comp-data-showcase.js";

function CombatCalculations() {
    const specificData = compDataShowcaseSpecific[0] || {};

    return (
        <section>
            <h2>Combat Calculations:</h2>

            <div>
                Pair Bonus:
                <div>Starring Effect: {compDataShowcaseDefault.eidolon0}; {specificData.buffEidolon0Formula}</div>
                <div>Duo Rank 1: {compDataShowcaseDefault.eidolon1}; {specificData.buffEidolon1Formula}</div>
                <div>Duo Rank 2: {compDataShowcaseDefault.eidolon2}; {specificData.buffEidolon2Formula}</div>
                <div>Duo Rank 3: {compDataShowcaseDefault.eidolon3}; {specificData.buffEidolon3Formula}</div>
            </div>
            <div>
                Basic Attack:
                <div>First Attack: {specificData.firstStrike}</div>
                <div>Second Attack: {specificData.secondStrike}</div>
                <div>Third Attack: {specificData.thirdStrike}</div>
                <div>Fourth Attack: {specificData.fourthStrike}</div>
                <div>Charged Attack: {specificData.chargedAttack}</div>
            </div>
            <div>
                Active Skill: {specificData.activeSkillFormula}; {specificData.activeSkillSecondFormula}
            </div>
            <div>
                Support Skill: {specificData.supportSkillFormula}
            </div>
            <div>
                Empowered Support Skill: {specificData.empoweredSupportSkillFormula}
            </div>
            <div>
                Resonance Skill: {specificData.resonanceSkillFormula}
            </div>
            <div>
                Passive Skill: {specificData.passiveSkillFormula1}; {specificData.passiveSkillFormula2}
            </div>
            <div>
                Ardent Oath: {specificData.ardentOathFormula}
            </div>

        </section>
    )
}

export default CombatCalculations;