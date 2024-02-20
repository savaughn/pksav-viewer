import React from 'react';
import { FileSelectScreen } from './screens';
import { useTrainerInfo } from './hooks';
import { TrainerInfo, PkmnStats } from './components';

const App = (): JSX.Element => {
  const { trainerInfo, loading, onFileLoaded } = useTrainerInfo();

  if (loading && !trainerInfo) {
    return (
      <FileSelectScreen cb={onFileLoaded} />
    );
  }

  return (
    <main style={{ padding: 50 }}>
      <TrainerInfo trainerInfo={trainerInfo} />
      <div style={{ flexDirection: 'column', backgroundColor: 'lightblue' }}>
        {trainerInfo?.party.map((pkmn, i) => (
          <PkmnStats key={i} pkmn={pkmn} />
        ))}
      </div>
    </main>
  );
};

export default App;
