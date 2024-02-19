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
        get_trainer_id
    } = usePksavWasm();

    if (loading) {
        return <div>Loading Wasm...</div>;
    }

    if (error) {
        return <div>Wasm Loading Error: {error.message}</div>;
    }

    const onChange = async (event) => {
        try {
            const filename = await loadFile(event.target, Module);
            const _pkmnSave = Module._malloc(0x8000);
            let error = load_save_file(_pkmnSave, filename);
            if (error) {
                console.error("Error loading save file:", error);
                return;
            }
            loadedCallback(_pkmnSave, {
                trainerName: Module.UTF8ToString(get_trainer_name(_pkmnSave), 8),
                trainerId: get_trainer_id(_pkmnSave),
                party: []
            });

        } catch (error) {
            console.error("Error loading file:", error);
            return;
        }
    };

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
