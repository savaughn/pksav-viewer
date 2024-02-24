import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        margin: 10,
        border: '1px solid black',
        flexDirection: 'column',
        borderRadius: 9,
        maxWidth: '300px',
        minWidth: '200px',
        justifyContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statsHeaderColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    statsData: {
        display: 'flex',
        flexDirection: 'column',
    },
    sprite: {
        width: '80px',
        height: '80px',
        alignSelf: 'center',
        marginBottom: '10px',
    }
};

const Header = ({ nickname, level }) => {
    return (
        <div style={styles.header}>
            <h3>{`${nickname}`}</h3>
            <h3>{`Lv ${level}`}</h3>
        </div>
    );
}

const StatsHeader = ({ dexId, showSplitSpcl }) => {
    return (
        <div style={styles.statsHeaderColumn}>
            <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`}
                alt="Pokémon Image"
                height={50}
                width={50}
            />
            <p>Max Hp:</p>
            <p>Attack:</p>
            <p>Defense:</p>
            <p>Speed:</p>
            {showSplitSpcl ? 
                <>
                    <p>Sp. Attack:</p>
                    <p>Sp. Defense:</p>
                </>
             : <p>Special:</p>}
        </div>
    );
}

const StatsData = ({ maxHp, atk, def, spd, spcl = 0, spatk, spdef, showSplitSpcl }) => {
    return (
        <div style={styles.statsData}>
            <h3>Stat</h3>
            <p>{`${maxHp}`}</p>
            <p>{`${atk}`}</p>
            <p>{`${def}`}</p>
            <p>{`${spd}`}</p>
            {
                showSplitSpcl ? 
                    <>
                        <p>{`${spatk}`}</p>
                        <p>{`${spdef}`}</p>
                    </>
                : <p>{`${spcl}`}</p>
            }
        </div>
    );
}

const DVData = ({ ivData: [atk, def, spd, spcl, hp], showSplitSpcl }) => {
    return (
        <div style={styles.statsData}>
            <h3>DV</h3>
            <p>{`${hp}`}</p>
            <p>{`${atk}`}</p>
            <p>{`${def}`}</p>
            <p>{`${spd}`}</p>
            <p>{`${spcl}`}</p>
            {
                showSplitSpcl && <p>{`${spcl}`}</p>
            }
        </div>
    );
}

const PkmnStats = ({ pkmn }) => {
    const showSplitSpcl = Boolean(pkmn.generation > 1);
    return (
        <div style={styles.container}>
            <Header nickname={pkmn.nickname} level={pkmn.party_data.level} />
            <div style={styles.header}>
                <StatsHeader dexId={pkmn.dexId} showSplitSpcl={showSplitSpcl} />
                <StatsData {...pkmn.party_data} showSplitSpcl={showSplitSpcl} />
                <DVData ivData={pkmn.pc_data.ivData} showSplitSpcl={showSplitSpcl} />
            </div>
        </div>
    );
};

export default PkmnStats;
