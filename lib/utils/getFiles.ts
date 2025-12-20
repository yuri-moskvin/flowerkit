import fs from "fs/promises";
import path from "path";

/**
 * Returns an array of all files in a directory using the `fs/promises` module.
 * @param dir {string} - Directory path.
 * @param getFilterFn {Function=} - Optional file filter function; receives a file path and should return a boolean.
 * @returns {Promise<string[]>} - Array of matched file paths.
 */
const getFiles = async (dir: string = "", getFilterFn: Function | undefined = (file: string) => true): Promise<string[]> => {

  return new Promise(async (resolve, reject) => {

    if (!dir) {
      return reject(new Error("[getFilesWithFS] Directory not found"));
    }

    async function* getFileFromDir(dir: string): AsyncGenerator<string> {
      const dirs = await fs.readdir(dir, { withFileTypes: true });
      for (const dirent of dirs) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
          yield* getFileFromDir(res);
        } else {
          yield res;
        }
      }
    }

    const files: string[] = [];

    for await (const file of getFileFromDir(dir)) {
      if (getFilterFn(file)) {
        files.push(file);
      }
    }
    return resolve(files);

  });


};

export { getFiles };
