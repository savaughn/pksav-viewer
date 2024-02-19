import React, { useState } from 'react';
import { usePksavWasm } from './hooks';
import { FileSelectScreen } from './screens';
import { GameData } from './types';

const App = () => {
  const [ pkmnSave, setPkmnSave ] = useState();
  const [ gameData, setGameData ] = useState({} as GameData);
  const { Module, loading, error, load_save_file, get_trainer_name } = usePksavWasm();

  if (loading) {
    return <div>Loading Wasm...</div>;
  }

  if (error) {
    return <div>Wasm Loading Error: {error.message}</div>;
  }

  // TODO: Wrap with useWasm provider instead
  if (!pkmnSave) {
    return (
      <FileSelectScreen Module={Module} load_save_file={load_save_file} setPkmnSave={setPkmnSave} setGameData={ setGameData} get_trainer_name={get_trainer_name} />
    );
  }

  return (
    <main style={{ padding: 50 }}>
      <p>{`NAME/${gameData.trainerName}`}</p>
    </main>
  );
};

export default App;
