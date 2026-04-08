import styles from './Memories.module.css'
import { memoriesData } from '../data/memories-data.js'
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
                <div className={styles.cardsGrid}>
                    {memoriesData.map(memory => (
                        <Card key={memory.id} data={memory} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Memories
