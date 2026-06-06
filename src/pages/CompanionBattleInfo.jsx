import CompanionArticlePage from '../components/CompanionArticlePage';
import {compData} from '../data/comp-data.js';
import AsideCompanionList from "../components/AsideCompanionList.jsx";
import styles from "./CompanionBattleIfno.module.css"
import {Link, useParams} from "react-router-dom";
import {Fragment} from "react";

function CompanionBattleInfo() {

    const { articleLink } = useParams();

    // Находим текущую категорию
    const currentCategory = compData.find(cat => cat.link === articleLink);

    return (
        <section className={styles.container}>

            <AsideCompanionList className={styles.aside}/>

            <nav className={styles.nav}>
                <Fragment>
                    <Link
                        className={styles.link}
                        to="/battle">
                        Battle
                    </Link>
                    <span> &gt; </span>
                    {currentCategory && (
                        <span>{currentCategory.companionName || currentCategory.weaponName}</span>
                    )}
                </Fragment>
            </nav>

            <CompanionArticlePage
                data={compData}
                linkField="link"
            />
        </section>
    );
}

export default CompanionBattleInfo;