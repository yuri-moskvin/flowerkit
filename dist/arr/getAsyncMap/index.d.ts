/**
 * Gets aggregated result of async operation for each element of given Array
 * @param arr{Array} - source array
 * @param callback{Function} - callback function
 * @return {Promise}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 * @example
 * // How to call API for each element of array and return result?
 * const myAPIFn = (item, index, arr) => Promise.resolve("success" + item);
 * const array = [ 1, 2, 3 ];
 * const result = await getAsyncMap(array, myAPIFn);
 * console.log(result); // => [ "success1", "success2, "success3" ]
 */
export function getAsyncMap(arr: any[], callback: Function): Promise<any>;
//# sourceMappingURL=index.d.ts.map