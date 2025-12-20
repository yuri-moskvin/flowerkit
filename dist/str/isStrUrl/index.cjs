Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Heuristically checks if a string looks like a URL or URL pathname. This is a permissive regex-based check and not a full URL validator.
 *
 * @param {string} str Source string
 * @returns {boolean} True if string looks like a URL/pathname
 * @throws {TypeError} isStrUrl: str must be a string
 * @example
 * isStrUrl("www.example.com"); // true
 * isStrUrl("file.php"); // true
 */const isStrUrl=str=>{if(typeof str!=="string")throw new TypeError("isStrUrl: str must be a string");
// eslint-disable-next-line security/detect-unsafe-regex
const res=str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g);return res!==null};exports.isStrUrl=isStrUrl;
//# sourceMappingURL=index.cjs.map
