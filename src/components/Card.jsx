import styles from './Card.module.css'

function Card({data}) {


    return (
        <>
            <article className={styles.card}>

                <div className={styles.imgInfo}>
                    <img className={styles.img} src={data.imageSmall} alt={data.name}/>

                    <div className={styles.starsGroup}>
                        {[...Array(data.rarityStars)].map((_, i) => (
                            <img
                                className={styles.stars}
                                key={i}
                                src={data.rarity}
                                alt={data.rarityName}
                                width={15}
                                height={15}
                            />
                        ))}
                    </div>
                    <img className={styles.stella} src={data.stella} alt={data.stellaName} width={22} height={22}/>
                    <img className={styles.placement} src={data.placement} alt={data.placementName} width={22}
                         height={22}/>
                    <img className={styles.talent} src={data.talent} alt={data.talentName} width={22} height={22}/>

                    <div className={styles.parametrsBG}></div>
                </div>

                <h3 className={styles.cardName}>{data.char}: {data.name}</h3>
            </article>
        </>
    )
}

export default Card
