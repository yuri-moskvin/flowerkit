type TSourceObject = Record<string, unknown>;
type TSetItemFunction = (name: string, value: unknown, fd: FormData) => void;

const setItemFn: TSetItemFunction = (name = "", value, fd = new FormData()) => {
  fd.set(name, value?.toString?.() ?? String(value ?? ""));
};

export type TGetFormDataFromObjArgs = Parameters<typeof getFormDataFromObj>;

export type TGetFormDataFromObjReturn = ReturnType<typeof getFormDataFromObj>;

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
export const getFormDataFromObj = (
  obj: TSourceObject = {},
  fd: FormData = new FormData(),
  setItem: TSetItemFunction = setItemFn
): FormData => {

  if (typeof obj !== "object" || !obj) {
    throw new TypeError("getFormDataFromObj: obj must be an object");
  }

  if (!(fd instanceof FormData)) {
    throw new TypeError("getFormDataFromObj: fd must be an instance of FormData");
  }

  if (typeof setItem !== "function") {
    throw new TypeError("getFormDataFromObj: setItem must be a function");
  }

  Object.entries(obj).forEach(([ name, value ]) => {
    setItem(name, value, fd);
  });

  return fd;
};
