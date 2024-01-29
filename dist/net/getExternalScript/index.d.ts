/**
 * Gets result of appending an async external script into the page
 * @param props{Object=} - options
 * @param props.isAsync{Boolean=} - `async` attribute
 * @param props.isDefer{Boolean=} - `defer` attribute
 * @param props.src{String} - script source
 * @param props.appendTo{Node|HTMLElement=} - element for script appending
 * @param props.id{String=} - ID for script
 * @param props.crossorigin{String=} - `crossorigin` attribute
 * @param props.type{String=} - `type` attribute
 * @return {Promise}
 * @example
 * // How to load external CDN script asynchronously?
 * getExternalScript({
 *    src: "https://ajax.googleapis.com/ajax/libs/d3js/7.8.5/d3.min.js",
 *    id: "d3"
 * })
 *   .then((script) => {
 *     console.log("Script is loaded");
 *   });
 */
export function getExternalScript(props?: any | undefined): Promise<any>;
//# sourceMappingURL=index.d.ts.map