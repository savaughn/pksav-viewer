import { useState, useEffect } from 'react';
import createmodule from '../pksav/pksav.mjs';
import { Module, PksavWasm } from '../types.ts';

const usePksavWasm = (): PksavWasm => {
  const [Module, setModule] = useState({} as Module);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);
  const [load_save_file, set_load_save_file] = useState(null);
  const [get_trainer_name, set_get_trainer_name] = useState(null);
  const [get_trainer_id, set_get_trainer_id] = useState(null);
  const [get_party_count, set_get_party_count] = useState(0);
  const [get_party_data, set_get_party_data] = useState(null);

  useEffect(() => {
    createmodule().then((module: Module) => {
      setModule(module);
      set_load_save_file(() => module.cwrap("load_save_file", "number", ["number", "string"]));
      set_get_trainer_name(() => module.cwrap("get_trainer_name", "number", ["number"]));
      set_get_trainer_id(() => module.cwrap("get_trainer_id", "string", ["number"]));
      set_get_party_count(() => module.cwrap("get_party_count", "number", ["number"]));
      set_get_party_data(() => module.cwrap("get_party_party_index", "number", ["number", "number", "number"]));
    })
      .then(() => setLoading(false))
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return {
    Module,
    loading,
    error, 
    load_save_file, 
    get_trainer_name, 
    get_trainer_id, 
    get_party_count, 
    get_party_data
  };
};

export default usePksavWasm;