import { useState, useCallback } from 'react';
import { GameData } from '../types';

const useTrainerInfo = () => {
    const [trainerInfo, setTrainerInfo] = useState({ loaded: false } as GameData);

    const loadedCallback = useCallback((data: GameData) => {
        setTrainerInfo(data);
    }, []);

    return { trainerInfo, onFileLoaded: loadedCallback };
};

export default useTrainerInfo;