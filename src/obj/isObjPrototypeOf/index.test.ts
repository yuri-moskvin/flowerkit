import { isObjPrototypeOf } from "./index.ts";

describe(isObjPrototypeOf.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isObjPrototypeOf(null as any, {})).toThrow(TypeError);
    expect(() => isObjPrototypeOf(123 as any, {})).toThrow(TypeError);
    expect(() => isObjPrototypeOf("str" as any, {})).toThrow(TypeError);
    expect(() => isObjPrototypeOf(undefined as any, {})).toThrow(TypeError);
  });

  test("Checks for plain object", () => {
    const proto = {};
    const obj = Object.create(proto);
    expect(isObjPrototypeOf(proto, obj)).toBe(true);

    const another = {};
    expect(isObjPrototypeOf(proto, another)).toBe(false);
  });

  test("Works with classes and inheritance", () => {
    class A {}
    class B extends A {}
    const b = new B();

    expect(isObjPrototypeOf(A.prototype, b)).toBe(true);
    expect(isObjPrototypeOf(B.prototype, b)).toBe(true);
    expect(isObjPrototypeOf(Object.prototype, b)).toBe(true);

    class C {}
    expect(isObjPrototypeOf(C.prototype, b)).toBe(false);
  });

  test("Handles built-ins and arrays", () => {
    expect(isObjPrototypeOf(Array.prototype, [])).toBe(true);
    expect(isObjPrototypeOf(Object.prototype, [])).toBe(true);
    expect(isObjPrototypeOf(Map.prototype, new Map())).toBe(true);
    expect(isObjPrototypeOf(Set.prototype, new Set())).toBe(true);
  });

  test("Primitives always return false", () => {
    expect(isObjPrototypeOf(Object.prototype, 0)).toBe(false);
    expect(isObjPrototypeOf(Object.prototype, "str")).toBe(false);
    expect(isObjPrototypeOf(Object.prototype, true)).toBe(false);
    expect(isObjPrototypeOf(Object.prototype, Symbol("s"))).toBe(false);
    expect(isObjPrototypeOf(Object.prototype, null)).toBe(false);
    expect(isObjPrototypeOf(Object.prototype, undefined)).toBe(false);
  });

  test("Functions have Function.prototype in chain", () => {
    function f() { /* noop */ }
    const arrow = () => {};
    expect(isObjPrototypeOf(Function.prototype, f)).toBe(true);
    expect(isObjPrototypeOf(Function.prototype, arrow)).toBe(true);
    expect(isObjPrototypeOf(Object.prototype, f)).toBe(true);
  });

});
