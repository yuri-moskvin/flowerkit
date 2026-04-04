import assert from "node:assert";
import { describe, test } from "node:test";
import { isFnClass } from "./index.ts";

describe(isFnClass.name, () => {

  test("Checks for classes or its instances", () => {
    class Foo {}
    const instance = new Foo();
    assert.strictEqual(isFnClass(Foo as any), true);
    assert.strictEqual(isFnClass(instance as any), true);
  });

  test("Checks for other types", () => {
    assert.strictEqual(isFnClass(null as any), false);
    assert.strictEqual(isFnClass(1 as any), false);
    assert.strictEqual(isFnClass({} as any), false);
  });

  test("Checks for default functions", () => {
    const fn = function() {};
    const asyncFn = async function() {};
    const bindFn = fn.bind(undefined);
    assert.strictEqual(isFnClass(fn as any), false);
    assert.strictEqual(isFnClass(asyncFn as any), false);
    assert.strictEqual(isFnClass(bindFn as any), false);
  });

});
