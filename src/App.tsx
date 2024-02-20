import React from 'react';
import { FileSelectScreen } from './screens';
import { useTrainerInfo } from './hooks';

const TrainerInfo = ({ trainerInfo }) => {

  return (
    <div style={{ flex: 1 }}>
      <p>{`NAME/${trainerInfo?.trainerName || 'Missing Name'}`}</p>
      <p>{`ID No ${trainerInfo?.trainerId || 'Missing id'}`}</p>
      <p>{`Party Count: ${trainerInfo?.partyCount || 'Missing party count'}`}</p>
    </div>
  );
}

const PkmnStats = ({ pkmn }) => {
  return (
    <div
      style={{
        flex: 1,
        width: 200,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    }}>
      <p>{`Level: ${pkmn.party_data.level}`}</p>
      <p>{`Max HP: ${pkmn.party_data.maxHp}`}</p>
      <p>{`Attack: ${pkmn.party_data.atk}`}</p>
      <p>{`Defense: ${pkmn.party_data.def}`}</p>
      <p>{`Speed: ${pkmn.party_data.spd}`}</p>
      <p>{`Special: ${pkmn.party_data.spcl}`}</p>
    </div>
  );
};

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
