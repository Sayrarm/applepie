import { useTranslation } from "react-i18next";
import styles from "@components/header/TimezoneButton.module.css";

function LanguageButton() {
    const { t, i18n } = useTranslation();

    const currentLang = i18n.language;                        // 'en' или 'ru'
    const label = currentLang.toUpperCase();                  // 'EN' или 'RU'

    const handleClick = () => {
        i18n.changeLanguage(currentLang === "en" ? "ru" : "en");
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