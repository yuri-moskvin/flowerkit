import { getAsyncMap } from "./index.js";

describe(getAsyncMap.name, () => {

  test("Checks for invalid args", async () => {
    expect(() => getAsyncMap(null)).rejects.toThrow();
    expect(() => getAsyncMap([], 0)).rejects.toThrow();
  });

  test("Checks for sync callback", async () => {
    const array1 = [ 1, 2, 3 ];
    const callback1 = (item, index, array) => item + 1;
    const result1 = getAsyncMap(array1, callback1);

    await expect(result1).resolves.toStrictEqual([ 2, 3, 4 ]);
  });

  test("Checks for async callback", async () => {
    const array2 = [ 1, 2, 3 ];
    const callback2 = (item, index, array) => Promise.reject(item);
    const result2 = getAsyncMap(array2, callback2);

    await expect(result2).rejects.toBe(1);
  });

  test("Checks for empty array", async () => {
    await expect(getAsyncMap([], () => {})).rejects.toStrictEqual([]);
  });

});
