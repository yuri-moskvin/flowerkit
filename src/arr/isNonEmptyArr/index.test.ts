import assert from "node:assert";
import { describe, test } from "node:test";
import { isNonEmptyArr } from "./index.ts";

describe(isNonEmptyArr.name, () => {
  test("Checks for non-empty array", () => {
    assert.strictEqual(isNonEmptyArr([ 1 ]), true);
    assert.strictEqual(isNonEmptyArr([]), false);
    assert.strictEqual(isNonEmptyArr(undefined), false);
    assert.strictEqual(isNonEmptyArr({}), false);
    assert.strictEqual(isNonEmptyArr(null), false);
    assert.strictEqual(isNonEmptyArr(new Set() as any), false);
  });
});
