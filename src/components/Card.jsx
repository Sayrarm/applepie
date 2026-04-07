import styles from './Card.module.css'

function Card() {


    return (
        <>
            <article className={styles.card}>
                <img
                    src="/src/assets/pictures/b2_card_fy_0057.png" alt="caleb_1"
                    width={150}
                    height={200}
                />
                <div>stella</div>
                <div>lunar/solar</div>
                <div>lvl</div>
                <div>name</div>
                <div>rarity</div>
            </article>
        </>
    )
}

export default Card
