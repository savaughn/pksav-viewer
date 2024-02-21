import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        border: '3px solid black',
        borderRadius: 9,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: 'lightblue',
        flexDirection: 'column',
        minWidth: '220px',
    }
};

const TrainerInfo = ({ trainerInfo }) => {
    return (
        <div style={styles.container}>
            <h3>{`NAME/${trainerInfo?.trainerName || 'Missing Name'}`}</h3>
            <h3>{`ID No ${trainerInfo?.trainerId || 'Missing id'}`}</h3>
        </div>
    );
}

export default TrainerInfo;