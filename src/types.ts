export interface PkmnPcData {
  species: number;    // 0x0
  currentHp: number;  // 0x1
  level: number;      // 0x3
  condition: number;  // 0x4
  types: number[];    // 0x5
  catchRate: number;  // 0x7
  moves: number[];    // 0x8
  otId: number;       // 0xC
  exp: number;        // 0xE
  evHp: number;       // 0x11
  evAtk: number;      // 0x13
  evDef: number;      // 0x15
  evSpd: number;      // 0x17
  evSpcl: number;     // 0x19
  ivData: number[];     // 0x1B
  movePp: number[];   // 0x1D
};  // 0x21

export interface PkmnPartyData {
  level: number;      // 0x0
  maxHp: number;      // 0x1
  atk: number;        // 0x3
  def: number;        // 0x5
  spd: number;        // 0x7
  spcl?: number;       // 0x9
  spatk?: number;      
  spdef?: number;
}  // 0xB

export type PkmnStats = {
  nickname: string;
  dexId: number;
  pc_data: PkmnPcData;
  party_data: PkmnPartyData;
  generation: number;
};

export interface GameData {
  trainerName: string;
  trainerId: string;
  partyCount: number;
  party: PkmnStats[];
}

export type Module = {
  _free(malloc: number): void;
  HEAPU8: any;
  HEAPU16: any;
  ccall(arg0: string, arg1: string, arg2: string[], arg3: any): any;
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
  get_save_generation: (_data: number) => number | null;
  get_trainer_name: (_data: number, _gen: number) => number | null;
  get_trainer_id: (_data: number, _gen: number) => number | null;
  get_party_count: (_data: number) => number;
  get_party_data: (_data: number, _partyIndex: number, _partyStruct: number) => number | null;
  get_pkmn_dvs: (_data: number, _partyIndex: number, _dvDataStruct: number) => number | null;
  get_pkmn_nickname: (_data: number, _partyIndex: number) => number | null;
  get_pkdex_entry: (_data: number, _partyIndex: number) => number | null;
};