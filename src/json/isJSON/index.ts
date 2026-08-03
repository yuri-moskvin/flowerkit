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
export const isJSON = (str: unknown): boolean => {
  if (typeof str === "string" && str.length) {
    try {
      JSON.parse(str);
      return true;
      // eslint-disable-next-line no-unused-vars
    } catch (_err) {
      return false;
    }
  }
  return false;
};
