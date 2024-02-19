import React from 'react';
import { FileSelectScreen } from './screens';
import { useTrainerInfo } from './hooks';

const App = () : JSX.Element => {
  const { trainerInfo, loadedCallback } = useTrainerInfo();
  
  if (!trainerInfo.loaded) {
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
