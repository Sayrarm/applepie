import styles from './Memories.module.css'
import {memoriesData} from '../data/memories-data.js'
import Card from "../components/Card.jsx";

function Memories() {


    return (
        <>
            <section className={styles.memories}>
                <nav className={styles.sortBy}>
                    <div >
                        <button>ALL</button>
                    </div>
                    <div>
                        <button>Xavier</button>
                        <button>Zayne</button>
                        <button>Rafayel</button>
                        <button>Sylus</button>
                        <button>Caleb</button>
                    </div>
                </nav>
                <aside className={styles.filterBy}>
                    <button>Sorting by</button>
                    <button>Filter</button>
                </aside>
                <div className={styles.cardsGrid}>
                    {memoriesData.map(memory => (
                        <Card key={memory.id} data={memory}/>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Memories
