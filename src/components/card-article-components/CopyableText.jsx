import styles from "./CopyableText.module.css";
import { useCopyToClipboard } from "@hooks";
import { useTranslation } from "react-i18next";

function CopyableText({ text, className, children }) {
  const { copyToClipboard, copied } = useCopyToClipboard();
  const { t } = useTranslation();

  const handleCopy = (e) => {
    e.stopPropagation(); // чтобы не срабатывали родительские onClick
    copyToClipboard(text);
  };

  return (
    <h1
      className={`${className} ${styles.copyableText}`}
      onClick={handleCopy}
      style={{ cursor: "pointer" }}
      title={t('CopyableText.title')}
    >
      {children || text}
      {copied && <span className={styles.copyTooltip}>{t('CopyableText.text')}</span>}
    </h1>
  );
}

export default CopyableText;
