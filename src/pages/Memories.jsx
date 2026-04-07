import styles from './Memories.module.css'
import Card from "../components/Card.jsx";

function Memories() {


    return (
        <>
            <section className={styles.memories}>
                <nav className={styles.nav}>
                    <button>ALL</button>
                    <button>Xavier</button>
                    <button>Zayne</button>
                    <button>Rafayel</button>
                    <button>Sylus</button>
                    <button>Caleb</button>
                </nav>
                <aside className={styles.memories}>
                    <button>Sorting by</button>
                    <button>Filter</button>
                </aside>
                <div>
                    <Card />
                </div>
            </section>
        </>
    )
}

export default Memories
