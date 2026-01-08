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
const getStrEscaped=str=>{if(typeof str!=="string")throw new TypeError("getStrEscaped: str must be a string");const symbols={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};const regExp=/[&<>"']/g;const getEscaped=char=>symbols[char];return str.replace(regExp,getEscaped)};export{getStrEscaped};
//# sourceMappingURL=index.mjs.map
