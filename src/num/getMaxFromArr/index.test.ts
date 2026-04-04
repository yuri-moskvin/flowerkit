import assert from "node:assert";
import { describe, test } from "node:test";
import { getMaxFromArr } from "./index.ts";

describe(getMaxFromArr.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid array argument
      getMaxFromArr("1")
    );
    assert.throws(() =>
      getMaxFromArr([])
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid array with strings argument
      getMaxFromArr([ "10", "20", "30" ])
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid array with null argument
      getMaxFromArr([ 1, null ])
    );
  });

  test("Checks for arrays of numbers", () => {
    assert.strictEqual(getMaxFromArr([ 10, 20, 30 ]), 30);
    assert.strictEqual(getMaxFromArr([ 10, Infinity, 30 ]), Infinity);
  });

});
