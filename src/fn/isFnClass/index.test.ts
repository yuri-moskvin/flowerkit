import { isFnClass } from "./index.ts";

describe(isFnClass.name, () => {

  test("Checks for classes or its instances", () => {
    class Foo {}
    const instance = new Foo();
    expect(isFnClass(Foo as any)).toBe(true);
    expect(isFnClass(instance as any)).toBe(true);
  });

  test("Checks for other types", () => {
    expect(isFnClass(null as any)).toBe(false);
    expect(isFnClass(1 as any)).toBe(false);
    expect(isFnClass({} as any)).toBe(false);
  });

  test("Checks for default functions", () => {
    const fn = function() {};
    const asyncFn = async function() {};
    const bindFn = fn.bind(undefined);
    expect(isFnClass(fn as any)).toBe(false);
    expect(isFnClass(asyncFn as any)).toBe(false);
    expect(isFnClass(bindFn as any)).toBe(false);
  });

});
