import fs from "fs/promises";

/**
 * Returns an array of all folders in a directory using the `fs/promises` module.
 * @returns {string[]}
 */
export const getFolders = async (path: string): Promise<string[]> => {
  /* eslint-disable security/detect-non-literal-fs-filename */
  const entries = await fs.readdir(path, { withFileTypes: true });
  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return directories;
};
