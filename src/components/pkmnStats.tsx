import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        width: '200px',
        margin: 10,
        border: '1px solid black',
        flexDirection: 'column',
        borderRadius: 9
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statsHeaderColumn: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '3.75rem'
    },
    statsData: {
        display: 'flex',
        flexDirection: 'column',
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

const StatsHeader = () => {
    return (
        <div style={styles.statsHeaderColumn}>
            <p>Max Hp:</p>
            <p>Attack:</p>
            <p>Defense:</p>
            <p>Speed:</p>
            <p>Special:</p>
        </div>
    );
}

const StatsData = ({ maxHp, atk, def, spd, spcl }) => {
    return (
        <div style={styles.statsData}>
            <h3>Stat</h3>
            <p>{`${maxHp}`}</p>
            <p>{`${atk}`}</p>
            <p>{`${def}`}</p>
            <p>{`${spd}`}</p>
            <p>{`${spcl}`}</p>
        </div>
    );
}

const DVData = ({ivData: [atk, def, spd, spcl, hp]}) => {
    return (
        <div style={styles.statsData}>
            <h3>DV</h3>
            <p>{`${hp}`}</p>
            <p>{`${atk}`}</p>
            <p>{`${def}`}</p>
            <p>{`${spd}`}</p>
            <p>{`${spcl}`}</p>
        </div>
    );
}

const PkmnStats = ({ pkmn }) => {
    return (
        <div style={styles.container}>
            <Header nickname={pkmn.nickname} level={pkmn.party_data.level} />
            <div style={styles.header}>
                <StatsHeader />
                <StatsData {...pkmn.party_data} />
                <DVData ivData={pkmn.pc_data.ivData} />
            </div>
        </div>
    );
};

export default PkmnStats;
