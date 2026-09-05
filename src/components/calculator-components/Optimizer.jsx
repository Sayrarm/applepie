import styles from "./Optimizer.module.css";
import {ChooseCompanion, ChooseWeapon} from "@components";

function Optimizer() {
  return (
    <section className={styles.container}>
      <ChooseCompanion />
      <ChooseWeapon />
        <section>
            Main stat:
            <button></button>
        </section>
    </section>
  );
}

export default Optimizer;
