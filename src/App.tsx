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
        marginTop: '20px',
        justifyContent: 'center',
        minWidth: '220px',
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
        <div>
            <style>
                {`
                    body, html {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        background-color: #5db9ff;
                        color: #363b81;
                    }

                    main {
                        padding: 100px;
                        background-color: #5db9ff;
                        color: #363b81;
                    }

                    h1 {
                        font-size: 2em;
                        color: #363b81;
                    }

                    p {
                        color: #363b81;
                    }

                    img {
                        margin-bottom: 10px;
                    }

                    input {
                        padding: 10px;
                        border-radius: 5px;
                        border: 2px solid #ff1f1f;
                        width: 200px;
                    }
                `}
            </style>

            <main>
                <TrainerInfo trainerInfo={trainerInfo} />
                <div style={styles.partyContainer}>
                    {trainerInfo?.party.map((pkmn, i) => (
                        <PkmnStats key={i} pkmn={pkmn} />
                    ))}
                </div>
                <button style={{ marginTop: 20, height: 50, border: '1px solid black', borderRadius: 9, backgroundColor: 'lightblue' }} onClick={() => window.location.reload()}><p>{"< restart"}</p></button>
            </main>
        </div>
    );
};

export default App;
