import { isObjPromise } from "./index.js";

describe(isObjPromise.name, () => {

  test("Checks for default objects", () => {
    const obj = {};
    const fn = function() {};
    const str = "str";
    const nullish = null;
    expect(isObjPromise(nullish)).toBe(false);
    expect(isObjPromise(str)).toBe(false);
    expect(isObjPromise(fn)).toBe(false);
    expect(isObjPromise(obj)).toBe(false);
  });

  test("Checks for Promised-based objects", () => {
    const asyncFn = async () => {};
    const prom = new Promise(() => {});
    expect(isObjPromise(asyncFn)).toBe(false);
    expect(isObjPromise(prom)).toBe(true);
  });

});
