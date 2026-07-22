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
        passiveSkillFormula1: `Support Skill under Darknight Reign: 
720 + 384 % ATK + 35 % of Max HP`,
        passiveSkillStats1: {
            base: 720,
            atk: 384,
            hp: 35,
            def: 0
        },
        passiveSkillFormula2: `Active Skill under Darknight Reign: 
520 + 277 % ATK + 25 % of Max HP`,
        passiveSkillStats2: {
            base: 520,
            atk: 277,
            hp: 25,
            def: 0
        },
        buffEidolon0Formula: "",
        buffEidolon1Formula: "+ 40% Active Skill damage under Darknight Reign",
        buffEidolon1Stats: {
            additionalBuff: 40,
        },
        buffEidolon2Formula: "+ 12.5% DEF ignore under Darknight Reign",
        buffEidolon2Stats: {
            defIgnore: 12.5,
        },
        buffEidolon3Formula: "+ Support Skill damage under Darknight Reign increases by 6%, up to 36%",
        buffEidolon3Stats: {
            additionalBuff: 6,
        },
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
        buffEidolon1Formula: "+ 25% DMG and for Moonlight",
        buffEidolon1Stats: {
            additionalBuff: 25,
        },
        buffEidolon3Formula: "+ 30 Crit DMG for crit hit of Moonlight",
        buffEidolon3Stats: {
            critDMG: 30,
        },
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
        resonanceSkillBuff: "Under Luminescent Field +10% ATK bonus +20% to weakened enemies",
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
        buffEidolon0Formula: "+ 25% Active Skill DMG",
        buffEidolon1Stats: {
            additionalBuff: 25,
        },
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
        resonanceSkillBuff: "Under Resonance Skill +20% ATK",
        ardentOathFormula: "1200 + 1600% ATK",
        ardentOathStats: {
            base: 1200,
            atk: 1600,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: "+7% Crit Rate",
        passiveSkillStats1: {
            critRate: 7,
        }
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
        passiveSkillFormula1: "ЗАПОЛНИТЬ",
        passiveSkillStats1: {
            base: 0,
            atk: 0,
            hp: 0,
            def: 0
        },
        passiveSkillFormula2: "ЗАПОЛНИТЬ",
        passiveSkillStats2: {
            base: 0,
            atk: 0,
            hp: 0,
            def: 0
        },
        buffEidolon0Formula: "While awakened as [Deity of Niava], you and Zayne deal 8% additional DMG",
        buffEidolon0Stats: {
            additionalBuff: 8,
        },
        buffEidolon1Formula: "During the [Deity of Niava] state deals AoE DMG equal to 242 + 129% ATK + 11.6% of Max HP",
        buffEidolon1Stats: {
            additionalBuff: 0,
        },
        buffEidolon2Formula: "+20% Active Skill DMG",
        buffEidolon2Stats: {
            additionalBuff: 20,
        },
        buffEidolon3Formula: "Enemies hit by [Terminus Arrow] or [Divine Sever] take 30% more DMG for 4s",
        buffEidolon3Stats: {
            additionalBuff: 30,
        },
    },
    {
        companionName: "Zayne: Master of Fate",
        cardIds: [291, 292],
        supportSkillFormula: "260 + 348% ATK DMG",
        supportSkillStats: {
            base: 260,
            atk: 348,
            hp: 0,
            def: 0
        },
        empoweredSupportSkillFormula: "372 + 492% ATK DMG",
        empoweredSupportSkillStats: {
            base: 372,
            atk: 492,
            hp: 0,
            def: 0
        },
        resonanceSkillFormula: "632 + 842% ATK DMG",
        resonanceSkillStats: {
            base: 632,
            atk: 842,
            hp: 0,
            def: 0
        },
        ardentOathFormula: "1440 + 1920% ATK DMG",
        ardentOathStats: {
            base: 1440,
            atk: 1920,
            hp: 0,
            def: 0
        },
        passiveSkillFormula1: "233 + 310% ATK DMG",
        passiveSkillStats1: {
            base: 233,
            atk: 310,
            hp: 0,
            def: 0
        },
        buffEidolon0Formula: "Enemies inflicted with [Shattered Jade] have their DEF reduced by 10%.",
        buffEidolon0Stats: {
            defIgnore: 10,
        },
        buffEidolon1Formula: "+0.5-10% DMG to Weakness enemies",
        buffEidolon1Stats: {
            additionalBuff: 10,
        },
        buffEidolon3Formula: "+100% Companion Passive Skill DMG",
        buffEidolon3Stats: {
            additionalBuff: 0,
        },
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
        buffEidolon0Formula: "+25% Companion Passive Skill DMG",
        buffEidolon0Stats: {
            additionalBuff: 25,
        },
        buffEidolon1Formula: "+12% under [Ward of Curses]",
        buffEidolon1Stats: {
            additionalBuff: 12,
        },
        buffEidolon2Formula: "+10% DMG after using Resonance Skill",
        buffEidolon2Stats: {
            additionalBuff: 10,
        },
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
        passiveSkillFormula1: "+20% DMG to Frozen enemies",
        passiveSkillStats1: {
            base: 0,
            atk: 0,
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
        passiveSkillFormula2: `Lightning Tide under Divine Favor:
450 + 240% ATK + 951% DEF`,
        passiveSkillStats2: {
            base: 450,
            atk: 240,
            hp: 0,
            def: 951
        },
        passiveSkillFormula3: `Dodge under Divine Favor:
32 + 17% ATK + 68% DEF`,
        passiveSkillStats3: {
            base: 32,
            atk: 17,
            hp: 0,
            def: 68
        },
        buffEidolon1Formula: `Under Divine Favor random DMG:
270 + 144% ATK + 571% DEF`,
        buffEidolon1Stats: {
            base: 270,
            atk: 144,
            hp: 0,
            def: 571
        },
        buffEidolon2Formula: "+50% Charge Attack DMG",
        buffEidolon2Stats: {
            additionalBuff: 50,
        },
        buffEidolon3Formula: "+70% Lightning Tide DMG",
        buffEidolon3Stats: {
            additionalBuff: 70,
        },
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
        buffsupportSkillFormula: `ATK SPD is increased by 20%
DMG is increased by 25%`,
        buffsupportSkillStats: {
            additionalDMG: 25,
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
        passiveSkillFormula1: ``,
        passiveSkillStats1: {
            base: 0,
            atk: 0,
            hp: 0,
            def: 0
        },
        buffPassiveSkillFormula1: "+30% DMG to your and Companion DMG",
        buffPassiveSkillStats: {
            additionalDMG: 30,
        },
        buffEidolon0Formula: "+10 Crit DMG",
        buffEidolon0Stats: {
            critDMG: 10,
        },
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
        ardentOathFormula: "1440 + 1920%",
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
        passiveSkillFormula2: ``,
        passiveSkillStats2: {
            base: 0,
            atk: 0,
            hp: 0,
            def: 0
        },
        buffPassiveSkillFormula1: `+8% ATK to your and Companion DMG
+15% Crit Rate`,
        buffPassiveSkillStats: {
            additionalDMG: 8,
            critRate: 15
        },
        buffEidolon0Formula: "+30 Crit DMG under Deepsea Pursuit",
        buffEidolon0Stats: {
            critDMG: 30,
        },
        buffEidolon1Formula: "+20% Burn DMG",
        buffEidolon1Stats: {
            additionalBuff: 20,
        },
        buffEidolon3Formula: "+150% Searing Slash DMG",
        buffEidolon3Stats: {
            additionalBuff: 150,
        },
    },

]

export const weaponDataShowcaseSpecific = [
    {
        weaponName: "Final Resound",
        basicAttackFormula: "",
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
        buffPassiveSkillMCFormula: `Under Darknight Reign 
+ 8% damage dealt + 8% DMG Boost to Weakened`,
        buffPassiveSkillStats: {
            DMGBoost: 8,
            WeakenedBoost: 8,
        },
    },
    {
        weaponName: "Moonchaser",
        basicAttackFormula: "",
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
        activeSkillSecondFormula: "",
        activeSkillSecondStats: {
            base: 0,
            atk: 0,
            hp: 0,
            def: 0
        },
        buffPassiveSkillFormula: ``,
        buffPassiveSkillStats: {
            DMGBoost: 0,
            WeakenedBoost: 0,
        },
    },
    {
        weaponName: "Luminescence Blade",
        basicAttackFormula: "",
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
        basicAttackFormula: "",
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
        basicChargedAttack: "",
        basicChargedAttackStats: {
            base: 0,
            atk: 0,
            hp: 0,
            def: 0
        },
        activeSkillFormula: "338 + 180% ATK + 16.2% of Max HP",
        activeSkillStats: {
            base: 338,
            atk: 180,
            hp: 16.2,
            def: 0
        },
        activeSkillSecondFormula: "",
        activeSkillSecondStats: {
            base: 0,
            atk: 0,
            hp: 0,
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
        basicAttackFormula: "",
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
        basicAttackFormula: "",
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
        buffBasicChargedAttackFormula: "+50% Charge Attack DMG",
        buffBasicChargedAttackStats: {
            addtionalDMG: 50,
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
        buffActiveSkillFormula: "+10% CRIT Rate to your and Companion DMG",
        buffActiveSkillStats: {
           critRate: 10,
        },
    },
    {
        weaponName: "Phantasma Sands",
        basicAttackFormula: "",
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
        buffPassiveSkillMCFormula: "+10% Crit Rate",
        buffPassiveSkillMCStats: {
            critRate: 10,
        },
    },
]