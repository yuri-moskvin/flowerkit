import assert from "node:assert";
import { describe, test } from "node:test";
import { getMinFromArr } from "./index.ts";

describe(getMinFromArr.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid array argument
      getMinFromArr("1")
    );
    assert.throws(() =>
      getMinFromArr([])
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid array with strings argument
      getMinFromArr([ "10", "20", "30" ])
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid array with null argument
      getMinFromArr([ 1, null ])
    );
  });

  test("Checks for arrays of numbers", () => {
    assert.strictEqual(getMinFromArr([ 10, 20, 30 ]), 10);
    assert.strictEqual(getMinFromArr([ 10, Infinity, 30 ]), 10);
  });

});
