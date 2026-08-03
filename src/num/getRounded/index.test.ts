import assert from "node:assert";
import { describe, test } from "node:test";
import { getRounded } from "./index.ts";

describe(getRounded.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() => getRounded(NaN));
    assert.throws(() => getRounded(10, -1));
    assert.throws(() => getRounded(10, Infinity));
    assert.throws(() => getRounded(10, 1.5));
    assert.throws(() => getRounded(Infinity));
  });

  test("Checks for problematic rounding cases", () => {
    assert.strictEqual(getRounded(10.999, 1), 11);
    assert.strictEqual(getRounded(10.0999, 2), 10.1);
    assert.strictEqual(getRounded(10.0999, 0), 10);
    assert.strictEqual(getRounded(-10.005, 1), -10);
    assert.strictEqual(getRounded(0.00025, 4), 0.0003);
    assert.strictEqual(getRounded(10.299999, 3), 10.3);
  });

});
