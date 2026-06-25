import { memoriesData } from './memories-data.js';

export const memoryStats = {
    'HP Memory 0 Rank': {
        type: 'hp',
        baseStats: {
            1: { hp: 2640, atk: 120, def: 60, critRate: 2.6, critDmg: 5.2 },
            2: { hp: 2772, atk: 126, def: 63, critRate: 2.6, critDmg: 5.2 },
            3: { hp: 2904, atk: 132, def: 66, critRate: 2.6, critDmg: 5.2 },
            4: { hp: 3036, atk: 138, def: 69, critRate: 2.6, critDmg: 5.2 },
            5: { hp: 3168, atk: 144, def: 72, critRate: 2.6, critDmg: 5.2 },
            6: { hp: 3300, atk: 150, def: 75, critRate: 2.6, critDmg: 5.2 },
            7: { hp: 3432, atk: 156, def: 78, critRate: 2.6, critDmg: 5.2 },
            8: { hp: 3564, atk: 162, def: 81, critRate: 2.6, critDmg: 5.2 },
            9: { hp: 3696, atk: 168, def: 84, critRate: 2.6, critDmg: 5.2 },
            10: { hp: 3828, atk: 174, def: 87, critRate: 2.6, critDmg: 5.2 },
            // Ascend 1 (уровень 10 -> 11)
            11: { hp: 4488, atk: 204, def: 102, critRate: 2.9, critDmg: 5.8 },
            12: { hp: 4620, atk: 210, def: 105, critRate: 2.9, critDmg: 5.8 },
            13: { hp: 4752, atk: 216, def: 108, critRate: 2.9, critDmg: 5.8 },
            14: { hp: 4884, atk: 222, def: 111, critRate: 2.9, critDmg: 5.8 },
            15: { hp: 5016, atk: 228, def: 114, critRate: 2.9, critDmg: 5.8 },
            16: { hp: 5148, atk: 234, def: 117, critRate: 2.9, critDmg: 5.8 },
            17: { hp: 5280, atk: 240, def: 120, critRate: 2.9, critDmg: 5.8 },
            18: { hp: 5412, atk: 246, def: 123, critRate: 2.9, critDmg: 5.8 },
            19: { hp: 5544, atk: 252, def: 126, critRate: 2.9, critDmg: 5.8 },
            20: { hp: 5676, atk: 258, def: 129, critRate: 2.9, critDmg: 5.8 },
            // Ascend 2 (уровень 20 -> 21)
            21: { hp: 6336, atk: 288, def: 144, critRate: 3.2, critDmg: 6.4 },
            22: { hp: 6468, atk: 294, def: 147, critRate: 3.2, critDmg: 6.4 },
            23: { hp: 6600, atk: 300, def: 150, critRate: 3.2, critDmg: 6.4 },
            24: { hp: 6732, atk: 306, def: 153, critRate: 3.2, critDmg: 6.4 },
            25: { hp: 6864, atk: 312, def: 156, critRate: 3.2, critDmg: 6.4 },
            26: { hp: 6996, atk: 318, def: 159, critRate: 3.2, critDmg: 6.4 },
            27: { hp: 7128, atk: 324, def: 162, critRate: 3.2, critDmg: 6.4 },
            28: { hp: 7260, atk: 330, def: 165, critRate: 3.2, critDmg: 6.4 },
            29: { hp: 7392, atk: 336, def: 168, critRate: 3.2, critDmg: 6.4 },
            30: { hp: 7524, atk: 342, def: 171, critRate: 3.2, critDmg: 6.4 },
            // Ascend 3 (уровень 30 -> 31)
            31: { hp: 8184, atk: 372, def: 186, critRate: 3.5, critDmg: 7 },
            32: { hp: 8316, atk: 378, def: 189, critRate: 3.5, critDmg: 7 },
            33: { hp: 8448, atk: 384, def: 192, critRate: 3.5, critDmg: 7 },
            34: { hp: 8580, atk: 390, def: 195, critRate: 3.5, critDmg: 7 },
            35: { hp: 8712, atk: 396, def: 198, critRate: 3.5, critDmg: 7 },
            36: { hp: 8844, atk: 402, def: 201, critRate: 3.5, critDmg: 7 },
            37: { hp: 8976, atk: 408, def: 204, critRate: 3.5, critDmg: 7 },
            38: { hp: 9108, atk: 414, def: 207, critRate: 3.5, critDmg: 7 },
            39: { hp: 9240, atk: 420, def: 210, critRate: 3.5, critDmg: 7 },
            40: { hp: 9372, atk: 426, def: 213, critRate: 3.5, critDmg: 7 },
            // Ascend 4 (уровень 40 -> 41)
            41: { hp: 10032, atk: 456, def: 228, critRate: 3.8, critDmg: 7.6 },
            42: { hp: 10164, atk: 462, def: 231, critRate: 3.8, critDmg: 7.6 },
            43: { hp: 10296, atk: 468, def: 234, critRate: 3.8, critDmg: 7.6 },
            44: { hp: 10428, atk: 474, def: 237, critRate: 3.8, critDmg: 7.6 },
            45: { hp: 10560, atk: 480, def: 240, critRate: 3.8, critDmg: 7.6 },
            46: { hp: 10692, atk: 486, def: 243, critRate: 3.8, critDmg: 7.6 },
            47: { hp: 10824, atk: 492, def: 246, critRate: 3.8, critDmg: 7.6 },
            48: { hp: 10956, atk: 498, def: 249, critRate: 3.8, critDmg: 7.6 },
            49: { hp: 11088, atk: 504, def: 252, critRate: 3.8, critDmg: 7.6 },
            50: { hp: 11220, atk: 510, def: 255, critRate: 3.8, critDmg: 7.6 },
            // Ascend 5 (уровень 50 -> 51)
            51: { hp: 11880, atk: 540, def: 270, critRate: 4.1, critDmg: 8.2 },
            52: { hp: 12012, atk: 546, def: 273, critRate: 4.1, critDmg: 8.2 },
            53: { hp: 12144, atk: 552, def: 276, critRate: 4.1, critDmg: 8.2 },
            54: { hp: 12276, atk: 558, def: 279, critRate: 4.1, critDmg: 8.2 },
            55: { hp: 12408, atk: 564, def: 282, critRate: 4.1, critDmg: 8.2 },
            56: { hp: 12540, atk: 570, def: 285, critRate: 4.1, critDmg: 8.2 },
            57: { hp: 12672, atk: 576, def: 288, critRate: 4.1, critDmg: 8.2 },
            58: { hp: 12804, atk: 582, def: 291, critRate: 4.1, critDmg: 8.2 },
            59: { hp: 12936, atk: 588, def: 294, critRate: 4.1, critDmg: 8.2 },
            60: { hp: 13068, atk: 594, def: 297, critRate: 4.1, critDmg: 8.2 },
            // Ascend 6 (уровень 60 -> 61)
            61: { hp: 13728, atk: 624, def: 312, critRate: 4.4, critDmg: 8.8 },
            62: { hp: 13860, atk: 630, def: 315, critRate: 4.4, critDmg: 8.8 },
            63: { hp: 13992, atk: 636, def: 318, critRate: 4.4, critDmg: 8.8 },
            64: { hp: 14124, atk: 642, def: 321, critRate: 4.4, critDmg: 8.8 },
            65: { hp: 14256, atk: 648, def: 324, critRate: 4.4, critDmg: 8.8 },
            66: { hp: 14388, atk: 654, def: 327, critRate: 4.4, critDmg: 8.8 },
            67: { hp: 14520, atk: 660, def: 330, critRate: 4.4, critDmg: 8.8 },
            68: { hp: 14652, atk: 666, def: 333, critRate: 4.4, critDmg: 8.8 },
            69: { hp: 14784, atk: 672, def: 336, critRate: 4.4, critDmg: 8.8 },
            70: { hp: 14916, atk: 678, def: 339, critRate: 4.4, critDmg: 8.8 },
            // Ascend 7 (уровень 70 -> 71)
            71: { hp: 15576, atk: 708, def: 354, critRate: 4.7, critDmg: 9.4 },
            72: { hp: 15708, atk: 714, def: 357, critRate: 4.7, critDmg: 9.4 },
            73: { hp: 15840, atk: 720, def: 360, critRate: 4.7, critDmg: 9.4 },
            74: { hp: 15972, atk: 726, def: 363, critRate: 4.7, critDmg: 9.4 },
            75: { hp: 16104, atk: 732, def: 366, critRate: 4.7, critDmg: 9.4 },
            76: { hp: 16236, atk: 738, def: 369, critRate: 4.7, critDmg: 9.4 },
            77: { hp: 16368, atk: 744, def: 372, critRate: 4.7, critDmg: 9.4 },
            78: { hp: 16500, atk: 750, def: 375, critRate: 4.7, critDmg: 9.4 },
            79: { hp: 16632, atk: 756, def: 378, critRate: 4.7, critDmg: 9.4 },
            80: { hp: 16764, atk: 762, def: 381, critRate: 4.7, critDmg: 9.4 },
        }
    },
    'DEF Memory 0 Rank': {
        type: 'def',
        baseStats: {
            1: { hp: 2400, atk: 120, def: 66, critRate: 2.6, critDmg: 5.2 },
            2: { hp: 2520, atk: 126, def: 69, critRate: 2.6, critDmg: 5.2 },
            3: { hp: 2640, atk: 132, def: 72, critRate: 2.6, critDmg: 5.2 },
            4: { hp: 2760, atk: 138, def: 75, critRate: 2.6, critDmg: 5.2 },
            5: { hp: 2880, atk: 144, def: 79, critRate: 2.6, critDmg: 5.2 },
            6: { hp: 3000, atk: 150, def: 82, critRate: 2.6, critDmg: 5.2 },
            7: { hp: 3120, atk: 156, def: 85, critRate: 2.6, critDmg: 5.2 },
            8: { hp: 3240, atk: 162, def: 89, critRate: 2.6, critDmg: 5.2 },
            9: { hp: 3360, atk: 168, def: 92, critRate: 2.6, critDmg: 5.2 },
            10: { hp: 3480, atk: 174, def: 95, critRate: 2.6, critDmg: 5.2 },
            // Ascend 1
            11: { hp: 4080, atk: 204, def: 112, critRate: 2.9, critDmg: 5.8 },
            12: { hp: 4200, atk: 210, def: 115, critRate: 2.9, critDmg: 5.8 },
            13: { hp: 4320, atk: 216, def: 118, critRate: 2.9, critDmg: 5.8 },
            14: { hp: 4440, atk: 222, def: 122, critRate: 2.9, critDmg: 5.8 },
            15: { hp: 4560, atk: 228, def: 125, critRate: 2.9, critDmg: 5.8 },
            16: { hp: 4680, atk: 234, def: 128, critRate: 2.9, critDmg: 5.8 },
            17: { hp: 4800, atk: 240, def: 132, critRate: 2.9, critDmg: 5.8 },
            18: { hp: 4920, atk: 246, def: 135, critRate: 2.9, critDmg: 5.8 },
            19: { hp: 5040, atk: 252, def: 138, critRate: 2.9, critDmg: 5.8 },
            20: { hp: 5160, atk: 258, def: 141, critRate: 2.9, critDmg: 5.8 },
            // Ascend 2
            21: { hp: 5760, atk: 288, def: 158, critRate: 3.2, critDmg: 6.4 },
            22: { hp: 5880, atk: 294, def: 161, critRate: 3.2, critDmg: 6.4 },
            23: { hp: 6000, atk: 300, def: 165, critRate: 3.2, critDmg: 6.4 },
            24: { hp: 6120, atk: 306, def: 168, critRate: 3.2, critDmg: 6.4 },
            25: { hp: 6240, atk: 312, def: 171, critRate: 3.2, critDmg: 6.4 },
            26: { hp: 6360, atk: 318, def: 174, critRate: 3.2, critDmg: 6.4 },
            27: { hp: 6480, atk: 324, def: 178, critRate: 3.2, critDmg: 6.4 },
            28: { hp: 6600, atk: 330, def: 181, critRate: 3.2, critDmg: 6.4 },
            29: { hp: 6720, atk: 336, def: 184, critRate: 3.2, critDmg: 6.4 },
            30: { hp: 6840, atk: 342, def: 188, critRate: 3.2, critDmg: 6.4 },
            // Ascend 3
            31: { hp: 7440, atk: 372, def: 204, critRate: 3.5, critDmg: 7 },
            32: { hp: 7560, atk: 378, def: 207, critRate: 3.5, critDmg: 7 },
            33: { hp: 7680, atk: 384, def: 211, critRate: 3.5, critDmg: 7 },
            34: { hp: 7800, atk: 390, def: 214, critRate: 3.5, critDmg: 7 },
            35: { hp: 7920, atk: 396, def: 217, critRate: 3.5, critDmg: 7 },
            36: { hp: 8040, atk: 402, def: 221, critRate: 3.5, critDmg: 7 },
            37: { hp: 8160, atk: 408, def: 224, critRate: 3.5, critDmg: 7 },
            38: { hp: 8280, atk: 414, def: 227, critRate: 3.5, critDmg: 7 },
            39: { hp: 8400, atk: 420, def: 231, critRate: 3.5, critDmg: 7 },
            40: { hp: 8520, atk: 426, def: 234, critRate: 3.5, critDmg: 7 },
            // Ascend 4
            41: { hp: 9120, atk: 456, def: 250, critRate: 3.8, critDmg: 7.6 },
            42: { hp: 9240, atk: 462, def: 254, critRate: 3.8, critDmg: 7.6 },
            43: { hp: 9360, atk: 468, def: 257, critRate: 3.8, critDmg: 7.6 },
            44: { hp: 9480, atk: 474, def: 260, critRate: 3.8, critDmg: 7.6 },
            45: { hp: 9600, atk: 480, def: 264, critRate: 3.8, critDmg: 7.6 },
            46: { hp: 9720, atk: 486, def: 267, critRate: 3.8, critDmg: 7.6 },
            47: { hp: 9840, atk: 492, def: 270, critRate: 3.8, critDmg: 7.6 },
            48: { hp: 9960, atk: 498, def: 273, critRate: 3.8, critDmg: 7.6 },
            49: { hp: 10080, atk: 504, def: 277, critRate: 3.8, critDmg: 7.6 },
            50: { hp: 10200, atk: 510, def: 280, critRate: 3.8, critDmg: 7.6 },
            // Ascend 5
            51: { hp: 10800, atk: 540, def: 297, critRate: 4.1, critDmg: 8.2 },
            52: { hp: 10920, atk: 546, def: 300, critRate: 4.1, critDmg: 8.2 },
            53: { hp: 11040, atk: 552, def: 303, critRate: 4.1, critDmg: 8.2 },
            54: { hp: 11160, atk: 558, def: 306, critRate: 4.1, critDmg: 8.2 },
            55: { hp: 11280, atk: 564, def: 310, critRate: 4.1, critDmg: 8.2 },
            56: { hp: 11400, atk: 570, def: 313, critRate: 4.1, critDmg: 8.2 },
            57: { hp: 11520, atk: 576, def: 316, critRate: 4.1, critDmg: 8.2 },
            58: { hp: 11640, atk: 582, def: 320, critRate: 4.1, critDmg: 8.2 },
            59: { hp: 11760, atk: 588, def: 323, critRate: 4.1, critDmg: 8.2 },
            60: { hp: 11880, atk: 594, def: 326, critRate: 4.1, critDmg: 8.2 },
            // Ascend 6
            61: { hp: 12480, atk: 624, def: 343, critRate: 4.4, critDmg: 8.8 },
            62: { hp: 12600, atk: 630, def: 346, critRate: 4.4, critDmg: 8.8 },
            63: { hp: 12720, atk: 636, def: 349, critRate: 4.4, critDmg: 8.8 },
            64: { hp: 12840, atk: 642, def: 353, critRate: 4.4, critDmg: 8.8 },
            65: { hp: 12960, atk: 648, def: 356, critRate: 4.4, critDmg: 8.8 },
            66: { hp: 13080, atk: 654, def: 359, critRate: 4.4, critDmg: 8.8 },
            67: { hp: 13200, atk: 660, def: 363, critRate: 4.4, critDmg: 8.8 },
            68: { hp: 13320, atk: 666, def: 366, critRate: 4.4, critDmg: 8.8 },
            69: { hp: 13440, atk: 672, def: 369, critRate: 4.4, critDmg: 8.8 },
            70: { hp: 13560, atk: 678, def: 372, critRate: 4.4, critDmg: 8.8 },
            // Ascend 7
            71: { hp: 14160, atk: 708, def: 389, critRate: 4.7, critDmg: 9.4 },
            72: { hp: 14280, atk: 714, def: 392, critRate: 4.7, critDmg: 9.4 },
            73: { hp: 14400, atk: 720, def: 396, critRate: 4.7, critDmg: 9.4 },
            74: { hp: 14520, atk: 726, def: 399, critRate: 4.7, critDmg: 9.4 },
            75: { hp: 14640, atk: 732, def: 402, critRate: 4.7, critDmg: 9.4 },
            76: { hp: 14760, atk: 738, def: 405, critRate: 4.7, critDmg: 9.4 },
            77: { hp: 14880, atk: 744, def: 409, critRate: 4.7, critDmg: 9.4 },
            78: { hp: 15000, atk: 750, def: 412, critRate: 4.7, critDmg: 9.4 },
            79: { hp: 15120, atk: 756, def: 415, critRate: 4.7, critDmg: 9.4 },
            80: { hp: 15240, atk: 762, def: 419, critRate: 4.7, critDmg: 9.4 },
        }
    },
    'ATK Memory 0 Rank': {
        type: 'atk',
        baseStats: {
            1: { hp: 2400, atk: 132, def: 60, critRate: 2.6, critDmg: 5.2 },
            2: { hp: 2520, atk: 138, def: 63, critRate: 2.6, critDmg: 5.2 },
            3: { hp: 2640, atk: 145, def: 66, critRate: 2.6, critDmg: 5.2 },
            4: { hp: 2760, atk: 151, def: 69, critRate: 2.6, critDmg: 5.2 },
            5: { hp: 2880, atk: 158, def: 72, critRate: 2.6, critDmg: 5.2 },
            6: { hp: 3000, atk: 165, def: 75, critRate: 2.6, critDmg: 5.2 },
            7: { hp: 3120, atk: 171, def: 78, critRate: 2.6, critDmg: 5.2 },
            8: { hp: 3240, atk: 178, def: 81, critRate: 2.6, critDmg: 5.2 },
            9: { hp: 3360, atk: 184, def: 84, critRate: 2.6, critDmg: 5.2 },
            10: { hp: 3480, atk: 191, def: 87, critRate: 2.6, critDmg: 5.2 },
            // Ascend 1
            11: { hp: 4080, atk: 224, def: 102, critRate: 2.9, critDmg: 5.8 },
            12: { hp: 4200, atk: 231, def: 105, critRate: 2.9, critDmg: 5.8 },
            13: { hp: 4320, atk: 237, def: 108, critRate: 2.9, critDmg: 5.8 },
            14: { hp: 4440, atk: 244, def: 111, critRate: 2.9, critDmg: 5.8 },
            15: { hp: 4560, atk: 250, def: 114, critRate: 2.9, critDmg: 5.8 },
            16: { hp: 4680, atk: 257, def: 117, critRate: 2.9, critDmg: 5.8 },
            17: { hp: 4800, atk: 264, def: 120, critRate: 2.9, critDmg: 5.8 },
            18: { hp: 4920, atk: 270, def: 123, critRate: 2.9, critDmg: 5.8 },
            19: { hp: 5040, atk: 277, def: 126, critRate: 2.9, critDmg: 5.8 },
            20: { hp: 5160, atk: 283, def: 129, critRate: 2.9, critDmg: 5.8 },
            // Ascend 2
            21: { hp: 5760, atk: 316, def: 144, critRate: 3.2, critDmg: 6.4 },
            22: { hp: 5880, atk: 323, def: 147, critRate: 3.2, critDmg: 6.4 },
            23: { hp: 6000, atk: 330, def: 150, critRate: 3.2, critDmg: 6.4 },
            24: { hp: 6120, atk: 336, def: 153, critRate: 3.2, critDmg: 6.4 },
            25: { hp: 6240, atk: 343, def: 156, critRate: 3.2, critDmg: 6.4 },
            26: { hp: 6360, atk: 349, def: 159, critRate: 3.2, critDmg: 6.4 },
            27: { hp: 6480, atk: 356, def: 162, critRate: 3.2, critDmg: 6.4 },
            28: { hp: 6600, atk: 363, def: 165, critRate: 3.2, critDmg: 6.4 },
            29: { hp: 6720, atk: 369, def: 168, critRate: 3.2, critDmg: 6.4 },
            30: { hp: 6840, atk: 376, def: 171, critRate: 3.2, critDmg: 6.4 },
            // Ascend 3
            31: { hp: 7440, atk: 409, def: 186, critRate: 3.5, critDmg: 7 },
            32: { hp: 7560, atk: 415, def: 189, critRate: 3.5, critDmg: 7 },
            33: { hp: 7680, atk: 422, def: 192, critRate: 3.5, critDmg: 7 },
            34: { hp: 7800, atk: 429, def: 195, critRate: 3.5, critDmg: 7 },
            35: { hp: 7920, atk: 435, def: 198, critRate: 3.5, critDmg: 7 },
            36: { hp: 8040, atk: 442, def: 201, critRate: 3.5, critDmg: 7 },
            37: { hp: 8160, atk: 448, def: 204, critRate: 3.5, critDmg: 7 },
            38: { hp: 8280, atk: 455, def: 207, critRate: 3.5, critDmg: 7 },
            39: { hp: 8400, atk: 462, def: 210, critRate: 3.5, critDmg: 7 },
            40: { hp: 8520, atk: 468, def: 213, critRate: 3.5, critDmg: 7 },
            // Ascend 4
            41: { hp: 9120, atk: 501, def: 228, critRate: 3.8, critDmg: 7.6 },
            42: { hp: 9240, atk: 508, def: 231, critRate: 3.8, critDmg: 7.6 },
            43: { hp: 9360, atk: 514, def: 234, critRate: 3.8, critDmg: 7.6 },
            44: { hp: 9480, atk: 521, def: 237, critRate: 3.8, critDmg: 7.6 },
            45: { hp: 9600, atk: 528, def: 240, critRate: 3.8, critDmg: 7.6 },
            46: { hp: 9720, atk: 534, def: 243, critRate: 3.8, critDmg: 7.6 },
            47: { hp: 9840, atk: 541, def: 246, critRate: 3.8, critDmg: 7.6 },
            48: { hp: 9960, atk: 547, def: 249, critRate: 3.8, critDmg: 7.6 },
            49: { hp: 10080, atk: 554, def: 252, critRate: 3.8, critDmg: 7.6 },
            50: { hp: 10200, atk: 561, def: 255, critRate: 3.8, critDmg: 7.6 },
            // Ascend 5
            51: { hp: 10800, atk: 594, def: 270, critRate: 4.1, critDmg: 8.2 },
            52: { hp: 10920, atk: 600, def: 273, critRate: 4.1, critDmg: 8.2 },
            53: { hp: 11040, atk: 607, def: 276, critRate: 4.1, critDmg: 8.2 },
            54: { hp: 11160, atk: 613, def: 279, critRate: 4.1, critDmg: 8.2 },
            55: { hp: 11280, atk: 620, def: 282, critRate: 4.1, critDmg: 8.2 },
            56: { hp: 11400, atk: 627, def: 285, critRate: 4.1, critDmg: 8.2 },
            57: { hp: 11520, atk: 633, def: 288, critRate: 4.1, critDmg: 8.2 },
            58: { hp: 11640, atk: 640, def: 291, critRate: 4.1, critDmg: 8.2 },
            59: { hp: 11760, atk: 646, def: 294, critRate: 4.1, critDmg: 8.2 },
            60: { hp: 11880, atk: 653, def: 297, critRate: 4.1, critDmg: 8.2 },
            // Ascend 6
            61: { hp: 12480, atk: 686, def: 312, critRate: 4.4, critDmg: 8.8 },
            62: { hp: 12600, atk: 693, def: 315, critRate: 4.4, critDmg: 8.8 },
            63: { hp: 12720, atk: 699, def: 318, critRate: 4.4, critDmg: 8.8 },
            64: { hp: 12840, atk: 706, def: 321, critRate: 4.4, critDmg: 8.8 },
            65: { hp: 12960, atk: 712, def: 324, critRate: 4.4, critDmg: 8.8 },
            66: { hp: 13080, atk: 719, def: 327, critRate: 4.4, critDmg: 8.8 },
            67: { hp: 13200, atk: 726, def: 330, critRate: 4.4, critDmg: 8.8 },
            68: { hp: 13320, atk: 732, def: 333, critRate: 4.4, critDmg: 8.8 },
            69: { hp: 13440, atk: 739, def: 336, critRate: 4.4, critDmg: 8.8 },
            70: { hp: 13560, atk: 745, def: 339, critRate: 4.4, critDmg: 8.8 },
            // Ascend 7
            71: { hp: 14160, atk: 778, def: 354, critRate: 4.7, critDmg: 9.4 },
            72: { hp: 14280, atk: 785, def: 357, critRate: 4.7, critDmg: 9.4 },
            73: { hp: 14400, atk: 792, def: 360, critRate: 4.7, critDmg: 9.4 },
            74: { hp: 14520, atk: 798, def: 363, critRate: 4.7, critDmg: 9.4 },
            75: { hp: 14640, atk: 805, def: 366, critRate: 4.7, critDmg: 9.4 },
            76: { hp: 14760, atk: 811, def: 369, critRate: 4.7, critDmg: 9.4 },
            77: { hp: 14880, atk: 818, def: 372, critRate: 4.7, critDmg: 9.4 },
            78: { hp: 15000, atk: 825, def: 375, critRate: 4.7, critDmg: 9.4 },
            79: { hp: 15120, atk: 831, def: 378, critRate: 4.7, critDmg: 9.4 },
            80: { hp: 15240, atk: 838, def: 381, critRate: 4.7, critDmg: 9.4 },
        }
    }
};

export const ascendData = {
    // Для каждого типа памяти и уровня возвышения
    hp: {
        10: { hp: 4356, atk: 198, def: 99, critRate: 2.9, critDmg: 5.8 },
        20: { hp: 6204, atk: 282, def: 141, critRate: 3.2, critDmg: 6.4 },
        30: { hp: 8052, atk: 366, def: 183, critRate: 3.5, critDmg: 7 },
        40: { hp: 9900, atk: 450, def: 225, critRate: 3.8, critDmg: 7.6 },
        50: { hp: 11748, atk: 534, def: 267, critRate: 4.1, critDmg: 8.2 },
        60: { hp: 13596, atk: 618, def: 309, critRate: 4.4, critDmg: 8.8 },
        70: { hp: 15444, atk: 702, def: 351, critRate: 4.7, critDmg: 9.4 },
        80: { hp: 18084, atk: 822, def: 411, critRate: 5.5, critDmg: 11 } // Awaken
    },
    def: {
        10: { hp: 3960, atk: 198, def: 108, critRate: 2.9, critDmg: 5.8 },
        20: { hp: 5640, atk: 282, def: 155, critRate: 3.2, critDmg: 6.4 },
        30: { hp: 7320, atk: 366, def: 201, critRate: 3.5, critDmg: 7 },
        40: { hp: 9000, atk: 450, def: 247, critRate: 3.8, critDmg: 7.6 },
        50: { hp: 10680, atk: 534, def: 293, critRate: 4.1, critDmg: 8.2 },
        60: { hp: 12360, atk: 618, def: 339, critRate: 4.4, critDmg: 8.8 },
        70: { hp: 14040, atk: 702, def: 386, critRate: 4.7, critDmg: 9.4 },
        80: { hp: 16440, atk: 822, def: 452, critRate: 5.5, critDmg: 11 } // Awaken
    },
    atk: {
        10: { hp: 3960, atk: 217, def: 99, critRate: 2.9, critDmg: 5.8 },
        20: { hp: 5640, atk: 310, def: 141, critRate: 3.2, critDmg: 6.4 },
        30: { hp: 7320, atk: 402, def: 183, critRate: 3.5, critDmg: 7 },
        40: { hp: 9000, atk: 495, def: 225, critRate: 3.8, critDmg: 7.6 },
        50: { hp: 10680, atk: 587, def: 267, critRate: 4.1, critDmg: 8.2 },
        60: { hp: 12360, atk: 679, def: 309, critRate: 4.4, critDmg: 8.8 },
        70: { hp: 14040, atk: 772, def: 351, critRate: 4.7, critDmg: 9.4 },
        80: { hp: 16440, atk: 904, def: 411, critRate: 5.5, critDmg: 11 } // Awaken
    }
};

// Функция для получения статов с учетом ранка
export const getStatsWithRank = (card, level, rank, isAscended = false) => {
    // Защита от undefined/null
    if (!card) return null;
    if (!level || level < 1) return null;
    if (rank === undefined || rank === null || rank < 0) rank = 0;

    // Определяем редкость
    const is5Star = card.rarityName === '5-star';
    const is4Star = card.rarityName === '4-star';
    const is3Star = card.rarityName === '3-star';

    // Проверяем, что карточка 5-star (только для них есть данные в Excel)
    if (!is5Star) {
        return null;
    }

    // Определяем тип памяти
    let memoryType = '';
    let talentKey = '';
    if (card.talentName === 'hp') {
        memoryType = 'HP Memory 0 Rank';
        talentKey = 'hp';
    } else if (card.talentName === 'def') {
        memoryType = 'DEF Memory 0 Rank';
        talentKey = 'def';
    } else if (card.talentName === 'atk') {
        memoryType = 'ATK Memory 0 Rank';
        talentKey = 'atk';
    } else return null;

    const memoryData = memoryStats[memoryType];
    if (!memoryData) return null;

    // Проверяем, нужно ли использовать статы Ascend/Awaken
    let baseStats;
    const isAscendableLevel = [10, 20, 30, 40, 50, 60, 70, 80].includes(level);

    if (isAscended && isAscendableLevel) {
        // Используем статы из ascendData
        const ascendStats = ascendData[talentKey]?.[level];
        if (ascendStats) {
            baseStats = ascendStats;
        } else {
            baseStats = memoryData.baseStats[level];
        }
    } else {
        // Используем обычные статы
        baseStats = memoryData.baseStats[level];
    }

    if (!baseStats) return null;

    // Коэффициенты для ранка (только для 5-star)
    let statMultiplier = 1 + rank * 0.12;
    let critRatePerRank = 1.5;
    let critDmgPerRank = 3.0;

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

    // Рассчитываем DMG Boost to Weakened
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