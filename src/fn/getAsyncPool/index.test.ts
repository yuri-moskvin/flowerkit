import assert from "node:assert";
import { describe, test } from "node:test";
import { getAsyncPool } from "./index.ts";

describe(getAsyncPool.name, () => {
  test("Checks validation", async () => {
    // @ts-expect-error testing invalid array argument
    await assert.rejects(getAsyncPool(null, async () => 0), TypeError);
    // @ts-expect-error testing invalid callback argument
    await assert.rejects(getAsyncPool([], null), TypeError);
    await assert.rejects(getAsyncPool([], async () => 0, 0), TypeError);
  });

  test("Limits concurrency and preserves result order", async () => {
    let active = 0;
    let peak = 0;
    const result = await getAsyncPool([ 30, 5, 10, 1 ], async (delay, index) => {
      active += 1;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, delay));
      active -= 1;
      return index;
    }, 2);
    assert.deepStrictEqual(result, [ 0, 1, 2, 3 ]);
    assert.strictEqual(peak, 2);
  });
});
