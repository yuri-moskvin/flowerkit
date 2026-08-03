type TFormDataEntryValue = string | File;
type TFormDataReturn = Record<string, TFormDataEntryValue | TFormDataEntryValue[]>;

export type TGetObjFromFormDataArgs = Parameters<typeof getObjFromFormData>;

export type TGetObjFromFormDataReturn = ReturnType<typeof getObjFromFormData>;

/**
 * Gets an object from `FormData` interface
 * @param {FormData} [fd=new FormData()] Source `FormData` instance
 * @returns {Record<string, string|File|(string|File)[]>} Object representation
 * @throws {TypeError} getObjFromFormData: fd must be a FormData instance
 * @example
 * // How to convert `FormData` to object?
 * const fd = new FormData();
 * fd.append("test", "val");
 * getObjFromFormData(fd); // { test: "val" }
 * @example
 * // Convert repeated checkbox values into an array
 * const filters = new FormData();
 * filters.append("category", "books");
 * filters.append("category", "games");
 * getObjFromFormData(filters); // { category: [ "books", "games" ] }
 */
export const getObjFromFormData = (fd: FormData = new FormData()): TFormDataReturn => {
  if (!(fd instanceof FormData)) {
    throw new TypeError("getObjFromFormData: fd must be a FormData instance");
  }

  const entries: [string, TFormDataEntryValue | TFormDataEntryValue[]][] = [ ...fd ].map(([ name, value ]) => {
    const values = fd.getAll(name) as TFormDataEntryValue[];
    return [ name, values.length > 1 ? values : value as TFormDataEntryValue ];
  });

  return Object.fromEntries(entries);
};
