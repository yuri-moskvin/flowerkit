import assert from "node:assert";
import { describe, test } from "node:test";
import { getUnion } from "./index.ts";

describe(getUnion.name, () => {
  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid first array argument
      getUnion(null, [])
    );
    assert.throws(() =>
      getUnion(
        [],
        // @ts-expect-error testing invalid second array argument
        ""
      )
    );
  });

  test("Checks for union values", () => {
    assert.deepStrictEqual(
      getUnion([ 1, 2, 3 ], [ 4, 5, 6, 7 ]), [ 1, 2, 3, 4, 5, 6, 7 ]
    );
    assert.deepStrictEqual(
      getUnion([ null, undefined, 0 ], [ null, undefined, 0 ]), [ null, undefined, 0 ]
    );
  });

  test("Checks empty arrays", () => {
    assert.deepStrictEqual(getUnion([], []), []);
  });
});
