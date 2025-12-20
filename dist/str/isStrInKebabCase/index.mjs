/**
 * Checks if a string is in kebab-case.
 * Rules:
 * Lowercase letters separated by single hyphens
 * No leading or trailing hyphen
 *
 * @param {string} str Source string
 * @returns {boolean} True if string is kebab-case
 * @throws {TypeError} If str is not a string
 * @example
 * isStrInKebabCase("good-kebab"); // true
 */
const isStrInKebabCase=str=>{if(typeof str!=="string")throw new TypeError("isStrInKebabCase: str must be a string");
// eslint-disable-next-line security/detect-unsafe-regex
const pattern=/^[a-z]+(?:-[a-z]+)*$/;return!!str.length&&pattern.test(str)};export{isStrInKebabCase};
//# sourceMappingURL=index.mjs.map
