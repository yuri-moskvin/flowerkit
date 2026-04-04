import assert from "node:assert";
import { describe, test } from "node:test";
import { getDiff } from "./index.ts";

describe(getDiff.name, () => {
  test("Checks for invalid args", () => {
    // @ts-expect-error (testing)
    assert.throws(() => getDiff(null, null));
    // @ts-expect-error (testing)
    assert.throws(() => getDiff([], false));
  });

  test("Checks for empty arr", () => {
    assert.deepStrictEqual(getDiff([], []), []);
  });

  test("Checks for diffs", () => {
    assert.deepStrictEqual(
      getDiff([ undefined, null ], [ undefined, 1, null ]), [ 1 ]
    );
    assert.deepStrictEqual(getDiff([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1, 4 ]);
  });
});
