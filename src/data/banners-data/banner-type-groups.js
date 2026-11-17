export const BANNER_TYPE_GROUPS = {
  banner: ["multi", "solo", "myth", "standard", "birthday"],
  promise: ["promise"],
  "oracle-of-stars": ["oracle-of-stars"],
  "fondess-treasure": ["fondess-treasure"],
  "illusia-locus": ["illusia-locus"],
  "10-days-with-you": ["10-days-with-you"],
  "heartfelt-gift": ["heartfelt-gift"],
  "kitty-tokens": ["kitty-tokens"],
  plushie: ["plushie"],
  "double-protocore": ["double-protocore"],
  "double-bounty-hunt": ["double-bounty-hunt"],
  illusio: ["illusio"],
  event: ["event"],
  "memory-growth": ["memory-growth"],
  "companion-rehearsal": ["companion-rehearsal"],
  "bd-event": ["bd-event"],
  "branch-event": ["branch-event"],
  "myth-event": ["myth-event"],
  "festive-blessing": ["festive-blessing"],
  "sweetie-silk": ["sweetie-silk"],
  "touring-in-love": ["touring-in-love"],
};

export const ALL_BANNER_TYPE_GROUPS = Object.keys(BANNER_TYPE_GROUPS);

// Спец-группа, которая фильтруется по cardIds, а не по type
export const SPECIAL_GROUPS = {
  "events-cards": (banner) =>
    banner.source === "events" &&
    Array.isArray(banner.cardIds) &&
    banner.cardIds.length > 0,
};