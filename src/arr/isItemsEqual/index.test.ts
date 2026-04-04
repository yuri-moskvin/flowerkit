import assert from "node:assert";
import { describe, test } from "node:test";
import { isItemsEqual } from "./index.ts";

describe(isItemsEqual.name, () => {
  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid array argument
      isItemsEqual({})
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid array argument
      isItemsEqual(null)
    );
  });

  test("Checks for equivalency", () => {
    assert.strictEqual(isItemsEqual([ 1, 2, 3 ]), false);
    assert.strictEqual(isItemsEqual([ 1, 1, 1 ]), true);
    assert.strictEqual(isItemsEqual([ {}, {} ]), false);
    assert.strictEqual(isItemsEqual([ null, undefined ]), false);
  });

  test("Checks for empty arr", () => {
    assert.strictEqual(isItemsEqual([]), true);
  });
});
