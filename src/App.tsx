import React, { useCallback, useState } from 'react';
import { FileSelectScreen } from './screens';
import { GameData } from './types';

const App = () : JSX.Element => {
  const [ pkmnSave, setPkmnSave ] = useState(null as number | null);
  const [ trainerInfo, setTrainerInfo ] = useState({} as GameData);

  const loadedCallback = useCallback((save: number, data: GameData) => {
    setPkmnSave(save);
    setTrainerInfo(data);
  }, []);
  
  if (!pkmnSave) {
    return (
      <FileSelectScreen cb={ loadedCallback } />
    );
  }

  return (
    <main style={{ padding: 50 }}>
      <p>{`NAME/${trainerInfo?.trainerName || 'Missing Name'}`}</p>
      <p>{`ID No ${trainerInfo?.trainerId || 'Missing id'}`}</p>
    </main>
  );
};

export default App;
