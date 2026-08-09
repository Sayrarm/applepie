import { Collapse } from "antd";
import { createStaticStyles } from 'antd-style';
import styles from "./AsideList.module.css";

const classNames = createStaticStyles(({ css }) => ({
    root: css`
        background-color: var(--bg-glass);
        box-shadow: var(--box-shadow);
        border-radius: 0;
        text-decoration: none;
        color: var(--colorTextDark);
        padding: 0;
    `,
}));

function AsideList({
                       className,
                       title,           // Заголовок всего блока
                       items,           // Массив для Collapse
                       collapseProps    // Дополнительные пропсы для Collapse (опционально)
                   }) {
    const sharedProps = { classNames, items };

    return (
        <aside className={className}>
            <nav className={styles.nav}>
                <h1 className={styles.title}>{title}</h1>
                <Collapse
                    {...sharedProps}
                    {...collapseProps}
                    ghost
                    className={styles.collapse}
                    items={items}
                    accordion
                />
            </nav>
        </aside>
    );
}

export default AsideList;