import loadFile from "./loadSaveFileToFS.ts";
import { PkmnStats } from '../types.ts';

const PartyDataOffsets = {
    LEVEL: 0x0,
    MAX_HP: 0x1,
    ATK: 0x3,
    DEF: 0x5,
    SPD: 0x7,
    SPCL: 0x9
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

const getPartyData = (Module, get_party_count, get_party_data, pkmnSaveStruct: number) => {
    const partyCount = get_party_count(pkmnSaveStruct);
    const pkmnPartyData: PkmnStats[] = [];

    for (let i = 0; i < partyCount; i++) {
        const partyStruct = Module._malloc(0xB);
        get_party_data(pkmnSaveStruct, i, partyStruct);

        const stats: PkmnStats = {
            party_data: {
                level: Module.HEAPU8[partyStruct + PartyDataOffsets.LEVEL],
                maxHp: Module.HEAPU8[partyStruct + PartyDataOffsets.MAX_HP],
                atk: Module.HEAPU8[partyStruct + PartyDataOffsets.ATK],
                def: Module.HEAPU8[partyStruct + PartyDataOffsets.DEF],
                spd: Module.HEAPU8[partyStruct + PartyDataOffsets.SPD],
                spcl: Module.HEAPU8[partyStruct + PartyDataOffsets.SPCL]
            },
        };

        pkmnPartyData.push(stats);
        Module._free(partyStruct);
    }

    return { partyCount, pkmnPartyData };
};

export { loadFile, loadSaveFile, getPartyData};