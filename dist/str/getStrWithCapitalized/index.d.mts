export type TGetStrWithCapitalizedArgs = Parameters<typeof getStrWithCapitalized>;
export type TGetStrWithCapitalizedReturn = ReturnType<typeof getStrWithCapitalized>;
/**
 * Gets a string with uppercase first letter
 * @param str{string} source string
 * @returns {string} String with first character uppercased
 * @throws {TypeError} If str is not a string
 * @example
 * getStrWithCapitalized("hello world"); // "Hello world"
 */
export declare const getStrWithCapitalized: (str: string) => string;
