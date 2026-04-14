import styles from './Memories.module.css'
import {memoriesData} from '../data/memories-data.js'
import Card from "../components/Card.jsx";
import { Input, Space } from 'antd';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

function Memories() {


    return (
        <>
            <section className={styles.memories}>
                <nav className={styles.sortBy}>
                    <div>
                        <button className={styles.allButton}>ALL</button>
                    </div>
                    <div className={styles.characters}>
                        <button>Xavier</button>
                        <button>Zayne</button>
                        <button>Rafayel</button>
                        <button>Sylus</button>
                        <button>Caleb</button>
                    </div>
                </nav>
                <aside className={styles.filterBy}>
                    <Space vertical>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </Space>
                    <button>Sort</button>
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
