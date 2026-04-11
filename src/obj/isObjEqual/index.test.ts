import assert from "node:assert";
import { describe, test } from "node:test";
import { isObjEqual } from "./index.ts";

describe(isObjEqual.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      isObjEqual(null, {})
    , TypeError);
    assert.throws(() =>
      isObjEqual({}, 1)
    , TypeError);
  });

  test("Checks for objects with same keys and values", () => {
    const obj1 = {
      key1: "value1",
      key2: {
        key3: [ 1, 2, 3 ],
      },
    };
    const obj2 = {
      key2: {
        key3: [ 1, 2, 3 ],
      },
      key1: "value1",
    };
    assert.strictEqual(obj1 === obj2, false);
    assert.strictEqual(isObjEqual(obj1, obj2), true);
  });

  test("Checks for objects with different keys or values", () => {
    assert.strictEqual(isObjEqual({ key1: "value1" }, { key1: "value1", key2: "value2" }), false);
    assert.strictEqual(isObjEqual({ key1: { key2: 1 } }, { key1: { key2: 2 } }), false);
  });

  test("Checks for circular references", () => {
    const obj1: Record<string, unknown> = { key1: "value1" };
    const obj2: Record<string, unknown> = { key1: "value1" };
    const obj3: Record<string, unknown> = { key1: "value2" };

    obj1.self = obj1;
    obj2.self = obj2;
    obj3.self = obj3;

    assert.strictEqual(isObjEqual(obj1, obj2), true);
    assert.strictEqual(isObjEqual(obj1, obj3), false);
  });

});
