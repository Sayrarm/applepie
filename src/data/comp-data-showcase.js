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
        buffPassiveSkillFormula: `Under Darknight Reign 
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
]