import {Fragment} from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./CompanionBattleInfo.module.css"
import {
    CompanionArticlePage,
    AsideCompanionList,
    CardList,
    AsideList
} from '@components'
import {
    compData,
    memoriesData
} from '@data'

function CompanionBattleInfo() {

    const {articleLink} = useParams();

    // Находим текущую категорию
    const currentCategory = compData.find(cat => cat.link === articleLink);

    // берём cardIds у найденного компаньона
    const cards = memoriesData.filter(card =>
        currentCategory?.cardIds?.includes(card.id)
    );

    return (
        <section className={styles.container}>

            <AsideCompanionList className={styles.asideCompanionList}/>

            <aside className={styles.asideContainer}>
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

                {cards && cards.length > 0 && (
                    <AsideList
                        className={styles.memoriesInfoBlock}
                        title="To unlock this Companion you need:"
                        items={[
                            {
                                key: '1',
                                label: 'Required Memories',
                                children: (
                                    <CardList cards={cards}/>
                                )
                            }
                        ]}
                    />
                )}
            </aside>

            <CompanionArticlePage
                data={compData}
                linkField="link"
            />
        </section>
    );
}

export default CompanionBattleInfo;