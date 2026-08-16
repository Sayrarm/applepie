import styles from "@pages/main/Home.module.css";

const HunterContestDescription = ({
  mainIconSrc = "",
  mainIconCount = 0,
  extraIcons = [], // массив дополнительных иконок: [{ src: '', count: 1 }, ...]
  title = "",
  description = "",
  className = "",
}) => {
  // Собираем все иконки в один массив
  const allIcons = [];

  // Добавляем основные иконки
  for (let i = 0; i < mainIconCount; i++) {
    allIcons.push(mainIconSrc);
  }

  // Добавляем дополнительные иконки
  extraIcons.forEach((icon) => {
    for (let i = 0; i < icon.count; i++) {
      allIcons.push(icon.src);
    }
  });

  return (
    <div className={className}>
      <div className={styles.stellaImgContainer}>
        {allIcons.map((src, index) => (
          <img
            key={index}
            className={styles.stellacrumImg}
            src={src}
            alt={`icon-${index}`}
          />
        ))}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HunterContestDescription;
