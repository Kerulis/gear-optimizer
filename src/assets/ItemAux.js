export class Item {
    constructor(id, name, slot, zone, level, props) {
        this.id = id;
        this.name = name;
        this.slot = slot;
        this.zone = zone;
        this.level = level;
        this.statnames = [];
        this.base = {};
        this.disable = false;
        for (let i = 0; i < props.length; i++) {
            this.statnames.push(props[i][0]);
            this[props[i][0]] = props[i][1] * (1 + level / 100);
            this.base[props[i][0]] = props[i][1];
        }
    }
}

export function update_level(item, level) {
    for (let stat in item.base) {
        item[stat] = item.base[stat] * (1 + level / 100);
    }
    item.level = level;
}

/**
 * @return {string}
 */
export function EmptySlotName(slotname) {
    return (
        "Empty " + slotname[0].toUpperCase() + slotname.substring(1) + " Slot"
    );
}

/**
 * @return {number}
 */
export function EmptySlotId(slotname) {
    if (slotname === "weapon") {
        return 10000 + 0;
    }
    if (slotname === "head") {
        return 10000 + 1;
    }
    if (slotname === "armor") {
        return 10000 + 2;
    }
    if (slotname === "pants") {
        return 10000 + 3;
    }
    if (slotname === "boots") {
        return 10000 + 4;
    }
    if (slotname === "accessory") {
        return 10000 + 5;
    }
    if (slotname === "other") {
        return 10000 + 6;
    }
    return 10000 - 1;
}

export class EmptySlot extends Item {
    constructor(slot) {
        if (slot === undefined) {
            super("", "Empty Slot", slot, SetName.SAFE, 100, []);
        } else {
            super(
                EmptySlotId(slot[0]),
                EmptySlotName(slot[0]),
                slot,
                SetName.SAFE,
                100,
                [],
            );
        }
        this.empty = true;
    }
}

export class Equip extends Item {
    constructor() {
        super(100000, "total", undefined, undefined, 100, []);
        this.items = [];
        this.counts = {};
        Object.getOwnPropertyNames(Slot).map((x) => {
            this.counts[Slot[x][0]] = 0;
            return undefined;
        });
        Object.getOwnPropertyNames(Stat).map((x) => {
            this[Stat[x]] = 100;
            this.statnames.push(Stat[x]);
            return undefined;
        });
        // correct POWER, TOUGHNESS and RESPAWN since these are additive from 0 instead of 100%
        this[Stat.POWER] = 0;
        this[Stat.TOUGHNESS] = 0;
        this[Stat.RESPAWN] = 0;
    }
}

export class ItemContainer {
    constructor(items) {
        this.names = [];
        for (let i = 0; i < items.length; i++) {
            this.names.push(items[i][0]);
            this[items[i][0]] = items[i][1];
        }
    }
}

export const ItemNameContainer = (accslots, offhand) => {
    let container = {};
    const slotlist = Object.getOwnPropertyNames(Slot);
    for (let idx in slotlist) {
        const slot = slotlist[idx];
        const slotname = Slot[slot][0];
        let list = [];
        if (slot === "ACCESSORY") {
            for (let jdx = 0; jdx < accslots; jdx++) {
                list.push(new EmptySlot(Slot[slot]).id);
            }
        } else if (slot === "OTHER") {
            list.push(1000);
            list.push(1001);
        } else {
            list.push(new EmptySlot(Slot[slot]).id);
            if (slot === "WEAPON" && offhand > 0) {
                list.push(new EmptySlot(Slot[slot]).id);
            }
        }
        container[slotname] = list;
    }
    return container;
};

export const Slot = {
    WEAPON: ["weapon", 0],
    HEAD: ["head", 1],
    CHEST: ["armor", 2],
    PANTS: ["pants", 3],
    BOOTS: ["boots", 4],
    ACCESSORY: ["accessory", 5],
    OTHER: ["other", 6],
};

export const Stat = {
    // adventure
    POWER: "Power",
    TOUGHNESS: "Toughness",
    MOVE_COOLDOWN: "Move Cooldown",
    RESPAWN: "Respawn",
    DAYCARE_SPEED: "Daycare Speed",
    // Drop
    GOLD_DROP: "Gold Drops",
    DROP_CHANCE: "Drop Chance",
    QUEST_DROP: "Quest Drops",
    // Ygg
    SEED_DROP: "Seed Gain",
    YGGDRASIL_YIELD: "Yggdrasil Yield",
    // E
    ENERGY_BARS: "Energy Bars",
    ENERGY_CAP: "Energy Cap",
    ENERGY_POWER: "Energy Power",
    ENERGY_SPEED: "Energy Speed",
    // M
    MAGIC_BARS: "Magic Bars",
    MAGIC_CAP: "Magic Cap",
    MAGIC_POWER: "Magic Power",
    MAGIC_SPEED: "Magic Speed",
    // R
    RES3_BARS: "Resource 3 Bars",
    RES3_CAP: "Resource 3 Cap",
    RES3_POWER: "Resource 3 Power",
    // raw speed
    AT_SPEED: "Raw AT Speed",
    AUGMENT_SPEED: "Raw Augment Speed",
    BEARD_SPEED: "Raw Beard Speed",
    HACK_SPEED: "Raw Hack Speed",
    NGU_SPEED: "Raw NGU Speed",
    WANDOOS_SPEED: "Raw Wandoos Speed",
    WISH_SPEED: "Raw Wish Speed",
    // junk
    AP: "AP",
    EXPERIENCE: "Experience",
    COOKING: "Cooking",
};

let single_factors = {
    NONE: ["None", []],
    DELETE: ["Delete priority", []],
    INSERT: ["Insert priority", []],
    POWER: ["Power", [Stat.POWER]],
    TOUGHNESS: ["Toughness", [Stat.TOUGHNESS]],
    MOVE_COOLDOWN: ["Move Cooldown", [Stat.MOVE_COOLDOWN]],
    RESPAWN: ["Respawn", [Stat.RESPAWN]],
    DAYCARE_SPEED: ["Daycare", [Stat.DAYCARE_SPEED]],
    GOLD_DROP: ["Gold Drops", [Stat.GOLD_DROP]],
    DROP_CHANCE: ["Drop chance", [Stat.DROP_CHANCE]],
    QUEST_DROP: ["Quest Drop", [Stat.QUEST_DROP]],
};

let remaining_factors = {};

Object.keys(Stat).forEach((key) => {
    if (single_factors[key] === undefined) {
        remaining_factors[key] = [Stat[key], [Stat[key]]];
    }
});

export const multiple_factors = {
    ENGU: ["Energy NGU", [Stat.ENERGY_CAP, Stat.ENERGY_POWER, Stat.NGU_SPEED]],
    MNGU: ["Magic NGU", [Stat.MAGIC_CAP, Stat.MAGIC_POWER, Stat.NGU_SPEED]],
    NGUS: [
        "NGUs",
        [
            Stat.ENERGY_CAP,
            Stat.ENERGY_POWER,
            Stat.MAGIC_CAP,
            Stat.MAGIC_POWER,
            Stat.NGU_SPEED,
        ],
        [1 / 2, 1 / 2, 1 / 2, 1 / 2, 1],
    ],
    HACK: ["Hacks", [Stat.RES3_CAP, Stat.RES3_POWER, Stat.HACK_SPEED]],
    WISHES: [
        "Wishes",
        [
            Stat.ENERGY_CAP,
            Stat.ENERGY_POWER,
            Stat.MAGIC_CAP,
            Stat.MAGIC_POWER,
            Stat.RES3_CAP,
            Stat.RES3_POWER,
            Stat.WISH_SPEED,
        ],
        [0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 1],
    ],
    NGUSHACK: [
        "NGUs and Hacks",
        [
            Stat.ENERGY_CAP,
            Stat.ENERGY_POWER,
            Stat.MAGIC_CAP,
            Stat.MAGIC_POWER,
            Stat.NGU_SPEED,
            Stat.RES3_CAP,
            Stat.RES3_POWER,
            Stat.HACK_SPEED,
        ],
        [1 / 3, 1 / 3, 1 / 3, 1 / 3, 2 / 3, 1 / 3, 1 / 3, 1 / 3],
    ],
    NGUWISH: [
        "NGUs and Wishes",
        [
            Stat.ENERGY_CAP,
            Stat.ENERGY_POWER,
            Stat.MAGIC_CAP,
            Stat.MAGIC_POWER,
            Stat.NGU_SPEED,
            Stat.RES3_CAP,
            Stat.RES3_POWER,
            Stat.WISH_SPEED,
        ],
        [
            1.17 / 3,
            1.17 / 3,
            1.17 / 3,
            1.17 / 3,
            2 / 3,
            0.17 / 3,
            0.17 / 3,
            1 / 3,
        ],
    ],
    WISHHACK: [
        "Wishes and Hacks",
        [
            Stat.ENERGY_CAP,
            Stat.ENERGY_POWER,
            Stat.MAGIC_CAP,
            Stat.MAGIC_POWER,
            Stat.RES3_CAP,
            Stat.RES3_POWER,
            Stat.HACK_SPEED,
            Stat.WISH_SPEED,
        ],
        [
            0.17 / 2,
            0.17 / 2,
            0.17 / 2,
            0.17 / 2,
            1.17 / 2,
            1.17 / 2,
            1 / 2,
            1 / 2,
        ],
    ],
    ETIMEMACHINE: ["Energy Time Machine", [Stat.ENERGY_CAP, Stat.ENERGY_POWER]],
    MTIMEMACHINE: ["Magic Time Machine", [Stat.MAGIC_CAP, Stat.MAGIC_POWER]],
    TIMEMACHINE: [
        "Time Machine",
        [Stat.ENERGY_CAP, Stat.ENERGY_POWER, Stat.MAGIC_CAP, Stat.MAGIC_POWER],
        [1 / 2, 1 / 2, 1 / 2, 1 / 2],
    ],
    BLOOD: ["Blood Rituals", [Stat.MAGIC_CAP, Stat.MAGIC_POWER]],
    EWANDOOS: ["Energy Wandoos", [Stat.ENERGY_CAP, Stat.WANDOOS_SPEED]],
    MWANDOOS: ["Magic Wandoos", [Stat.MAGIC_CAP, Stat.WANDOOS_SPEED]],
    WANDOOS: [
        "Wandoos",
        [
            Stat.ENERGY_CAP,
            Stat.WANDOOS_SPEED,
            Stat.MAGIC_CAP,
            Stat.WANDOOS_SPEED,
        ],
        [1 / 2, 1 / 2, 1 / 2, 1 / 2],
    ],
    AUGMENTATION: [
        "Augmentation",
        [Stat.ENERGY_CAP, Stat.ENERGY_POWER, Stat.AUGMENT_SPEED],
    ],
    AT: [
        "Advanced Training",
        [Stat.ENERGY_POWER, Stat.ENERGY_CAP, Stat.AT_SPEED],
        [1 / 2, 1, 1],
    ],
    EBEARD: [
        "Energy Beards",
        [Stat.ENERGY_POWER, Stat.ENERGY_BARS, Stat.BEARD_SPEED],
        [1 / 2, 1, 1],
    ],
    MBEARD: [
        "Magic Beards",
        [Stat.MAGIC_POWER, Stat.MAGIC_BARS, Stat.BEARD_SPEED],
        [1 / 2, 1, 1],
    ],
    BEARD: [
        "Beards",
        [
            Stat.ENERGY_POWER,
            Stat.ENERGY_BARS,
            Stat.MAGIC_POWER,
            Stat.MAGIC_BARS,
            Stat.BEARD_SPEED,
        ],
        [1 / 4, 1 / 2, 1 / 4, 1 / 2, 1],
    ],
    ECAPSPEED: [
        "Energy Cap Speed",
        [Stat.ENERGY_CAP, Stat.ENERGY_BARS],
        [-1, 1],
    ],
    MCAPSPEED: ["Magic Cap Speed", [Stat.MAGIC_CAP, Stat.MAGIC_BARS], [-1, 1]],
    XCAPSPEED: [
        "Resource 3 Cap Speed",
        [Stat.RES3_CAP, Stat.RES3_BARS],
        [-1, 1],
    ],
    EMPC: [
        "EMPC",
        [Stat.ENERGY_POWER, Stat.ENERGY_CAP, Stat.MAGIC_POWER, Stat.MAGIC_CAP],
    ],
};

function extend(obj, src) {
    Object.keys(src).forEach(function (key) {
        obj[key] = src[key];
    });
    return obj;
}

export const Factors = extend(
    extend(single_factors, multiple_factors),
    remaining_factors,
);

export const SetName = {
    MISC: ["Miscellaneous", -4],
    HEART: ["My Hearts <3", -3],
    FOREST_PENDANT: ["Forest Pendant", -2],
    LOOTY: ["Looty", -1],
    ITOPOD: ["ITOPOD", 0],
    SAFE: ["Safe Zone", 1],
    TRAINING: ["Tutorial Zone", 2],
    SEWERS: ["Sewers", 3],
    FOREST: ["Forest", 4],
    CAVE: ["Cave of Many Things", 5],
    SKY: ["The Sky", 6],
    HSB: ["High Security Base", 7],
    GRB: ["Gordon Ramsay Bolton", 8],
    CLOCK: ["Clock Dimension", 9],
    GCT: ["Grand Corrupted Tree", 10],
    TWO_D: ["The 2D Universe", 11],
    SPOOPY: ["Ancient Battlefield", 12],
    JAKE: ["Jake from Accounting", 13],
    GAUDY: ["A Very Strange Place", 14],
    MEGA: ["Mega Lands", 15],
    UUG_RINGS: ["UUG, The Unmentionable", 16],
    BEARDVERSE: ["The Beardverse", 17],
    WANDERER: ["Walderp", 18],
    WANDERER2: ["Walderp", 18],
    BADLY_DRAWN: ["Badly Drawn World", 19],
    STEALTH: ["Boring-Ass Earth", 20],
    SLIMY: ["The Beast", 21, 1],
    SLIMY2: ["The Beast", 21, 2],
    SLIMY3: ["The Beast", 21, 3],
    SLIMY4: ["The Beast", 21, 4],
    CHOCO: ["Chocolate World", 22],
    EDGY: ["The Evilverse", 23],
    PINK: ["Pretty Pink Princess Land", 24],
    NERD: ["Greasy Nerd", 25, 1],
    NERD2: ["Greasy Nerd", 25, 2],
    NERD3: ["Greasy Nerd", 25, 3],
    NERD4: ["Greasy Nerd", 25, 4],
    META: ["Meta Land", 26],
    PARTY: ["Interdimensional Party", 27],
    MOBSTER: ["The Godmother", 28, 1],
    MOBSTER2: ["The Godmother", 28, 2],
    MOBSTER3: ["The Godmother", 28, 3],
    MOBSTER4: ["The Godmother", 28, 4],
    TYPO: ["Typo Zonw", 29],
    FAD: ["The Fad-lands", 30],
    JRPG: ["JRPGVille", 31],
    EXILE: ["The Exile", 32, 1],
    EXILE2: ["The Exile", 32, 2],
    EXILE3: ["The Exile", 32, 3],
    EXILE4: ["The Exile", 32, 4],
    RADLANDS: ["The Rad Lands", 33],
    BACKTOSCHOOL: ["Back To School", 34],
    WESTWORLD: ["The West World", 35],
    ITHUNGERS: ["It Hungers", 36, 1],
    ITHUNGERS2: ["It Hungers", 36, 2],
    ITHUNGERS3: ["It Hungers", 36, 3],
    ITHUNGERS4: ["It Hungers", 36, 4],
    BREADVERSE: ["The Breadverse", 37],
    SEVENTIES: ["That 70's Zone", 38],
    HALLOWEEN: ["The Halloweenies", 39],
    ROCKLOBSTER: ["Rock Lobster", 40, 1],
    ROCKLOBSTER2: ["Rock Lobster", 40, 2],
    ROCKLOBSTER3: ["Rock Lobster", 40, 3],
    ROCKLOBSTER4: ["Rock Lobster", 40, 4],
    CONSTRUCTION: ["Construction Zone", 41],
    DUCK: ["DUCK DUCK ZONE", 42],
    NETHER: ["The Nether Regions", 43],
    AMALGAMATE: ["Amalgamate", 44, 1],
    AMALGAMATE2: ["Amalgamate", 44, 2],
    AMALGAMATE3: ["Amalgamate", 44, 3],
    AMALGAMATE4: ["Amalgamate", 44, 4],
};

export const Hacks = [
    ["Stats", 1.0e8, 2.5, 1.025, 10, 7720],
    ["Adventure", 2.0e8, 0.1, 1.02, 50, 7632],
    ["TM", 4.0e8, 0.2, 1.02, 50, 7544],
    ["Drop", 4.0e8, 0.25, 1.03, 40, 7544],
    ["Augment", 8.0e8, 0.2, 1.01, 20, 7456],
    ["ENGU", 2.0e9, 0.1, 1.015, 30, 7340],
    ["MNGU", 2.0e9, 0.1, 1.015, 30, 7340],
    ["Blood", 4.0e9, 0.1, 1.04, 50, 7252],
    ["QP", 8.0e9, 0.05, 1.008, 50, 7164],
    ["Daycare", 2.0e10, 0.02, 1.005, 45, 7048],
    ["EXP", 4.0e10, 0.025, 1.01, 75, 6960],
    ["Number", 8.0e10, 5.0, 1.04, 40, 6873],
    ["PP", 2.0e11, 0.05, 1.005, 25, 6757],
    ["Hack", 2.0e11, 0.05, 1.1, 100, 6757],
    ["Wish", 1.0e13, 0.01, 1.005, 50, 6262],
];

export const Wishes = [
    //page 1
    ["Kick-ass", 1e15, 1],
    ["Wish Speed I", 1e15, 10],
    ["MacGuffin Drops", 2e15, 5],
    ["V2/3/4 Titan Rewards", 8e15, 3],
    ["Money Pit Sucks", 6e15, 1],
    ["Stats I", 3e15, 10],
    ["Adventure Stats I", 3e15, 10],
    ["Inventory Space I", 4e15, 12],
    ["Mega Buff", 6e15, 1],
    ["Energy Power I", 5e15, 10],
    ["Energy Cap I", 5e15, 10],
    ["Energy Bars I", 5e15, 10],
    ["Magic Power I", 5e15, 10],
    ["Magic Cap I", 5e15, 10],
    ["Magic Bars I", 5e15, 10],
    ["Resource 3 Power I", 5e15, 10],
    ["Resource 3 Cap I", 5e15, 10],
    ["Resource 3 Bars I", 5e15, 10],
    ["Hack Speed I", 1e16, 10],
    ["Active Quest Reward I", 2e16, 10],
    ["Minimal Rebirth Time", 3e16, 6],
    //page 2
    ["Wish Speed II", 5e16, 10],
    ["Inventory space II", 8e16, 12],
    ["Faster Basic Training", 1e17, 1],
    ["Blood MacGuffin α Target", 6e16, 1],
    ["Fruit of MacGuffin α Target", 6e16, 1],
    ["Oscar Meyer Weiner", 1e18, 1],
    ["Daycare Kitty Happiness", 5e16, 10],
    ["Dual Wield I", 3e17, 10],
    ["Adventure Stats II", 2e17, 10],
    ["Stats II", 2e17, 10],
    ["Energy Power II", 1e17, 10],
    ["Energy Cap II", 1e17, 10],
    ["Energy Bars II", 1e17, 10],
    ["Magic Power II", 1e17, 10],
    ["Magic Cap II", 1e17, 10],
    ["Magic Bars II", 1e17, 10],
    ["Resource 3 Power II", 1e17, 10],
    ["Resource 3 Cap II", 1e17, 10],
    ["Resource 3 Bars II", 1e17, 10],
    ["Godmother QP", 1e19, 1],
    ["Exile QP", 3e20, 1],
    // page 3
    ["Hack Speed II", 7e17, 10],
    ["Wish Speed III", 2e18, 10],
    ["Daycare Kitty Art", 3e19, 1],
    ["Dual Wield II", 1e19, 10],
    ["Respawn Rate", 6e18, 10],
    ["More QP", 3e18, 10],
    ["Energy Power III", 5e18, 10],
    ["Energy Cap III", 5e18, 10],
    ["Energy Bars III", 5e18, 10],
    ["Magic Power III", 5e18, 10],
    ["Magic Cap III", 5e18, 10],
    ["Magic Bars III", 5e18, 10],
    ["Resource 3 Power III", 5e18, 10],
    ["Resource 3 Cap III", 5e18, 10],
    ["Resource 3 Bars III", 5e18, 10],
    ["Inventory space III", 8e19, 12],
    ["Oh Shit", 3e21, 1],
    ["Blood MacGuffin α Sucks", 4e20, 10],
    ["Fruit of MacGuffin α Sucks", 4e20, 10],
    ["Exp Bonus", 8e19, 10],
    ["Active Quests II", 8e20, 10],
    // page 4
    ["Hack Speed III", 5e20, 10],
    ["Energy Power IV", 3e20, 10],
    ["Energy Cap IV", 3e20, 10],
    ["Energy Bars IV", 3e20, 10],
    ["Magic Power IV", 3e20, 10],
    ["Magic Cap IV", 3e20, 10],
    ["Magic Bars IV", 3e20, 10],
    ["Resource 3 Power IV", 3e20, 10],
    ["Resource 3 Cap IV", 3e20, 10],
    ["Resource 3 Bars IV", 3e20, 10],
    ["Beast QP", 2e16, 1],
    ["Greasy Nerd QP", 5.0e17, 1],
    ["Seek help.", 5.0e21, 1],
    ["QP Hack Milestone I", 2.0e17, 5],
    ["Number Hack Milestone I", 1.0e19, 5],
    ["Hack Hack Milestone I", 6.0e20, 10],
    ["More Base PP", 2.0e21, 10],
    ["Higher level quest drops I", 5.0e17, 2],
    ["Higher level quest drops II", 1.0e22, 2],
    ["Energy Power V", 5.0e21, 10],
    ["Energy Bars V", 5.0e21, 10],
    ["Energy Cap V", 5.0e21, 10],
    ["Magic Power V", 5.0e21, 10],
    ["Magic Bars V", 5.0e21, 10],
    ["Magic Cap V", 5.0e21, 10],
    ["Resource 3 Power V", 5.0e21, 10],
    ["Resource 3 Bars V", 5.0e21, 10],
    ["Resource 3 Cap V", 5.0e21, 10],
    ["Energy Power VI", 1.0e23, 10],
    ["Energy Bars VI", 1.0e23, 10],
    ["Energy Cap VI", 1.0e23, 10],
    ["Magic Power VI", 1.0e23, 10],
    ["Magic Bars VI", 1.0e23, 10],
    ["Magic Cap VI", 1.0e23, 10],
    ["Resource 3 Power VI", 1.0e23, 10],
    ["Resource 3 Bars VI", 1.0e23, 10],
    ["Resource 3 Cap VI", 1.0e23, 10],
    ["Titan 10 QP", 5.0e22, 1],
    ["Major Quests Base QP", 1.0e22, 10],
    ["Minor Quests Base QP", 1.8e23, 2],
    ["Adventure Stats III", 1.0e19, 10],
    ["Adventure Stats IV", 3.0e21, 10],
    ["Stats III", 2.0e19, 10],
    ["Stats IV", 1.0e21, 10],
    ["Sadistic Boss Multiplier I", 2.0e22, 10],
    ["Sadistic Boss Multiplier II", 5.0e23, 10],
    ["Accessory Slot", 5.0e24, 1],
    ["Cube Boosting I", 4.0e19, 20],
    ["ENGU speed I", 7.0e20, 10],
    ["ENGU speed II", 2.0e22, 10],
    ["MNGU speed I", 7.0e20, 10],
    ["MNGU speed II", 2.0e22, 10],

    ["Energy NGU Card I", 4.0e19, 1],
    ["Drop Chance Card I", 4.0e19, 1],
    ["Wandoos Card I", 2.0e19, 1],
    ["Adventure Stats Card I", 8.0e19, 1],
    ["Hacks Card I", 5.0e19, 1],
    ["Augment Card I", 6.0e19, 1],
    ["Gold Drop Card I", 8.0e19, 1],
    ["PP Card I", 1.0e20, 1],
    ["A / D Card I", 9.0e19, 1],
    ["Magic NGU Card I", 1.9e20, 1],
    ["TM Speed Card I", 1.7e20, 1],
    ["QP Card I", 2.2e20, 1],
    ["Daycare Card I", 2.5e20, 1],
    ["Energy NGU Card II", 1.2e21, 1],
    ["Drop Chance Card II", 1.2e21, 1],
    ["Wandoos Card II", 1.0e21, 1],
    ["Adventure Stats Card II", 1.5e21, 1],
    ["Hacks Card II", 1.8e21, 1],
    ["Augment Card II", 1.8e21, 1],
    ["Gold Drop Card II", 2.0e21, 1],
    ["PP Card II", 2.5e21, 1],
    ["A / D Card II", 2.0e21, 1],
    ["Magic NGU Card II", 3.0e21, 1],
    ["TM Speed Card II", 2.5e21, 1],
    ["QP Tier II", 4.0e21, 1],
    ["Daycare Card II", 5.0e21, 1],
    ["Energy NGU Card III", 2.0e22, 1],
    ["Drop Chance Card III", 1.8e22, 1],
    ["Wandoos Card III", 1.5e22, 1],
    ["Adventure Stats Card III", 5.0e22, 1],
    ["Hacks Card III", 4.0e22, 1],
    ["Augment Card III", 6.0e22, 1],
    ["Gold Drop Card III", 7.5e22, 1],
    ["PP Card III", 1.0e23, 2],
    ["A / D Card III", 8.0e22, 1],
    ["Magic NGU Card III", 1.3e23, 1],
    ["TM Speed Card III", 1.2e23, 1],
    ["QP Card III", 1.5e23, 2],
    ["Daycare Card III", 1.6e23, 1],
    ["Faster Mayo I", 5.0e20, 10],
    ["Faster Cards I", 5.0e20, 10],
    ["Faster Mayo II", 1.0e22, 10],
    ["Faster Cards II", 1.0e22, 10],
    ["Faster Mayo III", 2.0e23, 10],
    ["Faster Cards III", 2.0e23, 10],
    ["Faster Mayo IV", 4.0e24, 10],
    ["Faster Cards IV", 4.0e24, 10],
    ["BEEFY I", 4.0e24, 1],
    ["WIMPY I", 4.0e24, 1],
    ["Bigger Deck I", 1.0e20, 5],
    ["Bigger Deck II", 5.0e21, 5],
    ["Bigger Deck III", 2.5e23, 5],
    ["Mayo Generator", 5.0e21, 1],
    ["Bonus Tag", 3.0e22, 1],
    ["Better Tags I", 2.0e19, 10],
    ["Better Tags II", 6.0e20, 10],
    ["Better Tags III", 1.8e22, 10],
    ["Better Tags IV", 5.0e23, 10],
    ["Better Tags V", 1.5e25, 10],
    ["Energy NGU Card IV", 2.5e23, 2],
    ["Drop Chance Card IV", 2.2e23, 2],
    ["Wandoos Card IV", 2.0e23, 2],
    ["Adventure Stats Card IV", 5.0e23, 2],
    ["Hacks Card IV", 4.0e23, 2],
    ["Augment Card IV", 6.0e23, 2],
    ["Gold Drop Card IV", 7.5e23, 2],
    ["PP Card IV", 1.0e24, 2],
    ["A / D Card IV", 8.0e23, 2],
    ["Magic NGU Card IV", 1.3e24, 2],
    ["TM Speed Card IV", 1.2e24, 2],
    ["QP Card IV", 1.5e24, 2],
    ["Daycare Card IV", 1.6e24, 2],
    ["Titan 11 QP", 2.0e25, 1],
    ["Adventure Stats V", 1.0e24, 20],
    ["Stats V", 1.0e24, 20],
    ["F**king Done With AT", 1.0e18, 1],
    ["Stats VI", 2.0e25, 20],
    ["Stats VII", 4.0e26, 20],
    ["Energy Power VII", 2.0e24, 10],
    ["Energy Bars VII", 2.0e24, 10],
    ["Energy Cap VII", 2.0e24, 10],
    ["Magic Power VII", 2.0e24, 10],
    ["Magic Bars VII", 2.0e24, 10],
    ["Magic Cap VII", 2.0e24, 10],
    ["Resource 3 Power VII", 2.0e24, 10],
    ["Resource 3 Bars VII", 2.0e24, 10],
    ["Resource 3 Cap VII", 2.0e24, 10],
    ["Sneak Preview", 1.0e24, 1],
    ["SHUT DOWN", 1.0e27, 1],
    ["Titan 12 QP", 1.0, 1],
    ["Energy NGU Card V", 4.0e25, 2],
    ["Drop Chance Card V", 5.0e25, 2],
    ["Wandoos Card V", 4.0e25, 2],
    ["Adventure Stats Card V", 1.0e26, 2],
    ["Hacks Card V", 8.0e25, 2],
    ["Augment Card V", 1.0e26, 2],
    ["Gold Drop Card V", 1.3e26, 2],
    ["PP Card V", 2.0e26, 2],
    ["A / D Card V", 2.5e26, 2],
    ["Magic NGU Card V", 2.0e26, 2],
    ["TM Speed Card V", 3.0e26, 2],
    ["QP Card V", 5.0e26, 2],
    ["Daycare Card V", 4.0e26, 2],
    ["Adventure Stats VI", 5.0e25, 20],
    ["Stats VIII", 1.8e26, 20],
    ["BEEFY II", 1.0e26, 1],
    ["WIMPY II", 1.0e26, 1],
    ["Faster Mayo V", 8.0e25, 10],
    ["Faster CardsV", 8.0e25, 10],
    ["Faster Mayo VI", 1.0e27, 10],
    ["Faster CardsVI", 1.0e27, 10],
];

export const resource_priorities = [
    [1, 0, 2],
    [1, 2, 0],
    [2, 1, 0],
    [0, 1, 2],
    [2, 0, 1],
    [0, 2, 1],
];

const vngu = (cost, bonus, softcap, scbonus, scexponent) => {
    return {
        cost: cost,
        bonus: bonus,
        softcap: softcap,
        scbonus: scbonus,
        scexponent: scexponent,
    };
};
const ngu = (
    name,
    nc,
    nb,
    nsc,
    nscb,
    nsce,
    ec,
    eb,
    esc,
    escb,
    esce,
    sc,
    sb,
    ssc,
    sscb,
    ssce,
) => {
    return {
        name: name,
        normal: vngu(nc, nb, nsc, nscb, nsce),
        evil: vngu(ec, eb, esc, escb, esce),
        sadistic: vngu(sc, sb, ssc, sscb, ssce),
    };
};

export const NGUs = {
    energy: [
        ngu(
            "Augments",
            1.0e13,
            1.0e-2,
            1.0e9,
            0,
            0.0,
            1.0e22,
            5.0e-3,
            1.0e9,
            0,
            0.0,
            1.0e33,
            4.0e-3,
            1.0e9,
            0,
            0.0,
        ),
        ngu(
            "Wandoos",
            1.0e13,
            1.0e-3,
            1.0e9,
            0,
            0.0,
            1.0e22,
            1.0e-3,
            1.0e3,
            177.9,
            2.5e-1,
            1.0e33,
            6.0e-4,
            1.0e3,
            354.81,
            1.5e-1,
        ),
        ngu(
            "Respawn",
            1.0e13,
            5.0e-4,
            4.0e2,
            5,
            2.0e-1,
            1.0e22,
            5.0e-6,
            1.0e4,
            20,
            5.0e-2,
            1.0e33,
            5.0e-6,
            1.0e4,
            20,
            5.0e-2,
        ),
        ngu(
            "Gold",
            1.0e13,
            1.0e-2,
            1.0e9,
            0,
            0.0,
            1.0e23,
            5.0e-3,
            1.0e9,
            0,
            0.0,
            1.0e33,
            5.0e-3,
            1.0e3,
            31.63,
            5.0e-1,
        ),
        ngu(
            "Adventure α",
            1.0e13,
            1.0e-3,
            1.0e3,
            31.7,
            5.0e-1,
            1.0e24,
            5.0e-4,
            1.0e3,
            177.9,
            2.5e-1,
            1.0e34,
            4.0e-4,
            1.0e3,
            251.19,
            2.0e-1,
        ),
        ngu(
            "Power α",
            1.0e13,
            5.0e-2,
            1.0e9,
            0,
            0.0,
            1.0e25,
            2.0e-2,
            1.0e9,
            0,
            0.0,
            1.0e35,
            1.6e-2,
            1.0e9,
            0,
            0.0,
        ),
        ngu(
            "Drop Chance",
            1.0e15,
            1.0e-3,
            1.0e3,
            31.7,
            5.0e-1,
            1.0e26,
            5.0e-4,
            1.0e3,
            125.9,
            3.0e-1,
            1.0e36,
            4.0e-4,
            1.0e3,
            251.2,
            2.0e-1,
        ),
        ngu(
            "Magic NGU",
            2.0e16,
            1.0e-3,
            1.0e3,
            125.9,
            3.0e-1,
            1.0e27,
            5.0e-4,
            1.0e3,
            125.9,
            3.0e-1,
            1.0e37,
            4.0e-4,
            1.0e3,
            501.19,
            1.0e-1,
        ),
        ngu(
            "PP",
            5.0e17,
            5.0e-4,
            1.0e3,
            125.9,
            3.0e-1,
            1.01e28,
            2.0e-4,
            1.0e3,
            251.2,
            2.0e-1,
            1.0e38,
            1.6e-4,
            1.0e3,
            501.21,
            1.0e-1,
        ),
    ],
    magic: [
        ngu(
            "Yggdrasil",
            2.0e13,
            1.0e-3,
            4.0e2,
            55.4,
            3.3e-1,
            1.0e22,
            5.0e-4,
            4.0e2,
            219.72,
            1.0e-1,
            1.0e33,
            4.0e-4,
            4.0e2,
            247.69,
            8.0e-2,
        ),
        ngu(
            "Exp",
            6.0e13,
            1.0e-4,
            2.0e3,
            95.66,
            4.0e-1,
            1.0e23,
            5.0e-5,
            2.0e3,
            437.35,
            2.0e-1,
            1.0e33,
            5.0e-5,
            2.0e3,
            639.56,
            1.5e-1,
        ),
        ngu(
            "Power β",
            2.0e14,
            1.0e-2,
            1.0e9,
            0,
            0.0,
            1.0e24,
            5.0e-3,
            1.0e9,
            0,
            0.0,
            1.0e34,
            5.0e-3,
            1.0e9,
            0,
            0.0,
        ),
        ngu(
            "Number",
            6.0e14,
            1.0e-2,
            1.0e3,
            31.7,
            5.0e-1,
            1.0e25,
            5.0e-3,
            1.0e3,
            125.9,
            3.0e-1,
            1.0e35,
            5.0e-3,
            1.0e3,
            251.2,
            2.0e-1,
        ),
        ngu(
            "Time Machine",
            5.0e15,
            2.0e-3,
            1.0e3,
            3.981,
            8.0e-1,
            1.0e26,
            1.0e-3,
            1.0e3,
            3.981,
            8.0e-1,
            1.0e36,
            1.0e-3,
            1.0e3,
            3.981,
            8.0e-1,
        ),
        ngu(
            "Energy NGU",
            5.0e16,
            1.0e-3,
            1.0e3,
            125.9,
            3.0e-1,
            1.0e27,
            5.0e-4,
            1.0e3,
            251.2,
            2.0e-1,
            1.0e37,
            5.0e-4,
            1.0e3,
            354.82,
            1.5e-1,
        ),
        ngu(
            "Adventure β",
            5.0e17,
            3.0e-4,
            1.0e3,
            63.13,
            4.0e-1,
            1.01e28,
            1.5e-4,
            1.0e3,
            177.83,
            2.5e-1,
            1.0e38,
            1.5e-4,
            1.0e3,
            436.53,
            1.2e-1,
        ),
    ],
};
