import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjLength } from "./index.ts";

describe(getObjLength.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid obj argument
      getObjLength("moo")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid obj argument
      getObjLength(null)
    );
  });

  test("Checks for non-empty object", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
    };
    assert.strictEqual(getObjLength(obj), 2);
  });

  test("Checks for Arrays", () => {
    const arr = [ 1, 2 ];
    assert.strictEqual(getObjLength(arr as any), 2);
  });

  test("Checks for empty object", () => {
    const obj = {};
    assert.strictEqual(getObjLength(obj), 0);
  });

});
