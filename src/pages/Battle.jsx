import {Collapse} from "antd";
import styles from "./Spacepedia.module.css";
import {Link} from "react-router-dom";


function Battle() {

    const items = [
        {
            key: '1',
            label: 'Xavier',
            children: (
                <>
                    <Link to="/xavier/kod">King of Darknight</Link>
                    <br/>
                    <Link to="/xavier/lumiere">Lumiere</Link>
                    <br/>
                    <Link to="/xavier/lightseeker">Lightseeker</Link>
                    <br/>
                    <Link to="/xavier/evol-police">Evol Police</Link>
                    <br/>
                    <Link to="/xavier/distant-youth">Distant Youth</Link>
                    <br/>
                    <Link to="/xavier/hunter">Deepspace Hunter</Link>
                    <br/>
                </>
            ),
        },
        {
            key: '2',
            label: 'Zayne',
            children:(
                <>
                    <Link to="/zayne/goa">God of Annihilation</Link>
                    <br/>
                    <Link to="/zayne/mof">Master of Fate</Link>
                    <br/>
                    <Link to="/zayne/foreseer">Foreseer</Link>
                    <br/>
                    <Link to="/zayne/medic">Medic of the Arctic</Link>
                    <br/>
                    <Link to="/zayne/dawnbreaker">Dawnbreaker</Link>
                    <br/>
                    <Link to="/zayne/doctor">Linkon Doctor</Link>
                    <br/>
                </>
            ),
        },
        {
            key: '3',
            label: 'Rafayel',
            children: (
                <>
                    <Link to="/rafayel/lsg">Lemurian Sea God</Link>
                    <br/>
                    <Link to="/rafayel/got">God of the Tides</Link>
                    <br/>
                    <Link to="/rafayel/abysswalker">Abysswalker</Link>
                    <br/>
                    <Link to="/rafayel/fresh-paint">Fresh Paint</Link>
                    <br/>
                    <Link to="/rafayel/phantom">Phantom of the Siren</Link>
                    <br/>
                    <Link to="/rafayel/artist">Artist</Link>
                    <br/>
                </>
            ),
        },
        {
            key: '4',
            label: 'Sylus',
            children: (
                <>
                    <Link to="/sylus/silvering-fiend">Silvering Fiend</Link>
                    <br/>
                    <Link to="/sylus/sovereign">Abysm Sovereign</Link>
                    <br/>
                    <Link to="/sylus/conqueror">Relentless Conqueror</Link>
                    <br/>
                    <Link to="/sylus/visitor">Otherworldly Visitor</Link>
                </>
            ),
        },
        {
            key: '5',
            label: 'Caleb',
            children: (
                <>
                    <Link to="/battle/caleb-netherlord">Netherlord</Link>
                    <br/>
                    <Link to="/battle/caleb-x02">Ultimate Weapon X-02</Link>
                    <br/>
                    <Link to="/battle/caleb-colonel">Farspace Colonel</Link>
                    <br/>
                    <Link to="/battle/caleb-pilot">Deepspace Pilot</Link>
                </>
            ),
        },
        {
            key: '6',
            label: 'MC',
            children: (
                <>
                    <Link to="/mc/sword">Hunter Sword</Link>
                    <br/>
                    <Link to="/mc/wand">Hunter Wand</Link>
                    <br/>
                    <Link to="/mc/claymore">Hunter Claymore</Link>
                    <br/>
                    <Link to="/mc/firearm">Hunter Firearm</Link>
                </>
            ),
        },
    ];


    return (
        <>
            <section>
                <nav>
                    Companions
                    <Collapse
                        key={items.key}
                        className={styles.content}
                        ghost
                        items={items}
                    />
                </nav>

                <section>

                    <img src="" alt=""/>
                    
                    <div>
                        <div>Companion</div>
                        <div>Name of char</div>
                        <div>DPS | Heal | Single Target</div>
                        <div>Support Skill</div>
                        <div>Support Skill Cooldown</div>
                        <div>Support Skill Cost</div>
                        <div>Text of support skill</div>
                        <div>Resonance Skill</div>
                        <div>Resonance Skill Cooldown</div>
                        <div>Resonance Skill Cost</div>
                        <div>Text of resonance skill</div>
                        <div>Ardent Oath</div>
                        <div>Text of ardent oath</div>
                        <div>Passive Skill</div>
                        <div>Text of passive skill</div>
                    </div>

                    <div>
                        <div>MC Weapon</div>
                        <br/>
                        <div>DPS | Heal | Single Target</div>
                        <div>Basic Attack</div>
                        <div>Text of Basic Attack</div>
                        <div>Active Skill</div>
                        <div>Active Skill Cooldown</div>
                        <div>Active Skill Cost</div>
                        <div>Text of active skill</div>
                        <div>Passive Skill</div>
                        <div>Text of passive skill</div>
                    </div>

                </section>
            </section>
        </>
    )
}

export default Battle
