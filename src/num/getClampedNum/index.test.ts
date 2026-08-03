import assert from "node:assert";
import { describe, test } from "node:test";
import { getClampedNum } from "./index.ts";

describe(getClampedNum.name, () => {
  test("Checks validation", () => {
    assert.throws(() => getClampedNum(Number.NaN, 0, 1), TypeError);
    assert.throws(() => getClampedNum(1, 2, 0), RangeError);
  });

  test("Clamps values to the range", () => {
    assert.strictEqual(getClampedNum(-1, 0, 10), 0);
    assert.strictEqual(getClampedNum(5, 0, 10), 5);
    assert.strictEqual(getClampedNum(12, 0, 10), 10);
  });
});
