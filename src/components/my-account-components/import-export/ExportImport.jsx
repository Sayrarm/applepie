import DataManager from "./DataManager.jsx";
import AccountSwitcher from "./AccountSwitcher.jsx";
import styles from "./DataManager.module.css";

function ExportImport() {
  return (
    <section className={styles.exportContainer}>
      <DataManager />
      <AccountSwitcher />
    </section>
  );
}

export default ExportImport;
