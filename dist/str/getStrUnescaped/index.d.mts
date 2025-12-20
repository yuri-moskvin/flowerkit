/**
 * Unescapes HTML entities back to their characters.
 * Unescaped: `&amp; &lt; &gt; &quot; &#39;`
 * @param {string} str Source string
 * @returns {string} Unescaped string
 * @throws {TypeError} If str is not a string
 * @example
 * getStrUnescaped("&lt;b&gt;Hello &amp; world&lt;/b&gt;");
 * // => "<b>Hello & world</b>"
 */
export declare const getStrUnescaped: (str: string) => string;
