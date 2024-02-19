export type PartyMember = {
    species: string;
    level: number;
    exp: number;
    hp: number;
    maxHp: number;
    attack: number;
    defense: number;
    speed: number;
    special: number;
    moves: string[];
  };
  
  export interface GameData {
    trainerName: string;
    trainerId: string;
    partyCount: number;
    party: PartyMember[];
    loaded: boolean;
  }

  export type Module = {
    _malloc: (size: number) => number;
    cwrap: (name: string, returnType: string, argTypes: string[]) => any;
    FS_createDataFile: (path: string, name: string, data: Uint8Array, canRead: boolean, canWrite: boolean, canOwn: boolean) => void;
    UTF8ToString: (ptr: number, maxBytesToRead: number) => string;
  };

  export type PksavWasm = {
    Module: Module;
    loading: boolean;
    error: string | null;
    load_save_file: (_data: number, _filename: string) => number | null;
    get_trainer_name: (_data: number) => number | null;
    get_trainer_id: (_data: number) => number | null;
  };