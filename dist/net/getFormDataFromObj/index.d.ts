/**
 * Gets FormData from object
 * @param obj{Object=} - source object
 * @param fd{FormData=} - FormData instance
 * @param setItem{Function=} - callback for each object key/value pair
 * @return {FormData}
 * @example
 * // How to convert object to FormData interface?
 * const obj = {
 *   test: 123,
 *   boo: "foo"
 * }
 *
 * getFormDataFromObj(obj); // FormData with "test" and "boo" keys
 *
 * // With custom callback
 * getFormDataFromObj(obj, new FormData(), (name, value, fd) => {
 *   if(name !== "test") {
 *      fd.set(name, value);
 *   }
 * }); // FormData only with "boo" key
 */
export function getFormDataFromObj(obj?: any | undefined, fd?: FormData | undefined, setItem?: Function | undefined): FormData;
//# sourceMappingURL=index.d.ts.map