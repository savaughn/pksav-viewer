
const loadFile = (fileInput: HTMLInputElement, Module: any) => {
    if (fileInput?.files?.length === 0) {
        return Promise.resolve();
    }
    const ROOT_PATH = '/';
    const [file] = fileInput.files ?? [];
    const fileReader = new FileReader();

    const addFileToFS = (resolve: (value: string) => void, reject: (reason: Error) => void) => {
        fileReader.onload = function () {
            const data = new Uint8Array(fileReader?.result as ArrayBuffer);
            Module.FS_createDataFile(ROOT_PATH, file.name, data, true, true, true);
            // TODO: check if file exists
            // if (!exists) {
            //   reject(new Error(`Failed to load file ${file.name}`));
            // }
            fileInput.value = '';
            resolve(file.name);
        };

        fileReader.readAsArrayBuffer(file);
    }

    return new Promise(addFileToFS);
};

export default loadFile;