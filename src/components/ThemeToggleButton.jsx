import React from 'react';
import { useTheme } from './ThemeChange';
import styles from './ThemeToggleButton.module.css';
import {getImageUrl} from "./imageUtils.js";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={styles.button} // Твой CSS класс
            aria-label="Switch the theme"
        >
            {theme === 'light' && <img className={styles.img} src={getImageUrl('../assets/icons/sun_18764318.png')} alt="Light" />}
            {theme === 'dark' && <img className={styles.img} src={getImageUrl('../assets/icons/night-mode_18764409.png')} alt="Dark" />}
            {/* Можно добавить иконку '🖥️' для режима 'system', если хочешь */}
        </button>
    );
};

export default ThemeToggleButton;