export type TGetStrEscapedArgs = Parameters<typeof getStrEscaped>;
export type TGetStrEscapedReturn = ReturnType<typeof getStrEscaped>;
/**
 * Escapes special HTML characters to their corresponding entities.
 * Escaped: `& < > " '`
 * @param {string} str Source string
 * @returns {string} Escaped string safe for HTML text context
 * @throws {TypeError} If str is not a string
 * @example
 * getStrEscaped('<b>Hello & "world"</b>');
 * // => "&lt;b&gt;Hello &amp; &quot;world&quot;&lt;/b&gt;"
 */
export declare const getStrEscaped: (str: string) => string;
