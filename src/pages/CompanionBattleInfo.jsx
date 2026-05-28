import CompanionArticlePage from '../components/CompanionArticlePage';
import {compData} from '../data/comp-data.js';
import AsideCompanionList from "../components/AsideCompanionList.jsx";
import styles from "./CompanionBattleIfno.module.css"

function CompanionBattleInfo() {
    return (
        <section className={styles.container}>

            <AsideCompanionList className={styles.aside}/>


            <CompanionArticlePage
                data={compData}
                linkField="link"
            />
        </section>
    );
}

export default CompanionBattleInfo;