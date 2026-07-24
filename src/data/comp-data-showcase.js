export const compDataShowcaseDefault5star = {
    eidolon0: "+ 8% team DMG",
    buffEidolon0Stats: {
        teamDMG: 8,
    },
    eidolon1: "+ 20% Ardent Oath charge",
    buffEidolon1Stats: {
        ardentOathCharge: 20,
    },
    eidolon2: "+ 1 Energy Charge limit",
    eidolon3: "+ 8% team DMG",
    buffEidolon3Stats: {
        teamDMG: 8,
    },
}

export const compDataShowcaseDefault4star = {
    eidolon0: "+ 5% team DMG",
    buffEidolon0Stats: {
        teamDMG: 5,
    },
    eidolon1: "+ 10% Ardent Oath charge",
    buffEidolon1Stats: {
        ardentOathCharge: 10,
    },
    eidolon2: "reduces team DMG taken by 5%",
    eidolon3: "+ 5% team DMG",
    buffEidolon3Stats: {
        teamDMG: 5,
    },
}

export const compDataShowcaseSpecific = [
    {
        companionName: "Xavier: King of Darknight",
        cardIds: [199, 200],
        supportSkillFormula: "364 + 194% ATK + 17% of Max HP",
        supportSkillStats: {
            base: 364,
            atk: 194,
            hp: 17,
            def: 0
        },
        empoweredSupportSkillFormula: "216 + 115% ATK + 10% of Max HP",
        empoweredSupportSkillStats: {
            base: 216,
            atk: 115,
            hp: 10,
            def: 0
        },
        resonanceSkillFormula: "1767 + 942% ATK + 84% of Max HP",
        resonanceSkillStats: {
            base: 1767,
            atk: 942,
            hp: 84,
            def: 0
        },
        ardentOathFormula: "1800 + 960% ATK + 86% of Max HP",
        ardentOathStats: {
            base: 1800,
            atk: 960,
            hp: 86,
            def: 0
        },
        passiveSkillFormula1: `720 + 384 % ATK + 35 % of Max HP`,
        passiveSkillStats1: {
            base: 720,
            atk: 384,
            hp: 35,
            def: 0
        },
        passiveSkillFormula2: `520 + 277 % ATK + 25 % of Max HP`,
        passiveSkillStats2: {
            base: 520,
            atk: 277,
            hp: 25,
            def: 0
        },
        eidolon0: `The first hit of each Active Skill reduces Support Skill cooldown by 5s.
When not in [Darknight Reign] hitting enemies with Charged Attacks grants [Pilgrim's Prayer], increasing the accumulation rate of [Last Words] for 10s. Gaining it again refreshes duration.`,
        eidolon1: "When you create [Radiant Ripples], Support Skill cooldown is refreshed; [Radiant Ripples] damage increases by 40% When not in the [Darknight Reign] state, casting Resonance Skills grants you [Pilgrim's Prayer]. While [Darknight Reign] is active, you become unstoppable.",
        eidolon2: "While [Darknight Reign] is active, you and Xavier ignore 12.5% of enemy DEF and restore HP equal to 2% of Max HP per second.",
        eidolon3: `When you create [Radiant Ripples], Xavier will also create [Radiant Ripples].
While [Darknight Reign] is active, each time [Radiant Ripples] undulate, [Lumenflora]'s damage increases by 6%, up to 36%. This damage boost effect is cleared when [Darknight Reign] ends.`,
    },
    {
        companionName: "Xavier: Lumiere",
        cardIds: [197, 198],
        resonanceSkillFormula: "686 + 366% ATK + 1450% DEF",
        resonanceSkillStats: {
            base: 686,
            atk: 366,
            hp: 0,
            def: 1450
        },
        ardentOathFormula: "1440 + 780% ATK + 3060% DEF",
        ardentOathStats: {
            base: 1440,
            atk: 780,
            hp: 0,
            def: 3060
        },
        passiveSkillFormula1: `92 + 49% ATK + 194% DEF`,
        passiveSkillStats1: {
            base: 92,
            atk: 49,
            hp: 0,
            def: 194
        },
        eidolon0: "The enemy's [Moonstruck] state duration is extended by 3s.",
        eidolon1: "[Moonlight] deals 25% more DMG and applies 1 stack of [Phasing Moon] to the target.",
        eidolon2: "When [Moonlight] is triggered, your Active Skill cooldown is reduced by 0.5s and a small amount of Energy Charge is restored.",
        eidolon3: "When your Active Skills and Charged Attacks hit the first target inflicted with [Moonstruck], directly trigger [Moonlight]. When Moonlight scores a critical hit, it deals an additional 30% CRIT DMG.",
    },
    {
        companionName: "Xavier: Lightseeker",
        cardIds: [195, 196],
        supportSkillFormula: "300 + 400% ATK",
        supportSkillStats: {
            base: 300,
            atk: 400,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "347 + 462%",
        empoweredSupportSkillStats: {
            base: 347,
            atk: 462,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "641 + 854% ATK",
        resonanceSkillStats: {
            base: 686,
            atk: 366,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1440 + 1920% ATK",
        ardentOathStats: {
            base: 1440,
            atk: 1920,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: `150 + 200% ATK`,
        passiveSkillStats1: {
            base: 150,
            atk: 200,
            hp: 0,
            def: 0
        },
        eidolon0: "When fighting together with Lightseeker, your Active Skill DMG is increased by 25%.",
        eidolon1: "When fighting alongside Lightseeker, each time [Luminescent Resonance] triggers, [Radiant Blade]'s duration is extended by 2s.",
        eidolon2: "When you and Lightseeker are in [Luminescent Field], take 10% less DMG and gain increased Interruption Resistance.",
        eidolon3: "When fighting together with Lightseeker in the [Luminescent Field] and hitting enemies with a Charged Attack, the cooldown of your Active Skill will be reduced by 2s.",
    },
    {
        companionName: "Xavier: Evol Police",
        supportSkillFormula: "306 + 408% ATK",
        supportSkillStats: {
            base: 306,
            atk: 408,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "396 + 528% ATK",
        empoweredSupportSkillStats: {
            base: 396,
            atk: 528,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "726 + 968% ATK",
        resonanceSkillStats: {
            base: 726,
            atk: 968,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Xavier: Distant Youth",
        supportSkillFormula: "340 + 453% ATK",
        supportSkillStats: {
            base: 340,
            atk: 453,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "90 + 120% ATK",
        empoweredSupportSkillStats: {
            base: 90,
            atk: 120,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "739 + 986% ATK",
        resonanceSkillStats: {
            base: 739,
            atk: 986,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Xavier: Deepspace Hunter",
        supportSkillFormula: "330 + 440% ATK",
        supportSkillStats: {
            base: 330,
            atk: 440,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "420 + 560% ATK",
        empoweredSupportSkillStats: {
            base: 420,
            atk: 560,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "318 + 424% ATK",
        resonanceSkillStats: {
            base: 318,
            atk: 424,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Zayne: God of Annihilation",
        cardIds: [293, 294],
        supportSkillFormula: "272 + 143% ATK + 13.1% of Max HP",
        supportSkillStats: {
            base: 272,
            atk: 143,
            hp: 13.1,
            def: 0
        },
        empoweredSupportSkillFormula: "368 + 195% ATK + 17.7% of Max HP",
        empoweredSupportSkillStats: {
            base: 368,
            atk: 195,
            hp: 17.7,
            def: 0
        },
        resonanceSkillFormula: "1262 + 674% ATK + 60.6% of Max HP",
        resonanceSkillStats: {
            base: 1262,
            atk: 674,
            hp: 60.6,
            def: 0
        },
        ardentOathFormula: "1800 + 960% ATK + 86%",
        ardentOathStats: {
            base: 1800,
            atk: 960,
            hp: 86,
            def: 0
        },
        passiveSkillFormula1: "88 + 47% ATK + 4.3% of Max HP",
        passiveSkillStats1: {
            base: 88,
            atk: 47,
            hp: 4.3,
            def: 0
        },
        passiveSkillFormula2: "354 + 189% ATK + 17% of Max HP",
        passiveSkillStats2: {
            base: 354,
            atk: 189,
            hp: 17,
            def: 0
        },
        passiveSkillFormula3: "315 + 168% ATK + 15.1% of Max HP",
        passiveSkillStats3: {
            base: 315,
            atk: 168,
            hp: 15.1,
            def: 0
        },
        eidolon0: `When fighting alongside God of Annihilation, you become unstoppable during Charged Attacks and take 40% less DMG.
While awakened as [Deity of Niava], you and Zayne deal 8% additional DMG.`,
        eidolon1: "During the [Deity of Niava] state, your Basic Attacks can also shatter enemies' [Soul Rifts] on hit. Additionally, when your Active Skill hits an enemy for the first time, if that enemy has no [Soul Rift], their [Soul Rift] will be revealed again. [Divine Sever] creates an additional array that continuously pulls in nearby enemies. After a period of time, the array explodes, dealing AoE DMG equal to 242+129% ATK+11.6% of Max HP.",
        eidolon2: "When fighting alongside God of Annihilation, your Active Skill DMG is increased by 20%. When you shatter [Soul Rifts], you and Zayne each restore HP equal to 5% of Max HP.",
        eidolon3: "Enemies hit by [Terminus Arrow] or [Divine Sever] take 30% more DMG for 4s. When you load [Golden Arrows] with Basic Attacks, you will gain 1 additional [Golden Arrow].",
    },
    {
        companionName: "Zayne: Master of Fate",
        cardIds: [291, 292],
        supportSkillFormula: "260 + 348% ATK",
        supportSkillStats: {
            base: 260,
            atk: 348,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "372 + 492% ATK",
        empoweredSupportSkillStats: {
            base: 372,
            atk: 492,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "632 + 842% ATK",
        resonanceSkillStats: {
            base: 632,
            atk: 842,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1440 + 1920% ATK",
        ardentOathStats: {
            base: 1440,
            atk: 1920,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: "233 + 310% ATK",
        passiveSkillStats1: {
            base: 233,
            atk: 310,
            hp: 0,
            def: 0
        },
        eidolon0: "Enemies inflicted with [Shattered Jade] have their DEF reduced by 10%.",
        eidolon1: "When fighting alongside Master of Fate, the enemy's weakened state is extended by 2 seconds Each time an enemy in weakened state is hit, the damage it sustains increases by 0.5%, up to a maximum of 10%.",
        eidolon2: "When triggering [Jadesunder], a small amount of Energy Charge is restored.",
        eidolon3: `[Jadesunder] DMG is increased by 100%. During skill replacement, [Piercing Rain] can be used 1 additional time. When Piercing Rain hits enemies, its cooldown is reduced by 0.5s.
This effect can trigger only once per use of Piercing Rain.`,
    },
    {
        companionName: "Zayne: Foreseer",
        cardIds: [289, 290],
        resonanceSkillFormula: "790 + 421% ATK + 1670% DEF",
        resonanceSkillStats: {
            base: 790,
            atk: 421,
            hp: 0,
            def: 1670
        },
        ardentOathFormula: "1440 + 780% ATK + 3060% combined DEF",
        ardentOathStats: {
            base: 1440,
            atk: 780,
            hp: 0,
            def: 3060
        },
        passiveSkillFormula1: "192 +  102% ATK + 406% DEF",
        passiveSkillStats1: {
            base: 192,
            atk: 102,
            hp: 0,
            def: 406
        },
        eidolon0: "When fighting alongside Foreseer, [Eternal Sin] DMG is increased by 25%.",
        eidolon1: "When you and Foreseer are under [Ward of Curses], DMG dealt is increased by 12%.",
        eidolon2: "When using a Resonance Skill, Foreseer additionally gains 1 stack of [Divine Prayer], and your DMG is increased by 10% for 10s.",
        eidolon3: "Every 6 seconds Foreseer gains 1 stack of [Divine Prayer].",
    },
    {
        companionName: "Zayne: Medic of the Arctic",
        supportSkillFormula: "208 + 275% ATK",
        supportSkillStats: {
            base: 208,
            atk: 275,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "362 + 482% ATK",
        resonanceSkillStats: {
            base: 362,
            atk: 482,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Zayne: Dawnbreaker",
        supportSkillFormula: "626 + 835% ATK",
        supportSkillStats: {
            base: 626,
            atk: 835,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "54 + 72% ATK",
        empoweredSupportSkillStats: {
            base: 54,
            atk: 72,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "252 + 336% ATK",
        resonanceSkillStats: {
            base: 252,
            atk: 336,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Zayne: Linkon doctor",
        supportSkillFormula: "75 + 100% ATK",
        supportSkillStats: {
            base: 75,
            atk: 100,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "",
        empoweredSupportSkillStats: {
            base: 0,
            atk: 0,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "296 + 394% ATK",
        resonanceSkillStats: {
            base: 296,
            atk: 394,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Rafayel: Lemurian Sea God",
        cardIds: [389, 390],
        supportSkillFormula: "360 + 192% ATK + 761% DEF",
        supportSkillStats: {
            base: 360,
            atk: 192,
            hp: 0,
            def: 761
        },
        empoweredSupportSkillFormula: "468 + 249% ATK + 989% DEF",
        empoweredSupportSkillStats: {
            base: 468,
            atk: 249,
            hp: 0,
            def: 989
        },
        resonanceSkillFormula: "1311 + 699% ATK + 2773% DEF",
        resonanceSkillStats: {
            base: 1311,
            atk: 699,
            hp: 0,
            def: 2773
        },
        ardentOathFormula: "1800 + 960% ATK + 3820% DEF",
        ardentOathStats: {
            base: 1800,
            atk: 960,
            hp: 0,
            def: 3820
        },
        passiveSkillFormula2: "450 + 240% ATK + 951% DEF",
        passiveSkillStats2: {
            base: 450,
            atk: 240,
            hp: 0,
            def: 951
        },
        passiveSkillFormula3: "32 + 17% ATK + 68% DEF",
        passiveSkillStats3: {
            base: 32,
            atk: 17,
            hp: 0,
            def: 68
        },
        eidolon0: "When your basic attack hits, [Sea God Mark] cooldown is reduced by 0.8s. This effect can trigger once per attack. When [Lightning Tide] hits Weakened enemies, extends the Weakened duration by 0.5s. This effect can trigger up to 2 times per enemy.",
        eidolon1: "While [Divine Favor] is active, when Rafayel throws his Tidebreaker Trident, it generates an additional vortex that continuously pulls nearby enemies toward its center. While [Divine Favor] is active, lightning will randomly strike the battlefield to assist you in battle, dealing DMG equal to 270+144% ATK+571% DEF with each hit.",
        eidolon2: "DMG boost from [Sea God Mark] is increased by 50%. While [Divine Favor] is active, you gain 40% DMG Reduction.",
        eidolon3: "While [Divine Favor] is active, when your basic attack hits, Active Skill cooldown is reduced by 0.5s. While [Divine Favor] is active, when Charged Attacks empowered by [Sea God Mark] hit, [Lightning Tide] is triggered for 70% DMG. These effects can trigger once per attack.",
    },
    {
        companionName: "Rafayel: God of the Tides",
        cardIds: [387, 388],
        supportSkillFormula: "47 + 25% ATK + 2.2% of Max HP",
        supportSkillStats: {
            base: 47,
            atk: 25,
            hp: 2.2,
            def: 0
        },
        resonanceSkillFormula: "995 + 531% ATK + 47.8% of Max HP",
        resonanceSkillStats: {
            base: 995,
            atk: 531,
            hp: 47.8,
            def: 0
        },
        ardentOathFormula: "1440 + 780% ATK + 69.4% of Max HP",
        ardentOathStats: {
            base: 1440,
            atk: 780,
            hp: 69.4,
            def: 0
        },
        eidolon0: "When fighting near a [Sea Spirit], CRIT DMG is increased by 10%.",
        eidolon1: "The [Sea Spirit] starts at Lv. 2 and its duration is extended by 5 seconds.",
        eidolon2: "During [Heavenly Rain], Energy Charge recovery speed is increased by 30%.",
        eidolon3: "[Surging Tides] restores 30% [Faith] for each enemy hit. This effect can trigger at most 3 times during Surging Tides.",
    },
    {
        companionName: "Rafayel: Abysswalker",
        cardIds: [385, 386],
        empoweredSupportSkillFormula: "306 + 408% ATK",
        empoweredSupportSkillStats: {
            base: 306,
            atk: 408,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula2: "23 + 31% ATK",
        empoweredSupportSkillStats2: {
            base: 23,
            atk: 31,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "785 + 1047% ATK",
        resonanceSkillStats: {
            base: 785,
            atk: 1047,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1440 + 1920% ATK",
        ardentOathStats: {
            base: 1440,
            atk: 1920,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: "540 + 720% ATK",
        passiveSkillStats1: {
            base: 540,
            atk: 720,
            hp: 0,
            def: 0
        },
        eidolon0: "Abysswalker's [Deepsea Pursuit] gains 30% additional CRIT DMG.",
        eidolon1: "When fighting together with Abysswalker, increases DMG taken of enemies inflicted with [Burn] by 20%.",
        eidolon2: "When triggering [Potential] recovery, Energy Charge recovery speed is increased by 50% for 4s.",
        eidolon3: "Abysswalker's [Searing Slash] deals 150% more DMG. When triggering [Beacon] additionally restore 1 [Potential].",
    },
    {
        companionName: "Rafayel: Frash Paint",
        supportSkillFormula: "194 + 258% ATK",
        supportSkillStats: {
            base: 194,
            atk: 258,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "259 + 345% ATK",
        empoweredSupportSkillStats: {
            base: 259,
            atk: 345,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "922 + 1229% ATK",
        resonanceSkillStats: {
            base: 922,
            atk: 1229,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: "23 + 30% ATK",
        passiveSkillStats1: {
            base: 23,
            atk: 30,
            hp: 0,
            def: 0
        },
        passiveSkillFormula2: "60 + 80% ATK",
        passiveSkillStats2: {
            base: 60,
            atk: 80,
            hp: 0,
            def: 0
        },
        passiveSkillFormula3: "113 + 150% ATK",
        passiveSkillStats3: {
            base: 113,
            atk: 150,
            hp: 0,
            def: 0
        },
        passiveSkillFormula4: "150 + 200% ATK",
        passiveSkillStats4: {
            base: 150,
            atk: 200,
            hp: 0,
            def: 0
        },
        passiveSkillFormula5: "188 + 250% ATK",
        passiveSkillStats5: {
            base: 188,
            atk: 250,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Rafayel: Phantom of the Siren",
        supportSkillFormula: "218 + 291% ATK",
        supportSkillStats: {
            base: 218,
            atk: 291,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "315 + 420% ATK",
        empoweredSupportSkillStats: {
            base: 315,
            atk: 420,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "508 + 678% ATK",
        resonanceSkillStats: {
            base: 508,
            atk: 678,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula2: "254 + 339% ATK",
        resonanceSkillStats2: {
            base: 254,
            atk: 339,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Rafayel: Artist",
        supportSkillFormula: "84 + 112% ATK",
        supportSkillStats: {
            base: 84,
            atk: 112,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "188 + 250% ATK",
        resonanceSkillStats: {
            base: 188,
            atk: 250,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: "15 + 20% ATK",
        passiveSkillStats1: {
            base: 15,
            atk: 20,
            hp: 0,
            def: 0
        },
        passiveSkillFormula2: "188 + 250% ATK",
        passiveSkillStats2: {
            base: 188,
            atk: 250,
            hp: 0,
            def: 0
        },
        passiveSkillFormula3: "20 + 26% ATK",
        passiveSkillStats3: {
            base: 20,
            atk: 26,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Sylus: Silverwing Fiend",
        cardIds: [102, 103],
        supportSkillFormula: "584 + 311% ATK + 1244% DEF",
        supportSkillStats: {
            base: 584,
            atk: 311,
            hp: 0,
            def: 1244
        },
        empoweredSupportSkillFormula: "684 + 365% ATK + 1446% DEF",
        empoweredSupportSkillStats: {
            base: 684,
            atk: 365,
            hp: 0,
            def: 1446
        },
        supportSkillFormula2: "628 + 335% ATK + 1327% DEF",
        supportSkillStats2: {
            base: 628,
            atk: 335,
            hp: 0,
            def: 1327
        },
        supportSkillFormula3: "675 + 360% ATK + 1427% DEF",
        supportSkillStats3: {
            base: 675,
            atk: 360,
            hp: 0,
            def: 1427
        },
        resonanceSkillFormula: "1663 + 887% ATK + 3515% DEF",
        resonanceSkillStats: {
            base: 1663,
            atk: 887,
            hp: 0,
            def: 3515
        },
        resonanceSkillFormula2: "1458 + 778% ATK + 3084% DEF",
        resonanceSkillStats2: {
            base: 1458,
            atk: 778,
            hp: 0,
            def: 3084
        },
        ardentOathFormula: "1800 + 960% ATK + 3820% DEF",
        ardentOathStats: {
            base: 1800,
            atk: 960,
            hp: 0,
            def: 3820
        },
        passiveSkillFormula1: "675 + 360% ATK + 1427% DEF",
        passiveSkillStats1: {
            base: 675,
            atk: 360,
            hp: 0,
            def: 1427
        },
        eidolon0: "When you consume [Rose Mark] you recover an additional 0.5 Energy Charge.",
        eidolon1: "[Rose Thorns] damage increases by 10% and additionally pulls in enemies within range. Casting [Blood Pact] immediately refreshes your Active Skill cooldown and reduces the cooldown of your next Active Skill cast by 4s. This effect cannot stack.",
        eidolon2: "When [Crimson Void] hits, it additionally applies [Blood Spell] to enemies, increasing their DMG taken by 8% for 6s. [Blood Spell] is removed when [Crimson Bond] ends. When [Bloodrose Seed] blooms, you and Sylus each recover HP equal to 5% of max HP.",
        eidolon3: `During [Crimson Bond], Sylus deals 10% more DMG. When Sylus applies [Bloodrose Seed] he also stimulates [Bloodrose Seed] to grow.
During [Crimson Bond], casting Active Skill grants you [Bloodrose Wreath], increasing your DMG by 10% for 8s. When your Basic Attacks or Charged Attacks hit enemies, [Bloodrose Wreath] fires additional bullets at them, dealing damage equal to 79+42% ATK+168% DEF and stimulating [Bloodrose Seed]. This damage counts as Basic Attack damage and this effect can trigger once per attack. When you gain [Bloodrose Wreath], any [Bloodrose Scent you have is removed, and you gain all its effects.
When [Crimson Bond] ends, [Bloodrose Wreath] is removed.`,
    },
    {
        companionName: "Sylus: Abysm Sovereign",
        cardIds: [100, 101],
        supportSkillFormula: "508 + 271% ATK + 24.4% of Max HP",
        supportSkillStats: {
            base: 508,
            atk: 271,
            hp: 24.4,
            def: 0
        },
        empoweredSupportSkillFormula: "705 + 376% ATK + 33.9% of Max HP",
        empoweredSupportSkillStats: {
            base: 705,
            atk: 376,
            hp: 33.9,
            def: 0
        },
        resonanceSkillFormula: "1024 + 546% ATK + 49.2% of Max HP",
        resonanceSkillStats: {
            base: 1024,
            atk: 546,
            hp: 49.2,
            def: 0
        },
        ardentOathFormula: "1440 + 780% ATK + 69.4% of Max HP",
        ardentOathStats: {
            base: 1440,
            atk: 780,
            hp: 69.4,
            def: 0
        },
        eidolon0: "After [Abyssal Fury] ends, you and Sylus recover 20% of Max HP.",
        eidolon1: `After using [Fiendish Claw], your next 3 basic attacks on-hit deal DMG equal to 121+64.8% ATK+5.8% Max HP to surrounding enemies centered on you.
While [Abyssal Fury] is active [Fiendish Claw] cooldown is reduced.`,
        eidolon2: "After using [Wrath Judgment] or [Wrath Judgment: Greed], your Energy Charge recovery speed is increased for 15s.",
        eidolon3: "When using [Wrath Judgment: Greed], you and Sylus recover 50% of Max HP. While [Abyssal Fury] is active, [Life Sacrifice] requires no charging and your Active Skills deal 30% increased DMG.",
    },
    {
        companionName: "Sylus: Relentless Conqueror",
        cardIds: [98, 99],
        supportSkillFormula: "239 + 318% ATK",
        supportSkillStats: {
            base: 239,
            atk: 318,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "72 + 95% ATK",
        empoweredSupportSkillStats: {
            base: 72,
            atk: 95,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "1094 + 1458% ATK",
        resonanceSkillStats: {
            base: 1094,
            atk: 1458,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1440 + 1920% ATK",
        ardentOathStats: {
            base: 1440,
            atk: 1920,
            hp: 0,
            def: 0
        },
        eidolon0: "When picking up [Dark Energy], your ATK is increased by 3.5% for 5s. This effect can stack up to 3 times.",
        eidolon1: "When you pick up [Dark Energy], you gain an additional effect that applies [Devour Mark] to the next enemy you damage.",
        eidolon2: "When you pick up [Dark Energy], a small amount of Energy Charge is restored.",
        eidolon3: "When applying [Devour Mark] to an enemy that already has a [Devour Mark], directly deal 60+80% ATK DMG.",
    },
    {
        companionName: "Sylus: Visitor",
        supportSkillFormula: "228 + 304% ATK",
        supportSkillStats: {
            base: 228,
            atk: 304,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "321 + 429% ATK",
        empoweredSupportSkillStats: {
            base: 321,
            atk: 429,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "950 + 1266% ATK",
        resonanceSkillStats: {
            base: 950,
            atk: 1266,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
    },
    {
        companionName: "Caleb: Netherlord",
        cardIds: [27, 28],
        supportSkillFormula: "336 + 179% ATK + 16.2% of Max HP",
        supportSkillStats: {
            base: 336,
            atk: 179,
            hp: 16.2,
            def: 0
        },
        empoweredSupportSkillFormula: "585 + 312% ATK + 28.1% of Max HP",
        empoweredSupportSkillStats: {
            base: 585,
            atk: 312,
            hp: 28.1,
            def: 0
        },
        supportSkillFormula2: "296 + 158% ATK + 14.2% of Max HP",
        supportSkillStats2: {
            base: 296,
            atk: 158,
            hp: 14.2,
            def: 0
        },
        resonanceSkillFormula: "1361 + 725% ATK + 65.3% of Max HP",
        resonanceSkillStats: {
            base: 1361,
            atk: 725,
            hp: 65.3,
            def: 0
        },
        ardentOathFormula: "1800 + 960% ATK + 86% of Max HP",
        ardentOathStats: {
            base: 1800,
            atk: 960,
            hp: 86,
            def: 0
        },
        passiveSkillFormula1: "645 + 344% ATK + 31% of Max HP",
        passiveSkillStats1: {
            base: 645,
            atk: 344,
            hp: 31,
            def: 0
        },
        passiveSkillFormula2: "671 + 358% ATK + 32.2% of Max HP",
        passiveSkillStats2: {
            base: 671,
            atk: 358,
            hp: 32.2,
            def: 0
        },
        passiveSkillFormula3: "491 + 262% ATK + 23.6% of Max HP",
        passiveSkillStats3: {
            base: 491,
            atk: 262,
            hp: 23.6,
            def: 0
        },
        eidolon0: "When you apply [Bingdi Lotus] to an enemy that already has the same half, you gain [Lotus Seed]. When [Yin-Yang Rift] is active, you restore 0.3 Energy Charge, and both you and Caleb restore 5% of Max HP.",
        eidolon1: `Outside [Yin-Yang Union]:
When you consume [Lotus Seed], Caleb performs an additional [Netherseal Slash]. This attack does not affect [Netherseal Slash]'s original cooldown.
During [Yin-Yang Union]: When the spectral hand summoned by [Yin-Yang Rift] attacks, it unleashes an additional shockwave, dealing AoE DMG equal to 327+175% ATK+15.7% of Max HP. If the shockwave hits during [Yin-Yang Union], enemies struck are marked as [Ghost]
[Ghost]: If the target is marked again while already marked, the target takes DMG equal to 251+134% ATK+12.1% of Max HP When [Yin-Yang Rift] is activated, enemies marked as [Ghost] are marked again. When [Yin-Yang Union] ends, the mark is removed.`,
        eidolon2: "When fighting alongside Netherlord, you start with 42% Oath Energy, and the duration of the enemy's weakened state is extended by 1 second. DMG dealt when [Ghost] is marked again is increased by 10%.",
        eidolon3: `During [Yin-Yang Union], when your Active Skill hits, you gain [Lotus Seed]. This effect can trigger only once per Active Skill. When your Charged Attack hits an enemy, it consumes [Lotus Seed] to unleash an additional shockwave at the target's location, dealing AoE DMG equal to 327+175% ATK+15.7% of Max HP. If the shockwave hits during [Yin-Yang Union], enemies struck are marked as [Ghost]. This effect can trigger only once per Charged Attack.
When [Yin-Yang Rift] appears, you restore an additional 11% Oath Energy. This effect is not affected by Oath Recovery Boost.
DMG dealt by Ardent Oath [Fate Unforgotten] can trigger critical hits.`,
    },
    {
        companionName: "Caleb: Ultimate Weapon X-02",
        cardIds: [29, 30],
        supportSkillFormula: "461 + 615% ATK",
        supportSkillStats: {
            base: 461,
            atk: 615,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "685 + 913% ATK",
        empoweredSupportSkillStats: {
            base: 685,
            atk: 913,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "990 + 1322% ATK",
        resonanceSkillStats: {
            base: 990,
            atk: 1322,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "380 + 500% ATK",
        ardentOathStats: {
            base: 380,
            atk: 500,
            hp: 0,
            def: 0
        },
        eidolon0: "When fighting alongside Ultimate Weapon X-02, Ardent Oath DMG increases by 20%. When you use [Nulledge Field] or [Empowered Nulledge Field] immediately restore 1 [Stasis Particles].",
        eidolon1: `Extends [Quantum Stasis] duration by 2.5s and increases DMG taken by affected enemies by 10%.
Hitting enemies with [Nulledge Field] and [Empowered Nulledge Field] also applies [Quantum Stasis].
When fighting alongside  Ultimate Weapon X-02, you become unstoppable while using Active Skills. `,
        eidolon2: "When fighting alongside Ultimate Weapon X-02, using Active Skills increases ATK for both of you by 8% for 10s. Whenever your Active Skills deal DMG, you both recover a small amount of HP. ",
        eidolon3: "When entering [Ultimate Synced State], immediately restore 80% [Synced Particles] and increase [Synced Particles] acquisition efficiency by 30%. When using [Synced Strike], he will also summon multiple Floating Blades at the target location to assist in the attack, dealing a total of 122+164% ATK DMG.",
    },
    {
        companionName: "Caleb: Farspace Colonel",
        cardIds: [31, 32],
        supportSkillFormula: "284 + 151% ATK + 599% DEF",
        supportSkillStats: {
            base: 284,
            atk: 151,
            hp: 0,
            def: 599
        },
        empoweredSupportSkillFormula: "392 + 209% ATK + 828% DEF",
        empoweredSupportSkillStats: {
            base: 392,
            atk: 209,
            hp: 0,
            def: 828
        },
        resonanceSkillFormula: "245 + 131% ATK + 519% DEF",
        resonanceSkillStats: {
            base: 245,
            atk: 131,
            hp: 0,
            def: 519
        },
        resonanceSkillFormula2: "512 + 273% ATK + 1082% DEF",
        resonanceSkillStats2: {
            base: 512,
            atk: 273,
            hp: 0,
            def: 1082
        },
        ardentOathFormula: "1440 + 780% ATK + 3060% DEF",
        ardentOathStats: {
            base: 1440,
            atk: 780,
            hp: 0,
            def: 3060
        },
        eidolon0: "After using Charged Attacks or Active Skills within [Battlefront], you and Caleb's DMG is increased by 20% for 5s. This effect's duration can stack and is cleared when [Ground Breach] ends.",
        eidolon1: "[Focus] mark limit +2. Within [Battlefront], your Active Skills on-hit grant 1 Focus mark and reduce Active Skill cooldown by 6s. ",
        eidolon2: `Using [Ground Breach] or [Deep Strike] restores 0.2 Energy Charge.
When consuming Zerom, additionally restore 0.5 [Firepower].        `,
        eidolon3: "You and Caleb deal 5% increased DMG to enemies with Protocore Shield. Within [Battlefront], when the final hit of your basic attack lands, you gain an additional [Focus] mark. When Focus marks exceed the limit, excess marks unleash a gravity vortex at the target location, dealing 225+120% ATK+476% DEF DMG to enemies in range.",
    },
    {
        companionName: "Caleb: Pilot",
        supportSkillFormula: "285 + 381% ATK",
        supportSkillStats: {
            base: 285,
            atk: 381,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "318 + 423% ATK",
        empoweredSupportSkillStats: {
            base: 318,
            atk: 423,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "867 + 1156% ATK",
        resonanceSkillStats: {
            base: 867,
            atk: 1156,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: "53 + 70% ATK",
        passiveSkillStats1: {
            base: 53,
            atk: 70,
            hp: 0,
            def: 0
        },
        passiveSkillFormula2: "113 + 150% ATK",
        passiveSkillStats2: {
            base: 113,
            atk: 150,
            hp: 0,
            def: 0
        },
    },
]

export const weaponDataShowcaseSpecific = [
    {
        weaponName: "Final Resound",
        basicFirstStrike: "98 + 52% ATK + 4.7% of Max HP",
        basicFirstStrikeStats: {
            base: 98 ,
            atk: 52,
            hp: 4.7,
            def: 0
        },
        basicSecondStrike: "88 + 46% ATK + 4.2% of Max HP",
        basicSecondStrikeStats: {
            base: 88 ,
            atk: 46,
            hp: 4.2,
            def: 0
        },
        basicThirdStrike: "122 + 65% ATK + 5.9% of Max HP",
        basicThirdStrikeStats: {
            base: 122 ,
            atk: 65,
            hp: 5.9,
            def: 0
        },
        basicFourthStrike: "147 + 78% ATK + 7.1% of Max HP",
        basicFourthStrikeStats: {
            base: 147 ,
            atk: 78,
            hp: 7.1,
            def: 0
        },
        basicChargedAttack: "165 + 88% ATK + 7.9% of Max HP",
        basicChargedAttackStats: {
            base: 165 ,
            atk: 88,
            hp: 7.9,
            def: 0
        },
        activeSkillFormula: "351 + 187% ATK + 16.8% of Max HP",
        activeSkillStats: {
            base: 351 ,
            atk: 187,
            hp: 16.8,
            def: 0
        },
        activeSkillSecondFormula: "376 + 200% ATK + 18% of Max HP",
        activeSkillSecondStats: {
            base: 376 ,
            atk: 200,
            hp: 18,
            def: 0
        },
    },
    {
        weaponName: "Moonchaser",
        basicFirstStrike: "55 + 29% ATK + 117% DEF",
        basicFirstStrikeStats: {
            base: 55 ,
            atk: 29,
            hp: 0,
            def: 117
        },
        basicSecondStrike: "50 + 26% ATK + 105% DEF",
        basicSecondStrikeStats: {
            base: 50,
            atk: 26,
            hp: 0,
            def: 105
        },
        basicThirdStrike: "66 + 35% ATK + 140% DEF",
        basicThirdStrikeStats: {
            base: 66,
            atk: 35,
            hp: 0,
            def: 140
        },
        basicFourthStrike: "72 + 38% ATK + 152% DEF",
        basicFourthStrikeStats: {
            base: 72,
            atk: 38,
            hp: 0,
            def: 152
        },
        basicFifthStrike: "77 + 41% ATK + 163% DEF",
        basicFifthStrikeStats: {
            base: 77,
            atk: 41,
            hp: 0,
            def: 163
        },
        basicChargedAttack: "150 + 80% ATK + 317% DEF",
        basicChargedAttackStats: {
            base: 150,
            atk: 80,
            hp: 0,
            def: 317
        },
        activeSkillFormula: "403 + 215% ATK + 852% DEF",
        activeSkillStats: {
            base: 403,
            atk: 215,
            hp: 0,
            def: 852
        },
    },
    {
        weaponName: "Luminescence Blade",
        basicFirstStrike: "60 + 80% ATK DMG ",
        basicFirstStrikeStats: {
            base: 60 ,
            atk: 80,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "60 + 80% ATK DMG ",
        basicSecondStrikeStats: {
            base: 60,
            atk: 80,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "72 + 96% ATK DMG ",
        basicThirdStrikeStats: {
            base: 72,
            atk: 96,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "96 + 129% ATK DMG",
        basicFourthStrikeStats: {
            base: 96,
            atk: 129,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "118 + 157% ATK",
        basicChargedAttackStats: {
            base: 118,
            atk: 157,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "341 + 455% ATK",
        activeSkillStats: {
            base: 341,
            atk: 455,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Divine Grip",
        basicFirstStrike: "105 + 56% ATK + 5.1% of Max HP",
        basicFirstStrikeStats: {
            base: 105,
            atk: 56,
            hp: 5.1,
            def: 0
        },
        basicSecondStrike: "116 + 62% ATK + 5.6% of Max HP",
        basicSecondStrikeStats: {
            base: 116,
            atk: 62,
            hp: 5.6,
            def: 0
        },
        basicThirdStrike: "116 + 62% ATK + 5.6% of Max HP",
        basicThirdStrikeStats: {
            base: 116,
            atk: 62,
            hp: 5.6,
            def: 0
        },
        basicFourthStrike: "147 + 78% ATK + 7.1% of Max HP",
        basicFourthStrikeStats: {
            base: 147,
            atk: 78,
            hp: 7.1,
            def: 0
        },
        basicChargedAttack: "112 + 60% ATK + 5.3% of Max HP",
        basicChargedAttackStats: {
            base: 112,
            atk: 60,
            hp: 5.3,
            def: 0
        },
        activeSkillFormula: "338 + 180% ATK + 16.2% of Max HP",
        activeSkillStats: {
            base: 338,
            atk: 180,
            hp: 16.2,
            def: 0
        },
        passiveSkillMCFormula: "389 + 207% ATK + 18.7% of Max HP",
        passiveSkillMCStats: {
            base: 389,
            atk: 207,
            hp: 18.7,
            def: 0
        },
    },
    {
        weaponName: "Sacred Rainfall",
        basicFirstStrike: "75 + 100% ATK",
        basicFirstStrikeStats: {
            base: 75,
            atk: 100,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "75 + 100% ATK",
        basicSecondStrikeStats: {
            base: 75,
            atk: 100,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "90 + 121% ATK",
        basicThirdStrikeStats: {
            base: 90,
            atk: 121,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "121 + 161% ATK",
        basicFourthStrikeStats: {
            base: 121,
            atk: 161,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "141 + 188% ATK",
        basicChargedAttackStats: {
            base: 141,
            atk: 188,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "404 + 539% ATK",
        activeSkillStats: {
            base: 404,
            atk: 539,
            hp: 0,
            def: 0
        },
        passiveSkillMCFormula: "205 + 273% ATK",
        passiveSkillMCStats: {
            base: 205,
            atk: 273,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Everlasting Song",
        basicAttackFormula: "288 + 154% ATK + 609% DEF",
        basicAttackStats: {
            base: 288,
            atk: 154,
            hp: 0,
            def: 609
        },
        basicChargedAttack: "167 + 89% ATK + 353% DEF",
        basicChargedAttackStats: {
            base: 167,
            atk: 89,
            hp: 0,
            def: 353
        },
        activeSkillFormula: "52 + 28% ATK + 111% DEF ",
        activeSkillStats: {
            base: 52,
            atk: 28,
            hp: 0,
            def: 111
        },
    },
    {
        weaponName: "Ballad of Ebbs",
        basicFirstStrike: "49 + 26% ATK + 104% DEF",
        basicFirstStrikeStats: {
            base: 49,
            atk: 26,
            hp: 0,
            def: 104
        },
        basicSecondStrike: "53 + 28% ATK + 112% DEF ",
        basicSecondStrikeStats: {
            base: 53,
            atk: 28,
            hp: 0,
            def: 112
        },
        basicThirdStrike: "83 + 44% ATK + 175% DEF",
        basicThirdStrikeStats: {
            base: 83,
            atk: 44,
            hp: 0,
            def: 175
        },
        basicFourthStrike: "137 + 73% ATK + 290% DEF",
        basicFourthStrikeStats: {
            base: 137,
            atk: 73,
            hp: 0,
            def: 290
        },
        basicChargedAttack: "174 + 93% ATK + 368% DEF",
        basicChargedAttackStats: {
            base: 174,
            atk: 93,
            hp: 0,
            def: 368
        },
        activeSkillFormula: "265 + 141% ATK + 560% DEF",
        activeSkillStats: {
            base: 265,
            atk: 141,
            hp: 0,
            def: 560
        },
        passiveSkillMCFormula: "312 + 166% ATK + 660% DEF",
        passiveSkillMCStats: {
            base: 312,
            atk: 166,
            hp: 0,
            def: 660
        },
    },
    {
        weaponName: "Tidal Embrace",
        basicAttackFormula: "398 + 211% ATK + 19% of Max HP",
        basicAttackStats: {
            base: 398,
            atk: 211,
            hp: 19,
            def: 0
        },
        basicChargedAttack: "182 + 97% ATK + 9% of Max HP",
        basicChargedAttackStats: {
            base: 182,
            atk: 97,
            hp: 9,
            def: 0
        },
        activeSkillFormula: "73 + 39% ATK + 3.5% of Max HP",
        activeSkillStats: {
            base: 73,
            atk: 39,
            hp: 3.5,
            def: 0
        },
    },
    {
        weaponName: "Phantasma Sands",
        basicFirstStrike: "53 + 71% ATK",
        basicFirstStrikeStats: {
            base: 53,
            atk: 71,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "48 + 64% ATK",
        basicSecondStrikeStats: {
            base: 48,
            atk: 64,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "64 + 85% ATK",
        basicThirdStrikeStats: {
            base: 64,
            atk: 85,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "69 + 92% ATK",
        basicFourthStrikeStats: {
            base: 69,
            atk: 92,
            hp: 0,
            def: 0
        },
        basicFifthStrike: "74 + 99% ATK ",
        basicFifthStrikeStats: {
            base: 74,
            atk: 99,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "144% + 192% ATK",
        basicChargedAttackStats: {
            base: 144,
            atk: 192,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "309 + 412% ATK",
        activeSkillStats: {
            base: 309,
            atk: 412,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Crimson Malison",
        basicFirstStrike: "49 + 26% ATK + 103% DEF",
        basicFirstStrikeStats: {
            base: 49,
            atk: 26,
            hp: 0,
            def: 103
        },
        basicSecondStrike: "49 + 26% ATK + 103% DEF",
        basicSecondStrikeStats: {
            base: 49,
            atk: 26,
            hp: 0,
            def: 103
        },
        basicThirdStrike: "94 + 50% ATK + 198% DEF",
        basicThirdStrikeStats: {
            base: 94,
            atk: 50,
            hp: 0,
            def: 198
        },
        basicFourthStrike: "146 + 78% ATK + 309% DEF",
        basicFourthStrikeStats: {
            base: 146,
            atk: 78,
            hp: 0,
            def: 309
        },
        basicChargedAttack: "180 + 96% ATK + 381% DEF",
        basicChargedAttackStats: {
            base: 180,
            atk: 96,
            hp: 0,
            def: 381
        },
        passiveSkillMCFormula: "45 + 24% ATK + 95% DEF",
        passiveSkillMCStats: {
            base: 45,
            atk: 24,
            hp: 0,
            def: 95
        }
    },
    {
        weaponName: "Fiend Reaper",
        basicAttackFormula: "647 + 346% ATK + 31.1% of Max HP",
        basicAttackStats: {
            base: 647,
            atk: 346,
            hp: 31.1,
            def: 0
        },
        basicChargedAttack: "204 + 109% ATK + 9.8% of Max HP",
        basicChargedAttackStats: {
            base: 204,
            atk: 109,
            hp: 9.8,
            def: 0
        },
        activeSkillFormula: "397 + 212% ATK + 19.1% of Max HP",
        activeSkillStats: {
            base: 397,
            atk: 212,
            hp: 19.1,
            def: 0
        },
        activeSkillSecondFormula: "632 + 337% ATK + 30.3% of Max HP",
        activeSkillSecondStats: {
            base: 632,
            atk: 337,
            hp: 30.3,
            def: 0
        },
    },
    {
        weaponName: "Harrier 700",
        basicFirstStrike: "59 + 79% ATK",
        basicFirstStrikeStats: {
            base: 59,
            atk: 79,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "67 + 89% ATK",
        basicSecondStrikeStats: {
            base: 67,
            atk: 89,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "89 + 119% ATK",
        basicThirdStrikeStats: {
            base: 89,
            atk: 119,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "107 + 143% ATK",
        basicFourthStrikeStats: {
            base: 107,
            atk: 143,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "160 + 213% ATK",
        basicChargedAttackStats: {
            base: 160,
            atk: 213,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "342 + 456% ATK",
        activeSkillStats: {
            base: 342,
            atk: 456,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Azuregaze",
        basicFirstStrike: "74 + 39% ATK + 3.5% of Max HP",
        basicFirstStrikeStats: {
            base: 74,
            atk: 39,
            hp: 3.5,
            def: 0
        },
        basicSecondStrike: "66 + 34% ATK + 3.2% of Max HP",
        basicSecondStrikeStats: {
            base: 66,
            atk: 34,
            hp: 3.2,
            def: 0
        },
        basicThirdStrike: "135 + 72% ATK + 6.5% of Max HP",
        basicThirdStrikeStats: {
            base: 135,
            atk: 72,
            hp: 6.5,
            def: 0
        },
        basicChargedAttack: "174 + 93% ATK + 8.4% of Max HP",
        basicChargedAttackStats: {
            base: 174,
            atk: 93,
            hp: 8.4,
            def: 0
        },
        activeSkillFormula: "358 + 190% ATK + 17.2% of Max HP",
        activeSkillStats: {
            base: 358,
            atk: 190,
            hp: 17.2,
            def: 0
        },
        passiveSkillMCFormula: "135 + 72% ATK + 6.5% of Max HP",
        passiveSkillMCStats: {
            base: 135,
            atk: 72,
            hp: 6.5,
            def: 0
        },
    },
    {
        weaponName: "Awakened Vitality",
        basicFirstStrike: "77 + 103% ATK",
        basicFirstStrikeStats: {
            base: 77,
            atk: 103,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "74 + 99% ATK",
        basicSecondStrikeStats: {
            base: 74,
            atk: 99,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "109 + 145% ATK",
        basicThirdStrikeStats: {
            base: 109,
            atk: 145,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "137 + 182% ATK",
        basicFourthStrikeStats: {
            base: 137,
            atk: 182,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "252 + 336% ATK",
        basicChargedAttackStats: {
            base: 252,
            atk: 336,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "72 + 96% ATK",
        activeSkillStats: {
            base: 72,
            atk: 96,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Skybreaker-SN",
        basicFirstStrike: "47 + 25% ATK + 99% DEF",
        basicFirstStrikeStats: {
            base: 47,
            atk: 25,
            hp: 0,
            def: 99
        },
        basicSecondStrike: "70 + 37% ATK + 148% DEF",
        basicSecondStrikeStats: {
            base: 70,
            atk: 37,
            hp: 0,
            def: 148
        },
        basicThirdStrike: "68 + 36% ATK + 144% DEF",
        basicThirdStrikeStats: {
            base: 68,
            atk: 36,
            hp: 0,
            def: 144
        },
        basicFourthStrike: "85 + 45% ATK + 180% DEF",
        basicFourthStrikeStats: {
            base: 85,
            atk: 45,
            hp: 0,
            def: 180
        },
        basicChargedAttack: "133 + 71% ATK + 281% DEF",
        basicChargedAttackStats: {
            base: 133,
            atk: 71,
            hp: 0,
            def: 281
        },
        activeSkillFormula: "200 + 105% ATK + 420% DEF",
        activeSkillStats: {
            base: 200,
            atk: 105,
            hp: 0,
            def: 420
        },
        activeSkillSecondFormula: "185 + 100% ATK + 395% DEF",
        activeSkillSecondStats: {
            base: 185,
            atk: 100,
            hp: 0,
            def: 395
        },
    },
    {
        weaponName: "Hunter: Sword",
        basicFirstStrike: "60 + 80% ATK",
        basicFirstStrikeStats: {
            base: 60,
            atk: 80,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "60 + 80% ATK",
        basicSecondStrikeStats: {
            base: 60,
            atk: 80,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "72 + 96% ATK",
        basicThirdStrikeStats: {
            base: 72,
            atk: 96,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "96 + 129% ATK",
        basicFourthStrikeStats: {
            base: 96,
            atk: 129,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "118 + 157% ATK",
        basicChargedAttackStats: {
            base: 118,
            atk: 157,
            hp: 0,
            def: 0
        },
        basicChargedAttack2: "250 + 333% ATK",
        basicChargedAttackStats2: {
            base: 250,
            atk: 333,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "341 + 455% ATK",
        activeSkillStats: {
            base: 341,
            atk: 455,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Hunter: Wand",
        basicFirstStrike: "72 + 96% ATK",
        basicFirstStrikeStats: {
            base: 72,
            atk: 96,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "79 + 106% ATK",
        basicSecondStrikeStats: {
            base: 79,
            atk: 106,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "85 + 115% ATK",
        basicThirdStrikeStats: {
            base: 85,
            atk: 115,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "94 + 125% ATK",
        basicFourthStrikeStats: {
            base: 94,
            atk: 125,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "122 + 162% ATK",
        basicChargedAttackStats: {
            base: 122,
            atk: 162,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "34 + 45% ATK",
        activeSkillStats: {
            base: 34,
            atk: 45,
            hp: 0,
            def: 0
        },
        passiveSkillMCFormula: "265 + 353% ATK",
        passiveSkillMCStats: {
            base: 265,
            atk: 353,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Hunter: Claymore",
        basicFirstStrike: "112 + 150% ATK",
        basicFirstStrikeStats: {
            base: 112,
            atk: 150,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "112 + 150% ATK",
        basicSecondStrikeStats: {
            base: 112,
            atk: 150,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "124 + 165% ATK",
        basicThirdStrikeStats: {
            base: 124,
            atk: 165,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "135 + 180% ATK",
        basicFourthStrikeStats: {
            base: 135,
            atk: 180,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "337 + 449% ATK",
        basicChargedAttackStats: {
            base: 337,
            atk: 449,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "410 + 547% ATK",
        activeSkillStats: {
            base: 410,
            atk: 547,
            hp: 0,
            def: 0
        },
        activeSkillSecondFormula: "621 + 829% ATK",
        activeSkillSecondStats: {
            base: 621,
            atk: 829,
            hp: 0,
            def: 0
        },
    },
    {
        weaponName: "Hunter: Firearm",
        basicFirstStrike: "44 + 59% ATK",
        basicFirstStrikeStats: {
            base: 44,
            atk: 59,
            hp: 0,
            def: 0
        },
        basicSecondStrike: "40 + 53% ATK",
        basicSecondStrikeStats: {
            base: 40,
            atk: 53,
            hp: 0,
            def: 0
        },
        basicThirdStrike: "53 + 71% ATK",
        basicThirdStrikeStats: {
            base: 53,
            atk: 71,
            hp: 0,
            def: 0
        },
        basicFourthStrike: "57 + 77% ATK",
        basicFourthStrikeStats: {
            base: 57,
            atk: 77,
            hp: 0,
            def: 0
        },
        basicFifthStrike: "62 + 82% ATK",
        basicFifthStrikeStats: {
            base: 62,
            atk: 82,
            hp: 0,
            def: 0
        },
        basicChargedAttack: "120% + 160% ATK",
        basicChargedAttackStats: {
            base: 120,
            atk: 160,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "160 + 213% ATK",
        activeSkillStats: {
            base: 160,
            atk: 213,
            hp: 0,
            def: 0
        },
    },
]