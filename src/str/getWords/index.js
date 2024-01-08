import ow from "ow";

/**
 * Gets separated words from string
 * @param str{String} - source string
 * @return {String[]}
 * @example
 * // How do I split a string into a list of words?
 * const str = "helloWorld! what's_up?";
 * const words = getWords(str);
 * console.log(words); // => [ "hello", "World", "what", "s", "up" ]
 */
const getWords = (str) => {

  ow(str, ow.string);

  const nonCharRegex = /[^a-zA-Z]+/g;
  const camelCaseRegex = /([a-z])([A-Z])/g;

  const replacer = (_, char1, char2) => char1 + " " + char2;

  return str
    .replace(camelCaseRegex,  replacer)
    .split(nonCharRegex)
    .filter(word => !!word.length);

};

export {
  getWords
};
