import { Collapse } from "antd";
import { createStaticStyles } from 'antd-style';
import styles from "./AsideCompanionList.module.css";
import { Link } from "react-router-dom";
import { getImageUrl } from "./imageUtils.js";
import companionsData from '../data/aside-comp.json';

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

function AsideCompanionList({ className }) {
    // Формируем items для Collapse
    const items = companionsData.map((charData, index) => {
        // Для MC используем weapons, для остальных companions
        const list = charData.weapons || charData.companions || [];
        const linkPath = charData.weapons ? "/battle/" : "/battle/";

        return {
            key: String(index + 1),
            label: charData.char,
            children: (
                <>
                    {list.map((item) => (
                        <div key={item.link}>
                            <Link
                                className={styles.link}
                                to={`${linkPath}${item.link}`}
                            >
                                {item.name}
                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.link}
                                    className={styles.imgCompanion}
                                />
                            </Link>
                            <br />
                        </div>
                    ))}
                </>
            ),
        };
    });

    const sharedProps = { classNames, items };

    return (
        <aside className={className}>
            <nav>
                <h1 className={styles.title}>Companions and MC Weapons</h1>
                <Collapse
                    {...sharedProps}
                    ghost
                    className={styles.collapse}
                    items={items}
                    accordion
                />
            </nav>
        </aside>
    );
}

export default AsideCompanionList;