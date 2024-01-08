import ow from "ow";

/**
 * Gets a string with replaced special chars on their HTML entities.
 * @param str{String} - source string
 * @return {string}
 * @example
 * // How to escape special HTML characters?
 * const str = "<b>Hello world & underworld!</b>";
 * const escaped = getStrEscaped(str);
 * console.log(escaped); // => "&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;"
 */
const getStrEscaped = (str) => {

  ow(str, ow.string);

  const symbols = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  };

  const regExp = /[&<>"']/g;

  const getEscaped = (char) => symbols[char];

  return str.replace(regExp, getEscaped);
};

export {
  getStrEscaped,
};
