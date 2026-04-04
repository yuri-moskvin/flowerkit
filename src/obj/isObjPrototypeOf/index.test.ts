import assert from "node:assert";
import { describe, test } from "node:test";
import { isObjPrototypeOf } from "./index.ts";

describe(isObjPrototypeOf.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid proto argument
      isObjPrototypeOf(null, {})
    , TypeError);
    assert.throws(() =>
      // @ts-expect-error testing invalid proto argument
      isObjPrototypeOf(123, {})
    , TypeError);
    assert.throws(() =>
      // @ts-expect-error testing invalid proto argument
      isObjPrototypeOf("str", {})
    , TypeError);
    assert.throws(() =>
      // @ts-expect-error testing invalid proto argument
      isObjPrototypeOf(undefined, {})
    , TypeError);
  });

  test("Checks for plain object", () => {
    const proto = {};
    const obj = Object.create(proto);
    assert.strictEqual(isObjPrototypeOf(proto, obj), true);

    const another = {};
    assert.strictEqual(isObjPrototypeOf(proto, another), false);
  });

  test("Works with classes and inheritance", () => {
    class A {}
    class B extends A {}
    const b = new B();

    assert.strictEqual(isObjPrototypeOf(A.prototype, b), true);
    assert.strictEqual(isObjPrototypeOf(B.prototype, b), true);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, b), true);

    class C {}
    assert.strictEqual(isObjPrototypeOf(C.prototype, b), false);
  });

  test("Handles built-ins and arrays", () => {
    assert.strictEqual(isObjPrototypeOf(Array.prototype, []), true);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, []), true);
    assert.strictEqual(isObjPrototypeOf(Map.prototype, new Map()), true);
    assert.strictEqual(isObjPrototypeOf(Set.prototype, new Set()), true);
  });

  test("Primitives always return false", () => {
    assert.strictEqual(isObjPrototypeOf(Object.prototype, 0), false);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, "str"), false);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, true), false);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, Symbol("s")), false);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, null), false);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, undefined), false);
  });

  test("Functions have Function.prototype in chain", () => {
    function f() { /* noop */ }
    const arrow = () => {};
    assert.strictEqual(isObjPrototypeOf(Function.prototype, f), true);
    assert.strictEqual(isObjPrototypeOf(Function.prototype, arrow), true);
    assert.strictEqual(isObjPrototypeOf(Object.prototype, f), true);
  });

});
