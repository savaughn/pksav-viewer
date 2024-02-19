import React, { useState, useEffect } from 'react';
import createModule from './pksav/pksav.mjs';

const loadFile = (fileInput, Module) => {
  if (fileInput.files.length === 0) {
    return Promise.resolve();
  }
  const ROOT_PATH = '/';
  const [file] = fileInput.files;
  const fileReader = new FileReader();

  return new Promise((resolve) => {
    fileReader.onload = function () {
      const data = new Uint8Array(fileReader.result);
      Module.FS_createDataFile(ROOT_PATH, file.name, data, true, true, true);
      fileInput.value = '';
      resolve(file.name);
    };

    fileReader.readAsArrayBuffer(file);
  });
};

const usePksavWasm = () => {
  const [Module, setModule] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [load_save_file, set_load_save_file] = useState(() => {});
  const [get_trainer_name, set_get_trainer_name] = useState(() => {});

  useEffect(() => {
    createModule().then((Module) => {
      setModule(Module);
      set_load_save_file(() => Module.cwrap("load_save_file", "number", ["number","string"]));
      set_get_trainer_name(() => Module.cwrap("get_trainer_name", "number", ["number"]));
    })
    .then(() => setLoading(false))
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []);

  return { Module, loading, error, load_save_file, get_trainer_name };
};

const App = () => {

  const { Module, loading, error, load_save_file, get_trainer_name } = usePksavWasm();
  const onChange = async (event) => {
    const filename = await loadFile(event.target, Module);
    const pkmnSave = Module._malloc(0x8000);
    let error = load_save_file(pkmnSave, filename);
    if (error) {
      console.error("Error loading save file:", error);
      return;
    }
    const name = get_trainer_name(pkmnSave);
    if (error) {
      console.error("Error getting trainer name JS:", error);
      return;
    }
    console.log({name: Module.UTF8ToString(name, 8)});
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <input type="file" id="file" name="file"
        onChange={onChange}
      />
    </div>
  );
};

export default App;
