import React, { useState } from 'react';
import { loadFile, loadSaveFile, getPartyData } from '../helpers/index.ts';
import { usePksavWasm } from '../hooks';

const FileSelectScreen = ({ cb: loadedCallback }) => {
    const {
        Module,
        loading,
        error,
        load_save_file,
        get_trainer_name,
        get_trainer_id,
        get_party_count,
        get_party_data,
        get_pkmn_dvs,
        get_pkmn_nickname
    } = usePksavWasm();
    const [loadFileError, setLoadFileError] = useState(null as number | null);

    if (loading) {
        return <div>Loading Wasm...</div>;
    }

    if (error) {
        return <div>Wasm Loading Error: {error}</div>;
    }

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            // Load file to vm filesystem
            const filename = await loadFile(event.target, Module) || '';
            if (!filename.length) {
                return;
            }

            // load save data from file
            const pkmnSaveStruct = loadSaveFile(Module, load_save_file, setLoadFileError, filename);
            if (!pkmnSaveStruct) {
                return;
            }

            const { partyCount, pkmnPartyData } = getPartyData(Module, get_party_count, get_party_data, pkmnSaveStruct, get_pkmn_dvs, get_pkmn_nickname);

            // Populate trainer info
            loadedCallback({
                trainerName: Module.UTF8ToString(get_trainer_name(pkmnSaveStruct) || 0, 8),
                trainerId: get_trainer_id(pkmnSaveStruct),
                partyCount,
                party: pkmnPartyData
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
