
import { Spin } from 'antd';
import { useState, useEffect } from 'react';

function PageLoader({ children, delay = 50 }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Таймер для имитации загрузки
        const timer = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]); // ← срабатывает при каждом монтировании компонента

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh'
            }}>
                <Spin size="large" description="Loading..." />
            </div>
        );
    }

    return <>{children}</>;
}

export default PageLoader;