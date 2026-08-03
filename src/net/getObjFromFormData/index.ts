import { getObjFromFormData as getObjFromFormDataInternal } from "../../obj/getObjFromFormData/index.ts";

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
 * // Preserve repeated checkbox values when converting a form submission
 * const data = new FormData(form);
 * const values = getObjFromFormData(data);
 * console.log(values.category); // string, File, or an array of repeated values
 */
export const getObjFromFormData = getObjFromFormDataInternal;
