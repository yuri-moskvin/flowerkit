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
 * @example
 * // Validate JSON entered into a configuration editor before saving
 * saveButton.disabled = !isJSON(editor.value);
 */
export declare const isJSON: (str: unknown) => boolean;
