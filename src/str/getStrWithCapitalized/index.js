import ow from "ow";

/**
 * Gets a string with uppercase first letter
 * @param str{String} - source string
 * @return {string}
 * @example
 * // How to make first letter of a string uppercase?
 * const str = "hello world";
 * const upperStr = getStringWithCapitalizedFirstLetter(str);
 * console.log(upperStr); // => "Hello world"
 */
const getStrWithCapitalized = (str) => {

  ow(str, ow.string);

  if (str.length) {
    const trim = str.trim();
    return trim[0].toUpperCase() + trim.slice(1);
  } else {
    return "";
  }
};

export {
  getStrWithCapitalized
};
