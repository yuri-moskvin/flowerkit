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

  test("Checks for Map and Set values", () => {
    const mapA = new Map<string, unknown>([ [ "a", 1 ], [ "b", { nested: true } ] ]);
    const mapB = new Map<string, unknown>([ [ "a", 1 ], [ "b", { nested: true } ] ]);
    const mapC = new Map<string, unknown>([ [ "a", 1 ] ]);
    const mapD = new Map<string, unknown>([ [ "a", 2 ] ]);

    assert.strictEqual(
      isObjEqual(mapA, mapB),
      true
    );

    assert.strictEqual(
      isObjEqual(mapC, mapD),
      false
    );

    assert.strictEqual(
      isObjEqual(
        new Set([ "a", "b", { nested: 1 } ]),
        new Set([ "b", "a", { nested: 1 } ])
      ),
      true
    );

    assert.strictEqual(
      isObjEqual(
        new Set([ "a", { nested: 1 } ]),
        new Set([ "a", { nested: 2 } ])
      ),
      false
    );

    assert.strictEqual(
      isObjEqual(
        new Set([ { nested: 1 }, { nested: 2 } ]),
        new Set([ { nested: 2 }, { nested: 1 } ])
      ),
      true
    );
  });

  test("Compares binary values by type and contents", () => {
    assert.strictEqual(
      isObjEqual(Uint8Array.from([ 1, 2 ]).buffer, Uint8Array.from([ 1, 2 ]).buffer),
      true
    );
    assert.strictEqual(
      isObjEqual(Uint8Array.from([ 1 ]).buffer, Uint8Array.from([ 2 ]).buffer),
      false
    );
    assert.strictEqual(isObjEqual(new Uint8Array([ 1 ]), new Uint16Array([ 1 ])), false);
    assert.strictEqual(isObjEqual(new Uint8Array([ 1, 2 ]), new Uint8Array([ 1, 2 ])), true);
    assert.strictEqual(isObjEqual(new Uint8Array([ 1, 2 ]), new Uint8Array([ 1, 3 ])), false);
  });

});
