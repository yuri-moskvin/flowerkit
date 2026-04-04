import assert from "node:assert";
import { describe, test } from "node:test";
import { getIntersection } from "./index.ts";

describe(getIntersection.name, () => {
  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid first array argument
      getIntersection(null, [])
    );
    assert.throws(() =>
      getIntersection(
        [],
        // @ts-expect-error testing invalid second array argument
        false
      )
    );
  });

  test("Checks for empty arr", () => {
    assert.deepStrictEqual(getIntersection([], []), []);
  });

  test("Checks for intersections", () => {
    assert.deepStrictEqual(getIntersection([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ]);
    assert.deepStrictEqual(
      getIntersection([ null, 1, undefined ], [ "1", null, 1, null ]), [ null, 1 ]
    );
  });
});
