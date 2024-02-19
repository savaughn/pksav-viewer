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

  useEffect(() => {
    createModule().then((Module) => {
      setModule(Module);
      set_load_save_file(() => Module.cwrap("load_save_file", "number", ["string"]));
    })
    .then(() => setLoading(false))
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []);

  return { Module, loading, error, load_save_file };
};

const App = () => {

  const { Module, loading, load_save_file } = usePksavWasm();
  const onChange = async (event) => {
    const filename = await loadFile(event.target, Module);
    load_save_file(filename);
  }

  if (loading) {
    return <div>Loading...</div>;
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
