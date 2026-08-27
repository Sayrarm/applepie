export const compData = [
  {
    id: 11,
    cardIds: [199, 200],
    link: "kod",
    img: "../assets/companions/xavier-kod.png",
    imgWeapon: "../assets/companions/final-resound.png",
    companionName: "Xavier: King of Darknight",
    speciality: "DPS | Burst | Single-target",
    weaponName: "Final Resound",
    specialityMC: "DPS | AoE | Empower",
    supportSkill: "Royal Seal",
    supportSkillCooldown: "15 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_st_2102_02.png",
    supportSkillText: `
Xavier pierces enemies with his sword, dealing DMG equal to 364+194% ATK+17% of Max HP in total and granting you 1 stack of [Last Words]. Xavier becomes unstoppable for the entire duration. When you enter the [Darknight Reign] state or when [Darknight Reign] ends, [Royal Seal]'s cooldown will end in 5s.
[Empowered] Royal Seal: Xavier strikes with his sword while detonating radiant light, sweeping up surrounding Lumenflora petals to deal additional DMG equal to 216+115% ATK+10% of Max HP. [Empowered] Support Skills cannot be triggered during [Darknight Reign].
        `,
    resonanceSkill: "Lumenflora Grace",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_st_2102_03.png",
    resonanceSkillText: `
Xavier leaps into the air with you, gathering enemies within the radiant light, then strikes down toward the ground with his sword, blooming a sea of Lumenflora that deals DMG equal to 1767+942% ATK+84% of Max HP in total and 1 point of [Protocore DMG].
        `,
    ardentOath: "Royal Decree",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_st_2102_04.png",
    ardentOathText: `
Xavier thrusts his sword into the Sinders, summoning a sea of Lumenflora and mirages of Sindersfell. You bless him with resonance as he wields a giant sword to strike enemies, dealing DMG equal to 1800+960% ATK+86% of Max HP in total.
        `,
    passiveSkill: "Coronation",
    passiveSkillImg: "../assets/battle-icons/a2_skill_st_2102_01.png",
    passiveSkillText: `
Upon entering battle, you gain an additional skill [Darknight Coronation]. After casting it, you and Xavier enter the [Darknight Reign] state for 9s. [Darknight Coronation] has a(n) 30s cooldown.
When not in the [Darknight Reign] state, you accumulate [Last Words] over time, up to 3 stacks. Casting your Active Skill consumes 1 stack of [Last Words], reducing [Darknight Coronation] cooldown by 4s and granting 1 [Lumenflora Stamen]. [Lumenflora Stamens] provide special effects during [Darknight Reign]. You can hold up to 3 at once.
During [Darknight Reign], Xavier's attacks are empowered, and his Support Skill [Royal Seal] will bloom additional [Lumenflora], dealing AoE DMG equal to 720+384% ATK+35% of Max HP.
During [Darknight Reign], your Active Skill is replaced with Active Skill [The Chosen One's Blessing]. Casting [The Chosen One's Blessing] creates [Radiant Ripples] beneath your feet, dealing AoE DMG equal to 520+277% ATK+25% of Max HP. You're invincible while using [The Chosen One's Blessing].
[The Chosen One's Blessing] has an initial 13s cooldown and can be cast up to 3 times during the duration of [Darknight Reign]. Upon entering the [Darknight Reign] state, each [Lumenflora Stamen] you possess reduces [The Chosen One's Blessing]'s initial cooldown by 3.4s.
        `,
    basicAttack: "Prayer",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1903_01_ST_2102.png",
    basicAttackText: `
Wield Final Resound to perform up to four consecutive attacks.
First Strike: 98+52% ATK+4.7% of Max HP
Second Strike: 88+46% ATK+4.2% of Max HP 
Third Strike:122+65% ATK+5.9% of Max HP 
Fourth Strike:147+78% ATK+7.1% of Max HP

Charged Attack shoots forth a ray of radiant light, dealing DMG equal to 165+88% ATK+7.9% of Max HP.
        `,
    activeSkill: "Final Elegy",
    activeSkillCooldown: "12 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1903_02_ST_2102.png",
    activeSkillText: `
Wield Final Resound and sing an elegy, dealing AoE DMG equal to 351+187% ATK+16.8% of Max HP to enemies. Within 2.7s of casting your Active Skill, if you have at least 1 stack of [Last Words], you may cast your Active Skill again with enhanced damage, dealing AoE DMG equal to 376+200% ATK+18% of Max HP.
        `,
    passiveMCSkill: "Procession",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1903_03_ST_2102.png",
    passiveMCText: `
Hitting an enemy with the Active Skill for the first time recovers 0.45 Energy Charges. While casting your Active Skill, you become unstoppable and your damage taken is reduced by 10%. During [Darknight Reign], damage dealt is increased by 8%, and DMG Boost to Weakened is increased by 8%.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG.
The first hit of each Active Skill reduces Support Skill cooldown by 5s.
When not in [Darknight Reign] hitting enemies with Charged Attacks grants [Pilgrim's Prayer], increasing the accumulation rate of [Last Words] for 10s. Gaining it again refreshes duration.
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%.
When you create [Radiant Ripples], Support Skill cooldown is refreshed; [Radiant Ripples] damage increases by 40% When not in the [Darknight Reign] state, casting Resonance Skills grants you [Pilgrim's Prayer]. While [Darknight Reign] is active, you become unstoppable.
        `,
    eidolon2: `
Energy Charge limit is raised by 1.
While [Darknight Reign] is active, you and Xavier ignore 12.5% of enemy DEF and restore HP equal to 2% of Max HP per second.
        `,
    eidolon3: `
The team deals 8% more DMG.
When you create [Radiant Ripples], Xavier will also create [Radiant Ripples].
While [Darknight Reign] is active, each time [Radiant Ripples] undulate, [Lumenflora]'s damage increases by 6%, up to 36%. This damage boost effect is cleared when [Darknight Reign] ends.
        `,
  },
  {
    id: 12,
    cardIds: [197, 198],
    link: "lumiere",
    img: "../assets/companions/xavier-lumiere.png",
    imgWeapon: "../assets/companions/moonchaser.png",
    companionName: "Xavier: Lumiere",
    speciality: "DPS | Burst | Control",
    weaponName: "Moonchaser",
    specialityMC: "DPS | Sustained | Single-target",
    supportSkill: "Lunar Vortex",
    supportSkillCooldown: "20 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_st_2106_02.png",
    supportSkillText: `
Xavier summons moonlight into his sword and stabs it into the ground, drawing enemies to the center of the moonlight, dealing DoT damage while reducing their ATK by 30% and speed by 50% for 5 second(s).
After the moonlight disperses, the ATK and SPD reduction last for 2.5 more second(s).
[Empowered] Lunar Vortex: Several beams of [Moonlight] will randomly descend within the area, dealing DMG to enemies.
        `,
    resonanceSkill: "Lunar Radiance",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_st_2106_03.png",
    resonanceSkillText: `
Xavier teleports to the target enemy for multiple flash attacks, dealing DMG equal to 631+336% ATK+1333% DEF and leaving a Lunar Arclight. You fire two shots at the target before detonating the Arclight, causing all enemies in the blast zone to take 1 point [Protocore DMG] and enter [Moonstruck] for 5 seconds. In total, you deal 686 + 366% ATK +1450% DEF as damage.
[Moonstruck]: Reduces ATK by 45%.
        `,
    ardentOath: "Moonlit Heart",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_st_2106_04.png",
    ardentOathText: `
You resonate with Xavier's Evol and jointly attack the enemy, tearing apart time and space, shooting countless rays of light at the enemy, and dealing 1440+780% ATK +3060% DEF DMG.
The shining moonlight of those sealed memories is the light that always leads him to you.
        `,
    passiveSkill: "Moonfall",
    passiveSkillImg: "../assets/battle-icons/a2_skill_st_2106_01.png",
    passiveSkillText: `
When you and Xavier release basic attacks and skills, a stack of [Phasing Moon] is added upon hitting the enemy. In particular, 1 stack of [Phasing Moon] is added every time Xavier scores a hit. After reaching 4 stacks of [Phasing Moon], a beam of Moonlight will fall on the enemy, dealing 92+49% ATK+194% DEF DMG within a small area, and reducing the movement speed of enemies within the area by 25%.
        `,
    basicAttack: "Moonburn",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1901_02_ST_2106.png",
    basicAttackText: `
Wield dual guns for a combo up to 5 hits. The final Basic Attack inflicts multiple instances of DMG. 
First Strike: 55+29% ATK+117% DEF.
Second Strike: 50+26% ATK+105% DEF 
Third Strike: 66+35% ATK+140% DEF 
Fourth Strike: 72+38% ATK+152% DEF 
Fifth Strike: 77+41% ATK+163% DEF

Charged Attack will knock back nearby enemies, dealing AoE DMG equal to 150+80% ATK+317% DEF.
        `,
    activeSkill: "Moontide",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1901_03_ST_2106.png",
    activeSkillText: `
Attack the target with a 4-hit combo, dealing DMG equal to 403+215% ATK +852% DEF.
        `,
    passiveMCSkill: "Moonbeam",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1901_01_ST_2106.png",
    passiveMCText: `
[Moontide] triggers [Moonfall] with each successful hit.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
The enemy's [Moonstruck] state duration is extended by 3s.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
[Moonlight] deals 25% more DMG and applies 1 stack of [Phasing Moon] to the target.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
When [Moonlight] is triggered, your Active Skill cooldown is reduced by 0.5s and a small amount of Energy Charge is restored.
        `,
    eidolon3: `
The team deals 8% more DMG. 
When your Active Skills and Charged Attacks hit the first target inflicted with [Moonstruck], directly trigger [Moonlight]. When Moonlight scores a critical hit, it deals an additional 30% CRIT DMG.
        `,
  },
  {
    id: 13,
    cardIds: [195, 196],
    link: "lightseeker",
    img: "../assets/companions/xavier-lightseeker.png",
    imgWeapon: "../assets/companions/luminescence-blade.png",
    companionName: "Xavier: Lightseeker",
    speciality: "DPS | AoE | Empower",
    weaponName: "Luminescence Blade",
    specialityMC: "DPS | Sustained | Empower",
    supportSkill: "Starlight Storm",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_st_2103_02.png",
    supportSkillText: `
Xavier charges his sword and attacks multiple times, dealing 300+400% ATK DMG in a large area.
[Empowered] Starlight Storm: DMG is increased, dealing 347+462% ATK DMG and recharging 6% of Ardent Oath.
        `,
    resonanceSkill: "Luminescent Field",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_st_2103_03.png",
    resonanceSkillText: `
Wield a sword and resonate with light to summon a Radiant Blade.
Radiant Blade: When active, it attacks enemies within a large area and deals AoE DMG equal to 641+854% ATK and 1 [Protocore DMG]. A [Luminescent Field] is also deployed providing allied units within [Luminescent Field] a 10% ATK bonus.
If Radiant Blade breaks the enemy's shield, extra DMG of the team will boost by 20%, lasting for 10s.
        `,
    ardentOath: "Galactic Pulse",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_st_2103_04.png",
    ardentOathText: `
You and Xavier brandish a blade and attack together, dealing massive DMG equal to 1440+1920% of your combined ATK.
        `,
    passiveSkill: "Radiant Star",
    passiveSkillImg: "../assets/battle-icons/a2_skill_st_2103_01.png",
    passiveSkillText: `
When you use an Active Skill to score a hit while inside [Luminescent Field], [Luminescent Resonance] is triggered. 
[Luminescent Resonance]: Resonate with light and unleash an attack around yourself, dealing AoE DMG equal to 150+200% ATK.
        `,
    basicAttack: "Slicing Light",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1904_02_ST_2103.png",
    basicAttackText: `
Wield the Sword for a multi-hit combo.
First Strike: 60+80% ATK DMG 
Second Strike: 60+80% ATK DMG 
Third Strike: 72+96% ATK DMG 
Fourth Strike: 96+129% ATK DMG

Charged Attack will unleash a single forward slash, inflicting AoE DMG equal to 118+157% ATK.
        `,
    activeSkill: "Shining Blade's Swadow",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1904_03_ST_2103.png",
    activeSkillText: `
After a brief charge-up, lunge forward and unleash a slashing attack on the enemies ahead, dealing AoE DMG of 341+455% ATK.
        `,
    passiveMCSkill: "Song of Light",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1904_01_ST_2103.png",
    passiveMCText: `
[Luminescent Resonance] recovers 0.35 [Energy Charge] for each enemy hit.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
When fighting together with Lightseeker, your Active Skill DMG is increased by 25%.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
When fighting alongside Lightseeker, each time [Luminescent Resonance] triggers, [Radiant Blade]'s duration is extended by 2s.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
When you and Lightseeker are in [Luminescent Field], take 10% less DMG and gain increased Interruption Resistance.
        `,
    eidolon3: `
Increases team DMG by 8%. 
When fighting together with Lightseeker in the [Luminescent Field] and hitting enemies with a Charged Attack, the cooldown of your Active Skill will be reduced by 2s.
        `,
  },
  {
    id: 14,
    link: "evol-police",
    img: "../assets/companions/xavier-police.png",
    companionName: "Xavier: Evol Police",
    speciality: "Support | Control",
    supportSkill: "Refulgent Shadow",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_st_2104_02.png",
    supportSkillText: `
With his ribbon of light, Xavier speedily seals off the area, dealing DMG equal to 306+408% of his ATK to all enemies in range. 
[Empowered] Refulgent Shadow: Attack attempts are further increased, dealing DMG equal to 396+528% of Xavier's ATK. The final segment of attacks inflicts Immobilized on the units hit.
        `,
    resonanceSkill: "Refulgent Onsaulght",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_st_2104_03.png",
    resonanceSkillText: `
You quickly attack the enemy, dealing 1 [Protocore DMG]. Xavier then chases down the enemy for a follow-up attack, dealing 726+968% ATK DMG.       
        `,
    ardentOath: "Refulgent Resonantia",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_st_2104_04.png",
    ardentOathText: `
Your Evol resonates with Xavier's. You gather the energy from the Protofield and work together to perform a powerful slash that deals DMG equal to 1200+1600% ATK DMG. 
        `,
    passiveSkill: "Light Amplification",
    passiveSkillImg: "../assets/battle-icons/a2_skill_st_2104_01.png",
    passiveSkillText: `
When your Active Skill or Resonance Skill hits an enemy, one stack of Transmitted Light is applied to the enemy and lasts for 8s.
When Transmitted Light is active your and Xavier's Basic Attacks will increase the number of stacks. Upon reaching 6 stacks, Transmitted Light is removed, and the enemy will be immobilized for 4s. The immobilized enemy will take 20% more DMG.
Transmitted Light cannot be inflicted on the enemy while it is immobilized.   
        `,
  },
  {
    id: 15,
    link: "distant-youth",
    img: "../assets/companions/xavier-youth.png",
    companionName: "Xavier: Distant Youth",
    speciality: "Defend | Buff",
    supportSkill: "Paper Blade",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_st_2105_02.png",
    supportSkillText: `
Xavier leaps into the air and unleashes a sword energy wave, dealing 340 + 453% AoE DMG.
[Empowered] Paper Blade: The sword energy explodes, causing an additional 90 + 120% ATK DMG.
        `,
    resonanceSkill: "Fluttering Fireflies",
    resonanceSkillCooldown: "18 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_st_2105_03.png",
    resonanceSkillText: `
You and Xavier dash forward to the enemy, performing three rapid thrusts, dealing a total of 739 + 986% ATK DMG. On the third thrust, an additional 1 point of [Protocore DMG] is inflicted.       
        `,
    ardentOath: "Starry Wish",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_st_2105_04.png",
    ardentOathText: `
You resonate with Xavier's Evol.
Harnessing the power of memories for each other, you two launch a combined attack. Together, you pierce through the enemy, dealing a substantial DMG of 1200 + 1600% ATK.
        `,
    passiveSkill: "Rainfall Shield",
    passiveSkillImg: "../assets/battle-icons/a2_skill_st_2105_01.png",
    passiveSkillText: `
When you and Xavier hit an enemy, you recover a small amount of Sword Intent. Additionally, a shield is generated, granting immunity to the next control effect when taking damage, along with 50% DMG reduction. Your attacks deal 100% ATK DMG to enemies and provide additional recovery of Sword Intent. (The shield triggers every 10s.)
When you unleash a Resonance Skill, you immediately gain a big amount of Sword Intent and enter the Energetic state. The Energetic state consumes Sword Intent and enhances your ATK DMG. The higher the target's HP, the more DMG you inflict, up to a maximum increase of 30%. This state persists until all Sword Intent is consumed.   
        `,
  },
  {
    id: 16,
    link: "hunter",
    img: "../assets/companions/xavier-hunter.png",
    companionName: "Xavier: Deepspace Hunter",
    speciality: "DPS | Single-target",
    supportSkill: "Hidden Star",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_st_2101_02.png",
    supportSkillText: `
Xavier disappears briefly before reappearing and attacking the enemy multiple times. After he gathers energy, he forces the enemy into the air and deals AoE DMG equal to 330+440% ATK.
[Empowered] Hidden Star: Number of attacks increases, dealing 420+560% ATK DMG.
        `,
    resonanceSkill: "Stella Sequor",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_st_2101_03.png",
    resonanceSkillText: `
Xavier teleports to the target's location and enters a charging state before joining you to stab enemies with a lightblade, dealing 318+424% ATK DMG and 1 [Protocore DMG].
When using this Resonance Skill, you and Xavier gain a 20% ATK buff for 8s.      
        `,
    ardentOath: "Supernova",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_st_2101_04.png",
    ardentOathText: `
Your Evol resonates with Xavier's. You gather the energy from the Protofield and work together to perform a powerful slash that deals DMG equal to 1200+1600% of your combined ATK.
        `,
    passiveSkill: "Shattered Star",
    passiveSkillImg: "../assets/battle-icons/a2_skill_st_2101_01.png",
    passiveSkillText: `
Your and Xavier's CRIT Rate increases by 7%.    
        `,
  },
  {
    id: 21,
    cardIds: [293, 294],
    link: "goa",
    img: "../assets/companions/zayne-goa.png",
    imgWeapon: "../assets/companions/divine-grip.png",
    companionName: "Zayne: God of Annihilation",
    speciality: "DPS | Burst | Empower",
    weaponName: "Divine Grip",
    specialityMC: "DPS | Burst | Single-target",
    supportSkill: "Endbringer Arrow",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ys_2207_02.png",
    supportSkillText: `
Zayne fires a piercing arrow forward, dealing DMG equal to 98+52% ATK+4.7% of Max HP. The piercing arrow explodes upon hitting the first enemy, dealing total DMG equal to 272+143% ATK+13.1% of Max HP.
[Empowered] Endbringer Arrow: Explosion damage is increased, dealing total DMG equal to 368+195% ATK+17.7% of Max HP. This skill cannot be triggered during the [Deity of Niava] state.
During the [Deity of Niava] state, [Endbringer Arrow] will be replaced by [Divine Sever]
[Divine Sever]: Fires multiple beams of energy that sever connections with the world, dealing total DMG equal to 852+456% ATK+40.8% of Max HP. This damage counts as Charged Attack damage. [Divine Sever] cannot be cast directly. You can refresh this skill by shattering an enemy's [Soul Rift]. This skill is not considered a Support Skill and cannot be cast consecutively within a short period of time.
        `,
    resonanceSkill: "Divinity Order",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ys_2207_03.png",
    resonanceSkillText: `
Zayne unleashes divine power to continuously gather nearby enemies while you ready your [Divine Grip], resonating with him. The power of Resonance transforms into divine arrows that strike enemies, dealing AoE DMG equal to 1262+674% ATK+60.6% of Max HP and 1 [Protocore DMG].
        `,
    ardentOath: "Aengru Radiance",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ys_2207_04.png",
    ardentOathText: `
Zayne and you enter the Aengru Field, channeling the divine power of creation and annihilation to form a divine golden bow. [Divine Grip] transforms into an arrow, and together with countless Golden Aenzus, you unleash a final devastating strike, dealing DMG equal to 1800+960% ATK+86% of Max HP to all enemies.
The deity knows neither birth nor death, bound to all that is set, until He develops desires of His own.
        `,
    passiveSkill: "Fateful Bond",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ys_2207_01.png",
    passiveSkillText: `
When entering battle, Zayne will be bound by 3 stacks of [Divine Shackles]. You can remove [Divine Shackles] using [Golden Arrows].
When your Basic Attack hits an enemy, Zayne will load 1 [Golden Arrow] for you. This effect can trigger only once per Basic Attack. You can hold up to 4 [Golden Arrows] at once.
When your Charged Attack hits the first enemy, all [Golden Arrows] will be fired at the target, with each [Golden Arrow] dealing DMG equal to 88+47% ATK+4.3% of Max HP. Each [Golden Arrow] fired will leave behind a [Remnant Feather] that lasts for 5s. Obtaining a [Remnant Feather] refreshes the duration of all [Remnant Feathers]. [Remnant Feathers] share the same maximum capacity as [Golden Arrows]. When your Active Skill hits, all [Remnant Feathers] will convert into [Golden Arrows]. This effect can trigger only once per Active Skill cast.
When [Golden Arrows] hit an enemy, they leave an [Arrow Mark]. [Arrow Mark] can stack up to 4 times. At maximum stacks, [Arrow Mark] will be consumed, removing 1 stack of [Divine Shackles] and restoring 0.35 [Energy Charge]. When [Arrow Mark] reaches maximum stacks, Zayne will also fire a [Terminus Arrow] as a follow-up attack, dealing DMG equal to 354+189% ATK+17% of Max HP and restoring HP equal to 5% of Max HP to both you and your Companion.
When all [Divine Shackles] are removed, you can cast [Bind Gaze].
[Bind Gaze]: You remove the Hidden Divinity covering Zayne's eyes. Zayne opens his divine eyes, clearing all [Golden Arrows], [Remnant Feathers], and [Arrow Marks].
You and Zayne awaken as the [Deity of Niava] for 10s During this time, enemies' [Soul Rifts] are revealed.
[Soul Rift]: Your Charged Attack will shatter an enemy's [Soul Rift] on hit, dealing DMG equal to 315+168% ATK+15.1% of Max HP. During the [Deity of Niava] state, enemies' [Soul Rifts] will be revealed again 6s after being shattered. Additionally, when your Active Skill hits an enemy for the first time, if that enemy has no [Soul Rift], the interval before its [Soul Rift] is revealed again will be reduced by 0.5s.
After [Deity of Niava] ends, Zayne will once again have 3 stacks of [Divine Shackles], and all [Soul Rifts] will be cleared.
        `,
    basicAttack: "Order Rupture",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1902_01_YS_2207.png",
    basicAttackText: `
Wield [Divine Grip] to perform up to four consecutive attacks.
First Strike: 105+56% ATK+5.1% of Max HP 
Second Strike: 116+62% ATK+5.6% of Max HP 
Third Strike: 116+62% ATK+5.6% of Max HP 
Fourth Strike: 147+78% ATK+7.1% of Max HP

Charged Attack delivers two consecutive slashes, dealing total DMG equal to 112+60% ATK+5.3% of Max HP. The second slash on hit applies [Rupture Mark] to the enemy. This effect cannot stack.
[Rupture Mark]: Deals DMG equal to 83+44% ATK+4% of Max HP every 1s for 2s.
        `,
    activeSkill: "Divine Jugment",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1902_02_YS_2207.png",
    activeSkillText: `
Concentrate divine power to thrust forward, dealing DMG equal to 338+180% ATK+16.2% of Max HP to the target. After thrusting, immediately hold the Basic Attack button to chain into a Charged Attack.
        `,
    passiveMCSkill: "Divine Slash",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1902_04_YS_2207.png",
    passiveMCText: `
You are more resistant to interruption while attacking enemies. While unleashing Active Skills, you become unstoppable and take 40% less damage. Within 4s after [Divine Judgment] is cast, [Divine Judgment] will be replaced by the Active Skill [Divine Slash], which does not consume [Energy Charge].
[Divine Slash]: Swing [Divine Grip] forward, then leap into the air and slam it into the ground, dealing total AoE DMG equal to 389+207% ATK+18.7% of Max HP. While leaping, you will also fire all your [Golden Arrows] at the target.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG.
When fighting alongside God of Annihilation, you become unstoppable during Charged Attacks and take 40% less DMG.
While awakened as [Deity of Niava], you and Zayne deal 8% additional DMG.
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
During the [Deity of Niava] state, your Basic Attacks can also shatter enemies' [Soul Rifts] on hit. Additionally, when your Active Skill hits an enemy for the first time, if that enemy has no [Soul Rift], their [Soul Rift] will be revealed again. [Divine Sever] creates an additional array that continuously pulls in nearby enemies. After a period of time, the array explodes, dealing AoE DMG equal to 242+129% ATK+11.6% of Max HP.
        `,
    eidolon2: `
Energy Charge limit is raised by 1.
When fighting alongside God of Annihilation, your Active Skill DMG is increased by 20%. When you shatter [Soul Rifts], you and Zayne each restore HP equal to 5% of Max HP.
        `,
    eidolon3: `
The team deals 8% more DMG.
Enemies hit by [Terminus Arrow] or [Divine Sever] take 30% more DMG for 4s. When you load [Golden Arrows] with Basic Attacks, you will gain 1 additional [Golden Arrow].
        `,
  },
  {
    id: 22,
    cardIds: [291, 292],
    link: "mof",
    img: "../assets/companions/zayne-mof.png",
    imgWeapon: "../assets/companions/sacred-rainfall.png",
    companionName: "Zayne: Master of Fate",
    speciality: "DPS | Burst | Sustained",
    weaponName: "Sacred Rainfall",
    specialityMC: "DPS | Burst | Single-target",
    supportSkill: "Return Unto Oblivion",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ys_2204_02.png",
    supportSkillText: `
Zayne forms hand seals to gather power, summoning 4 talismans to attack the enemy, dealing 260+348% ATK DMG in total.
[Empowered] Return Unto Oblivion: The number of talismans is increased to 6, dealing 372+492% ATK DMG in total.
        `,
    resonanceSkill: "Orchid Metamorphosis",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ys_2204_03.png",
    resonanceSkillText: `
Zayne teleports to you and resonates to expand the Orchid Field, dealing 632+842% ATK DMG and 1 [Protocore DMG] to enemies in a large area, and applies [Shattered Jade] to enemies hit.
        `,
    ardentOath: "Bamboo Mirage",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ys_2204_04.png",
    ardentOathText: `
You and Zayne cast a spell together, gathering heavenly and earthly energy to create a mirage of bamboo. In the mirage, many talismans will attack the enemy, dealing 1440+1920% ATK DMG in total.
        `,
    passiveSkill: "Jadesunder",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ys_2204_01.png",
    passiveSkillText: `
When you and Zayne strike an enemy in [Shattered Jade] state, [Jadesunder Intention] will be inflicted on the enemy. When [Jadesunder Intention] reaches the upper limit, [Jadesunder] is triggered, dealing 233+310% ATK DMG to the enemy. The effect can be triggered for multiple times when the enemy is under [Shattered Jade] state.
        `,
    basicAttack: "Wind Leaf",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1904_02_YS_2204.png",
    basicAttackText: `
Wield a sword for a multi-hit combo to deal DMG. 
First Strike: 75+100% ATK DMG
Second Strike: 75+100% ATK DMG 
Third Strike: 90+121% ATK DMG 
Fourth Strike: 121+161% ATK DMG

Charged Attack will unleash a single slash, inflicting AoE DMG equal to 141+188% ATK.
        `,
    activeSkill: "Spiritual Sword",
    activeSkillCooldown: "8 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1904_03_YS_2204.png",
    activeSkillText: `
Raise the sword to summon multiple spiritual swords, then thrust them all forward to deal multiple segments of DMG equal to 404+539% ATK.
        `,
    passiveMCSkill: "Piercing Rain",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1904_01_YS_2204.png",
    passiveMCText: `
Within 13s after using [Orchid Metamorphosis], [Orchid Metamorphosis] will be replaced by [Piercing Rain]. When the skill is replaced, [Piercing Rain] can be used for up to 3 times.
[Piercing Rain]: Use a sword to perform two consecutive attacks, dealing 205+273% ATK DMG in total. The damage dealt will be counted as Resonance Skill DMG.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
Enemies inflicted with [Shattered Jade] have their DEF reduced by 10%.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
When fighting alongside Master of Fate, the enemy's weakened state is extended by 2 seconds Each time an enemy in weakened state is hit, the damage it sustains increases by 0.5%, up to a maximum of 10%.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
When triggering [Jadesunder], a small amount of Energy Charge is restored.
        `,
    eidolon3: `
The team deals 8% more DMG. 
[Jadesunder] DMG is increased by 100%. During skill replacement, [Piercing Rain] can be used 1 additional time. When Piercing Rain hits enemies, its cooldown is reduced by 0.5s.
This effect can trigger only once per use of Piercing Rain.
        `,
  },
  {
    id: 23,
    cardIds: [289, 290],
    link: "foreseer",
    img: "../assets/companions/zayne-foreseer.png",
    imgWeapon: "../assets/companions/everlasting-song.png",
    companionName: "Zayne: Foreseer",
    speciality: "Defend | DMG | AoE",
    weaponName: "Everlasting Song",
    specialityMC: "Support | AoE | Heal",
    supportSkill: "Ward of Curses",
    supportSkillCooldown: "15 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ys_2202_02.png",
    supportSkillText: `
Zayne wields his scepter and begins an incantation, granting you and himself Ward of Curses.
Ward of Curses can absorb DMG up to 240% of its target's DEF.
[Empowered] Ward of Curses: Zayne gains 1 stack of [Divine Prayer] and triggers [Eternal sin] at your location.
        `,
    resonanceSkill: "Thorny Punishment",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ys_2202_03.png",
    resonanceSkillText: `
Zayne uses magic to summon brambles to ensnare his target, dealing AoE DMG equal to 790+421% ATK+1670% DEF and 1 [Protocore DMG]. He also gains 1 stack of [Divine Prayer].
        `,
    ardentOath: "Verglas Cage",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ys_2202_04.png",
    ardentOathText: `
You and Zayne use a scepter to summon a loveless, harsh frost energy, then strike the ground, causing ice to explode and dealing massive DMG equal to 1440+780% of your combined ATK+3060% combined DEF.
        `,
    passiveSkill: "Divine Prayer",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ys_2202_01.png",
    passiveSkillText: `
Upon entering battle, Zayne gains a stack of [Divine Prayer], up to 5 stacks.
When your last Basic Attack in a combo hits the target, Zayne gains 1 stack of [Divine Prayer].
When your Charged Attack hits an enemy, Zayne consumes 1 stack of [Divine Prayer] to trigger Eternal Sin.
Eternal Sin: Deals DMG to enemies within range equal to Zayne's 192+102% ATK + 406% DEF.
        `,
    basicAttack: "Offering From On High",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1903_02_YS_2202.png",
    basicAttackText: `
Wield a wand to start a combo up to 4 hits. Deals DMG equal to 288+154% ATK +609% DEF.
Charged Attack forces the enemy into the air, dealing DMG equal to 167+89% ATK + 353% DEF.
        `,
    activeSkill: "Sacred Signs",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1903_03_YS_2202.png",
    activeSkillText: `
Create a Sacred Sign at the target location that inflicts 6 instances of DMG on enemies within its range, each dealing 52+28% ATK+111% DEF DMG.
        `,
    passiveMCSkill: "Divine Precerm",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1903_01_YS_2202.png",
    passiveMCText: `
During a Dodge, you can use your basic attack. When you use an Active Skill, Zayne gains 1 stack of [Divine Prayer] restoring both of your HP equal to 1000+2.5% of your Max HP in 5s.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
When fighting alongside Foreseer, [Eternal Sin] DMG is increased by 25%.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
When you and Foreseer are under [Ward of Curses], DMG dealt is increased by 12%.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
When using a Resonance Skill, Foreseer additionally gains 1 stack of [Divine Prayer], and your DMG is increased by 10% for 10s.
        `,
    eidolon3: `
The team deals 8% more DMG. 
Every 6 seconds Foreseer gains 1 stack of [Divine Prayer].
        `,
  },
  {
    id: 24,
    link: "medic",
    img: "../assets/companions/zayne-medic.png",
    companionName: "Zayne: Medic of the Arctic",
    speciality: "Support | Dispel",
    supportSkill: "Snowfall",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ys_2206_02.png",
    supportSkillText: `
Zayne summons Snowfall at the center of enemy area, dealing AoE DMG equal to 208+275% ATK to surrounding enemies.
[Empowered] Snowfall: Attack frequency of Snowfall increases.
Upon hitting target(s), Snowfall will freeze them for 4s.
        `,
    resonanceSkill: "Guardian of Snow",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ys_2206_03.png",
    resonanceSkillText: `
Zayne returns to your side and attacks the target with you, dealing AoE DMG equal to 362+482% ATK and 1 [Protocore DMG].
After using a Resonance Skill, your attacks will have a 40% DMG buff for 8s.
        `,
    ardentOath: "Relentless Snow",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ys_2206_04.png",
    ardentOathText: `
Zayne's Evol field explodes into numerous ice shards to pierce enemies. You use Winter's Bow to fire frost projectiles at them, dealing AoE DMG equal to 1200+1600% of your ATK.
        `,
    passiveSkill: "Wintery Immortality",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ys_2206_01.png",
    passiveSkillText: `
When fighting alongside Zayne, you recover 0.4% HP every second, and your Energy Recovery SPD is increased by 25%. Zayne regularly eliminates all your debuff.   
        `,
  },
  {
    id: 25,
    link: "dawnbreaker",
    img: "../assets/companions/zayne-dawnbreaker.png",
    companionName: "Zayne: Dawnbreaker",
    speciality: "Burst | Single-target",
    supportSkill: "Dawnfrost Scythe",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ys_2205_02.png",
    supportSkillText: `
Zayne creates an ice spear that quickly stretches forward, dealing 626+835% AoE DMG along its path. 
[Empowered] Dawnfrost Scythe: The ice spear will explode after a short while, dealing an additional 54+72% ATK DMG.
        `,
    resonanceSkill: "Ghostly Reverberation",
    resonanceSkillCooldown: "20 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ys_2205_03.png",
    resonanceSkillText: `
You and Zayne conjure ice spears to impale the enemy. After the spears explode, they deal 252 + 336% ATK.
DMG to each enemy in the area, along with 1 point of [Protocore DMG]. Additionally, you and Zayne gain Reverberation of the departed souls allowing for immediate HP recovery.

Reverberation:
During Reverberation, Zayne will be empowered, bolstering his resilience to interruptions, but he will no longer dodge enemy attacks. He deals increased DMG as the target's HP decreases. The lower the HP, the greater the DMG.
With Reverberation, your resilience to interruptions is strengthened, and the final hit of your basic combo inflicts increased DMG. The lower the target's HP, the greater your DMG.
        `,
    ardentOath: "Chilling Blossom",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ys_2205_04.png",
    ardentOathText: `
You resonate with Zayne's Evol. As he creates numerous ice spears to impale the enemy, you gather ice and snow with your Frost Longbow, shooting it towards the enemy from mid-air. Together, you deal AoE DMG of 1200 + 1600% ATK.
        `,
    passiveSkill: "Frostborne",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ys_2205_01.png",
    passiveSkillText: `
When you and Zayne are granted [Reverberation] and defeat an enemy, recover 0.3 [Energy Charge] and reduce the cooldown of Resonance Skills by 2s. This effect can only be triggered once every 3s.    
        `,
  },
  {
    id: 26,
    link: "doctor",
    img: "../assets/companions/zayne-doctor.png",
    companionName: "Zayne: Linkon doctor",
    speciality: "Heal | Control",
    supportSkill: "Healing Rime",
    supportSkillCooldown: "15 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ys_2201_02.png",
    supportSkillText: `
Zayne releases rime at your location healing the target and inflicting AoE DMG equal to 75+100% ATK to surrounding enemies.
The healing potency of the rime is 121+161% of Zayne's ATK.
[Empowered] Healing Rime: When the rime hits surrounding enemies, it will Freeze them for 4s.
        `,
    resonanceSkill: "Icy Bolt",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ys_2201_03.png",
    resonanceSkillText: `
Your Evol resonates with Zayne's. Summon Winter's Bow before firing at enemies. Upon hitting its first target, the arrow explodes, dealing AoE DMG equal to 296+394% ATK and Freezes your enemies for 4s. Then, Zayne teleports to the targets' Iodation and deals AoE DMG equal to 296+394% ATK and 1 [Protocore DMG].      
        `,
    ardentOath: "Hoarfrost Saber",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ys_2201_04.png",
    ardentOathText: `
Zayne's Evol field produces numerous ice shards to pierce enemies. You use Winter's Bow to fire frost projectiles at them, dealing massive DMG equal to 1200+1600% ATK DMG.
        `,
    passiveSkill: "Verglas",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ys_2201_01.png",
    passiveSkillText: `
When attacking Frozen enemies with Zayne, deal 20% more DMG.
        `,
  },
  {
    id: 65,
    cardIds: [412, 413],
    link: "vmg",
    img: "../assets/companions/rafayel-vmg.png",
    imgWeapon: "../assets/companions/twilight-end.png",
    imgSync: "../assets/companions/rafayel-sync-skills.png",
    companionName: "Rafayel: Vermilion Martial God",
    speciality: "DPS | Single-target | Empower",
    weaponName: "Twilight's End",
    specialityMC: "DPS | Single-target | Empower",
    supportSkill: "Sweeping Clouds",
    supportSkillCooldown: "14 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ry_2508_02.png",
    supportSkillText: `
Rafayel swiftly moves to the target and slashes, dealing 300 + 400% ATK DMG. Casting it charges up [Vermilion Visage].
[Empowered] Sweeping Clouds: Increases DMG, dealing 360 + 480% ATK DMG. Applies 1 stack(s) of [Suppression] to enemies on hit and deals an extra [Suppression Weakness DMG] equal to 150+200% ATK. This skill cannot be triggered by Perfect Dodge. It is triggered when your Active Skill empowered by [Martial Intent] hits an enemy.
        `,
    resonanceSkill: "Skyfire Sweep",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ry_2508_03.png",
    resonanceSkillText: `
You wield [Twilight Haze] while Rafayel wields his blades. The two of you leap into the air in tandem, unleashing blazing torrents toward the enemy, drawing in enemies within range and dealing a total of 852 + 1136% ATK DMG and 1 point(s) of [Protocore DMG].
        `,
    ardentOath: "Ashen Tempest",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ry_2508_04.png",
    ardentOathText: `
You resonate with Rafayel. A mid the clash of blades, Rafayel seizes the momentum to soar skyward as [Ashen Pair] cleaves through the setting sun. The vermilion light transforms into countless blade tips that rain down upon the earth, dealing 1800 + 2400% ATK DMG.
You start with 15% Oath Energy.
        `,
    passiveSkill: "Rally Drum",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ry_2508_01.png",
    passiveSkillText: `
Charged Attacks accumulate [Martial Intent] on hit. This effect can only trigger once per Charged Attack. When you cast an Active Skill while [Martial Intent] is full, all [Martial Intent] is consumed to empower the Active Skill, increasing its DMG by 50%.
When fighting alongside the Vermilion Martial God, you gain [Vermilion Visage]. Using your Active Skill charges up the [Vermilion Visage].
Once the [Vermilion Visage] is fully charged, [Martial God's Descent] becomes available. Upon activation, you place [Vermilion Visage] on Rafayel, merging your souls and channeling the [Martial Soul], with all [Martial Intent] cleared. You command him while under his protection - his hands become yours, his body an extension of your will. While [Martial Soul] is active, a new combat style and new skills become available.
When [Martial Soul] is activated, Rafayel recovers all HP.
While [Martial Soul] is active, some effects will not apply to you.
        `,
    basicAttackSync: "Rimefall Dance",
    basicAttackSyncImg: "../assets/battle-icons/a2_skill_ry_2508_07.png",
    basicAttackSyncText: `
While [Martial Soul] is active, Rafayel's Basic Attacks and Charged Attacks are empowered with increased DMG. Basic Attack: Wield [Ashen Pair] to perform up to four consecutive strikes, dealing DMG. 
First Strike: 113 + 150% ATK DMG 
Second Strike: 222 + 297% ATK DMG 
Third Strike: 235 + 313% ATK DMG 
Fourth Strike: 253 + 337% ATK DMG
Charged Attack: Leap forward to strike, dealing 356 + 475% ATK DMG.
        `,
    activeSkillSync_I: "Sundering Thrust",
    activeSkillSyncCooldown_I: "5 sec.",
    activeSkillSyncImg_I: "../assets/battle-icons/a2_skill_ry_2508_08.png",
    activeSkillSyncText_I: `
Thrust forward with [Ashen Pair], dealing 471 + 628% ATK DMG. When casting this skill, Rafayel becomes unstoppable for 4s and accumulates [Vermilion Flare].
        `,
    activeSkillSync_II: "Warflame Cleave",
    activeSkillSyncCost_II: "3 special points",
    activeSkillSyncImg_II: "../assets/battle-icons/a2_skill_ry_2508_09.png",
    activeSkillSyncText_II: `
Casting this skill consumes 3 points of [Vermilion Flare]. Leap into the air and charge up, then land with a slashing attack, dealing a total of 488 + 650% ATK DMG. When the landing strike hits an enemy, [Martial Fall] descends, dealing Single-target DMG equal to 281+375% ATK. This effect can only trigger once per skill cast. He becomes unstoppable for the duration.
        `,
    activeSkillSync_III: "Crushing Descent",
    activeSkillSyncCooldown_III: "3 sec.",
    activeSkillSyncImg_III: "../assets/battle-icons/a2_skill_ry_2508_10.png",
    activeSkillSyncText_III: `
Rafayel swiftly moves to the target and throws [Ashen Pair] gathering enemies within range before slamming [Twilight Haze] into the ground, dealing 632 + 840% ATK DMG. [Martial Soul] then dissipates.
When the ground slam hits an enemy, [Martial Fall] descends upon them. This effect can only trigger once per skill cast. If [Vermilion Visage] still has energy, [Martial Fall] is replaced with [Ashen Duskfall], dealing 505 + 675% ATK AoE DMG. When enemies take multiple hits from [Ashen Duskfall], the first hit deals full DMG while the rest are reduced to 30%.
Casting this skill pauses the stage timer and enemy Weakness duration for a period of time. During the skill Rafayel is invincible and [Vermilion Visage] energy does not decrease.
When [Martial Soul] is activated, this skill starts with a 3s cooldown.
        `,
    passiveSkillSync: "Song of Rout",
    passiveSkillSyncImg: "../assets/battle-icons/a2_skill_ry_2508_06.png",
    passiveSkillSyncText: `
Activating [Martial Soul] fully restores [Vermilion Visage]. After you and Rafayel merge souls and channel [Martial Soul], [Vermilion Visage] energy is continuously consumed, increasing DMG by 25%. When [Vermilion Visage] runs out of energy, no DMG Boost is granted.
When [Martial Soul] is activated, Rafayel gains full [Vermilion Flare]. [Vermilion Flare] is a special combat resource capped at 3 points. Rafayel's Basic Attacks or Charged Attacks that hit enemies accumulate [Vermilion Flare]. The third and fourth strikes of Basic Attacks accumulate additional [Vermilion Flare]. These effects can only trigger once per Basic Attack or Charged Attack. [Warflame Cleave] consumes [Vermilion Flare] to cast. When [Martial Soul] dissipates, all [Vermilion Flare] and [Vermilion Visage] energy are cleared.
        `,
    basicAttack: "Twilight's End",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1902_01_ry_2508.png",
    basicAttackText: `
You swing [Twilight Haze] to perform up to three consecutive strikes. For a short time after your Basic Attack, you can continue your Basic Attack combo. 
First Strike: 140 + 186% ATK DMG 
Second Strike: 181 + 241% ATK DMG 
Third Strike: 295 + 394% ATK DMG
Each strike can be charged by holding. Upon reaching full charge, Dusk Energy is fired forward to perform a Ranged Attack and you become unstoppable, taking 40% less damage. Charged strikes are considered Charged Attacks and deal 50% increased DMG. When [Martial Soul] is activated, Dusk Energy dissipates immediately.
Hitting an enemy with a Charged Attack restores 0.3 Energy Charge(s). This effect triggers once per Charged Attack.
        `,
    activeSkill: "Severed Grace",
    activeSkillCooldown: "7 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1902_03_ry_2508.png",
    activeSkillText: `
You swing [Twilight Haze] to slash forward, dealing 415 + 553% ATK DMG.
When [Martial Intent] is full, your Active Skill is empowered into a powerful leap slash, dealing 662 + 883% ATK DMG. You become unstoppable throughout the cast.
        `,
    passiveMCSkill: "Lingering Haze",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1902_04_ry_2508.png",
    passiveMCText: `
Casting an Active Skill causes the next 3 Charged Attack(s) on hit to accumulate additional [Martial Intent]. Casting another Active Skill resets this count. Any remaining count is cleared when [Martial Soul] is activated.
When the third Charged Strike hits an enemy, it applies 1 stack(s) of [Suppression] and deals additional Suppression Weakness DMG equal to 150 + 200% of ATK. Each of the above effects can trigger at most once per attack per enemy.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG.
When [Warflame Cleave]'s landing strike hits an enemy, it additionally calls down [Martial Fall] on up to 2 enemies on the field.
If [Vermilion Visage] still has energy when [Sundering Thrust] is cast, [Vermilion Visage] will be charged.
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%.
[Martial Intent] is fully charged at the start of combat or when [Martial Soul] dissipates.
[Martial Fall] DMG is increased by 60%.
On hit, [Sundering Thrust] gathers enemies within range and calls down another [Martial Fall] on them. These effects trigger only once per skill cast.
        `,
    eidolon2: `
Energy Charge limit is raised by 1.
When fighting alongside Vermilion Martial God, enemy Weakness duration is extended by 1s.
Each time you cast an Active Skill empowered by [Martial Intent], [Vermilion Visage]'s DMG increase effect during your next [Martial Soul] activation is increased by 5%, up to 10%.
        `,
    eidolon3: `
The team deals 8% more DMG.
The cooldown of [Sundering Thrust] is reduced by 2s. For 1.5s after casting [Sundering Thrust] Rafayel accumulates [Vermilion Flare] over time, and tapping Basic Attack directly performs the third strike of Basic Attack.
[Ashen Duskfall] DMG is increased by 10%. While [Vermilion Visage] has energy, [Martial Fall] generated by [Sundering Thrust] or [Warflame Cleave] is replaced with [Ashen Duskfall].
        `,
  },
  {
    id: 31,
    cardIds: [389, 390],
    link: "lsg",
    img: "../assets/companions/rafayel-lsg.png",
    imgWeapon: "../assets/companions/ballad-of-ebbs.png",
    companionName: "Rafayel: Lemurian Sea God",
    speciality: "DPS | AoE | Empower",
    weaponName: "Ballad of Ebbs",
    specialityMC: "DPS | Burst | Single-target",
    supportSkill: "Tide Cleaver",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ry_2507_02.png",
    supportSkillText: `
Rafayel throws his Tidebreaker Trident at a target and then recalls it, dealing DMG equal to 360+192% ATK+761% DEF to enemies in range. During the skill, Rafayel becomes unstoppable throughout.
When a Charged Attack empowered by [Sea God Mark] hits an enemy, it reduces the Support Skill cooldown by 1.5s. This effect can only be triggered once per attack.
[Empowered] Tide Cleaver: Rafayel's Tidebreaker Trident is enhanced with lightning, increasing DMG to 468+249% ATK+989% DEF.
        `,
    resonanceSkill: "Cerulean Verdict",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ry_2507_03.png",
    resonanceSkillText: `
You and Rafayel resonate with the power of the ocean together, unleash towering waves infused with lightning that gather enemies in range, and command the tides to deal massive DMG equal to 1311+699% ATK+2773% DEF in total and 1 [Protocore DMG] to enemies in range.
        `,
    ardentOath: "Deluge Covenant",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ry_2507_04.png",
    ardentOathText: `
You resonate with Rafayel's Evol, summoning tides and lightning to attack the enemy, dealing massive DMG equal to 1800+960% ATK+3820% DEF.
        `,
    passiveSkill: "Deepfall Rite",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ry_2507_01.png",
    passiveSkillText: `
Upon entering the battle, Rafayel grants you [Sea God Mark]. When you perform a Charged Attack, it consumes [Sea God Mark] to empower that attack, increasing DMG by 50% and making you unstoppable throughout its duration. 8s after [Sea God Mark] has been consumed, Rafayel will grant [Sea God Mark] to you again. Using your Active Skill immediately refreshes [Sea God Mark].
When Rafayel uses his Support Skill or [Empowered] Support Skill, he accumulates [Raging Tide]. When your Basic Attack or Charged Attack hits an enemy, you accumulate [Ripple Breath]. These effects can only be triggered once per attack. When both [Ripple Breath] and [Raging Tide] are fully charged, the skill [Ocean's Descent] is unlocked. Using it floods the battlefield, granting you [Divine Favor] and making you unstoppable throughout its duration. [Divine Favor] lasts for 11s.
While [Divine Favor] is active, your Active Skill generates a [Lightning Crystal] when it hits an enemy. This effect can only be triggered once per skill use.
While [Divine Favor] is active, your Dodge is empowered by waves, allowing you to activate [Lightning Crystals] along the path and deal DMG equal to 32+17% ATK+68% DEF. 
[Lightning Crystal]: When activated, restores 0.3 Energy Charge, reduces Active Skill cooldown by 3.3s, and generates [Lightning Tide]. [Lightning Tide] deals DMG equal to 450+240% ATK+951% DEF and activates other nearby [Lightning Crystals]. When [Divine Favor] ends, all [Lightning Crystals] are immediately activated.
        `,
    basicAttack: "Wave Chase",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1904_01_RY_2507.png",
    basicAttackText: `
Wield Ballad of Ebbs to perform a combo up to 4 hits
First Strike: 49+26% ATK+104% DEF 
Second Strike: 53+28% ATK+112% DEF 
Third Strike: 83+44% ATK+175% DEF 
Fourth Strike: 137+73% ATK+290% DEF

Charged Attack summons a wave that envelops your sword for a powerful slash, dealing DMG equal to 174+93% ATK+368% DEF.
        `,
    activeSkill: "Riptide Rend",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1904_02_RY_2507.png",
    activeSkillText: `
Your Charged Attack is empowered by [Sea God Mark] to become a forward thrust, dealing DMG equal to 265+141% ATK+560% DEF and restoring 0.5 Energy Charge. Energy restoration can only be triggered once per attack.
        `,
    passiveMCSkill: "Tide's Return",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1904_03_RY_2507.png",
    passiveMCText: `
Dash forward with a swimming motion, dealing DMG equal to 312+166% ATK+660% DEF to enemies hit. You are invincible while using this Active Skill.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
When your basic attack hits, [Sea God Mark] cooldown is reduced by 0.8s. This effect can trigger once per attack. When [Lightning Tide] hits Weakened enemies, extends the Weakened duration by 0.5s. This effect can trigger up to 2 times per enemy.       
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
While [Divine Favor] is active, when Rafayel throws his Tidebreaker Trident, it generates an additional vortex that continuously pulls nearby enemies toward its center. While [Divine Favor] is active, lightning will randomly strike the battlefield to assist you in battle, dealing DMG equal to 270+144% ATK+571% DEF with each hit.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
DMG boost from [Sea God Mark] is increased by 50%. While [Divine Favor] is active, you gain 40% DMG Reduction.
        `,
    eidolon3: `
The team deals 8% more DMG. 
While [Divine Favor] is active, when your basic attack hits, Active Skill cooldown is reduced by 0.5s. While [Divine Favor] is active, when Charged Attacks empowered by [Sea God Mark] hit, [Lightning Tide] is triggered for 70% DMG. These effects can trigger once per attack.
        `,
  },
  {
    id: 32,
    cardIds: [387, 388],
    link: "got",
    img: "../assets/companions/rafayel-got.png",
    imgWeapon: "../assets/companions/tidal-embrace.png",
    companionName: "Rafayel: God of the Tides",
    speciality: "Sustained | Buff | AoE",
    weaponName: "Tidal Embrace",
    specialityMC: "Sustained | Buff | AoE",
    supportSkill: "Tidal Summoning",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ry_2504_02.png",
    supportSkillText: `
Rafayel comes to your side and summons a Sea Spirit in front of you to assist in combat.
[Empowered] Tidal Summoning: Restores 10% [Faith] and temporarily increases DMG dealt by the Sea Spirit by 10%.

Sea Spirit: A marine creature summoned by Rafayel to aid you in combat. It attacks enemies with water and lasts for 10 seconds. The Sea Spirits can be upgraded with skills. 
Level 1: Each attack deals DMG equal to 47+25% ATK+2.2% of Max HP.
Level 2: ATK SPD is increased by 20%. 
Level 3: DMG is increased by 25%.
        `,
    resonanceSkill: "Surging Tides",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ry_2504_03.png",
    resonanceSkillText: `
Rafayel holds your hand, summoning tides around you. As you descend with the tides, a massive wave surges outward dealing DMG equal to 995 +531% ATK+47.8% of Max HP to enemies within the area, along with 1 [Protocore DMG].
        `,
    ardentOath: "Oceanic Harmony",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ry_2504_04.png",
    ardentOathText: `
The sound of Rafayel's flute reverberates the ocean, and the creatures of the sea respond with a hymn. You ride atop a floating whale, joining forces with the sea creatures to launch a powerful attack against the enemy, dealing massive DMG equal to 1440 + 780% ATK + 69.4% of Max HP.
        `,
    passiveSkill: "Frenzy Surge",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ry_2504_01.png",
    passiveSkillText: `
When you and Rafayel, as well as [Sea Spirits], hit the enemy with a basic attack, Rafayel's [Faith] will be restored.
When [Faith] is fully restored, Rafayel will manifest a miracle, invoking [Heavenly Rain] within 10s, which increases the DMG dealt by you and allied units by 30%, and boosts the level of all Sea Spirits by 1.
        `,
    basicAttack: "Waves",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1903_02_RY_2504.png",
    basicAttackText: `
Wield a wand to start a multi-hit combo, up to 4 attacks Deal DMG equal to 398+211% ATK+19% of Max HP.

Charged Attack forces the enemy into the air, dealing DMG equal to 182+97% ATK + 9% of Max HP.
        `,
    activeSkill: "Tides",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1903_03_RY_2504.png",
    activeSkillText: `
After reciting a short incantation, you create waves that push back nearby enemies, dealing DMG equal to 73+39% ATK + 3.5% of Max HP and leaving behind a Tidal Field. Tidal Field gives allies within its range one stack of Tidal Strength, which increases CRIT Rate by 10%. For each ally in Tidal Field, an additional stack of Tidal Strength is granted, up to 3 stacks.
        `,
    passiveMCSkill: "Limitless Recovery",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1903_01_RY_2504.png",
    passiveMCText: `
When using [Tides], summon a [Sea Spirit] in front of you.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
When fighting near a [Sea Spirit], CRIT DMG is increased by 10%.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
The [Sea Spirit] starts at Lv. 2 and its duration is extended by 5 seconds.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
During [Heavenly Rain], Energy Charge recovery speed is increased by 30%.
        `,
    eidolon3: `
The team deals 8% more DMG. 
[Surging Tides] restores 30% [Faith] for each enemy hit. This effect can trigger at most 3 times during Surging Tides.
        `,
  },
  {
    id: 33,
    cardIds: [385, 386],
    link: "abysswalker",
    img: "../assets/companions/rafayel-abysswalker.png",
    imgWeapon: "../assets/companions/phantasma-sands.png",
    companionName: "Rafayel: Abysswalker",
    speciality: "Burst | Single-target | Pull",
    weaponName: "Phantasma Sands",
    specialityMC: "DPS | Single-target | Sustained",
    supportSkill: "Eclipse Rend",
    supportSkillCooldown: "14 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ry_2503_02.png",
    supportSkillText: `
Rafayel unleashes a series of attacks, ending with a ground attack that leaves 1 [Fishtail Beacon] for 10s.
You can pick up the [Fishtail Beacon] to restore 2 [Potential]
[Empowered] Eclipse Rend: Deals increased DMG equal to 306+408% ATK and [Burns] enemies.
[Burn]: Deals 23+31% ATK DMG to the target for 5s.
        `,
    resonanceSkill: "Fantasia Shark",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ry_2503_03.png",
    resonanceSkillText: `
Uses [Phantasy Chains] to pull in enemies. After a short delay, Rafayel summons a Fantasia Shark that bites and [Burns] enemies, dealing DMG equal to 785+1047% of your combined ATK and 1 Protocore DMG.
        `,
    ardentOath: "Four Scourges",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ry_2503_04.png",
    ardentOathText: `
Rafayel harnesses the power of a Protofield to bind enemies with [Phantasy Chains]. You and Rafayel work together, using your Evol to deal massive DMG equal to 1440+1920% of your combined ATK.
        `,
    passiveSkill: "Abyssal Beacon",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ry_2503_01.png",
    passiveSkillText: `
Rafayel periodically applies [Beacon] on enemies. When you hit an enemy with [Beacon] using a Charged Attack, it triggers the mark and charges 1 point of [Potential], up to 6 stacks.
When [Potential] is charging, your and Rafayel's ATK increases by 8% for 5s. Retriggering the mark refreshes the duration.
When [Potential] is fully charged, you and Rafayel will gain [Deepsea Pursuit], increasing your CRIT Rate by 15% for 5s. Meanwhile, Rafayel will unleash a Searing Slash, dealing massive DMG.
Searing Slash: After charging, Rafayel lunges forward, inflicting 540 + 720% ATK DMG on enemies in his path.
        `,
    basicAttack: "Abyssal Rapid Fire",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1901_02_RY_2503.png",
    basicAttackText: `
Wield dual guns for a combo up to 5 hits, The final Basic Attack inflicts multiple instances of DMG. 
First Strike: 53+71% ATK DMG
Second Strike: 48+64% ATK DMG 
Third Strike: 64+85% ATK DMG 
Fourth Strike: 69+92% ATK DMG 
Fifth Strike: 74+99% ATK DMG

Charged Attack will knock back nearby enemies, dealing AoE DMG equal to 144%+192% ATK.
        `,
    activeSkill: "Oceanic Traversal",
    activeSkillCooldown: "8 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1901_03_RY_2503.png",
    activeSkillText: `
Perform an enhanced linear attack, dealing 309+412% ATK DMG.
        `,
    passiveMCSkill: "Abyssal Shadow",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1901_01_RY_2503.png",
    passiveMCText: `
Basic attacks generate a stack of Pursuit, increasing your ATK SPD by 4% and CRIT Rate by 2%, up to 5 stacks. If attacks stop, the stacks will quickly disappear. Active Skills will inflict [Burn] on enemies.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
Abysswalker's [Deepsea Pursuit] gains 30% additional CRIT DMG.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
When fighting together with Abysswalker, increases DMG taken of enemies inflicted with [Burn] by 20%.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
When triggering [Potential] recovery, Energy Charge recovery speed is increased by 50% for 4s.
        `,
    eidolon3: `
The team deals 8% more DMG. 
Abysswalker's [Searing Slash] deals 150% more DMG. When triggering [Beacon] additionally restore 1 [Potential].
        `,
  },
  {
    id: 34,
    link: "fresh-paint",
    img: "../assets/companions/rafayel-freshpaint.png",
    companionName: "Rafayel: Frash Paint",
    speciality: "Heal | Single-target",
    supportSkill: "Swirling Colors",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ry_2505_02.png",
    supportSkillText: `
Rafayel forces the enemy into the air, then kicks them to the ground, dealing 194+258% ATK DMG and inflicting [Tinctus] on them.
[Empowered] Swirling Colors: Rafayel inflicts 259+345% ATK additional DMG and 2 stacks of Tinctus on the enemy.
        `,
    resonanceSkill: "Illuminating Strength",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ry_2505_03.png",
    resonanceSkillText: `
Rafayel and you work together to perform a series of attacks, dealing 922+1229% ATK DMG and 1 Protocore DMG to enemies.       
        `,
    ardentOath: "Dazzling Kaleidoscope",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ry_2505_04.png",
    ardentOathText: `
Your and Rafayel's Evol work together to unleash a powerful slash, dealing massive AoE DMG equal to 1200+1600% ATK.
        `,
    passiveSkill: "Gilded Tinctus",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ry_2505_01.png",
    passiveSkillText: `
Certain attacks from you and Rafayel will inflict Tinctus on the enemy, up to 5 stacks.
Active Skills, Resonance Skills, or Ardent Oaths that hit an enemy marked with Tinctus will detonate stack(s), dealing ATK DMG based on the number of stacks and restoring you and your Companion's HP. When 5 stacks are detonated, the enemy's DEF will be reduced by 20% for 5s.
1 Stack: 23+30% ATK DMG 
2 Stacks: 60+80% ATK DMG 
3 Stacks: 113+150% ATK DMG 
4 Stacks: 150+200% ATK DMG 
5 Stacks: 188+250% ATK DMG   
        `,
  },
  {
    id: 35,
    link: "phantom",
    img: "../assets/companions/rafayel-phantom.png",
    companionName: "Rafayel: Phantom of the Siren",
    speciality: "Support | Debuff",
    supportSkill: "Aria",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ry_2502_02.png",
    supportSkillText: `
Rafayel thrusts forward, dealing AoE DMG of 218 + 291% ATK with his dagger. Additionally, it reduces enemy movement SPD by 30% for 5s. 
Aria: Reprise: After the Aria concludes, it leaves behind Reprise which impacts enemies in a larger area, dealing a total DMG of 315 + 420% ATK. It also reduces enemy movement SPD by 50% for 5s.
        `,
    resonanceSkill: "Concerto",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ry_2502_03.png",
    resonanceSkillText: `
You and Rafayel perform a concerto, rushing towards the enemy and dealing 508+678% ATK DMG, plus 1 [Protocore DMG]. If the target is currently inflicted with [Echo], they will receive an additional 254+339% ATK DMG.
        `,
    ardentOath: "Sonata of Reunions",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ry_2502_04.png",
    ardentOathText: `
You resonate with Rafayel's Evol. You two leap into the air and launch a powerful strike together at the enemy, dealing massive DMG of 1200+1600% ATK.
        `,
    passiveSkill: "Recitativo",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ry_2502_01.png",
    passiveSkillText: `
When you and Rafayel deal DMG, you will sing [Harmony] for Rafayel. After Harmony finishes, the next time you sing [Aria], it will leave behind an [Echo] at the target location for 5s. Enemies within the range of the [Echo] take 10% increased DMG and lose HP equal to 18 + 24% of Rafayel's ATK per second.
        `,
  },
  {
    id: 36,
    link: "artist",
    img: "../assets/companions/rafayel-artist.png",
    companionName: "Rafayel: Artist",
    speciality: "Burst | AoE",
    supportSkill: "Scarlet Shade",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_ry_2501_01.png",
    supportSkillText: `
Rafayel steps back, using fire to create a Scarlet Shade.
The Scarlet Shade will deal AoE DMG equal to 84+112% ATK and inflict Burn upon dissipating.
[Empowered] Scarlet Shade: Rafayel will also leave 3 [Flame Lilies] at his location.
        `,
    resonanceSkill: "Scorching",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_ry_2501_03.png",
    resonanceSkillText: `
You ignite every active [Flame Lily] left by Rafayel and deal 1 Protocore DMG to all enemies. Each Flame Lily deals AoE DMG equal to 188+250% of your ATK while also inflicting Burn. Each restored Flame Lily increases your ATK by 5% for 8s.       
        `,
    ardentOath: "Searing Motif",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_ry_2501_04.png",
    ardentOathText: `
Your and Rafayel's Evol work together to unleash a powerful slash, dealing massive DMG equal to 1200+1600% ATK.
        `,
    passiveSkill: "Flowing Flame",
    passiveSkillImg: "../assets/battle-icons/a2_skill_ry_2501_02.png",
    passiveSkillText: `
When your and Rafayel's skills hit an enemy, Rafayel summons Flame Lilies to attack, dealing AoE DMG equal to 15+20% ATK every 2s.
Up to 5 Flame Lilies can be on the field. When a total of 10 Flame Lilies have been summoned, Rafayel becomes Fervent, increasing his Basic Attack DMG and attack range. The Flame Lilies are active for 10s, after which they are replaced by newborn Lilies and trigger explosions, dealing DMG equal to 188+250% of his ATK to enemies in a small range around him while also inflicting Burn. This also happens when the max number of
Flame Lilies on the battlefield is reached.
Burn: Deals 20+26% ATK DMG every 0.5s for 5s.
        `,
  },
  {
    id: 41,
    cardIds: [102, 103],
    link: "silverwing-fiend",
    img: "../assets/companions/sylus-fiend.png",
    imgWeapon: "../assets/companions/crimson-malison.png",
    companionName: "Sylus: Silverwing Fiend",
    speciality: "Burst | AoE | Empower",
    weaponName: "Crimson Malison",
    specialityMC: "DPS | Buff | Single-target",
    supportSkill: "Crimson Break",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_yg_2304_02.png",
    supportSkillText: `
Sylus releases magical power to pierce through enemies, dealing damage equal to 584+311% ATK+1244% DEF. On first hit, he also absorbs an extra 6 points of [Blood Essence].
Crimson Break: [Empowered]: Sylus's staff is enhanced with fresh blood, dealing damage equal to 684+365% ATK+1446% DEF to enemies. This skill cannot be cast during [Crimson Bond].
During the [Crimson Bond] state, Support Skill [Crimson Break] is replaced by Support Skill [Crimson Void].
[Crimson Void]: Sylus swings his staff to summon blood pillars from the Underworld, dealing damage equal to 628+335% ATK+1327% DEF to enemies in a straight line. On hit, this also triggers [Rose Thorns], dealing AoE DMG equal to 675+360% ATK+1427% DEF. This effect can only trigger once per attack.
[Crimson Void] cannot be cast manually. Sylus casts it automatically when [Bloodrose Seed] blooms.
        `,
    resonanceSkill: "Crimson Coffin",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_yg_2304_03.png",
    resonanceSkillText: `
You summon a Crimson Coffin, into which Sylus descends The Crimson Coffin gathers enemies within range and deals damage equal to 1663+887% ATK+3515% DEF plus 1 [Protocore DMG]. On first hit, it additionally extracts 20 points of [Blood Essence].
During the [Crimson Bond] state, the Resonance Skill is replaced by [Underworld Rift], with a cooldown of 8s.
[Underworld Rift]: You and Sylus summon thorns from the Underworld. During the summoning, you and Sylus become invincible, while enemy Weakness timers are paused and [Bloodrose Seed] growth is suspended. After the summoning ends, the thorns are detonated by a pillar of blood, dealing damage equal to 1458+778% ATK+3084% DEF to enemies within range. This damage is considered Basic Attack damage. [Underworld Rift] is not considered a Resonance Skill.
Any [Bloodrose] present on the field during summoning will be consumed by the thorns, increasing detonation damage by 30% for each [Bloodrose].
After the thorns detonate, you and Sylus are released from [Crimson Bond], while [Blood Essence] is cleared, and [Bloodrose Seed] is removed from enemies.
        `,
    ardentOath: "Crimson Finale",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_yg_2304_04.png",
    ardentOathText: `
In fate's final chapter, Sylus unfurls his silver wings, summoning the blood moon from the depths of the Underworld to the horizon. You and Sylus resonate, embracing amid the sky, merging your blood into night's splendid verse. Countless crimson crystals rain down upon the ground, devouring everything and dealing massive damage equal to 1800+960% ATK+3820% DEF.
        `,
    passiveSkill: "Crimson Seal",
    passiveSkillImg: "../assets/battle-icons/a2_skill_yg_2304_01.png",
    passiveSkillText: `
When entering battle, Sylus grants you [Rose Mark]. [Rose Mark] recovers 10s after being consumed, and Non-Charged Basic Attack hits accelerate its recovery speed. This effect can trigger once per attack.
When a Charged Attack hits, it consumes [Rose Mark] to inflict [Rose Thorns] on enemies, dealing AoE DMG equal to 675+360% ATK+1427% DEF and extracting 12 points of [Blood Essence]. This damage is considered Basic Attack damage. When your Basic Attacks or Charged Attacks hit enemies, you also absorb 3 points of [Blood Essence]. This effect can trigger once per attack.
[Blood Essence] has a maximum of 100 points. When it's full, you can cast [Blood Pact] to awaken [Crimson Bond] between you, turning Sylus into your familiar. Your Resonance Skill is replaced by [Underworld Rift]. [Crimson Bond] clears [Rose Mark] from you. When it lasts, it prevents you from recovering [Rose Mark] or absorbing [Blood Essence].
When entering the [Crimson Bond] state, Sylus applies [Bloodrose Seed] to an enemy on the field. When your Basic Attacks, Charged Attacks, or Active Skills hit an enemy, [Bloodrose Seed] transfers to that enemy and is stimulated to grow. This effect can trigger once per attack. When fully stimulated, [Bloodrose Seed] blooms into 1 [Bloodrose(s)] and resets to its initial state. [Bloodroses] enhance [Underworld Rift]'s attack effect. A maximum of 2 can exist simultaneously.
When [Crimson Bond] ends, Sylus grants you [Rose Mark] again.
        `,
    basicAttack: "Rose Spike",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1903_01_YG_2304.png",
    basicAttackText: `
Wield [Crimson Malison] to perform a combo up to 4 hits, dealing damage to enemies.
First Strike: 49+26% ATK+103% DEF 
Second Strike: 49+26% ATK+103% DEF 
Third Strike: 94+50% ATK+198% DEF 
Fourth Strike: 146+78% ATK+309% DEF

Charged Attack summons a magical array beneath enemies, dealing DMG equal to 180+96% ATK+381% DEF.
        `,
    activeSkill: "Rose Scent",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1903_02_YG_2304.png",
    activeSkillText: `
You draw the power of blood from [Crimson Malison] to apply [Bloodrose Scent] to yourself. [Bloodrose Scent] lasts for 8s, during which you become unstoppable and your damage increases by 15%.
        `,
    passiveMCSkill: "Rose Rain",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1903_04_YG_2304.png",
    passiveMCText: `
While [Crimson Bond] is active, your Active Skill is replaced by Active Skill [Bloodrose Rain], with a cooldown of 4s. [Bloodrose Rain]: You further unleash the power of blood from the [Crimson Malison], applying [Bloodrose Scent] to yourself while firing 6 bullet(s) at targets. Each bullet deals damage equal to 45+24% ATK+95% DEF to enemies and activates [Bloodrose Seed]. Hold to generate up to 8 additional bullet(s).
[Bloodrose Rain] doesn't consume Energy Charge, but each cast increases its cooldown by 4s, up to an additional 36s.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8%less DMG.
When you consume [Rose Mark] you recover an additional 0.5 Energy Charge. 
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%.
[Rose Thorns] damage increases by 10% and additionally pulls in enemies within range. Casting [Blood Pact] immediately refreshes your Active Skill cooldown and reduces the cooldown of your next Active Skill cast by 4s. This effect cannot stack.
        `,
    eidolon2: `
Energy Charge limit is raised by 1.
When [Crimson Void] hits, it additionally applies [Blood Spell] to enemies, increasing their DMG taken by 8% for 6s. [Blood Spell] is removed when [Crimson Bond] ends. When [Bloodrose Seed] blooms, you and Sylus each recover HP equal to 5% of max HP.
        `,
    eidolon3: `
The team deals 8% more DMG.
During [Crimson Bond], Sylus deals 10% more DMG. When Sylus applies [Bloodrose Seed] he also stimulates [Bloodrose Seed] to grow.
During [Crimson Bond], casting Active Skill grants you [Bloodrose Wreath], increasing your DMG by 10% for 8s. When your Basic Attacks or Charged Attacks hit enemies, [Bloodrose Wreath] fires additional bullets at them, dealing damage equal to 79+42% ATK+168% DEF and stimulating [Bloodrose Seed]. This damage counts as Basic Attack damage and this effect can trigger once per attack. When you gain [Bloodrose Wreath], any [Bloodrose Scent you have is removed, and you gain all its effects.
When [Crimson Bond] ends, [Bloodrose Wreath] is removed.
        `,
  },
  {
    id: 42,
    cardIds: [100, 101],
    link: "sovereign",
    img: "../assets/companions/sylus-sovereign.png",
    imgWeapon: "../assets/companions/fiend-reaper.png",
    companionName: "Sylus: Abysm Sovereign",
    speciality: "DPS | AoE | Empower",
    weaponName: "Fiend Reaper",
    specialityMC: "DPS | Heal | Single-target",
    supportSkill: "Fiendish Claw",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_yg_2302_02.png",
    supportSkillText: `
Sylus summons the [Fiendish Claw] to launch enemies into the air, dealing DMG equal to 508+271% ATK+24.4% of Max HP. You and Sylus recover 5% of Max HP.
Fiendish Claw: [Empowered]: When [Fiendish Claw] lands, trigger an additional energy explosion. Deal total AoE DMG equal to 705+376% ATK+33.9% of Max HP to enemies.
        `,
    resonanceSkill: "Wrath Judgment",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_yg_2302_03.png",
    resonanceSkillText: `
Plunge [Fiend Reaper] into the ground and channel abyssal energy with Sylus to hit enemies, dealing AoE DMG equal to 1024+546% ATK+49.2% of Max HP, plus 1 [Protocore DMG]. Wrath Judgment: Greed: Hold the Resonance Skill button to activate, switching you and Sylus from [Abyssal Feast] into [Abyssal Fury]. 
[Abyssal Fury]: When you and Sylus hit enemies with Basic Attack, Active Skill, or Support Skill, consume HP to increase DMG dealt. HP consumption is capped at 20% Higher remaining HP grants higher DMG boost. Cannot be triggered when HP is < 25%.
[Abyssal Fury] lasts for 11s before reverting to [Abyssal Feast].
        `,
    ardentOath: "Insatiable Eye",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_yg_2302_04.png",
    ardentOathText: `
Sylus summons the Insatiable Eye to crush enemies, while you charge forward with your [Fiend Reaper] to cleave through the Insatiable Eye, dealing DMG equal to 1440+780% ATK+69.4% of Max HP to all enemies.
        `,
    passiveSkill: "Sanguine Feast",
    passiveSkillImg: "../assets/battle-icons/a2_skill_yg_2302_01.png",
    passiveSkillText: `
Upon entering battle, you and Sylus lose 50% of current HP and enter [Abyssal Feast] state.
[Abyssal Feast]: When you and Sylus hit enemies with Basic Attacks (except Charged Attacks), Active Skills, or Support Skills, recover some lost HP.
        `,
    basicAttack: "Dream Breaker",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1902_02_yg_2302.png",
    basicAttackText: `
Swing the [Fiend Reaper] to perform a 4-hit combo, dealing total DMG equal to 647+346% ATK+31.1% of Max HP.

Charged Attack deals DMG equal to 204+109% ATK+9.8% of Max HP to nearby enemies. Recover 10% of Max HP for each enemy hit.
Cannot use Charged Attack while in [Abyssal Fury] state.
        `,
    activeSkill: "Life Sacrifice",
    activeSkillCooldown: "5.5 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1902_03_yg_2302.png",
    activeSkillText: `
Hold to charge the [Fiend Reaper]. Release to attack enemies in front of you.
While charging, you take reduced DMG and recover HP when hit by enemies. The first hit taken during charging will be nullified and instantly complete the charge.
Uncharged: Deal DMG equal to 397+212% ATK+19.1% of Max HP.
Fully Charged: Deal DMG equal to 632+337% ATK+30.3% of Max HP.
        `,
    passiveMCSkill: "Soul Pact",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1902_01_yg_2302.png",
    passiveMCText: `
[Fiend Reaper] grants DMG reduction to you and Sylus that increases as HP decreases: for every 1% of Max HP lost, reduce DMG taken by 0.7%. This effect applies to you and Sylus independently. Gain increased interrupt resistance while attacking enemies.
[Abyssal Feast] provides more HP recovery.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
After [Abyssal Fury] ends, you and Sylus recover 20% of Max HP.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
After using [Fiendish Claw], your next 3 basic attacks on-hit deal DMG equal to 121+64.8% ATK+5.8% Max HP to surrounding enemies centered on you.
While [Abyssal Fury] is active [Fiendish Claw] cooldown is reduced.
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
After using [Wrath Judgment] or [Wrath Judgment: Greed], your Energy Charge recovery speed is increased for 15s.
        `,
    eidolon3: `
The team deals 8% more DMG. 
When using [Wrath Judgment: Greed], you and Sylus recover 50% of Max HP. While [Abyssal Fury] is active, [Life Sacrifice] requires no charging and your Active Skills deal 30% increased DMG.
        `,
  },
  {
    id: 43,
    cardIds: [98, 99],
    link: "conqueror",
    img: "../assets/companions/sylus-conqueror.png",
    imgWeapon: "../assets/companions/harrier-700.png",
    companionName: "Sylus: Relentless Conqueror",
    speciality: "DMG | Single-target | Control",
    weaponName: "Harrier 700",
    specialityMC: "DPS | Sustained | AoE",
    supportSkill: "Conqueror's Confinement",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_yg_2301_02.png",
    supportSkillText: `
Sylus releases Boundless Energy to deal 239+318% ATK DMG to the target. The target is then immobilized and pulled toward him.
[Empowered] Conqueror's Confinement: As the enemy is pulled, Boundless Energy explodes and deals 72+95% ATK DMG to targets within the area.
        `,
    resonanceSkill: "Boundless Protection",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_yg_2301_03.png",
    resonanceSkillText: `
You shoot enemies with 3 instances of damage while Sylus stands before you to release Boundless Energy, dealing 1094+1458% ATK DMG and 1 [Protocore DMG].
        `,
    ardentOath: "Doomsday Trial",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_yg_2301_04.png",
    ardentOathText: `
You and Sylus attack together to unleash Boundless Energy and deal DMG equal to 1440+1920% ATK to the target.
        `,
    passiveSkill: "Devouring Mark",
    passiveSkillImg: "../assets/battle-icons/a2_skill_yg_2301_01.png",
    passiveSkillText: `
Your Resonance Skill and Support Skill apply [Devour Mark] to enemies, which lasts for 8s. Marked enemies can drop [Dark Energy] when you damage them. Picking up [Dark Energy] recovers a small amount of HP for you and Sylus.
[Devour Mark]: The target is infused with energy from Sylus and is forced to attack him. Applying [Devour Mark] again on an enemy who already has it will cause the mark to enter a charging state that lasts for 8s. When the charging state ends, [Devour Mark] will deal real DMG equal to 80% of the total DMG you have dealt to the target during the charging state (including the damage dealt by basic attacks, charged attacks, active skills and Resonance Skill). Applying [Devour Mark] again during the charging state will not extend its duration.
        `,
    basicAttack: "Relentless Barrage",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1901_02_yg_2301.png",
    basicAttackText: `
Wield the Harrier 700 to start a 4-hit combo to deal DMG. 
First Strike: 59+79% ATK DMG
Second Strike: 67+89% ATK DMG 
Third Strike: 89+119% ATK DMG 
Fourth Strike: 107+143% ATK DMG

Charged Attacks will unleash a [Dark Energy] Bullet, which explodes upon hitting the target and deals 160+213% ATK DMG.
        `,
    activeSkill: "Boundless Gunfire",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1901_03_yg_2301.png",
    activeSkillText: `
Move the joystick to sprint and quickly spin, dealing a total of 342+456% ATK DMG to nearby enemies.
        `,
    passiveMCSkill: "Limitless Recovery",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1901_01_yg_2301.png",
    passiveMCText: `
When an Active Skill hits a target with [Devour Mark], there is a 50% chance to reduce Active Skill cooldown by 1s and recover a small amount of Energy Charge.
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
When picking up [Dark Energy], your ATK is increased by 3.5% for 5s. This effect can stack up to 3 times.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
When you pick up [Dark Energy], you gain an additional effect that applies [Devour Mark] to the next enemy you damage.
        `,
    eidolon2: `
Energy Charge limit raised by 1. 
When you pick up [Dark Energy], a small amount of Energy Charge is restored.
        `,
    eidolon3: `
The team deals 8% more DMG. 
When applying [Devour Mark] to an enemy that already has a [Devour Mark], directly deal 60+80% ATK DMG.
        `,
  },
  {
    id: 44,
    link: "visitor",
    img: "../assets/companions/sylus-visitor.png",
    companionName: "Sylus: Visitor",
    speciality: "DPS | Single-target",
    supportSkill: "Shattering Burst",
    supportSkillCooldown: "14 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_yg_2303_02.png",
    supportSkillText: `
Sylus jumps closer to the target and punches the ground to deal DMG equal to 228+304% ATK.
[Empowered] Shattering Burst: Sylus jumps closer to the target and punches the ground. He infuses Dark Energy into the earth and makes it explode, dealing DMG equal to 321+429% ATK and creating a [Synchronous Force Field].
[Synchronous Force Field]: Increases your and Sylus's ATK by 8% and [Synergy] recovery rate by 30% for 12s.
        `,
    resonanceSkill: "Shadowy Duo Strike",
    resonanceSkillCooldown: "18 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_yg_2303_03.png",
    resonanceSkillText: `
You and Sylus perform a multi-hit melee combo on the target to deal 950+1266% ATK DMG and 1 [Protocore DMG].        
        `,
    ardentOath: "Thunderous Cryshock",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_yg_2303_04.png",
    ardentOathText: `
Your and Sylus's Evols resonate before you attack the enemy together and deal 1200+1600% ATK DMG.
        `,
    passiveSkill: "Team Attack",
    passiveSkillImg: "../assets/battle-icons/a2_skill_yg_2303_01.png",
    passiveSkillText: `
When your and Sylus's attacks hit enemy targets, you gain [Synergy]. When [Synergy] is full, using [Shattering Burst] will consume all [Synergy] to transform it into [Empowered Shattering Burst].
After you stop dealing DMG for 3s. [Synergy] will start to decrease.
        `,
  },
  {
    id: 51,
    cardIds: [27, 28],
    link: "netherlord",
    img: "../assets/companions/caleb_netherlord.png",
    imgWeapon: "../assets/companions/azuregaze.png",
    companionName: "Caleb: Netherlord",
    speciality: "DPS | Heal | Single-target",
    weaponName: "Azuregaze",
    specialityMC: "DPS | Sustained | Single-target",
    supportSkill: "Netherseal Slash",
    supportSkillCooldown: "9 sec.",
    supportSkillImg: "../assets/battle-icons/support-skill.png",
    supportSkillText: `
Caleb wields Netherseal and charges toward enemies, dealing DMG equal to 336+179% ATK+16.2% of Max HP and applying half a [Bingdi Lotus] to targets hit (prioritizing the missing half). Caleb is unstoppable throughout the skill. 
Netherseal Slash: [Empowered]: Deals increased damage equal to 585+312% ATK+28.1% of Max HP.
During [Yin-Yang Union], [Netherseal Slash] becomes the Support Skill [Spectral Slash], and [Netherseal Slash: Empowered] cannot be triggered.
[Spectral Slash]: Caleb wields Netherseal to slash enemies, dealing DMG equal to 296+158% ATK+14.2% of Max HP. Cooldown: 3.1s. If used while under [Yin-Yang Union] state, Netherseal tears open a [Yin-Yang Rift]. Caleb is unstoppable for the skill's duration.
        `,
    resonanceSkill: "Soulguide Bell",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/resonance-skill.png",
    resonanceSkillText: `
Caleb swings Netherseal as you twirl gracefully into his arms. Together, you ring the Soulguide Bell, pulling in enemies and dealing total AoE DMG equal to 1361+725% ATK+65.3% of Max HP and 1 [Protocore DMG].
When casting [Soulguide Bell], [Yin-Yang Cycle]'s cooldown is reduced by 3s.
        `,
    ardentOath: "Fate Unforgotten",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/ardent-oath.png",
    ardentOathText: `
As you embrace, a lotus from the nether realm blooms to its fading splendor. Caleb draws upon the power of the nether realm to resonate with you, dealing total damage equal to 1800+960% ATK+86% of Max HP.
During [Fate Unforgotten], you can perform [Dustbreak] 3 times. Each [Dustbreak] triggered at the correct timing restores 5% of Max HP to both you and Caleb after the skill ends. If all 3 [Dustbreaks] are triggered at the correct timing, you both gain 20% DMG Reduction for 15s after the skill ends.
When [Yin-Yang Rift] appears, 2% Oath Energy is restored. This effect is not affected by Oath Recovery Boost.
        `,
    passiveSkill: "Yin-Yang Crossing",
    passiveSkillImg: "../assets/battle-icons/passive-skill.png",
    passiveSkillText: `
Upon entering combat, you'll gain [Yin-Yang Cycle]. Its cooldown starts at 33s. When casting [Yin-Yang Cycle], you and Caleb enter the [Yin-Yang Union] state. During [Yin-Yang Union], you become unstoppable. Some of Caleb's attacks are empowered, and his certain skills can tear open a [Yin-Yang Rift]. Your Active Skill becomes [Azure Ballad].  After [Yin-Yang Union] ends, the cooldown of [Yin-Yang Cycle] starts at 31s.
[Yin-Yang Rift]: Can be activated by certain attacks. Upon activation, it summons a spectral hand to pull in enemies within range and deal DMG equal to 645+344% ATK+31% of Max HP. The Rift then closes immediately. Only one inactive [Yin-Yang Rift] can exist on the battlefield at a time.
[Azure Ballad]: Cooldown is 3.1s. When this skill is replaced, the cooldown begins at 1s. Costs 1 Energy Charge to cast, throwing Azuregaze to deal AoE DMG equal to 671+358% ATK+32.2% of Max HP. The resonating chime of Azuregaze in the air activates [Yin-Yang Rift] throughout its duration. When [Azure Ballad] activates [Yin-Yang Rift], the next [Azure Ballad] will not cost Energy Charge. This effect lasts until the current [Yin-Yang Union] ends.

While outside the [Yin-Yang Union] state, the final hit of your Basic Attack applies [Bingdi Lotus] to enemies hit. When your Active Skill hits, you gain [Lotus Seed]. When your Charged Attack hits, it consumes [Lotus Seed] to apply [Bingdi Lotus] to one of the targets hit (prioritizing the missing half). You can only carry one [Lotus Seed] at a time. While holding [Lotus Seed], you are unstoppable.
[Bingdi Lotus]: consists of two halves, namely [Bingdi Lotus: Yin] and [Bingdi Lotus: Yang]. When applied, one is randomly selected. When both [Bingdi Lotus: Yin] and [Bingdi Lotus: Yang] are on the same enemy, they merge and bloom, dealing DMG equal to 491+262% ATK+23.6% of Max HP and restoring 0.5 Energy Charge. Each Bingdi Lotus bloom reduces [Yin-Yang Cycle]'s cooldown by 3s. This effect can trigger up to 7 times. Casting [Yin-Yang Cycle] resets this limit.

When entering [Yin-Yang Union], all [Bingdi Lotus] on enemies and your [Lotus Seed] are cleared.
When [Yin-Yang Union] ends, any inactive [Yin-Yang Rift] closes immediately, and your Active Skill and Support Skill start with 2s cooldown.  
        `,
    basicAttack: "Azure Cleave",
    basicAttackImg: "../assets/battle-icons/basic-attack.png",
    basicAttackText: `
Wield Azuregaze to attack enemies.
First Strike: 74+39% ATK+3.5% of Max HP DMG.
Second Strike: 66+34% ATK+3.2% of Max HP DMG.
Third Strike: Thrust Azuregaze upward, dealing DMG equal to 135+72% ATK+6.5% of Max HP. This attack is not considered the final hit of Basic Attack. After the upward strike, you enter [Sword Stance]. While in [Sword Stance], different attacks can be derived based on [Paired Knot].
Charged Attack slashes forward, dealing DMG equal to 174+93% ATK+8.4% of Max HP.
        `,
    activeSkill: "Severance Dance",
    activeSkillCooldown: "6 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/active-skill.png",
    activeSkillText: `
Swing Azuregaze to perform a two-hit combo, dealing total DMG equal to 358+190% ATK+17.2% of Max HP. You become unstoppable throughout the attack. After the second hit you enter [Sword Stance]. While in [Sword Stance], different attacks can be derived based on [Paired Knot].        
        `,
    passiveMCSkill: "Paired Knot",
    passiveMCSkillImg: "../assets/battle-icons/mc-passive-skill.png",
    passiveMCText: `
After performing certain attacks, you enter [Sword Stance]. Movement, attacking, or certain circumstances will end this state. You are unstoppable while it lasts. During this time, tap Basic Attack to perform [Paired Knot: Yang]; hold Basic Attack to perform [Paired Knot: Yin].
[Paired Knot: Yang]: Exit [Sword Stance] and swing the sword to the front right, dealing DMG equal to 135+72% ATK+6.5% of Max HP. You are unstoppable throughout. This attack counts as the final hit of Basic Attack. When this attack applies [Bingdi Lotus], it will always apply [Bingdi Lotus: Yang].
[Paired Knot: Yin]: Exit [Sword Stance] and swing the sword to the front left, dealing DMG equal to 135+72% ATK+6.5% of Max HP. You become unstoppable throughout. This attack counts as the final hit of Basic Attack. When this attack applies [Bingdi Lotus], it will always apply [Bingdi Lotus: Yin].
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG.
When you apply [Bingdi Lotus] to an enemy that already has the same half, you gain [Lotus Seed]. When [Yin-Yang Rift] is active, you restore 0.3 Energy Charge, and both you and Caleb restore 5% of Max HP.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%.
Outside [Yin-Yang Union]:
When you consume [Lotus Seed], Caleb performs an additional [Netherseal Slash]. This attack does not affect [Netherseal Slash]'s original cooldown.
During [Yin-Yang Union]: When the spectral hand summoned by [Yin-Yang Rift] attacks, it unleashes an additional shockwave, dealing AoE DMG equal to 327+175% ATK+15.7% of Max HP. If the shockwave hits during [Yin-Yang Union], enemies struck are marked as [Ghost]
[Ghost]: If the target is marked again while already marked, the target takes DMG equal to 251+134% ATK+12.1% of Max HP When [Yin-Yang Rift] is activated, enemies marked as [Ghost] are marked again. When [Yin-Yang Union] ends, the mark is removed.
        `,
    eidolon2: `
Energy Charge limit is raised by 1.
When fighting alongside Netherlord, you start with 42% Oath Energy, and the duration of the enemy's weakened state is extended by 1 second. DMG dealt when [Ghost] is marked again is increased by 10%.
        `,
    eidolon3: `
The team deals 8% more DMG.
During [Yin-Yang Union], when your Active Skill hits, you gain [Lotus Seed]. This effect can trigger only once per Active Skill. When your Charged Attack hits an enemy, it consumes [Lotus Seed] to unleash an additional shockwave at the target's location, dealing AoE DMG equal to 327+175% ATK+15.7% of Max HP. If the shockwave hits during [Yin-Yang Union], enemies struck are marked as [Ghost]. This effect can trigger only once per Charged Attack.
When [Yin-Yang Rift] appears, you restore an additional 11% Oath Energy. This effect is not affected by Oath Recovery Boost.
DMG dealt by Ardent Oath [Fate Unforgotten] can trigger critical hits.
        `,
  },
  {
    id: 52,
    cardIds: [29, 30],
    link: "x02",
    img: "../assets/companions/caleb_X02.png",
    imgWeapon: "../assets/companions/awakened-vitality.png",
    companionName: "Caleb: Ultimate Weapon X-02",
    speciality: "DPS | Sustained | AoE",
    weaponName: "Awakened Vitality",
    specialityMC: "DPS | Burst | Single-target",
    supportSkill: "Nulledge Field",
    supportSkillCooldown: "8 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_fy_2402_02.png",
    supportSkillText: `
Caleb creates an energy field centered on himself to attack enemies, dealing 461+615% ATK DMG in total.
[Empowered] Nulledge Field: Increases the number of hits and damage dealt, dealing 685+913% ATK DMG in total.
        `,
    resonanceSkill: "Nulledge Chain",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_fy_2402_03.png",
    resonanceSkillText: `
You create an energy field centered on the enemy. Caleb rises into the air and controls his Floating Blades to repeatedly bombard enemies within the field, dealing a total of 990+1322% ATK DMG and 1 [Protocore DMG].        
        `,
    ardentOath: "Synced Awakening",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_fy_2402_04.png",
    ardentOathText: `
Caleb empowers his mech and joins forces with you to control it to attack enemies. After activating [Synced Awakening], you and Caleb enter [Ultimate Synced State] and become invincible for 12s.
During [Ultimate Synced State], hold Basic Attack to continuously attack enemies. Additionally, [Stasis Particles] will be cleared and replaced by [Synced Particles]. Your basic attacks restore [Synced Particles] when they hit enemies. When [Synced Particles] are full, they are immediately consumed to unleash a [Synced Strike].[Synced Strike]: Creates an energy field at the target location that pulls in nearby enemies, then launches an attack at the center, dealing 380+500% ATK DMG to enemies in range.
During [Ultimate Synced State], all damage dealt by your and Caleb's attack is considered [Oath DMG] and will trigger critical hits.
You start with 15% of [Oath Energy].        
        `,
    passiveSkill: "Quantum Stasis",
    passiveSkillImg: "../assets/battle-icons/a2_skill_fy_2402_01.png",
    passiveSkillText: `
Charged Attacks and Resonance Skills that hit enemies will apply [Quantum Stasis], increasing DMG inflicted on them by 10% for 5.5s.
Outside of [Ultimate Synced State], basic attacks on enemies affected by [Quantum Stasis] accumulate [Stasis Particles]. This accumulation effect can trigger only once per Basic Attack but can stack up to 4 times.
Using an Active Skill consumes 1 [Stasis Particle].
Each [Stasis Particle] consumed restores a small amount of [Energy Charge] and increases Active Skill DMG by 5% for 3s. This DMG increase effect can stack up to 4 times when triggered repeatedly, refreshing the duration. All stacks are cleared when the duration ends.        
        `,
    basicAttack: "Nulledge Flash",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1903_01_fy_2402.png",
    basicAttackText: `
Wield Awakened Vitality to start a combo up to 4 hits.
First Strike: 77+103% ATK DMG 
Second Strike: 74+99% ATK DMG 
Third Strike: 109+145% ATK DMG 
Fourth Strike: 137+182% ATK DMG

Charged Attack creates an energy field at the target location, dealing a total of 252+336% ATK DMG in multiple hits.        
        `,
    activeSkill: "Nulledge Rain",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1903_02_fy_2402.png",
    activeSkillText: `
Hold the Active Skill button to charge. During this time, [Quantum Clustering] stacks at regular intervals, up to 3 times.
Each [Quantum Clustering] generates 2 [Quantum Clusters] that hover around you. When the gathering ends or when you release the button, all [Quantum Clusters] will launch at the target enemy, dealing 72+96% ATK DMG each and restoring 3.7% [Oath Energy] on hit.        
        `,
    passiveMCSkill: "Nulledge Double",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1903_03_fy_2402.png",
    passiveMCText: `
Each time you perform [Quantum Clustering], consume 1 [Stasis Particle] to trigger an additional [Quantum Clustering]. This additional [Quantum Clustering] cannot trigger this passive effect.
While using Active Skills, you gain 50% DMG Reduction.        
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% Iess DMG. 
When fighting alongside Ultimate Weapon X-02, Ardent Oath DMG increases by 20%. When you use [Nulledge Field] or [Empowered Nulledge Field] immediately restore 1 [Stasis Particles].        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
Extends [Quantum Stasis] duration by 2.5s and increases DMG taken by affected enemies by 10%.
Hitting enemies with [Nulledge Field] and [Empowered Nulledge Field] also applies [Quantum Stasis].
When fighting alongside  Ultimate Weapon X-02, you become unstoppable while using Active Skills.        
        `,
    eidolon2: `
Increases Energy Charge cap by 1. 
When fighting alongside Ultimate Weapon X-02, using Active Skills increases ATK for both of you by 8% for 10s. Whenever your Active Skills deal DMG, you both recover a small amount of HP.        
        `,
    eidolon3: `
The team deals 8% more DMG. 
When entering [Ultimate Synced State], immediately restore 80% [Synced Particles] and increase [Synced Particles] acquisition efficiency by 30%. When using [Synced Strike], he will also summon multiple Floating Blades at the target location to assist in the attack, dealing a total of 122+164% ATK DMG.        
        `,
  },
  {
    id: 53,
    cardIds: [31, 32],
    link: "colonel",
    img: "../assets/companions/caleb_colonel.png",
    imgWeapon: "../assets/companions/skybreaker-sn.png",
    companionName: "Caleb: Farspace Colonel",
    speciality: "DPS | Burst | Empower",
    weaponName: "Skybreaker-SN",
    specialityMC: "DPS | Burst | Empower",
    supportSkill: "Particle Beam",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_fy_2401_02.png",
    supportSkillText: `
Caleb dashes to the enemy, leaps upward, and fires a Particle Beam at the target, dealing DMG equal to 284+151% ATK+599% DEF and recovers 5 [Firepower].
[Empowered] Particle Beam: Increases DMG to 392+209% ATK+828% DEF.        
        `,
    resonanceSkill: "Deep Strike",
    resonanceSkillCooldown: "none",
    resonanceSkillCost: "100 Firepower points",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_fy_2401_03.png",
    resonanceSkillText: `
You and Caleb summon an aerial combat unit to unleash a powerful air strike on the target, dealing DMG equal to 245+131% ATK+519% DEF, plus 2 [Protocore DMG].
This attack creates a [Battlefront] across the combat zone. Caleb gradually consumes [Firepower] to maintain it for 15s.
Within the [Battlefront], [Deep Strike] is replaced by [Ground Breach]. The final hit of your basic attack applies 1 [Focus] marks, up to 3 marks. [Focus] increases the damage dealt by [Ground Breach]. Also, [Firepower] cannot be recovered while in the [Battlefront]. 

[Ground Breach]:
You and Caleb set up a sniping position, dealing DMG equal to 512+273% ATK+1082% DEF to enemies in range. The first [Focus] mark increases damage by 40%; each subsequent mark increases damage by 20%.
After sniping, all [Firepower] is consumed and the [Battlefront] disappears.        
        `,
    ardentOath: "Total Blokade",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_fy_2401_05.png",
    ardentOathText: `
You and Caleb lock down the entire perimeter and call in an aerial array for a full-scale sweep, dealing DMG equal to 1440+780% ATK+3060% DEF in total.        
        `,
    passiveSkill: "Combat Guidance",
    passiveSkillImg: "../assets/battle-icons/a2_skill_fy_2401_01.png",
    passiveSkillText: `
Each hit of your basic attack restores 1 [Firepower]. The final hit recovers an additional 2.
[Firepower] is capped at 100. When full, you can use [Deep Strike]. Using [Deep Strike] or [Ground Breach] restores 0.3 [Energy Charge].
Enemy Weakened status duration is extended by 2s.        
        `,
    basicAttack: "Swift Strike",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1901_01_FY_2401.png",
    basicAttackText: `
Wield Skybreaker-SN to perform a combo up to 4 hits. 
First Strike: 47+25% ATK+99% DEF
Second Strike: 70+37% ATK+148% DEF 
Third Strike: 68+36% ATK+144% DEF 
Fourth Strike: 85+45% ATK+180% DEF

Charged Attack pierces through enemies in a fan-shaped area, dealing DMG equal to 133+71% ATK+281% DEF.        
        `,
    activeSkill: "Air Strike",
    activeSkillCooldown: "12 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1901_02_FY_2401.png",
    activeSkillText: `
Fire into the sky to call for support, launching multiple air strikes at enemies in range. Deal DMG equal to 200+105% ATK+420% DEF in total and recover 2 [Firepower].
When casting [Air Strike] with 2 or more Energy Charges, consume 1 additional Energy Charges to increase DMG by 185+100% ATK+395% DEF.
Each hit of [Air Strike] restores 1 [Firepower]. This effect can be triggered once every 1s.        
        `,
    passiveMCSkill: "Blast Strike",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1901_03_FY_2401.png",
    passiveMCText: `
While inside the [Battlefront]:
After using a Charged Attack or [Air Strike], tap Basic Attack to instantly perform its third strike. 
While outside the [Battlefront]:
Dodging grants 10 stack(s) of [Zerom] every 5s. While you have [Zerom], each basic attack consumes 1 stack(s) of [Zerom] to restore 1 [Firepower].        
        `,
    eidolon0: `
The team deals 8% more DMG and takes 8% less DMG. 
After using Charged Attacks or Active Skills within [Battlefront], you and Caleb's DMG is increased by 20% for 5s. This effect's duration can stack and is cleared when [Ground Breach] ends.        
        `,
    eidolon1: `
Increases Ardent Oath charge by 20%. 
[Focus] mark limit +2. Within [Battlefront], your Active Skills on-hit grant 1 Focus mark and reduce Active Skill cooldown by 6s.        
        `,
    eidolon2: `
Energy Charge limit is raised by 1. 
Using [Ground Breach] or [Deep Strike] restores 0.2 Energy Charge.
When consuming Zerom, additionally restore 0.5 [Firepower].        
        `,
    eidolon3: `
The team deals 8% more DMG. 
You and Caleb deal 5% increased DMG to enemies with Protocore Shield. Within [Battlefront], when the final hit of your basic attack lands, you gain an additional [Focus] mark. When Focus marks exceed the limit, excess marks unleash a gravity vortex at the target location, dealing 225+120% ATK+476% DEF DMG to enemies in range.        
        `,
  },
  {
    id: 54,
    link: "pilot",
    img: "../assets/companions/caleb_pilot.png",
    companionName: "Caleb: Pilot",
    speciality: "DPS | Defend",
    supportSkill: "Fuse",
    supportSkillCooldown: "10 sec.",
    supportSkillImg: "../assets/battle-icons/a2_skill_fy_2403_02.png",
    supportSkillText: `
Caleb uses Evol to fire multiple rounds into the air, guiding them to strike enemies and dealing 285+381% ATK AoE DMG.
[Empowered] Fuse: Increases damage to 318+423% ATK DMG and grants you [Directed Defense].
        `,
    resonanceSkill: "Suppressing Fire",
    resonanceSkillCooldown: "15 sec.",
    resonanceSkillCost: "2 energy charges",
    resonanceSkillImg: "../assets/battle-icons/a2_skill_fy_2403_03.png",
    resonanceSkillText: `
You and Caleb leap into the air and exchange firearms. Caleb uses Evol to keep both of you airborne while laying down suppressing fire on the enemy. Deals 867+1156% ATK DMG and 1 [Protocore DMG].        
        `,
    ardentOath: "Encirclement",
    ardentOathCost: "100% Oath Energy",
    ardentOathImg: "../assets/battle-icons/a2_skill_fy_2403_04.png",
    ardentOathText: `
Your Evol resonates with Caleb's as you two launch a joint attack against the enemy, dealing massive DMG equal to 1200+1600% ATK.        
        `,
    passiveSkill: "Mark",
    passiveSkillImg: "../assets/battle-icons/a2_skill_fy_2403_01.png",
    passiveSkillText: `
Hitting enemies with Active Skills [Fuse], or [Suppressing Fire] applies [Target Mark]. [Target Mark] lasts for 8s.
[Target Mark]: When an enemy inflicted with [Target Mark] receives another mark or is hit by the final strike of your basic attack, their [Target Mark] triggers, dealing 53+70% ATK DMG and releasing a [Target Particle].
[Target Particle]: Explodes after 15s, dealing 113+150% ATK DMG to nearby enemies and granting you [Directed Defense]. Hitting enemies with a Charged Attack will detonate all [Target Particles] immediately.
[Directed Defense]: When taking damage, you consume [Directed Defense] to gain 25% DMG Reduction for 5s. Cannot gain new [Directed Defense] while DMG Reduction is active.
You enter combat with [Directed Defense] active.        
        `,
  },
  {
    id: 61,
    link: "sword",
    imgWeapon: "../assets/companions/sword.png",
    weaponName: "Hunter: Sword",
    specialityMC: "DPS | Sustained | Empower",
    basicAttack: "Pierce",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1904_02.png",
    basicAttackText: `
Wield a sword to start a combo of up to 4 hits.
First Strike: 60+80% ATK DMG
Second Strike: 60+80% ATK DMG 
Third Strike: 72+96% ATK DMG 
Fourth Strike: 96+129% ATK DMG

Charged Attack unleashes a single slash, dealing 118+157% ATK AoE DMG. When [Hunter's Intention] is at 10 stacks, Charged Attack will be enhanced and deal 250+333% single target ATK DMG.       
        `,
    activeSkill: "Blade's Shadow",
    activeSkillCooldown: "8 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1904_03.png",
    activeSkillText: `
After a brief charge-up, lunge forward and unleash a slashing attack on the enemies ahead, dealing AoE DMG of 341+455% ATK.     
        `,
    passiveMCSkill: "Hunter's Intention",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1904_01.png",
    passiveMCText: `
For every instance of DMG, gains a stack of Hunter's Intention, up to 10 stacks. Each stack of Hunter's Intention increases ATK by 1.4%. When Hunter's Intention reaches 10 stacks, Charged Attack will be enhanced. Hunter's Intention has no set duration, but all stacks will be removed upon being hit.        
        `,
  },
  {
    id: 62,
    link: "wand",
    imgWeapon: "../assets/companions/wand.png",
    weaponName: "Hunter: Wand",
    specialityMC: "Support | AoE | Heal",
    basicAttack: "Magnetic Pulse",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1903_02.png",
    basicAttackText: `
Wield a wand to start a combo up to 4 hits.
First Strike: 72+96% ATK DMG
Second Strike: 79+106% ATK DMG 
Third Strike: 85+115% ATK DMG 
Fourth Strike: 94+125% ATK DMG

Charged Attack forces the enemy into the air, dealing 122+162% ATK DMG.       
        `,
    activeSkill: "Magnetic Nexus",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1903_03.png",
    activeSkillText: `
Create a Magnetic Nexus at the target location that inflicts 6 instances of DMG on enemies within its range, each dealing 34+45% ATK DMG.
When a Magnetic Nexus is active, all allied units restore HP equal to 30+40% ATK when attacking enemies.
        `,
    passiveMCSkill: "Magnetic Resonance",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1903_02.png",
    passiveMCText: `
Your Charged Attack is Empowered with an increased attack range every 15s, dealing 265+353% ATK DMG.     
        `,
  },
  {
    id: 63,
    link: "claymore",
    imgWeapon: "../assets/companions/claymore.png",
    weaponName: "Hunter: Claymore",
    specialityMC: "DPS | Burst | Interrupt",
    basicAttack: "Indomitable Edge",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1902_02.png",
    basicAttackText: `
Wield a claymore to start a combo up to 4 hits.
First Strike: 112+150% ATK DMG
Second Strike: 112+150% ATK DMG 
Third Strike: 124+165% ATK DMG 
Fourth Strike: 135+180% ATK DMG

Charged Attack will cause you to leap forward and smash the ground, dealing 337+449% ATK AoE DMG.
        `,
    activeSkill: "Frangere Slash",
    activeSkillCooldown: "7 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1902_03.png",
    activeSkillText: `
Enter a charging state before using a claymore to attack enemies. For an incomplete charge, deal 410+547% ATK DMG. For a complete charge, can attack twice and deal 621+829% ATK DMG.
        `,
    passiveMCSkill: "Persistence",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1902_01.png",
    passiveMCText: `
Your attacks are less likely to be interrupted, and you take 20.5% less DMG.
When using a Basic Attack or Dodge, Precise Momentum activates.
Continuous Basic Attacks while in Precise Momentum will grant a stack of Gathering which increases the DMG of your next Basic Attack by 12.9%, up to 3 stacks. Upon reaching 3 stacks of Gathering, you can use Frangere Slash. All stacks of Gathering will be consumed in the process, and the DMG of the Frangere Slash is increased by 50%.
        `,
  },
  {
    id: 64,
    link: "firearm",
    imgWeapon: "../assets/companions/firearm.png",
    weaponName: "Hunter: Firearm",
    specialityMC: "DPS | Single-target | Sustained",
    basicAttack: "Precise Firing",
    basicAttackImg: "../assets/battle-icons/a2_skill_pl_1901_02.png",
    basicAttackText: `
Wield dual guns for a combo up to 5 hits, The final Basic Attack inflicts multiple instances of DMG.
First Strike: 44+59% ATK DMG 
Second Strike: 40+53% ATK DMG 
Third Strike: 53+71% ATK DMG 
Fourth Strike: 57+77% ATK DMG 
Fifth Strike: 62+82% ATK DMG

Charged Attack will knock back nearby enemies, dealing AoE DMG equal to 120%+160% ATK.      
        `,
    activeSkill: "In Hot Pursuit",
    activeSkillCooldown: "10 sec.",
    activeSkillCost: "1 energy charge",
    activeSkillImg: "../assets/battle-icons/a2_skill_pl_1902_03.png",
    activeSkillText: `
Perform an enhanced linear attack, dealing 160+213% ATK DMG.
        `,
    passiveMCSkill: "Weakpoint",
    passiveMCSkillImg: "../assets/battle-icons/a2_skill_pl_1901_03.png",
    passiveMCText: `
Basic attacks have a 20% chance of inflicting additional DMG. Upon using an Active Skill, the chance to do additional DMG increases by 80% while ATK SPD increases by 16% for 6s.
        `,
  },

];
