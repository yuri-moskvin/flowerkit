type TSourceObject = Record<string, unknown>;
type TSetItemFunction = (name: string, value: unknown, fd: FormData) => void;
/**
 * Builds a FormData instance from a plain object.
 *
 * @param {Record<string, unknown>} [obj={}] Source object
 * @param {FormData} [fd=new FormData()] Existing FormData to append to
 * @param {(name: string, value: unknown, fd: FormData) => void} [setItem=setItemFn] Custom setter per entry
 * @returns {FormData} Result FormData
 * @throws {TypeError} getFormDataFromObj: expected an object
 * @example
 * const fd = getFormDataFromObj({ foo: 1, bar: "x" });
 * fd.get("foo"); // "1"
 */
export declare const getFormDataFromObj: (obj?: TSourceObject, fd?: FormData, setItem?: TSetItemFunction) => FormData;
export {};
