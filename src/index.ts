import fs from 'node:fs';

enum AdrFieldType {
    SELECTION = "sel",
    NUMBER = 'num'
}

type AndOperator<T extends string> = { and: Condition<T>[] }
type OrOperator<T extends string> = { or: Condition<T>[] }
type EqOperator<T extends string> = { eq: [T, number] }
type NeOperator<T extends string> = { ne: [T, number] }
type LtOperator<T extends string> = { lt: [T, number] }
type GtOperator<T extends string> = { gt: [T, number] }

type Condition<T extends string> = AndOperator<T> | OrOperator<T> | EqOperator<T> | NeOperator<T> | LtOperator<T> | GtOperator<T>

type AdrFieldData<T extends string> = {
    localization: string
    parameter: 0 | 1
    position: number
    size: number
    condition?: Condition<T>
} & (
        {
            type: AdrFieldType.SELECTION
            options: Record<number, string>
        } | {
            type: AdrFieldType.NUMBER,
            min?: number,
            max?: number
        }
    )
type AdrFields<T extends string> = Record<T, AdrFieldData<T>>;

type FieldsAvailable = "size"
    | "sclass" | "sid1"
    | "sid1_4"
    | "sid1_5"
    | "sid1_6"
    | "sid1_8"
    | "sid1_24"
    | "sid1_25"
    | "sid1_35"
    | "sid1_36"
    | "sid1_15"
    | "sid1_18"
    | "sid1_14"
    | "sid1_17"
    | "sid1_16"
    | "sid1_19"
    | "sid0"
    | "sid0_1"
    | "sid0_2"
    | "sid0_3"
    | "sid0_4"
    | "sid0_5"
    | "sid0_7"
    | "sid0_10"
    | "sid0_11"
    | "sid0_13"
    | "sid0_20"
    | "sid0_21"
    | "sid0_30"
    | "sid0_32"
    | "sid0_33"
    | "sid0_42"
    | "sid0_37"
    | "sid0_38"
    | "sid0_46"
    | "sid0_47"
    | "sid0_48"
    | "sid2"
    | "sid3"

function generateSubselections(sidId: number, groupId: number, numSuboptions: number): AdrFieldData<FieldsAvailable> {
    return {
        localization: "K45::WE_ARMBRP.adrLabel[sid_subselect]",
        parameter: 1,
        position: 0,
        size: 31,
        type: AdrFieldType.SELECTION,
        options: Object.fromEntries([... new Array(numSuboptions)].map((_, i) => [i, `K45::WE_ARMBRP.adrOptions[sid${sidId}.${groupId}.${i}]`])),
        condition: {
            and: [
                { eq: ['sclass', sidId] },
                { eq: ['sid' + sidId as FieldsAvailable, groupId] },
            ]
        }
    }
}

function generateNumberSubfield(sidId: number, groupId: number): AdrFieldData<FieldsAvailable> {
    return {
        localization: "K45::WE_ARMBRP.adrLabel[sid_value]",
        parameter: 1,
        position: 0,
        size: 31,
        type: AdrFieldType.NUMBER,
        condition: {
            and: [
                { eq: ['sclass', sidId] },
                { eq: ['sid' + sidId as FieldsAvailable, groupId] },
            ]
        }
    }
}


const metadata: AdrFields<FieldsAvailable> = {
    size: {
        localization: "K45::WE_ARMBRP.adrLabel[size]",
        parameter: 0,
        position: 8,
        size: 2,
        type: AdrFieldType.SELECTION,
        options: {
            0: "K45::WE_ARMBRP.adrOptions[size.0]",
            1: "K45::WE_ARMBRP.adrOptions[size.1]",
            2: "K45::WE_ARMBRP.adrOptions[size.2]",
            3: "K45::WE_ARMBRP.adrOptions[size.3]"
        }
    },
    sclass: {
        localization: "K45::WE_ARMBRP.adrLabel[sclass]",
        parameter: 0,
        position: 6,
        size: 2,
        type: AdrFieldType.SELECTION,
        options: {
            0: "K45::WE_ARMBRP.adrOptions[sclass.0]",
            1: "K45::WE_ARMBRP.adrOptions[sclass.1]",
            2: "K45::WE_ARMBRP.adrOptions[sclass.2]",
            3: "K45::WE_ARMBRP.adrOptions[sclass.3]"
        }
    },
    sid1: {
        localization: "K45::WE_ARMBRP.adrLabel[sid]",
        parameter: 0,
        position: 0,
        size: 6,
        type: AdrFieldType.SELECTION,
        options: {
            1: "K45::WE_ARMBRP.adrOptions[sid1.1]",
            2: "K45::WE_ARMBRP.adrOptions[sid1.2]",
            3: "K45::WE_ARMBRP.adrOptions[sid1.3]",
            4: "K45::WE_ARMBRP.adrOptions[sid1.4]",
            5: "K45::WE_ARMBRP.adrOptions[sid1.5]",
            6: "K45::WE_ARMBRP.adrOptions[sid1.6]",
            7: "K45::WE_ARMBRP.adrOptions[sid1.7]",
            8: "K45::WE_ARMBRP.adrOptions[sid1.8]",
            9: "K45::WE_ARMBRP.adrOptions[sid1.9]",
            10: "K45::WE_ARMBRP.adrOptions[sid1.10]",
            11: "K45::WE_ARMBRP.adrOptions[sid1.11]",
            12: "K45::WE_ARMBRP.adrOptions[sid1.12]",
            13: "K45::WE_ARMBRP.adrOptions[sid1.13]",
            14: "K45::WE_ARMBRP.adrOptions[sid1.14]",
            15: "K45::WE_ARMBRP.adrOptions[sid1.15]",
            16: "K45::WE_ARMBRP.adrOptions[sid1.16]",
            17: "K45::WE_ARMBRP.adrOptions[sid1.17]",
            18: "K45::WE_ARMBRP.adrOptions[sid1.18]",
            19: "K45::WE_ARMBRP.adrOptions[sid1.19]",
            20: "K45::WE_ARMBRP.adrOptions[sid1.20]",
            21: "K45::WE_ARMBRP.adrOptions[sid1.21]",
            22: "K45::WE_ARMBRP.adrOptions[sid1.22]",
            23: "K45::WE_ARMBRP.adrOptions[sid1.23]",
            24: "K45::WE_ARMBRP.adrOptions[sid1.24]",
            25: "K45::WE_ARMBRP.adrOptions[sid1.25]",
            26: "K45::WE_ARMBRP.adrOptions[sid1.26]",
            27: "K45::WE_ARMBRP.adrOptions[sid1.27]",
            28: "K45::WE_ARMBRP.adrOptions[sid1.28]",
            29: "K45::WE_ARMBRP.adrOptions[sid1.29]",
            30: "K45::WE_ARMBRP.adrOptions[sid1.30]",
            31: "K45::WE_ARMBRP.adrOptions[sid1.31]",
            32: "K45::WE_ARMBRP.adrOptions[sid1.32]",
            33: "K45::WE_ARMBRP.adrOptions[sid1.33]",
            34: "K45::WE_ARMBRP.adrOptions[sid1.34]",
            35: "K45::WE_ARMBRP.adrOptions[sid1.35]",
            36: "K45::WE_ARMBRP.adrOptions[sid1.36]",
            37: "K45::WE_ARMBRP.adrOptions[sid1.37]",
            38: "K45::WE_ARMBRP.adrOptions[sid1.38]",
            39: "K45::WE_ARMBRP.adrOptions[sid1.39]",
            40: "K45::WE_ARMBRP.adrOptions[sid1.40]",
        },
        condition: {
            eq: ['sclass', 1]
        }
    },
    sid1_4: generateSubselections(1, 4, 2),
    sid1_5: generateSubselections(1, 5, 2),
    sid1_6: generateSubselections(1, 6, 3),
    sid1_8: generateSubselections(1, 8, 2),
    sid1_24: generateSubselections(1, 24, 3),
    sid1_25: generateSubselections(1, 25, 4),
    sid1_35: generateSubselections(1, 35, 2),
    sid1_36: generateSubselections(1, 36, 2),
    sid0: {
        localization: "K45::WE_ARMBRP.adrLabel[sid]",
        parameter: 0,
        position: 0,
        size: 6,
        type: AdrFieldType.SELECTION,
        options: {
            1: "K45::WE_ARMBRP.adrOptions[sid0.1]",
            2: "K45::WE_ARMBRP.adrOptions[sid0.2]",
            3: "K45::WE_ARMBRP.adrOptions[sid0.3]",
            4: "K45::WE_ARMBRP.adrOptions[sid0.4]",
            5: "K45::WE_ARMBRP.adrOptions[sid0.5]",
            6: "K45::WE_ARMBRP.adrOptions[sid0.6]",
            7: "K45::WE_ARMBRP.adrOptions[sid0.7]",
            8: "K45::WE_ARMBRP.adrOptions[sid0.8]",
            9: "K45::WE_ARMBRP.adrOptions[sid0.9]",
            10: "K45::WE_ARMBRP.adrOptions[sid0.10]",
            11: "K45::WE_ARMBRP.adrOptions[sid0.11]",
            12: "K45::WE_ARMBRP.adrOptions[sid0.12]",
            13: "K45::WE_ARMBRP.adrOptions[sid0.13]",
            14: "K45::WE_ARMBRP.adrOptions[sid0.14]",
            15: "K45::WE_ARMBRP.adrOptions[sid0.15]",
            16: "K45::WE_ARMBRP.adrOptions[sid0.16]",
            17: "K45::WE_ARMBRP.adrOptions[sid0.17]",
            18: "K45::WE_ARMBRP.adrOptions[sid0.18]",
            19: "K45::WE_ARMBRP.adrOptions[sid0.19]",
            20: "K45::WE_ARMBRP.adrOptions[sid0.20]",
            21: "K45::WE_ARMBRP.adrOptions[sid0.21]",
            22: "K45::WE_ARMBRP.adrOptions[sid0.22]",
            23: "K45::WE_ARMBRP.adrOptions[sid0.23]",
            24: "K45::WE_ARMBRP.adrOptions[sid0.24]",
            25: "K45::WE_ARMBRP.adrOptions[sid0.25]",
            27: "K45::WE_ARMBRP.adrOptions[sid0.27]",
            28: "K45::WE_ARMBRP.adrOptions[sid0.28]",
            29: "K45::WE_ARMBRP.adrOptions[sid0.29]",
            30: "K45::WE_ARMBRP.adrOptions[sid0.30]",
            31: "K45::WE_ARMBRP.adrOptions[sid0.31]",
            32: "K45::WE_ARMBRP.adrOptions[sid0.32]",
            33: "K45::WE_ARMBRP.adrOptions[sid0.33]",
            34: "K45::WE_ARMBRP.adrOptions[sid0.34]",
            35: "K45::WE_ARMBRP.adrOptions[sid0.35]",
            36: "K45::WE_ARMBRP.adrOptions[sid0.36]",
            37: "K45::WE_ARMBRP.adrOptions[sid0.37]",
            38: "K45::WE_ARMBRP.adrOptions[sid0.38]",
            39: "K45::WE_ARMBRP.adrOptions[sid0.39]",
            40: "K45::WE_ARMBRP.adrOptions[sid0.40]",
            41: "K45::WE_ARMBRP.adrOptions[sid0.41]",
            42: "K45::WE_ARMBRP.adrOptions[sid0.42]",
            43: "K45::WE_ARMBRP.adrOptions[sid0.43]",
            44: "K45::WE_ARMBRP.adrOptions[sid0.44]",
            45: "K45::WE_ARMBRP.adrOptions[sid0.45]",
            46: "K45::WE_ARMBRP.adrOptions[sid0.46]",
            47: "K45::WE_ARMBRP.adrOptions[sid0.47]",
            48: "K45::WE_ARMBRP.adrOptions[sid0.48]",
        },
        condition: {
            eq: ['sclass', 0]
        }
    },
    sid0_1: generateSubselections(0, 1, 2),
    sid0_2: generateSubselections(0, 2, 2),
    sid0_3: generateSubselections(0, 3, 2),
    sid0_4: generateSubselections(0, 4, 2),
    sid0_5: generateSubselections(0, 5, 2),
    sid0_7: generateSubselections(0, 7, 2),
    sid0_10: generateSubselections(0, 10, 2),
    sid0_11: generateSubselections(0, 11, 2),
    sid0_13: generateSubselections(0, 13, 2),
    sid0_20: generateSubselections(0, 20, 2),
    sid0_21: generateSubselections(0, 21, 5),
    sid0_30: generateSubselections(0, 30, 3),
    sid0_32: generateSubselections(0, 32, 2),
    sid0_33: generateSubselections(0, 33, 2),
    sid0_42: generateSubselections(0, 42, 3),
    sid2: {
        localization: "K45::WE_ARMBRP.adrLabel[sid]",
        parameter: 0,
        position: 0,
        size: 6,
        type: AdrFieldType.SELECTION,
        options: {
            1: "K45::WE_ARMBRP.adrOptions[sid2.1]",
            2: "K45::WE_ARMBRP.adrOptions[sid2.2]",
        },
        condition: {
            eq: ['sclass', 2]
        }
    },
    sid3: {
        localization: "K45::WE_ARMBRP.adrLabel[sid]",
        parameter: 0,
        position: 0,
        size: 6,
        type: AdrFieldType.SELECTION,
        options: {
            1: "K45::WE_ARMBRP.adrOptions[sid3.1]",
            2: "K45::WE_ARMBRP.adrOptions[sid3.2]",
            3: "K45::WE_ARMBRP.adrOptions[sid3.3]",
            4: "K45::WE_ARMBRP.adrOptions[sid3.4]",
        },
        condition: {
            eq: ['sclass', 3]
        }
    },
    sid1_15: generateNumberSubfield(1, 15),
    sid1_18: generateNumberSubfield(1, 18),
    sid1_14: generateNumberSubfield(1, 14),
    sid1_17: generateNumberSubfield(1, 17),
    sid1_16: generateNumberSubfield(1, 16),
    sid1_19: generateNumberSubfield(1, 19),
    sid0_37: generateNumberSubfield(0, 37),
    sid0_38: generateNumberSubfield(0, 38),
    sid0_46: generateNumberSubfield(0, 46),
    sid0_47: generateNumberSubfield(0, 47),
    sid0_48: generateNumberSubfield(0, 48)
}

fs.writeFileSync('./output.json', JSON.stringify(metadata))