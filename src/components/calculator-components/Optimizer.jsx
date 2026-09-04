import ChooseCompanionAndWeapon from "./showcase/ChooseCompanionAndWeapon.jsx";
import styles from "./Optimizer.module.css";

function Optimizer() {
  return (
    <>
      <section>
        <section>
          <ChooseCompanionAndWeapon />

          <section className={styles.protocoreStats}></section>
        </section>
      </section>
    </>
  );
}

export default Optimizer;
