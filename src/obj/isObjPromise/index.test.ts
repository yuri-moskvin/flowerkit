import { isObjPromise } from "./index.ts";

describe(isObjPromise.name, () => {

  test("Checks for default objects", () => {
    const obj = {};
    const fn = function() {};
    const str = "str";
    const nullish = null;
    expect(isObjPromise(nullish as any)).toBe(false);
    expect(isObjPromise(str as any)).toBe(false);
    expect(isObjPromise(fn as any)).toBe(false);
    expect(isObjPromise(obj as any)).toBe(false);
  });

  test("Checks for Promised-based objects", () => {
    const asyncFn = async () => {};
    const prom = new Promise(() => {});
    expect(isObjPromise(asyncFn as any)).toBe(false);
    expect(isObjPromise(prom as any)).toBe(true);
  });

});
