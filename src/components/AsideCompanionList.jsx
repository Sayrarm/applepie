import {Collapse} from "antd";
import {createStaticStyles} from 'antd-style';
import styles from "./AsideCompanionList.module.css";
import {Link} from "react-router-dom";

const classNames = createStaticStyles(({css}) => ({
    root: css`
        background-color: color-mix(in srgb, var(--bg-brown) 10%, transparent);
        box-shadow: 10px 10px 6px -5px rgba(148, 148, 148, 0.6);
        border-radius: 0;
        text-decoration: none;
        color: var(--brown);
        padding: 0;
    `,
}));

function AsideCompanionList({className}) {

    const items = [
        {
            key: '1',
            label: 'Xavier',
            children: (
                <>
                    <Link className={styles.link} to="/battle/kod">
                        King of Darknight
                        <img
                            src="/companions/xavier-kod.png"
                            alt="kod"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/lumiere">
                        Lumiere
                        <img
                            src="/companions/xavier-lumiere.png"
                            alt="lumiere"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/lightseeker">
                        Lightseeker
                        <img
                            src="/companions/xavier-lightseeker.png"
                            alt="lightseeker"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/evol-police">
                        Evol Police
                        <img
                            src="/companions/xavier-police.png"
                            alt="police"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/distant-youth">
                        Distant Youth
                        <img
                            src="/companions/xavier-youth.png"
                            alt="youth"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/hunter">
                        Deepspace Hunter
                        <img
                            src="/companions/xavier-hunter.png"
                            alt="hunter"
                            className={styles.imgCompanion}
                        />
                    </Link>
                </>
            ),
        },
        {
            key: '2',
            label: 'Zayne',
            children: (
                <>
                    <Link className={styles.link} to="/battle/goa">
                        God of Annihilation
                        <img
                            src="/companions/zayne-goa.png"
                            alt="goa"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/mof">
                        Master of Fate
                        <img
                            src="/companions/zayne-mof.png"
                            alt="mof"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/foreseer">
                        Foreseer
                        <img
                            src="/companions/zayne-foreseer.png"
                            alt="foreseer"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/medic">
                        Medic of the Arctic
                        <img
                            src="/companions/zayne-medic.png"
                            alt="medic"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/dawnbreaker">
                        Dawnbreaker
                        <img
                            src="/companions/zayne-dawnbreaker.png"
                            alt="dawnbreaker"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/doctor">
                        Linkon Doctor
                        <img
                            src="/companions/zayne-doctor.png"
                            alt="doctor"
                            className={styles.imgCompanion}
                        />
                    </Link>
                </>
            ),
        },
        {
            key: '3',
            label: 'Rafayel',
            children: (
                <>
                    <Link className={styles.link} to="/battle/lsg">
                        Lemurian Sea God
                        <img
                            src="/companions/rafayel-lsg.png"
                            alt="lsg"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/got">
                        God of the Tides
                        <img
                            src="/companions/rafayel-got.png"
                            alt="got"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/abysswalker">
                        Abysswalker
                        <img
                            src="/companions/rafayel-abysswalker.png"
                            alt="abysswalker"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/fresh-paint">
                        Fresh Paint
                        <img
                            src="/companions/rafayel-freshpaint.png"
                            alt="fresh-paint"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/phantom">
                        Phantom of the Siren
                        <img
                            src="/companions/rafayel-phantom.png"
                            alt="phantom"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/artist">
                        Artist
                        <img
                            src="/companions/rafayel-artist.png"
                            alt="artist"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                </>
            ),
        },
        {
            key: '4',
            label: 'Sylus',
            children: (
                <>
                    <Link className={styles.link} to="/battle/silverwing-fiend">
                        Silverwing Fiend
                        <img
                            src="/companions/sylus-fiend.png"
                            alt="fiend"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/sovereign">
                        Abysm Sovereign
                        <img
                            src="/companions/sylus-sovereign.png"
                            alt="sovereign"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/conqueror">
                        Relentless Conqueror
                        <img
                            src="/companions/sylus-conqueror.png"
                            alt="conqueror"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/visitor">
                        Otherworldly Visitor
                        <img
                            src="/companions/sylus-visitor.png"
                            alt="visitor"
                            className={styles.imgCompanion}
                        />
                    </Link>
                </>
            ),
        },
        {
            key: '5',
            label: 'Caleb',
            children: (
                <>
                    <Link className={styles.link} to="/battle/netherlord">
                        Netherlord
                        <img
                            src="/companions/caleb_netherlord.png"
                            alt="netherlord"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/x02">
                        Ultimate Weapon X-02
                        <img
                            src="/companions/caleb_X02.png"
                            alt="x02"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/colonel">
                        Farspace Colonel
                        <img
                            src="/companions/caleb_colonel.png"
                            alt="colonel"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/pilot">
                        Deepspace Pilot
                        <img
                            src="/companions/caleb_pilot.png"
                            alt="pilot"
                            className={styles.imgCompanion}
                        />
                    </Link>
                </>
            ),
        },
        {
            key: '6',
            label: 'MC',
            children: (
                <>
                    <Link className={styles.link} to="/battle/sword">
                        Hunter Sword
                        <img
                            src="/companions/sword.png"
                            alt="sword"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/wand">
                        Hunter Wand
                        <img
                            src="/companions/wand.png"
                            alt="wand"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/claymore">
                        Hunter Claymore
                        <img
                            src="/companions/claymore.png"
                            alt="claymore"
                            className={styles.imgCompanion}
                        />
                    </Link>
                    <br/>
                    <Link className={styles.link} to="/battle/firearm">
                        Hunter Firearm
                        <img
                            src="/companions/firearm.png"
                            alt="firearm"
                            className={styles.imgCompanion}
                        />
                    </Link>
                </>
            ),
        },
    ];

    const sharedProps = {classNames, items};

    return (

        <aside className={className}>
            <nav>
                <h1 className={styles.title}>Companions and MC Weapons</h1>

                <Collapse
                    {...sharedProps}
                    key={items.key}
                    ghost
                    className={styles.collapse}
                    items={items}
                    accordion
                />
            </nav>


        </aside>

    )
}

export default AsideCompanionList