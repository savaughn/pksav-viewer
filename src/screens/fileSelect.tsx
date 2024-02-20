import React from 'react';
import { loadFile } from '../helpers';
import { usePksavWasm } from '../hooks';
import { PkmnStats } from '../types.ts';

const PartyDataOffsets = {
    LEVEL: 0x0,
    MAX_HP: 0x1,
    ATK: 0x3,
    DEF: 0x5,
    SPD: 0x7,
    SPCL: 0x9
};

const FileSelectScreen = ({ cb: loadedCallback }) => {
    const {
        Module,
        loading,
        error,
        load_save_file,
        get_trainer_name,
        get_trainer_id,
        get_party_count,
        get_party_data
    } = usePksavWasm();
    const [loadFileError, setLoadFileError] = React.useState(null as number | null);

    if (loading) {
        return <div>Loading Wasm...</div>;
    }

    if (error) {
        return <div>Wasm Loading Error: {error}</div>;
    }

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            // Load selected input file in VM filesystem
            const filename = await loadFile(event.target, Module) || '';
            if (!filename.length) {
                return;
            }
            const pkmnSaveStruct = Module._malloc(0x8000) || 0;
            // Get the save data from the selected file
            let error = load_save_file(pkmnSaveStruct, filename);
            if (error) {
                console.error("Error loading save file:", error);
                setLoadFileError(error);
                return;
            }

            const partyCount = get_party_count(pkmnSaveStruct);
            const pk_party: PkmnStats[] = [];

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

                pk_party.push(stats);
                Module._free(partyStruct);
            }

            // Populate trainer info with loaded data
            loadedCallback({
                trainerName: Module.UTF8ToString(get_trainer_name(pkmnSaveStruct) || 0, 8),
                trainerId: get_trainer_id(pkmnSaveStruct),
                partyCount,
                party: pk_party
            });

            Module._free(pkmnSaveStruct);

        } catch (error) {
            console.error("Error loading file:", error);
            return;
        }
    };

    if (loadFileError) {
        return <div>Error loading file: {loadFileError}</div>;
    }

    return (
        <main style={{ padding: 20 }}>
            <p>
                <label htmlFor="file">Select a Pokemon Gameboy Savefile:</label>
            </p>
            <p>
                <input type="file" id="file" name="file" onChange={onChange} />
            </p>
        </main>
    );
};

export default FileSelectScreen;
