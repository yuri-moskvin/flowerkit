import ow from"ow";
/**
 * Checks if a string written in snake_case
 * @param str{String} - source string
 * @return {Boolean}
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Snake_case
 * @example
 * // How to check if a string is in snake_case?
 * const str = "my_string";
 * const isSnake = isStrInSnakeCase(str);
 * console.log(isSnake); // => true
 */const isStrInSnakeCase=str=>{ow(str,ow.string);const pattern=/^[a-z]+(?:_[a-z]+)*$/;return!!str.length&&pattern.test(str)};export{isStrInSnakeCase};
//# sourceMappingURL=index.js.map
