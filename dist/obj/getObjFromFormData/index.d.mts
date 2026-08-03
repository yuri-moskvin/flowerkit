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
export declare const getObjFromFormData: (fd?: FormData) => TFormDataReturn;
export {};
