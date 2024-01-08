import ow from"ow";
/**
 * Checks if a string written in kebab-case
 * @param str{String} - source string
 * @return {Boolean}
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case
 * @example
 * // How to check if a string is in Kebab-case?
 * const str = "my-string";
 * const isKebab = isStrInKebabCase(str);
 * console.log(isKebab); // => true
 */const isStrInKebabCase=str=>{ow(str,ow.string);const pattern=/^[a-z]+(?:-[a-z]+)*$/;return!!str.length&&pattern.test(str)};export{isStrInKebabCase};
//# sourceMappingURL=index.js.map
