import styles from './Card.module.css'

function Card({data}) {


    return (
        <>
            <article className={styles.card}>

                <div className={styles.imgInfo}>
                    <img className={styles.img} src={data.image} alt={data.name}/>
                    {[...Array(data.rarityStars)].map((_, i) => (
                        <img
                            className={styles.stars}
                            key={i}
                            src={data.rarity}
                            alt={data.rarityName}
                            width={20}
                            height={20}
                        />
                    ))}
                    <img className={styles.stella} src={data.stella} alt={data.stellaName} width={24} height={24}/>
                    <img className={styles.placement} src={data.placement} alt={data.placementName} width={24}
                         height={24}/>
                    <img className={styles.talent} src={data.talent} alt={data.talentName} width={24} height={24}/>
                </div>

                <h3 className={styles.cardName}>{data.name}</h3>
            </article>
        </>
    )
}

export default Card
