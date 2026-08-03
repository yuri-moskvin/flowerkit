export type TGetIdArgs = Parameters<typeof getId>;
export type TGetIdReturn = ReturnType<typeof getId>;
/**
 * Gets unique string ID.
 * @param length{number=} length of ID
 * @returns {string}
 * @throws {TypeError} getId: length must be a positive finite integer
 * @example
 * // How to generate unique string ID?
 * const uniqueId = getId(100);
 * console.log(uniqueId.length); // 100
 * @example
 * // Generate an id for linking a form label to its input
 * const inputId = `email-${getId(8)}`;
 * label.htmlFor = inputId;
 * input.id = inputId;
 */
export declare const getId: (length?: number) => string;
