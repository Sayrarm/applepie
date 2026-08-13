//card-article-data
export {
  memoryStats,
  ascendData3star,
  ascendData4star,
  ascendData5star,
} from "./card-article-data/levelCardData.js";
export {
  calculateDmgBoost,
  getStatsWithRank,
} from "./card-article-data/levelCardFunctions.js";
export { memoriesData } from "./card-article-data/memories-data.js";
export { obtainData } from "./card-article-data/obtain-data.js";
export {
  calculateProtocoreStats,
  calculateFinalStats,
  getProtocoreLevelsString,
} from "./card-article-data/protocoreUtils.js";
export { solar4Stars } from "./card-article-data/solar-4-star-info.js";
export { storyCardInfo } from "./card-article-data/story-card-info.js";

//companion-battle-data
export { asideComp } from "./companion-battle-data/aside-comp.js";
export { compData } from "./companion-battle-data/comp-data.js";
export { default as glossary } from "./companion-battle-data/glossary.js";

//lore-data
export { anCategories } from "./lore-data/an-categories.js";
export { anData } from "./lore-data/an-data.js";
export { charactersCategories } from "./lore-data/characters-categories.js";
export { charactersData } from "./lore-data/characters-data.js";
export { msCategories } from "./lore-data/ms-categories.js";
export { msData } from "./lore-data/ms-data.js";
export { spacepediaData } from "./lore-data/spacepedia-data.js";
export { wuCategories } from "./lore-data/wu-categories.js";
export { wuData } from "./lore-data/wu-data.js";

//main-page-data
export { battlePassData } from "./main-page-data/battle-pass-data.js";
export { eventsData } from "./main-page-data/events-data.js";
export { hunterContestBuffs } from "./main-page-data/hunter-contest-buffs.js";

//showcase-data
export { affinityData } from "./showcase-data/affinity-data.js";
export {
  compDataShowcaseDefault5star,
  compDataShowcaseDefault4star,
  compDataShowcaseSpecific,
  weaponDataShowcaseSpecific,
} from "./showcase-data/comp-data-showcase.js";
export {
  calculateDamage,
  createDamageCalculator,
  calculateDamageWithBonuses,
  calculateAllDamageTypes,
} from "./showcase-data/damageCalculator.js";

//about-data
export { aboutData } from "./about-data.js";
export { bannersDataFull } from "./banners-data-full.js";
export {
  rarityLevels,
  expDungeonData,
  crystalDungeonData,
  crystalTypesDungeons,
  DUNGEON_COST,
} from "./calculator-data/memory-up-data.js";
export {
  getCrystalDungeonByColor,
  getExpNeeded,
  getUpgradeResources,
  getExpDungeonRuns,
  getCrystalDungeonRuns,
  getStaminaCost,
} from "./calculator-data/memory-up-functions.js";
export {
  bottles,
  wish,
  diamond,
  heartSand,
  crystalColors,
  crystalTypes,
  bossImg,
  crystalIcons,
  crystalBox,
  hearts,
  coreEnergy,
  credits,
} from "./calculator-data/my-resources-data.js";
export {
  getHeartsandExchange,
  getCrystalBoxExchange,
  getHeartInfo,
  getHeartCount,
  getWishExchange,
} from "./calculator-data/my-resources-functions.js";
export {
  levelUpData,
  MAX_LEVEL,
  dungeonData,
  DUNGEON_COST_PROTOCORE,
  creditDungeonData,
  CREDIT_DUNGEON_COST,
  SUBSTAT_LEVELS,
  protocoreTypes,
  protocoreColor,
} from "./calculator-data/protocore-data.js";
export {
  getMainStatValue,
  getSubstatUpgradeInfo,
  getRequiredExp,
  getRequiredCredits,
  getRequiredDungeonRuns,
  getRequiredStamina,
  getCreditDungeonRuns,
  getStaminaForCredits,
} from "./calculator-data/protocore-functions.js";
