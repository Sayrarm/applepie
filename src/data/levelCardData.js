import {memoriesData} from './memories-data.js';

export const memoryStats = {
    'HP Memory 0 Rank 5-star': {
        type: 'hp',
        rarity: '5-star',
        baseStats: {
            1: {hp: 2640, atk: 120, def: 60, critRate: 2.6, critDmg: 5.2},
            2: {hp: 2772, atk: 126, def: 63, critRate: 2.6, critDmg: 5.2},
            3: {hp: 2904, atk: 132, def: 66, critRate: 2.6, critDmg: 5.2},
            4: {hp: 3036, atk: 138, def: 69, critRate: 2.6, critDmg: 5.2},
            5: {hp: 3168, atk: 144, def: 72, critRate: 2.6, critDmg: 5.2},
            6: {hp: 3300, atk: 150, def: 75, critRate: 2.6, critDmg: 5.2},
            7: {hp: 3432, atk: 156, def: 78, critRate: 2.6, critDmg: 5.2},
            8: {hp: 3564, atk: 162, def: 81, critRate: 2.6, critDmg: 5.2},
            9: {hp: 3696, atk: 168, def: 84, critRate: 2.6, critDmg: 5.2},
            10: {hp: 3828, atk: 174, def: 87, critRate: 2.6, critDmg: 5.2},
            // Ascend 1 (уровень 10 -> 11)
            11: {hp: 4488, atk: 204, def: 102, critRate: 2.9, critDmg: 5.8},
            12: {hp: 4620, atk: 210, def: 105, critRate: 2.9, critDmg: 5.8},
            13: {hp: 4752, atk: 216, def: 108, critRate: 2.9, critDmg: 5.8},
            14: {hp: 4884, atk: 222, def: 111, critRate: 2.9, critDmg: 5.8},
            15: {hp: 5016, atk: 228, def: 114, critRate: 2.9, critDmg: 5.8},
            16: {hp: 5148, atk: 234, def: 117, critRate: 2.9, critDmg: 5.8},
            17: {hp: 5280, atk: 240, def: 120, critRate: 2.9, critDmg: 5.8},
            18: {hp: 5412, atk: 246, def: 123, critRate: 2.9, critDmg: 5.8},
            19: {hp: 5544, atk: 252, def: 126, critRate: 2.9, critDmg: 5.8},
            20: {hp: 5676, atk: 258, def: 129, critRate: 2.9, critDmg: 5.8},
            // Ascend 2 (уровень 20 -> 21)
            21: {hp: 6336, atk: 288, def: 144, critRate: 3.2, critDmg: 6.4},
            22: {hp: 6468, atk: 294, def: 147, critRate: 3.2, critDmg: 6.4},
            23: {hp: 6600, atk: 300, def: 150, critRate: 3.2, critDmg: 6.4},
            24: {hp: 6732, atk: 306, def: 153, critRate: 3.2, critDmg: 6.4},
            25: {hp: 6864, atk: 312, def: 156, critRate: 3.2, critDmg: 6.4},
            26: {hp: 6996, atk: 318, def: 159, critRate: 3.2, critDmg: 6.4},
            27: {hp: 7128, atk: 324, def: 162, critRate: 3.2, critDmg: 6.4},
            28: {hp: 7260, atk: 330, def: 165, critRate: 3.2, critDmg: 6.4},
            29: {hp: 7392, atk: 336, def: 168, critRate: 3.2, critDmg: 6.4},
            30: {hp: 7524, atk: 342, def: 171, critRate: 3.2, critDmg: 6.4},
            // Ascend 3 (уровень 30 -> 31)
            31: {hp: 8184, atk: 372, def: 186, critRate: 3.5, critDmg: 7},
            32: {hp: 8316, atk: 378, def: 189, critRate: 3.5, critDmg: 7},
            33: {hp: 8448, atk: 384, def: 192, critRate: 3.5, critDmg: 7},
            34: {hp: 8580, atk: 390, def: 195, critRate: 3.5, critDmg: 7},
            35: {hp: 8712, atk: 396, def: 198, critRate: 3.5, critDmg: 7},
            36: {hp: 8844, atk: 402, def: 201, critRate: 3.5, critDmg: 7},
            37: {hp: 8976, atk: 408, def: 204, critRate: 3.5, critDmg: 7},
            38: {hp: 9108, atk: 414, def: 207, critRate: 3.5, critDmg: 7},
            39: {hp: 9240, atk: 420, def: 210, critRate: 3.5, critDmg: 7},
            40: {hp: 9372, atk: 426, def: 213, critRate: 3.5, critDmg: 7},
            // Ascend 4 (уровень 40 -> 41)
            41: {hp: 10032, atk: 456, def: 228, critRate: 3.8, critDmg: 7.6},
            42: {hp: 10164, atk: 462, def: 231, critRate: 3.8, critDmg: 7.6},
            43: {hp: 10296, atk: 468, def: 234, critRate: 3.8, critDmg: 7.6},
            44: {hp: 10428, atk: 474, def: 237, critRate: 3.8, critDmg: 7.6},
            45: {hp: 10560, atk: 480, def: 240, critRate: 3.8, critDmg: 7.6},
            46: {hp: 10692, atk: 486, def: 243, critRate: 3.8, critDmg: 7.6},
            47: {hp: 10824, atk: 492, def: 246, critRate: 3.8, critDmg: 7.6},
            48: {hp: 10956, atk: 498, def: 249, critRate: 3.8, critDmg: 7.6},
            49: {hp: 11088, atk: 504, def: 252, critRate: 3.8, critDmg: 7.6},
            50: {hp: 11220, atk: 510, def: 255, critRate: 3.8, critDmg: 7.6},
            // Ascend 5 (уровень 50 -> 51)
            51: {hp: 11880, atk: 540, def: 270, critRate: 4.1, critDmg: 8.2},
            52: {hp: 12012, atk: 546, def: 273, critRate: 4.1, critDmg: 8.2},
            53: {hp: 12144, atk: 552, def: 276, critRate: 4.1, critDmg: 8.2},
            54: {hp: 12276, atk: 558, def: 279, critRate: 4.1, critDmg: 8.2},
            55: {hp: 12408, atk: 564, def: 282, critRate: 4.1, critDmg: 8.2},
            56: {hp: 12540, atk: 570, def: 285, critRate: 4.1, critDmg: 8.2},
            57: {hp: 12672, atk: 576, def: 288, critRate: 4.1, critDmg: 8.2},
            58: {hp: 12804, atk: 582, def: 291, critRate: 4.1, critDmg: 8.2},
            59: {hp: 12936, atk: 588, def: 294, critRate: 4.1, critDmg: 8.2},
            60: {hp: 13068, atk: 594, def: 297, critRate: 4.1, critDmg: 8.2},
            // Ascend 6 (уровень 60 -> 61)
            61: {hp: 13728, atk: 624, def: 312, critRate: 4.4, critDmg: 8.8},
            62: {hp: 13860, atk: 630, def: 315, critRate: 4.4, critDmg: 8.8},
            63: {hp: 13992, atk: 636, def: 318, critRate: 4.4, critDmg: 8.8},
            64: {hp: 14124, atk: 642, def: 321, critRate: 4.4, critDmg: 8.8},
            65: {hp: 14256, atk: 648, def: 324, critRate: 4.4, critDmg: 8.8},
            66: {hp: 14388, atk: 654, def: 327, critRate: 4.4, critDmg: 8.8},
            67: {hp: 14520, atk: 660, def: 330, critRate: 4.4, critDmg: 8.8},
            68: {hp: 14652, atk: 666, def: 333, critRate: 4.4, critDmg: 8.8},
            69: {hp: 14784, atk: 672, def: 336, critRate: 4.4, critDmg: 8.8},
            70: {hp: 14916, atk: 678, def: 339, critRate: 4.4, critDmg: 8.8},
            // Ascend 7 (уровень 70 -> 71)
            71: {hp: 15576, atk: 708, def: 354, critRate: 4.7, critDmg: 9.4},
            72: {hp: 15708, atk: 714, def: 357, critRate: 4.7, critDmg: 9.4},
            73: {hp: 15840, atk: 720, def: 360, critRate: 4.7, critDmg: 9.4},
            74: {hp: 15972, atk: 726, def: 363, critRate: 4.7, critDmg: 9.4},
            75: {hp: 16104, atk: 732, def: 366, critRate: 4.7, critDmg: 9.4},
            76: {hp: 16236, atk: 738, def: 369, critRate: 4.7, critDmg: 9.4},
            77: {hp: 16368, atk: 744, def: 372, critRate: 4.7, critDmg: 9.4},
            78: {hp: 16500, atk: 750, def: 375, critRate: 4.7, critDmg: 9.4},
            79: {hp: 16632, atk: 756, def: 378, critRate: 4.7, critDmg: 9.4},
            80: {hp: 16764, atk: 762, def: 381, critRate: 4.7, critDmg: 9.4},
        }
    },
    'DEF Memory 0 Rank 5-star': {
        type: 'def',
        rarity: '5-star',
        baseStats: {
            1: {hp: 2400, atk: 120, def: 66, critRate: 2.6, critDmg: 5.2},
            2: {hp: 2520, atk: 126, def: 69, critRate: 2.6, critDmg: 5.2},
            3: {hp: 2640, atk: 132, def: 72, critRate: 2.6, critDmg: 5.2},
            4: {hp: 2760, atk: 138, def: 75, critRate: 2.6, critDmg: 5.2},
            5: {hp: 2880, atk: 144, def: 79, critRate: 2.6, critDmg: 5.2},
            6: {hp: 3000, atk: 150, def: 82, critRate: 2.6, critDmg: 5.2},
            7: {hp: 3120, atk: 156, def: 85, critRate: 2.6, critDmg: 5.2},
            8: {hp: 3240, atk: 162, def: 89, critRate: 2.6, critDmg: 5.2},
            9: {hp: 3360, atk: 168, def: 92, critRate: 2.6, critDmg: 5.2},
            10: {hp: 3480, atk: 174, def: 95, critRate: 2.6, critDmg: 5.2},
            // Ascend 1
            11: {hp: 4080, atk: 204, def: 112, critRate: 2.9, critDmg: 5.8},
            12: {hp: 4200, atk: 210, def: 115, critRate: 2.9, critDmg: 5.8},
            13: {hp: 4320, atk: 216, def: 118, critRate: 2.9, critDmg: 5.8},
            14: {hp: 4440, atk: 222, def: 122, critRate: 2.9, critDmg: 5.8},
            15: {hp: 4560, atk: 228, def: 125, critRate: 2.9, critDmg: 5.8},
            16: {hp: 4680, atk: 234, def: 128, critRate: 2.9, critDmg: 5.8},
            17: {hp: 4800, atk: 240, def: 132, critRate: 2.9, critDmg: 5.8},
            18: {hp: 4920, atk: 246, def: 135, critRate: 2.9, critDmg: 5.8},
            19: {hp: 5040, atk: 252, def: 138, critRate: 2.9, critDmg: 5.8},
            20: {hp: 5160, atk: 258, def: 141, critRate: 2.9, critDmg: 5.8},
            // Ascend 2
            21: {hp: 5760, atk: 288, def: 158, critRate: 3.2, critDmg: 6.4},
            22: {hp: 5880, atk: 294, def: 161, critRate: 3.2, critDmg: 6.4},
            23: {hp: 6000, atk: 300, def: 165, critRate: 3.2, critDmg: 6.4},
            24: {hp: 6120, atk: 306, def: 168, critRate: 3.2, critDmg: 6.4},
            25: {hp: 6240, atk: 312, def: 171, critRate: 3.2, critDmg: 6.4},
            26: {hp: 6360, atk: 318, def: 174, critRate: 3.2, critDmg: 6.4},
            27: {hp: 6480, atk: 324, def: 178, critRate: 3.2, critDmg: 6.4},
            28: {hp: 6600, atk: 330, def: 181, critRate: 3.2, critDmg: 6.4},
            29: {hp: 6720, atk: 336, def: 184, critRate: 3.2, critDmg: 6.4},
            30: {hp: 6840, atk: 342, def: 188, critRate: 3.2, critDmg: 6.4},
            // Ascend 3
            31: {hp: 7440, atk: 372, def: 204, critRate: 3.5, critDmg: 7},
            32: {hp: 7560, atk: 378, def: 207, critRate: 3.5, critDmg: 7},
            33: {hp: 7680, atk: 384, def: 211, critRate: 3.5, critDmg: 7},
            34: {hp: 7800, atk: 390, def: 214, critRate: 3.5, critDmg: 7},
            35: {hp: 7920, atk: 396, def: 217, critRate: 3.5, critDmg: 7},
            36: {hp: 8040, atk: 402, def: 221, critRate: 3.5, critDmg: 7},
            37: {hp: 8160, atk: 408, def: 224, critRate: 3.5, critDmg: 7},
            38: {hp: 8280, atk: 414, def: 227, critRate: 3.5, critDmg: 7},
            39: {hp: 8400, atk: 420, def: 231, critRate: 3.5, critDmg: 7},
            40: {hp: 8520, atk: 426, def: 234, critRate: 3.5, critDmg: 7},
            // Ascend 4
            41: {hp: 9120, atk: 456, def: 250, critRate: 3.8, critDmg: 7.6},
            42: {hp: 9240, atk: 462, def: 254, critRate: 3.8, critDmg: 7.6},
            43: {hp: 9360, atk: 468, def: 257, critRate: 3.8, critDmg: 7.6},
            44: {hp: 9480, atk: 474, def: 260, critRate: 3.8, critDmg: 7.6},
            45: {hp: 9600, atk: 480, def: 264, critRate: 3.8, critDmg: 7.6},
            46: {hp: 9720, atk: 486, def: 267, critRate: 3.8, critDmg: 7.6},
            47: {hp: 9840, atk: 492, def: 270, critRate: 3.8, critDmg: 7.6},
            48: {hp: 9960, atk: 498, def: 273, critRate: 3.8, critDmg: 7.6},
            49: {hp: 10080, atk: 504, def: 277, critRate: 3.8, critDmg: 7.6},
            50: {hp: 10200, atk: 510, def: 280, critRate: 3.8, critDmg: 7.6},
            // Ascend 5
            51: {hp: 10800, atk: 540, def: 297, critRate: 4.1, critDmg: 8.2},
            52: {hp: 10920, atk: 546, def: 300, critRate: 4.1, critDmg: 8.2},
            53: {hp: 11040, atk: 552, def: 303, critRate: 4.1, critDmg: 8.2},
            54: {hp: 11160, atk: 558, def: 306, critRate: 4.1, critDmg: 8.2},
            55: {hp: 11280, atk: 564, def: 310, critRate: 4.1, critDmg: 8.2},
            56: {hp: 11400, atk: 570, def: 313, critRate: 4.1, critDmg: 8.2},
            57: {hp: 11520, atk: 576, def: 316, critRate: 4.1, critDmg: 8.2},
            58: {hp: 11640, atk: 582, def: 320, critRate: 4.1, critDmg: 8.2},
            59: {hp: 11760, atk: 588, def: 323, critRate: 4.1, critDmg: 8.2},
            60: {hp: 11880, atk: 594, def: 326, critRate: 4.1, critDmg: 8.2},
            // Ascend 6
            61: {hp: 12480, atk: 624, def: 343, critRate: 4.4, critDmg: 8.8},
            62: {hp: 12600, atk: 630, def: 346, critRate: 4.4, critDmg: 8.8},
            63: {hp: 12720, atk: 636, def: 349, critRate: 4.4, critDmg: 8.8},
            64: {hp: 12840, atk: 642, def: 353, critRate: 4.4, critDmg: 8.8},
            65: {hp: 12960, atk: 648, def: 356, critRate: 4.4, critDmg: 8.8},
            66: {hp: 13080, atk: 654, def: 359, critRate: 4.4, critDmg: 8.8},
            67: {hp: 13200, atk: 660, def: 363, critRate: 4.4, critDmg: 8.8},
            68: {hp: 13320, atk: 666, def: 366, critRate: 4.4, critDmg: 8.8},
            69: {hp: 13440, atk: 672, def: 369, critRate: 4.4, critDmg: 8.8},
            70: {hp: 13560, atk: 678, def: 372, critRate: 4.4, critDmg: 8.8},
            // Ascend 7
            71: {hp: 14160, atk: 708, def: 389, critRate: 4.7, critDmg: 9.4},
            72: {hp: 14280, atk: 714, def: 392, critRate: 4.7, critDmg: 9.4},
            73: {hp: 14400, atk: 720, def: 396, critRate: 4.7, critDmg: 9.4},
            74: {hp: 14520, atk: 726, def: 399, critRate: 4.7, critDmg: 9.4},
            75: {hp: 14640, atk: 732, def: 402, critRate: 4.7, critDmg: 9.4},
            76: {hp: 14760, atk: 738, def: 405, critRate: 4.7, critDmg: 9.4},
            77: {hp: 14880, atk: 744, def: 409, critRate: 4.7, critDmg: 9.4},
            78: {hp: 15000, atk: 750, def: 412, critRate: 4.7, critDmg: 9.4},
            79: {hp: 15120, atk: 756, def: 415, critRate: 4.7, critDmg: 9.4},
            80: {hp: 15240, atk: 762, def: 419, critRate: 4.7, critDmg: 9.4},
        }
    },
    'ATK Memory 0 Rank 5-star': {
        type: 'atk',
        rarity: '5-star',
        baseStats: {
            1: {hp: 2400, atk: 132, def: 60, critRate: 2.6, critDmg: 5.2},
            2: {hp: 2520, atk: 138, def: 63, critRate: 2.6, critDmg: 5.2},
            3: {hp: 2640, atk: 145, def: 66, critRate: 2.6, critDmg: 5.2},
            4: {hp: 2760, atk: 151, def: 69, critRate: 2.6, critDmg: 5.2},
            5: {hp: 2880, atk: 158, def: 72, critRate: 2.6, critDmg: 5.2},
            6: {hp: 3000, atk: 165, def: 75, critRate: 2.6, critDmg: 5.2},
            7: {hp: 3120, atk: 171, def: 78, critRate: 2.6, critDmg: 5.2},
            8: {hp: 3240, atk: 178, def: 81, critRate: 2.6, critDmg: 5.2},
            9: {hp: 3360, atk: 184, def: 84, critRate: 2.6, critDmg: 5.2},
            10: {hp: 3480, atk: 191, def: 87, critRate: 2.6, critDmg: 5.2},
            // Ascend 1
            11: {hp: 4080, atk: 224, def: 102, critRate: 2.9, critDmg: 5.8},
            12: {hp: 4200, atk: 231, def: 105, critRate: 2.9, critDmg: 5.8},
            13: {hp: 4320, atk: 237, def: 108, critRate: 2.9, critDmg: 5.8},
            14: {hp: 4440, atk: 244, def: 111, critRate: 2.9, critDmg: 5.8},
            15: {hp: 4560, atk: 250, def: 114, critRate: 2.9, critDmg: 5.8},
            16: {hp: 4680, atk: 257, def: 117, critRate: 2.9, critDmg: 5.8},
            17: {hp: 4800, atk: 264, def: 120, critRate: 2.9, critDmg: 5.8},
            18: {hp: 4920, atk: 270, def: 123, critRate: 2.9, critDmg: 5.8},
            19: {hp: 5040, atk: 277, def: 126, critRate: 2.9, critDmg: 5.8},
            20: {hp: 5160, atk: 283, def: 129, critRate: 2.9, critDmg: 5.8},
            // Ascend 2
            21: {hp: 5760, atk: 316, def: 144, critRate: 3.2, critDmg: 6.4},
            22: {hp: 5880, atk: 323, def: 147, critRate: 3.2, critDmg: 6.4},
            23: {hp: 6000, atk: 330, def: 150, critRate: 3.2, critDmg: 6.4},
            24: {hp: 6120, atk: 336, def: 153, critRate: 3.2, critDmg: 6.4},
            25: {hp: 6240, atk: 343, def: 156, critRate: 3.2, critDmg: 6.4},
            26: {hp: 6360, atk: 349, def: 159, critRate: 3.2, critDmg: 6.4},
            27: {hp: 6480, atk: 356, def: 162, critRate: 3.2, critDmg: 6.4},
            28: {hp: 6600, atk: 363, def: 165, critRate: 3.2, critDmg: 6.4},
            29: {hp: 6720, atk: 369, def: 168, critRate: 3.2, critDmg: 6.4},
            30: {hp: 6840, atk: 376, def: 171, critRate: 3.2, critDmg: 6.4},
            // Ascend 3
            31: {hp: 7440, atk: 409, def: 186, critRate: 3.5, critDmg: 7},
            32: {hp: 7560, atk: 415, def: 189, critRate: 3.5, critDmg: 7},
            33: {hp: 7680, atk: 422, def: 192, critRate: 3.5, critDmg: 7},
            34: {hp: 7800, atk: 429, def: 195, critRate: 3.5, critDmg: 7},
            35: {hp: 7920, atk: 435, def: 198, critRate: 3.5, critDmg: 7},
            36: {hp: 8040, atk: 442, def: 201, critRate: 3.5, critDmg: 7},
            37: {hp: 8160, atk: 448, def: 204, critRate: 3.5, critDmg: 7},
            38: {hp: 8280, atk: 455, def: 207, critRate: 3.5, critDmg: 7},
            39: {hp: 8400, atk: 462, def: 210, critRate: 3.5, critDmg: 7},
            40: {hp: 8520, atk: 468, def: 213, critRate: 3.5, critDmg: 7},
            // Ascend 4
            41: {hp: 9120, atk: 501, def: 228, critRate: 3.8, critDmg: 7.6},
            42: {hp: 9240, atk: 508, def: 231, critRate: 3.8, critDmg: 7.6},
            43: {hp: 9360, atk: 514, def: 234, critRate: 3.8, critDmg: 7.6},
            44: {hp: 9480, atk: 521, def: 237, critRate: 3.8, critDmg: 7.6},
            45: {hp: 9600, atk: 528, def: 240, critRate: 3.8, critDmg: 7.6},
            46: {hp: 9720, atk: 534, def: 243, critRate: 3.8, critDmg: 7.6},
            47: {hp: 9840, atk: 541, def: 246, critRate: 3.8, critDmg: 7.6},
            48: {hp: 9960, atk: 547, def: 249, critRate: 3.8, critDmg: 7.6},
            49: {hp: 10080, atk: 554, def: 252, critRate: 3.8, critDmg: 7.6},
            50: {hp: 10200, atk: 561, def: 255, critRate: 3.8, critDmg: 7.6},
            // Ascend 5
            51: {hp: 10800, atk: 594, def: 270, critRate: 4.1, critDmg: 8.2},
            52: {hp: 10920, atk: 600, def: 273, critRate: 4.1, critDmg: 8.2},
            53: {hp: 11040, atk: 607, def: 276, critRate: 4.1, critDmg: 8.2},
            54: {hp: 11160, atk: 613, def: 279, critRate: 4.1, critDmg: 8.2},
            55: {hp: 11280, atk: 620, def: 282, critRate: 4.1, critDmg: 8.2},
            56: {hp: 11400, atk: 627, def: 285, critRate: 4.1, critDmg: 8.2},
            57: {hp: 11520, atk: 633, def: 288, critRate: 4.1, critDmg: 8.2},
            58: {hp: 11640, atk: 640, def: 291, critRate: 4.1, critDmg: 8.2},
            59: {hp: 11760, atk: 646, def: 294, critRate: 4.1, critDmg: 8.2},
            60: {hp: 11880, atk: 653, def: 297, critRate: 4.1, critDmg: 8.2},
            // Ascend 6
            61: {hp: 12480, atk: 686, def: 312, critRate: 4.4, critDmg: 8.8},
            62: {hp: 12600, atk: 693, def: 315, critRate: 4.4, critDmg: 8.8},
            63: {hp: 12720, atk: 699, def: 318, critRate: 4.4, critDmg: 8.8},
            64: {hp: 12840, atk: 706, def: 321, critRate: 4.4, critDmg: 8.8},
            65: {hp: 12960, atk: 712, def: 324, critRate: 4.4, critDmg: 8.8},
            66: {hp: 13080, atk: 719, def: 327, critRate: 4.4, critDmg: 8.8},
            67: {hp: 13200, atk: 726, def: 330, critRate: 4.4, critDmg: 8.8},
            68: {hp: 13320, atk: 732, def: 333, critRate: 4.4, critDmg: 8.8},
            69: {hp: 13440, atk: 739, def: 336, critRate: 4.4, critDmg: 8.8},
            70: {hp: 13560, atk: 745, def: 339, critRate: 4.4, critDmg: 8.8},
            // Ascend 7
            71: {hp: 14160, atk: 778, def: 354, critRate: 4.7, critDmg: 9.4},
            72: {hp: 14280, atk: 785, def: 357, critRate: 4.7, critDmg: 9.4},
            73: {hp: 14400, atk: 792, def: 360, critRate: 4.7, critDmg: 9.4},
            74: {hp: 14520, atk: 798, def: 363, critRate: 4.7, critDmg: 9.4},
            75: {hp: 14640, atk: 805, def: 366, critRate: 4.7, critDmg: 9.4},
            76: {hp: 14760, atk: 811, def: 369, critRate: 4.7, critDmg: 9.4},
            77: {hp: 14880, atk: 818, def: 372, critRate: 4.7, critDmg: 9.4},
            78: {hp: 15000, atk: 825, def: 375, critRate: 4.7, critDmg: 9.4},
            79: {hp: 15120, atk: 831, def: 378, critRate: 4.7, critDmg: 9.4},
            80: {hp: 15240, atk: 838, def: 381, critRate: 4.7, critDmg: 9.4},
        }
    },
    'HP Memory 0 Rank 4-star': {
        type: 'hp',
        rarity: '4-star',
        baseStats: {
            1: {hp: 1768, atk: 80, def: 40, critRate: 1.7, critDmg: 3.4},
            2: {hp: 1857, atk: 84, def: 42, critRate: 1.7, critDmg: 3.4},
            3: {hp: 1945, atk: 88, def: 44, critRate: 1.7, critDmg: 3.4},
            4: {hp: 2034, atk: 92, def: 46, critRate: 1.7, critDmg: 3.4},
            5: {hp: 2122, atk: 96, def: 48, critRate: 1.7, critDmg: 3.4},
            6: {hp: 2211, atk: 100, def: 50, critRate: 1.7, critDmg: 3.4},
            7: {hp: 2299, atk: 104, def: 52, critRate: 1.7, critDmg: 3.4},
            8: {hp: 2387, atk: 108, def: 54, critRate: 1.7, critDmg: 3.4},
            9: {hp: 2476, atk: 112, def: 56, critRate: 1.7, critDmg: 3.4},
            10: {hp: 2564, atk: 116, def: 58, critRate: 1.7, critDmg: 3.4},
            // Ascend 1
            11: {hp: 3006, atk: 136, def: 68, critRate: 1.9, critDmg: 3.8},
            12: {hp: 3095, atk: 140, def: 70, critRate: 1.9, critDmg: 3.8},
            13: {hp: 3183, atk: 144, def: 72, critRate: 1.9, critDmg: 3.8},
            14: {hp: 3272, atk: 148, def: 74, critRate: 1.9, critDmg: 3.8},
            15: {hp: 3360, atk: 152, def: 76, critRate: 1.9, critDmg: 3.8},
            16: {hp: 3449, atk: 156, def: 78, critRate: 1.9, critDmg: 3.8},
            17: {hp: 3537, atk: 160, def: 80, critRate: 1.9, critDmg: 3.8},
            18: {hp: 3626, atk: 164, def: 82, critRate: 1.9, critDmg: 3.8},
            19: {hp: 3714, atk: 168, def: 84, critRate: 1.9, critDmg: 3.8},
            20: {hp: 3802, atk: 172, def: 86, critRate: 1.9, critDmg: 3.8},
            // Ascend 2
            21: {hp: 4245, atk: 192, def: 96, critRate: 2.1, critDmg: 4.2},
            22: {hp: 4333, atk: 196, def: 98, critRate: 2.1, critDmg: 4.2},
            23: {hp: 4422, atk: 201, def: 100, critRate: 2.1, critDmg: 4.2},
            24: {hp: 4510, atk: 205, def: 102, critRate: 2.1, critDmg: 4.2},
            25: {hp: 4598, atk: 209, def: 104, critRate: 2.1, critDmg: 4.2},
            26: {hp: 4687, atk: 213, def: 106, critRate: 2.1, critDmg: 4.2},
            27: {hp: 4775, atk: 217, def: 108, critRate: 2.1, critDmg: 4.2},
            28: {hp: 4864, atk: 221, def: 110, critRate: 2.1, critDmg: 4.2},
            29: {hp: 4952, atk: 225, def: 112, critRate: 2.1, critDmg: 4.2},
            30: {hp: 5041, atk: 229, def: 114, critRate: 2.1, critDmg: 4.2},
            // Ascend 3
            31: {hp: 5483, atk: 249, def: 124, critRate: 2.3, critDmg: 4.6},
            32: {hp: 5571, atk: 253, def: 126, critRate: 2.3, critDmg: 4.6},
            33: {hp: 5660, atk: 257, def: 128, critRate: 2.3, critDmg: 4.6},
            34: {hp: 5748, atk: 261, def: 130, critRate: 2.3, critDmg: 4.6},
            35: {hp: 5837, atk: 265, def: 132, critRate: 2.3, critDmg: 4.6},
            36: {hp: 5925, atk: 269, def: 134, critRate: 2.3, critDmg: 4.6},
            37: {hp: 6013, atk: 273, def: 136, critRate: 2.3, critDmg: 4.6},
            38: {hp: 6102, atk: 277, def: 138, critRate: 2.3, critDmg: 4.6},
            39: {hp: 6190, atk: 281, def: 140, critRate: 2.3, critDmg: 4.6},
            40: {hp: 6279, atk: 285, def: 142, critRate: 2.3, critDmg: 4.6},
            // Ascend 4
            41: {hp: 6721, atk: 305, def: 152, critRate: 2.5, critDmg: 5.0},
            42: {hp: 6809, atk: 309, def: 154, critRate: 2.5, critDmg: 5.0},
            43: {hp: 6898, atk: 313, def: 156, critRate: 2.5, critDmg: 5.0},
            44: {hp: 6986, atk: 317, def: 158, critRate: 2.5, critDmg: 5.0},
            45: {hp: 7075, atk: 321, def: 160, critRate: 2.5, critDmg: 5.0},
            46: {hp: 7163, atk: 325, def: 162, critRate: 2.5, critDmg: 5.0},
            47: {hp: 7252, atk: 329, def: 164, critRate: 2.5, critDmg: 5.0},
            48: {hp: 7340, atk: 333, def: 166, critRate: 2.5, critDmg: 5.0},
            49: {hp: 7428, atk: 337, def: 168, critRate: 2.5, critDmg: 5.0},
            50: {hp: 7517, atk: 341, def: 170, critRate: 2.5, critDmg: 5.0},
            // Ascend 5
            51: {hp: 7959, atk: 361, def: 180, critRate: 2.7, critDmg: 5.4},
            52: {hp: 8048, atk: 365, def: 182, critRate: 2.7, critDmg: 5.4},
            53: {hp: 8136, atk: 369, def: 184, critRate: 2.7, critDmg: 5.4},
            54: {hp: 8224, atk: 373, def: 186, critRate: 2.7, critDmg: 5.4},
            55: {hp: 8313, atk: 377, def: 188, critRate: 2.7, critDmg: 5.4},
            56: {hp: 8401, atk: 381, def: 190, critRate: 2.7, critDmg: 5.4},
            57: {hp: 8490, atk: 385, def: 192, critRate: 2.7, critDmg: 5.4},
            58: {hp: 8578, atk: 389, def: 194, critRate: 2.7, critDmg: 5.4},
            59: {hp: 8667, atk: 393, def: 196, critRate: 2.7, critDmg: 5.4},
            60: {hp: 8755, atk: 397, def: 198, critRate: 2.7, critDmg: 5.4},
            // Ascend 6
            61: {hp: 9197, atk: 418, def: 209, critRate: 2.9, critDmg: 5.8},
            62: {hp: 9286, atk: 422, def: 211, critRate: 2.9, critDmg: 5.8},
            63: {hp: 9374, atk: 426, def: 213, critRate: 2.9, critDmg: 5.8},
            64: {hp: 9463, atk: 430, def: 215, critRate: 2.9, critDmg: 5.8},
            65: {hp: 9551, atk: 434, def: 217, critRate: 2.9, critDmg: 5.8},
            66: {hp: 9639, atk: 438, def: 219, critRate: 2.9, critDmg: 5.8},
            67: {hp: 9728, atk: 442, def: 221, critRate: 2.9, critDmg: 5.8},
            68: {hp: 9816, atk: 446, def: 223, critRate: 2.9, critDmg: 5.8},
            69: {hp: 9905, atk: 450, def: 225, critRate: 2.9, critDmg: 5.8},
            70: {hp: 9993, atk: 454, def: 227, critRate: 2.9, critDmg: 5.8},
            // Ascend 7
            71: {hp: 10435, atk: 474, def: 237, critRate: 3.1, critDmg: 6.2},
            72: {hp: 10524, atk: 478, def: 239, critRate: 3.1, critDmg: 6.2},
            73: {hp: 10612, atk: 482, def: 241, critRate: 3.1, critDmg: 6.2},
            74: {hp: 10701, atk: 486, def: 243, critRate: 3.1, critDmg: 6.2},
            75: {hp: 10789, atk: 490, def: 245, critRate: 3.1, critDmg: 6.2},
            76: {hp: 10878, atk: 494, def: 247, critRate: 3.1, critDmg: 6.2},
            77: {hp: 10966, atk: 498, def: 249, critRate: 3.1, critDmg: 6.2},
            78: {hp: 11055, atk: 502, def: 251, critRate: 3.1, critDmg: 6.2},
            79: {hp: 11143, atk: 506, def: 253, critRate: 3.1, critDmg: 6.2},
            80: {hp: 11231, atk: 510, def: 255, critRate: 3.1, critDmg: 6.2}
        }
    },
    'ATK Memory 0 Rank 4-star': {
        type: 'atk',
        rarity: '4-star',
        baseStats: {
            1: {hp: 1608, atk: 88, def: 40, critRate: 1.7, critDmg: 3.4},
            2: {hp: 1688, atk: 92, def: 42, critRate: 1.7, critDmg: 3.4},
            3: {hp: 1768, atk: 97, def: 44, critRate: 1.7, critDmg: 3.4},
            4: {hp: 1849, atk: 101, def: 46, critRate: 1.7, critDmg: 3.4},
            5: {hp: 1929, atk: 106, def: 48, critRate: 1.7, critDmg: 3.4},
            6: {hp: 2010, atk: 110, def: 50, critRate: 1.7, critDmg: 3.4},
            7: {hp: 2090, atk: 114, def: 52, critRate: 1.7, critDmg: 3.4},
            8: {hp: 2170, atk: 119, def: 54, critRate: 1.7, critDmg: 3.4},
            9: {hp: 2251, atk: 123, def: 56, critRate: 1.7, critDmg: 3.4},
            10: {hp: 2331, atk: 128, def: 58, critRate: 1.7, critDmg: 3.4},
            // Ascend 1
            11: {hp: 2733, atk: 150, def: 68, critRate: 1.9, critDmg: 3.8},
            12: {hp: 2814, atk: 154, def: 70, critRate: 1.9, critDmg: 3.8},
            13: {hp: 2894, atk: 159, def: 72, critRate: 1.9, critDmg: 3.8},
            14: {hp: 2974, atk: 163, def: 74, critRate: 1.9, critDmg: 3.8},
            15: {hp: 3055, atk: 168, def: 76, critRate: 1.9, critDmg: 3.8},
            16: {hp: 3135, atk: 172, def: 78, critRate: 1.9, critDmg: 3.8},
            17: {hp: 3216, atk: 176, def: 80, critRate: 1.9, critDmg: 3.8},
            18: {hp: 3296, atk: 181, def: 82, critRate: 1.9, critDmg: 3.8},
            19: {hp: 3376, atk: 185, def: 84, critRate: 1.9, critDmg: 3.8},
            20: {hp: 3457, atk: 190, def: 86, critRate: 1.9, critDmg: 3.8},
            // Ascend 2
            21: {hp: 3859, atk: 212, def: 96, critRate: 2.1, critDmg: 4.2},
            22: {hp: 3939, atk: 216, def: 98, critRate: 2.1, critDmg: 4.2},
            23: {hp: 4020, atk: 221, def: 100, critRate: 2.1, critDmg: 4.2},
            24: {hp: 4100, atk: 225, def: 102, critRate: 2.1, critDmg: 4.2},
            25: {hp: 4180, atk: 229, def: 104, critRate: 2.1, critDmg: 4.2},
            26: {hp: 4261, atk: 234, def: 106, critRate: 2.1, critDmg: 4.2},
            27: {hp: 4341, atk: 238, def: 108, critRate: 2.1, critDmg: 4.2},
            28: {hp: 4422, atk: 243, def: 110, critRate: 2.1, critDmg: 4.2},
            29: {hp: 4502, atk: 247, def: 112, critRate: 2.1, critDmg: 4.2},
            30: {hp: 4582, atk: 252, def: 114, critRate: 2.1, critDmg: 4.2},
            // Ascend 3
            31: {hp: 4984, atk: 274, def: 124, critRate: 2.3, critDmg: 4.6},
            32: {hp: 5065, atk: 278, def: 126, critRate: 2.3, critDmg: 4.6},
            33: {hp: 5145, atk: 283, def: 128, critRate: 2.3, critDmg: 4.6},
            34: {hp: 5226, atk: 287, def: 130, critRate: 2.3, critDmg: 4.6},
            35: {hp: 5306, atk: 291, def: 132, critRate: 2.3, critDmg: 4.6},
            36: {hp: 5386, atk: 296, def: 134, critRate: 2.3, critDmg: 4.6},
            37: {hp: 5467, atk: 300, def: 136, critRate: 2.3, critDmg: 4.6},
            38: {hp: 5547, atk: 305, def: 138, critRate: 2.3, critDmg: 4.6},
            39: {hp: 5628, atk: 309, def: 140, critRate: 2.3, critDmg: 4.6},
            40: {hp: 5708, atk: 313, def: 142, critRate: 2.3, critDmg: 4.6},
            // Ascend 4
            41: {hp: 6110, atk: 336, def: 152, critRate: 2.5, critDmg: 5.0},
            42: {hp: 6190, atk: 340, def: 154, critRate: 2.5, critDmg: 5.0},
            43: {hp: 6271, atk: 344, def: 156, critRate: 2.5, critDmg: 5.0},
            44: {hp: 6351, atk: 349, def: 158, critRate: 2.5, critDmg: 5.0},
            45: {hp: 6432, atk: 353, def: 160, critRate: 2.5, critDmg: 5.0},
            46: {hp: 6512, atk: 358, def: 162, critRate: 2.5, critDmg: 5.0},
            47: {hp: 6592, atk: 362, def: 164, critRate: 2.5, critDmg: 5.0},
            48: {hp: 6673, atk: 367, def: 166, critRate: 2.5, critDmg: 5.0},
            49: {hp: 6753, atk: 371, def: 168, critRate: 2.5, critDmg: 5.0},
            50: {hp: 6834, atk: 375, def: 170, critRate: 2.5, critDmg: 5.0},
            // Ascend 5
            51: {hp: 7236, atk: 397, def: 180, critRate: 2.7, critDmg: 5.4},
            52: {hp: 7316, atk: 402, def: 182, critRate: 2.7, critDmg: 5.4},
            53: {hp: 7396, atk: 406, def: 184, critRate: 2.7, critDmg: 5.4},
            54: {hp: 7477, atk: 411, def: 186, critRate: 2.7, critDmg: 5.4},
            55: {hp: 7557, atk: 415, def: 188, critRate: 2.7, critDmg: 5.4},
            56: {hp: 7638, atk: 420, def: 190, critRate: 2.7, critDmg: 5.4},
            57: {hp: 7718, atk: 424, def: 192, critRate: 2.7, critDmg: 5.4},
            58: {hp: 7798, atk: 428, def: 194, critRate: 2.7, critDmg: 5.4},
            59: {hp: 7879, atk: 433, def: 196, critRate: 2.7, critDmg: 5.4},
            60: {hp: 7959, atk: 437, def: 198, critRate: 2.7, critDmg: 5.4},
            // Ascend 6
            61: {hp: 8361, atk: 459, def: 209, critRate: 2.9, critDmg: 5.8},
            62: {hp: 8442, atk: 464, def: 211, critRate: 2.9, critDmg: 5.8},
            63: {hp: 8522, atk: 468, def: 213, critRate: 2.9, critDmg: 5.8},
            64: {hp: 8602, atk: 473, def: 215, critRate: 2.9, critDmg: 5.8},
            65: {hp: 8683, atk: 477, def: 217, critRate: 2.9, critDmg: 5.8},
            66: {hp: 8763, atk: 481, def: 219, critRate: 2.9, critDmg: 5.8},
            67: {hp: 8844, atk: 486, def: 221, critRate: 2.9, critDmg: 5.8},
            68: {hp: 8924, atk: 490, def: 223, critRate: 2.9, critDmg: 5.8},
            69: {hp: 9004, atk: 495, def: 225, critRate: 2.9, critDmg: 5.8},
            70: {hp: 9085, atk: 499, def: 227, critRate: 2.9, critDmg: 5.8},
            // Ascend 7
            71: {hp: 9487, atk: 521, def: 237, critRate: 3.1, critDmg: 6.2},
            72: {hp: 9567, atk: 526, def: 239, critRate: 3.1, critDmg: 6.2},
            73: {hp: 9648, atk: 530, def: 241, critRate: 3.1, critDmg: 6.2},
            74: {hp: 9728, atk: 535, def: 243, critRate: 3.1, critDmg: 6.2},
            75: {hp: 9808, atk: 539, def: 245, critRate: 3.1, critDmg: 6.2},
            76: {hp: 9889, atk: 543, def: 247, critRate: 3.1, critDmg: 6.2},
            77: {hp: 9969, atk: 548, def: 249, critRate: 3.1, critDmg: 6.2},
            78: {hp: 10050, atk: 552, def: 251, critRate: 3.1, critDmg: 6.2},
            79: {hp: 10130, atk: 557, def: 253, critRate: 3.1, critDmg: 6.2},
            80: {hp: 10210, atk: 561, def: 255, critRate: 3.1, critDmg: 6.2},
        }
    },
    'DEF Memory 0 Rank 4-star': {
        type: 'def',
        rarity: '4-star',
        baseStats: {
            1: {hp: 1608, atk: 80, def: 44, critRate: 1.7, critDmg: 3.4},
            2: {hp: 1688, atk: 84, def: 46, critRate: 1.7, critDmg: 3.4},
            3: {hp: 1768, atk: 88, def: 48, critRate: 1.7, critDmg: 3.4},
            4: {hp: 1849, atk: 92, def: 50, critRate: 1.7, critDmg: 3.4},
            5: {hp: 1929, atk: 96, def: 53, critRate: 1.7, critDmg: 3.4},
            6: {hp: 2010, atk: 100, def: 55, critRate: 1.7, critDmg: 3.4},
            7: {hp: 2090, atk: 104, def: 57, critRate: 1.7, critDmg: 3.4},
            8: {hp: 2170, atk: 108, def: 59, critRate: 1.7, critDmg: 3.4},
            9: {hp: 2251, atk: 112, def: 61, critRate: 1.7, critDmg: 3.4},
            10: {hp: 2331, atk: 116, def: 64, critRate: 1.7, critDmg: 3.4},
            // Ascend 1
            11: {hp: 2733, atk: 136, def: 75, critRate: 1.9, critDmg: 3.8},
            12: {hp: 2814, atk: 140, def: 77, critRate: 1.9, critDmg: 3.8},
            13: {hp: 2894, atk: 144, def: 79, critRate: 1.9, critDmg: 3.8},
            14: {hp: 2974, atk: 148, def: 81, critRate: 1.9, critDmg: 3.8},
            15: {hp: 3055, atk: 152, def: 84, critRate: 1.9, critDmg: 3.8},
            16: {hp: 3135, atk: 156, def: 86, critRate: 1.9, critDmg: 3.8},
            17: {hp: 3216, atk: 160, def: 88, critRate: 1.9, critDmg: 3.8},
            18: {hp: 3296, atk: 164, def: 90, critRate: 1.9, critDmg: 3.8},
            19: {hp: 3376, atk: 168, def: 92, critRate: 1.9, critDmg: 3.8},
            20: {hp: 3457, atk: 172, def: 95, critRate: 1.9, critDmg: 3.8},
            // Ascend 2
            21: {hp: 3859, atk: 192, def: 106, critRate: 2.1, critDmg: 4.2},
            22: {hp: 3939, atk: 196, def: 108, critRate: 2.1, critDmg: 4.2},
            23: {hp: 4020, atk: 201, def: 110, critRate: 2.1, critDmg: 4.2},
            24: {hp: 4100, atk: 205, def: 112, critRate: 2.1, critDmg: 4.2},
            25: {hp: 4180, atk: 209, def: 114, critRate: 2.1, critDmg: 4.2},
            26: {hp: 4261, atk: 213, def: 117, critRate: 2.1, critDmg: 4.2},
            27: {hp: 4341, atk: 217, def: 119, critRate: 2.1, critDmg: 4.2},
            28: {hp: 4422, atk: 221, def: 121, critRate: 2.1, critDmg: 4.2},
            29: {hp: 4502, atk: 225, def: 123, critRate: 2.1, critDmg: 4.2},
            30: {hp: 4582, atk: 229, def: 126, critRate: 2.1, critDmg: 4.2},
            // Ascend 3
            31: {hp: 4984, atk: 249, def: 137, critRate: 2.3, critDmg: 4.6},
            32: {hp: 5065, atk: 253, def: 139, critRate: 2.3, critDmg: 4.6},
            33: {hp: 5145, atk: 257, def: 141, critRate: 2.3, critDmg: 4.6},
            34: {hp: 5226, atk: 261, def: 143, critRate: 2.3, critDmg: 4.6},
            35: {hp: 5306, atk: 265, def: 145, critRate: 2.3, critDmg: 4.6},
            36: {hp: 5386, atk: 269, def: 148, critRate: 2.3, critDmg: 4.6},
            37: {hp: 5467, atk: 273, def: 150, critRate: 2.3, critDmg: 4.6},
            38: {hp: 5547, atk: 277, def: 152, critRate: 2.3, critDmg: 4.6},
            39: {hp: 5628, atk: 281, def: 154, critRate: 2.3, critDmg: 4.6},
            40: {hp: 5708, atk: 285, def: 156, critRate: 2.3, critDmg: 4.6},
            // Ascend 4
            41: {hp: 6110, atk: 305, def: 168, critRate: 2.5, critDmg: 5.0},
            42: {hp: 6190, atk: 309, def: 170, critRate: 2.5, critDmg: 5.0},
            43: {hp: 6271, atk: 313, def: 172, critRate: 2.5, critDmg: 5.0},
            44: {hp: 6351, atk: 317, def: 174, critRate: 2.5, critDmg: 5.0},
            45: {hp: 6432, atk: 321, def: 176, critRate: 2.5, critDmg: 5.0},
            46: {hp: 6512, atk: 325, def: 179, critRate: 2.5, critDmg: 5.0},
            47: {hp: 6592, atk: 329, def: 181, critRate: 2.5, critDmg: 5.0},
            48: {hp: 6673, atk: 333, def: 183, critRate: 2.5, critDmg: 5.0},
            49: {hp: 6753, atk: 337, def: 185, critRate: 2.5, critDmg: 5.0},
            50: {hp: 6834, atk: 341, def: 187, critRate: 2.5, critDmg: 5.0},
            // Ascend 5
            51: {hp: 7236, atk: 361, def: 198, critRate: 2.7, critDmg: 5.4},
            52: {hp: 7316, atk: 365, def: 201, critRate: 2.7, critDmg: 5.4},
            53: {hp: 7396, atk: 369, def: 203, critRate: 2.7, critDmg: 5.4},
            54: {hp: 7477, atk: 373, def: 205, critRate: 2.7, critDmg: 5.4},
            55: {hp: 7557, atk: 377, def: 207, critRate: 2.7, critDmg: 5.4},
            56: {hp: 7638, atk: 381, def: 210, critRate: 2.7, critDmg: 5.4},
            57: {hp: 7718, atk: 385, def: 212, critRate: 2.7, critDmg: 5.4},
            58: {hp: 7798, atk: 389, def: 214, critRate: 2.7, critDmg: 5.4},
            59: {hp: 7879, atk: 393, def: 216, critRate: 2.7, critDmg: 5.4},
            60: {hp: 7959, atk: 397, def: 218, critRate: 2.7, critDmg: 5.4},
            // Ascend 6
            61: {hp: 8361, atk: 418, def: 229, critRate: 2.9, critDmg: 5.8},
            62: {hp: 8442, atk: 422, def: 232, critRate: 2.9, critDmg: 5.8},
            63: {hp: 8522, atk: 426, def: 234, critRate: 2.9, critDmg: 5.8},
            64: {hp: 8602, atk: 430, def: 236, critRate: 2.9, critDmg: 5.8},
            65: {hp: 8683, atk: 434, def: 238, critRate: 2.9, critDmg: 5.8},
            66: {hp: 8763, atk: 438, def: 240, critRate: 2.9, critDmg: 5.8},
            67: {hp: 8844, atk: 442, def: 243, critRate: 2.9, critDmg: 5.8},
            68: {hp: 8924, atk: 446, def: 245, critRate: 2.9, critDmg: 5.8},
            69: {hp: 9004, atk: 450, def: 247, critRate: 2.9, critDmg: 5.8},
            70: {hp: 9085, atk: 454, def: 249, critRate: 2.9, critDmg: 5.8},
            // Ascend 7
            71: {hp: 9487, atk: 474, def: 260, critRate: 3.1, critDmg: 6.2},
            72: {hp: 9567, atk: 478, def: 263, critRate: 3.1, critDmg: 6.2},
            73: {hp: 9648, atk: 482, def: 265, critRate: 3.1, critDmg: 6.2},
            74: {hp: 9728, atk: 486, def: 267, critRate: 3.1, critDmg: 6.2},
            75: {hp: 9808, atk: 490, def: 269, critRate: 3.1, critDmg: 6.2},
            76: {hp: 9889, atk: 494, def: 271, critRate: 3.1, critDmg: 6.2},
            77: {hp: 9969, atk: 498, def: 274, critRate: 3.1, critDmg: 6.2},
            78: {hp: 10050, atk: 502, def: 276, critRate: 3.1, critDmg: 6.2},
            79: {hp: 10130, atk: 506, def: 278, critRate: 3.1, critDmg: 6.2},
            80: {hp: 10210, atk: 510, def: 280, critRate: 3.1, critDmg: 6.2}
        }
    },
    'HP Memory 0 Rank 3-star': {
        type: 'hp',
        rarity: '3-star',
        baseStats: {
            1: {hp: 1108, atk: 50, def: 25, critRate: 1.0, critDmg: 2.1},
            2: {hp: 1164, atk: 52, def: 26, critRate: 1.0, critDmg: 2.1},
            3: {hp: 1219, atk: 55, def: 27, critRate: 1.0, critDmg: 2.1},
            4: {hp: 1275, atk: 57, def: 28, critRate: 1.0, critDmg: 2.1},
            5: {hp: 1330, atk: 60, def: 30, critRate: 1.0, critDmg: 2.1},
            6: {hp: 1386, atk: 63, def: 31, critRate: 1.0, critDmg: 2.1},
            7: {hp: 1441, atk: 65, def: 32, critRate: 1.0, critDmg: 2.1},
            8: {hp: 1496, atk: 68, def: 34, critRate: 1.0, critDmg: 2.1},
            9: {hp: 1552, atk: 70, def: 35, critRate: 1.0, critDmg: 2.1},
            10: {hp: 1607, atk: 73, def: 36, critRate: 1.0, critDmg: 2.1},
            11: {hp: 1884, atk: 85, def: 42, critRate: 1.2, critDmg: 2.4},
            12: {hp: 1940, atk: 88, def: 44, critRate: 1.2, critDmg: 2.4},
            13: {hp: 1995, atk: 90, def: 45, critRate: 1.2, critDmg: 2.4},
            14: {hp: 2051, atk: 93, def: 46, critRate: 1.2, critDmg: 2.4},
            15: {hp: 2106, atk: 95, def: 47, critRate: 1.2, critDmg: 2.4},
            16: {hp: 2162, atk: 98, def: 49, critRate: 1.2, critDmg: 2.4},
            17: {hp: 2217, atk: 100, def: 50, critRate: 1.2, critDmg: 2.4},
            18: {hp: 2273, atk: 103, def: 51, critRate: 1.2, critDmg: 2.4},
            19: {hp: 2328, atk: 105, def: 52, critRate: 1.2, critDmg: 2.4},
            20: {hp: 2383, atk: 108, def: 54, critRate: 1.2, critDmg: 2.4},
            21: {hp: 2661, atk: 120, def: 60, critRate: 1.3, critDmg: 2.6},
            22: {hp: 2716, atk: 123, def: 61, critRate: 1.3, critDmg: 2.6},
            23: {hp: 2772, atk: 125, def: 62, critRate: 1.3, critDmg: 2.6},
            24: {hp: 2827, atk: 128, def: 64, critRate: 1.3, critDmg: 2.6},
            25: {hp: 2882, atk: 131, def: 65, critRate: 1.3, critDmg: 2.6},
            26: {hp: 2938, atk: 133, def: 66, critRate: 1.3, critDmg: 2.6},
            27: {hp: 2993, atk: 136, def: 68, critRate: 1.3, critDmg: 2.6},
            28: {hp: 3049, atk: 138, def: 69, critRate: 1.3, critDmg: 2.6},
            29: {hp: 3104, atk: 141, def: 70, critRate: 1.3, critDmg: 2.6},
            30: {hp: 3160, atk: 143, def: 71, critRate: 1.3, critDmg: 2.6},
            31: {hp: 3437, atk: 156, def: 78, critRate: 1.4, critDmg: 2.9},
            32: {hp: 3492, atk: 158, def: 79, critRate: 1.4, critDmg: 2.9},
            33: {hp: 3548, atk: 161, def: 80, critRate: 1.4, critDmg: 2.9},
            34: {hp: 3603, atk: 163, def: 81, critRate: 1.4, critDmg: 2.9},
            35: {hp: 3659, atk: 166, def: 83, critRate: 1.4, critDmg: 2.9},
            36: {hp: 3714, atk: 168, def: 84, critRate: 1.4, critDmg: 2.9},
            37: {hp: 3769, atk: 171, def: 85, critRate: 1.4, critDmg: 2.9},
            38: {hp: 3825, atk: 173, def: 86, critRate: 1.4, critDmg: 2.9},
            39: {hp: 3880, atk: 176, def: 88, critRate: 1.4, critDmg: 2.9},
            40: {hp: 3936, atk: 178, def: 89, critRate: 1.4, critDmg: 2.9},
            41: {hp: 4213, atk: 191, def: 95, critRate: 1.5, critDmg: 3.1},
            42: {hp: 4268, atk: 194, def: 97, critRate: 1.5, critDmg: 3.1},
            43: {hp: 4324, atk: 196, def: 98, critRate: 1.5, critDmg: 3.1},
            44: {hp: 4379, atk: 199, def: 99, critRate: 1.5, critDmg: 3.1},
            45: {hp: 4435, atk: 201, def: 100, critRate: 1.5, critDmg: 3.1},
            46: {hp: 4490, atk: 204, def: 102, critRate: 1.5, critDmg: 3.1},
            47: {hp: 4546, atk: 206, def: 103, critRate: 1.5, critDmg: 3.1},
            48: {hp: 4601, atk: 209, def: 104, critRate: 1.5, critDmg: 3.1},
            49: {hp: 4656, atk: 211, def: 105, critRate: 1.5, critDmg: 3.1},
            50: {hp: 4712, atk: 214, def: 107, critRate: 1.5, critDmg: 3.1},
            51: {hp: 4989, atk: 226, def: 113, critRate: 1.7, critDmg: 3.4},
            52: {hp: 5045, atk: 229, def: 114, critRate: 1.7, critDmg: 3.4},
            53: {hp: 5100, atk: 231, def: 115, critRate: 1.7, critDmg: 3.4},
            54: {hp: 5155, atk: 234, def: 117, critRate: 1.7, critDmg: 3.4},
            55: {hp: 5211, atk: 236, def: 118, critRate: 1.7, critDmg: 3.4},
            56: {hp: 5266, atk: 239, def: 119, critRate: 1.7, critDmg: 3.4},
            57: {hp: 5322, atk: 241, def: 120, critRate: 1.7, critDmg: 3.4},
            58: {hp: 5377, atk: 244, def: 122, critRate: 1.7, critDmg: 3.4},
            59: {hp: 5433, atk: 246, def: 123, critRate: 1.7, critDmg: 3.4},
            60: {hp: 5488, atk: 249, def: 124, critRate: 1.7, critDmg: 3.4},
            61: {hp: 5765, atk: 262, def: 131, critRate: 1.8, critDmg: 3.6},
            62: {hp: 5821, atk: 264, def: 132, critRate: 1.8, critDmg: 3.6},
            63: {hp: 5876, atk: 267, def: 133, critRate: 1.8, critDmg: 3.6},
            64: {hp: 5932, atk: 269, def: 134, critRate: 1.8, critDmg: 3.6},
            65: {hp: 5987, atk: 272, def: 136, critRate: 1.8, critDmg: 3.6},
            66: {hp: 6042, atk: 274, def: 137, critRate: 1.8, critDmg: 3.6},
            67: {hp: 6098, atk: 277, def: 138, critRate: 1.8, critDmg: 3.6},
            68: {hp: 6153, atk: 279, def: 139, critRate: 1.8, critDmg: 3.6},
            69: {hp: 6209, atk: 282, def: 141, critRate: 1.8, critDmg: 3.6},
            70: {hp: 6264, atk: 284, def: 142, critRate: 1.8, critDmg: 3.6},
            71: {hp: 6541, atk: 297, def: 148, critRate: 1.9, critDmg: 3.8},
            72: {hp: 6597, atk: 299, def: 149, critRate: 1.9, critDmg: 3.8},
            73: {hp: 6652, atk: 302, def: 151, critRate: 1.9, critDmg: 3.8},
            74: {hp: 6708, atk: 304, def: 152, critRate: 1.9, critDmg: 3.8},
            75: {hp: 6763, atk: 307, def: 153, critRate: 1.9, critDmg: 3.8},
            76: {hp: 6819, atk: 309, def: 154, critRate: 1.9, critDmg: 3.8},
            77: {hp: 6874, atk: 312, def: 156, critRate: 1.9, critDmg: 3.8},
            78: {hp: 6930, atk: 315, def: 157, critRate: 1.9, critDmg: 3.8},
            79: {hp: 6985, atk: 317, def: 158, critRate: 1.9, critDmg: 3.8},
            80: {hp: 7040, atk: 320, def: 160, critRate: 1.9, critDmg: 3.8},
        }
    },
    'ATK Memory 0 Rank 3-star': {
        type: 'atk',
        rarity: '3-star',
        baseStats: {
            1: {hp: 1008, atk: 55, def: 25, critRate: 1.0, critDmg: 2.1},
            2: {hp: 1058, atk: 58, def: 26, critRate: 1.0, critDmg: 2.1},
            3: {hp: 1108, atk: 60, def: 27, critRate: 1.0, critDmg: 2.1},
            4: {hp: 1159, atk: 63, def: 28, critRate: 1.0, critDmg: 2.1},
            5: {hp: 1209, atk: 66, def: 30, critRate: 1.0, critDmg: 2.1},
            6: {hp: 1260, atk: 69, def: 31, critRate: 1.0, critDmg: 2.1},
            7: {hp: 1310, atk: 72, def: 32, critRate: 1.0, critDmg: 2.1},
            8: {hp: 1360, atk: 74, def: 34, critRate: 1.0, critDmg: 2.1},
            9: {hp: 1411, atk: 77, def: 35, critRate: 1.0, critDmg: 2.1},
            10: {hp: 1461, atk: 80, def: 36, critRate: 1.0, critDmg: 2.1},
            11: {hp: 1713, atk: 94, def: 42, critRate: 1.2, critDmg: 2.4},
            12: {hp: 1763, atk: 97, def: 44, critRate: 1.2, critDmg: 2.4},
            13: {hp: 1814, atk: 99, def: 45, critRate: 1.2, critDmg: 2.4},
            14: {hp: 1864, atk: 102, def: 46, critRate: 1.2, critDmg: 2.4},
            15: {hp: 1915, atk: 105, def: 47, critRate: 1.2, critDmg: 2.4},
            16: {hp: 1965, atk: 108, def: 49, critRate: 1.2, critDmg: 2.4},
            17: {hp: 2015, atk: 110, def: 50, critRate: 1.2, critDmg: 2.4},
            18: {hp: 2066, atk: 113, def: 51, critRate: 1.2, critDmg: 2.4},
            19: {hp: 2116, atk: 116, def: 52, critRate: 1.2, critDmg: 2.4},
            20: {hp: 2167, atk: 119, def: 54, critRate: 1.2, critDmg: 2.4},
            21: {hp: 2419, atk: 133, def: 60, critRate: 1.3, critDmg: 2.6},
            22: {hp: 2469, atk: 135, def: 61, critRate: 1.3, critDmg: 2.6},
            23: {hp: 2519, atk: 138, def: 62, critRate: 1.3, critDmg: 2.6},
            24: {hp: 2570, atk: 141, def: 64, critRate: 1.3, critDmg: 2.6},
            25: {hp: 2620, atk: 144, def: 65, critRate: 1.3, critDmg: 2.6},
            26: {hp: 2671, atk: 146, def: 66, critRate: 1.3, critDmg: 2.6},
            27: {hp: 2721, atk: 149, def: 68, critRate: 1.3, critDmg: 2.6},
            28: {hp: 2771, atk: 152, def: 69, critRate: 1.3, critDmg: 2.6},
            29: {hp: 2822, atk: 155, def: 70, critRate: 1.3, critDmg: 2.6},
            30: {hp: 2872, atk: 158, def: 71, critRate: 1.3, critDmg: 2.6},
            31: {hp: 3214, atk: 171, def: 78, critRate: 1.4, critDmg: 2.9},
            32: {hp: 3175, atk: 174, def: 79, critRate: 1.4, critDmg: 2.9},
            33: {hp: 3225, atk: 177, def: 80, critRate: 1.4, critDmg: 2.9},
            34: {hp: 3276, atk: 180, def: 81, critRate: 1.4, critDmg: 2.9},
            35: {hp: 3326, atk: 182, def: 83, critRate: 1.4, critDmg: 2.9},
            36: {hp: 3376, atk: 185, def: 84, critRate: 1.4, critDmg: 2.9},
            37: {hp: 3427, atk: 188, def: 85, critRate: 1.4, critDmg: 2.9},
            38: {hp: 3477, atk: 191, def: 86, critRate: 1.4, critDmg: 2.9},
            39: {hp: 3528, atk: 194, def: 88, critRate: 1.4, critDmg: 2.9},
            40: {hp: 3578, atk: 196, def: 89, critRate: 1.4, critDmg: 2.9},
            41: {hp: 3830, atk: 210, def: 95, critRate: 1.5, critDmg: 3.1},
            42: {hp: 3880, atk: 213, def: 97, critRate: 1.5, critDmg: 3.1},
            43: {hp: 3931, atk: 216, def: 98, critRate: 1.5, critDmg: 3.1},
            44: {hp: 3981, atk: 218, def: 99, critRate: 1.5, critDmg: 3.1},
            45: {hp: 4032, atk: 221, def: 100, critRate: 1.5, critDmg: 3.1},
            46: {hp: 4082, atk: 224, def: 102, critRate: 1.5, critDmg: 3.1},
            47: {hp: 4132, atk: 227, def: 103, critRate: 1.5, critDmg: 3.1},
            48: {hp: 4183, atk: 230, def: 104, critRate: 1.5, critDmg: 3.1},
            49: {hp: 4233, atk: 232, def: 105, critRate: 1.5, critDmg: 3.1},
            50: {hp: 4284, atk: 235, def: 107, critRate: 1.5, critDmg: 3.1},
            51: {hp: 4536, atk: 249, def: 113, critRate: 1.7, critDmg: 3.4},
            52: {hp: 4586, atk: 252, def: 114, critRate: 1.7, critDmg: 3.4},
            53: {hp: 4636, atk: 255, def: 115, critRate: 1.7, critDmg: 3.4},
            54: {hp: 4687, atk: 257, def: 117, critRate: 1.7, critDmg: 3.4},
            55: {hp: 4737, atk: 260, def: 118, critRate: 1.7, critDmg: 3.4},
            56: {hp: 4788, atk: 263, def: 119, critRate: 1.7, critDmg: 3.4},
            57: {hp: 4838, atk: 266, def: 120, critRate: 1.7, critDmg: 3.4},
            58: {hp: 4888, atk: 268, def: 122, critRate: 1.7, critDmg: 3.4},
            59: {hp: 4939, atk: 271, def: 123, critRate: 1.7, critDmg: 3.4},
            60: {hp: 4989, atk: 274, def: 124, critRate: 1.7, critDmg: 3.4},
            61: {hp: 5241, atk: 288, def: 131, critRate: 1.8, critDmg: 3.6},
            62: {hp: 5292, atk: 291, def: 132, critRate: 1.8, critDmg: 3.6},
            63: {hp: 5342, atk: 293, def: 133, critRate: 1.8, critDmg: 3.6},
            64: {hp: 5392, atk: 296, def: 134, critRate: 1.8, critDmg: 3.6},
            65: {hp: 5443, atk: 299, def: 136, critRate: 1.8, critDmg: 3.6},
            66: {hp: 5493, atk: 302, def: 137, critRate: 1.8, critDmg: 3.6},
            67: {hp: 5544, atk: 304, def: 138, critRate: 1.8, critDmg: 3.6},
            68: {hp: 5594, atk: 307, def: 139, critRate: 1.8, critDmg: 3.6},
            69: {hp: 5644, atk: 310, def: 141, critRate: 1.8, critDmg: 3.6},
            70: {hp: 5695, atk: 313, def: 142, critRate: 1.8, critDmg: 3.6},
            71: {hp: 5947, atk: 327, def: 148, critRate: 1.9, critDmg: 3.8},
            72: {hp: 5997, atk: 329, def: 149, critRate: 1.9, critDmg: 3.8},
            73: {hp: 6048, atk: 332, def: 151, critRate: 1.9, critDmg: 3.8},
            74: {hp: 6098, atk: 335, def: 152, critRate: 1.9, critDmg: 3.8},
            75: {hp: 6148, atk: 338, def: 153, critRate: 1.9, critDmg: 3.8},
            76: {hp: 6199, atk: 340, def: 154, critRate: 1.9, critDmg: 3.8},
            77: {hp: 6249, atk: 343, def: 156, critRate: 1.9, critDmg: 3.8},
            78: {hp: 6300, atk: 346, def: 157, critRate: 1.9, critDmg: 3.8},
            79: {hp: 6350, atk: 349, def: 158, critRate: 1.9, critDmg: 3.8},
            80: {hp: 6400, atk: 352, def: 160, critRate: 1.9, critDmg: 3.8},
        }
    },
    'DEF Memory 0 Rank 3-star': {
        type: 'def',
        rarity: '3-star',
        baseStats: {
            1: { hp: 1008, atk: 50, def: 27, critRate: 1.0, critDmg: 2.1 },
            2: { hp: 1058, atk: 52, def: 29, critRate: 1.0, critDmg: 2.1 },
            3: { hp: 1108, atk: 55, def: 30, critRate: 1.0, critDmg: 2.1 },
            4: { hp: 1159, atk: 57, def: 31, critRate: 1.0, critDmg: 2.1 },
            5: { hp: 1209, atk: 60, def: 33, critRate: 1.0, critDmg: 2.1 },
            6: { hp: 1260, atk: 63, def: 34, critRate: 1.0, critDmg: 2.1 },
            7: { hp: 1310, atk: 65, def: 36, critRate: 1.0, critDmg: 2.1 },
            8: { hp: 1360, atk: 68, def: 37, critRate: 1.0, critDmg: 2.1 },
            9: { hp: 1411, atk: 70, def: 38, critRate: 1.0, critDmg: 2.1 },
            10: { hp: 1461, atk: 73, def: 40, critRate: 1.0, critDmg: 2.1 },
            // Ascend 1
            11: { hp: 1713, atk: 85, def: 47, critRate: 1.2, critDmg: 2.4 },
            12: { hp: 1763, atk: 88, def: 48, critRate: 1.2, critDmg: 2.4 },
            13: { hp: 1814, atk: 90, def: 49, critRate: 1.2, critDmg: 2.4 },
            14: { hp: 1864, atk: 93, def: 51, critRate: 1.2, critDmg: 2.4 },
            15: { hp: 1915, atk: 95, def: 52, critRate: 1.2, critDmg: 2.4 },
            16: { hp: 1965, atk: 98, def: 54, critRate: 1.2, critDmg: 2.4 },
            17: { hp: 2015, atk: 100, def: 55, critRate: 1.2, critDmg: 2.4 },
            18: { hp: 2066, atk: 103, def: 56, critRate: 1.2, critDmg: 2.4 },
            19: { hp: 2116, atk: 105, def: 58, critRate: 1.2, critDmg: 2.4 },
            20: { hp: 2167, atk: 108, def: 59, critRate: 1.2, critDmg: 2.4 },
            // Ascend 2
            21: { hp: 2419, atk: 120, def: 66, critRate: 1.3, critDmg: 2.6 },
            22: { hp: 2469, atk: 123, def: 67, critRate: 1.3, critDmg: 2.6 },
            23: { hp: 2519, atk: 125, def: 69, critRate: 1.3, critDmg: 2.6 },
            24: { hp: 2570, atk: 128, def: 70, critRate: 1.3, critDmg: 2.6 },
            25: { hp: 2620, atk: 131, def: 72, critRate: 1.3, critDmg: 2.6 },
            26: { hp: 2671, atk: 133, def: 73, critRate: 1.3, critDmg: 2.6 },
            27: { hp: 2721, atk: 136, def: 74, critRate: 1.3, critDmg: 2.6 },
            28: { hp: 2771, atk: 138, def: 76, critRate: 1.3, critDmg: 2.6 },
            29: { hp: 2822, atk: 141, def: 77, critRate: 1.3, critDmg: 2.6 },
            30: { hp: 2872, atk: 143, def: 79, critRate: 1.3, critDmg: 2.6 },
            // Ascend 3
            31: { hp: 3124, atk: 156, def: 85, critRate: 1.4, critDmg: 2.9 },
            32: { hp: 3175, atk: 158, def: 87, critRate: 1.4, critDmg: 2.9 },
            33: { hp: 3225, atk: 161, def: 88, critRate: 1.4, critDmg: 2.9 },
            34: { hp: 3276, atk: 163, def: 90, critRate: 1.4, critDmg: 2.9 },
            35: { hp: 3326, atk: 166, def: 91, critRate: 1.4, critDmg: 2.9 },
            36: { hp: 3376, atk: 168, def: 92, critRate: 1.4, critDmg: 2.9 },
            37: { hp: 3427, atk: 171, def: 94, critRate: 1.4, critDmg: 2.9 },
            38: { hp: 3477, atk: 173, def: 95, critRate: 1.4, critDmg: 2.9 },
            39: { hp: 3528, atk: 176, def: 97, critRate: 1.4, critDmg: 2.9 },
            40: { hp: 3578, atk: 178, def: 98, critRate: 1.4, critDmg: 2.9 },
            // Ascend 4
            41: { hp: 3830, atk: 191, def: 105, critRate: 1.5, critDmg: 3.1 },
            42: { hp: 3880, atk: 194, def: 106, critRate: 1.5, critDmg: 3.1 },
            43: { hp: 3931, atk: 196, def: 108, critRate: 1.5, critDmg: 3.1 },
            44: { hp: 3981, atk: 199, def: 109, critRate: 1.5, critDmg: 3.1 },
            45: { hp: 4032, atk: 201, def: 110, critRate: 1.5, critDmg: 3.1 },
            46: { hp: 4082, atk: 204, def: 112, critRate: 1.5, critDmg: 3.1 },
            47: { hp: 4132, atk: 206, def: 113, critRate: 1.5, critDmg: 3.1 },
            48: { hp: 4183, atk: 209, def: 115, critRate: 1.5, critDmg: 3.1 },
            49: { hp: 4233, atk: 211, def: 116, critRate: 1.5, critDmg: 3.1 },
            50: { hp: 4284, atk: 214, def: 117, critRate: 1.5, critDmg: 3.1 },
            // Ascend 5
            51: { hp: 4536, atk: 226, def: 124, critRate: 1.7, critDmg: 3.4 },
            52: { hp: 4586, atk: 229, def: 126, critRate: 1.7, critDmg: 3.4 },
            53: { hp: 4636, atk: 231, def: 127, critRate: 1.7, critDmg: 3.4 },
            54: { hp: 4687, atk: 234, def: 128, critRate: 1.7, critDmg: 3.4 },
            55: { hp: 4737, atk: 236, def: 130, critRate: 1.7, critDmg: 3.4 },
            56: { hp: 4788, atk: 239, def: 131, critRate: 1.7, critDmg: 3.4 },
            57: { hp: 4838, atk: 241, def: 133, critRate: 1.7, critDmg: 3.4 },
            58: { hp: 4888, atk: 244, def: 134, critRate: 1.7, critDmg: 3.4 },
            59: { hp: 4939, atk: 246, def: 135, critRate: 1.7, critDmg: 3.4 },
            60: { hp: 4989, atk: 249, def: 137, critRate: 1.7, critDmg: 3.4 },
            // Ascend 6
            61: { hp: 5241, atk: 262, def: 144, critRate: 1.8, critDmg: 3.6 },
            62: { hp: 5292, atk: 264, def: 145, critRate: 1.8, critDmg: 3.6 },
            63: { hp: 5342, atk: 267, def: 146, critRate: 1.8, critDmg: 3.6 },
            64: { hp: 5392, atk: 269, def: 148, critRate: 1.8, critDmg: 3.6 },
            65: { hp: 5443, atk: 272, def: 149, critRate: 1.8, critDmg: 3.6 },
            66: { hp: 5493, atk: 274, def: 151, critRate: 1.8, critDmg: 3.6 },
            67: { hp: 5544, atk: 277, def: 152, critRate: 1.8, critDmg: 3.6 },
            68: { hp: 5594, atk: 279, def: 153, critRate: 1.8, critDmg: 3.6 },
            69: { hp: 5644, atk: 282, def: 155, critRate: 1.8, critDmg: 3.6 },
            70: { hp: 5695, atk: 284, def: 156, critRate: 1.8, critDmg: 3.6 },
            // Ascend 7
            71: { hp: 5947, atk: 297, def: 163, critRate: 1.9, critDmg: 3.8 },
            72: { hp: 5997, atk: 299, def: 164, critRate: 1.9, critDmg: 3.8 },
            73: { hp: 6048, atk: 302, def: 166, critRate: 1.9, critDmg: 3.8 },
            74: { hp: 6098, atk: 304, def: 167, critRate: 1.9, critDmg: 3.8 },
            75: { hp: 6148, atk: 307, def: 169, critRate: 1.9, critDmg: 3.8 },
            76: { hp: 6199, atk: 309, def: 170, critRate: 1.9, critDmg: 3.8 },
            77: { hp: 6249, atk: 312, def: 171, critRate: 1.9, critDmg: 3.8 },
            78: { hp: 6300, atk: 315, def: 173, critRate: 1.9, critDmg: 3.8 },
            79: { hp: 6350, atk: 317, def: 174, critRate: 1.9, critDmg: 3.8 },
            80: { hp: 6400, atk: 320, def: 176, critRate: 1.9, critDmg: 3.8 }
        }
    }
};

export const ascendData5star = {
    // Для каждого типа памяти и уровня возвышения
    hp: {
        10: {hp: 4356, atk: 198, def: 99, critRate: 2.9, critDmg: 5.8},
        20: {hp: 6204, atk: 282, def: 141, critRate: 3.2, critDmg: 6.4},
        30: {hp: 8052, atk: 366, def: 183, critRate: 3.5, critDmg: 7},
        40: {hp: 9900, atk: 450, def: 225, critRate: 3.8, critDmg: 7.6},
        50: {hp: 11748, atk: 534, def: 267, critRate: 4.1, critDmg: 8.2},
        60: {hp: 13596, atk: 618, def: 309, critRate: 4.4, critDmg: 8.8},
        70: {hp: 15444, atk: 702, def: 351, critRate: 4.7, critDmg: 9.4},
        80: {hp: 18084, atk: 822, def: 411, critRate: 5.5, critDmg: 11} // Awaken
    },
    def: {
        10: {hp: 3960, atk: 198, def: 108, critRate: 2.9, critDmg: 5.8},
        20: {hp: 5640, atk: 282, def: 155, critRate: 3.2, critDmg: 6.4},
        30: {hp: 7320, atk: 366, def: 201, critRate: 3.5, critDmg: 7},
        40: {hp: 9000, atk: 450, def: 247, critRate: 3.8, critDmg: 7.6},
        50: {hp: 10680, atk: 534, def: 293, critRate: 4.1, critDmg: 8.2},
        60: {hp: 12360, atk: 618, def: 339, critRate: 4.4, critDmg: 8.8},
        70: {hp: 14040, atk: 702, def: 386, critRate: 4.7, critDmg: 9.4},
        80: {hp: 16440, atk: 822, def: 452, critRate: 5.5, critDmg: 11} // Awaken
    },
    atk: {
        10: {hp: 3960, atk: 217, def: 99, critRate: 2.9, critDmg: 5.8},
        20: {hp: 5640, atk: 310, def: 141, critRate: 3.2, critDmg: 6.4},
        30: {hp: 7320, atk: 402, def: 183, critRate: 3.5, critDmg: 7},
        40: {hp: 9000, atk: 495, def: 225, critRate: 3.8, critDmg: 7.6},
        50: {hp: 10680, atk: 587, def: 267, critRate: 4.1, critDmg: 8.2},
        60: {hp: 12360, atk: 679, def: 309, critRate: 4.4, critDmg: 8.8},
        70: {hp: 14040, atk: 772, def: 351, critRate: 4.7, critDmg: 9.4},
        80: {hp: 16440, atk: 904, def: 411, critRate: 5.5, critDmg: 11} // Awaken
    }
};

export const ascendData4star = {
    atk: {
        10: {hp: 2653, atk: 145, def: 66, critRate: 1.9, critDmg: 3.8},
        20: {hp: 3778, atk: 207, def: 94, critRate: 2.1, critDmg: 4.2},
        30: {hp: 4904, atk: 269, def: 122, critRate: 2.3, critDmg: 4.6},
        40: {hp: 6030, atk: 331, def: 150, critRate: 2.5, critDmg: 5.0},
        50: {hp: 7155, atk: 393, def: 178, critRate: 2.7, critDmg: 5.4},
        60: {hp: 8281, atk: 455, def: 207, critRate: 2.9, critDmg: 5.8},
        70: {hp: 9406, atk: 517, def: 235, critRate: 3.1, critDmg: 6.2},
        80: {hp: 11014, atk: 605, def: 275, critRate: 3.6, critDmg: 7.3}
    },
    def: {
        10: {hp: 2653, atk: 132, def: 72, critRate: 1.9, critDmg: 3.8},
        20: {hp: 3778, atk: 188, def: 103, critRate: 2.1, critDmg: 4.2},
        30: {hp: 4904, atk: 245, def: 134, critRate: 2.3, critDmg: 4.6},
        40: {hp: 6030, atk: 301, def: 165, critRate: 2.5, critDmg: 5.0},
        50: {hp: 7155, atk: 357, def: 196, critRate: 2.7, critDmg: 5.4},
        60: {hp: 8281, atk: 414, def: 227, critRate: 2.9, critDmg: 5.8},
        70: {hp: 9406, atk: 470, def: 258, critRate: 3.1, critDmg: 6.2},
        80: {hp: 11014, atk: 550, def: 302, critRate: 3.6, critDmg: 7.3}
    },
    hp: {
        10: {hp: 2918, atk: 132, def: 66, critRate: 1.9, critDmg: 3.8},
        20: {hp: 4156, atk: 188, def: 94, critRate: 2.1, critDmg: 4.2},
        30: {hp: 5394, atk: 245, def: 122, critRate: 2.3, critDmg: 4.6},
        40: {hp: 6633, atk: 301, def: 150, critRate: 2.5, critDmg: 5.0},
        50: {hp: 7871, atk: 357, def: 178, critRate: 2.7, critDmg: 5.4},
        60: {hp: 9109, atk: 414, def: 207, critRate: 2.9, critDmg: 5.8},
        70: {hp: 10347, atk: 470, def: 235, critRate: 3.1, critDmg: 6.2},
        80: {hp: 12116, atk: 550, def: 275, critRate: 3.6, critDmg: 7.3}
    }
};

export const ascendData3star = {
    hp: {
        10: {hp: 1829, atk: 83, def: 41, critRate: 1.2, critDmg: 2.4},
        20: {hp: 2605, atk: 118, def: 59, critRate: 1.3, critDmg: 2.6},
        30: {hp: 3381, atk: 153, def: 76, critRate: 1.4, critDmg: 2.9},
        40: {hp: 4158, atk: 189, def: 94, critRate: 1.5, critDmg: 3.1},
        50: {hp: 4934, atk: 224, def: 112, critRate: 1.7, critDmg: 3.4},
        60: {hp: 5710, atk: 259, def: 129, critRate: 1.8, critDmg: 3.6},
        70: {hp: 6486, atk: 294, def: 147, critRate: 1.9, critDmg: 3.8},
        80: {hp: 7595, atk: 345, def: 172, critRate: 2.3, critDmg: 4.6}
    },
    atk: {
        10: {hp: 1663, atk: 91, def: 41, critRate: 1.2, critDmg: 2.4},
        20: {hp: 2368, atk: 130, def: 59, critRate: 1.3, critDmg: 2.6},
        30: {hp: 3074, atk: 169, def: 76, critRate: 1.4, critDmg: 2.9},
        40: {hp: 3780, atk: 207, def: 94, critRate: 1.5, critDmg: 3.1},
        50: {hp: 4485, atk: 246, def: 112, critRate: 1.7, critDmg: 3.4},
        60: {hp: 5191, atk: 285, def: 129, critRate: 1.8, critDmg: 3.6},
        70: {hp: 5896, atk: 324, def: 147, critRate: 1.9, critDmg: 3.8},
        80: {hp: 6904, atk: 379, def: 172, critRate: 2.3, critDmg: 4.6}
    },
    def: {
        10: { hp: 1663, atk: 83, def: 45, critRate: 1.2, critDmg: 2.4 },
        20: { hp: 2368, atk: 118, def: 65, critRate: 1.3, critDmg: 2.6 },
        30: { hp: 3074, atk: 153, def: 84, critRate: 1.4, critDmg: 2.9 },
        40: { hp: 3780, atk: 189, def: 103, critRate: 1.5, critDmg: 3.1 },
        50: { hp: 4485, atk: 224, def: 123, critRate: 1.7, critDmg: 3.4 },
        60: { hp: 5191, atk: 259, def: 142, critRate: 1.8, critDmg: 3.6 },
        70: { hp: 5896, atk: 294, def: 162, critRate: 1.9, critDmg: 3.8 },
        80: { hp: 6904, atk: 345, def: 189, critRate: 2.3, critDmg: 4.6 }
    }
}

export const calculateDmgBoost = (hp, atk, def, talentKey) => {
    let dmgBoost = 0;

    if (talentKey === 'hp') {
        if (hp > 8000) {
            dmgBoost = ((hp - 8000) / 400) * 0.2;
        }
    } else if (talentKey === 'atk') {
        if (atk > 400) {
            dmgBoost = ((atk - 400) / 20) * 0.2;
        }
    } else if (talentKey === 'def') {
        if (def > 200) {
            dmgBoost = ((def - 200) / 10) * 0.2;
        }
    }

    return dmgBoost; // возвращаем в десятичном виде (например, 0.0725 для 7.25%)
};

// Функция для получения статов с учетом ранка и редкости
export const getStatsWithRank = (card, level, rank, isAscended = false) => {
    // Защита от undefined/null
    if (!card) return null;
    if (!level || level < 1) return null;
    if (rank === undefined || rank === null || rank < 0) rank = 0;

    const rarity = card.rarityName;
    const talent = card.talentName;

    // Определяем ключ для поиска в memoryStats
    let memoryKey = '';
    let talentKey = '';

    if (rarity === '5-star') {
        if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 5-star';
        else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 5-star';
        else if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 5-star';
        talentKey = talent;
    } else if (rarity === '4-star') {
        if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 4-star';
        else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 4-star';
        else if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 4-star';
        talentKey = talent;
    } else if (rarity === '3-star') {
        if (talent === 'hp') memoryKey = 'HP Memory 0 Rank 3-star';
        else if (talent === 'atk') memoryKey = 'ATK Memory 0 Rank 3-star';
        else if (talent === 'def') memoryKey = 'DEF Memory 0 Rank 3-star';
        talentKey = talent;
    }

    if (!memoryKey || !talentKey) return null;

    const memoryData = memoryStats[memoryKey];
    if (!memoryData) return null;

    // Проверяем, нужно ли использовать статы Ascend/Awaken
    let baseStats;
    const isAscendableLevel = [10, 20, 30, 40, 50, 60, 70, 80].includes(level);

    if (isAscended && isAscendableLevel) {
        // Используем статы из ascendData
        let ascendStats = null;

        if (rarity === '5-star') {
            ascendStats = ascendData5star[talentKey]?.[level];
        } else if (rarity === '4-star') {
            ascendStats = ascendData4star[talentKey]?.[level];
        } else if (rarity === '3-star') {
            ascendStats = ascendData3star[talentKey]?.[level];
        }

        if (ascendStats) {
            baseStats = ascendStats;
        } else {
            baseStats = memoryData.baseStats[level];
        }
    } else {
        baseStats = memoryData.baseStats[level];
    }

    if (!baseStats) return null;

    // Коэффициенты для ранка в зависимости от редкости
    let statMultiplier, critRatePerRank, critDmgPerRank;

    if (rarity === '5-star') {
        statMultiplier = 1 + rank * 0.12;
        critRatePerRank = 1.5;
        critDmgPerRank = 3.0;
    } else if (rarity === '4-star') {
        statMultiplier = 1 + rank * 0.05;
        critRatePerRank = 0.5;
        critDmgPerRank = 1.0;
    } else { // 3-star
        statMultiplier = 1 + rank * 0.05;
        critRatePerRank = 0.3;
        critDmgPerRank = 0.6;
    }

    // Рассчитываем статы с учетом ранка
    const hp = Math.round(baseStats.hp * statMultiplier);
    const atk = Math.round(baseStats.atk * statMultiplier);
    const def = Math.round(baseStats.def * statMultiplier);

    // Crit Rate и Crit DMG с учетом ранка
    let critRate = baseStats.critRate + (rank * critRatePerRank);
    let critDmg = baseStats.critDmg + (rank * critDmgPerRank);

    // Для solar показываем только Crit DMG, для lunar только Crit Rate
    const displayCritRate = card.placementName === 'lunar' ? critRate : 0;
    const displayCritDmg = card.placementName === 'solar' ? critDmg : 0;

    let dmgBoost = calculateDmgBoost(hp, atk, def, talentKey);

    return {
        hp,
        atk,
        def,
        critRate: displayCritRate,
        critDmg: displayCritDmg,
        dmgBoost: Math.round(dmgBoost * 10000) / 10000,
        isAscended,
        oathStrength: 0,
        oathRecoveryBoost: 0,
        expeditedEnergyBoost: 0,
    };
};

// Хук для получения статов карточки
export const useCardStats = (cardId, level, rank) => {
    const card = memoriesData.find(c => String(c.id) === cardId);
    if (!card) return null;

    return getStatsWithRank(card, level, rank);
};