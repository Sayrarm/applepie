import styles from './Card.module.css'

function Card({ data }) {


    return (
        <>
            <article className={styles.card}>
                <img src={data.image} alt={data.name} width={150} height={200}/>
                <h3>{data.char}: {data.name}</h3>
                {[...Array(data.rarityStars)].map((_, i) => (
                    <img
                        key={i}
                        src={data.rarity}
                        alt={data.rarityName}
                        width={20}
                        height={20}
                    />
                ))}
                <img src={data.stella} alt={data.stellaName} width={24} height={24}/>
                <img src={data.placement} alt={data.placementName} width={24} height={24}/>
                <img src={data.talent} alt={data.talentName} width={24} height={24}/>
            </article>
        </>
    )
}

export default Card
