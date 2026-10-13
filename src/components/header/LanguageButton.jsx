import { useTranslation } from "react-i18next";
import styles from "@components/header/TimezoneButton.module.css";
import { saveLanguage } from "@localstorage";

function LanguageButton() {
    const { t, i18n } = useTranslation();

    const currentLang = i18n.language;
    const label = currentLang.toUpperCase();

    const handleClick = () => {
        const nextLang = currentLang === "en" ? "ru" : "en";
        i18n.changeLanguage(nextLang);
        saveLanguage(nextLang);
    };

    return (
        <button
            className={styles.button}
            onClick={handleClick}
            title={t('change_language')}
        >
            {label}
        </button>
    );
}

export default LanguageButton;