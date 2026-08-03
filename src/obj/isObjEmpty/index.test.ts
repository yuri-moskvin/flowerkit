import assert from "node:assert";
import { describe, test } from "node:test";
import { isObjEmpty } from "./index.ts";

describe(isObjEmpty.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      isObjEmpty("moo")
    );
    assert.throws(() =>
      isObjEmpty(1)
    );
    assert.throws(() =>
      isObjEmpty(null)
    );
  });

  test("Checks for plain objects", () => {
    const obj1 = {
      key1: "value1",
      key2: "value2",
    };
    const obj2 = {};
    assert.strictEqual(isObjEmpty(obj1), false);
    assert.strictEqual(isObjEmpty(obj2), true);
    assert.strictEqual(isObjEmpty(Object.create(null)), true);
  });

  test("Checks for arrays", () => {
    const arr1 = [ 1, 2 ];
    const arr2: any[] = [];
    assert.strictEqual(isObjEmpty(arr1 as any), false);
    assert.strictEqual(isObjEmpty(arr2 as any), true);
  });


});
