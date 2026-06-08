import styles from './Calculator.module.css'
import ProtocoreCalculator from "../components/ProtocoreCalculator.jsx";

function Calculator() {

return (

    <>
        <section className={styles.containerCalculator}>
            <ProtocoreCalculator />
        </section>
    </>

)

}

export default Calculator;