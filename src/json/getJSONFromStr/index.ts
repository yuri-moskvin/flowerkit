/**
 * Safely parses a JSON string.
 *
 * @template T
 * @param {string} str Source string to parse
 * @param {(this: any, key: string, value: any) => any} [reviver] Optional reviver function
 * @param {(err: unknown) => void} [onError] Optional error callback
 * @returns {T | Record<string, never>} Parsed object or empty object on error
 * @throws {TypeError} getJSONFromStr: str must be a string
 * @throws {TypeError} getJSONFromStr: reviver must be a function if provided
 * @throws {TypeError} getJSONFromStr: onError must be a function if provided
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * @example
 * // How to convert string to JSON?
 * const json = getJSONFromStr<{ hello: string }>('{"hello":"world"}');
 * console.log(json.hello); // => "world"
 */
export const getJSONFromStr = <T = unknown>(
  str: string,
  reviver?: (this: any, key: string, value: any) => any,
  onError?: (err: unknown) => void
): T | Record<string, never> => {
  if (typeof str !== "string") {
    throw new TypeError("getJSONFromStr: str must be a string");
  }
  if (typeof reviver !== "undefined" && typeof reviver !== "function") {
    throw new TypeError("getJSONFromStr: reviver must be a function if provided");
  }
  if (typeof onError !== "undefined" && typeof onError !== "function") {
    throw new TypeError("getJSONFromStr: onError must be a function if provided");
  }

  let json: T | Record<string, never> = {};

  try {
    json = JSON.parse(str, reviver) as T;
  } catch (err) {
    if (typeof onError === "function") {
      onError(err);
    }
  }

  return json;
};
