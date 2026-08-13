import ChooseCompanionAndWeapon from "./showcase/ChooseCompanionAndWeapon.jsx";
import styles from "./Optimizer.module.css";

function Optimizer() {
  return (
    <>
      <section>
        <section>
          <ChooseCompanionAndWeapon />

          <section className={styles.protocoreStats}>
            <div>
              <button>Main stat</button>
              <button>sub stat</button>
              <button>sub stat</button>
              <button>sub stat</button>
            </div>
            <div>
              <button>Beta 1</button>
              <button>Beta 2</button>
              <button>Delta</button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Optimizer;
