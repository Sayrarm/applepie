import { AsideList } from "@components";
import styles from "./AsideCompanionList.module.css";
import { Link } from "react-router-dom";
import { getImageUrl } from "@hooks";
import { asideComp } from "@data";

function AsideCompanionList({ className }) {
  // Формируем items для Collapse
  const items = asideComp.map((charData, index) => {
    const list = charData.weapons || charData.companions || [];
    const linkPath = charData.weapons ? "/battle/" : "/battle/";

    return {
      key: String(index + 1),
      label: charData.char,
      children: (
        <>
          {list.map((item) => (
            <div key={item.link}>
              <Link className={styles.link} to={`${linkPath}${item.link}`}>
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

  return (
    <AsideList
      className={className}
      title="Companions and MC Weapons"
      items={items}
    />
  );
}

export default AsideCompanionList;
