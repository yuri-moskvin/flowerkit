/**
 * Gets an object with fixed keys and values
 * @param data{Object} - source data
 * @param rules{Object=} - rules for fix (see example)
 * @param fallbacks{Object=} - fallback for each type of values
 * @return {Object}
 * @example
 * // How to replace object props and values with own fallback data?
 * const uglyObjectFromAPI = {
 *   userId: 123,
 *   has_access: 0,
 *   something: "",
 *   price: "500.05",
 *   wrongPrice: "500,05",
 *   custom: []
 * };
 *
 * const niceRules =  {
 *   userId: {
 *     output: "idUser",
 *     type: "string"
 *   },
 *   has_access: {
 *     output: "isAccess",
 *     type: "boolean"
 *   },
 *   something: {
 *     output: "something",
 *     fallback: "—"
 *   },
 *   price: {
 *     output: "price",
 *     type: "number"
 *   },
 *   wrongPrice: {
 *     output: "wrongPrice",
 *     type: "number"
 *   },
 *   custom: {
 *     output: "custom",
 *     getValue: (value, fallback) => Array.isArray(value) ? "custom value" : value
 *   }
 * }
 *
 * const result = getObjWithFallbacks(uglyObjectFromAPI, niceRules);
 * console.log(result); // =>
 * // {
 * //  idUser: "123",
 * //  isAccess: false,
 * //  something: "—",
 * //  price: 500.05,
 * //  wrongPrice: 0,
 * //  custom: "custom value"
 * // }
 */
export function getObjWithFallbacks(data: any, rules?: any | undefined, fallbacks?: any | undefined): any;
//# sourceMappingURL=index.d.ts.map