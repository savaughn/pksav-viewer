import loadFile from "./loadSaveFileToFS.ts";
import { PkmnStats } from '../types.ts';

const SIZEOF_PARTY_DATA = 0xB;
const SIZEOF_PC_DATA = 0x21;
const SIZEOF_PARTY_STRUCT = SIZEOF_PARTY_DATA + SIZEOF_PC_DATA;

const PartyPartyDataOffsets = {
    LEVEL: 0x0,
    MAX_HP: 0x1,
    ATK: 0x3,
    DEF: 0x5,
    SPD: 0x7,
    SPCL: 0x9
};

const PartyPCDataOffsets = {
    SPECIES: 0x0,
    CURRENT_HP: 0x1,
    LEVEL: 0x3,
    CONDITION: 0x4,
    TYPES: 0x5,
    CATCH_RATE: 0x7,
    MOVES: 0x8,
    OT_ID: 0xC,
    EXP: 0xE,
    EV_HP: 0x11,
    EV_ATK: 0x13,
    EV_DEF: 0x15,
    EV_SPD: 0x17,
    EV_SPCL: 0x19,
    IV_DATA: 0x1B,
    MOVE_PP: 0x1D
};

const loadSaveFile = (Module, load_save_file, setLoadFileError, filename: string) => {
    const pkmnSaveStruct = Module._malloc(0x8000) || 0;
    let error = load_save_file(pkmnSaveStruct, filename);
    if (error) {
        console.error("Error loading save file:", error);
        setLoadFileError(error);
        return null;
    }
    return pkmnSaveStruct;
};

const getPartyData = (Module, get_party_count, get_party_data, pkmnSaveStruct: number, get_pkmn_dvs, get_pkmn_nickname, get_pkdex_entry) => {
    const partyCount = get_party_count(pkmnSaveStruct);
    const pkmnPartyData: PkmnStats[] = [];

    for (let i = 0; i < partyCount; i++) {
        const partyStruct = Module._malloc(SIZEOF_PARTY_STRUCT);
        get_party_data(pkmnSaveStruct, i, partyStruct);

        const dvDataStruct = Module._malloc(0x5);
        get_pkmn_dvs(pkmnSaveStruct, i, dvDataStruct);

        const stats: PkmnStats = {
            nickname: Module.UTF8ToString(get_pkmn_nickname(pkmnSaveStruct, i) || 0, 11),
            dexId: get_pkdex_entry(pkmnSaveStruct, i),
            pc_data: {
                species: Module.HEAPU8[partyStruct],
                currentHp: Module.HEAPU8[partyStruct + PartyPCDataOffsets.CURRENT_HP],
                level: Module.HEAPU8[partyStruct + PartyPCDataOffsets.LEVEL],
                condition: Module.HEAPU8[partyStruct + PartyPCDataOffsets.CONDITION],
                types: [
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.TYPES],
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.TYPES + 1]
                ],
                catchRate: Module.HEAPU8[partyStruct + PartyPCDataOffsets.CATCH_RATE],
                moves: [
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVES],
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVES + 1],
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVES + 2],
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVES + 3]
                ],
                otId: Module.HEAPU8[partyStruct + PartyPCDataOffsets.OT_ID],
                exp: Module.HEAPU8[partyStruct + PartyPCDataOffsets.EXP],
                evHp: Module.HEAPU8[partyStruct + PartyPCDataOffsets.EV_HP],
                evAtk: Module.HEAPU8[partyStruct + PartyPCDataOffsets.EV_ATK],
                evDef: Module.HEAPU8[partyStruct + PartyPCDataOffsets.EV_DEF],
                evSpd: Module.HEAPU8[partyStruct + PartyPCDataOffsets.EV_SPD],
                evSpcl: Module.HEAPU8[partyStruct + PartyPCDataOffsets.EV_SPCL],
                ivData: [
                    Module.HEAPU8[dvDataStruct],
                    Module.HEAPU8[dvDataStruct + 1],
                    Module.HEAPU8[dvDataStruct + 2],
                    Module.HEAPU8[dvDataStruct + 3],
                    Module.HEAPU8[dvDataStruct + 4]
                ],
                movePp: [
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVE_PP],
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVE_PP + 1],
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVE_PP + 2],
                    Module.HEAPU8[partyStruct + PartyPCDataOffsets.MOVE_PP + 3]
                ]
            },
            party_data: {
                level: Module.HEAPU8[partyStruct + SIZEOF_PC_DATA + PartyPartyDataOffsets.LEVEL],
                maxHp: Module.HEAPU8[partyStruct + SIZEOF_PC_DATA + PartyPartyDataOffsets.MAX_HP],
                atk: Module.HEAPU8[partyStruct + SIZEOF_PC_DATA + PartyPartyDataOffsets.ATK],
                def: Module.HEAPU8[partyStruct + SIZEOF_PC_DATA + PartyPartyDataOffsets.DEF],
                spd: Module.HEAPU8[partyStruct + SIZEOF_PC_DATA + PartyPartyDataOffsets.SPD],
                spcl: Module.HEAPU8[partyStruct + SIZEOF_PC_DATA + PartyPartyDataOffsets.SPCL]
            },
        };

        pkmnPartyData.push(stats);
        Module._free(partyStruct);
        Module._free(dvDataStruct);
    }

    return { partyCount, pkmnPartyData };
};

export { loadFile, loadSaveFile, getPartyData};