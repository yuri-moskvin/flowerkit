Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Splits a string into words:
 * Splits camelCase boundaries: "helloWorld" -> "hello World"
 * Removes non-letter separators
 *
 * @param {string} str Source string
 * @returns {string[]} Array of words (letters-only segments)
 * @throws {TypeError} If str is not a string
 * @example
 * getWords("helloWorld! what's_up?"); // ["hello","World","what","s","up"]
 */const getWords=str=>{if(typeof str!=="string")throw new TypeError("getWords: str must be a string");const nonCharRegex=/[^a-zA-Z]+/g;const camelCaseRegex=/([a-z])([A-Z])/g;const replacer=(_,a,b)=>a+" "+b;return str.replace(camelCaseRegex,replacer).split(nonCharRegex).filter((word=>word.length>0))};exports.getWords=getWords;
//# sourceMappingURL=index.cjs.map
