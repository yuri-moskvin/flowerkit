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
export function getJSONFromStr(str: string, reviver?: Function | undefined, onError?: Function | undefined): any;
//# sourceMappingURL=index.d.ts.map