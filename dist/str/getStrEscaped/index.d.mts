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
 * @example
 * // Escape user-generated text before inserting it into an HTML template
 * const safeComment = `<p>${getStrEscaped(comment.text)}</p>`;
 */
export declare const getStrEscaped: (str: string) => string;
