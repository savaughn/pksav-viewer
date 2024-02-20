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
            <h3>{pkmn.nickname}</h3>
            <p>{`Level: ${pkmn.party_data.level}    stat | DV`}</p>
            <p>{`Max HP: ${pkmn.party_data.maxHp} | ${pkmn.pc_data.ivData[4]}`}</p>
            <p>{`Attack: ${pkmn.party_data.atk}   |  ${pkmn.pc_data.ivData[0]}`}</p>
            <p>{`Defense: ${pkmn.party_data.def}  |  ${pkmn.pc_data.ivData[1]}`}</p>
            <p>{`Speed: ${pkmn.party_data.spd}   |   ${pkmn.pc_data.ivData[2]}`}</p>
            <p>{`Special: ${pkmn.party_data.spcl}  |  ${pkmn.pc_data.ivData[3]}`}</p>
        </div>
    );
};

export default PkmnStats;
