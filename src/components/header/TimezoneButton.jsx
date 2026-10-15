import { useTimezone } from "@components";
import styles from "./TimezoneButton.module.css";
import { useTranslation } from "react-i18next";

function TimezoneButton() {
  const { timezone, setTimezone } = useTimezone();
  const { t } = useTranslation();

  const timezones = [
    { label: "EU", value: "+02:00" },
    { label: "Asia", value: "+08:00" },
    { label: "NA", value: "-07:00" },
  ];

  const currentIndex = timezones.findIndex((tz) => tz.value === timezone);
  const nextIndex = (currentIndex + 1) % timezones.length;
  const nextTimezone = timezones[nextIndex];

  const getCurrentLabel = () => {
    return timezone === "+02:00"
      ? t('TimeZone.eu')
      : timezone === "+08:00"
        ? t('TimeZone.asia')
        : t('TimeZone.na');
  };

  return (
    <button
      className={styles.button}
      onClick={() => setTimezone(nextTimezone.value)}
      title={`Switch to ${nextTimezone.label}`}
    >
      {getCurrentLabel()}
    </button>
  );
}

export default TimezoneButton;
