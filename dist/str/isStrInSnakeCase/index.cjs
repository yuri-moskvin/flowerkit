Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Checks if a string is in snake_case.
 * Rules:
 * Lowercase letters separated by single underscores
 * No leading or trailing underscore
 *
 * @param {string} str Source string
 * @returns {boolean} True if string is snake_case
 * @throws {TypeError} If str is not a string
 * @example
 * isStrInSnakeCase("good_snake"); // true
 */const isStrInSnakeCase=str=>{if(typeof str!=="string")throw new TypeError("isStrInSnakeCase: str must be a string");
// eslint-disable-next-line security/detect-unsafe-regex
const pattern=/^[a-z]+(?:_[a-z]+)*$/;return!!str.length&&pattern.test(str)};exports.isStrInSnakeCase=isStrInSnakeCase;
//# sourceMappingURL=index.cjs.map
