/**
 * Gets a string with uppercase first letter
 * @param str{string} source string
 * @returns {string} String with first character uppercased
 * @throws {TypeError} If str is not a string
 * @example
 * getStrWithCapitalized("hello world"); // "Hello world"
 */
const getStrWithCapitalized=str=>{if(typeof str!=="string")throw new TypeError("getStrWithCapitalized: str must be a string");if(!str.length)return"";const trimmed=str.trim();if(!trimmed)return"";return trimmed[0].toUpperCase()+trimmed.slice(1)};export{getStrWithCapitalized};
//# sourceMappingURL=index.mjs.map
