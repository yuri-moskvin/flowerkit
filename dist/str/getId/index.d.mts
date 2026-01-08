export type TGetIdArgs = Parameters<typeof getId>;
export type TGetIdReturn = ReturnType<typeof getId>;
/**
 * Gets unique string ID.
 * @param length{Number=} length of ID
 * @returns {string}
 * @throws {TypeError} getId: length must be a positive finite integer
 * @example
 * // How to generate unique string ID?
 * const uniqueId = getId(100);
 * console.log(uniqueId.length); // 100
 */
export declare const getId: (length?: number) => string;
