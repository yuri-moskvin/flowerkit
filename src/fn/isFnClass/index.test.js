import { isFnClass } from "./index.js";

describe(isFnClass.name, () => {

  test("Checks for classes or its instances", () => {
    class Foo {}
    const instance = new Foo();
    expect(isFnClass(Foo)).toBe(true);
    expect(isFnClass(instance)).toBe(true);
  });

  test("Checks for other types", () => {
    expect(isFnClass(null)).toBe(false);
    expect(isFnClass(1)).toBe(false);
    expect(isFnClass({})).toBe(false);
  });

  test("Checks for default functions", () => {
    const fn = function() {};
    const asyncFn = async function() {};
    const bindFn = fn.bind();
    expect(isFnClass(fn)).toBe(false);
    expect(isFnClass(asyncFn)).toBe(false);
    expect(isFnClass(bindFn)).toBe(false);
  });

});
