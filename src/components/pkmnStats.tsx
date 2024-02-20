import React from 'react';

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

export default PkmnStats;
