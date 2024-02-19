import React from 'react';
import { loadFile } from '../helpers';
import { usePksavWasm } from '../hooks';

const FileSelectScreen = ({ cb: loadedCallback }) => {
    const {
        Module,
        loading,
        error,
        load_save_file,
        get_trainer_name,
        get_trainer_id,
        get_party_count
    } = usePksavWasm();
    const [loadFileError, setLoadFileError] = React.useState(null as string | null);

    if (loading) {
        return <div>Loading Wasm...</div>;
    }

    if (error) {
        return <div>Wasm Loading Error: {error.message}</div>;
    }

    const onChange = async (event) => {
        try {
            // Load selected input file in VM filesystem
            const filename = await loadFile(event.target, Module);
            const pkmnSaveStruct = Module._malloc(0x8000);
            // Get the save data from the selected file
            let error = load_save_file(pkmnSaveStruct, filename);
            if (error) {
                console.error("Error loading save file:", error);
                setLoadFileError(error);
                return;
            }

            const partyCount = get_party_count(pkmnSaveStruct);
            
            // Populate trainer info with loaded data
            loadedCallback({
                trainerName: Module.UTF8ToString(get_trainer_name(pkmnSaveStruct), 8),
                trainerId: get_trainer_id(pkmnSaveStruct),
                partyCount,
                party: [],
                loaded: true
            });

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
