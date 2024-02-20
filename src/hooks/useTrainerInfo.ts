import { useState, useCallback } from 'react';
import { GameData } from '../types';

const useTrainerInfo = () => {
    const [trainerInfo, setTrainerInfo] = useState();
    const [loading, setLoading] = useState(true);
    const loadedCallback = useCallback((data: GameData) => {
        setTrainerInfo(data);
        setLoading(false);
    }, []);

    return { trainerInfo, onFileLoaded: loadedCallback, loading };
};

export default useTrainerInfo;