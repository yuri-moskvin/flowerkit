import assert from "node:assert";
import { describe, test } from "node:test";
import { getAsyncMap } from "./index.ts";

describe(getAsyncMap.name, () => {
  test("Checks for invalid args", async () => {
    await assert.rejects(
      // @ts-expect-error testing invalid array argument
      getAsyncMap(null, async () => 0), Error
    );
    await assert.rejects(
      getAsyncMap(
        [],
        // @ts-expect-error testing invalid callback argument
        0
      ), Error
    );
  });

  test("Checks for sync callback", async () => {
    const array1 = [ 1, 2, 3 ];
    const callback1 = (item: number) => item + 1;
    const result1 = await getAsyncMap(
      array1, callback1 as unknown as (v: number, i: number, a: number[]) => Promise<number>
    );

    assert.deepStrictEqual(result1, [ 2, 3, 4 ]);
  });

  test("Checks for async callback", async () => {
    const array2 = [ 1, 2, 3 ];
    const callback2 = (item: number) => Promise.reject(item);
    const result2 = getAsyncMap(array2, callback2);

    await assert.rejects(result2, (err) => err === 1);
  });

  test("Checks for empty array", async () => {
    const result = await getAsyncMap<number, void>([], async () => {});
    assert.deepStrictEqual(result, []);
  });
});
