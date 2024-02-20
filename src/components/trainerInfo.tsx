import React from 'react';

const TrainerInfo = ({ trainerInfo }) => {

    return (
        <div style={{ flex: 1 }}>
            <p>{`NAME/${trainerInfo?.trainerName || 'Missing Name'}`}</p>
            <p>{`ID No ${trainerInfo?.trainerId || 'Missing id'}`}</p>
            <p>{`Party Count: ${trainerInfo?.partyCount || 'Missing party count'}`}</p>
        </div>
    );
}

export default TrainerInfo;