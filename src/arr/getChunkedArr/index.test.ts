import assert from "node:assert";
import { describe, test } from "node:test";
import { getChunkedArr } from "./index.ts";

describe(getChunkedArr.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid array argument
    assert.throws(() => getChunkedArr(null, 2), TypeError);
    assert.throws(() => getChunkedArr([], 0), TypeError);
    assert.throws(() => getChunkedArr([], 1.5), TypeError);
  });

  test("Splits without mutating the source", () => {
    const source = [ 1, 2, 3, 4, 5 ];
    assert.deepStrictEqual(getChunkedArr(source, 2), [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]);
    assert.deepStrictEqual(source, [ 1, 2, 3, 4, 5 ]);
    assert.deepStrictEqual(getChunkedArr([], 2), []);
  });
});
