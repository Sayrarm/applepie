import { useState, useEffect, useCallback } from 'react';
import styles from './BackTopButton.module.css'
import {getImageUrl} from "../../hooks/imageUtils.js";


function BackTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Мгновенная реакция без задержек
                    setVisible(window.scrollY > 100);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className={styles.button}
        >
            <img className={styles.img} src={getImageUrl('../assets/icons/up-arrow.png')} alt="up"/>
        </button>
    );
}

export default BackTopButton;