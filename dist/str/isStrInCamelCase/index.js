import ow from"ow";
/**
 * Checks if string written in camelCase
 * @param str{String} - source string
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Camel_case
 * @example
 * // How to check if CSS class in camelCase style?
 * const classname = "myClass";
 * const isCamel = isStrInCamelCase(className);
 * console.log(isCamel); // => true
 */const isStrInCamelCase=str=>{ow(str,ow.string);return!!str.length&&/^([a-z]+)(([A-Z]([a-z]+))+)$/.test(str)};export{isStrInCamelCase};
//# sourceMappingURL=index.js.map
