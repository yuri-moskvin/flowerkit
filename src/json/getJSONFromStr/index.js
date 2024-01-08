import ow from "ow";

/**
 * Gets safely parsed JSON from string
 * @param str{String} - source string
 * @param reviver{Function=} - reviver function
 * @param onError{Function=} - error callback
 * @return {Object}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * @example
 * // How convert string to JSON?
 * const json = getJSONFromStr('{ "hello": "world" }');
 * console.log(json.hello) // => "world"
 */
const getJSONFromStr = (str, reviver, onError) => {

  ow(str, ow.string);
  ow(reviver, ow.optional.function);
  ow(onError, ow.optional.function);

  let json = {};

  try {
    json = JSON.parse(str, reviver);
  } catch (err) {
    if (typeof onError === "function") {
      onError(err);
    }
  }
  return json;
};

export {
  getJSONFromStr,
};
