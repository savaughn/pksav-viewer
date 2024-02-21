import React from 'react';
import { FileSelectScreen } from './screens';
import { useTrainerInfo } from './hooks';
import { TrainerInfo, PkmnStats } from './components';

const styles = {
  partyContainer: { 
    display: 'flex',
    backgroundColor: 'lightblue', 
    flexWrap: 'wrap', 
    borderRadius: 9,
    border: '1px solid black', 
  }
};

const App = (): JSX.Element => {
  const { trainerInfo, loading, onFileLoaded } = useTrainerInfo();

  if (loading && !trainerInfo) {
    return (
      <FileSelectScreen cb={onFileLoaded} />
    );
  }

  return (
    <main style={{ padding: '100px' }}>
      <TrainerInfo trainerInfo={trainerInfo} />
      <div style={styles.partyContainer}>
        {trainerInfo?.party.map((pkmn, i) => (
          <PkmnStats key={i} pkmn={pkmn} />
        ))}
      </div>
    </main>
  );
};

export default App;
