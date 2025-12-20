import { getAsyncMap } from "./index.ts";

describe(getAsyncMap.name, () => {
  test("Checks for invalid args", async () => {
    await expect(getAsyncMap(null as unknown as any[], async () => 0)).rejects.toThrow();
    await expect(getAsyncMap([], 0 as unknown as any)).rejects.toThrow();
  });

  test("Checks for sync callback", async () => {
    const array1 = [ 1, 2, 3 ];
    const callback1 = (item: number) => item + 1;
    const result1 = getAsyncMap(array1, callback1 as unknown as (v: number, i: number, a: number[]) => Promise<number>);

    await expect(result1).resolves.toStrictEqual([ 2, 3, 4 ]);
  });

  test("Checks for async callback", async () => {
    const array2 = [ 1, 2, 3 ];
    const callback2 = (item: number) => Promise.reject(item);
    const result2 = getAsyncMap(array2, callback2);

    await expect(result2).rejects.toBe(1);
  });

  test("Checks for empty array", async () => {
    await expect(getAsyncMap<number, void>([], async () => {})).resolves.toStrictEqual([]);
  });
});
