import styles from "./MyResources.module.css";
import {
  bottles,
  heartSand,
  crystalColors,
  crystalTypes,
  crystalIcons,
  crystalBox,
  hearts,
  coreEnergy,
  credits,
  wish,
  diamond,
  capsules,
  getHeartsandExchange,
  getCrystalBoxExchange,
  getWishExchange,
} from "@data";
import { getImageUrl, useResources } from "@hooks";

function MyResources() {
  // ===== ИСПОЛЬЗУЕМ ХУК =====
  const {
    bottles: bottlesState,
    heartsand: heartsandState,
    crystals: crystalsState,
    crystalBoxes: crystalBoxesState,
    hearts: heartsState,
    coreEnergy: coreEnergyState,
    credits: creditsState,
    selectedCrystalColor,
    setSelectedCrystalColor,
    diamonds: diamondsState,
    wish: wishState,
    capsules: capsulesState,
    setBottles,
    setHeartsand,
    setCrystals,
    setCrystalBoxes,
    setHearts,
    setCoreEnergy,
    setCredits,
    setDiamonds,
    setWish,
    setCapsules,
    updateCount,
  } = useResources();

  // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ПОДСЧЁТОВ =====
  const getTotalBottleExp = () => {
    let total = 0;
    bottles.forEach((bottle) => {
      const count = bottlesState[bottle.id] || 0;
      total += count * (bottle.value || 0);
    });
    return total;
  };

  // Подсчёт общего EXP для Core Energy
  const getTotalCoreEnergyExp = () => {
    let total = 0;
    coreEnergy.forEach((energy) => {
      const count = coreEnergyState[energy.id] || 0;
      total += count * (energy.value || 0);
    });
    return total;
  };

  const getTotalStaminaExp = () => {
    let total = 0;
    capsules.forEach((stamina) => {
      const count = capsulesState[stamina.id] || 0;
      total += count * (stamina.value || 0);
    });
    return total;
  };

  // Функция для получения иконки кристалла по цвету и типу
  const getCrystalIcon = (color, typeId) => {
    if (!color || !typeId) return null;
    const colorIcons = crystalIcons[color];
    if (!colorIcons) return null;
    return colorIcons[typeId] || null;
  };

  // ===== ОБРАБОТЧИКИ ИЗМЕНЕНИЙ =====
  const handleCrystalChange = (color, typeId, value) => {
    const key = `${color}_${typeId}`;
    const newState = { ...crystalsState };
    newState[key] = Math.max(0, Number(value) || 0);
    setCrystals(newState);
  };

  const handleCreditsChange = (value) => {
    if (value === "" || Number(value) >= 0) {
      setCredits(value);
    }
  };

  const handleCreditsBlur = (value) => {
    if (value === "" || value === "0") {
      setCredits("0");
    } else {
      setCredits(String(Number(value)));
    }
  };

  const handleDiamondsChange = (value) => {
    if (value === "" || Number(value) >= 0) {
      setDiamonds(value);
    }
  };

  const handleDiamondsBlur = (value) => {
    if (value === "" || value === "0") {
      setDiamonds("0");
    } else {
      setDiamonds(String(Number(value)));
    }
  };

  const handleCapsuleChange = (id, value) => {
    const newState = { ...capsulesState };
    newState[id] = Math.max(0, Number(value) || 0);
    setCapsules(newState);

    window.dispatchEvent(new CustomEvent("resourcesUpdated"));
  };

  // ===== ОЧИСТКА ВСЕХ РЕСУРСОВ =====
  const clearAllResources = () => {
    const confirmMessage =
      `⚠️ WARNING: This will permanently delete ALL your resource data!\n\n` +
      `This includes:\n` +
      `• Bottles of Wishes\n` +
      `• Core Energy\n` +
      `• Credits\n` +
      `• Crystals\n` +
      `• Memory Heartsand\n` +
      `• Ascension Crystal Boxes\n` +
      `• Awakening Hearts\n` +
      `• Diamonds\n` +
      `• Wishes\n` +
      `• Energy Capsules\n\n` +
      `Are you absolutely sure you want to continue?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    // Очищаем все состояния
    setBottles({});
    setHeartsand({});
    setCrystals({});
    setCrystalBoxes({});
    setHearts({});
    setCoreEnergy({});
    setCredits("0");
    setDiamonds("0");
    setWish({});
    setCapsules({});

    // Отправляем событие об обновлении ресурсов
    window.dispatchEvent(new CustomEvent("resourcesUpdated"));

    alert("✅ All resources cleared successfully!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Resources</h1>

      {/* Bottles of Wishes */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Bottles of Wishes</h2>
          <div className={styles.totalExp}>
            Total: {getTotalBottleExp().toLocaleString()} EXP
          </div>
        </div>
        <div className={styles.itemsGrid}>
          {bottles.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <div className={styles.itemDiv}>
                <span className={styles.itemValue}>+{item.value} EXP</span>
                <input
                  id={`input-${item.id}`}
                  name="item"
                  type="number"
                  min="0"
                  value={bottlesState[item.id] || ""}
                  onChange={(e) =>
                    updateCount(
                      bottlesState,
                      setBottles,
                      item.id,
                      e.target.value,
                    )
                  }
                  className={styles.itemInput}
                  onFocus={(e) => {
                    if (e.target.value === "0") {
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crystals - с выбором цвета */}
      <div className={styles.section}>
        <h2>Crystals</h2>
        <div className={styles.crystalColorRow}>
          <div className={styles.colorButtons}>
            {crystalColors.map((color) => (
              <button
                key={color.id}
                className={`${styles.colorButton} ${selectedCrystalColor === color.id ? styles.active : ""}`}
                onClick={() => setSelectedCrystalColor(color.id)}
              >
                <img
                  src={getImageUrl(color.img)}
                  alt={color.name}
                  className={styles.colorIcon}
                />
                {color.name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.itemsGrid}>
          {crystalTypes.map((item) => {
            // Получаем иконку для выбранного цвета и текущего типа
            const iconPath = getCrystalIcon(selectedCrystalColor, item.id);
            return (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.itemDiv}>
                  {iconPath && (
                    <img
                      src={getImageUrl(iconPath)}
                      alt={`${selectedCrystalColor} ${item.name}`}
                      className={styles.itemIcon}
                    />
                  )}
                  <label
                    htmlFor={`input-${item.id}`}
                    className={styles.itemName}
                  >
                    {selectedCrystalColor} {item.name}
                  </label>
                </div>
                <input
                  id={`input-${item.id}`}
                  name="item"
                  type="number"
                  min="0"
                  value={
                    crystalsState[`${selectedCrystalColor}_${item.id}`] || ""
                  }
                  onChange={(e) =>
                    handleCrystalChange(
                      selectedCrystalColor,
                      item.id,
                      e.target.value,
                    )
                  }
                  className={styles.itemInput}
                  onFocus={(e) => {
                    if (e.target.value === "0") {
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Energy */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Core Energy</h2>
          <div className={styles.totalExp}>
            Total: {getTotalCoreEnergyExp().toLocaleString()} EXP
          </div>
        </div>
        <div className={styles.itemsGrid}>
          {coreEnergy.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <div className={styles.itemDiv}>
                <span className={styles.itemValue}>+{item.value} EXP</span>
                <input
                  id={`input-${item.id}`}
                  name="item"
                  type="number"
                  min="0"
                  value={coreEnergyState[item.id] || ""}
                  onChange={(e) =>
                    updateCount(
                      coreEnergyState,
                      setCoreEnergy,
                      item.id,
                      e.target.value,
                    )
                  }
                  className={styles.itemInput}
                  onFocus={(e) => {
                    if (e.target.value === "0") {
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credits */}
      <div className={styles.section}>
        <h2>Credits</h2>
        <div className={styles.itemsGrid}>
          {credits.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <input
                id={`input-${item.id}`}
                name="item"
                type="number"
                min="0"
                value={creditsState}
                onChange={(e) => handleCreditsChange(e.target.value)}
                className={styles.itemInput}
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => handleCreditsBlur(e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Awakening Hearts */}
      <div className={styles.section}>
        <h2>Awakening Hearts</h2>
        <div className={styles.itemsGrid}>
          {hearts.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <input
                id={`input-${item.id}`}
                name="item"
                type="number"
                min="0"
                value={heartsState[item.id] || ""}
                onChange={(e) =>
                  updateCount(heartsState, setHearts, item.id, e.target.value)
                }
                className={styles.itemInput}
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ascension Crystal Box */}
      <div className={styles.section}>
        <h2>Ascension Crystal Box</h2>
        <div className={styles.itemsGrid}>
          {crystalBox.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <input
                id={`input-${item.id}`}
                name="item"
                type="number"
                min="0"
                value={crystalBoxesState[item.id] || ""}
                onChange={(e) =>
                  updateCount(
                    crystalBoxesState,
                    setCrystalBoxes,
                    item.id,
                    e.target.value,
                  )
                }
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    updateCount(crystalBoxesState, setCrystalBoxes, item.id, 0);
                  }
                }}
                className={styles.itemInput}
              />
            </div>
          ))}
        </div>

        {/* Информация об обмене General Box */}
        {crystalBoxesState["box_general"] > 0 && (
          <div className={styles.exchangeSection}>
            <h3 className={styles.exchangeTitle}>
              Ascension Crystal Box: General can be exchanged for:
            </h3>
            <div className={styles.exchangeContent}>
              {(() => {
                const exchange = getCrystalBoxExchange(crystalBoxesState);
                return (
                  <div className={styles.exchangeGrid}>
                    <div className={styles.exchangeCard}>
                      <img
                        src={getImageUrl("../assets/icons/gray-n.png")}
                        alt="Crystal N"
                        className={styles.itemIconGray}
                      />
                      <span className={styles.exchangeItem}>Crystal</span>
                      <span className={styles.exchangeValue}>
                        N: {exchange.toN}
                      </span>
                    </div>
                    or
                    <div className={styles.exchangeCard}>
                      <img
                        src={getImageUrl("../assets/icons/gray-r.png")}
                        alt="Crystal R"
                        className={styles.itemIconGray}
                      />
                      <span className={styles.exchangeItem}>Crystal</span>
                      <span className={styles.exchangeValue}>
                        R: {exchange.toR}
                      </span>
                    </div>
                    or
                    <div className={styles.exchangeCard}>
                      <img
                        src={getImageUrl("../assets/icons/gray-sr.png")}
                        alt="Crystal SR"
                        className={styles.itemIconGray}
                      />
                      <span className={styles.exchangeItem}>Crystal</span>
                      <span className={styles.exchangeValue}>
                        SR: {exchange.toSR}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className={styles.exchangeNote}>
              * Exchange rates: 1 General Box for either 5 N, or 2 R, or 1 SR
            </div>
          </div>
        )}
      </div>

      {/* Memory Heartsand */}
      <div className={styles.section}>
        <h2>Memory Heartsand</h2>
        <div className={styles.itemsGrid}>
          {heartSand.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <input
                id={`input-${item.id}`}
                name="item"
                type="number"
                min="0"
                value={heartsandState[item.id] || ""}
                onChange={(e) =>
                  updateCount(
                    heartsandState,
                    setHeartsand,
                    item.id,
                    e.target.value,
                  )
                }
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    updateCount(heartsandState, setHeartsand, item.id, 0);
                  }
                }}
                className={styles.itemInput}
              />
            </div>
          ))}
        </div>

        {/* Информация об обмене Memory Heartsand */}
        {(() => {
          const exchange = getHeartsandExchange(heartsandState);
          const hasBottles = exchange.bottles.hasAny;
          const hasCredits = exchange.credits.total > 0;

          if (!hasBottles && !hasCredits) return null;

          return (
            <div className={styles.exchangeSection}>
              <h3 className={styles.exchangeTitle}>
                Memory Heartsand can be exchanged for:
              </h3>
              <div className={styles.exchangeGrid}>
                {/* Карточка обмена на Bottles */}
                {hasBottles && (
                  <div className={styles.exchangeGridBottles}>
                    {exchange.bottles.R > 0 && (
                      <div className={styles.exchangeCard}>
                        <div className={styles.exchangeItem}>
                          Bottle of Wishes
                        </div>
                        <img
                          src={getImageUrl(bottles[1].img)}
                          alt="Bottle R"
                          className={styles.itemIconGray}
                        />
                        <div className={styles.exchangeValue}>
                          R: {exchange.bottles.R}
                        </div>
                      </div>
                    )}
                    {exchange.bottles.SR > 0 && (
                      <div className={styles.exchangeCard}>
                        <div className={styles.exchangeItem}>
                          Bottle of Wishes
                        </div>
                        <img
                          src={getImageUrl(bottles[2].img)}
                          alt="Bottle SR"
                          className={styles.itemIconGray}
                        />
                        <div className={styles.exchangeValue}>
                          SR: {exchange.bottles.SR}
                        </div>
                      </div>
                    )}
                    {exchange.bottles.SSR > 0 && (
                      <div className={styles.exchangeCard}>
                        <div className={styles.exchangeItem}>
                          Bottle of Wishes
                        </div>
                        <img
                          src={getImageUrl(bottles[3].img)}
                          alt="Bottle SSR"
                          className={styles.itemIconGray}
                        />
                        <div className={styles.exchangeValue}>
                          SSR: {exchange.bottles.SSR}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                or
                {/* Карточка обмена на Credits */}
                {hasCredits && (
                  <div className={styles.exchangeValue}>
                    <div className={styles.exchangeCard}>
                      <div className={styles.exchangeItem}>Credits</div>
                      <img
                        src={getImageUrl(credits[0].img)}
                        alt="Credits"
                        className={styles.itemIconGray}
                      />
                      {exchange.credits.total.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.exchangeNote}>
                * Exchange rates: 10 MH R → 5 Bottle R | 5 MH SR → 5 Bottle SR |
                4 MH SSR → 5 Bottle SSR
                <br />
                100 MH R → 50,000 Credits | 10 MH SR → 50,000 Credits | 2 MH SSR
                → 50,000 Credits
              </div>
            </div>
          );
        })()}
      </div>

      {/* Diamonds */}
      <div className={styles.section}>
        <h2>Diamonds</h2>
        <div className={styles.itemsGrid}>
          {diamond.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <input
                id={`input-${item.id}`}
                name="item"
                type="number"
                min="0"
                value={diamondsState}
                onChange={(e) => handleDiamondsChange(e.target.value)}
                className={styles.itemInput}
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => handleDiamondsBlur(e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Информация об обмене Diamonds на Wishes */}
        {(() => {
          const exchange = getWishExchange(diamondsState);
          const hasWishes =
            exchange.wishes.standart > 0 ||
            exchange.wishes.limited > 0 ||
            exchange.wishes.rerun > 0;

          if (!hasWishes) return null;

          return (
            <div className={styles.exchangeSection}>
              <h3 className={styles.exchangeTitle}>
                Diamonds can be exchanged for:
              </h3>
              <div className={styles.exchangeGrid}>
                {exchange.wishes.standart > 0 && (
                  <div className={styles.exchangeCard}>
                    <div className={styles.exchangeItem}>Empyrean Wish</div>
                    <img
                      src={getImageUrl(wish[0].img)}
                      alt="Empyrean Wish"
                      className={styles.itemIconGray}
                    />
                    <div className={styles.exchangeValue}>
                      {exchange.wishes.standart}
                    </div>
                  </div>
                )}
                or
                {exchange.wishes.rerun > 0 && (
                  <div className={styles.exchangeCard}>
                    <div className={styles.exchangeItem}>Time Wish</div>
                    <img
                      src={getImageUrl(wish[2].img)}
                      alt="Time Wish"
                      className={styles.itemIconGray}
                    />
                    <div className={styles.exchangeValue}>
                      {exchange.wishes.rerun}
                    </div>
                  </div>
                )}
                or
                {exchange.wishes.limited > 0 && (
                  <div className={styles.exchangeCard}>
                    <div className={styles.exchangeItem}>Deepspace Wish</div>
                    <img
                      src={getImageUrl(wish[1].img)}
                      alt="Deepspace Wish"
                      className={styles.itemIconGray}
                    />
                    <div className={styles.exchangeValue}>
                      {exchange.wishes.limited}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.exchangeNote}>
                * Exchange rate: 1 Wish = 150 Diamonds
              </div>
            </div>
          );
        })()}
      </div>

      {/* Wish */}
      <div className={styles.section}>
        <h2>Wishes</h2>
        <div className={styles.itemsGrid}>
          {wish.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <input
                id={`input-${item.id}`}
                name="item"
                type="number"
                min="0"
                value={wishState[item.id] || ""}
                onChange={(e) =>
                  updateCount(wishState, setWish, item.id, e.target.value)
                }
                className={styles.itemInput}
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    updateCount(wishState, setWish, item.id, 0);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Capsules */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Energy Capsules</h2>
          <div className={styles.totalExp}>
            Total: {getTotalStaminaExp().toLocaleString()} stamina
          </div>
        </div>
        <div className={styles.itemsGrid}>
          {capsules.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.itemDiv}>
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  className={styles.itemIcon}
                />
                <label htmlFor={`input-${item.id}`} className={styles.itemName}>
                  {item.name}
                </label>
              </div>
              <div className={styles.itemDiv}>
                <span className={styles.itemValue}>+{item.value} stamina</span>
                <input
                  id={`input-${item.id}`}
                  name="item"
                  type="number"
                  min="0"
                  value={capsulesState[item.id] || ""}
                  onChange={(e) => handleCapsuleChange(item.id, e.target.value)}
                  className={styles.itemInput}
                  onFocus={(e) => {
                    if (e.target.value === "0") {
                      e.target.value = "";
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      handleCapsuleChange(item.id, 0);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.clearAllButton} onClick={clearAllResources}>
        🗑️ Clear All
      </button>
    </div>
  );
}

export default MyResources;
