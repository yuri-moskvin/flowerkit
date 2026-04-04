import assert from "node:assert";
import { describe, test } from "node:test";
import { isObjPromise } from "./index.ts";

describe(isObjPromise.name, () => {

  test("Checks for default objects", () => {
    const obj = {};
    const fn = function() {};
    const str = "str";
    const nullish = null;
    assert.strictEqual(isObjPromise(nullish as any), false);
    assert.strictEqual(isObjPromise(str as any), false);
    assert.strictEqual(isObjPromise(fn as any), false);
    assert.strictEqual(isObjPromise(obj as any), false);
  });

  test("Checks for Promised-based objects", () => {
    const asyncFn = async () => {};
    const prom = new Promise(() => {});
    assert.strictEqual(isObjPromise(asyncFn as any), false);
    assert.strictEqual(isObjPromise(prom as any), true);
  });

});
