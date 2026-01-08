export type TIsJSONArgs = Parameters<typeof isJSON>;
export type TIsJSONReturn = ReturnType<typeof isJSON>;
/**
 * Checks if a string is a valid JSON string
 * @param {string} str source String
 * @returns {boolean}
 * @example
 * // How to check if string is a JSON?
 * const str = '{ "hello": "world" }';
 * const isStrJSON = isJSON(str);
 * console.log(isStrJSON); // => true
 */
export declare const isJSON: (str: unknown) => boolean;
