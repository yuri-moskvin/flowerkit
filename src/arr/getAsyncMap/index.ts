/**
 * Gets an aggregated result of async operation for each element of given Array
 * @template T,U
 * @param {Array<T>} arr source array
 * @param {(value: T, index: number, array: T[]) => Promise<U>|U} callback callback function (can be sync or async)
 * @returns {Promise<Array<U>>}
 * @throws {TypeError} getAsyncMap: arr must be an array
 * @throws {TypeError} getAsyncMap: callback must be a function
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 * @example
 * // How to call API for each element of an array and return a result?
 * const myAPIFn = (item, index, arr) => Promise.resolve("success" + item);
 * const array = [ 1, 2, 3 ];
 * const result = await getAsyncMap(array, myAPIFn);
 * console.log(result); // => [ "success1", "success2, "success3" ]
 */
export const getAsyncMap = async <T, U>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => Promise<U> | U
): Promise<U[]> => {

  if (!Array.isArray(arr)) {
    return Promise.reject(new TypeError("getAsyncMap: arr must be an array"));
  }

  if (typeof callback !== "function") {
    return Promise.reject(new TypeError("getAsyncMap: callback must be a function"));
  }


  return await Promise.all(arr.map((v, i, a) => Promise.resolve(callback(v, i, a))));
};
