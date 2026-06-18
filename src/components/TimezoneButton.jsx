import { useTimezone } from './TimezoneContext';
import styles from './TimezoneButton.module.css';

function TimezoneButton() {
    const { timezone, setTimezone } = useTimezone();

    const timezones = [
        { label: 'EU', value: '+02:00' },
        { label: 'Asia', value: '+08:00' },
        { label: 'NA', value: '-07:00' }
    ];

    const currentIndex = timezones.findIndex(tz => tz.value === timezone);
    const nextIndex = (currentIndex + 1) % timezones.length;
    const nextTimezone = timezones[nextIndex];

    const getCurrentLabel = () => {
        return timezone === '+02:00' ? 'EU' :
            timezone === '+08:00' ? 'Asia' :
                'NA';
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