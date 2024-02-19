import React from 'react';
import { loadFile } from '../helpers';

const FileSelectScreen = ({ Module, load_save_file, setPkmnSave, setGameData, get_trainer_name }) => {
    const onChange = async (event) => {
        try {
            const filename = await loadFile(event.target, Module);
            const _pkmnSave = Module._malloc(0x8000);
            let error = load_save_file(_pkmnSave, filename);
            if (error) {
                console.error("Error loading save file:", error);
                return;
            }
            setPkmnSave(_pkmnSave);
            setGameData({
                trainerName: Module.UTF8ToString(get_trainer_name(_pkmnSave), 8),
                trainerId: 0,
                party: []
              });
            
        } catch (error) {
            console.error("Error loading file:", error);
            return;
        }
    };

    return (
        <main style={{ padding: 20}}>
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
