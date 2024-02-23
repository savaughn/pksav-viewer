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
        get_pkmn_nickname,
        get_pkdex_entry,
        get_save_generation
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
            const {pkmnSaveStruct, saveGeneration } = loadSaveFile(
                Module, 
                load_save_file, 
                setLoadFileError, 
                filename, 
                get_save_generation
            );
            if (!pkmnSaveStruct) {
                return;
            }

            const { partyCount, pkmnPartyData } = getPartyData(Module, get_party_count, get_party_data, pkmnSaveStruct, get_pkmn_dvs, get_pkmn_nickname, get_pkdex_entry, saveGeneration);

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

    const palette = {
        background: '#5db9ff',
        primary: '#fbd743',
        secondary: '#ff1f1f',
        text: '#363b81',
    };

    return (
        <div>
            <style>
                {`
                    body, html {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        background-color: ${palette.background};
                        color: ${palette.text};
                    }
                    
                    main {
                        padding: 20px;
                        text-align: center;
                    }
                    
                    h1 {
                        font-size: 2em;
                        color: ${palette.text};
                    }
                    
                    img {
                        margin-bottom: 10px;
                    }
                    
                    input {
                        padding: 10px;
                        border-radius: 5px;
                        border: 2px solid ${palette.secondary};
                        width: 200px;
                    }
                `}
            </style>

            <main>
                <div style={{ marginBottom: 20, }}>
                    <img src="https://fontmeme.com/permalink/240221/97daa6a56c5cd67de3b9acf415dea3db.png" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pokémon Image" />
                    <input type="file" id="file" name="file" onChange={onChange} />
                    <p style={{ fontSize: '1.2em' }}>
                    Proof of Concept: This application is in the early stages of development and serves as a proof of concept.
                    It currently supports only Generation 1 Pokemon games with a .sav format.
                </p>
                </div>                
            </main>
        </div>
    );
};

export default FileSelectScreen;
