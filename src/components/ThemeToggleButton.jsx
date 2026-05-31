import React from 'react';
import { useTheme } from './ThemeChange';
import styles from './ThemeToggleButton.module.css';
import light from '../assets/icons/sun_18764318.png'
import dark from '../assets/icons/night-mode_18764409.png'

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={styles.button} // Твой CSS класс
            aria-label="Switch the theme"
        >
            {theme === 'light' && <img className={styles.img} src={light} alt="Light" />}
            {theme === 'dark' && <img className={styles.img} src={dark} alt="Dark" />}
            {/* Можно добавить иконку '🖥️' для режима 'system', если хочешь */}
        </button>
    );
};

export default ThemeToggleButton;