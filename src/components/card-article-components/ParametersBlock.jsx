import { useRef } from "react";
import styles from "./ParametersBlock.module.css";
import { getImageUrl } from "@hooks";
import { ModalWindow } from "@components";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

function ParametersBlock({ card }) {
  const parametersModalRef = useRef();
  const { t } = useTranslation();

  const showParametersModal = () => {
    parametersModalRef.current.showModal();
  };

  if (!card) return null;

  return (
    <>
      <button
        onClick={showParametersModal}
        className={styles.parametersContainer}
      >
        <div className={styles.generalContainer}>
          <span>Rarity:</span>
          {[...Array(card.rarityStars)].map((_, i) => (
            <img
              className={styles.rarity}
              key={i}
              src={getImageUrl(card.rarity)}
              alt={card.rarityName}
              width={24}
              height={24}
            />
          ))}
        </div>

        <div className={styles.borderVertical}></div>

        <div className={styles.generalContainer}>
          <span>Stellactrum:</span>
          <img
            className={styles.stella}
            src={getImageUrl(card.stella)}
            alt={card.stellaName}
            width={24}
            height={24}
          />
        </div>

        <div className={styles.borderVertical}></div>

        <div className={styles.generalContainer}>
          <span>Placement:</span>
          <img
            className={styles.placement}
            src={getImageUrl(card.placement)}
            alt={card.placementName}
            width={24}
            height={24}
          />
        </div>

        <div className={styles.borderVertical}></div>

        <div className={styles.generalContainer}>
          <span>Talent:</span>
          <img
            className={styles.talent}
            src={getImageUrl(card.talent)}
            alt={card.talentName}
            width={24}
            height={24}
          />
        </div>
      </button>

      <ModalWindow
        ref={parametersModalRef}
        title={"Hints for parameters"}
        tag={
          <div className={styles.modalInfo}>
            <div>
              <img
                className={styles.img}
                src={getImageUrl("../assets/main-page/modal-window/stella.png")}
                alt={"stellactrum"}
              />

              <div>
                <h3>{t('ParametersBlock.titleStella')}</h3>
                <Trans
                    i18nKey="ParametersBlock.stellaText1"
                    components={{ mem: <strong/>, field: <strong/>, shield: <strong/> }}
                >
                          When <strong>Memory Stellactrum</strong> and <strong>Protofield Stellactrum</strong> are aligned, double the number of <strong>Protocore Shield</strong> stacks destroyed.
                </Trans>
                <br/>
                <Trans
                    i18nKey="ParametersBlock.stellaText2"
                    components={{ dmg: <strong/>, red: <strong/>}}
                >
                  For every additionally matched Stellactrums, there’s an increase on <strong>DMG</strong> and <strong>DMG Reduction</strong>.
                </Trans>
              </div>
            </div>

            <div>
              <img
                className={styles.img}
                src={getImageUrl(
                  "../assets/main-page/modal-window/placement.png",
                )}
                alt={"stellactrum"}
              />

              <div>
                <h3>{t('ParametersBlock.titleModalPlacement')}</h3>
                <p>{t('ParametersBlock.placementText1')}</p>
                <Trans
                    i18nKey="ParametersBlock.placementText2"
                    components={{ solar: <strong/>}}
                >
                  <strong>Solar Slot:</strong> Only Solar Memories can form Memory Pairs to activate pair bonuses. Ranking up Solar Memories will enhance pair bonuses. Up to two can be equipped per team.
                </Trans>
                <br/>
                <Trans
                    i18nKey="ParametersBlock.placementText3"
                    components={{ lunar: <strong/>}}
                >
                  <strong>Lunar Slot:</strong> Provides stat bonuses to boost combat capabilities. Up to four can be equipped per team.
                </Trans>
              </div>
            </div>

            <div>
              <img
                className={styles.img}
                src={getImageUrl("../assets/main-page/modal-window/talent.png")}
                alt={"stellactrum"}
              />

              <div>
                <h3>{t('ParametersBlock.titleModalTalent')}</h3>
                <Trans
                    i18nKey="ParametersBlock.talentText1"
                    components={{ hp: <strong/>}}
                >
                  <strong>HP Buff:</strong> When HP is above 8 000, every 400 HP more boosts your weakness DMG by 0.2%
                </Trans>
                <br/>
                <Trans
                    i18nKey="ParametersBlock.talentText2"
                    components={{ atk: <strong/>}}
                >
                  <strong>ATK Buff:</strong> When ATK is above 400, every 20 ATK more boosts your weakness DMG by 0.2%
                </Trans>
                <br/>
                <Trans
                    i18nKey="ParametersBlock.talentText3"
                    components={{ def: <strong/>}}
                >
                  <strong>DEF Buff:</strong> When DEF is above 200, every 10 DEF more boosts your weakness DMG by 0.2%
                </Trans>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default ParametersBlock;
