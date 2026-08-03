export type TGetChunkedArrArgs = Parameters<typeof getChunkedArr>;

export type TGetChunkedArrReturn = ReturnType<typeof getChunkedArr>;

/**
 * Splits an array into chunks of a fixed size without mutating the source.
 * @template T
 * @param {T[]} arr Source array
 * @param {number} size Maximum number of items in each chunk
 * @returns {T[][]} Array of chunks
 * @throws {TypeError} getChunkedArr: arr must be an array
 * @throws {TypeError} getChunkedArr: size must be a positive integer
 * @example
 * getChunkedArr([ 1, 2, 3, 4, 5 ], 2); // [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
 * @example
 * // Split products into rows of three cards for a responsive grid
 * const productRows = getChunkedArr(products, 3);
 */
export const getChunkedArr = <T>(arr: T[], size: number): T[][] => {
  if (!Array.isArray(arr)) {
    throw new TypeError("getChunkedArr: arr must be an array");
  }
  if (!Number.isInteger(size) || size <= 0) {
    throw new TypeError("getChunkedArr: size must be a positive integer");
  }

  const result: T[][] = [];
  for (let index = 0; index < arr.length; index += size) {
    result.push(arr.slice(index, index + size));
  }
  return result;
};
